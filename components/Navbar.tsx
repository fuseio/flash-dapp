import Image from "next/image";

import ConnectWallet from "./ConnectWallet";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-6">
      <Image
        src="/flash.svg"
        alt="Flash logo"
        width={72}
        height={37}
        priority
      />
      <div className="w-40">
        <ConnectWallet />
      </div>
    </nav>
  )
}

export default Navbar;
