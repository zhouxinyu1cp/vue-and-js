

<template>
  <div>
  
    <nav-bar title="商品详情"></nav-bar>

    <div class="outer-swiper">
      <div class="swiper">
        <my-swipe :imgsInfo="goodsImgs"></my-swipe>
      </div>
    </div>

    <div class="product-desc">
      <ul>
        <li>
          <span class="product-desc-span">{{goodsInfo.title}}</span>
        </li>
        <li class="price-li">
          市场价：<s>{{goodsInfo.market_price}}</s> 销售价：<span>{{goodsInfo.sell_price}}</span>
        </li>
        <li class="number-li">
          购买数量：<span @click="substract()">-</span><span>{{buyNum}}</span><span @click="add()">+</span>
        </li>
        <li>
          <mt-button type="primary">立即购买</mt-button>
          <mt-button type="danger" @click="addShopcart()">加入购物车</mt-button>
        </li>
      </ul>
    </div>    

    <!-- Vue内置组件transition，定义过渡的动画效果，绑定after-enter事件 -->
    <transition name="ball" @after-enter="afterEnter()"> 
      <div class="ball" v-if="isShow"></div>
    </transition>
    

    <div class="product-props">
      <ul>
        <li>商品参数</li>
        <li>商品货号：{{goodsInfo.goods_no}}</li>
        <li>库存情况：{{goodsInfo.stock_quantity}}件</li>
        <li>上架时间：{{goodsInfo.add_time | convertTime('YYYY-MM-DD')}}</li>
      </ul>
    </div>

    <div class="product-info">
      <ul>
        <li>
          <mt-button type="primary" size="large" plain @click="goGoodsInfo()">图文介绍</mt-button>
        </li>
        <li>
          <mt-button type="danger" size="large" plain @click="goGoodsComment()">商品评论</mt-button>
        </li>
      </ul>
    </div>

  </div>
</template>


<script>
// import Bus from '../../bus.js'
import GoodsTool from '../../goodstool.js'

export default {
  name: 'GoodsDetail',

  data () {
    return {
      goodsId : this.$route.query.id,

      goodsImgs : [ // 轮播图
        {src:''},
        {src:''},
        {img:''},
        {img:''},
        {img:''},
      ], 

      goodsInfo : {   // 商品信息
        id: 100,
        title: '红米note7 pro，千元机里的性价比之王',
        add_time: '2015-04-16T03:50:28.000Z',
        goods_no: 'SD3973042344',
        stock_quantity: 20,
        market_price: 399,
        sell_price: 169,
      },

      isShow: false,

      buyNum: 1, // 购买数量
    }
  },

  methods : {
    goGoodsInfo() {
      // 直接进入到新闻详情页
      this.$router.push({
        name: 'NewsDetail',
        params: {id: this.$route.query.id},
      });
    },

    goGoodsComment() {
      this.$router.push({
        name: 'GoodsComment',
        query: {
          id: this.$route.query.id,
        },
      });
    }, 

    substract() {
      if(this.buyNum === 1) return;
      this.buyNum--;
    },

    add() {
      if(this.buyNum === this.goodsInfo.stock_quantity) return;
      this.buyNum++;
    }, 

    addShopcart() {
      this.isShow = true;
    }, 

    afterEnter() {
      this.isShow = false;

      // // 调用addShopcartNum()，将当前购买数量更新到totalNum中
      // Bus.$emit('addShopcartNum', this.buyNum);

      this.$store.dispatch('addNumByAction', this.buyNum);

      // 保存用户的购物车商品信息
      GoodsTool.addShopcart({
        id: this.goodsId,
        num: this.buyNum
      });
    }
  },

  created : function() {
    // 向后端请求商品的详情信息，2个请求
    //    /getthumimages/${id}  --  获取轮播图
    //    /goods/getinfo/${id}  --  获取商品信息
    //    若请求一个失败，则都失败：
    //       $axios.all([promise1, promise2]).then().catch()

    // let imgReq = this.$axios.get(`/getthumimages/${this.goodsId}`);
    // let infoReq = this.$axios.get(`/goods/getinfo/${this.goodsId}`);
    // // 并发请求
    // this.$axios.all([imgReq, infoReq]).then(this.$axios.spread(
    //   (imgRes, infoRes) => {
    //     this.goodsImgs = imgRes.data.message;
    //     this.goodsInfo = infoRes.data.message;
    //   }
    // )).catch(err => {
    //   console.log(err);
    // });
  },

  
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.ball-enter-active {
  animation: bounce-in .5s;
}

.ball-leave {
  opacity: 0;
}

@keyframes bounce-in {
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(140px, -50px, 0);
  }
  75% {
    transform: translate3d(160px, 0px, 0);
  }
  100% {
    transform: translate3d(140px, 300px, 0);
  }
}


.swiper {
  border: 1px solid rgba(0, 0, 0, 0.2);
  margin: 8px;
  width: 95%;
  border-radius: 15px;
  overflow: hidden;
}


.outer-swiper ul,
.product-desc ul,
.product-props ul,
.product-info ul {
  padding: 0;
}


.product-desc ul li,
.product-props ul li,
.product-info ul li {
  list-style: none;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.5);
  margin-top: 8px;
}

.product-desc ul >:nth-child(1) span {
  color: blue;
  font-size: 22px;
  font-weight:bold;
}

.product-desc ul >:nth-child(1) {
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
}

.product-desc ul,
.product-info ul,
.product-props ul {
  padding-left: 10px;
}

.price-li span {
  color: red;
  font-size: 25px;
}

.price-li s {
  margin-right: 16px;
}

.product-props ul >:nth-child(1) {
  text-align: left;
}

.product-props ul:not(:nth-child(1)) {
  margin-left: 40px;
}

.number-li span {
  text-align: center;
  display: inline-block;
  border: 2px solid rgba(0, 0, 0, 0.1);
  width: 25px;
}

.number-li >:nth-child(2) {
  width: 40px;
}

.ball {
  border-radius: 50%;
  background-color: red;
  width: 24px;
  height: 24px;
  position: absolute;
  top: 440px;
  left: 120px;
  display: inline-block;
  z-index: 9999;
}

</style>
