

<template>
  <div>
    <nav-bar title="图文详情"/>

    <div class="photo-detail">
      <p>{{photoInfo.title}}</p>
      <span>提交日期: {{photoInfo.add_time | convertTime('YYYY-MM-DD')}}</span>
      <span>{{photoInfo.click}}次浏览</span>
      <span>分类: 民生经济</span>
    </div>

    <my-ul>
      <my-li v-for="(img, idx) in imgs" :key="idx">
        <!-- 调用者本身可以对要传入的slot元素设置样式 -->
        <img :src="img.src" slot="icon" style="width:100px"> 
      </my-li>
    </my-ul>

    <!-- 使用预览插件来预览图片 -->
    <!-- <vue-preview :slides="slide1" @close="handleClose"></vue-preview> -->

    <div class="photo-desc">
      <p v-html="photoInfo.content"></p>
    </div>

    <!-- 下面是评论组件，需要给组件传入当前路由参数id -->
    <comment :cid="$route.params.id"></comment>
  </div>
</template>


<script>
export default {
  name: "PhotoDetail",

  data() {
    return {
      photoInfo: {
        id: 10,
        title: "一张大图片",
        click: 255,
        add_time: "2015-04-16T03:50:28.000Z",
        content:
          "<h1>死神镰刀</h1><br/>会计分录时代峻峰水电费快结束了对接方式水电费会计师的脸颊上的现场女两年多少了几分老师的乐山大佛记录啥熟练度空间分类考试的<p>风景微票金鹏就水电费</p>会计师了对方"
      },

      imgs: [
        {src:""}, 
        {src:""}
      ],

      slide1: [
        {
          src:"https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg",
          msrc:"https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg",
          alt: "picture1",
          title: "Image Caption 1",
          w: 600,
          h: 400
        },
        {
          src:"https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg",
          msrc:"https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg",
          alt: "picture2",
          title: "Image Caption 2",
          w: 1200,
          h: 900
        }
      ]
    };
  },

  methods: {
    handleClose() {
      console.log('close event')
    }
  },

  created: function() {
    // 通过id向后端请求图片的相关信息

    // let photoid = this.$route.params.id;
    // this.$axios.get(`/getimginfo/${photoid}`).then(res => {
    //   this.photoInfo = res.data.message[0];
    // }).catch(err => console.log(err));

    // this.$axios.get(`/getimgs/${photoid}`).then(res => {
    //   this.imgs = res.data.message;
    // }).catch(err => console.log(err));
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}

.photo-desc {
  margin-bottom: 5px;
  padding-left: 5px;
  padding-bottom: 5px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.photo-desc p {
  color: #13c2f7;
  font-size: 18px;
  font-weight: bold;
}
</style>
