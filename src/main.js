// 这这里导入各种需要使用到的资源依赖

//导入vue包
import Vue from 'vue';
// 导入vue-router包
import VueRouter from 'vue-router'
// 在vue实例中安装路由
Vue.use(VueRouter)
// 导入vue-resources包
import VueResource from 'vue-resource'
// 安装 vue-resource
Vue.use(VueResource)
// 配置默认的请求根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005/';
// 配置全局post发送数据的格式
Vue.http.options.emulateJSON = true;
// 缩略图插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)
// 导入vuex状态管理工具
import Vuex from 'vuex';
Vue.use(Vuex);

// 导入时间格式化插件
import moment from 'moment'
Vue.filter('dateFormat', (dateStr, pattern = 'YYYY-MM-DD HH:mm:ss') => {
    return moment(dateStr).format(pattern);
})

// 导入mui的css样式
import './lib/mui/css/mui.min.css'
// 导入图标依赖的css样式
import './lib/mui/css/icons-extra.css'

// 按需导入 Mint-UI 中的组件   
import {
    Header,
    Swipe,
    SwipeItem,
    Button,
    Lazyload,
    Switch
} from 'mint-ui';
// 包Mint-UI 中的组件 注册到vue实例中
Vue.component(Header.name, Header);
// 轮播组件
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
// 按钮组件
Vue.component(Button.name, Button);
// 懒加载
Vue.use(Lazyload);
// 滑块开关
Vue.component(Switch.name, Switch);


// 导入App.vue组件
import app from './APP.vue'

// 导入router.js路由模块
import router from './router.js'

// 导入Vuex状态管理模块
import store from './store.js'

var vm = new Vue({
    el: '#app',
    // 渲染，将app组件放入到页面中
    render: c => c(app),
    router, // 挂载路由对象到 VM 实例上
    store //注册将vuex实例
})