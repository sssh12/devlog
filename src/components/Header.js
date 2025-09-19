import Link from "next/link";
import LoginBtn from "./LoginBtn";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 border-b">
      <Link href="/">
        <h1 className="text-2xl font-bold">DevLog</h1>
      </Link>
      <nav>
        <LoginBtn />
      </nav>
    </header>
  );
}
