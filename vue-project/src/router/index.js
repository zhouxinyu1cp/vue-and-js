import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Member from '@/components/member/Member'
import Shopcart from '@/components/shopcart/Shopcart'
import Search from '@/components/search/Search'
import NewsList from '@/components/news/NewsList'
import NewsDetail from '@/components/news/NewsDetail'
import PhotoList from '@/components/photo/PhotoList'
import PhotoDetail from '@/components/photo/PhotoDetail'
import GoodsShow from '@/components/goods/GoodsShow'
import GoodsDetail from '@/components/goods/GoodsDetail'
import GoodsComment from '@/components/goods/GoodsComment'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/member',
      name: 'Member',
      component: Member
    },
    {
      path: '/shopcart',
      name: 'Shopcart',
      component: Shopcart
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/news/list',
      name: 'NewsList',
      component: NewsList
    },
    {
      path: '/news/detail/:id',
      name: 'NewsDetail',
      component: NewsDetail
    },
    {
      path: '/photo/list',
      name: 'PhotoList',
      component: PhotoList
    },
    {
      path: '/photo/detail/:id',
      name: 'PhotoDetail',
      component: PhotoDetail
    },
    {
      path: '/goods/list/:page',
      name: 'GoodsShow',
      component: GoodsShow
    },
    {
      path: '/goods/detail',
      name: 'GoodsDetail',
      component: GoodsDetail
    },
    {
      path: '/goods/comment',
      name: 'GoodsComment',
      component: GoodsComment
    },
  ]
})
