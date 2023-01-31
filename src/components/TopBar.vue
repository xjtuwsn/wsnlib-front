<template>
  <div style="height: 5%; width: 100%;background-color: white;text-align: right">

    <div style="display: inline-block;position:relative;">
      <el-avatar size="20" style="margin-right: 180px;margin-top: 5px;" src="https://circlewsn.oss-cn-beijing.aliyuncs.com/imgs/image-20221214191736057.png"></el-avatar>
      <div style=";position:absolute;top: 12px;color: #303133;font-size: 16px;left: 50px">每一个明天</div>
    </div>
    <svg class="icon" aria-hidden="true" style="margin-right: 15px;cursor: pointer" @click="jump('http://59.110.167.229/')">
      <use xlink:href="#icon-home"></use>
    </svg>
    <svg class="icon" aria-hidden="true" style="margin-right: 30px;cursor: pointer" @click="jump('https://github.com/xjtuwsn')">
      <use xlink:href="#icon-github-fill"></use>
    </svg>

    <svg class="icon" aria-hidden="true" style="margin-right: 15px;cursor: pointer;  width: 2.3em;height: 2.3em;vertical-align: 0.25em;">
      <use xlink:href="#icon-tuichu"></use>
    </svg>
  </div>
</template>

<script>
export default {
  name: "TopBar",
  data() {
    return {
      mode:false,
      dark:false
    }
  },
  methods: {
    jump(url) {
      window.location.href = url
    },


  }
}
</script>

<style>
.icon {
  width: 2em;
  height: 2em;
  vertical-align: 0.35em;
  fill: #606266;
  overflow: hidden;
}

</style>