<template>
  <div
    class="connect-btn"
    :class="connected ? 'disabled' : ''"
    @click="connectFunc"
  >
    {{ text }}
  </div>
</template>

<script lang="ts" setup>
// import { ethers } from "ethers";
import { ref, onMounted } from "vue";
import { ethers } from "ethers";
import { getAccount } from "@/typescript/connectWallet.ts";
const text = ref("Connect Wallet");
const connected = ref(false);
const connectFunc = async () => {
  getAccount();
};
onMounted(async () => {
  const success = await getAccount();
  connected.value = success;
  if (connected.value) {
    const addr = await getAddr();
    text.value = addr;
  }
  window.ethereum.on("accountsChanged", async () => {
    const addr = await getAddr();
    connected.value = true;
    text.value = addr;
  });
});

async function getAddr() {
  const provider: any = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const addr = await signer.getAddress();
  return `${addr.slice(0, 5)}...${addr.slice(-4)}`;
}
</script>
<style lang="less" scoped>
.connect-btn {
  padding: 10px 20px;
  box-sizing: border-box;
  border-radius: 6px;
  margin-top: 12px;
  background-image: linear-gradient(to right, #ff007a, #9198e5);
  color: #fff;
  cursor: pointer;
}
.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-image: linear-gradient(to right, #ff007a, #9198e5);
}
</style>
