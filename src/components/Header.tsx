import * as React from 'react'
import Link from 'next/link'

type Props = {
  pathname?: string;
}

const Header: React.FC<Props> = ({ pathname="" }) => (
  <header>
    <Link href="/">
      <a className={pathname === '/' ? 'is-active' : ''}>Home</a>
    </Link>{' '}
    <Link href="/about">
      <a className={pathname === '/about' ? 'is-active' : ''}>About</a>
    </Link>
    <Link href="/api/auth/signin">
      <a className={pathname === '/api/auth/signin' ? 'is-active' : ''}>SignIn</a>
    </Link>
  </header>
)

export default Header
