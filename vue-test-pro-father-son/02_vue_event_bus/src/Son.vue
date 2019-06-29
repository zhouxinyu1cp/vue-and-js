<template>
  <div>
    
    <button @click="change()">改变父元素的属性</button>

    子组件：{{stus}};

  </div>
</template>

<script>
import Bus from './EventBus.js';

export default {
  name: 'son',

  props: ['stus'],

  data () {
    return {
      
    }
  },

  methods: {
    change() {
      // 子组件调用父组件中已经注册的函数
      Bus.$emit('changeStus', [1, 2, 3]);
    }
  },

}
</script>

<style>

</style>
