import { ethers } from "ethers";

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

export async function getAccount() {
  let ret = true;
  try {
    await window.ethereum
      .request({ method: "eth_requestAccounts" })
      .catch((err: any) => {
        console.log("🚀 ~ file: connectWallet.ts:39 ~ getAccount ~ err:", err);
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          console.log("Please connect to MetaMask.");
        } else {
          console.error(err);
        }
        ret = false;
      });
  } catch (err) {
    console.log("🚀 ~ file: connectWallet.ts:49 ~ getAccount ~ err:", err);
  }

  // const account = accounts[0];
  return ret;
}

export async function isConnected() {
  const accounts = await window.ethereum.request({
    method: "eth_accounts",
    params: [],
  });
  if (accounts.length) {
    console.log(`You're connected to: ${accounts[0]}`);
    return true;
  } else {
    console.log("Metamask is not connected");
    return false;
  }
}
