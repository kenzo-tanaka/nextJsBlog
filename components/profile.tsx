import React from "react";
import Link from "next/link";
import Image from "next/image";

const Profile: React.FC = () => {
  return (
    <div className="flex flex-col	items-center">
      <picture>
        <source srcSet="/images/profile.jpg" />
        <Image
          src="/images/profile.jpg"
          alt="Picture of the author"
          className="rounded-full"
          width={100}
          height={100}
        />
      </picture>
      <p className="text-gray-500 mt-4">
        Personal tech blog /{" "}
        <Link href="/about">
          <a className="underline">resume</a>
        </Link>
      </p>
    </div>
  );
};

export default Profile;
