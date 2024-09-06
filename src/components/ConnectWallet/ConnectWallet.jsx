import React, { useEffect, useState } from "react";
import "./ConnectWallet.css";
import { FaWallet } from "react-icons/fa";
import sendNftImg from "../../assets/Images/sendNftImg1.png";
import { ethers } from "ethers";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

// const Loader = () => (
//   <section className="dots-container">
//     <div className="dot"></div>
//     <div className="dot"></div>
//     <div className="dot"></div>
//     <div className="dot"></div>
//     <div className="dot"></div>
//   </section>
// );

const ConnectWallet = () => {
  const [inputValueSendMessage, setInputValueSendMessage] = useState("");
  const [inputValueSendNft, setInputValueSendNft] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [fileNameMessage, setFileNameMessage] = useState("");
  const [fileNameNft, setFileNameNft] = useState("");
  const [fileNameNftImage, setFileNameNftImage] = useState("");
  const [gasPriceSendMessage, setGasPriceSendMessage] = useState("");
  const [totalCostSendMessage, setTotalCostSendMessage] = useState("");
  const [coast, setCoast] = useState("");
  const [orderId, setOrderId] = useState("");
  const [orderIdNft, setOrderIdNft] = useState("");
  const [orderIdNftImage, setOrderIdNftImage] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [toAddressNft, setToAddressNft] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingNft, setLoadingNft] = useState(false);
  const [loadingNftImage, setLoadingNftImage] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [uploadedNft, setUploadedNft] = useState(false);
  const [uploadedNftImage, setUploadedNftImage] = useState(false);
  const [isInputReadOnly, setIsInputReadOnly] = useState(false);
  const [isInputReadOnlyNft, setIsInputReadOnlyNft] = useState(false);
  const [totalGasEstimationWei, setTotalGasEstimationWei] = useState("");

  // console.log("toAddressNft", toAddressNft);

  const apiIp = process.env.REACT_APP_API_IP;
 

  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          console.log("Account changed to:", accounts[0]);
        } else {
          setWalletAddress("");
          console.log("No accounts found.");
        }
      };

      window.ethereum.on("accountsChanged", handleAccountsChanged);

      return () => {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      };
    }
  }, []);

  // Handle account change and chain change
  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          console.log("Account changed to:", accounts[0]);
        } else {
          setWalletAddress("");
          console.log("No accounts found.");
        }
      };

      const handleChainChanged = () => {
        // Optional: handle chain change if necessary
        window.location.reload(); // Reload the page if the network changes
      };

      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleChainChanged);

      return () => {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
        window.ethereum.removeListener("chainChanged", handleChainChanged);
      };
    }
  }, []);
  const userSignup = async (walletAddress) => {
    try {
      const res = await fetch(`http://${apiIp}/sign-in`, {
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
      return false; // Indicate failure
    }
  };

  // const userSignup = async (walletAddress) => {
  //   try {
  //     const res = await fetch(`http://${apiIp}/sign-in`, {
  //       method: "POST", // Use POST if you're sending data
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ walletAddress }), // Send the wallet address in the body
  //       // Remove the 'no-cors' mode
  //     });

  //     // Check if the response is OK (status 200-299)
  //     if (!res.ok) {
  //       const text = await res.text(); // Read the response as text
  //       console.error("Server returned an error:", text);
  //       alert("Failed to sign in. Please check your server.");
  //       return;
  //     }

  //     // Attempt to parse the response as JSON
  //     const data = await res.json();
  //     console.log("User Signed in Successfully:", data);
  //     toast.success("Wallet Connected", {
  //       position: "top-right",
  //       autoClose: 3000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: false,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "dark",
  //       transition: Bounce,
  //     });
  //   } catch (error) {
  //     console.error("Failed to sign in:", error);
  //     toast.error("Unable To Connect Wallet", {
  //       position: "top-left",
  //       autoClose: 3000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: false,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "dark",
  //       transition: Bounce,
  //     });
  //   }
  // };

  const executeOrder = async (walletAddress, OrderID) => {
    try {
      const res = await fetch(`http://${apiIp}/execute-txn`, {
        method: "POST", // Use POST if you're sending data
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ walletAddress, OrderID }), // Send the wallet address in the body
        // Remove the 'no-cors' mode
      });

      // Check if the response is OK (status 200-299)
      if (!res.ok) {
        const text = await res.text(); // Read the response as text
        console.error("Server returned an error:", text);
        alert("Failed to sign in. Please check your server.");
        return;
      }

      // Attempt to parse the response as JSON
      const data = await res.json();
      console.log("Transaction Success:", data);
      // toast.promise("Transaction In Progress", {
      //   position: "top-right",
      //   autoClose: 3000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: false,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "dark",
      //   transition: Bounce,
      // });
    } catch (error) {
      console.error("Transaction failed ", error);
    }
  };

  const handleConnectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        const walletAddress = accounts[0];

        // Attempt to connect to the backend API
        const signupSuccess = await userSignup(walletAddress);
        if (!signupSuccess) {
          // Exit the function if the API call fails
          console.error(
            "Failed to connect to the backend. Wallet not connected."
          );
          return;
        }

        // Only set the wallet address if the API call is successful
        setWalletAddress(walletAddress);
        console.log("Wallet Address:", walletAddress);

        const baseChainId = "0x4268"; // Hexadecimal representation of 84532
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

  // const handleConnectWallet = async () => {
  //   if (window.ethereum) {
  //     try {
  //       // Request account access
  //       await window.ethereum.request({ method: "eth_requestAccounts" });
  //       const accounts = await window.ethereum.request({
  //         method: "eth_accounts",
  //       });
  //       const walletAddress = accounts[0];

  //       // console.log("Attempting to sign up user with wallet address:", walletAddress);

  //       // Attempt to sign up the user
  //       try {
  //         await userSignup(walletAddress); // If this fails, the catch block will be triggered
  //         setWalletAddress(walletAddress); // Set wallet address only if signup is successful
  //         console.log("Wallet Address:", walletAddress);
  //       } catch (signupError) {
  //         console.error("User signup failed:", signupError);
  //         alert("User signup failed. Wallet will not be connected.");
  //         return; // Exit the function if signup fails
  //       }

  //       const baseChainId = "0x4268"; // Hexadecimal representation of 84532

  //       // Attempt to switch to the Base Network
  //       try {
  //         await window.ethereum.request({
  //           method: "wallet_switchEthereumChain",
  //           params: [{ chainId: baseChainId }],
  //         });
  //         console.log("Successfully switched to the Base Network");
  //       } catch (switchError) {
  //         if (switchError.code === 4902) {
  //           console.error("Base Network is not present in your wallet.");
  //           alert(
  //             "Base Network is not added to your wallet. Please add it manually."
  //           );
  //         } else {
  //           console.error("Failed to switch to Base Network:", switchError);
  //         }
  //       }
  //     } catch (connectError) {
  //       console.error("User denied account access or other error occurred:", connectError);
  //       alert("Failed to connect wallet. Please try again.");
  //     }
  //   } else {
  //     alert("MetaMask not detected");
  //     console.error("MetaMask not detected");
  //   }
  // };

  const handleSendMessageUploadButtonClick = async (walletAddress) => {
    try {
      const fileInput = document.getElementById("messageFile"); // Assuming your file input has an ID of "messageFile"
      const file = fileInput.files[0];

      if (!file) {
        // alert("Please select a file before uploading.");
        return;
      }
      // Set loading to true when the upload starts
      setLoading(true);

      // Create a new FormData object
      const formData = new FormData();
      formData.append("file", file); // Append the file to the form data
      formData.append("WalletAddress", walletAddress); // Append the wallet address

      const res = await fetch(`http://${apiIp}/upload-excel`, {
        method: "POST",
        body: formData, // Send the form data (file + wallet address)
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Server returned an error:", text);
        alert("Failed to upload file. Please check your server.");
        return;
      }

      const data = await res.json();
      console.log("File uploaded successfully:", data);
      toast.success("File uploaded", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      setUploaded(true); // Mark as uploaded
      setOrderId(data.order_id);
      console.log("Order id ", orderId);
      setToAddress(data.public_address);
    } catch (error) {
      console.error("Failed to upload file:", error);
      toast.success("File uploaded", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessageEstimateButtonClick = async () => {
    setIsInputReadOnly(true); // Make the input field read-only

    try {
      // Verify that the wallet address matches the logged-in user's wallet address
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const loggedInWalletAddress = accounts[0];

      if (walletAddress !== loggedInWalletAddress) {
        // alert("Unable to connect. Please sign in using correct credentials.");
        toast.error(
          "Unable to connect. Please sign in using correct credentials",
          {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          }
        );
        return;
      }
      const res = await fetch(`http://${apiIp}/estimate-gas`, {
        method: "POST", // Use POST if you're sending data
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          walletAddress,
          Message: inputValueSendMessage,
          order_id: orderId,
        }), // Send the wallet address in the body
        // Remove the 'no-cors' mode
      });

      // Check if the response is OK (status 200-299)
      if (!res.ok) {
        const text = await res.text(); // Read the response as text
        console.error("Server returned an error:", text);
        alert("Failed to sign in. Please check your server.");
        return;
      }

      // Attempt to parse the response as JSON
      const data = await res.json();
      // setInputValueSendMessage("");
      setGasPriceSendMessage(data.gasPrice);
      setTotalCostSendMessage(data.finalCost);
      setCoast(data.totalCost);
      console.log("total Cost estimate", coast);
      console.log("order id estimate", orderId);
      toast.success("User Estimate gas found", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      console.log("User Estimate gas found :", data);
    } catch (error) {
      toast.error("Failed to find User Estimate gas", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      console.error("Failed to find User Estimate gas: ", error);
    }
  };

  const handleSendMessageFundsButtonClick = async (e) => {
    try {
      // Request Metamask for account access
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      // Send the estimated Ether to the backend wallet address
      // console.log("Before Sending Eth to Backend Wallet");
      // console.log("handleSendMessageFundsButtonClick == ", coast);

      const totalCostInWei = ethers.utils.parseUnits(
        (coast * 2).toString(),
        "wei"
      );
      // const toAddress = "0xA868928a216D7Ef887517C28EaE52948fB079628"; // Ensure this is the correct address

      // console.log("totalCostInWei == ", totalCostInWei);
      // console.log("Total Cost in Wei (integer):", totalCostInWei.toString());

      const tx = {
        to: toAddress,
        value: totalCostInWei,
        gasLimit: 21000,
      };

      const transactionResponse = await signer.sendTransaction(tx);
      console.log("Transaction sent:", transactionResponse);
      // Wait for the transaction to be mined
      await transactionResponse.wait();
      await executeOrder(walletAddress, orderId);
      // console.log("order id", orderId);
      // Reset file input and clear gas and cost fields
      setFileNameMessage("");
      setGasPriceSendMessage("");
      setTotalCostSendMessage("");
      setUploaded(false);
      setInputValueSendMessage("");
      setCoast("");
      setIsInputReadOnly(false);
      document.getElementById("messageFile").value = null; // Reset the file input field
      toast.success("Transaction Success ", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      // alert("Transaction completed successfully!");
    } catch (error) {
      console.log("Error Occured: ", error);
      // setFileNameMessage("");
      // setGasPriceSendMessage("");
      // setTotalCostSendMessage("");
      // setCoast("");
      // setUploaded(false);
      // document.getElementById("messageFile").value = null; // Reset the file input field
      // setIsInputReadOnly(false)
      // alert("Transaction Failed!");
      toast.error("Transaction failed ", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      console.log("Error occurred during the transaction:", error);
    }
  };

  const handleSendNftUploadNftImageButtonClick = async (orderIdNft) => {
    try {
      const fileInput = document.getElementById("nftImage"); // Assuming your file input has an ID of "messageFile"
      const file = fileInput.files[0];

      if (!file) {
        // alert("Please select a file before uploading.");
        return;
      }
      // Check if the orderIdNft is valid before proceeding
      if (!orderIdNft) {
        console.error("Order ID is missing.");
        alert("Order ID is required. Please provide a valid order ID.");
        return;
      }
      // Update the orderIdNftImage state with the received orderIdNft
      setOrderIdNftImage(orderIdNft);

      // Set loading to true when the upload starts
      setLoadingNftImage(true);

      // Create a new FormData object
      const formData = new FormData();
      formData.append("image", file); // Append the file to the form data
      formData.append("order_id", orderIdNft); // Append the wallet address
      // console.log("OrderIdNftImage", orderIdNft);

      const res = await fetch(`http://${apiIp}/upload-nft-metadata`, {
        method: "POST",
        body: formData, // Send the form data (file + wallet address)
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Server returned an error:", text);
        alert("Failed to upload file. Please check your server.");
        return;
      }

      const data = await res.json();
      // console.log("Nft Image uploaded successfully:", data);
      toast.success("Nft Image uploaded", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      setUploadedNftImage(true); // Mark as uploaded
      // setOrderIdNftImage(data.order_id);
      // setToAddressNftImage(data.public_address);
      // console.log("OrderIdNftImage outside === ", orderIdNftImage);
      // console.log("ToAddressNftImage outside === ", toAddressNftImage);
    } catch (error) {
      console.error("Failed to upload Nft Image:", error);
      toast.error("Image failed to  upload", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } finally {
      setLoadingNftImage(false);
    }
  };

  const handleSendNftUploadButtonClick = async (walletAddress) => {
    try {
      const fileInput = document.getElementById("nftFile"); // Assuming your file input has an ID of "messageFile"
      const file = fileInput.files[0];

      if (!file) {
        // alert("Please select a file before uploading.");
        return;
      }
      // Set loading to true when the upload starts
      setLoadingNft(true);

      // Create a new FormData object
      const formData = new FormData();
      formData.append("file", file); // Append the file to the form data
      formData.append("WalletAddress", walletAddress); // Append the wallet address

      const res = await fetch(`http://${apiIp}/upload-nft-address`, {
        method: "POST",
        body: formData, // Send the form data (file + wallet address)
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Server returned an error:", text);
        alert("Failed to upload file. Please check your server.");
        return;
      }

      const data = await res.json();
      // console.log("Nft File uploaded successfully:", data);
      toast.success("Nft File uploaded", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      setUploadedNft(true); // Mark as uploaded
      setOrderIdNft(data.order_id);
      setToAddressNft(data.public_address);
    } catch (error) {
      console.error("Failed to upload file:", error);
      toast.success("File uploaded", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } finally {
      setLoadingNft(false);
    }
  };

  const handleSendNftEstimateButtonClick = async (orderIdNftImage) => {
    setIsInputReadOnlyNft(true); // Make the input field read-only

    try {
      // Verify that the wallet address matches the logged-in user's wallet address
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const loggedInWalletAddress = accounts[0];

      if (walletAddress !== loggedInWalletAddress) {
        // alert("Unable to connect. Please sign in using correct credentials.");
        toast.error(
          "Unable to connect. Please sign in using correct credentials",
          {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          }
        );
        return;
      }
      const res = await fetch(`http://${apiIp}/estimate-nft-gas`, {
        method: "POST", // Use POST if you're sending data
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          wallet_address: walletAddress,
          order_id: orderIdNftImage,
        }), // Send the wallet address in the body
        // Remove the 'no-cors' mode
      });

      // Check if the response is OK (status 200-299)
      if (!res.ok) {
        const text = await res.text(); // Read the response as text
        console.error("Server returned an error:", text);
        alert("Failed to sign in. Please check your server.");
        return;
      }

      // Attempt to parse the response as JSON
      const data = await res.json();
      // setInputValueSendMessage("");
      setTotalGasEstimationWei(data.total_gas_estimation_wei);
      // setGasPriceSendNft(data.gasPrice);
      // setTotalCostSendNft(data.finalCost);
      // setCoastNft(data.totalCost);
      toast.success("User Estimate gas found", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      console.log("User Estimate gas found :", data);
    } catch (error) {
      toast.error("Failed to find User Estimate gas", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      console.error("Failed to find User Estimate gas: ", error);
    }
  };

  const handleSendNftFundsButtonClick = async (e) => {
    try {
      // Request Metamask for account access
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      // Send the estimated Ether to the backend wallet address
      // console.log("Before Sending Eth to Backend Wallet");

      const totalCostInWei = ethers.utils.parseUnits(
        (totalGasEstimationWei * 2).toString(),
        "wei"
      );
      // const toAddress = "0xA868928a216D7Ef887517C28EaE52948fB079628"; // Ensure this is the correct address

      // console.log("totalCostInWei == ", totalCostInWei);
      // console.log("Total Cost in Wei (integer):", totalCostInWei.toString());

      const tx = {
        to: toAddressNft,
        value: totalCostInWei,
        gasLimit: 21000,
      };

      const transactionResponse = await signer.sendTransaction(tx);
      console.log("Transaction sent:", transactionResponse);
      // Wait for the transaction to be mined
      await transactionResponse.wait();
      await executeOrder(walletAddress, orderIdNftImage);
      // Reset file input and clear gas and cost fields
      setFileNameNft("");
      setFileNameNftImage("");
      setUploadedNft(false);
      setUploadedNftImage(false);
      setInputValueSendNft("");
      setIsInputReadOnlyNft(false);
      setTotalGasEstimationWei("");
      document.getElementById("nftFile").value = null; // Reset the file input field
      document.getElementById("nftImage").value = null; // Reset the file input field
      toast.success("Nft Transaction Success ", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      console.log("Transaction completed successfully!");
    } catch (error) {
      console.log("Error Occured: ", error);
      // setFileNameMessage("");
      // setGasPriceSendMessage("");
      // setTotalCostSendMessage("");
      // setCoast("");
      // setUploaded(false);
      // document.getElementById("messageFile").value = null; // Reset the file input field
      // setIsInputReadOnly(false)
      // alert("Transaction Failed!");
      toast.error("Nft Transaction failed ", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      console.log("Error occurred during the transaction:", error);
    }
  };

  const handleFileChangeMessage = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileNameMessage(file.name);
    }
  };

  const handleInputChangeSendMessage = (e) => {
    setInputValueSendMessage(e.target.value);
  };

  const handleFileChangeNftImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileNameNftImage(file.name);
    }
  };

  const handleFileChangeNft = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileNameNft(file.name);
    }
  };

  const handleInputChangeSendNftFunds = (e) => {
    setInputValueSendNft(e.target.value);
  };
  const shortenAddress = (address) => {
    if (!address) return "";
    const firstPart = address.slice(0, 8);
    const lastPart = address.slice(-6);
    return `${firstPart}..${lastPart}`;
  };

  return (
    <>
      <header>
        <div className="text-white d-flex justify-content-space-between align-items-center navbar">
          <div className="d-flex align-items-center flex-row flex-wrap">
            {/* <p className="dashboard">Dashboard</p> */}
          </div>
          <div className="d-flex justify-content-end align-items-baseline flex-row">
            {walletAddress ? (
              <>
                <FaWallet className="admin-icon mx-1 text-white" />
                <p className="address text-white">
                  {shortenAddress(walletAddress)}
                </p>
              </>
            ) : (
              ""
            )}
            {!walletAddress ? (
              <button
                className="mx-3 connect-wallet-btn"
                onClick={handleConnectWallet}
                type="button"
              >
                Connect
              </button>
            ) : (
              <button
                className="mx-3 connect-wallet-btn"
                type="button"
                disabled={true}
              >
                Connected
              </button>
            )}
          </div>
        </div>
      </header>
      <div className="connect-wallet-main-container">
        <div className="on-chain-header-container">
          <p className="on-chain-heading">OnChain Message</p>
        </div>
        <ToastContainer />

        <div className="box-main-container">
          <div className="box1">
            <h1 className="send-message-heading">Send NFT</h1>

            <div className="nft-custom-input-file-container">
              <div className="nft-custom-input-file-below-container">
                <label
                  htmlFor="nftFile"
                  className="my-2 nft-custom-file-upload"
                >
                  Choose File
                </label>
                <input
                  type="file"
                  id="nftFile"
                  className="form-control-file"
                  onChange={(e) => handleFileChangeNft(e)}
                  disabled={!walletAddress}
                />
                {/* <div className="nft-file-name-container"> */}
                {fileNameNft ? (
                  <p className="nft-file-name-display">{fileNameNft}</p>
                ) : (
                  <p className="nft-file-name-display">Upload Excel here</p>
                )}
                {/* </div> */}
              </div>

              <button
                className="send-message-upload-btn"
                type="button"
                disabled={
                  !walletAddress || !fileNameNft || loadingNft || uploadedNft
                }
                onClick={() => handleSendNftUploadButtonClick(walletAddress)}
              >
                {loadingNft
                  ? "Uploading..."
                  : uploadedNft
                  ? "Uploaded"
                  : "Upload"}
                {/* {console.log("loadingNft", loadingNft)}
                {console.log("uploadedNft", uploadedNft)} */}
              </button>
              {/* <button
    className="send-message-upload-btn"
    type="button"
    disabled={!walletAddress || !fileNameNft}
  >
    Upload
  </button> */}
            </div>
            {/* <div className="nft-file-name-container">
  {fileNameNft ? (
    <p className="nft-file-name-display">{fileNameNft}</p>
  ) : (
    <p className="nft-file-name-display">No File Selected</p>
  )}
</div> */}
            <div className="nft-custom-input-file-container">
              <div className="nft-custom-input-text-below-container">
                <label
                  htmlFor="nftImage"
                  className="my-2 nft-custom-file-upload"
                >
                  Choose File
                </label>
                <input
                  type="file"
                  id="nftImage"
                  className="form-control-file"
                  onChange={(e) => handleFileChangeNftImage(e)}
                  disabled={!walletAddress}
                />
                {/* <div className="nft-file-name-container"> */}
                {fileNameNftImage ? (
                  <p className="nft-file-name-display">{fileNameNftImage}</p>
                ) : (
                  <p className="nft-file-name-display">Upload Image here</p>
                )}
                {/* </div> */}
              </div>

              <button
                className="send-message-upload-btn"
                type="button"
                disabled={
                  !walletAddress ||
                  !fileNameNftImage ||
                  loadingNftImage ||
                  uploadedNftImage
                }
                onClick={() =>
                  handleSendNftUploadNftImageButtonClick(orderIdNft)
                }
              >
                {loadingNftImage
                  ? "Uploading..."
                  : uploadedNftImage
                  ? "Uploaded"
                  : "Upload"}
                {/* {console.log("loadingNftImage", loadingNftImage)}
                {console.log("uploadedNftImage", uploadedNftImage)} */}
              </button>
              {/* <button
    className="send-message-upload-btn"
    type="button"
    disabled={!walletAddress || !fileNameNft}
  >
    Upload
  </button> */}
            </div>
            <div className="nft-custom-input-text-container">
              <input
                className="nft-input-write"
                type="text"
                maxLength={20}
                name=""
                id=""
                value={inputValueSendNft}
                onChange={handleInputChangeSendNftFunds}
                readOnly={isInputReadOnlyNft}
              />
              <button
                className="my-2 nft-message-estimate-btn"
                type="button"
                disabled={
                  !walletAddress ||
                  !inputValueSendNft.trim() ||
                  !fileNameNft ||
                  totalGasEstimationWei
                }
                onClick={() => {
                  handleSendNftEstimateButtonClick(orderIdNftImage);
                }}
              >
                Estimate Gas
              </button>
            </div>
            <div className="nft-funds-main-container">
              <p className="d-flex justify-content-space-between flex-row text-white">
                Total Cost:{" "}
                <p className="mx-1 d-flex flex-wrap">{totalGasEstimationWei}</p>{" "}
              </p>
              <button
                className="nft-message-send-funds-btn"
                type="button"
                disabled={!walletAddress}
                onClick={handleSendNftFundsButtonClick}
              >
                Send Funds
              </button>
            </div>
          </div>
          <div className="box2-major-container">
            <img className="send-nft-img" src={sendNftImg} alt="" />
            <div className="box2">
              <h1 className="send-message-heading">Send Message</h1>
              <div className="custom-input-file-container">
                {/* <div className="container file-name-container">
              {fileNameMessage ? (
                <p className="file-name-display">{fileNameMessage}</p>
              ) : (
                <p className="file-name-display">No File Selected</p>
              )}
            </div> */}
                <div className="d-flex flex-column">
                  <label htmlFor="messageFile" className="custom-file-upload">
                    Choose File
                  </label>
                  <input
                    type="file"
                    id="messageFile"
                    className="form-control-file"
                    onChange={(e) => handleFileChangeMessage(e)}
                    disabled={!walletAddress}
                  />
                  <div className="file-name-container">
                    {fileNameMessage ? (
                      <p className="file-name-display">{fileNameMessage}</p>
                    ) : (
                      <p className="file-name-display">Upload Excel Here </p>
                    )}
                  </div>
                </div>

                {/* {loading ? (
                <div className="d-flex flex-row ">
                  {" "}
                  <Loader />
                </div>
              ) : (
                <button
                  className="send-message-upload-btn"
                  type="button"
                  disabled={!walletAddress || !fileNameMessage}
                  onClick={() =>
                    handleSendMessageUploadButtonClick(walletAddress)
                  }
                >
                  {/* {uploaded ? "Uploaded" : "Upload"} */}
                {/* {loading ? "Uploading..." : "Upload"} 
                  {loading ? "Uploading..." : uploaded ? "Uploaded" : "Upload"}
                </button>
              )} */}
                <button
                  className="send-message-upload-btn"
                  type="button"
                  disabled={
                    !walletAddress || !fileNameMessage || loading || uploaded
                  }
                  onClick={() =>
                    handleSendMessageUploadButtonClick(walletAddress)
                  }
                >
                  {loading ? "Uploading..." : uploaded ? "Uploaded" : "Upload"}
          
                </button>
              </div>

              <div className="custom-input-text-container">
                <input
                  className="input-write"
                  type="text"
                  maxLength={20}
                  name=""
                  id=""
                  value={inputValueSendMessage}
                  onChange={handleInputChangeSendMessage}
                  readOnly={isInputReadOnly}
                />
                <button
                  className="my-1 send-message-estimate-btn"
                  type="button"
                  disabled={
                    !walletAddress ||
                    !inputValueSendMessage.trim() ||
                    !fileNameMessage ||
                    gasPriceSendMessage
                  }
                  onClick={handleSendMessageEstimateButtonClick}
                >
                  Estimate Gas
                </button>
              </div>
              <div className="send-funds-main-container">
                <div className="text-data-container ">
                  <p className="text-white d-flex flex-row">
                    Gas Price:
                    <p className="mx-1 d-flex flex-wrap">
                      {gasPriceSendMessage && `${gasPriceSendMessage} WEI`}
                    </p>{" "}
                  </p>
                  <p className="text-white d-flex flex-row">
                    Total Cost:
                    <p className="mx-1 d-flex flex-wrap">
                      {totalCostSendMessage && `${totalCostSendMessage} ETH`}
                    </p>
                  </p>
                </div>
                <button
                  className="send-message-estimate-btn"
                  type="button"
                  disabled={
                    !walletAddress ||
                    !gasPriceSendMessage ||
                    !totalCostSendMessage
                  }
                  onClick={handleSendMessageFundsButtonClick}
                >
                  Send Funds
                </button>
              </div>
            </div>
          </div>
          {/* <div></div> */}
          {/* <img className="send-nft-img" src={sendNftImg} alt="" /> */}
        </div>
      </div>
    </>
  );
};

export default ConnectWallet;

