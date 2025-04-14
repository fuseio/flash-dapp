'use client'

import { usePathname } from "next/navigation"
import Link from "next/link"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { path } from "@/lib/utils";

const navItems = [
  {
    label: "Deposit",
    href: path.DEPOSIT,
  },
  {
    label: "Dashboard",
    href: path.DASHBOARD,
  },
]

export function NavMenu() {
  const pathname = usePathname()

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navItems.map((item) => (
          <NavigationMenuItem key={item.label}>
            <Link href={item.href} legacyBehavior passHref>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                data-active={pathname === item.href}
              >
                {item.label}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
