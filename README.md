# TaskChain - Decentralized To-Do Web App

Please note that there is another branch, `local-storage-persist`, of the repository that uses Redux with persistent local storage to retain the task list even after refreshing the page.

![TaskChain Logo](taskchain_logo.png)

TaskChain is a decentralized to-do web app built with Next.js, TypeScript, and Redux. It leverages the power of blockchain technology to provide a secure and transparent task management solution.

The smart contract for TaskChain is deployed on the Polygon Testnet Mumbai. The contract address is `0xb59484Fc012d62E00036C779A9bd098c5F54f3ED`.

## Features

- **Decentralized Task Management**: TaskChain utilizes blockchain technology to decentralize task storage and ensure data integrity and resilience.
- **Create and Organize Tasks**: Easily create, organize, and prioritize your tasks in an intuitive user interface.
- **Synchronization Across Devices**: Enjoy seamless synchronization of your tasks across multiple devices, allowing you to stay productive anytime, anywhere.
- **Secure and Transparent**: TaskChain ensures the utmost security and transparency in task management by leveraging the benefits of blockchain technology.
- **User-Friendly Interface**: Experience a seamless user interface with intuitive navigation, making task management a breeze.

## Technologies Used

- Next.js: A powerful React framework for building server-side rendered and static websites.
- TypeScript: A statically typed superset of JavaScript that enhances code reliability and maintainability.
- Redux: A predictable state container for managing application state.
- Blockchain Technology: TaskChain utilizes blockchain technology for decentralized task storage and data integrity.

## Getting Started

Follow the instructions below to get a local copy of TaskChain up and running on your machine.

### Prerequisites

- Node.js (v12 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository: `git clone https://github.com/your-username/taskchain.git`
2. Navigate to the project directory: `cd taskchain`
3. Install the dependencies: `npm install`

### Running the App

1. Start the development server: `npm run dev`
2. Open your browser and access TaskChain at `http://localhost:3000`

## Usage

You can find the live hosted website on the following links:

- TaskChain (main branch): [Vercel Link](https://task-chain-theta.vercel.app/)
- TaskChain (local storage persist branch): [Vercel Link](https://task-chain-local.vercel.app/)

To interact with TaskChain, you need to create a wallet account like MetaMask and configure it to connect to the Polygon Testnet Mumbai network using the following settings:

- Network Name: Mumbai Testnet
- RPC URL: https://rpc-mumbai.maticvigil.com/
- Chain ID: 80001
- Currency Symbol: Matic
- Block Explorer URL: https://polygonscan.com/

After configuring MetaMask, you can use the following faucet to get some Matic tokens for gas: [Polygon Faucet](https://faucet.polygon.technology/).

Once you have completed the setup, open the TaskChain website, and you will be able to interact with it.

## License

TaskChain is released under the [MIT License](LICENSE).

## Contact

If you have any questions or suggestions
