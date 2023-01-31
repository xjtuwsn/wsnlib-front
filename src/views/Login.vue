<template>
  <div id="bk" style="height: 100vh;width: 100%;position:absolute;top: 0;background-size:100vw">

    <div style="width: 24%;margin-left: 38%;margin-top:8%;height: 60%;border-radius: 45px 45px 25px 25px;">
      <div style="height: 35%;width: 100%;vertical-align:center">
<!--        <img src="../assets/logoadmin.png" style="height: 120px;width: 90px;margin-top: 5%;margin-left: 2%">-->
        <div style="height: 50%"></div>
        <div style="text-align: center ;font-size: 36px;color: white;margin-top: 15%"><b>Blog-Admin</b></div>
      </div>
      <el-form ref="form"  label-width="80px" style="margin-top: 10%;">
        <el-form-item style="color:white!important;">
          <el-input v-model="username"  style="width: 80%;height: 40px" placeholder="用户名">
            <template #prefix>
              <el-icon style="color: white"><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="password" type="password" style="width: 80%;height: 40px" placeholder="密码">
            <template #prefix>
              <el-icon style="color: white"><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <div style="width: 34%;text-align: center;margin-left: 33%;margin-top: 10%">
        <el-button type="primary" style="width: 100%;height: 40px" round @click="login">立即登录</el-button>
      </div>

    </div>

  </div>
</template>

<script>
import {get, post} from "@/utils/Network";
import QS from "qs"
export default {
  name: "Login",
  data(){
    return{
      username:'',
      password:''
    }
  },
  methods:{
    login(){
      post("/article/login",QS.stringify({username:this.username,password:this.password})).then(res=>{
        if(res.data==='error'){
          this.$message({
            type:'error',
            message:'登陆失败!'
          })
        }
        else {
          window.localStorage.setItem("token",res.data)
          this.$message({
            type:'success',
            message:'登陆成功!'
          })
          setTimeout(()=>{
            this.$router.push("/main/write")
          },800)
        }
      })
    },
    visitor(){
      this.$router.push("/main/write")
    }
  },
  mounted() {
    get("/book/all").then(res=>{
      console.log(res.data);
    })
  }
}
</script>

<style lang="scss">
#bk{
  background-image: url("../assets/bk.jpg")
}
.el-input__inner {
  background-color: transparent !important;
  color: white!important;
  border: 0!important;
}
.el-input {
  --el-input-bg-color:#ffffff36 !important;
  --el-input-icon-color:white!important;
  --el-input-text-color:white!important;
  --el-input-placeholder-color:white!important;
}
.el-form-item__label {
  color: white!important;
}
.el-input__wrapper {
  border-radius: 20px!important;
  border: 0!important;
}
input:-webkit-autofill{
  //-webkit-box-shadow:0 0 0 1000px #f7f7f7 inset;
  //box-shadow:0 0 0 1000px #fff inset;
  -webkit-text-fill-color: #ededed !important;
  -webkit-box-shadow: 0 0 0 1000px transparent inset !important;
  background-color: transparent;
  background-image: none;
  transition: background-color 50000s ease-in-out 0s;

}
</style>