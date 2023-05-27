import React, { useEffect, useState } from "react";
import { ConnectButton } from "web3uikit"
import { useMoralis,useNFTBalances} from "react-moralis";
import { CiWallet } from "react-icons/ci";

export default function Heading(){
    const {
        account,
        isAuthenticated,
        logout,
        deactivateWeb3,
        enableWeb3,
        isWeb3Enabled,
        isInitialized,
        isWeb3EnableLoading,
        isAuthenticating,
        authenticate,
        chainId, 
        web3,
        Moralis,
    } = useMoralis()



    useEffect(() => {
        Moralis.onAccountChanged((address) => {
            if (!address) disconnectWallet();
        });
    }, []);

    const [balance, setBalance] = useState<{
        formatted?: string;
        balance?: unknown;
    }>({});

    useEffect(() => {
        if (account && chainId) {
            web3?.getBalance(account).then((result) => {
                // eslint-disable-next-line new-cap
                setBalance({
                    formatted: String(
                        Number(
                            Moralis.Units.FromWei(result.toString()),
                        ).toFixed(4),
                    ),
                    balance: result,
                });
            });
        }
    }, [account, chainId]);

    async function disconnectWallet() {
        // to avoid problems in Next.JS apps because of localStorage
        if (typeof window == 'undefined') return;
        window.localStorage.removeItem('provider');
        deactivateWeb3();
        if (isInitialized) logout();
    }

    return(
        <div className="selHeading">
            <div className="headingSection">
                <p>Section</p>
            </div>
            {isWeb3Enabled?
            <div className="headingWallet">
                <CiWallet/>
                <p>{"0.2" && balance?.formatted} MATIC</p>
                <button
                    onClick={()=>disconnectWallet()}
                >Disconnect</button>
            </div>
            :<ConnectButton moralisAuth={false}/>}
            
        </div>
    )
}