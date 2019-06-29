

<template>
  <div id="app">
    
    {{getMyNum}}

    <button @click="addNum()">添加Num</button>
    <button @click="addByNum()">追加一定量Num</button>
    <button @click="addByNumAsync()">异步追加一定量Num</button>

    {{getNum}}
    {{getText}}
    {{getName}}

  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'App',

  components: {
    
  },

  methods: {
    addNum() {
      this.$store.commit('addNum'); // commit调用的是mutations中的函数
    },

    addByNum() {
      this.$store.commit('addByNum', 10);
    }, 

    addByNumAsync() {
      // this.$store.commit('addByNumAsync', 20); // commit只能调用同步操作

      // 异步操作使用action
      this.$store.dispatch('addByNumAsync', 20); // dispatch调用的是actions中的函数
    }
  },

  // getters通常和computed计算属性配合使用
  computed: {
    getMyNum() {
      return this.$store.getters.getNum;
    },

    // ...运算符展开对象，将其分成key、value
    ...mapGetters([
      'getNum', // getters中的key
      'getText',
      'getName'
    ])
  },

  // 开发中使用vuex必踩的坑：动态的给state添加属性
  created() {
    setTimeout(() => {
      this.$store.dispatch('addProps', 'Mr.Zhaodao');
    }, 1000);
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
