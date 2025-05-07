import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { PasskeyArgType } from "@safe-global/protocol-kit"
import { Safe4337Pack } from '@safe-global/relay-kit'
import { mainnet } from "viem/chains"
import { startAuthentication, startRegistration } from "@simplewebauthn/browser"

import { USER } from "@/lib/config"
import { Status, User } from "@/lib/types"
import { path, withRefreshToken } from "@/lib/utils"
import { rpcUrls } from "@/lib/wagmi"
import { generateAuthenticationOptions, generateRegistrationOptions, verifyAuthentication, verifyRegistration } from "@/lib/api"

const initUser = {
  username: "",
  safeAddress: "",
  passkey: {
    rawId: "",
    coordinates: {
      x: "",
      y: "",
    },
  },
};

const useUser = () => {
  const [signupInfo, setSignupInfo] = useState<{
    status: Status;
    message?: string;
  }>({ status: Status.IDLE, message: "" });
  const [loginStatus, setLoginStatus] = useState<Status>(Status.IDLE);
  const [userStatus, setUserStatus] = useState<Status>(Status.IDLE);
  const [user, setUser] = useState<User>();
  const router = useRouter();

  function storeUser(user: { [K in keyof User]?: User[K] }) {
    setUser((prevUser) => {
      const newUser = {
        ...prevUser,
        ...user,
      } as User;
      localStorage.setItem(USER.storageKey, JSON.stringify(newUser));
      document.cookie = `${USER.storageKey}=${newUser.username}; path=/;`;
      return newUser;
    });
  }

  const loadUser = useCallback(() => {
    try {
      setUserStatus(Status.PENDING);
      const user = localStorage.getItem(USER.storageKey);
      if (!user) {
        throw new Error("User not found");
      }

      const parsedUser = JSON.parse(user);
      setUser(parsedUser);
      setUserStatus(Status.SUCCESS);

      return parsedUser;
    } catch (error) {
      console.log(error);
      setUserStatus(Status.ERROR);
    }
  }, []);

  async function handleSignup(username: string) {
    try {
      setSignupInfo({ status: Status.PENDING });

      const optionsJSON = await generateRegistrationOptions(username);
      const authenticatorReponse = await startRegistration({ optionsJSON });

      const user = await withRefreshToken(
        verifyRegistration(authenticatorReponse),
        { onError: handleLogin }
      );

      if (user) {
        storeUser(user);
        setSignupInfo({ status: Status.SUCCESS });
        router.push(path.DEPOSIT);
      } else {
        throw new Error("Error while verifying passkey registration");
      }
    } catch (error: any) {
      if (error?.status === 409) {
        setSignupInfo({
          status: Status.ERROR,
          message: "Username already exists",
        });
      } else {
        setSignupInfo({ status: Status.ERROR });
      }
      console.error(error);
    }
  }

  async function handleLogin() {
    try {
      setLoginStatus(Status.PENDING);
      const optionsJSON = await generateAuthenticationOptions();
      const authenticatorReponse = await startAuthentication({ optionsJSON });

      const user = await verifyAuthentication(authenticatorReponse);

      if (user) {
        storeUser(user);
        setSignupInfo({ status: Status.SUCCESS });
        router.push(path.DEPOSIT);
      } else {
        throw new Error("Error while verifying passkey registration");
      }
    } catch (error) {
      console.error(error);
      setLoginStatus(Status.ERROR);
    }
  }

  function handleLogout() {
    const date = new Date(0);
    document.cookie = `${
      USER.storageKey
    }=; path=/; expires=${date.toUTCString()}`;
    storeUser(initUser);
    router.push(path.HOME);
  }

  const safeAA = useCallback(async (passkey: PasskeyArgType) => {
    return Safe4337Pack.init({
      provider: rpcUrls[mainnet.id],
      signer: passkey,
      bundlerUrl: USER.pimlicoUrl,
      // paymasterOptions: {
      //   isSponsored: true,
      //   paymasterUrl: USER.pimlicoUrl,
      // },
      options: {
        owners: [],
        threshold: 1,
      },
    });
  }, []);

  const userOpReceipt = useCallback(
    async (safe4337Pack: Safe4337Pack, userOperationHash: string) => {
      let userOperationReceipt = null;
      while (!userOperationReceipt) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        userOperationReceipt = await safe4337Pack.getUserOperationReceipt(
          userOperationHash
        );
      }
      return userOperationReceipt;
    },
    []
  );

  useEffect(() => {
    loadUser();
  }, []);

  return {
    signupInfo,
    handleSignup,
    user,
    userStatus,
    loginStatus,
    handleLogin,
    handleLogout,
    safeAA,
    userOpReceipt,
  };
};

export default useUser;
