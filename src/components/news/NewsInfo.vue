<template>
  <div class="newsinfo-container">
    <!-- 大标题 -->
    <h3 class="title">{{newsInfo.title}}</h3>
    <!-- 子标题 -->
    <p class="subtitle">
        <span>发布时间：{{newsInfo.add_time|dateFormat}}</span>
        <span>点击：{{newsInfo.click}}次</span>
    </p>

    <hr>
    <!-- 内容区域 -->
    <div class="content" v-html="newsInfo.content"></div>

    <!-- 评论子组件区域 -->
    <comment-box :id="id"></comment-box>
  </div>
</template>

<script>
import {Toast} from 'mint-ui';
// 1. 导入 评论子组件
import comment from "../subcomponents/comment.vue";

export default {
  data() {
    return {
      id: this.$route.params.id,
      newsInfo:{}
    };
  },
  created() {
      this.getNewsInfo()
  },
  methods: {
      getNewsInfo(){
          this.$http.get('api/getnew/'+this.id).then(result=>{
              if(result.body.status===0){
                  this.newsInfo=result.body.message[0]
              }else{
                  Toast("加载新闻详情失败")
              }
          })
      }
  },
  components:{
    // 用来注册子组件的节点
    "comment-box": comment
  }
};
</script>

<style lang="scss" scoped>
.newsinfo-container{
    margin: 0 4px;
    .title{
        font-size: 16px;
        color: red;
        margin: 15px 0;
        text-align: center;
    }
    .subtitle{
        font-size: 12px;
        color: #226aff;
        display: flex;
        justify-content: space-between;
    }
    .content{
        img{
            width: 100%;
        }
    }
}
</style>