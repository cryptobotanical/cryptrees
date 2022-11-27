import { ethers } from 'ethers';

export function getProvider(network_name, alchemy_api) {
    const provider = new ethers.providers.AlchemyProvider(network_name, alchemy_api);
    return provider;
}

export function getContract(provider, contract_address, contract_abi) {
    const contract = new ethers.Contract(
        ethers.utils.getAddress(contract_address),
        contract_abi,
        provider
    );
    return contract;
}

export async function getStaticData(contract) {
    const name = await contract.name();
    const symbol = await contract.symbol();
    const price = ethers.utils.formatEther(await contract.OPEN_MINT_PRICE());
    const maxPerTx = ethers.utils.formatUnits(await contract.MAX_PER_TX(), 0);
    const maxSupply = ethers.utils.formatUnits(await contract.maxSupply(), 0);
    const baseURI = await contract.baseURI();

    return {
        name: name,
        symbol: symbol,
        price: price,
        max: maxSupply,
        txLimit: maxPerTx,
        baseURI: baseURI
    }
}

export async function getNextTokenId(contract) {
    const nextTokenId = await contract.nextTokenId();
    return nextTokenId.toNumber();
}

export async function getTotalSupply(contract) {
    const totalSupply = await contract.totalSupply();
    return totalSupply.toNumber();
}
