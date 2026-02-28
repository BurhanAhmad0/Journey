import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUpdateProfile } from "../Hooks/useUpdateProfile.js";
import * as yup from "yup";

const profileSchema = yup.object({
  username: yup
    .string()
    // .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters"),

  bio: yup.string().max(200, "Bio must be at most 200 characters"),

  gender: yup.string().oneOf(["male", "female", "other", ""], "Invalid gender"),

  account_status: yup.boolean(),
});

const ProfileEdit = () => {
  const { updateProfile, loading } = useUpdateProfile();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(profileSchema),
  });

  const onSubmit = (data) => {
    // console.log(data);
    updateProfile(data);
  };

  return (
    <div className="px-20 py-10">
      <h2 className="text-2xl font-semibold mb-7">Edit profile</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-500/50 rounded-md w-full p-5 space-y-4"
      >
        {/* Username */}
        <div className="flex flex-col gap-1">
          <label>Username</label>
          <input
            {...register("username")}
            className="input bg-white/15 px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-black/50 transition-all duration-150"
            placeholder="Username"
          />
          <p className="error text-red-500 text-xs">
            {errors.username?.message}
          </p>
        </div>

        {/* Bio */}
        <div className="flex flex-col gap-1">
          <label>Bio</label>
          <textarea
            {...register("bio")}
            placeholder="Write something..."
            className="textarea bg-white/15 h-52 px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-black/50 transition-all duration-150"
          />
          <p className="error text-red-500 text-xs">{errors.bio?.message}</p>
        </div>

        {/* Gender */}
        <div className="flex flex-col gap-1">
          <label>Gender</label>
          <select
            {...register("gender")}
            className="input bg-white/15 px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-black/50 transition-all duration-150"
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
          <label>Account Status</label>
          <input
            {...register("account_status")}
            type="checkbox"
            name="account_status"
            id="account_status"
          />
          <p className="error text-red-500 text-xs">
            {errors.account_status?.message}
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white w-40 py-2 rounded-md hover:bg-black/65 transition-colors cursor-pointer duration-150 disabled:bg-gray-700 disabled:cursor-not-allowed"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default ProfileEdit;
