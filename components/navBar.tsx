import Link from "next/link";
import Image from "next/image";
import { config } from "../site.config";

const NavBar: React.FC = () => {
  return (
    <nav className="bg-white-800 shadow">
      <div className="max-w-3xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="font-bold font-sans text-xl text-gray-800">
                <Link href="/">{"{{ kenzo }}"}</Link>
              </h1>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <a target="_blank" href={config.repo}>
              <Image
                src="/images/github.png"
                alt="GitHub Icon"
                width={25}
                height={25}
              />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
