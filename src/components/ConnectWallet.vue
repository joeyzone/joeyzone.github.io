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
    text.value = "Connected";
  }
  window.ethereum.on("accountsChanged", () => {
    connected.value = true;
    text.value = "Connected";
  });
});
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
