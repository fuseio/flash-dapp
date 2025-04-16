import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { Safe4337Pack } from '@safe-global/relay-kit'
import { mainnet } from "viem/chains"

import { USER } from "@/lib/config"
import { createPasskey, loadPasskeys, storePasskey } from "@/lib/passkeys"
import { Status, User } from "@/lib/types"
import { path } from "@/lib/utils"
import { rpcUrls } from "@/lib/wagmi"

const useUser = () => {
  const [signupStatus, setSignupStatus] = useState<Status>(Status.IDLE)
  const [loginStatus, setLoginStatus] = useState<Status>(Status.IDLE)
  const [userStatus, setUserStatus] = useState<Status>(Status.IDLE)
  const [user, setUser] = useState<User>()
  const router = useRouter()

  function storeUser(user: User) {
    setUser(user)
    localStorage.setItem(USER.storageKey, JSON.stringify(user))
    document.cookie = `${USER.storageKey}=${user.passkey.rawId}; path=/;`
  }

  function loadUser() {
    const user = localStorage.getItem(USER.storageKey)
    if (!user) return

    const parsedUser = JSON.parse(user)
    setUser(parsedUser)
    return parsedUser
  }

  async function handleSignup(username: string) {
    try {
      setSignupStatus(Status.PENDING)
      const passkey = await createPasskey(username)

      storePasskey(passkey)
      storeUser({
        username,
        passkey,
        safeAddress: '',
        isSafeDeployed: false
      })
      setSignupStatus(Status.SUCCESS)
      router.replace(path.DEPOSIT)
    } catch (error) {
      console.error(error)
      setSignupStatus(Status.ERROR)
    }
  }

  async function handleLogin() {
    try {
      setLoginStatus(Status.PENDING)
      const passkeys = loadPasskeys()
      if (!passkeys?.length) {
        setLoginStatus(Status.ERROR)
        return
      }
      const passkey = passkeys[0]
      setUser({
        username: '',
        passkey,
        safeAddress: '',
        isSafeDeployed: false
      })
      setLoginStatus(Status.SUCCESS)
      router.replace(path.DEPOSIT)
    } catch (error) {
      console.error(error)
      setLoginStatus(Status.ERROR)
    }
  }

  function handleLogout() {
    const date = new Date(0)
    document.cookie = `${USER.storageKey}=; path=/; expires=${date.toUTCString()}`
    router.replace(path.HOME)
  }

  const loadUserInfo = useCallback(async () => {
    try {
      setUserStatus(Status.PENDING)

      const user = loadUser()
      if (!user) {
        setUserStatus(Status.ERROR)
        return
      }

      const safe4337Pack = await Safe4337Pack.init({
        provider: rpcUrls[mainnet.id],
        signer: user.passkey,
        bundlerUrl: USER.pimlicoUrl,
        options: {
          owners: [],
          threshold: 1
        }
      })

      const safeAddress = await safe4337Pack.protocolKit.getAddress()
      const isSafeDeployed = await safe4337Pack.protocolKit.isSafeDeployed()

      storeUser({
        ...user,
        safeAddress,
        isSafeDeployed
      })
      setUserStatus(Status.SUCCESS)
    } catch (error) {
      console.error(error)
      setUserStatus(Status.ERROR)
    }
  }, [])

  useEffect(() => {
    loadUserInfo()
  }, [loadUserInfo])

  return {
    signupStatus,
    handleSignup,
    user,
    userStatus,
    loginStatus,
    handleLogin,
    handleLogout,
  }
}

export default useUser;
