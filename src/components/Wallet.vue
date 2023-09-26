<template>
  <div
    class="connect-btn"
    :class="connected ? 'disabled' : ''"
    @click="connectFunc"
  >
    <img class="f-img" src="/metamask-fox.svg" alt="" />
    <span>{{ text }}</span>
  </div>
</template>

<script lang="ts" setup>
// import { ethers } from "ethers";
import { ref, onMounted, inject } from "vue";
import { ethers } from "ethers";
import {
  connect,
  getAccount,
  isConnected,
} from "@/typescript/connectWallet.ts";

const emitter: any = inject("emitter");
const text = ref("Connect Wallet");
const connected = ref(false);
const connectFunc = async () => {
  await connect();
  const success = await getAccount();

  connected.value = success;
  if (connected.value) {
    const addr = await getAddr();
    text.value = addr;
  }
};
emitter.on("needWallet", async (callback: () => void) => {
  await connectFunc();
  callback();
});

const init = async () => {
  const isAccountConnected = await isConnected();
  if (isAccountConnected) {
    const addr = await getAddr();
    text.value = addr;
  }
  window.ethereum.on("accountsChanged", async () => {
    const addr = await getAddr();
    connected.value = true;
    text.value = addr;
  });
};
onMounted(async () => {
  init();
});

async function getAddr() {
  const provider: any = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const addr = await signer.getAddress();

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

  const addrJYZ = "0x2533Bc12B59DA5cBCa7bCC190e6687868833E321";
  const contractJYZ = new ethers.Contract(addrJYZ, abiERC20, signer);
  const domain = await contractJYZ.eip712Domain();
  window.provider = provider;
  window.contractJYZ = contractJYZ;
  window.domain = domain;
  window.signer = signer;
  return `${addr.slice(0, 5)}...${addr.slice(-4)}`;
}
</script>
<style lang="less" scoped>
.f-img {
  height: 18px;
  margin-right: 10px;
}
.connect-btn {
  padding: 10px 20px;
  box-sizing: border-box;
  border-radius: 6px;
  margin-top: 12px;
  background-image: linear-gradient(to right, #ff007a, #9198e5);
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
}
.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-image: linear-gradient(to right, #ff007a, #9198e5);
}
</style>
