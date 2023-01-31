<template>
  <div style="margin: 0 !important;padding: 0!important;height: 100vh;width: 100%">
    <RouterView></RouterView>
<!--    <MainPage></MainPage>-->
<!--    <div style="height: 100%; width: 90%;float:right;background-color: #E6E8EB">-->
<!--      <TopBar></TopBar>-->
<!--      <div id="mainview" style="height: 93%;background-color: white;margin: 12px;">-->
<!--        <RouterView></RouterView>-->
<!--      </div>-->
<!--    </div>-->

  </div>
<!--  <nav>-->
<!--    <router-link to="/">Home</router-link> |-->
<!--    <router-link to="/about">About</router-link>-->
<!--  </nav>-->
<!--  <router-view/>-->

</template>

<style >
body{
  margin: 0 !important;
  padding: 0!important;
  height: 100vh;
}


</style>
<script setup>
import MainPage from "@/views/MainPage.vue";


</script>