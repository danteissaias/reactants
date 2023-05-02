import '@reactants/ui/index.css'
import { Provider } from '@reactants/ui'
import { AppProps } from 'next/app'

import '../globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  )
}
