import { Fragment, useState } from 'react'
import { useProvider, useSigner } from 'wagmi'
import { useAccountModal } from '@rainbow-me/rainbowkit';
import  useMint from "../../hooks/ERC721/useMint";
import { getContract, doBatchMint, getMintStats, getMaxSupply } from "../../system/chain";

import { PurchaseModal } from "./Modals";

export default function MintButton({ isText, data, remaining }) {
    const { openConnectModal, isConnected,  } = useAccountModal();
    const { data: signer } = useSigner();
    const provider = useProvider();
    const [quantity, setQuantity] = useState(1);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isNotAvailable, setNotAvailable] = useState(remaining == 0);
    const isButton = !isText;

    const { onMint, isSuccess, isError, isMinting, isLoading, hash } = useMint({ onTxSuccess });

    async function onTxSuccess(receipt) {
        console.log(`[onTxSuccess] receipt: `, receipt, `, hash: `, hash);
        setIsDialogOpen(false);
        const mintStats = await getMintStats(receipt.from);
        const numberMinted = mintStats.minterNumMinted;
        const maxSupply = mintStats.maxSupply;
        const totalSupply = mintStats.currentTotalSupply;
        setNotAvailable(maxSupply === totalSupply);
        console.log(`Mint Stats: ${numberMinted}/${maxSupply} minted by this account, ${totalSupply}/${maxSupply} minted in total`);
    }
    function handleClick() {
        onMint(quantity, signer);
    }
    return (
        <Fragment>
            {(!openConnectModal && data && isText) && (
                <a onClick={() => handleClick()} className="text-emerald-600 font-bold uppercase cursor-pointer">mint</a>
            )}
            {(!openConnectModal && data && isButton) && (
                <div className={isLoading ? isMinting ? "animate-pulse animate-bounce" : "animate-pulse" : ""}>
                    <button disabled={isNotAvailable} onClick={() => setIsDialogOpen(true)} className="mb-1 p-1 px-2 font-bold font-mono text-slate-600 bg-gradient-to-b from-green-400 to-emerald-400 hover:from-emerald-400 hover:to-green-400 shadow-indigo-700 glow-sm hover:glow-lg">
                        {isMinting ? 'Minting...' : 'Mint'}
                    </button>
                </div>                
            )}
            {(!openConnectModal && data) && (
                <PurchaseModal 
                    isOpen={isDialogOpen}
                    setIsOpen={setIsDialogOpen}
                    quantity={quantity}
                    setQuantity={setQuantity}
                    isMinting={isMinting}
                    isLoading={isLoading}
                    price={data.price}
                    onClick={handleClick}
                />
                )}
            
        </Fragment>
    )
}