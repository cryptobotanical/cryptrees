import { BigNumber, ethers } from 'ethers';
import { CRYPTREES_MINT_ABI } from '../config/abi';
import {
    OPENSEA_URL,
    NETWORK_NAME,
    CRYPTREES_ADDRESS,
    ALCHEMY_API_KEY,
    INFURA_API_KEY,
} from '../config'

const fetcher = (library, abi) => (...args) => {
    const [arg1, arg2, ...params] = args
    // it's a contract
    if (isAddress(arg1)) {
        const address = arg1
        const method = arg2
        const contract = new Contract(address, abi, library.getSigner())
        return contract[method](...params)
    }
    // it's a eth call
    const method = arg1
    return library[method](arg2, ...params)
}

export function getProvider() {
    const provider = new ethers.providers.AlchemyProvider(NETWORK_NAME, ALCHEMY_API_KEY);
    return provider;
}

export function getContract() {
    return new ethers.Contract(
        ethers.utils.getAddress(CRYPTREES_ADDRESS),
        CRYPTREES_MINT_ABI,
        getProvider()
    );
}

export async function doMint(signer) {
    const contract = getContract();
    const price = await contract.OPEN_MINT_PRICE();
    const tx = {
        gasLimit: '0x55555',
        to: ethers.utils.getAddress(contract.address),
        value: price,
        data: contract.interface.encodeFunctionData('mint', [])
    }

    const response = await signer.sendTransaction(tx);

    return response;
}

export async function doBatchMint(quantity, signer) {
    const contract = getContract();
    const price = await contract.OPEN_MINT_PRICE();
    const tx = {
        gasLimit: '0x55555',
        to: ethers.utils.getAddress(contract.address),
        value: price.mul(BigNumber.from(quantity)),
        data: contract.interface.encodeFunctionData('mint(uint)', [quantity])
    }

    const response = await signer.sendTransaction(tx);

    return response;
}

export async function getMaxSupply() {
    const contract = getContract();
    const data = ethers.utils.formatUnits(await contract.maxSupply(), 0);
    console.log(`[chain] [getMaxSupply] data: `, data);
    return data;
}

export async function getMintStats(account) {
    console.log(`[chain] [getMintStats] account: `, account);
    const contract = getContract();
    const stats = await contract.getMintStats(account);
    console.log(`[chain] [getMintStats] stats: `, stats);
    return stats;
}

export async function getStaticData() {        
    const contract = getContract();
    
    //const name = await contract.name();
    //const symbol = await contract.symbol();
    const price = ethers.utils.formatEther(await contract.OPEN_MINT_PRICE());
    //const maxPerTx = ethers.utils.formatUnits(await contract.MAX_PER_TX(), 0);
    const maxSupply = ethers.utils.formatUnits(await contract.maxSupply(), 0);
    //const baseURI = await contract.baseURI();
    const data = {
        //name: name,
        //symbol: symbol,
        price: price,
        max: maxSupply,
        //txLimit: maxPerTx,
        //baseURI: baseURI
    }
    console.log(`[chain] [getStaticData] data: `, data);
    return data
}

export async function getNextTokenId() {
    const contract = getContract();
    const data = await contract.nextTokenId();
    console.log(`[chain] [getNextTokenId] data: `, data);
    return data.toNumber();
}

export async function getTotalSupply() {
    const contract = getContract();
    const data = ethers.utils.formatUnits(await contract.totalSupply(), 0);
    console.log(`[chain] [getTotalSupply] data: `, data);
    return data;
}
