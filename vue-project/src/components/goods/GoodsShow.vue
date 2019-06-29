

<template>
  <div :style="{height: wrapperHeight + 'px'}" ref="wrapper">
    
    <nav-bar title="商品列表"></nav-bar>

    <mt-loadmore :bottom-method="loadBottom" 
      @bottom-status-change="handleBottomChange" 
      :bottom-all-loaded="allLoaded"
      :auto-fill="autoFill"
      ref="loadmore" 
      style="margin-bottom:55px">
      <ul>
        <li v-for="(good, idx) in goodsList" :key="idx">
          <router-link :to="{name:'GoodsDetail', query:{id:good.id}}">
            <img :src="good.img_url">
            <div class="title">{{good.title | controllShow(20)}}</div>
            <div class="desc">
              <div class="sell">
                <span>{{good.sell_price}}</span>
                <s>{{good.market_price}}</s>
              </div>
              <div class="detail">
                <div class="hot">热卖中</div>
                <div class="count">剩余{{good.stock_quantity}}</div>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </mt-loadmore>

  </div>
</template>


<script>
/*
  mint-ui的Loadmore组件总结：
    1、 :bottom-method属性绑定函数loadBottom() -- 往上拉调用
    2、 禁止loadBottom()调用，:bottom-all-loaded属性默认为false，为true则禁止调用loadBottom()
    3、 :auto-fill属性默认为true，表示自动检测父容器并调用loadBottom()直到撑满父容器，应该设为false
    4、 pull--拉动未满足70px，drop--达到70px，loading--加载中
    5、 Loadmore组件的 onBottomLoaded()函数，通知结束loading，进入pull状态
    6、 组件中的ref="xxx"属性，js中通过this.$refs.xxx获取组件对象
        DOM元素中的ref="xxx"属性，js中通过this.$refs.xxx获取DOM对象
*/
export default {
  name: 'GoodsShow',

  data () {
    return {
      goodsList : [
        {
          id:1,
          title:'红米note7 pro',
          add_time:'2015-04-16T03:50:28.000Z',
          zhaiyao:'红米高端机型',
          click:100,
          img_url:'',
          sell_price:1600,
          market_price:2000,
          stock_quantity:60
        },
        {
          id:2,
          title:'红米note7 pro',
          add_time:'2015-04-16T03:50:28.000Z',
          zhaiyao:'红米高端机型',
          click:100,
          img_url:'',
          sell_price:1600,
          market_price:2000,
          stock_quantity:60
        },
        {
          id:3,
          title:'红米note7 pro',
          add_time:'2015-04-16T03:50:28.000Z',
          zhaiyao:'红米高端机型',
          click:100,
          img_url:'',
          sell_price:1600,
          market_price:2000,
          stock_quantity:60
        },
        {
          id:4,
          title:'红米note7 pro',
          add_time:'2015-04-16T03:50:28.000Z',
          zhaiyao:'红米高端机型',
          click:100,
          img_url:'',
          sell_price:1600,
          market_price:2000,
          stock_quantity:60
        },
        {
          id:5,
          title:'红米note7 pro',
          add_time:'2015-04-16T03:50:28.000Z',
          zhaiyao:'红米高端机型',
          click:100,
          img_url:'',
          sell_price:1600,
          market_price:2000,
          stock_quantity:60
        },
        {
          id:6,
          title:'红米note7 pro',
          add_time:'2015-04-16T03:50:28.000Z',
          zhaiyao:'红米高端机型',
          click:100,
          img_url:'',
          sell_price:1600,
          market_price:2000,
          stock_quantity:60
        },
        {
          id:7,
          title:'红米note7 pro',
          add_time:'2015-04-16T03:50:28.000Z',
          zhaiyao:'红米高端机型',
          click:100,
          img_url:'',
          sell_price:1600,
          market_price:2000,
          stock_quantity:60
        },
        {
          id:8,
          title:'红米note7 pro',
          add_time:'2015-04-16T03:50:28.000Z',
          zhaiyao:'红米高端机型',
          click:100,
          img_url:'',
          sell_price:1600,
          market_price:2000,
          stock_quantity:60
        },
        {
          id:9,
          title:'红米note7 pro',
          add_time:'2015-04-16T03:50:28.000Z',
          zhaiyao:'红米高端机型',
          click:100,
          img_url:'',
          sell_price:1600,
          market_price:2000,
          stock_quantity:60
        },
        {
          id:10,
          title:'红米note7 pro',
          add_time:'2015-04-16T03:50:28.000Z',
          zhaiyao:'红米高端机型',
          click:100,
          img_url:'',
          sell_price:1600,
          market_price:2000,
          stock_quantity:60
        },
      ],

      allLoaded : false, // 为true禁止拉动

      autoFill : false, // 若为true，则自动调用loadBottom()直到填满父容器

      pageId : this.$route.params.page, // 当前路由参数中的pageId

      wrapperHeight : 0, // 父容器的可视高度
    }
  },

  methods : {
    loadBottom() {
      // console.log('上啦调用啦');
      this.loadGoodsByPageId();

      // 加载后，需要通知状态改变
      this.$refs.loadmore.onBottomLoaded();
    },

    handleBottomChange(status) {
      console.log(status);
    },

    loadGoodsByPageId() {
      this.$axios.get(`/getgoods?pageindex=${this.pageId}`).then(res => {
        // 没有更多数据，禁用下拉加载数据
        if(res.data.message.length < 10) {
          this.$toast({
            message: '没有更多数据啦',
            iconClass: 'icon icon-success'
          });

          this.allLoaded = true; // 数据全部获取完毕，下拉加载数据失效
          return ;
        }

        if(this.pageId === 1) {
          this.goodsList = res.data.message;
        }
        else {
          this.goodsList = this.goodsList.concat(res.data.message);
        }
        
        this.pageId++;
      }).catch(err => {
        console.log(err);
      });
    }
  },

  created : function() {
    // 向后端请求商品信息

    // let { page } = this.$route.params;
    // this.$axios.get(`/getgoods?pageindex=${page}`).then(res => {
    //   this.goodsList = res.data.message;
    // }).catch(err => {
    //   console.log(err);
    // });

    // this.loadGoodsByPageId(); // 加载商品信息
  },

  // DOM更新时，控制下拉动作加载数据的高度，防止误加载
  mounted : function() {
    // 父容器高度（可视） = 设备高度 - 父容器的top
    this.wrapperHeight = document.documentElement.clientHeight - 
                          this.$refs.wrapper.getBoundingClientRect().top;
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

ul {
  padding: 0;
  overflow: hidden;
}

li {
  width: 50%;
  float: left;
  padding: 6px;
  box-sizing: border-box;
}

li > a:not(.mul-btn) {
  margin: 0;
  padding: 0;
  border: 1px solid #5c5c5c;
  box-shadow: 0 0 4px #666;
  width: 100%;
  display: block;
}

li > a:not(.mul-btn) img {
  width: 100%;
}


.sell > span {
  float: left;
  color: red;
  text-align: left;
}

.detail > .hot {
  float: left;
  font-size: 15px;
  text-align: left;
}

.detail > .count {
  float: right;
  text-align: right;
  font-size: 15px;
}

.detail {
  overflow: hidden;
}

.desc {
  background-color: rgba(0, 0, 0, 0.2);
  color: rgba(92, 92, 92, 0.8);
}

img {
  height: 200px;
}

</style>
