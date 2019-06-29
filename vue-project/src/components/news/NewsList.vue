

<template>
  <div>
    <!-- 上部的返回栏 -->
    <nav-bar :title="title"></nav-bar>

    <!-- 渲染新闻列表数据 -->
    <div class="demo">
      <ul>
        <li v-for="(news, index) in newsList" :key="index">
          <router-link :to="{ name:'NewsDetail', params:{id:news.id} }">
            <img :src="news.img_url" alt="">
            <div>
              <span>{{news.title}}</span>
              <div class="news-desc">
                <p>点击数:{{news.click}}</p>
                <p>发表时间:{{news.add_time | convertTime('YYYY-MM-DD')}}</p>
              </div>
            </div>
          </router-link>
        </li>
        <!-- <li class="line"></li> -->
      </ul>
    </div>

  </div>
</template>


<script>
export default {

  name: 'NewsList',

  data() {
    return {
      title : "新闻列表",

      newsList : [
        { id:1, 
          title:"买房还是炒股", 
          add_time:"2015-04-16T03:50:28.000Z", 
          zhaiyao:"塑料袋副教授两地分居", 
          click:1, 
          img_url:""
        },
        { id:2, 
          title:"魔兽世界", 
          add_time:"2015-04-16T03:50:28.000Z", 
          zhaiyao:"塑料袋副教授两地分居", 
          click:10, 
          img_url:""
        },
        { id:3, 
          title:"利益需求", 
          add_time:"2015-04-16T03:50:28.000Z", 
          zhaiyao:"塑料袋副教授两地分居", 
          click:100, 
          img_url:""
        },
        { id:4, 
          title:"水电费水电费", 
          add_time:"2015-04-16T03:50:28.000Z", 
          zhaiyao:"塑料袋副教授两地分居", 
          click:1000, 
          img_url:""
        },
        { id:5, 
          title:"胜多负少的范德萨", 
          add_time:"2015-04-16T03:50:28.000Z", 
          zhaiyao:"塑料袋副教授两地分居", 
          click:10000, 
          img_url:""
        }
      ]
    }
  },

  methods : {
    
  },

  created : function() {
    // 向后端请求数据，用接收的数据渲染页面
  }

}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.demo a {
  display: block;
  width: 330px;
  height: 44px;
  color: #000;
  padding: 10px 15px;
}

.demo img {
  float: left;
  width: 42px;
  height: 42px;
  margin-right: 20px;
}

.demo a div {
  float: left;
  width: 238px;
  margin-right: 20px;
}

.demo span {
  display: block;
  width: 100%;
  font-size: 17px;
  line-height: 21px;
}

.demo a p {
  float: left;
  font-size: 14px;
  line-height: 21px;
  color: #0bb0f5;
}

.demo p:nth-child(2) {
  float: right;
}

.demo ul {
  padding: 0;
}

.line {
  margin-left: 16px;
  transform: scaleY(.5);
  border-bottom: 1px solid #c8c7cc;
}

.news-desc {
  height: 35px;
}


</style>
