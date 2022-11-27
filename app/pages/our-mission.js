import React, { useEffect, useState } from "react";
import { useProvider } from 'wagmi';
// components
import Navbar from "../components/Navbars/IndexNavbar.js";
import FooterSmall from "../components/Footers/FooterSmall.js";
import Logo from "../components/Logo/Logo.js";

import { getProvider, getContract, getStaticData, getTotalSupply } from "../system/chain";
import { CRYPTREES_MINT_ABI } from '../config/abi';
import {
  OPENSEA_URL,
  NETWORK_NAME,
  CRYPTREES_ADDRESS,
  ALCHEMY_API_KEY,
  INFURA_API_KEY,
  POCKET_API_KEY,
  ETHERSCAN_API_KEY,
} from '../config';


export default function Mission() {
  const [STATIC_DATA, setSTATIC_DATA] = useState();
  const [remainingTokens, setRemainingTokens] = useState();
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

  return (
    <>
      <Navbar transparent data={STATIC_DATA} remaining={remainingTokens} />
      <main>
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-75 bg-black"
            ></span>
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-8/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12">
                  <h1 className="text-slate-200 font-semibold text-5xl">
                    <Logo weight={600} /> are a powerful statement against deforestation
                  </h1>
                  <p className="mt-4 text-lg text-slate-200">
                    A million species are at risk of extinction this century, each unique and irreplaceable.
                    The leading cause is habitat destruction, and the most valuable habitat is rainforest.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-16"
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
        </div>

        <section className="pb-20 bg-slate-200 -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-indigo-400">
                      <i className="fas fa-gear"></i>
                    </div>
                    <h6 className="text-xl font-semibold">How It Works</h6>
                    <p className="mt-2 mb-4 text-slate-500">
                      Our unique, cost-effective conservation model for protecting endangered species is simply to raise awareness through sharing <Logo weight="500" />!
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-indigo-400">
                      <i className="fas fa-thumbs-up"></i>
                    </div>
                    <h6 className="text-xl font-semibold">Real Testimonial</h6>
                    <p className="mt-2 mb-4 text-slate-500">
                      "<Logo weight={500} /> is an excellent way to signal that you love trees and in general support a sustainable future."
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-indigo-400">
                      <i className="fas fa-fingerprint"></i>
                    </div>
                    <h6 className="text-xl font-semibold">Verified Company</h6>
                    <p className="mt-2 mb-4 text-slate-500">
                      We establish strategic partnerships with the world’s most experienced and
                      committed. Our partners’ know this best.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center mt-32">
              <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                <div className="text-slate-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                  <i className="fas fa-user-friends text-xl"></i>
                </div>
                <h3 className="text-3xl mb-2 font-semibold leading-normal">
                  Working with us is a pleasure
                </h3>
                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-slate-600">
                  <Logo weight={600} /> is able to allocate 100% of donations to our operating expenses,
                  as we cover all of conservation action through donations made by our Board, and other supporters.
                  This means you can give knowing your whole gift will protect us.
                </p>
              </div>

              <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-slate-700">
                  <img
                    alt="..."
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80"
                    className="w-full align-middle rounded-t-lg"
                  />
                  <blockquote className="relative p-8 mb-4">
                    <svg
                      preserveAspectRatio="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 583 95"
                      className="absolute left-0 w-full block h-95-px -top-94-px"
                    >
                      <polygon
                        points="-30,95 583,95 583,65"
                        className="text-slate-700 fill-current"
                      ></polygon>
                    </svg>
                    <h4 className="text-xl font-bold text-white">

                    </h4>
                    <p className="text-md font-light mt-2 text-slate-100">
                      Thanks to the generosity of our donors, the expertise of our partners
                      and the existance of local communities across the tropics, our models are exemplary.
                    </p>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <FooterSmall OPENSEA_URL={OPENSEA_URL}/>
    </>
  );
}
