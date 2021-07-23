import { FunctionComponent, ReactNode } from "react";
import Link from "next/link";
import { useAuth } from "src/auth/useAuth";

interface IProps {
  main: ReactNode;
}

const Layout: FunctionComponent<IProps> = ({ main }) => {
  const { authenticated, logout } = useAuth();
  return (
    <div className="bg-gray-900 max-w-screen-3xl mx-auto text-white">
      <nav className="bg-gray-800" style={{ height: "70px" }}>
        <div className="px-6 flex items-center justify-between h-16">
          <Link href="/">
            <a>
              <img
                src="/home-color.svg"
                alt="home house"
                className="inline w-6"
              />
            </a>
          </Link>

          {authenticated ? (
            <>
              <Link href="/houses/add">
                <a>Add House</a>
              </Link>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <Link href="/auth">
              <a className=" font-medium">Sign Up</a>
            </Link>
          )}
        </div>
      </nav>
      <main
        className="bg-green-900"
        style={{ minHeight: "calc(100vh - 70px)" }}
      >
        {main}
      </main>
    </div>
  );
};

export default Layout;
