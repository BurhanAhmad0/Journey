import React from "react";

const ProfileEditComponent = ({
  user,
  register,
  handleSubmit,
  onSubmit,
  errors,
  loading,
}) => {
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-black rounded-md w-full p-5 space-y-4"
    >
      {/* Username */}
      <div className="flex flex-col gap-1">
        <label>Username</label>
        <input
          {...register("username")}
          className="input text-white bg-white/30 px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-white/50 placeholder:text-gray-300 transition-all duration-150"
          placeholder="Username"
        />
        <p className="error text-red-500 text-xs">{errors.username?.message}</p>
      </div>

      {/* Bio */}
      <div className="flex flex-col gap-1">
        <label>Bio</label>
        <textarea
          {...register("bio")}
          placeholder="Write something..."
          className="textarea h-52 text-white bg-white/30 px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-white/50 placeholder:text-gray-300 transition-all duration-150"
        />
        <p className="error text-red-500 text-xs">{errors.bio?.message}</p>
      </div>

      {/* Gender */}
      <div className="flex flex-col gap-1">
        <label>Gender</label>
        <select
          {...register("gender")}
          className="input text-white bg-white/30 px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-white/50 placeholder:text-gray-300 transition-all duration-150"
        >
          <option className="bg-gray-700/50" value="">
            Select gender
          </option>
          <option className="bg-gray-700/50" value="male">
            Male
          </option>
          <option className="bg-gray-700/50" value="female">
            Female
          </option>
          <option className="bg-gray-700/50" value="other">
            Other
          </option>
        </select>
        <p className="error text-red-500 text-xs">{errors.gender?.message}</p>
      </div>

      {/* Account Status */}
      <div className="flex gap-3">
        <label
          for="account_status"
          className=" text-white bg-white/30 px-4 py-2 rounded-md placeholder:text-gray-300 transition-all duration-150"
        >
          Account Status
        </label>
        <input
          {...register("account_status")}
          type="checkbox"
          name="account_status"
          id="account_status"
          defaultChecked={user?.private}
        />
        <p className="error text-red-500 text-xs">
          {errors.account_status?.message}
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-white text-black w-40 py-2 rounded-md hover:bg-gray-300 transition-colors cursor-pointer duration-150 disabled:bg-gray-700 disabled:cursor-not-allowed"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
};

export default ProfileEditComponent;
