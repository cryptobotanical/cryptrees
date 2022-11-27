import React from "react";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
// components
import MintButton from "../Buttons/MintButton";
import Logo from "../Logo/Logo";
import {
  NETWORK_NAME,
  CRYPTREES_ADDRESS,
  OPENSEA_URL,
} from '../../config'
export default function Navbar({ data, remaining }) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-slate-200 shadow">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link href="/">
              <p className="text-md font-bold leading-relaxed inline-block mr-4 py-0 whitespace-nowrap uppercase">
                <Logo weight={600} />
              </p>

            </Link>

          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block" : " hidden")
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none mr-auto">              
              <li className="flex items-center hover:text-indigo-500 text-slate-600">
                <a
                  className=" px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href={`https://${OPENSEA_URL}/collection/cryptrees`}
                >
                  <i className="text-indigo-700 fa-solid fa-globe  text-lg leading-lg pb-1 mr-1" />{" "}
                  Collection
                </a>
              </li>
              <li className="flex items-center hover:text-indigo-500 text-slate-600 ">
                <Link href="/our-mission" className="px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold">
                  <i className="text-indigo-600 fa-solid fa-heart text-lg leading-lg pb-1 mr-1" />{" "}
                  Our Mission
                </Link>
              </li>
              <li className="flex items-center">
                <a
                  className="hover:text-indigo-500 text-slate-600 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="https://github.com/cryptobotanicals/cryptrees"
                  target="_blank"
                >
                  <i className="text-indigo-500 fab fa-github text-lg leading-lg pb-1 mr-1" />
                  Code
                </a>
              </li>
              <li className="flex items-center">
                <a
                  className="hover:text-indigo-500 text-slate-600 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href={`https://${NETWORK_NAME}.etherscan.io/address/${CRYPTREES_ADDRESS}`}
                  target="_blank"
                >
                  <i className="text-indigo-400 fa fa-gears text-lg leading-lg pb-1 mr-1" />
                  Contract
                </a>
              </li>
              <li className="flex items-center">
                <MintButton data={data} remaining={remaining} />
              </li>
            </ul>
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="flex items-center">
                <ConnectButton />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
