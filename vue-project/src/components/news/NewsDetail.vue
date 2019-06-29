

<template>
  <div>
    
    <nav-bar :title="myTitle" />

    <div class="tmpl">
      <div class="news-title">
        <p>{{newsInfo.title}}</p>
        <div>
          <span>{{newsInfo.click}}次点击</span>
          <span>分类：民生经济</span>
          <span>添加时间：{{newsInfo.add_time | convertTime('YYYY-MM-DD')}}</span>
        </div>
      </div>

      <!-- 带html标签的内容不能直接使用 {{}} 输出 -->
      <!-- <div class="news-content">{{newsInfo.content}}</div> -->

      <!-- 使用v-html输出带html标签的内容，v-html中的样式渲染要在全局css中定义 -->
      <div class="news-content" v-html="newsInfo.content"></div>
    </div>

  </div>
</template>


<script>
export default {

  name: 'NewsDetail',

  data() {
    return {
      newsInfo : {
        id: 1,
        title: "玩魔兽世界还是星际争霸",
        click: 9999,
        add_time: "2015-04-16T03:50:28.000Z",
        content: "<h1>死神镰刀</h1><br/>会计分录时代峻峰水电费快结束了对接方式水电费会计师的脸颊上的现场女两年多少了几分老师的乐山大佛记录啥"
      },

      myTitle: '', // 可变的标题
    }
  },

  methods : {
    
  },

  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建

    let title = '详情';

    // 1、判断from是新闻列表，还是商品详情
    if(from.name === 'NewsList') {
      title = '新闻详情';
    }
    else if(from.name === 'GoodsDetail') {
      title = '商品图文信息';
    }

    // 这里没有this，因为组件还没有被实例化
    next(vm => {
      // 通过 'vm' 访问组件实例，vm就是未来的this
      vm.myTitle = title;
    });
  },

  created : function() {
    // console.log(this.$route.params);  // 打印当前的路由参数

    // // 向后端请求数据
    // let { id } = this.$route.params;
    // let url = `/getnews/${id}`;
    // this.$axios.get(url).then(res => {
    //   this.newsInfo = res.data.message[0];
    // }).catch(err => {
    //   console.log(err);
    // });
  }

}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.news-title p {
  color: #0a87f8;
  font-size: 20px;
  font-weight: bold;
}

.news-title span {
  margin-right: 30px;
}

.news-title {
  margin-top: 5px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.news-content {
  margin-top: 5px;
  padding: 10 5;
}


</style>
