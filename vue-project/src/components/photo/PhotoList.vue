

<template>
  <div>
    
    <nav-bar title="图文分享"></nav-bar>

    <div class="photo-header">
      <ul>
        <li v-for="category in categories" :key="category.id">
          <a href="javascript:;" @click="navigateByCategoryId(category.id)">{{category.title}}</a>
        </li>
      </ul>
    </div>

    <div class="photo-list">
      <ul>
        <li v-for="(img, index) in imgs" :key="index">
          <router-link :to="{ name:'PhotoDetail', params:{id:img.id} }">
            <!-- <img :src="img.img_url" > -->

            <!-- 当前路由到的页面categoryId为0，对所有图片采取懒加载 -->
            <img v-if="$route.query.categoryId === 0" v-lazy="img.img_url">
            <!-- 否则，正常加载所有图片 -->
            <img v-else :src="img.img_url">

            <p>
              <span>{{img.title}}</span>
              <br/>
              <span>{{img.zhaiyao}}</span>
            </p>
          </router-link>
        </li>
      </ul>
    </div>

  </div>
</template>


<script>
export default {

  name: 'PhotoList',

  data() {
    return {
      // 分类信息
      categories : [
        {id:1, title:"家居服饰"},
        {id:2, title:"美图秀秀"},
        {id:3, title:"美女图片"},
        {id:4, title:"汽车引擎"},
        {id:5, title:"旅行拍照"},
        {id:6, title:"程序开发"},
        {id:7, title:"万象写真"},
      ],

      // 图片数据
      imgs: [
        {id:10, title:"图片标题还是非常重要的", zhaiyao:"胜多负少了的开发类似的飞机收到了看见了快速减肥实例的开房记录开始的分解诶哦我诶如饿哦未成年", img_url:""},
        {id:11, title:"图片标题还是非常重要的", zhaiyao:"胜多负少了的开发类似的飞机收到了看见了快速减肥实例的开房记录开始的分解诶哦我诶如饿哦未成年", img_url:""},
        {id:12, title:"图片标题还是非常重要的", zhaiyao:"胜多负少了的开发类似的飞机收到了看见了快速减肥实例的开房记录开始的分解诶哦我诶如饿哦未成年", img_url:""},
        {id:13, title:"图片标题还是非常重要的", zhaiyao:"胜多负少了的开发类似的飞机收到了看见了快速减肥实例的开房记录开始的分解诶哦我诶如饿哦未成年", img_url:""},
        {id:14, title:"图片标题还是非常重要的", zhaiyao:"胜多负少了的开发类似的飞机收到了看见了快速减肥实例的开房记录开始的分解诶哦我诶如饿哦未成年", img_url:""},
        {id:15, title:"图片标题还是非常重要的", zhaiyao:"胜多负少了的开发类似的飞机收到了看见了快速减肥实例的开房记录开始的分解诶哦我诶如饿哦未成年", img_url:""},
      ],

      imgs10: [
        {id:20, title:"现场女查询", zhaiyao:"问我任评委我从是几平方", img_url:""},
        {id:21, title:"现场女查询", zhaiyao:"问我任评委我从是几平方", img_url:""},
        {id:22, title:"现场女查询", zhaiyao:"问我任评委我从是几平方", img_url:""},
        {id:23, title:"现场女查询", zhaiyao:"问我任评委我从是几平方", img_url:""},
        {id:24, title:"现场女查询", zhaiyao:"问我任评委我从是几平方", img_url:""},
        {id:25, title:"现场女查询", zhaiyao:"问我任评委我从是几平方", img_url:""},
      ],

      imgs20: [
        {id:30, title:"诶诶额", zhaiyao:"排位哦客家人平南村", img_url:""},
        {id:31, title:"诶诶额", zhaiyao:"排位哦客家人平南村", img_url:""},
        {id:32, title:"诶诶额", zhaiyao:"排位哦客家人平南村", img_url:""},
        {id:33, title:"诶诶额", zhaiyao:"排位哦客家人平南村", img_url:""},
        {id:34, title:"诶诶额", zhaiyao:"排位哦客家人平南村", img_url:""},
        {id:35, title:"诶诶额", zhaiyao:"排位哦客家人平南村", img_url:""},
      ],
    }
  },

  methods : {
    navigateByCategoryId(id) {
      this.$router.push({
        name: "PhotoList",
        query: {categoryId:id}
      });
    },

    loadImgsByCategoryId(categoryId) {
      console.log(categoryId);

      this.imgs = Math.random() < 0.5 ? this.imgs10 : this.imgs20;

      // // 利用categoryId向后端请求数据
      // let url = `/getimgs/${categoryId}`;
      // this.$axios.get(url).then(res => {
      //   this.imgs = res.data.message;
      // }).catch(res => {
      //   console.log(res);
      // });
    }
  },

  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`

    // console.log(to);
    // console.log(from);

    let { categoryId } = to.query;
    // 利用categoryId向后端请求数据
    this.loadImgsByCategoryId(categoryId);

    next();
  },

  created : function() {
    console.log(this.$route.query.categoryId);  // 输出路由请求参数

    // let { categoryId } = this.$route.query; // 取请求参数，向后端发请求取数据
  }

}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.photo-header li {
  list-style: none;
  display: inline-block;
  margin-left: 10px;
  height: 30px;
}

.photo-header ul {
  /* 强制不换行 */
  white-space: nowrap; 
  overflow-x: auto;
  padding-left: 0;
  margin: 5;
}

.photo-list li {
  list-style: none;
  position: relative;
}

.photo-list li img {
  width: 100%;
  height: 230px;
  vertical-align: top;
}

.photo-list ul {
  padding-left: 0px;
  margin: 0;
}

.photo-list p {
  position: absolute;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
}

.photo-list p span:nth-child(1) {
  font-weight: bold;
  font-size: 16px;
}

image[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}


</style>
