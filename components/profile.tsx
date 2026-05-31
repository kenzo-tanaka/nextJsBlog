import React from "react";

const Profile: React.FC = () => {
  return (
    <div className="flex flex-col	items-center">
      <img
        src="/images/profile.jpg"
        alt="Picture of the author"
        className="rounded-full"
        width={100}
        height={100}
      />
      <p className="text-gray-500 mt-4">
        Personal tech blog
      </p>
    </div>
  );
};

export default Profile;
