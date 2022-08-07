import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="p-5 lg:p-10 xl:px-20 flex justify-between font-mono sticky top-0">
      <Link href="/" exact>
        <a
          className={`${
            router.pathname == "/" ? "text-black font-bold" : "text-gray-700"
          }`}
        >
          Home
        </a>
      </Link>
      <Link href="/movies">
        <a
          className={`${
            router.pathname == "/movies"
              ? "text-black font-bold"
              : "text-gray-700"
          }`}
        >
          Movies
        </a>
      </Link>
      <Link href="/series">
        <a
          className={`${
            router.pathname == "/series"
              ? "text-black font-bold"
              : "text-gray-700"
          }`}
        >
          Series
        </a>
      </Link>
      <Link href="/profile">
        <a
          className={`${
            router.pathname == "/profile"
              ? "text-black font-bold"
              : "text-gray-700"
          }`}
        >
          Profile
        </a>
      </Link>
    </nav>
  );
};

export default Navbar;
