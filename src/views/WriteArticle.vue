<template>
<div style="height: 100%;width: 100%;">
  <div id="top" style="width: 100%;height: 50%">
    <el-row>
      <el-col :span="12">
        <div id = "top-left" style="height: 100%;width: 100%;">
          <div style="margin-left: 4%;margin-top: 10px; font-size: 26px;color: #303133">模板生成</div>
          <el-row>
            <el-col :span="18">
              <div style="margin-left: 5.3%">
                <el-input v-model="title" placeholder=" ヾ(≧▽≦*)o " style="width: 600px;margin-top: 15px;height: 40px">
                  <template #prepend>
                    <span style="width: 100px;text-align: center">标题</span>
                  </template>
                </el-input>
                <br>
                <el-input v-model="keywords" placeholder=" φ(*￣0￣)" style="width: 600px;margin-top: 15px;height: 40px">
                  <template #prepend>
                    <span style="width: 100px;text-align: center">关键词</span>
                  </template>
                </el-input>
                <br>
                <el-input v-model="desc" placeholder=" φ(゜▽゜*)♪" style="width: 600px;margin-top: 15px;height: 40px">
                  <template #prepend>
                    <span style="width: 100px;text-align: center">描述</span>
                  </template>
                </el-input>
                <br>
                <el-input v-model="top_img" placeholder=" (～￣▽￣)～" style="width: 600px;margin-top: 15px;height: 40px">
                  <template #prepend>
                    <span style="width: 100px;text-align: center">页顶图片URL</span>
                  </template>
                </el-input>
                <br>
                <el-input v-model="cover" placeholder=" ( •̀ ω •́ )✧" style="width: 600px;margin-top: 15px;height: 40px">
                  <template #prepend>
                    <span style="width: 100px;text-align: center">缩略图URL</span>
                  </template>
                </el-input>
                <br>
                <div style="margin-top: 15px;">
                  <!--        <span style="width: 140px;color:#909399;display: inline-block;text-align: center;line-height: 40px;">文章评论</span>-->
                  <el-form-item >
                    <template #label>
                      <span style="width: 130px;color:#909399;text-align: center;font-size: 14px">文章评论</span>
                    </template>
                    <el-radio-group v-model="is_comment" size="large" style=";height: 40px;">

                      <el-radio-button label="true" >允许</el-radio-button>
                      <el-radio-button label="false" >禁止</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                </div>

                <el-form-item style="margin-top: 15px;">
                  <template #label>
                    <span style="width: 130px;color:#909399;text-align: center;font-size: 14px">文章分类</span>
                  </template>
                  <el-select v-model="tags" class="m-2" placeholder="选择分类" size="large" >
                    <el-option
                        v-for="item in tags_choice"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div style="margin-top: 60%;margin-left: 30px">
              <el-button type="success" round size="large" style="width: 100px;"  @click="generate">
                生成模板
              </el-button>
              </div>
              <div style="margin-top: 20px;margin-left: 30px">
              <el-button type="info" round size="large"  @click="reset" style="width: 100px">
                重置
              </el-button>
              </div>
            </el-col>
          </el-row>

        </div>
      </el-col>
      <el-col :span="12">
        <div id="top-right" style="height: 100%;width: 100%;">
          <div style="margin-left: 4%;margin-top: 10px; font-size: 26px;color: #303133" >上传图床</div>
<!--          <el-divider direction="vertical" border-style="dashed" style="height: 80%;display: inline-block"/>-->
          <div style="display: inline-block;width: 100%">
            <el-upload
                style="margin-top: 15px;;width: 50%;margin-left: 100px;display:inline-block;"
                class="upload-demo"
                ref="uploadMutiple"
                drag
                :action="getUrl + '/article/uploadOSS'"
                multiple
                :on-success="handleUploadOSS"
                :show-file-list="false"
                :headers="header"
            >
              <el-icon class="el-icon--upload"><Picture /></el-icon>

              <div class="el-upload__text">
                将图片托至此处或<em>点击上传</em>
              </div>
            </el-upload>
            <div id="preview" @paste="handlePaste" style="display: inline-block;width: 20%;margin-left: 20px">
              <span style="color:#606266;"><el-icon color="#909399"><Opportunity /></el-icon>或点击此处 粘贴上传</span>
            </div>

            <div id="showurl" style="margin-top: 30px;padding-left: 30px;font-size: 20px;color: #606266;width: 90%;word-break: break-all">
              回调URL: {{image_url}}
            </div>
            <div id="buttons" style="margin-left: 50px;margin-top: 40px">
              <el-button :disabled="image_url === '' || image_url.length === 0" type="primary" @click="top_img = image_url">
                设置为页顶图片</el-button>
              <el-button :disabled="image_url === '' || image_url.length === 0" type="warning" @click="cover = image_url">
                设置为缩略图</el-button>
            </div>
          </div>

        </div>
      </el-col>
    </el-row>
  </div>

  <div id = "mid" style="height: 5%; width: 100%">
    <el-divider border-style="dashed" style="width: 96%;margin-left: 2%" />
  </div>
  <div id="bottom" style="height: 35%;width: 100%;">
    <span style="margin-left: 2%;margin-top: 10px; font-size: 26px;color: #303133">博客上传</span>
    <el-row style="height: 100%">
      <el-col :span="12" style="height: 100%;">
        <el-upload
            style="margin-top: 15px;margin-left: 4%;width: 80%"
            class="upload-demo"
            drag
            :action="getUrl + '/article/upload'"
            multiple
            :on-success="handleUpload"
            :show-file-list="false"
            :headers="header"
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">
            将文件托至此处或<em>点击上传</em>
          </div>
          <template #tip>
            <div class="el-upload__tip">
              仅限MarkDown文件
            </div>
          </template>
        </el-upload>
      </el-col>
      <el-col :span="4" style="height: 100%">
        <img src="../assets/1671543005069.png" style="height: 100%">
      </el-col>
      <el-col :span="4" style="height: 100%">
        <img src="../assets/1671543005085.png" style="height: 100%">
      </el-col>
      <el-col :span="4" style="height: 100%">
        <img src="../assets/1671543005100.png" style="height: 100%">
      </el-col>
    </el-row>

  </div>

</div>
</template>

<script>
import {get, getBaseUrl} from "@/utils/Network";
import { ElMessage } from 'element-plus'
export default {
  name: "WriteArticle",
  data() {
    return {
      title:"",
      tags:"",
      keywords:"",
      desc:"",
      top_img:"",
      cover:"",
      is_comment:true,
      input_width:'600px',
      tags_choice:[],
      image_url:"",
      header:{
        'token':window.localStorage.getItem('token')
      },
    }
  },
  methods: {
    test() {
      get("/article/test").then(res=>{
        console.log(res)
      })
    },
    handleUpload(res, file) {
      if (res === 500) {
        ElMessage({
          message: '博客上传失败',
          type: 'success',
        })
      } else if (res === 200) {
        ElMessage({
          message: '博客上传成功',
          type: 'success',
        })
      }
      console.log(res)
    },
    handleUploadOSS(res, file) {
      ElMessage({
        message: '图片上传OSS成功',
        type: 'success',
      })
      this.image_url = res
    },
    handlePaste(event) {
      const items = (event.clipboardData || window.clipboardData).items;
      let file = null;
      if (!items || items.length === 0) {
        this.$message.error("当前浏览器不支持本地");
        return;
      }
      // 搜索剪切板items
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          file = items[i].getAsFile();
          break;
        }
      }
      if (!file) {
        this.$message.error("粘贴内容非图片");
        return;
      }
      this.$refs.uploadMutiple.handleStart(file);// 将粘贴过来的图片加入预上传队列
      this.$refs.uploadMutiple.submit(); // 提交图片上传队列
    },
    generate() {
      if (this.title === "" || this.title.length === 0) {
        ElMessage.error('标题不能为空！')
      } else {
        Date.prototype.Format = function (fmt) { //author: meizz
          let o = {
            "M+" : this.getMonth()+1,                 //月份
            "d+" : this.getDate(),                    //日
            "H+" : this.getHours(),                   //小时
            "m+" : this.getMinutes(),                 //分
            "s+" : this.getSeconds(),                 //秒
            "q+" : Math.floor((this.getMonth()+3)/3), //季度
            "S"  : this.getMilliseconds()             //毫秒
          };
          if(/(y+)/.test(fmt))
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
          for(let k in o)
            if(new RegExp("("+ k +")").test(fmt))
              fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
          return fmt;
        }
        let fileName = this.title + ".md"
        let time = new Date().Format("yyyy-MM-dd HH:mm:ss")
        let content = "---\n" +
            "title: " + this.title + "\n" +
            "date: " + time + "\n" +
            "tags: " + this.tags + "\n" +
            "updated: " + time + "\n" +
            "keywords: " + this.keywords + "\n" +
            "desc: " + this.desc + "\n" +
            "top_img: " + this.top_img + "\n" +
            "cover: " + this.cover + "\n" +
            "is_comment: " + this.is_comment + "\n" +
            "---\n" +
            "# " + this.title
        let aTag = document.createElement('a');
        let blob = new Blob([content]);
        aTag.download = fileName;
        aTag.href = URL.createObjectURL(blob);
        aTag.click();
        URL.revokeObjectURL(blob);
        ElMessage({
          message: '模板文件生成成功，开始下载',
          type: 'success',
        })

        console.log("awsasa")
      }
    },
    reset() {
      this.title=""
      this.tags=""
      this.keywords=""
      this.desc=""
      this.top_img=""
      this.cover=""
      this.is_comment=true
    }
  },
  computed: {
    getUrl() {
      return getBaseUrl();
    }
  },
  mounted() {
    get("/article/alltags").then(res => {
      console.log(res);
      this.tags_choice = [];
      for (let i = 0; i < res.data.length; i ++) {
        this.tags_choice.push({value : res.data[i], label : res.data[i]});
      }
    })
  }
}
</script>

<style scoped>

</style>