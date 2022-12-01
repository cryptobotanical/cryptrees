import { ethers } from 'ethers'
import { Fragment, useState } from 'react'
import { useProvider, useSigner } from 'wagmi'
import { useAccountModal } from '@rainbow-me/rainbowkit';
import  useMint from "../../hooks/ERC721/useMint";
import { getContract, doMint, getMintStats, getMaxSupply } from "../../system/chain";

export default function MintButton({ isText, data, remaining }) {
    const { openConnectModal, isConnected,  } = useAccountModal();
    const { data: signer } = useSigner();
    const provider = useProvider();
    const [isNotAvailable, setNotAvailable] = useState(remaining == 0);
    const isButton = !isText;

    const {onMint, isSuccess, isError, isMinting, isLoading, hash} = useMint({});

    function handleClick() {
        onMint(1, signer).then(async () => {
            const account = await signer.getAddress();
            const mintStats = await getMintStats(account);
            const numberMinted = mintStats.minterNumMinted;
            const maxSupply = mintStats.maxSupply;
            const totalSupply = mintStats.currentTotalSupply;
            setNotAvailable(maxSupply === totalSupply);
            console.log(`Mint Stats: ${numberMinted}/${maxSupply} minted by this account, ${totalSupply}/${maxSupply} minted in total`);
        });
    }
    return (
        <Fragment>
            {(!openConnectModal && data && isText) && (
                <a onClick={() => handleClick()} className="text-amber-600 font-bold uppercase cursor-pointer">mint</a>
            )}
            {(!openConnectModal && data && isButton) && (
                <div className={isLoading ? isMinting ? "animate-pulse animate-bounce" : "animate-pulse" : ""}>
                    <button disabled={isNotAvailable} onClick={() => handleClick()} className="mb-1 p-1 font-bold font-mono text-indigo-600 bg-color-burn bg-gradient-to-b from-yellow-400 to-amber-400 shadow-amber-700 drop-shadow-lg backdrop-blur shadow-sm">
                        {isMinting ? 'Minting...' : 'Mint'} <span className="font-extrabold">{data.price}</span> <span className="text-zinc-600">ETH</span>
                    </button>
                </div>
            )}
        </Fragment>
    )
}