import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUpdateProfile } from "../Hooks/useUpdateProfile.js";
import * as yup from "yup";
import { useAuth } from "../Api/AuthContext.jsx";
import ProfileEditComponent from "../Components/Profile/ProfileEditComponent.jsx";

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
  const { user } = useAuth();
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

      <ProfileEditComponent
        user={user}
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        loading={loading}
      />
    </div>
  );
};

export default ProfileEdit;
