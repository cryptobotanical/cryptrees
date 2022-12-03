/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from "react";
import Image from 'next/image';
import hugePic from '../public/img/brand/huge.png';
import teaser0Pic from '../public/img/brand/teaser0.png';
import teaser1Pic from '../public/img/brand/teaser1.png';
import teaser2Pic from '../public/img/brand/teaser2.png';
import teaser3Pic from '../public/img/brand/teaser3.png';
import teaser4Pic from '../public/img/brand/teaser4.png';
import teaser5Pic from '../public/img/brand/teaser5.png';
import teaser6Pic from '../public/img/brand/teaser6.png';
import teaser7Pic from '../public/img/brand/teaser7.png';
import teaser8Pic from '../public/img/brand/teaser8.png';
import teaser9Pic from '../public/img/brand/teaser9.png';
import teaser10Pic from '../public/img/brand/teaser10.png';
import teaser11Pic from '../public/img/brand/teaser11.png';
import teaser12Pic from '../public/img/brand/teaser12.png';
import teaser13Pic from '../public/img/brand/teaser13.png';
import { useAccount, useProvider, isAddress } from 'wagmi';

import { MintButton } from "../components/MintButton";
import { Remaining, Balance } from "../components/Data";
import IndexNavbar from "../components/Navbars/IndexNavbar.js";
import FooterSmall from "../components/Footers/FooterSmall.js";
import Logo from "../components/Logo/Logo.js";
import { ToastContainer } from 'react-toastify';

import { getContract, getStaticData, getTotalSupply, getMaxSupply } from "../system/chain";
import { useAccountModal, } from '@rainbow-me/rainbowkit';
import 'react-toastify/dist/ReactToastify.min.css';
import {
  OPENSEA_URL,
  NETWORK_NAME,
  CRYPTREES_ADDRESS,
} from '../config';

const contextClass = {
  success: "bg-blue-600",
  error: "bg-red-600",
  info: "bg-gray-600",
  warning: "bg-orange-400",
  default: "bg-indigo-600",
  dark: "bg-white-600 font-gray-300",
};

export default function Index() {
  const [STATIC_DATA, setSTATIC_DATA] = useState();
  const { isConnected } = useAccountModal();
  const provider = useProvider();
  const contract = getContract(provider);

  useEffect(() => {
    getStaticData(contract).then((data) => {
      setSTATIC_DATA(data);
    });
  }, [isConnected]);
  
  
  return (
    <>
      <IndexNavbar fixed data={STATIC_DATA} />
      <section className="header relative items-center flex h-[70vh] mt-0">
        <div className="container mx-auto items-center flex flex-wrap z-2">
          <div className="w-full bg-gray-900 bg-opacity-90 shadow-emerald-500 glow-sm rounded-sm md:w-8/12 lg:w-6/12 xl:w-6/12 px-6">
            <div className="py-2 mt-2 sm:pt-0 lg:pt-0 lg:-mt-2">
              <h2 className="font-semibold text-max pointer-events-none lg:relative lg:-top-4 lg:-left-10">
                <Logo weight={500} />
              </h2>
              <h3 className="text-lg font-semibold font-serif text-indigo-600 uppercase">
                the authentic <Logo weight={600} short /> collection
              </h3>
              <p className="mt-4 text-xl leading-relaxed text-slate-300">
                Presenting the long awaited <Logo weight={600} short /> set of NFTs
                that uniquely showcase your love of nature. Each heroic act of minting a
                new <Logo weight={600} short /> is a forever pact with
                a <Logo weight={600} short /> uniquely yours.
              </p>
              <p className="mt-2 lg:mt-4 text-lg leading-relaxed text-slate-300">
                <Remaining /> available, <Balance /> owned
              </p>              
              <div className="ml-6 mt-4 pb-4">
                <MintButton data={STATIC_DATA} />
              </div>
            </div>
          </div>
        </div>
        <Image
          className="absolute z-0 b-auto right-0 top-0 h-[80vh] lg:h-auto sm:mt-10 shadow-slate-900 shadow-2xl"
          src={hugePic}
          priority={true}

        />
      </section>

      <section className="mt-8 lg:mt-48 md:mt-40 lg:pb-40 relative bg-slate-800">
        <div
          className="-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20"
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 310"
            x="0"
            y="0"
          >
            <polygon
              className="text-slate-800 fill-current"
              points="2560 0 2560 310 0 310"
            ></polygon>
          </svg>
        </div>
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="w-11/12 md:w-6/12 lg:w-4/12 px-2 md:px-4 mr-auto ml-auto mt-4 lg:-mt-32">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-inner shadow-gray-700 rounded-lg bg-zinc-700">
                <Image
                  palceholder="empty"
                  src={teaser1Pic}
                  className="w-full rounded-t-lg"
                />
                <blockquote className="relative p-4 mb-4">
                  <svg
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 583 95"
                    className="absolute left-0 w-full block h-95-px -top-94-px"
                  >
                    <polygon
                      points="0,45 0,95 723,95"
                      className="text-zinc-700 fill-current"
                    ></polygon>
                  </svg>
                  <h4 className="text-3xl font-bold ">
                    <span className="text-indigo-500">181,440</span> possible combinations
                  </h4>
                  <p className="text-xl mt-2 text-slate-300">
                    7 functional attributes that influence how each <Logo weight={500} short /> looks.
                  </p>
                </blockquote>
              </div>
            </div>

            <div className="w-full lg:-mt-32 md:w-6/12 lg:px-4">
              <div className="flex flex-wrap">
                <div className="w-full md:w-6/12 lg:px-4">
                  <div className="relative flex flex-col mt-4">
                    <div className="px-4 pt-5 flex flex-row lg:flex-col">
                      <div className="text-indigo-800 p-3 mr-2 text-center inline-flex items-center justify-center w-2/12 h-12 mb-5 shadow-lg rounded-full bg-gray-900">
                        <i className="fas fa-vial"></i>
                      </div>
                      <h6 className="text-3xl my-1 font-semibold">
                        Innovation
                      </h6>
                    </div>
                    <div className="px-4">
                      <p className="mb-4 text-xl text-slate-300">
                        Procedurally guided AI generated stylized images.
                        Carefully curated and reproducable.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex flex-col min-w-0">
                    <div className="px-4 pt-5 flex flex-row lg:flex-col">
                      <div className="text-indigo-700 p-3 mr-2 text-center inline-flex items-center justify-center w-2/12 h-12 mb-5 shadow-lg rounded-full bg-gray-900">
                        <i className="fas fa-award"></i>
                      </div>
                      <h6 className="text-3xl my-1 font-semibold">
                        Open Mint
                      </h6>
                    </div>
                    <div className="px-4">
                      <p className="mb-4 text-xl text-slate-300">
                        We are currently in the initial public
                        minting phase of {STATIC_DATA ? STATIC_DATA.max : "many"} available tokens.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-6/12 lg:px-4">
                  <div className="relative flex flex-col min-w-0 mt-4">
                    <div className="px-4 pt-5 flex flex-row lg:flex-col">
                      <div className="text-indigo-600 p-3 mr-2 text-center inline-flex items-center justify-center w-2/12 h-12 mb-5 shadow-lg rounded-full bg-gray-900">
                        <i className="fas fa-seedling"></i>
                      </div>
                      <h6 className="text-3xl my-1 font-semibold">Conservation</h6>
                    </div>
                    <div className="px-4">
                      <p className="mb-4 text-xl text-slate-300">
                        We are dedicated to ensuring that the rainforest will be saved.
                        Each <Logo weight={600} /> symbolizes a real tree.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex flex-col min-w-0">
                    <div className="px-4 pt-5 flex flex-row lg:flex-col">
                      <div className="text-indigo-500 p-3 mr-2 text-center inline-flex items-center justify-center w-2/12 h-12 mb-5 shadow-lg rounded-full bg-gray-900">
                        <i className="fas fa-receipt"></i>
                      </div>
                      <h6 className="text-3xl my-1 font-semibold w-10/12">
                        Open Source
                      </h6>
                    </div>
                    <div className="px-4">
                      <p className="mb-4 text-xl text-slate-300">
                        <Logo weight={600} /> is committed to transparency, check out
                        our <a className="text-emerald-500" href="github.com/cryptobotanical/cryptrees">code</a> and the deployed <a className="text-emerald-500" href={`https://${NETWORK_NAME}.etherscan.io/address/${CRYPTREES_ADDRESS}`}>contract</a>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto pb-20">
          <div className="flex flex-wrap items-center">
            <div className="hidden lg:inline w-full md:w-4/12 px-4 lg:px-12 md:px-4 ml-auto mr-auto lg:mt-48">
              <div className="pt-5 flex flex-row lg:flex-col">
                <div className="text-indigo-400 p-3 mr-2 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-gray-900">
                  <i className="fas fa-wand-sparkles text-xl"></i>
                </div>
                <h3 className="text-3xl my-2 font-semibold leading-normal">
                  Technology
                </h3>
              </div>
              <div className="px-0">
                <p className="text-xl leading-relaxed mt-0 mb-4 text-slate-300">
                  Our own innovation that is expressed through layers of
                  masked prompt embeddings - of which each embedding
                  is described by the interpolation between a chain of
                  individual prompt phrases. This allows for the unprecendented
                  granularity of control over the what and where of notoriously
                  stubborn diffusion model output.
                </p>
                <div className="block pb-6">
                  <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-emerald-500 bg-gray-800 uppercase last:mr-0 mr-2 mt-2">
                    Species
                  </span>
                  <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-emerald-500 bg-gray-800 uppercase last:mr-0 mr-2 mt-2">
                    Genotype
                  </span>
                  <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-emerald-500 bg-gray-800 uppercase last:mr-0 mr-2 mt-2">
                    Age
                  </span>
                  <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-emerald-500 bg-gray-800 uppercase last:mr-0 mr-2 mt-2">
                    Environment
                  </span>
                  <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-emerald-500 bg-gray-800 uppercase last:mr-0 mr-2 mt-2">
                    Size
                  </span>
                  <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-emerald-500 bg-gray-800 uppercase last:mr-0 mr-2 mt-2">
                    Location
                  </span>
                  <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-emerald-500 bg-gray-800 uppercase last:mr-0 mr-2 mt-2">
                    Style
                  </span>
                  <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-emerald-500 bg-gray-800 uppercase last:mr-0 mr-2 mt-2">
                    Flavor
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full md:w-5/12 pt-4 pb-20 mb-32 mr-auto ml-auto mt-12 lg:relative lg:-top-20">
              <div className="relative flex flex-col min-w-0 w-full mb-6 mt-48 md:mt-0">
                <Image
                  palceholder="empty"
                  src={teaser0Pic}
                  className="w-full align-middle rounded absolute shadow-lg max-w-100-px left-145-px -top-29-px z-3"
                />
                <Image
                  palceholder="empty"
                  src={teaser10Pic}
                  className="w-full align-middle rounded-lg absolute shadow-lg max-w-210-px left-260-px -top-160-px"
                />
                <Image
                  palceholder="empty"
                  src={teaser2Pic}
                  className="w-full align-middle rounded-lg absolute shadow-lg max-w-180-px left-40-px -top-225-px z-2"
                />
                <Image
                  palceholder="empty"
                  src={teaser3Pic}
                  className="w-full align-middle rounded-lg absolute shadow-2xl max-w-200-px -left-50-px top-25-px"
                />
                <Image
                  palceholder="empty"
                  src={teaser4Pic}
                  className="hidden lg:inline w-full align-middle rounded absolute shadow-lg max-w-[380px] -left-20-px top-210-px"
                />
                <Image
                  palceholder="empty"
                  src={teaser5Pic}
                  className="w-full align-middle rounded absolute shadow-xl max-w-120-px left-195-px top-95-px"
                />
              </div>
            </div>
          </div>

        </div>
      </section>
      
      <section className="pb-16 bg-slate-700 relative pt-2">
        <div
          className="lg:-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20"
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
              className="text-slate-700 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>

      </section>
      <FooterSmall/>
      <ToastContainer
        position="bottom-right"
        theme="dark"
      />
    </>
  );
}