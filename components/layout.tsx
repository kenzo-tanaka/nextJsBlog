import Link from "next/link";

type Props = {
  children: React.ReactNode;
  home?: boolean;
};

const Layout: React.FC<Props> = ({ children, home = false }) => {
  return (
    <div className="max-w-xl mx-auto px-2 sm:px-6 lg:px-8 mt-4 mb-12">
      <main>{children}</main>
      {!home && (
        <div className="underline">
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Layout;
