
<template>
  <div id="app">
    
    <mt-header title="信息管理系统"></mt-header>

    <!-- 所有即将变化的页面都会有 tmpl 样式 -->
    <!-- transition标签添加过渡效果，out-in模式表示组件先离开、再进入 -->
    <transition name="fade" mode="out-in">
      <router-view class="tmpl"/>
    </transition>

    <mt-tabbar v-model="selected">
      <mt-tab-item id="Home">
        <img slot="icon" src="">
        首页
      </mt-tab-item>
      <mt-tab-item id="Member">
        <img slot="icon" src="">
        会员
      </mt-tab-item>
      <mt-tab-item id="Shopcart">
        <img slot="icon" src="">
        <!-- 购物车<mt-badge size="small" type="error">{{totalNum}}</mt-badge> -->
        购物车<mt-badge size="small" type="error">{{getNum}}</mt-badge>
      </mt-tab-item>
      <mt-tab-item id="Search">
        <img slot="icon" src="">
        查找
      </mt-tab-item>
    </mt-tabbar>

  </div>
</template>


<script>
import Bus from './bus.js';
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  
  data : function() {
    return {
      selected : "",
      fixed : true,
      // totalNum: 0,
    }
  },

  created() {
    // 注册addShopcartNum()函数，在其他组件中调用以更新totalNum
    // Bus.$on('addShopcartNum', num => {
    //   this.totalNum += num;
    // });
    // Bus.$on('shopcartNum', num => {
    //   this.totalNum = num;
    // });
  },

  watch : {
    selected : function(newV, oldV) { // 监视selected数值，不能使用箭头函数，因为this作用域的问题
      console.log(newV);

      // 路由导航，跳转到选定的组件上
      this.$router.push({
        name:newV
      });
    }
  },

  computed: {
    // ...mapGetters([
    //   'getNum',
    // ])

    getNum() {
      return      this.$store.getters.getNum;
    }
  }
}
</script>


<style scoped>

/* 组件过渡的动画效果 */
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

body {
  margin: 0;
  padding: 0;
}

.mint-tabbar {
  position: fixed;
  bottom: 0;
}

.tmpl {
  margin-bottom: 50px;
}

</style>
