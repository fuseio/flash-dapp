import { Wallet, LayoutDashboard } from "lucide-react";

import { path } from "./utils";

export const menuItems = [
  {
    label: "Deposit",
    href: path.DEPOSIT,
    icon: Wallet,
  },
  {
    label: "Dashboard",
    href: path.DASHBOARD,
    icon: LayoutDashboard,
  },
]
