// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store.js'

/* 整个项目的入口文件 */

Vue.config.productionTip = false

import "mint-ui/lib/style.css"
import MintUI from "mint-ui"
Vue.use(MintUI)

import Axios from 'axios'
Vue.prototype.$axios = Axios;
Axios.defaults.baseURL = 'https://kids.baicizhan.com/api';
// 使用拦截器：
// 1、请求发起前显示加载图标 -- open()
Axios.interceptors.request.use(function(config) {
  MintUI.Indicator.open({
    text: '努力加载中...',
    spinnerType: 'fading-circle'
  });

  // 不变配置直接返回，若要改配置，可以改变请求头等  config:{header}
  return config;
});
// 2、响应回来后关闭加载图标 -- close()
Axios.interceptors.response.use(function(response) {
  MintUI.Indicator.close();

  // response:{ headers:{}, data:{}, config:{} }
  return response; 
});

import MyUl from './components/MyUl'
Vue.component(MyUl.name, MyUl);

import MyLi from './components/MyLi'
Vue.component(MyLi.name, MyLi);

import NavBar from './components/NavBar'
Vue.component(NavBar.name, NavBar);


// 定义全局过滤器，转换时间
import Moment from 'moment'
Vue.filter('convertTime', function(data, formatStr) {
  // 原时间数据 2015-03-22T03:12:50.000Z
  // data-要过滤的数据， formatStr-格式字符串
  return Moment(data).format(formatStr);
});


// 引入预览插件，可以预览图片
import VuePreView from 'vue-preview'
Vue.use(VuePreView);

import Comment from './components/Comment'
Vue.component(Comment.name, Comment);


// 全局过滤器 -- 控制显示的字数
Vue.filter('controllShow', function(str, num) {
  // 若当前字符串的字数小于num，返回原值
  // 若大于num，截取 0 - num-1
  if(str.length <= num) {
    return str;
  }
  
  return (str.substr(0, num - 1) + "...");
});


import MySwipe from './components/Swipe'
Vue.component(MySwipe.name, MySwipe);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
