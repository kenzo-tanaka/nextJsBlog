import Link from "next/link";
import { useRouter } from "next/router";
import { config } from "../site.config";

const CategoryMenu: React.FC = () => {
  const router = useRouter();
  const categoryList = config.categoryList;
  console.log(categoryList[0].name);
  return (
    <div>
      {categoryList.map(({ slug, name }) => (
        <Link href={slug}>
          <a
            className={`p-2 font-medium text-gray-800 w-full inline-block hover:bg-gray-100 hover:no-underline ${
              router.pathname === slug ? "border-l-4 border-gray-500" : ""
            }`}
          >
            {name}
          </a>
        </Link>
      ))}
    </div>
  );
};

export default CategoryMenu;
