<template>
  <div class="goodsdesc-container">
    <!-- 标题 -->
    <h3>{{ info.title }}</h3>

    <hr>
    <!-- 正文内容 -->
    <div class="content" v-html="info.content"></div>
  </div>
</template>

<script>
export default{
   data() {
    return {
      info: {} // 图文数据
    };
  },
  created() {
    this.getGoodsDesc();
  },
  methods: {
    getGoodsDesc() {
      this.$http
        .get("api/goods/getdesc/" + this.$route.params.id)
        .then(result => {
          if (result.body.status === 0) {
            this.info = result.body.message[0];
          }
        });
    }
  }
}
</script>

<style lang="scss">
.goodsdesc-container {//使用比较特殊的类，防止样式污染
  padding: 4px;
  h3 {
    font-size: 16px;
    color: #226aff;
    text-align: center;
    margin: 15px 0;
  }
  .content{
    img{
      width: 100%;
    }
  }
}
</style>