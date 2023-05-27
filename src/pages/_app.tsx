import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import store from '@/redux/store'
import { Provider } from 'react-redux'
import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "web3uikit";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MoralisProvider initializeOnMount={false}>
      <NotificationProvider>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </NotificationProvider>
    </MoralisProvider>
    )
}
