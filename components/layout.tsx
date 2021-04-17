import React from "react";
import { config } from "../site.config";

type Props = {
  children: React.ReactNode;
  home?: boolean;
};

const Layout: React.FC<Props> = ({ children, home = false }) => {
  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-6 lg:px-8">
      <main>
        <div className="shadow-md bg-white">{children}</div>
      </main>
      <p className="mt-7 text-center">
        <a
          href={config.repo}
          target="_blank"
          className="text-gray-400 underline"
        >
          SourceCode
        </a>
      </p>
    </div>
  );
};

export default Layout;
