

<template>
  <div>
    <nav-bar title="购物车"></nav-bar>

    <div class="pay-detail">
      <ul>
        <li class="p-list" v-for="(goods, idx) in shopcart" :key="idx">
          <mt-switch v-model="goods.isSelect"></mt-switch>

          <img :src="goods.img">

          <div class="pay-calc">
            <p>{{goods.title}}</p>
            <div class="calc">
              <span>${{goods.sell_price}}</span>
              <span @click="sub(goods)">-</span>
              <span>{{goods.buyNum}}</span>
              <span @click="add(goods)">+</span>
              <a href="#" @click="del(goods, idx)">删除</a>
            </div>
          </div>
        </li>
      </ul>  
    </div>

    <div class="show-price">
      <div class="show-1">
        <p>总计(不含运费):</p>
        <span>已经选择商品{{payment.num}}件，总价${{payment.price}}</span>
      </div>

      <div class="show-2">
        <mt-button type="danger" size="large">去结算</mt-button>
      </div>
    </div>

  </div>
</template>


<script>
import Bus from '../../bus.js'

export default {
  name: 'Shopcart',

  data () {
    return {
      shopcart: [],
    }
  },

  methods : {
    sub(goods) {
      goods.buyNum--;
      window.shopcartInfo.goodsList[goods.id]--;
    },

    add(goods) {
      goods.buyNum++;
      window.shopcartInfo.goodsList[goods.id]++;
    },

    del(goods, idx) {
      // 删除数组中对应的元素
      this.shopcart.splice(idx, 1);
      // 删除 window.shopcartInfo.goodsList 中的对应属性
      delete window.shopcartInfo.goodsList[goods.id];
    }
  },

  computed: {
    // 计算商品的总件数、总金额
    payment() {
      let totalNum = 0;
      let totalPrice = 0.0;
      this.shopcart.forEach( item => {
        if(item.isSelect) {
          totalNum += item.buyNum;
          totalPrice += (item.buyNum * item.sell_price);
        }
      });

      return {num: totalNum, price: totalPrice};
    }
  },

  // 导航离开该组件的对应路由时调用
  // 可以访问组件实例 `this`
  beforeRouteLeave (to, from, next) {
    let ret = confirm('确定离开吗?');
    if(ret) {
      // 保存用户已编辑的数据
      // 离开组件前计算商品总数，更新购物车处的商品数量显示
      if(Object.keys(window.shopcartInfo.goodsList).length != 0) {
        let sumNum = Object.values(window.shopcartInfo.goodsList).reduce((acc, cur) => {
          return acc + cur;
        });
        // Bus.$emit('shopcartNum', sumNum);
        this.$store.dispatch('changeNumByAction', sumNum);
      }

      next();
    }
    else {
      next(false); // 取消导航
    }
  },

  async created() {
    // 向后端请求数据
    let goodsList = window.shopcartInfo.goodsList; // 获取保存的用户的购物信息
    console.log(goodsList);

    for(let id in goodsList) {
      let goods = {};
      goods.id = id;
      goods.buyNum = goodsList[id];
      goods.img = "";
      goods.title = "红米note7 pro";
      goods.sell_price = 666;
      goods.isSelect = false;

      this.shopcart.push(goods);
    }

    // let url = '/goods/getshopcartlist/' + Object.keys(goodsList).join(',');
    // // Object.defineProperty(this, 'shopcart', {
    // //   set: function() { // 通知视图要更新
    // //     // 判断shopcart元素是否还有属性，若有，所有属性都要这么做
    // //   }
    // // })
    // // 下面这行代码，会将shopcart中的所有属性进行监视，完成属性的响应式双向绑定（属性改，页面改）
    // this.shopcart = (await this.$axios.get(url)).data.message;
    // let goodsList = window.shopcartInfo.goodsList;
    // // 给数组的元素添加属性（用await的时候，使用ES6中的map/each/find/findIndex等函数是没有效果的）
    // for(let i = 0; i < this.shopcart.length; i++) {
    //   let goods = this.shopcart[i];
    //   let buyNum = goodsList[goods.id];
    //   if(buyNum) {
    //     // 手动完成属性的响应式双向绑定
    //     this.$set(goods, 'buyNum', buyNum);
    //     // goods.buyNum = buyNum;
    //     this.$set(goods, 'isSelect', false);
    //     // goods.isSelect = false;
    //   }
    // }
  }
}
</script>


<style scoped>

.pay-detail ul {
  padding-left: 5px;
  margin-top: 5px;
}

.pay-detail ul li {
  list-style: none;
  margin-bottom: 3px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.pay-detail ul li img {
  width: 80px;
  height: 80px;
  display: inline-block;
  vertical-align: top;
  margin-top: 10px;
}

.pay-detail ul li >:nth-child(1),
.pay-detail ul li >:nth-child(3) {
  display: inline-block;
}

.pay-calc p {
  width: 250px;
  display: inline-block;
  color: blue;
  overflow: hidden;
  font-size: 15px;
  margin-bottom: 10px;
}

.pay-detail ul li >:nth-child(1) {
  line-height: 80px;
}

.calc:nth-child(1) {
  color: red;
  font-size: 20px;
}

.calc span:not(:nth-child(1)) {
  border: 1px solid rgba(0, 0, 0, 0.3);
  display: inline-block;
  width: 20px;
  text-align: center;
}

.calc a {
  margin-left: 20px;
}

.show-1
.show-2 {
  display: inline-block;
  margin-left: 30px;
}

.show-price {
  background-color: rgba(0, 0, 0, 0.2);
}

</style>
