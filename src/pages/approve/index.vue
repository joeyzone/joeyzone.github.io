<template>
  <div class="permit-page">
    <Header />
    <div class="approve-part">
      <el-form :model="formApprove" label-width="120px">
        <el-form-item label="Owner">
          <el-input v-model="formApprove.owner" />
        </el-form-item>
        <el-form-item label="Spender">
          <el-input v-model="formApprove.spender" />
        </el-form-item>
        <el-form-item label="Amount">
          <el-input v-model="formApprove.amount" />
        </el-form-item>
        <el-form-item label="Signature">
          <el-input v-model="formApprove.signature" />
        </el-form-item>
        <el-form-item>
          <div class="btn-box">
            <div class="btn-colorful" @click="approveFunc">Approve</div>
            <div class="btn-colorful btn2" @click="transferFrom">Transfer</div>
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

// const { provider, addrJYZ, signer, signAddr, domain, contractJYZ, addrs } =
//   globalProperties;

const VITE_PROVIDER = import.meta.env.VITE_PROVIDER;

const formApprove = reactive({
  owner: "",
  spender: "",
  amount: 0,
  signature: "",
});

const approveFunc = async () => {
  await globalProperties.contractJYZ
    .connect(globalProperties.signer)
    .permit(
      formApprove.owner,
      formApprove.spender,
      ethers.parseEther(formApprove.amount.toString()),
      formApprove.signature
    );
};

let success;
const transferFrom = async () => {
  if (VITE_PROVIDER === "local") {
    success = await globalProperties.contractJYZ
      .connect(globalProperties.addrs[1])
      .transferFrom(
        formApprove.owner,
        formApprove.spender,
        ethers.parseEther(formApprove.amount.toString())
      );
  } else {
    success = await globalProperties.contractJYZ
      .connect(globalProperties.signer)
      .transferFrom(
        formApprove.owner,
        formApprove.spender,
        ethers.parseEther(formApprove.amount.toString())
      );
  }
  if (success) {
    ElMessage({
      showClose: true,
      message: "Copy Success",
      type: "success",
    });
  }
};
</script>

<style lang="less" scoped>
.permit-page {
  min-height: 600px;
  padding-top: 100px;
  .approve-part {
    max-width: 600px;
    margin: 0 auto;
  }
}
.btn-box {
  display: flex;
  width: 100%;
  .btn-colorful {
    text-align: center;
    flex-grow: 1;
  }
}

.btn2 {
  margin-left: 20px;
}
</style>
