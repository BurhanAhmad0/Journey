import { useEffect } from "react";
import ProfilePicture from "../Components/Profile/ProfilePicture.jsx";
import { useProfile } from "../Hooks/userProfile.js";
import { useParams } from "react-router-dom";
import { useAuth } from "../Api/AuthContext.jsx";

const ProfilePage = () => {
  const { username } = useParams();

  const { user } = useAuth();
  const {
    progress,
    imageFile,
    imagePreview,
    userProfile,
    setImagePreview,
    setImageFile,
    handleChange,
    handleUpload,
    fetchUser,
  } = useProfile();

  useEffect(() => {
    fetchUser(username);
  }, [username]);

  return (
    <div className="min-h-screen bg-gray-300/50 p-20">
      <div className="flex gap-5">
        <div>
          <ProfilePicture
            handleChange={handleChange}
            handleUpload={handleUpload}
            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
            setImageFile={setImageFile}
            currentUsername={user.username}
            username={username}
            avatar={userProfile?.avatar}
          />

          {progress > 0 && progress < 100 && (
            <progress value={progress} max="100" className="w-full h-2" />
          )}
        </div>

        <div className="w-full flex justify-between items-center">
          <div>
            <h2 className="font-semibold text-4xl text-black leading-none">
              {userProfile
                ? userProfile?.firstName + " " + userProfile?.lastName
                : user?.firstName + " " + user?.lastName}
            </h2>
            <small className="font-medium text-xs text-gray-600 leading-none">
              @{userProfile ? userProfile?.username : user?.username}
            </small>
          </div>

          {user.username == username ? (
            <div className="flex flex-col gap-2">
              {imageFile && (
                <button
                  onClick={handleUpload}
                  className="bg-black hover:bg-black/80 text-sm border border-white text-white px-6 py-2 rounded-md cursor-pointer"
                >
                  Upload
                </button>
              )}

              <button className="bg-black hover:bg-black/80 text-sm border border-white text-white px-6 py-2 rounded-md cursor-pointer">
                Edit Profile
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <button className="bg-black hover:bg-black/80 text-sm border border-white text-white px-6 py-2 rounded-md cursor-pointer">
                Follow
              </button>

              <button className="bg-black hover:bg-black/80 text-sm border border-white text-white px-6 py-2 rounded-md cursor-pointer">
                Share Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
