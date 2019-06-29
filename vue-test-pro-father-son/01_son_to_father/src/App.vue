<template>
  <div>
    父组件的：{{stus}}

    <son :stus="stus" :changeHandler="changeStus"></son>
  </div>
</template>

<script>
export default {
  name: 'app',

  methods: {
    changeStus(data) {
      this.stus = data;
    }
  },

  data() {
    return {
      stus : [
        {name:'张三'},
        {name:'李四'},
      ],

    }
  }
}
</script>

<style>

</style>
