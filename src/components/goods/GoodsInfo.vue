<template>
  <div class="goodsinfo-container">
    <!-- 添加购物车的动画小球 -->
    <!-- 添加动画，由于3只有半场动画，所以需要使用钩子函数 -->
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
    >
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>
    

    <!-- 商品轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :lunbotuList="lunbotuList" :isfull="false"></swiper>
        </div>
      </div>
    </div>

    <!-- 商品选购区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{goodsInfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            <span class="market_price">
              市场价：
              <del>￥{{goodsInfo.market_price}}</del>&nbsp;&nbsp;
            </span>
            <span class="sell_price">销售价：￥{{goodsInfo.sell_price}}</span>
          </p>
          <p class="numbox">
            购买数量：
            <numbox :max="goodsInfo.stock_quantity" @getcount="getSelectedCount"></numbox>
          </p>

          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>

    <!-- 商品详情页面 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{goodsInfo.goods_no}}</p>
          <p>库存情况：{{goodsInfo.stock_quantity}}件</p>
          <p>上架时间：{{goodsInfo.add_time|dateFormat}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
// 导入轮播图组件
import swiper from "../subcomponents/swiper.vue";
// 导入数据选择组件
import numbox from "../subcomponents/goodsinfo_numbox.vue";

export default {
  data() {
    return {
      id: this.$route.params.id,// 将路由参数对象中的 id 挂载到 data , 方便后期调用
      goodsInfo: {},// 获取到的商品的信息
      lunbotuList: [],// 轮播图的数据
      ballFlag: false,// 控制小球的隐藏和显示的标识符
      selectedCount: 1 // 保存用户选中的商品数量， 默认，认为用户买1个
    };
  },
  created() {
    this.getGoodsInfo();
    this.getlunbotuList();
  },
  methods: {
    getGoodsInfo() {
      //获取商品详情
      this.$http.get("api/goods/getinfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.goodsInfo = result.body.message[0];
        }
      });
    },
    getlunbotuList() {
      //获取轮播图
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          result.body.message.forEach(item => {
            item.img = item.src;
          });
          this.lunbotuList = result.body.message;
        }
      });
    },
    getSelectedCount(count) {
      //回调函数
      // 当子组件把 选中的数量传递给父组件的时候，把选中的值保存到 data 上
      this.selectedCount = count;
    },
    goDesc(id){//编程式路由
        this.$router.push({ name: "goodsDesc", params: { id } });
    },
    goComment(id){//编程式路由
        this.$router.push({ name: "goodsComment", params: { id } });
    },
    addToShopCar(id) {// 添加到购物车
      this.ballFlag = !this.ballFlag;
      // 1.获取子组件传过来的购买数量
      // 2.将要购买的的属性拼成一个对象
      // 3.id、count、price、selected四个属性
      var goodsInfo={
        id:this.id,
        count:this.selectedCount,
        price:this.goodsInfo.sell_price,
        selected:true
      };
      this.$store.commit('addToCar',goodsInfo);
    },
    // 小球动画
    beforeEnter(el){//开始之前
      el.style.transform = "translate(0, 0)";//小球开始的位置
    },
    enter(el, done){//开始之时
      el.offsetWidth;
      // 小球动画优化思路：
      // 1. 先分析导致 动画 不准确的 本质原因： 我们把 小球 最终 位移到的 位置，已经局限在了某一分辨率下的 滚动条未滚动的情况下；
      // 2. 只要分辨率和 测试的时候不一样，或者 滚动条有一定的滚动距离之后， 问题就出现了；
      // 3. 因此，我们经过分析，得到结论： 不能把 位置的 横纵坐标 直接写死了，而是应该 根据不同情况，动态计算这个坐标值；
      // 4. 经过分析，得出解题思路： 先得到 徽标的 横纵 坐标，再得到 小球的 横纵坐标，然后 让 y 值 求差， x 值也求 差，得到 的结果，就是横纵坐标要位移的距离
      // 5. 如何 获取 徽标和小球的 位置？？？   domObject.getBoundingClientRect()

      // 获取小球的 在页面中的位置
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      // 获取 徽标 在页面中的位置
      const badgePosition = document
        .getElementById("badge")
        .getBoundingClientRect();

      // 计算小球移动的终点位置
      const xDist = badgePosition.left - ballPosition.left;
      const yDist = badgePosition.top - ballPosition.top;

      // 小球移动的终点位置
      el.style.transform = `translate(${xDist}px, ${yDist}px)`;
      // 额外的动画特效
      el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";

      done();
    },
    afterEnter(el){//开始之后
      this.ballFlag = !this.ballFlag;//立即隐藏小球
    }
  },
  components: {
    //注册组件
    swiper,
    numbox
  }
};
</script>

<style lang="scss" scoped>
.goodsinfo-container {
  background-color: #eee; //背景色
  overflow: hidden; //消除上方留白

  .sell_price {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }

  .mui-card {
    .mui-card-content-inner {
      .numbox {
        display: flex;
      }
    }
  }

  .mui-card-footer {
    display: block;
    button {
      margin: 15px 0;
    }
  }

  // 动画小球相关样式
  .ball{
    width: 15px;
    height: 15px;
    border-radius: 50%;//边角弧度
    background-color: red;//小球颜色
    z-index: 99;//显示优先度
    // 定位小球
    position: absolute;
    top: 390px;
    left: 146px;
  }
}
</style>