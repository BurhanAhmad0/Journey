import React from "react";
import { Image } from "lucide-react";

const ProfilePicture = (props) => {
  return (
    <div className="relative size-32 rounded-full border-[4px] border-black bg-cyan-700 overflow-hidden group">
      {/* Avatar image (optional) */}
      {(props.imagePreview || props.avatar) && (
        <img
          src={props.imagePreview || props.avatar}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      )}

      {props.username === props.currentUsername && (
        <form>
          <label
            htmlFor="image"
            className="absolute inset-0 hidden group-hover:flex cursor-pointer
                 items-center justify-center bg-black/25"
          >
            <Image className="text-white" />
          </label>

          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            className="hidden"
            onChange={(e) => props.handleChange(e)}
          />
        </form>
      )}
    </div>
  );
};

export default ProfilePicture;
