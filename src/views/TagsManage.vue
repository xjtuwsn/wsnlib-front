<template>
<div style="width: 100%;height: 100%">
  <div style="margin-left: 2%;padding-top: 10px; font-size: 26px;color: #303133;position: relative">
    标签管理
    <el-button type="primary" plain style=";margin-left: 20px" circle @click="addTag" ><el-icon><Plus /></el-icon></el-button>
    <el-switch v-model="is_dark" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949;position: absolute;right: 100px"  />
  </div>
  <div id="tags" style="padding-left: 2%;margin-top: 20px;font-size: 22px!important;width: 95%;height: 50%" >
    <div style="display: inline-block;margin-right: 25px;margin-bottom: 25px" v-for="(tag, index) in tagList">

      <el-dropdown trigger="click" >
        <el-tag
            :key="tag"
            size="large"
            :effect="is_dark?'dark' : 'light'"
            closable
            :type="color[index % 5]"
            :disable-transitions="false"
            style="cursor: pointer;height: 45px;width: 100px;font-size: 18px;user-select:none"
            @close="handleClose(tag)"
            @click="getArticle(tag)"
        >
          {{ tag }}
        </el-tag>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="item in artMap.get(tag)">{{ item }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-button style="height: 45px" @click="modifyName(tag)"><el-icon><EditPen /></el-icon></el-button>
    </div>

  </div>
  <el-divider border-style="dotted" style="width: 96%;margin-left: 2%" />
  <div id="bot" style="height: 35%" >
    <el-row style="height: 100%">
      <el-col :span="1">
      </el-col>
<!--      <el-col :span="2" style="height: 100%">-->
<!--        <img src="../assets/kon/1671698874355.png" style="height: 100%">-->
<!--      </el-col>-->
<!--      <el-col :span="2" style="height: 100%">-->
<!--        <img src="../assets/kon/1671698874372.png" style="height: 100%">-->
<!--      </el-col>-->
<!--      <el-col :span="2" style="height: 100%">-->
<!--        <img src="../assets/kon/1671698874383.png" style="height: 100%">-->
<!--      </el-col>-->
<!--      <el-col :span="2" style="height: 100%">-->
<!--        <img src="../assets/kon/1671698874394.png" style="height: 100%">-->
<!--      </el-col>-->
<!--      <el-col :span="2" style="height: 100%">-->
<!--        <img src="../assets/kon/1671698874405.png" style="height: 100%">-->
<!--      </el-col>-->
      <el-col :span="4" style="height: 100%">
        <img src="../assets/chui/1671699201564.png" style="height: 100%">
      </el-col>
      <el-col :span="4" style="height: 100%">
        <img src="../assets/chui/1671699201552.png" style="height: 100%">
      </el-col>
      <el-col :span="4" style="height: 100%">
        <img src="../assets/chui/1671699201575.png" style="height: 100%">
      </el-col>
      <el-col :span="4" style="height: 100%">
        <img src="../assets/chui/1671699201586.png" style="height: 100%">
      </el-col>
      <el-col :span="1">
      </el-col>
      <el-col :span="5" style="height: 100%">
        <img src="../assets/word.png" style="height: 100%">
      </el-col>
    </el-row>
  </div>
</div>
</template>

<script>
import {get, post} from "@/utils/Network";
import QueryString from "qs";
import {ElMessage, ElMessageBox} from "element-plus";

export default {
  name: "TagsManage",
  data() {
    return {
      tagList: [],
      color:['', 'success', 'info', 'danger', 'warning'],
      artMap:'',
      articles:[],
      is_dark:true
    }
  },
  methods: {
    initData() {
      get("/article/alltags").then(res => {
        console.log(res);
        this.tagList = [];
        for (let i = 0; i < res.data.length; i ++) {
          this.tagList.push(res.data[i]);
        }
      })
    },
    handleClose(name) {
      ElMessageBox.confirm(
          '确定要删除\''+name+'\'这个标签吗',
          '删除确认',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }
      )
          .then(() => {
            post("/article/deletetag", QueryString.stringify({name:name})).then(res => {
              if (res.data === 200) {
                ElMessage({
                  type: 'success',
                  message: '删除成功',
                })
                this.initData()
              } else {
                ElMessage({
                  type: 'error',
                  message: '未分类不能被删除',
                })
              }
            })

          })
          .catch(() => {

          })
    },
    addTag() {
      ElMessageBox.prompt('输入标签的名字', '添加标签', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        inputPattern:
            /^.+$/,
        inputErrorMessage: '不能为空',
      })
          .then(({ value }) => {
            post("/article/addtag", QueryString.stringify({name:value})).then(res => {
              if (res.data === 200) {
                ElMessage({
                  type: 'success',
                  message: `添加成功`,
                })
                this.initData()
              } else {
                ElMessage({
                  type: 'error',
                  message: `标签已存在`,
                })
              }
            })

          })
    },
    modifyName(oldName) {
      ElMessageBox.prompt('输入\''+oldName+'\'的新名字', '修改名字', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        inputPattern:
            /^.+$/,
        inputErrorMessage: '不能为空',
      })
          .then(({ value }) => {
            post("/article/modifytag", QueryString.stringify({oldName:oldName, newName:value})).then(res => {
              if (res.data === 200) {
                ElMessage({
                  type: 'success',
                  message: `修改成功`,
                })
                this.initData()
              }
            })

          })
    },
    getArticle(name) {
      if (!this.artMap.has(name)) {
        post("/article/tagart", QueryString.stringify({name : name})).then(res => {
          console.log(res)
          this.artMap.set(name, res.data);
        })
      }

    }
  },
  mounted() {
    this.artMap = new Map()
    this.initData()
  }
}
</script>

<style scoped>
.el-tag--large{
  --el-icon-size:20px!important;
}
</style>