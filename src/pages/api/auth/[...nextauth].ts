import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { FirebaseAdapter } from "@next-auth/firebase-adapter";
import firebase from "firebase/app"
import "firebase/firestore"

const scopes = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/drive",
];

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSEGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
}

console.log("process.env.GOOGLE_ID:", process.env.GOOGLE_ID)

const options = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
      scope: scopes.join(" "),
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/',
    error: '/auth/signin',
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: null,
  },
  callbacks: {
    async signIn(_user, account, profile) {
      console.log("signIn", _user, account, profile);
      if (account.provider === 'google' &&
          profile.verified_email === true) {
        return true;
      }
      return false;
    },
    async redirect(url, baseUrl) {
      console.log("redirect", url, baseUrl);
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    // async jwt(token, user, account, profile, isNewUser) {
    //   console.log("jwt", token, user, account, profile, isNewUser);
    //   if (account?.accessToken) {
    //     token.accessToken = account.accessToken;
    //   }
    //   return token;
    // },
    // async session(session, token) {
    //   console.log("session", session, token);
    //   session.accessToken = (token as GenericObject).accessToken;
    //   return session;
    // },
  },
  // logger: console,
  debug: process.env.NODE_ENV === "development",
}

export default async (req, res) => {
  let app = undefined
  if (firebase.apps[0]) {
    app = firebase.apps[0]
  } else {
    if (Object.values(firebaseConfig).every(v => !!v)) {
      // For vercel or localhost
      app = firebase.initializeApp(firebaseConfig)
    } else if (req.headers.origin) {
      // For firebase or localhost(firebase emulator)
      const res = await fetch(new URL('/__/firebase/init.json', req.headers.origin).href);
      if (res.ok) {
        const config = await res.json();
        app = firebase.initializeApp(config)
      } else {
        console.log("url", req.url)
        console.log("Failed load firebase config file.", res)
      }
    }
  }
  return NextAuth(req, res, { ...options, adapter: app ? FirebaseAdapter(app.firestore()) : undefined })
}
