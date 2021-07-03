import { Provider } from 'next-auth/client'
import React from 'react'
import Header from '../components/Header'

import '../styles/globals.css'

// const App = ({ children }) => (
//   <main>
//     <Header />
//     {children}
//   </main>
// )

// export default App

type Props = {
  Component?: any;
  pageProps?: any;
}

const App: React.FC<Props> = ({ Component, pageProps={} }) => (
  <Provider
    session={pageProps.session}
    // options={{
    //   clientMaxAge: 60,  // Re-fetch session if cache is older than 60 seconds
    //   keepAlive: 5 * 60, // Send keepAlive message every 5 minutes
    // }}
    >
    <Header />
    <Component {...pageProps} />
  </Provider>
)

export default App

