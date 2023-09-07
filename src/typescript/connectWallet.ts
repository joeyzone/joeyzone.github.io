import { ethers } from "ethers";

export const isConnected = window.ethereum.isConnected();
export const connect = async () => {
  const chainId = ethers.toBeHex(11155111);
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId }],
    });
  } catch (switchError: any) {
    // This error code indicates that the chain has not been added to MetaMask.
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId,
              chainName: "Sepolia",
              rpcUrls: ["https://sepolia.infura.io/v3/"] /* ... */,
            },
          ],
        });
      } catch (addError) {
        // handle "add" error
      }
    }
    // handle other "switch" errors
  }
};
