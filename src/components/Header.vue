<template>
  <div class="main-header">
    <div class="left-part">
      <div class="logo-box">
        <router-link to="/">
          <div class="logo-img">JYZ</div>
        </router-link>
        <!-- <a
          href="https://github.com/joeyzone"
          target="_blank"
          rel="noopener noreferrer"
          class="intro"
          >www.github.com/joeyzone</a
        > -->
      </div>
      <div class="nav-box">
        <div class="nav-item">
          <router-link
            to="/signature"
            class="text-gradient"
            :class="{ active: $route.path === '/signature' }"
          >
            Signature</router-link
          >
        </div>
        <div class="nav-item">
          <router-link
            to="/approve"
            class="text-gradient"
            :class="{ active: $route.path === '/approve' }"
            >Approve</router-link
          >
        </div>
      </div>
    </div>
    <div class="right-part">
      <Wallet />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Wallet from "@/components/Wallet.vue";
</script>

<style scoped lang="less">
.main-header {
  position: fixed;
  top: 0;
  left: 0;
  height: 60px;
  width: 100%;
  box-shadow: 0 0 6px 4px #ddd;
  padding: 0 60px;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  z-index: 9;
  .text-gradient {
    color: #e0c2c282;
    text-decoration: none;
    transition: all 0.3s ease;
  }

  .left-part {
    display: flex;
  }
  .logo-box {
    margin-right: 40px;
  }
  .logo-img {
    margin-top: 4px;
    color: rgba(195, 33, 111, 0.5);
    display: inline-block;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    border-radius: 50%;
    background-image: linear-gradient(to right, #ff007a, #9198e5);
  }
  .intro {
    display: block;
    line-height: 10px;
    color: #ddd;
    margin: 0;
    position: absolute;
    margin-left: -45px;
    text-decoration: none;
  }
  .nav-box {
    display: flex;
  }
  .nav-item {
    line-height: 60px;
    font-size: 20px;
    margin-right: 20px;
  }
  .right-part {
    margin-right: 120px;
    // line-height: 60px;
  }
  .active.text-gradient {
    background-image: linear-gradient(to right, #ff007a, #9198e5);
    -webkit-background-clip: text;
    color: transparent;
  }
}
</style>
