<template>
  <div>
    <!-- <div v-for="(stu,idx) in stus" :key="idx">
      {{stu.name}}
    </div> -->

    {{showStus}}

    <button @click="changeFather()">改变父元素的属性</button>

  </div>
</template>

<script>
export default {
  name: 'son',

  props: ['stus', 'changeHandler'],

  data () {
    return {
      
    }
  },

  /*
    vue中数据流是从父组件到子组件的向下数据流，
    当父组件的属性发生改变后，子组件中使用了该属性的地方会同步更新
   */

  methods: {
    // 2、改变父组件传来的属性数据
    changeFather() {
      // this.stus = 'aaabbb';  // 错误的做法
      this.changeHandler([]);
    }
  },

  /* 
    子组件可以接收父组件的属性，并computed，用新的结果作为return的数据（监视并添加额外处理）
   */

  // 1、变更显示
  computed : {
    showStus() {
      let mystus = [];

      // 子组件中修改父组件传来的属性数据，需要单独声明，不能在原数据上修改
      this.stus.forEach(ele => {
        mystus.push(ele.name + '先生');
      });

      return mystus;
    }
  }
}
</script>

<style>

</style>
