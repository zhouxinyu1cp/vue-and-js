

<template>
  <div>
    
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item, index) in imgsInfo" :key="index">
        <img :src="item.src || item.img" >
      </mt-swipe-item>
    </mt-swipe>
  
  </div>
</template>


<script>
export default {
  name : "my-swipe",
  
  props : [
    'url',
    'imgsInfo'
  ], 

  data() {
    return {
      // myimgs: this.imgsInfo,
      // 1、myimgs的修改不会影响外部的this.imgsInfo的重新渲染
      // 2、子组件接收父组件的属性再去做显示，也不能显示成功，内部执行时机的问题
    }
  },

  methods : {
    
  },

  created : function() {
    // 向后端请求图片数据

    // this.$axios.get(this.url).then( res => {
    //   this.imgs = res.data.message;
    // }).catch( err => {
    //   console.log(err);
    // });
  }
}
</script>


<style scoped>

.mint-swipe {
  width: 100%;
  height: 200px;
}

.mint-swipe img {
  width: 100%;
}

</style>
