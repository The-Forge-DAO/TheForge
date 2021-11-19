import { ethers } from "ethers";
import React, { useState, useEffect } from "react"

import TheForge from "./../contracts/TheForge.json";

const CONTRACT_ADDRESS_THEFORGE = "0xE5868B98E594510788F469ec5ca0440FCAb05873";

const MintingHammer = () => {
    
  const { ethereum } = window;
  const [ addressInvitee, setAddressInvitee ] = useState("");
  const [ connectedContract, setConnectedContract ] = useState("");
  const [ nbInvite, setNbInvite ] = useState("");

  useEffect(() => {
    async function getContract() {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const addressUser = await signer.getAddress();
      const contract = new ethers.Contract(CONTRACT_ADDRESS_THEFORGE, TheForge.abi, signer);

      // const balance = await contract.hasInvite(addressUser);

      setConnectedContract(contract);
    }

    getContract();
  }, [])
  
  const mintHammer = async () => {
    try {
      if (ethereum) {
        if(ethers.utils.isAddress(addressInvitee)) {
          console.log("Going to pop wallet now to pay gas...")
          let tx = await connectedContract.mint(addressInvitee);
          console.log("Mining...please wait.")
          await tx.wait()
          console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${tx.hash}`);
        } else (alert("Enter a valid address"));
      } else {console.log("We need ethereum");}
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    mintHammer();
  }
  
  return (
    <form className="">
      <div className="bg-white rounded px-8 pt-6 pb-8 mb-4 max-w-md mx-auto sm:max-w-xl">
        <label
          className="block text-gray-700 text-lg font-bold mb-2"
          htmlFor="invitation"
        >
          Who will you summon?
        </label>
        <input
          className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 text-black rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
          type="string"
          id="invitation"
          onChange={(e) => setAddressInvitee(e.target.value)}
          value={addressInvitee}
          placeholder="Insert wallet address..."
        />
      </div>
      <button className="bg-white hover:bg-gray-400 box-border h-16 w-48 text-black text-base font-bold mb-10 rounded" onClick={handleSubmit}>
        Summon
      </button>
    </form>
  )
}

export default MintingHammer;
