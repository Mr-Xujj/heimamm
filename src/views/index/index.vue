<template>
  <el-container class="index-container">
    <el-header class="my-header">
      <div class="left">
        <!-- 图标 -->
        <i @click="isCollapse = !isCollapse" class="el-icon-s-fold icon"></i>
        <img class="logo" src="../../assets/矢量智能对象 拷贝 9.png" alt />
        <span class="title">黑马面面</span>
      </div>
      <div class="right">
        <img class="user-icon" src="../../assets/下载.jpg" alt />
        <span class="user-name">李达,您好</span>
        <el-button type="primary" size="small">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside style="width:aout" class="my-aside">
            <!-- 导航菜单 router开启路由 -->
        <el-menu router default-active="/index/user" :collapse="isCollapse" class="el-menu-vertical-demo">
          <el-menu-item index="/index/chart">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="/index/user">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="/index/question">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="/index/enterprise">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="/index/subject">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="my-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "index",
  data(){
    return{
      // 是否折叠
      isCollapse:false
    }
  },
  methods:{

  }
};
</script>

<style lang="less" scoped>
.index-container {
  height: 100%;
  .my-header {
    // background-color: skyblue;
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      .icon {
        font-size: 24px;
        margin-right: 22px;
      }
      .logo {
        width: 33px;
        height: 28px;
        margin-right: 11px;
      }
      .title {
        font-size: 22px;
        color: #49a1ff;
      }
    }
    .right {
      display: flex;
      align-items: center;
      .user-icon {
        border-radius: 50%;
        width: 43px;
        height: 43px;
        margin-right: 15px;
      }
      .user-name {
        font-size: 14px;
        margin-right: 38px;
      }
    }
  }
  .my-aside {
    // background-color: green;
    // 导航样式
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
    }
  }
  .my-main {
    background-color: red;
  }
}
</style>