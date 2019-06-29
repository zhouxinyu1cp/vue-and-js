

<template>
  <div>
    
    <div class="photo-bottom">
      <ul>
        <li class="photo-comment">
          <div>
            <span>提交评论</span>
            <span><a @click="goback()">返回</a></span>
          </div>
        </li>

        <li class="txt-comment">
          <textarea style="width:100%" v-model="postContent"></textarea>
        </li>

        <li>
          <mt-button type="primary" size="large" @click="sendMsg()">发表评论</mt-button>
        </li>

        <li class="photo-comment">
          <div>
            <span>评论列表</span>
            <span>10条评论</span>
          </div>
        </li>
      </ul>

      <ul class="comment-list">
        <li v-for="(comment, idx) in comments" :key="idx">
          {{comment.user_name}}: {{comment.content}} &nbsp; &nbsp; {{comment.add_time | convertTime('YYYY-MM-DD')}}
        </li>
      </ul>

      <mt-button type="danger" size="large" plain 
          @click="loadMsgByPage()" :disabled=disabled>加载更多</mt-button>
    </div>

  </div>
</template>


<script>
export default {
  name : "comment",
  
  props : ['cid'], // cid属性在template中可以直接使用，由父组件在使用时传入

  data () {
    return {
      comments : [
        {user_name:'舒老师', add_time:'2015-04-16T03:50:28.000Z', content:'舒老师是大傻叉'},
        {user_name:'舒老师', add_time:'2015-04-16T03:50:28.000Z', content:'舒老师是大傻叉'},
        {user_name:'舒老师', add_time:'2015-04-16T03:50:28.000Z', content:'舒老师是大傻叉'},
        {user_name:'舒老师', add_time:'2015-04-16T03:50:28.000Z', content:'舒老师是大傻叉'},
        {user_name:'舒老师', add_time:'2015-04-16T03:50:28.000Z', content:'舒老师是大傻叉'},
        {user_name:'舒老师', add_time:'2015-04-16T03:50:28.000Z', content:'舒老师是大傻叉'},
        {user_name:'舒老师', add_time:'2015-04-16T03:50:28.000Z', content:'舒老师是大傻叉'},
      ],

      plain : true,

      postContent : "",

      pageId : 1,

      disabled : false
    }
  },

  methods : {
    goback() {
      this.$router.go(-1); // 返回按钮
    },

    sendMsg() {
      // 发表评论，向后端post数据
      this.$axios.post(`/postcomment/${this.cid}`, 
        `content=${this.postContent}`).then(res => {
          this.initPageId();
          this.loadMsgByPage(); // 加载最新的数据
        }).catch(err => {
          console.log(err);
        });
    },

    loadMsgByPage() {
      this.$axios.get(`/getcommonet/${this.cid}/?pageindex=${this.pageId}`).then(res => {
        // 判断返回数据是否不足10条，若不足，则禁止‘加载更多’按钮，并给出提示
        if(res.data.message.length < 10 && this.pageId != 1) {
          // 给出提示
          this.$toast({
            message: '没有数据啦',
            iconClass: 'icon icon-success'
          });
          // 禁用‘加载更多’按钮
          this.disabled = true;
          return ;
        }

        // 页码如果大于1，数据应该做追加
        if(this.pageId === 1) {
          this.comments = res.data.message;
        }
        else {
          this.comments = this.comments.concat(res.data.message);
        }

        this.pageId++; // 页码自增
      }).catch(err => {
        console.log(err);
      });
    },

    initPageId() {
      this.pageId = 1; // 页码归1
    }
  },

  created : function() {
    // 在这里直接使用 this.cid，向后端请求数据

    // this.$axios.get(`/getcommonet/${this.cid}`).then(res => {
    //   this.comments = res.data.message;
    // }).catch(err => {
    //   console.log(err);
    // });

    // this.loadMsgByPage(1); // 加载第一页数据
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.photo-comment > div span:nth-child(1) {
  float: left;
  font-weight: bold;
  margin-left: 5px;
}

.photo-comment > div span:nth-child(2) {
  float: right;
}

.photo-comment {
  height: 30px;
  line-height: 30px;
  margin-bottom: 5px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
}

.txt-comment {
  padding: 5 5;
}

.txt-comment textarea {
  margin-bottom: 5px;
}

.comment-list li {
  margin-bottom: 5px;
  padding-left: 5px;
  padding-bottom: 5px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

li {
  list-style: none;
}

ul {
  margin: 0;
  padding: 0;
}

</style>
