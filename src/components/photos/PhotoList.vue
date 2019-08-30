<template>
  <div>
    <!-- 顶部滑动条区域 -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item', items.id==0?'mui-active':'']"
            v-for="items in cates"
            :key="items.id"
          >{{items.title}}</a>
        </div>
      </div>
    </div>

    <!-- 图片列表区域  -->
    <ul class="photo-list">
      <li v-for="item in list" :key="item.id">
        <img v-lazy="item.img_url" />
        <!-- 图片的介绍文字 -->
        <div class="info">
          <h1 class="info-title">{{ item.title }}</h1>
          <div class="info-body">{{ item.zhaiyao }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
// 1. 导入 mui 的js文件
import mui from "../../lib/mui/js/mui.min.js";
// 2.导入弹框组件
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      cates: [], //分类列表
      list: []
    };
  },
  created() {
    this.getAllCategory();
    this.getPhotoListByCateId(0);
  },
  mounted() {
    //初始化滑动组件
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0006 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    getAllCategory() {
      this.$http.get("api/getimgcategory").then(result => {
        if (result.body.status === 0) {
          // 手动拼接出一个最完整的 分类列表
          result.body.message.unshift({ title: "全部", id: 0 });
          this.cates = result.body.message;
        } else {
          Toast("图片类别加载失败！");
        }
      });
    },
    getPhotoListByCateId(cateId) {
      // 根据 分类Id，获取图片列表
      this.$http.get("api/getimages/" + cateId).then(result => {
        if (result.body.status === 0) {
          this.list = result.body.message;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  touch-action: pan-y;
}

.photo-list {
  list-style: none; //消除ui上的点
  // 处理各种边距问题
  margin: 0;
  padding: 10px;
  padding-bottom: 0;

  li {
    background-color: #ccc; //图片背景
    text-align: center; //内容居中
    margin-bottom: 10px; //隔开每个图片
    box-shadow: 0 0 9px #999;
    position: relative;
    img {
      // 图片填满容器
      width: 100%;
      vertical-align: middle;
    }
    // 图片懒加载
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }

    .info {
      color: white; //文字设为白色
      text-align: left; //左对齐
      position: absolute;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.4); //文字背景色
      max-height: 84px; //文字区域最高高度
      //  文字字体大小
      .info-title {
        font-size: 14px;
      }
      .info-body {
        font-size: 13px;
      }
    }
  }
}
</style>