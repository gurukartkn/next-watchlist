import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import { FaUserCircle, FaSearch } from "react-icons/fa";

import Branding from "../public/assets/branding.png";

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="bg-slate-900 bg-opacity-60 backdrop-blur-lg shadow-lg p-5 mb-8 lg:px-10 xl:px-20 flex justify-between items-center sticky top-0 z-30">
      <Link href="/" exact>
        <a className="flex items-center gap-1">
          <Image src={Branding} alt="branding" width={40} height={40} />
          <h3
            className={`hidden lg:block font-mono text-2xl text-white ${
              router.pathname == "/" ? " font-extrabold" : ""
            }`}
          >
            WatchList
          </h3>
        </a>
      </Link>
      <Link href="/movies">
        <a
          className={`text-white ${
            router.pathname == "/movies" && "font-bold border-b-2 border-white"
          }`}
        >
          <p>Movies</p>
        </a>
      </Link>
      <Link href="/tv">
        <a
          className={`text-white ${
            router.pathname == "/tv" && " font-bold border-b-2 border-white"
          }`}
        >
          <p>TV Shows</p>
        </a>
      </Link>

      <Link href="/search">
        <a
          className={`${
            router.pathname == "/search" ? "text-white" : "text-gray-200"
          }`}
        >
          <FaSearch className="text-2xl" />
        </a>
      </Link>
      {/* <Link href="/profile/1">
          <a
            className={`${
              router.pathname == "/profile" ? "text-white" : "text-gray-700"
            }`}
          >
            <FaUserCircle className="text-2xl" />
          </a>
        </Link> */}
    </nav>
  );
};

export default Navbar;
