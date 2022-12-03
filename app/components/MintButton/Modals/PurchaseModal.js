import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react'
import { ToastContainer } from 'react-toastify';

export default function PurchaseModal({ 
    isOpen, 
    setIsOpen, 
    quantity, 
    setQuantity, 
    isMinting,
    isLoading,
    price, 
    onClick 
}) {    
    return (  
        <Transition
            show={isOpen}
            as={Fragment}
        >      
        <Dialog onClose={() => setIsOpen(false)}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-black/80 z-10" aria-hidden="true" />
            </Transition.Child>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
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
                                        {quantity * price} ETH total
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="px-8 pb-8 flex-row space-x-10">
                            <span className={isLoading ? isMinting ? "animate-pulse animate-bounce" : "animate-pulse" : ""}>
                                <button onClick={() => onClick()} className="mb-1 p-1 px-2 font-bold font-mono text-slate-600 bg-color-burn bg-gradient-to-b from-green-400 to-emerald-400  hover:from-emerald-400 hover:to-green-400 shadow-indigo-700 glow-sm hover:glow-lg">
                                    {isMinting ? 'Minting' : 'Purchase'}
                                </button>
                            </span>
                        <Transition
                            as={"span"}
                            show={!isLoading}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="transition-opacity duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0">
                            <button disabled={isLoading} onClick={() => setIsOpen(false)} className="mb-1 p-1 px-2 font-bold font-mono text-slate-600 bg-color-burn bg-gradient-to-b from-green-400 to-emerald-400 shadow-indigo-700 drop-shadow-lg backdrop-blur shadow-sm">
                                Cancel
                            </button>
                        </Transition>
                        </div>
                    </Dialog.Panel>
                </div>
            </Transition.Child>            
        </Dialog>
        </Transition>
    )
}