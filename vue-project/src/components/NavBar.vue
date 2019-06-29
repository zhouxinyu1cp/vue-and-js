

<template>
  <div>
    
    <mt-header :title="title">
      <div @click="goback()" slot="left">
        <mt-button icon="back">返回</mt-button>
      </div>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>

  </div>
</template>


<script>
export default {
  name : "nav-bar",
  
  props : ['title'], // props属性在template中可以直接使用，由父组件在使用时传入

  data () {
    return {
      
    }
  },

  methods : {
    goback() {
      this.$router.go(-1); // 返回历史记录的前一个链接
    }  
  },

  created : function() {
    // 在这里直接使用 this.title
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.tmpl .mint-header {
  background-color: yellowgreen;
}

</style>
