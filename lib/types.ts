import { PasskeyArgType } from "@safe-global/protocol-kit"
import { Address } from "viem"

export enum Status {
  IDLE = "idle",
  PENDING = "pending",
  SUCCESS = "success",
  ERROR = "error",
}

export interface User {
  username: string
  passkey: PasskeyArgType
  safeAddress: Address
  isSafeDeployed: boolean
}
