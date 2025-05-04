import Image from "next/image";
import Link from "next/link"

import AccountCenter from "../AccountCenter";
import { path } from "@/lib/utils";
import { NavMenu } from "./NavMenu";
import { MobileNavMenu } from "./MobileNavMenu";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 md:p-6">
      <Link href={path.HOME} className="flex items-center gap-2">
        <Image
          src="/flash-logo.svg"
          alt="Flash logo"
          width={32}
          height={32}
          priority
        />
        <Image
          src="/flash.svg"
          alt="Flash"
          width={72}
          height={37}
          priority
          className="hidden md:block"
        />
      </Link>
      <NavMenu />
      <MobileNavMenu />
      <div className="w-34">
        <AccountCenter />
      </div>
    </nav>
  )
}

export default Navbar;
