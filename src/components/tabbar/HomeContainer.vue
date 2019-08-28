<template>
  <div>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item, index) in lunbotuList" :key="index">
        <img :src="item.img" alt="">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
// 导入弹窗组件
import { Toast } from "mint-ui";

export default{
  data() {
    return {
      lunbotuList: [] // 保存轮播图的数组
    }
  },
  created() {
    this.getLunBoTu()
  },
  methods: {
    getLunBoTu(){
      this.$http.get('http://www.liulongbin.top:3005/api/getlunbo').then(result=>{
        if(result.body.status===0){
          // 获取成功
          this.lunbotuList=result.body.message
        }else{
          // 获取失败
          Toast("加载轮播图失败。。。")
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
// 轮播样式
.mint-swipe{
  height: 200px;
  img{
    width: 100%;
    height:100%;
  }
}
</style>