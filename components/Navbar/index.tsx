import Image from "next/image";
import Link from "next/link"

import ConnectWallet from "../ConnectWallet";
import { path } from "@/lib/utils";
import { NavMenu } from "./NavMenu";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 md:p-6">
      <Link href={path.DEPOSIT}>
        <Image
          src="/flash.svg"
          alt="Flash logo"
          width={72}
          height={37}
          priority
        />
      </Link>
      <NavMenu />
      <div className="w-40">
        <ConnectWallet />
      </div>
    </nav>
  )
}

export default Navbar;
