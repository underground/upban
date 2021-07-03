import { signIn } from "next-auth/client";

// https://next-auth.js.org/configuration/pages
export default function SignIn() {
  return (
    <div>
      <button onClick={() =>
        signIn('google', {
          callbackUrl: new URL('/profile', window.location.origin).href,
        })}>
        Sign in with Google
      </button>
    </div>
  );
}
