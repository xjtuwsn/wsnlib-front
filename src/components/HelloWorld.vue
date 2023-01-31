<template>
  <el-button @click="test">test</el-button>

</template>

<script>
import {getBaseUrl, get, post} from "@/utils/Network";

export default {
  name: 'HelloWorld',
  data() {
    return {

    }
  },
  methods: {
    test() {
      get("/article/test").then(res=>{
        console.log(res)
      })
    },
    handleUpload(res, file) {
      console.log(res)
    }
  },
  computed: {
    getUrl() {
      return getBaseUrl();
    }
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
