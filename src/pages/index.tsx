import Head from 'next/head'
import store from '@/redux/store'
import { Provider } from 'react-redux'
import TaskSection from '@/components/TaskSection'
import SidePanel from '@/components/SidePanel'
import Heading from '@/components/Heading'

export default function Home() {
  return (
    <Provider store={store}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="topBar">
          <h5>Lorem Ipsum is simply dummy text of the printing</h5>
        </div>
        <SidePanel/>
        <Heading/>
        <TaskSection/>
      </main>
    </Provider>
  )
}
