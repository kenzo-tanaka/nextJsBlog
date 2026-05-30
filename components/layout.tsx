import React from "react";

type Props = {
  children: React.ReactNode;
  home?: boolean;
};

const Layout: React.FC<Props> = ({ children, home = false }) => {
  return (
    <div className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8">
      <main className="mt-3">
        <div className="shadow-md rounded-md bg-white">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
