import Image from "next/image";
import Link from "next/link"

import AccountCenter from "../AccountCenter";
import { path } from "@/lib/utils";
import { NavMenu } from "./NavMenu";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 md:p-6">
      <Link href={path.HOME}>
        <Image
          src="/flash.svg"
          alt="Flash logo"
          width={72}
          height={37}
          priority
        />
      </Link>
      <NavMenu />
      <div className="w-34">
        <AccountCenter />
      </div>
    </nav>
  )
}

export default Navbar;
