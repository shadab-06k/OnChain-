import React, { createContext, useState } from "react";
import { Bounce, toast } from "react-toastify";
const WalletContext = createContext();
const WalletProvider = ({ children }) => {
  const apiIp = process.env.REACT_APP_API_IP;

  const [walletAddress, setWalletAddress] = useState("");
  const handleConnectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });

        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        const walletAddress = accounts[0];

        if (!walletAddress) {
          console.error("No wallet address found.");
          return;
        }

        const signupSuccess = await userSignup(walletAddress);

        if (!signupSuccess) {
          console.error(
            "Failed to connect to the backend. Wallet not connected."
          );
          alert("Unable to connect to the backend. Wallet connection failed.");
          return;
        }

        setWalletAddress(walletAddress);
        console.log("Wallet Address:", walletAddress);

        const baseChainId = "0x2105";
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: baseChainId }],
          });
          console.log("Successfully switched to the Base Network");
        } catch (switchError) {
          if (switchError.code === 4902) {
            console.error("Base Network is not present in your wallet.");
            alert(
              "Base Network is not added to your wallet. Please add it manually."
            );
          } else {
            console.error("Failed to switch to Base Network:", switchError);
          }
        }
      } catch (connectError) {
        console.error("User denied account access:", connectError);
      }
    } else {
      alert("MetaMask not detected");
      console.error("MetaMask not detected");
    }
  };

  const userSignup = async (walletAddress) => {
    try {
      const res = await fetch(`${apiIp}/sign-in`, {
        method: "POST", // Use POST if you're sending data
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ walletAddress }), // Send the wallet address in the body
      });

      // Check if the response is OK (status 200-299)
      if (!res.ok) {
        const text = await res.text(); // Read the response as text
        console.error("Server returned an error:", text);
        alert("Failed to sign in. Please check your server.");
        return false; // Indicate failure
      }

      // Attempt to parse the response as JSON
      const data = await res.json();
      console.log("User Signed in Successfully:", data);
      toast.success("Wallet Connected", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });

      return true; // Indicate success
    } catch (error) {
      console.error("Failed to sign in:", error);
      toast.error("Unable To Connect Wallet", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      return false;
    }
  };

  return (
    <WalletContext.Provider value={{ walletAddress,setWalletAddress, handleConnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};
export { WalletContext, WalletProvider };
