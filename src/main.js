// 这这里导入各种需要使用到的资源依赖

//导入vue包
import Vue from 'vue';

// 导入mui的css样式
import './lib/mui/css/mui.min.css'

// 按需导入 Mint-UI 中的组件   
import { Header } from 'mint-ui';
// 包Mint-UI 中的组件 注册到vue实例中
Vue.component(Header.name, Header);


// 导入App.vue组件
import app from './APP.vue'

var vm=new Vue({
    el:'#app',
    // 渲染，将app组件放入到页面中
    render:c=>c(app)
})