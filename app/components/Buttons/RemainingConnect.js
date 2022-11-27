import {
    useConnectModal
} from '@rainbow-me/rainbowkit';

export default function RemainingConnect({tokenData, remaining}) {
    const { openConnectModal, isConnected } = useConnectModal();

    return (
        <p className="mt-4 text-xl leading-relaxed text-slate-500">
            <span className="text-amber-600 font-bold">{remaining}</span> are still available to <a onClick={() => openConnectModal ? openConnectModal() : null} className="text-amber-600 font-bold uppercase cursor-pointer">mint</a>!
        </p>
    )
}