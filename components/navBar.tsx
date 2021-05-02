import React from "react";
import Link from "next/link";
import Image from "next/image";

const NavBar: React.FC = () => {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="font-bold font-sans text-xl text-gray-800">
                <Link href="/">{"{{ kenzo }}"}</Link>
              </h1>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pt-2 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Link href="/search">
              <a>
                <Image
                  src="/images/search.svg"
                  alt="GitHub Icon"
                  width={20}
                  height={20}
                />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
