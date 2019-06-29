

<template>
  <div>
    
    <div class="grid">
      <ul>
        <li v-for="(item, index) in models" :key="index">
          <router-link :to="item.route">
            <div>{{item.title}}</div>
          </router-link>
        </li>
      </ul>
    </div>

  </div>
</template>


<script>
export default {
  name: 'Member',

  data () {
    return {
      models : [
        {title:"新闻资讯", route:{name:'NewsList'}},
        {title:"图文分享", route:{name:'PhotoList', query:{categoryId:0}}},
        {title:"商品展示", route:{name:'GoodsShow', params:{page:1}}},
        {title:"留言反馈", route:{}},
        {title:"搜索咨询", route:{}},
        {title:"联系我们", route:{}},
      ],
    }
  },

  methods : {

        
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

ul {
  margin: 0;
  padding: 0;
  overflow: hidden;
}

li {
  list-style: none;
  float: left;
  width: 33.33%;
  text-align: center;
  margin-top: 20px;
}

li a {
  text-decoration: none;
  color:brown;
}

</style>
