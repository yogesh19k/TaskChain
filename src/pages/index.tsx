import Head from 'next/head'
import store,{persistor} from '@/redux/store'
import { Provider } from 'react-redux'
import TaskSection from '@/components/TaskSection'
import SidePanel from '@/components/SidePanel'
import Heading from '@/components/Heading'
import { PersistGate } from 'redux-persist/integration/react'


export default function Home() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Head>
          <title>TaskChain</title>
          <meta name="description" content="TaskChain is a cutting-edge decentralized to-do app that revolutionizes the way you manage and track your tasks. Powered by blockchain technology, TaskChain ensures the utmost security, transparency, and reliability in task management. With TaskChain, you can effortlessly create, organize, and prioritize your tasks, all while enjoying the benefits of decentralization. Say goodbye to centralized task management systems and embrace the power of TaskChain's distributed network, where your tasks are securely stored across multiple nodes, ensuring resilience and data integrity. Experience a seamless user interface, intuitive navigation, and seamless synchronization across devices, allowing you to stay productive anytime, anywhere. Join the decentralized task management revolution with TaskChain and take control of your to-do lists like never before." />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/todo-icon.png" />
        </Head>
        <main>
          <div className="topBar">
            <h5>Lorem Ipsum is simply dummy text of the printing</h5>
          </div>
          <SidePanel/>
          <Heading/>
          <TaskSection/>
        </main>
      </PersistGate>
    </Provider>
  )
}
