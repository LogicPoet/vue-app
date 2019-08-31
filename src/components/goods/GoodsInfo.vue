<template>
  <div>
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
          <p class="sell">
            <span class="market_price">
              市场价：
              <del>￥{{goodsInfo.market_price}}</del>
            </span>
            <span class="sell_price">销售价：￥{{goodsInfo.sell_price}}</span>
          </p>
          <p>购买数量：</p>
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
        <mt-button type="primary">商品详细参数</mt-button>
        <mt-button type="danger">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
// 导入轮播图组件
import swiper from '../subcomponents/swiper.vue'

export default {
    data() {
        return {
            id:this.$route.params.id,
            goodsInfo:{},
            lunbotuList:[],
            isfull:''
        }
    },
    created() {
        this.getGoodsInfo();
        this.getlunbotuList();
    },
    methods: {
        getGoodsInfo(){//获取商品详情
            this.$http.get('api/goods/getinfo/'+this.id).then(result=>{
                if(result.body.status===0){
                    this.goodsInfo=result.body.message[0];
                }
            })
        },
        getlunbotuList(){//获取轮播图
            this.$http.get('api/getthumimages/'+this.id).then(result=>{
                if(result.body.status===0){
                    result.body.message.forEach(item => {
                        item.img=item.src;
                    });
                    this.lunbotuList=result.body.message;
                }
            })
        }
    },
    components:{//注册组件
        swiper
    }
};
</script>

<style lang="scss" scoped>
</style>