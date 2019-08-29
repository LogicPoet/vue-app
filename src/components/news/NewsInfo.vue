<template>
  <div class="newsinfo-container">
    <h3 class="title">{{newsInfo.title}}</h3>
    <p class="subtitle">
        <span>发布时间：{{newsInfo.add_time|dateFormat}}</span>
        <span>点击：{{newsInfo.click}}次</span>
    </p>

    <hr>

    <div class="content" v-html="newsInfo.content"></div>
  </div>
</template>

<script>
import {Toast} from 'mint-ui'

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