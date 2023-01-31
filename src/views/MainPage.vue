<template>
  <div style="height: 100%;width: 10%;background-color:#303133;float:left;">
    <el-menu
        active-text-color="#409EFF"
        background-color="#303133"
        class="el-menu-vertical-demo"
        :default-active="path"
        text-color="#fff"
    >
      <div style="height: 100px;color: white;text-align: center;font-size: 20px;line-height: 100px">
        <strong>Blog-Admin</strong>
      </div>
      <div style="height: 50px"></div>
      <router-link :to="'/main/write'">
      <el-menu-item index="/main/write">
        <el-icon><Edit /></el-icon>
        <span>博客上传</span>
      </el-menu-item>
      </router-link>
      <router-link :to="'/main/article'">
      <el-menu-item index="/main/article">
        <el-icon><document /></el-icon>
        <span>文章管理</span>
      </el-menu-item>
      </router-link>
      <router-link :to="'/main/tags'">
      <el-menu-item index="/main/tags">
        <el-icon><Operation /></el-icon>
        <span>分类管理</span>
      </el-menu-item>
      </router-link>
      <el-menu-item index="4">
        <el-icon><setting /></el-icon>
        <span>敬请期待</span>
      </el-menu-item>
    </el-menu>
  </div>
  <div style="height: 100%; width: 90%;float:right;background-color: #E6E8EB">
    <TopBar></TopBar>
    <div id="mainview" style="height: 93%;background-color: white;margin: 12px;">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar.vue";
export default {
  name: "MainPage",
  components: {TopBar},
  data() {
    return {
      path:"/main/write"
    }
  },
  mounted() {
    let add = window.location.href;
    console.log(add)
    let s = add.split('/')
    // let number = add.lastIndexOf('/');
    // let tmp = add.substring(number)
    // let number2 = tmp.lastIndexOf('/');
    this.path = '/' + s[s.length - 2] + '/' + s[s.length - 1]
    console.log(this.path)

  }
}
</script>

<style scoped>
a{
  text-decoration: none;
}
.router-link-active {
  text-decoration: none;
}

</style>