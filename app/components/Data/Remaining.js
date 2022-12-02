import React, {useState, useEffect} from 'react'
import useSWR from 'swr';
import { useProvider, useAccount } from 'wagmi';
import { getContract, getMaxSupply, getTotalSupply } from '../../system/chain';


export default function Remaining() {
    const [remaining, setRemaining] = useState();
    const { address, isConnected } = useAccount();
    const provider = useProvider();
    const contract = getContract();
    console.log(`[Remaining] address: `, address, contract);

    async function update() {
        const max_p = getMaxSupply();
        const total_p = getTotalSupply();
        Promise.all([max_p, total_p]).then(([max, total]) => {
            const result = parseInt(max) - parseInt(total);
            setRemaining(result);
            console.log(`[Remaining] result: `, result, remaining, max, total);
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
            provider.removeAllListeners(transferTo)
        }
    }, [isConnected]);   
    
    if (!remaining) {
        return <span className="blur text-emerald-600 font-bold">?????</span>
    }
    console.log(`[Remaining] `, remaining);
    return <span className="text-emerald-600 font-bold">{remaining}</span>           
}