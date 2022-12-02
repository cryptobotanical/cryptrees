import { Fragment, useState } from 'react'
import { useProvider, useSigner } from 'wagmi'
import { useAccountModal } from '@rainbow-me/rainbowkit';
import  useMint from "../../hooks/ERC721/useMint";
import { getContract, doMint, getMintStats, getMaxSupply } from "../../system/chain";
import { Popover, Dialog } from '@headlessui/react';

import { PRICE_ETH } from "../../config";

export default function MintButton({ isText, data, remaining }) {
    const { openConnectModal, isConnected,  } = useAccountModal();
    const { data: signer } = useSigner();
    const provider = useProvider();
    const [quantity, setQuantity] = useState(1);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isNotAvailable, setNotAvailable] = useState(remaining == 0);
    const isButton = !isText;

    const {onMint, isSuccess, isError, isMinting, isLoading, hash} = useMint({});

    function handleClick() {
        onMint(quantity, signer).then(async () => {
            setIsDialogOpen(false);
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
                <a onClick={() => handleClick()} className="text-emerald-600 font-bold uppercase cursor-pointer">mint</a>
            )}
            {(!openConnectModal && data && isButton) && (
                <div className={isLoading ? isMinting ? "animate-pulse animate-bounce" : "animate-pulse" : ""}>
                    <button disabled={isNotAvailable} onClick={() => setIsDialogOpen(true)} className="mb-1 p-1 px-2 font-bold font-mono text-slate-600 bg-color-burn bg-gradient-to-b from-green-400 to-emerald-400 shadow-indigo-700 drop-shadow-lg backdrop-blur glow-sm border-transparent border-2 hover:border-indigo-700">
                        {isMinting ? 'Minting...' : 'Mint'}
                    </button>
                </div>                
            )}
            {(!openConnectModal && data) && (
                <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
                    <div className="fixed inset-0 bg-black/80 z-10" aria-hidden="true" />
                    <div className="fixed inset-0 flex items-center justify-center p-4 z-10">
                        <Dialog.Panel className="relative flex flex-col min-w-0 break-words border-emerald-400 border-2 bg-zinc-800 w-auto mb-8 shadow-lg rounded-lg">
                            <div className="px-4 py-5 flex-auto">
                                <Dialog.Title className="text-2xl font-bold">
                                    Select Quantity
                                </Dialog.Title>
                                <Dialog.Description className="mt-2 mb-4 text-xl text-slate-300">
                                    Bulk minting happens in a single transaction
                                </Dialog.Description>  
                                <div className="flex">
                                    <div className="flex flex-row space-x-4">
                                        <input type="number" value={quantity} min={1} max={29} onChange={(e) => setQuantity(e.target.value)} className='text-slate-200 w-4/12 my-4 mx-1 block rounded-md bg-slate-800 border-transparent focus:border-gray-500 focus:bg-slate-700 focus:ring-0' />
                                        
                                        <p className='relative top-6 text-emerald-400 w-6/12 block'>
                                            {quantity * data.price} ETH total
                                        </p>
                                    </div>                            
                                </div>                            
                            </div>
                            <div className="px-8 pb-8 flex-row space-x-10">
                                <button onClick={() => handleClick()} className="mb-1 p-1 px-2 font-bold font-mono text-slate-600 bg-color-burn bg-gradient-to-b from-green-400 to-emerald-400 shadow-indigo-700 drop-shadow-lg backdrop-blur shadow-sm">
                                    {isMinting ? 'Minting' : 'Purchase'}
                                </button>
                                <button onClick={() => setIsDialogOpen(false)} className="mb-1 p-1 px-2 font-bold font-mono text-slate-600 bg-color-burn bg-gradient-to-b from-green-400 to-emerald-400 shadow-indigo-700 drop-shadow-lg backdrop-blur shadow-sm">
                                    Cancel
                                </button>
                            </div>
                        </Dialog.Panel>
                    </div>
                </Dialog>
                )}
        </Fragment>
    )
}