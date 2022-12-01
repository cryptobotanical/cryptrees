import React, {useState, useEffect} from 'react'
import useSWR from 'swr';
import { useProvider, useAccount } from 'wagmi';
import { getContract, getMaxSupply, getTotalSupply } from '../../system/chain';

const fetcher = (library) => (...args) => {
    const [method, ...params] = args
    console.log(method, params)
    const result = library[method](...params);
    
    return result;
}
export default function Remaining() {
    const [remaining, setRemaining] = useState();
    const { address, isConnected } = useAccount();
    const contract = getContract();
    console.log(`[Remaining] address: `, address, contract);
    useEffect(() => {
        const max_p = getMaxSupply();
        const total_p = getTotalSupply();
        Promise.all([max_p, total_p]).then(([max, total]) => {
            const result = parseInt(max) - parseInt(total);
            setRemaining(result);
            console.log(`[Remaining] result: `, result, remaining, max, total);
        })        
    }, [isConnected]);    

    if (!remaining) {
        return <span className="blur text-amber-600 font-bold">?????</span>
    }
    console.log(`[Remaining] `, remaining);
    return <span className="text-amber-600 font-bold">{remaining}</span>           
}