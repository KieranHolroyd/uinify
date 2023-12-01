import Link from "next/link";

export function Header() {
  return (
    <header className="fixed group top-0 right-0 left-0 flex flex-col items-center justify-between w-full">
      <div className="flex items-center justify-between w-full max-w-5xl">
        <nav className="flex items-center  w-full max-w-5xl">
          <Link
            href="/"
            className="transition-all px-4 py-1 rounded text-gray-400 hover:bg-gray-700/50 group-hover:text-white group-hover:py-4"
          >
            Dashboard
          </Link>
          <Link
            href="/settings"
            className="transition-all px-4 py-1 rounded text-gray-400 hover:bg-gray-700/50 group-hover:text-white group-hover:py-4"
          >
            Settings
          </Link>
        </nav>
      </div>
    </header>
  );
}
