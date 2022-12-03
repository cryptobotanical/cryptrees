import React, { useState, useEffect } from 'react';
import { useProvider, useAccount } from 'wagmi';
import { getContract, getMintStats } from '../../system/chain';


export default function Balance() {
    const [balance, setBalance] = useState();
    const { address, isConnected } = useAccount();
    const provider = useProvider();
    const contract = getContract();   

    async function update() {
        getMintStats(address).then((data) => {
            const result = parseInt(data.minterNumMinted);
            setBalance(result);
            console.log(`[Balance] result: `, result, data, balance);
        });
    }
    useEffect(() => {
        update();

        const transferTo = contract.filters.Transfer(null, address);
        provider.on(transferTo, (from, to, amount, event) => {
            console.log('Transfer|received', { from, to, amount, event });
            update();
        });

        return () => {
            provider.removeAllListeners(transferTo);
        }
    }, [isConnected]);

    if (!balance) {
        return <span className="blur text-emerald-600 font-bold">?????</span>
    }
    console.log(`[Balance] `, balance);
    return <span className="text-emerald-600 font-bold">{balance}</span>
}