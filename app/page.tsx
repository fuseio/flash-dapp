'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import useUser from '@/hooks/useUser'
import { Status } from '@/lib/types'

export default function Home() {
  const [username, setUsername] = useState('')
  const { signupInfo, handleSignup, loginStatus, handleLogin } = useUser()

  const handleSignupForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSignup(username)
  }

  return (
    <main className="flex min-h-screen flex-col justify-between p-4">
      <section className="grow flex flex-col justify-center items-center gap-20 w-full max-w-lg mx-auto">
        <header className="flex items-center gap-5">
          <Image src="/flash-logo.svg" alt="Flash logo" width={73} height={73} />
          <Image src="/flash.svg" alt="Flash" width={153} height={78} />
        </header>

        <article className='w-full flex flex-col gap-10'>
          <form className='flex flex-col gap-5' onSubmit={handleSignupForm}>
            <input
              id="username"
              name="username"
              type="text"
              placeholder='Choose a username'
              autoComplete="username webauthn"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="h-14 px-6 rounded-twice border text-lg font-semibold"
            />
            <Button
              type="submit"
              size="2xl"
              onClick={() => handleSignup(username)}
              disabled={signupInfo.status === Status.PENDING || !username}
              className="rounded-twice"
            >
              {signupInfo.status === Status.ERROR ?
                signupInfo.message || 'Error creating account' :
                signupInfo.status === Status.PENDING ?
                  'Creating' :
                  'Create Account'
              }
              {signupInfo.status === Status.PENDING && <Loader2 className='size-4 animate-spin' />}
            </Button>
          </form>

          <div className="flex justify-center items-center">OR</div>

          <Button
            size="2xl"
            onClick={handleLogin}
            disabled={loginStatus === Status.PENDING}
            variant="outline"
            className="rounded-twice"
          >
            {
              typeof loginStatus === 'string' ?
                loginStatus :
                loginStatus === Status.ERROR ?
                  'Error logging in' :
                  loginStatus === Status.PENDING ?
                    'Logging in' :
                    'Login'
            }
            {loginStatus === Status.PENDING && <Loader2 className='size-4 animate-spin' />}
          </Button>

          <p className='text-center text-sm text-muted-foreground max-w-2xs mx-auto'>
            By continuing, you agree with Flash <Link href="#" className='hover:underline'>Terms of Use</Link> and <Link href="#" className='hover:underline'>Privacy Policy</Link>.
          </p>
        </article>
      </section>
      <footer className="text-center text-sm text-muted-foreground max-w-78 mx-auto">
        Your Flash Account is secured with a passkey - a safer replacement for passwords. <Link href="#" className='hover:underline'>Learn more</Link>
      </footer>
    </main>
  )
}
