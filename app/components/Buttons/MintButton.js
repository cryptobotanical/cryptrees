import { ethers } from 'ethers'
import { toast } from 'react-toastify';
import { Fragment, useEffect, useState } from 'react'
import BN from 'ethers'
import { useAccount, useNetwork, useProvider, useSigner } from 'wagmi'
import {
    useConnectModal,
    useAccountModal,
} from '@rainbow-me/rainbowkit';

import {
    OPENSEA_URL,
    NETWORK_NAME,
    CRYPTREES_ADDRESS,
    ALCHEMY_API_KEY,
    INFURA_API_KEY,
} from '../../config'
import { CRYPTREES_MINT_ABI } from '../../config/abi';

export default function MintButton({ isText, data, remaining }) {
    const { openAccountModal } = useAccountModal();
    const { data: signer } = useSigner();
    const provider = useProvider();
    const [isSuccess, setSuccessState] = useState(false);
    const [isMinting, setMintingState] = useState(false);
    const [isLoading, setLoadingState] = useState(false);
    const [hash, setHash] = useState(null);
    const [isNotAvailable, setNotAvailable] = useState(remaining == 0);
    const isButton = !isText;

    function handleClick() {
        sendMint().then(async () => {
            const account = await signer.getAddress();
            const contract = new ethers.Contract(CRYPTREES_ADDRESS, CRYPTREES_MINT_ABI,
                provider);
            const mintStats = await contract.getMintStats(account);
            const numberMinted = mintStats.minterNumMinted;
            const maxSupply = mintStats.maxSupply;
            const totalSupply = mintStats.currentTotalSupply;
            setNotAvailable(maxSupply === totalSupply);
            console.log(`Mint Stats: ${numberMinted}/${maxSupply} minted by this account, ${totalSupply}/${maxSupply} minted in total`);
        });

    }
    const sendMint = async () => {
        try {
            setLoadingState(true);
            setSuccessState(false);
            setHash(null);

            const account = await signer.getAddress();
            const amount = ethers.utils.parseEther(data.price);

            console.log(`Mint txn on ${signer.getChainId()} @ ${data.price} from ${account} to ${CRYPTREES_ADDRESS}`);

            const tx = {
                gasLimit: '0x55555',
                to: ethers.utils.getAddress(CRYPTREES_ADDRESS),
                value: amount,
                data: new ethers.utils.Interface(CRYPTREES_MINT_ABI).encodeFunctionData('mint', [])
            }

            const balance1 = await provider.getBalance(account);
            console.log(`balance of ${account}, before: ${ethers.utils.formatEther(balance1)}`);
            const txnResp = await signer.sendTransaction(tx);
            setMintingState(true);
            const txReceipt = await toast.promise(txnResp.wait(1), {
                pending: 'Buying Tree...',
                success: 'Tree bought!',
                error: 'Error buying Tree.',
            });

            console.log(`receipt:`, txReceipt);
            setHash(txReceipt.transactionHash);
            const balance2 = await provider.getBalance(account);
            console.log(`[${hash}] ${txReceipt.transactionHash} balance of ${account}, after: ${ethers.utils.formatEther(balance2)} - difference: ${ethers.utils.formatEther(balance1.sub(balance2))}`);
            setMintingState(false);
            setLoadingState(false);
            setSuccessState(true);
        } catch (e) {
            console.error(e);
            setLoadingState(false);
        }
    }

    return (
        <Fragment>
            {(openAccountModal && data && isText) && (
                <a onClick={() => handleClick()} className="text-amber-600 font-bold uppercase cursor-pointer">mint</a>
            )}
            {(openAccountModal && data && isButton) && (
                <div className={isLoading ? isMinting ? "animate-pulse animate-bounce" : "animate-pulse" : ""}>
                    <button disabled={isNotAvailable} onClick={() => handleClick()} className="mb-1 p-1 font-bold font-mono text-violet-800 bg-color-burn bg-gradient-to-b from-yellow-400 to-amber-500 shadow-amber-700 drop-shadow-lg backdrop-blur shadow-sm">
                        {isMinting ? 'Minting...' : 'Mint'} <span className="font-extrabold">{data.price}</span> <span className="text-zinc-600">ETH</span>
                    </button>
                </div>
            )}
        </Fragment>
    )
}