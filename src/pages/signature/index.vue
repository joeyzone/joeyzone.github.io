<template>
  <div class="permit-page">
    <div class="sig-part">
      <p class="note">
        If you would like some sepolia network test coins, please email me at
        joeyzoneone@gmail.com. Attach your address and quantity, and I will
        generate a signature authorization for you.
      </p>
      <el-form :model="formSignature" label-width="120px">
        <el-form-item label="Spender">
          <el-input v-model="formSignature.spender" />
        </el-form-item>
        <el-form-item label="Amount">
          <el-input v-model="formSignature.amount" />
        </el-form-item>
        <el-form-item>
          <div class="btn-colorful" @click="sigFunc">Signature</div>
        </el-form-item>
        <el-form-item>
          <div
            class="clip-box"
            v-clipboard="formSignature.signature"
            v-clipboard:success="clipboardSuccessHandler"
          >
            <span class="b-text">{{ formSignature.signature }}</span>
            <div v-show="formSignature.signature" class="btn-colorful s-btn">
              copy
            </div>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ethers } from "ethers";
import { reactive, inject } from "vue";
import { ElMessage } from "element-plus";
const globalProperties: any = inject("globalProperties");
console.log("🚀 ~ file: index.vue:47 ~ globalProperties:", globalProperties);

// const VITE_PROVIDER = import.meta.env.VITE_PROVIDER;

const formSignature = reactive({
  spender: "",
  amount: 0,
  signature: "",
});

const clipboardSuccessHandler = () => {
  ElMessage({
    showClose: true,
    message: "Copy Success",
    type: "success",
  });
};
const sigFunc = async () => {
  const domainData = {
    name: globalProperties.domain[1],
    version: globalProperties.domain[2],
    chainId: globalProperties.domain[3],
    verifyingContract: globalProperties.domain[4],
  };
  const nonce = await globalProperties.contractJYZ.ownerNonce(
    globalProperties.signAddr
  );
  console.log("🚀 ~ file: index.vue:56 ~ approve ~ nonce:", nonce);
  const types = {
    Permit: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
      { name: "nonce", type: "uint256" },
    ],
  };
  // 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
  const permitData = {
    owner: globalProperties.signAddr,
    spender: formSignature.spender,
    amount: ethers.parseEther(formSignature.amount.toString()),
    nonce,
  };

  const signature = await globalProperties.signer.signTypedData(
    domainData,
    types,
    permitData
  );
  formSignature.signature = signature;
  // console.log("🚀 ~ file: index.vue:71 ~ approve ~ signature:", signature);
};
</script>

<style lang="less" scoped>
.permit-page {
  min-height: 600px;
  padding-top: 100px;
}

.sig-part {
  max-width: 600px;
  margin: 0 auto;
  .note {
    padding-left: 120px;
    color: #ccc;
  }
  .clip-box {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .b-text {
    color: #ff007a;
    cursor: pointer;
    width: 420px;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .btn-colorful {
    width: 100%;
    text-align: center;
  }
  .s-btn {
    width: auto;
    height: 24px;
    line-height: 24px;
    padding: 0 10px;
    font-size: 14px;
    display: inline-block;
    box-sizing: border-box;
  }
}
</style>
