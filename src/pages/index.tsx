import React from 'react'
import { signOut, useSession } from 'next-auth/client'
import Link from 'next/link'
import App from './_app'

export default function Home() {
  const [ session, loading ] = useSession()
  if (session) {
    console.log(JSON.stringify(session, null, 2))
  }
  return (
    <>
      <p>Index Page</p>
      {!session && loading && <span>Loading ...</span>}
      {!session && !loading && (
        <>
          Not signed in <br />
          <Link href="/api/auth/signin">Sign in</Link>
        </>
      )}
      {session && (
        <>
          Signed in as <img src={session.user.image ?? ""} width="50px" />
          　{session.user.name} <br />
          AccessToken : {session.accessToken} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
    </>
  )
}
