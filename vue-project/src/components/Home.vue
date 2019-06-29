

<template>
  <div>
      <!-- v-for在组件里使用时，需要给key，避免vue计算key，提升性能，key就是位置的标识 -->
      <!--
      <div>
        <my-swipe url="/getlunbo">
      </div>
      -->
      
    
    <div class="grid">
      <ul>
        <li v-for="(item, index) in models" 
            :key="index" 
            :class="{choosen : index == liCurrentIndex}" 
            @click="liOnClick(index)">
          <div>{{item.date}}</div>
          <div :class = "item.className">{{item.state}}</div>
        </li>
      </ul>
    </div>

  </div>
</template>


<script>
export default {
  name: 'Home',

  data () {
    return {
      imgs : [
        require("../assets/1.jpg"),
        require("../assets/2.jpg")
      ],

      models : [
        {date:"第一天", state:"已过期", className:"sp1", enableChoose:true},
        {date:"第二天", state:"可预约", className:"sp2", enableChoose:false},
        {date:"第三天", state:"可取消", className:"sp3", enableChoose:true},
        {date:"第四天", state:"已过期", className:"sp1", enableChoose:false},
        {date:"第五天", state:"可预约", className:"sp2", enableChoose:true},
        {date:"第六天", state:"可取消", className:"sp3", enableChoose:false},
        {date:"第七天", state:"已过期", className:"sp1", enableChoose:true},
        {date:"第八天", state:"可预约", className:"sp2", enableChoose:false},
        {date:"第九天", state:"可取消", className:"sp3", enableChoose:true},
      ],

      liCurrentIndex : 0,
    }
  },

  methods : {

    liOnClick(index) {
      this.liCurrentIndex = index;

      let obj = this.models[this.liCurrentIndex]
      for(let key in obj) {
        console.log(obj[key]);
      }
    }

    
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.mint-swipe {
  width: 100%;
  text-align: center;
}

.grid span {
  display: inline-block;
  margin: 10px 0;
  width: 50px;
  height: 50px;
  background-repeat: round;
}

.choosen {
  background-color: chartreuse;
}

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

li .sp1 {
  color: red;

}

li .sp2 {
  color: aqua;

}

li .sp3 {
  color: blueviolet;

}


</style>
