import { useEffect } from "react";
import ProfilePicture from "../Components/Profile/ProfilePicture.jsx";
import { useProfile } from "../Hooks/userProfile.js";
import { useParams } from "react-router-dom";
import { useAuth } from "../Api/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { username } = useParams();

  const { user } = useAuth();
  const {
    progress,
    imageFile,
    imagePreview,
    userProfile,
    isFollowing,
    loading,
    setImagePreview,
    setImageFile,
    handleChange,
    handleUpload,
    fetchUser,
    handleFollowUnfollow,
  } = useProfile();

  useEffect(() => {
    fetchUser(username);
  }, [username]);

  return (
    <div className="min-h-screen bg-gray-300/50 p-20 ">
      <div className="flex justify-between gap-5 ">
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

        <div className="w-full flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-semibold text-4xl text-black leading-none">
                {userProfile
                  ? userProfile?.firstName + " " + userProfile?.lastName
                  : user?.firstName + " " + user?.lastName}
              </h2>
              <small className="font-medium text-xs text-gray-600 leading-none">
                @{userProfile ? userProfile?.username : user?.username}
              </small>
              <p className="mt-3 text-sm tracking-wider w-lg">
                {userProfile ? userProfile?.bio : user?.bio}
              </p>
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

                <button
                  onClick={() => navigate(`/${user?.username}/edit`)}
                  className="bg-black hover:bg-black/80 text-sm border border-white text-white px-6 py-2 rounded-md cursor-pointer"
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => navigate(`/${user?.username}/stats`)}
                  className="bg-black hover:bg-black/80 text-sm border border-white text-white px-6 py-2 rounded-md cursor-pointer"
                >
                  Statistics
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => handleFollowUnfollow()}
                  className="bg-black hover:bg-black/80 text-sm border border-white text-white px-6 py-2 rounded-md cursor-pointer"
                >
                  {loading
                    ? "Processing..."
                    : isFollowing
                      ? "Unfollow"
                      : "Follow"}
                </button>

                <button className="bg-black hover:bg-black/80 text-sm border border-white text-white px-6 py-2 rounded-md cursor-pointer">
                  Share Profile
                </button>
              </div>
            )}
          </div>

          <div className="flex">
            <div className="space-x-3 text-xl font-medium text-black w-1/2 border border-black p-5 ">
              <span>{userProfile?.followers.length || 0}</span>
              <span>Followers</span>
            </div>
            <div className="space-x-3 text-xl font-medium text-black w-1/2 border border-black p-5 ">
              <span>{userProfile?.following.length || 0}</span>
              <span>Following</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
