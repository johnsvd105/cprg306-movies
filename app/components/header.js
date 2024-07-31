import Link from "next/link";
import SearchMenu from "./search-menu"

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex space-x-4">
        <Link href="/" className="text-lg font-bold">CPRG306-Movies</Link>
        <Link href="/movies" className="text-lg">Movies</Link>
      </div>
      <SearchMenu />
    </header>
  );
};

export default Header;