import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WriteArticle from "@/views/WriteArticle.vue";
import ShowArticle from "@/views/ShowArticle.vue";
import TagsManage from "@/views/TagsManage.vue";
import Login from "@/views/Login.vue";
import MainPage from "@/views/MainPage.vue";
import {post} from "@/utils/Network";

const routes = [
  {
    path:'/',
    name:'login',
    meta:{
      title:'登录'
    },
    component: Login
  },
  {
    path: '/main',
    name: 'mp',
    component: MainPage,
    children: [
      // {
      //   path: '/',
      //   name: 'home',
      //   component: WriteArticle
      // },
      {
        path: 'write',
        name: 'w',
        meta:{
          title:'写文章'
        },
        component: WriteArticle
      },
      {
        path: 'article',
        name: 'about',
        meta:{
          title:'文章管理'
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: ShowArticle
      },
      {
        path: 'tags',
        name: 'tag',
        meta:{
          title:'标签管理'
        },
        component: TagsManage
      }
    ]
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to,from,next)=>{
  if(to.meta.title){
    document.title=to.meta.title
  }
  if(to.path!=='/'){
    console.log(window.localStorage.getItem("token"))
    if(window.localStorage.getItem("token")===null||window.localStorage.getItem("token")===undefined){
      document.title="登录"
      next({
        path:'/'
      })
    }
    else{
      post("/article/token").then(res=>{
        console.log(res.data);
        if(res.data===true) next()
        else {
          document.title="登录"
          next({
            path: '/',
            component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
          })
        }
      })
    }
  }
  else next()
  // if(to.path==='/main/home'&&from.path==='/'){
  //
  //
  //   next()
  //
  // }
  // else next()
})
export default router
