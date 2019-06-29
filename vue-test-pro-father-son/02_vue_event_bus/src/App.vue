<template>
  <div>
    父组件：{{stus}}
    <hr/>  
    <son :stus="stus" ></son>
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
      stus: [
        {name: '张三'},
        {name: '李四'},
      ],
    }
  },

  created : function() {
    // 父组件先注册函数
    Bus.$on('changeStus', (data) => {
      console.log(this); // 这里的this指向Bus实例，应改成箭头函数
      this.stus = data;
    });
  }
}
</script>

<style>

</style>
