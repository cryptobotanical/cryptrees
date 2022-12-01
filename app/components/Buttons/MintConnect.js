import {
    useConnectModal
} from '@rainbow-me/rainbowkit';

export default function MintConnect() {
    const { openConnectModal } = useConnectModal();
    
    let classStyle = "text-amber-600 font-bold uppercase cursor-pointer";

    if (openConnectModal) {
        return (
            <a onClick={() => openConnectModal()} className={classStyle}>mint</a>        
        )
    }

    classStyle = "text-amber-600 font-bold uppercase";

    return (
        <span className={classStyle}>mint</span>
    )
}