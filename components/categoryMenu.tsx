import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { config } from "../site.config";

const CategoryMenu: React.FC = () => {
  const router = useRouter();
  const categoryList = config.categoryList;
  return (
    <div>
      {categoryList.map(({ slug, name }) => (
        <Link href={slug} key={slug}>
          <a
            className={`p-2 font-medium text-gray-800 w-full inline-block hover:bg-gray-100 hover:no-underline ${
              router.asPath === slug
                ? "border-l-4 border-gray-500 bg-gray-100"
                : ""
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
