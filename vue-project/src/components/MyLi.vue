

<template>
  <li>
      <slot></slot>

      <div class="icon">
        <!-- 在组件内部，能给通用元素设置样式，如img、p标签等，但不能给slot元素本身设置样式 -->
        <!-- 因为slot元素渲染后本身是不会存在的，不像router-view会自己加一个div，所以给slot元素加样式加不上 -->
        <slot name="icon"></slot>
      </div>
  </li>
</template>


<script>
export default {
  name: 'my-li',

  data () {
    return {
      
    }
  },

  methods : {

  }
}
</script>


<style scoped>

li {
  list-style: none;
  float: left;
  width: 33.33%;
  text-align: center;
  margin-top: 20px;
}

.icon img {
  width: 100%;
}


</style>
