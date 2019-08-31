<template>
  <div>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item, index) in lunbotuList" :key="index">
        <img :src="item.img"  alt="" :class="{'fullw': isfull}" />
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
    props:['lunbotuList','isfull']
};
</script>

<style lang="scss" scoped>
// 轮播样式
.mint-swipe {
  height: 200px;
  text-align: center;
  img {
    // width: 100%;  
    height: 100%;
  }
}

// 选择横向图片是否要填满
.fullw {
  width: 100%;
}
</style>