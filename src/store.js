// 导入vuex状态管理工具
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);


// 每次刚进入 网站，肯定会 调用 main.js 在刚调用的时候，先从本地存储中，把 购物车的数据读出来，放到 store 中
var car = JSON.parse(localStorage.getItem('car') || '[]')

// 创建数据仓库
const store = new Vuex.Store({
    state: {
        car: car //将 购物车中的商品的数据，用一个数组存储起来
        // { id:商品的id, count: 要购买的数量, price: 商品的单价，selected: false  }
    },
    mutations: {
        addToCar(state, goodsInfo) { //添加购物车
            var flag = false;
            // 1.购物车存在该商品，只更新数量
            // 2.购物车不存在该商品，添加一个新的对象到数组中
            state.car.some(element => {
                if (element.id === goodsInfo.id) {
                    element.count += parseInt(goodsInfo.count);
                    flag = true;
                    return true;
                }
            });
            if (!flag) {
                state.car.push(goodsInfo);
            }

            // 当 更新 car 之后，把 car 数组，存储到 本地的 localStorage 中
            localStorage.setItem('car', JSON.stringify(state.car));
        },
        removeFormCar(state, id) {
            // 根据Id，从store 中的购物车中删除对应的那条商品数据
            state.car.some((item, i) => {
                if (item.id == id) {
                    state.car.splice(i, 1)
                    return true;
                }
            })
            // 将删除完毕后的，最新的购物车数据，同步到 本地存储中
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updateGoodsInfo(state, goodsinfo) {
            // 修改购物车中商品的数量值
            // 分析： 
            state.car.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count = parseInt(goodsinfo.count)
                    return true
                }
            })
            // 当修改完商品的数量，把最新的购物车数据，保存到 本地存储中
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updateGoodsSelected(state, info) { //更新滑块开关状态
            state.car.some(item => {
                if (item.id == info.id) {
                    item.selected = info.selected
                }
            })
            // 把最新的 所有购物车商品的状态保存到 store 中去
            localStorage.setItem('car', JSON.stringify(state.car))
        }
    },
    getters: {
        getAllCount(state) { //获取购买的商品总数
            var count = 0;
            state.car.forEach(element => {
                count += element.count;
            });
            return count;
        },
        getGoodsCount(state) { //获取商品id和购买数量的关系
            var o = {}
            state.car.forEach(item => {
                o[item.id] = item.count
            })
            return o
        },
        getGoodsSelected(state) { //获取滑块开关状态
            // 创建一个新对象{id:selected},{37:true}
            var o = {}
            state.car.forEach(item => {
                o[item.id] = item.selected
            })
            return o
        },
        getGoodsCountAndAmount(state) { //计算总价
            var o = {
                count: 0, // 勾选的数量
                amount: 0 // 勾选的总价
            }
            state.car.forEach(item => {
                if (item.selected) {
                    o.count += item.count
                    o.amount += item.price * item.count
                }
            })
            return o
        }
    }
})

export default store;