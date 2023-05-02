import '@reactants/core/index.css'
import { Provider } from '@reactants/core'
import { AppProps } from 'next/app'

import '../globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  )
}
