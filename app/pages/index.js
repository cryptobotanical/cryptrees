/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from "react";
import Image from 'next/image'
import hugePic from '../public/img/brand/hugew.png'
import teaser0Pic from '../public/img/brand/teaser0.png'
import teaser1Pic from '../public/img/brand/teaser1.png'
import teaser2Pic from '../public/img/brand/teaser2.png'
import teaser3Pic from '../public/img/brand/teaser3.png'
import teaser4Pic from '../public/img/brand/teaser4.png'
import teaser5Pic from '../public/img/brand/teaser5.png'
import teaser6Pic from '../public/img/brand/teaser6.png'
import teaser7Pic from '../public/img/brand/teaser7.png'
import teaser8Pic from '../public/img/brand/teaser8.png'
import teaser9Pic from '../public/img/brand/teaser9.png'
import teaser10Pic from '../public/img/brand/teaser10.png'
import teaser11Pic from '../public/img/brand/teaser11.png'
import teaser12Pic from '../public/img/brand/teaser12.png'
import teaser13Pic from '../public/img/brand/teaser13.png'
import "@ethersproject/shims";
import { ethers } from 'ethers';
import { useAccount, useNetwork, useProvider, useSigner, isAddress } from 'wagmi';


import MintButton from "../components/Buttons/MintButton";
import RemainingConnect from "../components/Buttons/RemainingConnect";
import IndexNavbar from "../components/Navbars/IndexNavbar.js";
import FooterSmall from "../components/Footers/FooterSmall.js";
import Logo from "../components/Logo/Logo.js";

import { getProvider, getContract, getStaticData, getTotalSupply } from "../system/chain";
import { CRYPTREES_MINT_ABI } from '../config/abi';
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from '@rainbow-me/rainbowkit';
// Works in both a Webapp (browser) or Node.js:
import { SequenceIndexerClient } from '@0xsequence/indexer';

import {
  OPENSEA_URL,
  NETWORK_NAME,
  CRYPTREES_ADDRESS,
  ALCHEMY_API_KEY,
  INFURA_API_KEY,
  POCKET_API_KEY,
  ETHERSCAN_API_KEY,
} from '../config';

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

export default function Index() {
  const [STATIC_DATA, setSTATIC_DATA] = useState();
  const [remainingTokens, setRemainingTokens] = useState();
  const { openAccountModal } = useAccountModal();
  const accountAddress = useAccount();
  const provider = useProvider();
  const contract = getContract(provider, CRYPTREES_ADDRESS, CRYPTREES_MINT_ABI);  

  async function update() {
    const totalSupply = await getTotalSupply(contract);
    console.log(`total supply: ${totalSupply}`);
    setRemainingTokens(STATIC_DATA.max - totalSupply);
  }

  useEffect(() => {
    getStaticData(contract).then((data) => {
      setSTATIC_DATA(data);
    });
    const transfer = contract.filters.Transfer();
    provider.on(transfer, (from, to, amount, event) => {
      console.log('Transfer|received', { from, to, amount, event })
      update();
    });
  }, []);
  useEffect(() => {
    
    if (STATIC_DATA) {
      update();
    }    
    
  }, [STATIC_DATA]);

  useEffect(() => {
    async function pull() {
      console.log('Account', accountAddress);
      const indexer = new SequenceIndexerClient(`https://${NETWORK_NAME}-indexer.sequence.app`);
      const nftBalances = await indexer.getTokenBalances({
        contractAddress: CRYPTREES_ADDRESS,
        accountAddress: accountAddress.address,
        includeMetadata: true
      });
      console.log('collection of items:', nftBalances);
    }
    if (openAccountModal) {
      pull();
    }
  }, [openAccountModal]);
  
  return (
    <>
      <IndexNavbar fixed data={STATIC_DATA} remaining={remainingTokens} />
      <section className="header relative items-center flex h-[70vh]">
        <div className="container mx-auto items-center flex flex-wrap z-10">
          <div className="w-full bg-slate-100 bg-opacity-90 shadow-slate-400 shadow-sm md:w-8/12 lg:w-6/12 xl:w-5/12 px-6">
            <div className="pt-4 sm:pt-0">
              <h2 className="font-semibold text-4xl relative -top-5 -left-10">
                <Logo weight={500} />
              </h2>
              <h3 className="text-lg font-semibold font-serif text-zinc-600 drop-shadow-lg shadow-indigo-600 uppercase">
                the authentic <Logo weight={600} short /> collection
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-slate-500">
                Presenting the long awaited <Logo weight={600} short /> set of NFTs
                that uniquely showcase your commitment to a green future and unyielding resolve to never turn your back on
                humanity's shared mission to save this planet's majestic lungs. Each heroic act of minting a
                new <Logo weight={600} short /> is a forever pact with
                a <Logo weight={600} short /> uniquely yours. Stop the deforestation! Claim your part of this dwindling resource before it is too late!
              </p>
              <RemainingConnect data={STATIC_DATA} remaining={remainingTokens} />
              <div className="ml-12 mt-4 pb-6">
                <MintButton data={STATIC_DATA} remaining={remainingTokens}/>
              </div>
            </div>
          </div>
        </div>
        <Image
          className="absolute z-0 b-auto right-0 top-10 sm:w-6/12 mr-48 sm:mt-0 w-11/12 shadow-slate-300 shadow-2xl"
          src={hugePic}
          alt="..."
        />
      </section>

      <section className="mt-48 md:mt-40 pb-40 relative bg-slate-100">
        <div
          className="-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20"
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 210"
            x="0"
            y="0"
          >
            <polygon
              className="text-slate-100 fill-current"
              points="2560 0 2560 210 0 210"
            ></polygon>
          </svg>
        </div>
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="w-10/12 md:w-6/12 lg:w-4/12 px-12 md:px-4 mr-auto ml-auto -mt-32">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-inner shadow-slate-100 rounded-lg bg-slate-700">
                <Image
                  alt="..."
                  src={teaser13Pic}
                  className="w-full rounded-t-lg"
                />
                <blockquote className="relative p-8 mb-4">
                  <svg
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 583 95"
                    className="absolute left-0 w-full block h-95-px -top-94-px"
                  >
                    <polygon
                      points="0,45 0,95 723,95"
                      className="text-slate-700 fill-current"
                    ></polygon>
                  </svg>
                  <h4 className="text-xl font-bold text-white">
                    181,440 possible combinations
                  </h4>
                  <p className="text-md font-light mt-2 text-white">
                    7 functional attributes that influence
                    more than simply replacing words in a prompt. This
                    collection was built using a Complex-Compositional
                    Prompt system that guided Stable Diffusion.
                  </p>
                </blockquote>
              </div>
            </div>

            <div className="w-full md:w-6/12 px-4">
              <div className="flex flex-wrap">
                <div className="w-full md:w-6/12 px-4">
                  <div className="relative flex flex-col mt-4">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-indigo-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <i className="fas fa-vial"></i>
                      </div>
                      <h6 className="text-xl mb-1 font-semibold">
                        Innovation
                      </h6>
                      <p className="mb-4 text-slate-500">
                        Procedurally guided AI generated stylized images.
                        Carefully curated and reproducable.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex flex-col min-w-0">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-indigo-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <i className="fas fa-award"></i>
                      </div>
                      <h6 className="text-xl mb-1 font-semibold">
                        Open Mint
                      </h6>
                      <p className="mb-4 text-slate-500">
                        We are currently in the initial public
                        minting phase of 4500 available tokens.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-6/12 px-4">
                  <div className="relative flex flex-col min-w-0 mt-4">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-indigo-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <i className="fas fa-seedling"></i>
                      </div>
                      <h6 className="text-xl mb-1 font-semibold">Conservation</h6>
                      <p className="mb-4 text-slate-500">
                        We are dedicated to ensuring that the rainforest will be saved.
                        Each <Logo weight={600} /> symbolizes a real tree.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex flex-col min-w-0">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-indigo-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <i className="fas fa-receipt"></i>
                      </div>
                      <h6 className="text-xl mb-1 font-semibold">
                        Open Source
                      </h6>
                      <p className="mb-4 text-slate-500">
                        <Logo weight={600} /> is committed to transparency, check out
                        our <a className="text-amber-500" href="github.com/cryptobotanical/cryptrees">code</a> and the deployed <a className="text-amber-500" href={`https://${NETWORK_NAME}.etherscan.io/address/${CRYPTREES_ADDRESS}`}>contract</a>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto overflow-hidden pb-20">
          <div className="flex flex-wrap items-center">
            <div className="w-full md:w-4/12 px-12 md:px-4 ml-auto mr-auto mt-48">
              <div className="text-indigo-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                <i className="fas fa-wand-sparkles text-xl"></i>
              </div>
              <h3 className="text-3xl mb-2 font-semibold leading-normal">
                Complex-Compositional Prompts
              </h3>
              <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-slate-600">
                Our own innovation that is expressed through layers of
                masked prompt embeddings - of which each embedding
                is described by the interpolation between a chain of
                individual prompt phrases. This allows for the unprecendented
                granularity of control over the what and where of notoriously
                stubborn diffusion model output.
              </p>
              <div className="block pb-6">
                <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-slate-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                  Species
                </span>
                <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-slate-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                  Genotype
                </span>
                <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-slate-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                  Age
                </span>
                <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-slate-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                  Environment
                </span>
                <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-slate-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                  Size
                </span>
                <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-slate-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                  Location
                </span>
                <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-slate-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                  Style
                </span>
                <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-slate-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                  Flavor
                </span>
              </div>
            </div>

            <div className="w-full md:w-5/12 px-4 mr-auto ml-auto mt-32">
              <div className="relative flex flex-col min-w-0 w-full mb-6 mt-48 md:mt-0">
                <Image
                  alt="..."
                  src={teaser0Pic}
                  className="w-full align-middle rounded absolute shadow-lg max-w-100-px left-145-px -top-29-px z-3"
                />
                <Image
                  alt="..."
                  src={teaser1Pic}
                  className="w-full align-middle rounded-lg absolute shadow-lg max-w-210-px left-260-px -top-160-px"
                />
                <Image
                  alt="..."
                  src={teaser2Pic}
                  className="w-full align-middle rounded-lg absolute shadow-lg max-w-180-px left-40-px -top-225-px z-2"
                />
                <Image
                  alt="..."
                  src={teaser3Pic}
                  className="w-full align-middle rounded-lg absolute shadow-2xl max-w-200-px -left-50-px top-25-px"
                />
                <Image
                  alt="..."
                  src={teaser4Pic}
                  className="w-full align-middle rounded absolute shadow-lg max-w-580-px -left-20-px top-210-px"
                />
                <Image
                  alt="..."
                  src={teaser5Pic}
                  className="w-full align-middle rounded absolute shadow-xl max-w-120-px left-195-px top-95-px"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center pt-32">
            <div className="w-full md:w-6/12 px-4 mr-auto ml-auto mt-32">
              <div className="justify-center flex flex-wrap relative">
                <div className="my-4 w-full lg:w-6/12 px-4">
                  <a
                    href="https://testnets.opensea.io/collection/cryptrees"
                    target="_blank"
                  >
                    <div className="bg-gray-100 shadow-2xl shadow-zinc-600 rounded-2xl text-center p-1 m-5">
                      <Image
                        alt="..."
                        className="shadow-2xl shadow-zinc-600 rounded-full max-w-full w-46 mx-auto p-2 bg-zinc-500"
                        src={teaser6Pic}
                      />
                      <p className="text-lg text-white mt-4 font-semibold">

                      </p>
                    </div>
                  </a>
                  <a
                    href="https://testnets.opensea.io/collection/cryptrees"
                    target="_blank"
                  >
                    <div className="bg-gray-100 shadow-2xl shadow-zinc-600 rounded-2xl text-center p-1 m-5">
                      <Image
                        alt="..."
                        className="shadow-2xl shadow-zinc-600 rounded-full max-w-full w-46 mx-auto p-2 bg-zinc-500"
                        src={teaser7Pic}
                      />
                      <p className="text-lg text-white mt-4 font-semibold">

                      </p>
                    </div>
                  </a>
                  <a
                    href="https://testnets.opensea.io/collection/cryptrees"
                    target="_blank"
                  >
                    <div className="bg-gray-100 shadow-2xl shadow-zinc-600 rounded-2xl text-center p-1 m-5">
                      <Image
                        alt="..."
                        className="shadow-2xl shadow-zinc-600 rounded-full max-w-full w-46 mx-auto p-2 bg-zinc-500"
                        src={teaser8Pic}
                      />
                      <p className="text-lg text-white mt-4 font-semibold">

                      </p>
                    </div>
                  </a>
                </div>
                <div className="my-4 w-full lg:w-6/12 px-4 lg:mt-16">
                  <a
                    href="https://testnets.opensea.io/collection/cryptrees"
                    target="_blank"
                  >
                    <div className="bg-gray-100 shadow-2xl shadow-zinc-600 rounded-2xl text-center p-1 m-5">
                      <Image
                        alt="..."
                        className="shadow-2xl shadow-zinc-600 rounded-full max-w-full w-46 mx-auto p-2 bg-zinc-500"
                        src={teaser9Pic}
                      />
                      <p className="text-lg text-white mt-4 font-semibold">

                      </p>
                    </div>
                  </a>
                  <a
                    href="https://testnets.opensea.io/collection/cryptrees"
                    target="_blank"
                  >
                    <div className="bg-gray-100 shadow-2xl shadow-zinc-600 rounded-2xl text-center p-1 m-5">
                      <Image
                        alt="..."
                        className="shadow-2xl shadow-zinc-600 rounded-full max-w-full w-46 mx-auto p-2 bg-zinc-500"
                        src={teaser10Pic}
                      />
                      <p className="text-lg text-white mt-4 font-semibold">

                      </p>
                    </div>
                  </a>
                  <a
                    href="https://testnets.opensea.io/collection/cryptrees"
                    target="_blank"
                  >
                    <div className="bg-gray-100 shadow-2xl shadow-zinc-600 rounded-2xl text-center p-1 m-5">
                      <Image
                        alt="..."
                        className="shadow-2xl shadow-zinc-600 rounded-full max-w-full w-46 mx-auto p-2 bg-zinc-500"
                        src={teaser11Pic}
                      />
                      <p className="text-lg text-white m-2 font-semibold">

                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <div className="w-full md:w-4/12 px-12 md:px-4 ml-auto mr-auto mt-48">
              <div className="text-indigo-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                <i className="fas fa-sack-dollar text-xl"></i>
              </div>
              <h3 className="text-3xl mb-2 font-semibold leading-normal">
                Secondary Market
              </h3>
              <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-slate-600">
                To facilitate the best secondary market trading experience, the ERC721A based
                smart contract has been hand tailored to interface seamlessly with the latest
                OpenSea and SeaDrop specifications.
              </p>
              <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-slate-600">
                We expect there to be a long term secondary potential for this collection,
                so while it is initially participating in OpenSea's Operator Filter Registry,
                we included an escape hatch into the contract to ensure it will never become stuck
                if that registry stops acting in good faith.
              </p>
          </div>
        </div>
      </div>
      </section>
      <section>
      </section>
      <section className="pb-16 bg-slate-200 relative pt-32">
        <div
          className="-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20"
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-slate-200 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>

      </section>
      <FooterSmall/>
    </>
  );
}