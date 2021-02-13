import Link from "next/link";
const Profile: React.FC = () => {
  return (
    <div className="flex flex-col	items-center">
      <img
        src="/images/profile.jpg"
        alt="profile image"
        className="w-20 rounded-l-full"
      />
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
