<template>
  <div class="login-box">
    <div class="form-box"></div>
    <img class="login-pic" src="../../assets/login_banner_ele.png" alt />
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style lang="less">
.login-box {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background:linear-gradient(225deg,rgba(20,147,250,1),rgba(1,198,250,1));
  height: 100%;
  .form-box {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
  }

}
</style>