import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";

const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);

  // Fetch logged-in user from backend
  const fetchUser = useCallback(async () => {
    setLoadingUser(true);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URI}/auth/me`, // use /me endpoint
        { withCredentials: true },
      );

      setUser(response.data?.user || null);
      setIsLoggedIn(!!response.data?.user);
    } catch (error) {
      setUser(null);
      setIsLoggedIn(false);

      // Only log errors that are not "unauthorized"
      if (error.response?.status !== 401) {
        console.error("User Fetch Error:", error);
      }
    } finally {
      setLoadingUser(false);
    }
  }, []);

  // Fetch user on mount
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const value = {
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn,
    loadingUser,
    fetchUser, // expose fetchUser in case we need to refresh user manually
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthContextProvider;
