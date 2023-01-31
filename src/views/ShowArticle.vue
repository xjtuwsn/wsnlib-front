<template>
<div>
  <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            style="width: 100%; padding-top: 30px;font-size: 14px">
    <el-table-column prop="id" label="ID" width="80" />
    <el-table-column prop="title" label="标题" width="250" >
      <template #default="scope">
        <div style="overflow:hidden; text-overflow:ellipsis;white-space:nowrap;//强制文本在一行内显示">
          <strong>{{scope.row.title}}</strong>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="date" label="创建时间" />
    <el-table-column prop="updated" label="更新时间" />
    <el-table-column prop="tagName" label="分类" >
      <template #default="scope">
        <el-tag>{{scope.row.tagName}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="keywords" label="关键词" >
      <template #default="scope">
        <div>
          <span v-if="scope.row.keywords.length === 0 || scope.row.keywords === ''">无</span>
          <span v-else>{{scope.row.keywords}}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="desc" label="描述" >
      <template #default="scope">
        <div>
          <span v-if="scope.row.desc.length === 0 || scope.row.desc === ''">无</span>
          <span v-else>{{scope.row.desc}}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="top_img" label="页顶图像" width="80" >
      <template #default="scope">
        <el-avatar v-if="scope.row.top_img !== null && scope.row.top_img !== ''"
                   :src="scope.row.top_img" shape="square" alt="" style="height: 42px;width: 42px;" :alt="empty_url"></el-avatar>
        <el-avatar v-else :src="empty_url" shape="square" alt="" style="height: 42px;width: 42px;"></el-avatar>
      </template>
    </el-table-column>
    <el-table-column prop="cover" label="缩略图" width="80">
      <template #default="scope">
        <el-avatar v-if="scope.row.cover !== null && scope.row.cover !== ''"
                   :src="scope.row.cover" shape="square" alt="" style="height: 42px;width: 42px;" :alt="empty_url"></el-avatar>
        <el-avatar v-else :src="empty_url" shape="square" alt="" style="height: 42px;width: 42px;"></el-avatar>
      </template>
    </el-table-column>
    <el-table-column prop="is_comment" label="允许评论" >
      <template #default="scope">
        <div>
          <span v-if="scope.row.is_comment">是</span>
          <span v-else>否</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column
        align="right"
    >
<!--      <template #header>-->
<!--        <el-input-->
<!--            v-model="search"-->
<!--            size="mini"-->
<!--            placeholder="输入用户名进行搜索"/>-->
<!--      </template>-->

      <template #default="scope">
        <el-button
            circle
            @click="handleEdit(scope.$index, scope.row)" >
          <el-icon><EditPen /></el-icon>
        </el-button>
        <el-button
            type="danger"
            circle
            @click="handleDelete(scope.$index, scope.row)">
          <el-icon><Delete /></el-icon>
        </el-button>
        <el-button
            type="success"
            circle
            @click="handleDownload(scope.$index, scope.row)">
          <el-icon><Download /></el-icon>
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="block" style="margin-top:15px;position:fixed;bottom: 7vh;right: 40vw">
    <el-pagination align='center' @size-change="handleSizeChange" @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   :page-sizes="[5,7,10,15,20,50]"
                   :page-size="pageSize"
                   layout=" total,sizes, prev,pager, next, jumper"
                   :total="tableData.length">
    </el-pagination>
  </div>
  <el-dialog v-model="showModify" width="60%">
    <div style="display: inline-block">
    <el-input v-model="title" style="width: 400px;margin-top: 15px;height: 40px">
      <template #prepend>
        <span style="width: 100px;text-align: center">标题</span>
      </template>
    </el-input>
    <br>
    <el-input v-model="date" style="width: 400px;margin-top: 15px;height: 40px">
      <template #prepend>
        <span style="width: 100px;text-align: center">创建时间</span>
      </template>
    </el-input>
    <br>
    <el-input v-model="keywords" style="width: 400px;margin-top: 15px;height: 40px">
      <template #prepend>
        <span style="width: 100px;text-align: center">关键词</span>
      </template>
    </el-input>
    <br>
    <el-input v-model="desc" style="width: 400px;margin-top: 15px;height: 40px">
      <template #prepend>
        <span style="width: 100px;text-align: center">描述</span>
      </template>
    </el-input>
    <br>
    <el-input v-model="top_img" style="width: 400px;margin-top: 15px;height: 40px">
      <template #prepend>
        <span style="width: 100px;text-align: center">页顶图片URL</span>
      </template>
    </el-input>
    <br>
    <el-input v-model="cover" style="width: 400px;margin-top: 15px;height: 40px">
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
      <el-select v-model="tagName" class="m-2" placeholder="选择分类" size="large" >
        <el-option
            v-for="item in tags_choice"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
    </el-form-item>
    </div>
    <div style="display: inline-block; width: 50%;">
      <el-upload
          style="margin-top: 15px;;width: 50%;margin-left:50px;display:inline-block;"
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
      <div id="preview" @paste="handlePaste" style="display: inline-block;;margin-left: 20px">
        <span style="color:#606266;"><el-icon color="#909399"><Opportunity /></el-icon>或点击此处 粘贴上传</span>
      </div>

      <div id="showurl" style="margin-top: 30px;padding-left: 30px;font-size: 16px;max-width:400px;color: #606266;word-break: break-all">
        回调URL: {{image_url}}
      </div>
      <div id="buttons" style="margin-left: 50px;margin-top: 40px">
        <el-button :disabled="image_url === '' || image_url.length === 0" type="primary" @click="top_img = image_url">
          设置为页顶图片</el-button>
        <el-button :disabled="image_url === '' || image_url.length === 0" type="warning" @click="cover = image_url">
          设置为缩略图</el-button>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeModify">取消</el-button>
        <el-button type="primary" @click="confirmModify">
          修改
        </el-button>
      </span>
    </template>
  </el-dialog>
</div>
</template>

<script>
import {get, getBaseUrl, post, postc} from "@/utils/Network";
import {ElMessage, ElMessageBox} from 'element-plus'
import QueryString from "qs";
import {Delete, Edit} from "@element-plus/icons-vue";
export default {
  name: "ShowArticle",
  data() {
    return {
      tableData:[],
      currentPage: 1, // 当前页码
      total: '', // 总条数
      pageSize: 6, // 每页的数据条数,
      showModify:false,
      tags_choice:[],
      image_url:"",
      empty_url:"https://img.zcool.cn/community/0177965ad579eba8012040295d8025.png@1280w_1l_2o_100sh.png",
      oid:"",
      otitle:"",
      odate:"",
      oupdated:"",
      otagName:"",
      okeywords:"",
      odesc:"",
      otop_img:"",
      ocover:"",
      ois_comment:"",

      id:"",
      title:"",
      date:"",
      updated:"",
      tagName:"",
      keywords:"",
      desc:"",
      top_img:"",
      cover:"",
      is_comment:"",
      header:{
        'token':window.localStorage.getItem('token')
      },

    }
  },
  methods: {
    Delete,
    Edit,
    initData() {
      get("/article/allarts").then(res => {
        this.tableData = res.data;
        this.total = this.tableData.length;
        console.log(this.tableData)
        get("/article/alltags").then(r => {
          this.tags_choice = [];
          for (let i = 0; i < r.data.length; i ++) {
            this.tags_choice.push({value : r.data[i], label : r.data[i]});
          }
        })
      })
    },
    closeModify() {
      this.showModify = false
      console.log(this.otitle)
      console.log(this.title)

    },
    confirmModify() {
      if (this.judgeEqule()) {
        ElMessage({
          message: '未修改任何内容',
          type: 'warning',
        })
        this.showModify = false
      } else {
          post("/article/modify", QueryString.stringify({id:this.id, title:this.title, date: this.date, tag: this.tagName, keywords: this.keywords,
          desc: this.desc, top_img:this.top_img, cover:this.cover, is_comment: this.is_comment})).then(res => {
            if (res.data === 200) {
              ElMessage({
                message: '修改成功',
                type: 'success',
              })
              this.initData()
              this.showModify = false
            }
          })
      }
    },
    copyData(row) {
      this.id = row.id
      this.title = row.title
      this.date = row.date
      this.updated = row.updated
      this.tagName = row.tagName
      this.keywords = row.keywords
      this.desc = row.desc
      this.top_img = row.top_img
      this.cover = row.cover
      this.is_comment = row.is_comment
      this.otitle = row.title
      this.odate = row.date
      this.oupdated = row.updated
      this.otagName = row.tagName
      this.okeywords = row.keywords
      this.odesc = row.desc
      this.otop_img = row.top_img
      this.ocover = row.cover
      this.ois_comment = row.is_comment
    },
    judgeEqule() {
      return this.otitle === this.title &&
          this.odate === this.date &&
          this.oupdated === this.updated &&
          this.otagName === this.tagName &&
          this.okeywords === this.keywords &&
          this.odesc === this.desc &&
          this.otop_img === this.top_img &&
          this.ocover === this.cover &&
          this.ois_comment === this.is_comment
    },
    handleEdit(index, row) {
      this.showModify = true
      this.copyData(row)
    },
    handleDelete(index, row) {
      ElMessageBox.confirm(
          '确定要删除'+row.title+'这篇博客吗',
          '删除确认',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }
      )
          .then(() => {
            post("/article/delete", QueryString.stringify({id:row.id, title:row.title})).then(res => {
              if (res.data === 200) {
                ElMessage({
                  type: 'success',
                  message: '删除成功',
                })
                this.initData()
              }
            })

          })
          .catch(() => {

          })
    },
    handleDownload(index, row) {
      const config = {
        headers: {
          //和后端设置的一样
          'Content-Type': 'application/octet-stream;charset=UTF-8'
        },
        responseType: 'blob'
      };
      postc("/article/download/" + row.title + ".md", QueryString.stringify({title:row.title}), config).then(res => {
        console.log(res)
        let aTag = document.createElement('a');
        let blob = new Blob([res.data]);
        aTag.download = row.title + ".md";
        aTag.href = URL.createObjectURL(blob);
        aTag.click();
        URL.revokeObjectURL(blob);
        ElMessage({
          message: '博文下载成功',
          type: 'success',
        })
      })
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
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
  },
  computed: {
    getUrl() {
      return getBaseUrl();
    }
  },
  mounted() {
    this.initData();
    this.pageSize = window.screen.height / 120;
  }
}
</script>

<style scoped>

</style>