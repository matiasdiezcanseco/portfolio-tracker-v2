import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className=" px-8 py-4">
      <div className="mx-auto flex max-w-[1280px] items-center gap-8">
        <Image
          className=""
          alt="logo"
          src="/images/logo.svg"
          width={50}
          height={50}
        />
        <nav>
          <ul className="flex gap-8">
            <li>
              <Link href="/">Swap</Link>
            </li>
            <li>
              <Link href="/deposit">Deposit</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
