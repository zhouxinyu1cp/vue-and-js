<template>
  <div>
    父组件：{{imgs}}
    <hr/>  

    <!-- 父、子组件对imgs属性进行双向数据绑定 -->
    <son v-bind:imgs.sync="imgs"></son> 
  </div>
</template>

<script>
// 引入Bus
import Bus from './EventBus.js';

export default {
  name: 'app',

  methods: {
    
  },

  data() {
    return {
      imgs: [],
    }
  },

  created: async function() {
    setTimeout( () => {
      this.imgs = [1, 2, 3];
    }, 2000);
  }
}
</script>

<style>

</style>
