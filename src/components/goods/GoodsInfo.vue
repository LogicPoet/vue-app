<template>
  <div class="goodsinfo-container">
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
            <mt-button type="danger" size="small">加入购物车</mt-button>
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
      id: this.$route.params.id,
      goodsInfo: {},
      lunbotuList: [],
      isfull: "",
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
    goDesc(id){
        this.$router.push({ name: "goodsDesc", params: { id } });
    },
    goComment(id){
        this.$router.push({ name: "goodsComment", params: { id } });
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
}
</style>