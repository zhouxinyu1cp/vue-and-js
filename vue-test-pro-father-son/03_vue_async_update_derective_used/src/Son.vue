<template>
  <div>
    
    <button @click="change()">改变父元素的属性</button>

    <!-- 子组件：{{myimgs}}; -->
    子组件：{{imgs}}

  </div>
</template>

<script>
import Bus from './EventBus.js';

export default {
  name: 'son',

  props: ['imgs'],

  data() {
    return {
      // 如果希望有自己的数据，不要新声明一个变量用属性赋值，利用computed计算属性，
      // 展示的时候以父组件属性为主，computed为辅
      myimgs: this.imgs,
    }
  },

  methods: {
    change() {
      // 触发对传入的imgs属性的更新，该操作会同步更新父组件中的对应属性值
      this.$emit('update:imgs', []);
    }
  },

}
</script>

<style>

</style>
