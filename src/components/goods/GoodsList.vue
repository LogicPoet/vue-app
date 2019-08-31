<template>
    <div>
        <div class="goods-list">
            <!-- 商品列表区域 -->
            <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="goodsInfo(item.id)">
                <img :src="item.img_url" alt="">
                <h1 class="title">{{item.title}}</h1>
                <div class="info">
                    <p class="price">
                        <span class="now">￥{{item.sell_price}}</span>
                        <span class="old">￥{{item.market_price}}</span>
                    </p>
                    <p class="sell">
                        <span>热卖中</span>
                        <span>剩{{item.stock_quantity}}件</span>
                    </p>
                </div>
            </div>

            <!-- 加载更多按钮 -->  
            <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>       
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            pageindex:1,
            goodslist:[]
        }
    },
    created() {
        this.getGoodsList();
    },
    methods: {
        getGoodsList(){//获取商品列表
            this.$http.get('api/getgoods?pageindex='+this.pageindex).then(result=>{
                if(result.body.status===0){
                    this.goodslist=this.goodslist.concat(result.body.message);
                }
            })
        },
        getMore(){//获取更多商品列表
            this.pageindex++;
            this.getGoodsList();
        },
        goodsInfo(id){//编程式路由跳转
            this.$router.push({ name: 'goodsInfo', params: { id }})
        }
    },
}
</script>

<style lang="scss" scoped>
.goods-list{
    display: flex;// 让其横向排列
    flex-wrap: wrap;
    margin: 7px;// 外边距
    justify-content: space-between;//左右对齐，空出中间间隙
     
    .goods-item{
        width: 49%;// 让一行放两个
        border: 1px solid #ccc;
        box-shadow: 0 0 8px #ccc;//阴影
        margin: 4px 0;
        padding: 2px;
        //解决商品高度不一，导致的排版问题
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        // 默认高度，防止图片加载慢的时的问题
        min-height: 293px;
        img{
            width: 100%;// 图片放满父组件
        }
        .title{
            font-size: 14px;
        }
        .info{
            background-color: #eee; 
            p{
                margin: 0;
                padding: 4px
            }
            .price{
                .now{
                    color: red;
                    font-weight: bold;
                    font-size: 16px;
                }
                .old{
                    text-decoration: line-through;//贯穿线
                    font-size: 12px;
                    margin-left: 10px;
                }
            }    
            .sell{
                display: flex;
                justify-content: space-between;
                font-size: 13px;
            }   
        }
    }

}
</style>