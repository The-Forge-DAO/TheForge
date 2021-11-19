import React from "react";
import logo from "../../images/Logo.png";

import { NetworkErrorMessage } from "./NetworkErrorMessage";

export function ConnectWallet({ connectWallet, networkError, dismiss }) {
  return (
    <div className="flex flex-col items-center bg-black text-white h-screen">
      <img src={logo} className="w-52 h-52" alt="logo" />
      <div className="text-center">
        <h1 className="text-5xl">The Forge</h1>
        <p className="mt-2">
          A place where crypto entrepreneurs learn, meet and buidl together.
        </p>

        {/* Metamask network should be set to Localhost:8545. */}
        {networkError && (
          <NetworkErrorMessage 
            message={networkError} 
            dismiss={dismiss} 
          />
        )}
      </div>
      <div className="p-4 text-center">
        <p>Please connect to your wallet.</p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 m-4 rounded"
          type="button"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      </div>
    </div>
  );
}
