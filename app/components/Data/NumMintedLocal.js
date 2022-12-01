import React from 'react'
import { useSWR } from 'swr';
import { useWeb3React } from '@web3-react/core';
import { useContract } from '../../system/chain';

const fetcher = (library) => (...args) => {
    const [method, ...params] = args
    console.log(method, params)
    return library[method](...params)
}
export default function Remaining() {
    const { account, library } = useWeb3React();
    const { contract } = useContract();

    const { data: stats } = useSWR(['getMintStats', contract, account], {
        fetcher: fetcher(library),
    })

    if (!stats) {
        return <span className="blur text-amber-600 font-bold">?????</span>
    }

    const numberMinted = stats.minterNumMinted;

    return <span className="text-amber-600 font-bold">{numberMinted}</span>           
}