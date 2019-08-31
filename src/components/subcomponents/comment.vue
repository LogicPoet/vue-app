<template>
  <div class="ctm-container">
    <h3>发表评论</h3>

    <!-- 评论区域 -->
    <textarea placeholder="请输入要BB的内容（做多吐槽120字）" v-model="content" maxlength="120"></textarea>

    <!-- 发表评论按钮 -->
    <mt-button type="primary" size="large"  @click="postComment">发表评论</mt-button>

    <!-- 评论列表 -->
    <div class="ctm-list">
      <div class="ctm-item" v-for="(item, i) in commentList" :key="i">
        <div class="ctm-title">
            第{{i+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time|dateFormat}}
        </div>
        <div class="cmt-body">{{item.content}}</div>
      </div>
    </div>

    <!-- 加载更多按钮 -->
    <mt-button type="danger" size="large" plain @click="getMore">加载更多评论</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      pageIndex: 1,
      commentList: [],
      content:""
    };
  },
  created() {
    this.getCommentList();
  },
  methods: {
    getCommentList() {//获取评论列表
      this.$http
        .get("api/getcomments/" + this.id + "?pageindex=" + this.pageIndex)
        .then(result => {
          if (result.body.status === 0) {
            //   添加默认评论内容
              var list=result.body.message;
              list.filter(item=>{
                  if(item.content==='undefined'||item.content.trim().length===0){
                      item.content='此人很懒，没有留下任何评论'
                  }
              })

            this.commentList=this.commentList.concat(list);
          } else {
            console.log(result.body);
            Toast("加载评论失败");
          }
        });
    },
    getMore(){//获取更多的评论
        this.pageIndex++;
        this.getCommentList();
    },
    postComment(){//发表评论
        // 校验是否为空内容
        if(this.content.trim().length===0){
            return Toast("评论内容不能为空！");
        }
        this.$http.post('api/postcomment/'+this.$route.params.id,{content:this.content}).then(result=>{
            if(result.body.status===0){
                // 1. 拼接出一个评论对象
                var ctm={
                    user_name:'匿名用户',
                    add_time:new Date(),
                    content:this.content
                }
                // 要插入到数组开头的元素。
                this.commentList.unshift(ctm);
                this.content='';
            }else{
                Toast("评论发表失败！")
            }
        })
    }
  },
  props: ["id"]//需要父组件传过来的数据
};
</script>

<style lang="scss" scoped>
.ctm-container {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }

  .ctm-list {
    margin: 5px 0;
    .ctm-item {
      font-size: 13px;
      .ctm-title {
        line-height: 30px;
        background-color: #ccc;
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 2em; //缩进
      }
    }
  }
}
</style>