<template>
    <div>
        <div class="goods-list">
            <div class="goods-item">
                <img src="http://demo.dtcms.net/upload/201504/18/thumb_201504181230434303.jpg" alt="">
                <h1 class="title">小米（Mi）小米Note 16G双网通版</h1>
                <div class="info">
                    <p class="price">
                        <span class="now">￥899</span>
                        <span class="old">￥999</span>
                    </p>
                    <p class="sell">
                        <span>热卖中</span>
                        <span>剩60件</span>
                    </p>
                </div>
            </div>

             <div class="goods-item">
                <img src="http://demo.dtcms.net/upload/201504/18/thumb_201504181230434303.jpg" alt="">
                <h1 class="title">小米（Mi）小米Note 16G双网通版</h1>
                <div class="info">
                    <p class="price">
                        <span class="now">￥899</span>
                        <span class="old">￥999</span>
                    </p>
                    <p class="sell">
                        <span>热卖中</span>
                        <span>剩60件</span>
                    </p>
                </div>
            </div>

             <div class="goods-item">
                <img src="http://demo.dtcms.net/upload/201504/18/thumb_201504181230434303.jpg" alt="">
                <h1 class="title">小米（Mi）小米Note 16G双网通版</h1>
                <div class="info">
                    <p class="price">
                        <span class="now">￥899</span>
                        <span class="old">￥999</span>
                    </p>
                    <p class="sell">
                        <span>热卖中</span>
                        <span>剩60件</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
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