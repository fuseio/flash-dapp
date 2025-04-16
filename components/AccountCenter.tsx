'use client'

import { ChevronDown } from "lucide-react"

import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza"
import { Button } from "@/components/ui/button"
import useUser from "@/hooks/useUser"
import { eclipseAddress } from "@/lib/utils"
import CopyToClipboard from "@/components/CopyToClipboard"

const AccountCenter = () => {
  const { user, handleLogout } = useUser()

  let triggerButton = (
    <Button className="w-full rounded-full animate-pulse" disabled />
  );
  if (user?.safeAddress) {
    triggerButton = (
      <Button className="w-full rounded-full flex items-center justify-between">
        {eclipseAddress(user.safeAddress, 4)}
        <ChevronDown />
      </Button>
    )
  }

  return (
    <Credenza>
      <CredenzaTrigger asChild>
        {triggerButton}
      </CredenzaTrigger>
      <CredenzaContent className="grid-rows-[auto_15rem_auto] gap-8 sm:max-w-sm">
        <CredenzaHeader>
          <CredenzaTitle>Hello, {user?.username}</CredenzaTitle>
        </CredenzaHeader>
        <CredenzaBody>
          <div className="flex flex-col gap-2">
            <p className="text-sm text-muted-foreground">Safe Address</p>
            <div className="flex justify-between items-center px-4 py-2 bg-primary/10 rounded-2xl text-primary font-medium">
              <span>{eclipseAddress(user?.safeAddress || '')}</span>
              <CopyToClipboard text={user?.safeAddress || ''} />
            </div>
          </div>
        </CredenzaBody>
        <CredenzaFooter>
          <CredenzaClose asChild>
            <Button
              variant="destructive"
              className="w-full"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </CredenzaClose>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  )
}

export default AccountCenter
