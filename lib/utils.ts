import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Address } from "viem"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function eclipseAddress(address: Address, start = 6, end = 4) {
  return address.slice(0, start) + "..." + address.slice(-end)
}
