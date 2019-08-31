<template>
  <div class="app-container">
    <!-- 顶部 Header 区域 -->
    <mt-header fixed title="练习·Vue项目"></mt-header>

    <!-- 中间的 路由 router-view 区域 -->
    <transition mode="out-in">
     <router-view></router-view>
    </transition>
   
    <!-- 底部 Tabbar 区域 -->
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item-lz" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>

      <router-link class="mui-tab-item-lz" to="/member">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>

      <router-link class="mui-tab-item-lz" to="/shopcar">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge" id="badge">{{$store.getters.getAllCount}}</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>

      <router-link class="mui-tab-item-lz" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
</script>


<style lang="scss" scoped>
// 防止顶端固定标题挡住中间的区域
.app-container {
  //放置上下遮挡
  padding-top: 40px;
  padding-bottom: 50px;
  overflow-x: hidden;//隐藏组件切换时出现的横向滚动条
}

// 组件滑动样式
.v-enter{//从右边进入
  opacity: 0;
  transform: translateX(100%);
}
.v-leave-to{//从左边离开
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;//绝对布局
}

.v-enter-active,
.v-leave-active{
  transition: all 0.5s ease;
}

// 解决tabber与图片导航滚动条类名冲突问题
.mui-bar-tab .mui-tab-item-lz.mui-active {
    color: #007aff;
}

.mui-bar-tab .mui-tab-item-lz {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}

.mui-bar-tab .mui-tab-item-lz .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item-lz .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
