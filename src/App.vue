<template>
  <Header />
  <router-view />
</template>

<script lang="ts" setup>
import { ethers } from "ethers";
import { connect } from "@/typescript/connectWallet.ts";
import { provide, onMounted } from "vue";
import Header from "@/components/Header.vue";

const globalProperties: any = {
  provider: null,
  addrJYZ: null,
  signer: null,
  signAddr: null,
  domain: null,
  contractJYZ: null,
  addrs: null,
};

const VITE_PROVIDER = import.meta.env.VITE_PROVIDER;
async function initProvider() {
  if (!window.ethereum || VITE_PROVIDER === "local") {
    globalProperties.addrJYZ = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // localhost";
    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
    globalProperties.provider = provider;
    globalProperties.signer = await provider.getSigner();
    globalProperties.signAddr = await globalProperties.signer.getAddress();

    globalProperties.addrs = await provider.listAccounts();
    return;
  }
  await connect();
  globalProperties.addrJYZ = "0x2533Bc12B59DA5cBCa7bCC190e6687868833E321";
  const provider = new ethers.BrowserProvider(window.ethereum);
  globalProperties.provider = provider;
  globalProperties.addrs = await provider.send("eth_requestAccounts", []);
  globalProperties.signer = await provider.getSigner();
  globalProperties.signAddr = await globalProperties.signer.getAddress();

  const abiERC20 = [
    "function ownerNonce(address) view returns (uint256)",
    "function allowance(address,address) view returns (uint256)",
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint256)",
    "function permit(address,address,uint256,bytes)",
    "function transferFrom(address from, address to, uint256 amount) returns (bool)",
    "function eip712Domain() view returns (bytes1 fields,string memory name,string memory version,uint256 chainId,address verifyingContract,bytes32 salt,uint256[] memory extensions)",
  ];

  const contractJYZ = new ethers.Contract(
    globalProperties.addrJYZ,
    abiERC20,
    globalProperties.signer
  );
  // const result = await contractJYZ.balanceOf(signAddr);
  globalProperties.contractJYZ = contractJYZ;
  globalProperties.domain = await contractJYZ.eip712Domain();
}

onMounted(() => {
  initProvider();
});

window.ethereum.on("accountsChanged", async () => {
  // globalProperties.provider = new ethers.BrowserProvider(window.ethereum);
  globalProperties.signer = await globalProperties.provider.getSigner();
  globalProperties.signAddr = await globalProperties.signer.getAddress();
  console.log(
    "🚀 ~ file: App.vue:71 ~ window.ethereum.on ~ globalProperties.signAddr:",
    globalProperties.signAddr
  );
});

provide("globalProperties", globalProperties);
</script>
