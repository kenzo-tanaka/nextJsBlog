import Link from "next/link";
import { useRouter } from "next/router";
import { config } from "../site.config";

const MobileCategoryMenu: React.FC = () => {
  const router = useRouter();
  const categoryList = config.categoryList;
  return (
    <div className="block sm:hidden grid grid-cols-3 my-5 text-center content-center">
      {categoryList.map(({ slug, name }) => (
        <Link href={slug} key={slug}>
          <a
            className={`m-auto font-medium text-gray-800 w-3/4 hover:bg-gray-100 ${
              router.asPath === slug ? "border-b-4 border-gray-500" : ""
            }`}
          >
            {name}
          </a>
        </Link>
      ))}
    </div>
  );
};

export default MobileCategoryMenu;
