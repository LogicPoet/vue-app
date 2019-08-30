// 导入路由依赖
import VueRouter from 'vue-router'

// 导入路由对应组件
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import PhotoList from './components/photos/photoList.vue'
import PhotoInfo from './components/photos/PhotoInfo.vue'

// 3. 创建路由对象
var router = new VueRouter({
  routes: [ // 配置路由规则
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: HomeContainer
    },
    {
      path: '/member',
      component: MemberContainer
    },
    {
      path: '/search',
      component: SearchContainer
    },
    {
      path: '/shopcar',
      component: ShopcarContainer
    },
    // 新闻列表
    {
      path: '/news/newsList',
      component: NewsList
    },
    // 新闻详情
    {
      path: '/news/newsInfo/:id',
      component: NewsInfo
    },
    // 图片列表
    {
      path: '/photos/photoList',
      component: PhotoList
    },
    // 图片详情
    {
      path: '/home/photoInfo/:id',
      component: PhotoInfo
    },
  ],
  linkActiveClass: 'mui-active' // 覆盖默认的路由高亮的类，默认的类叫做 router-link-active
})

// 把路由对象暴露出去
export default router