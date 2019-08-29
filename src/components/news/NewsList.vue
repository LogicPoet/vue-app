<template>
  <div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in NewsList" :key="item.id">
        <a href="javascript:;">
          <img class="mui-media-object mui-pull-left" :src="item.img_url" />
          <div class="mui-media-body">
            <h1>{{item.title}}</h1>
            <p class="mui-ellipsis">
              <span>发表时间：{{item.add_time | dateFormat}}</span>
              <span>点击：{{item.click}}次</span>
            </p>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      NewsList: []
    };
  },
  created() {
    this.getNewsList();
  },
  methods: {
    getNewsList() {
      this.$http.get("api/getnewslist").then(result => {
        if (result.body.status === 0) {
          this.NewsList = result.body.message;
        } else {
          Toast("加载新闻列表失败");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.mui-table-view {
  li {
    h1 {
      font-size: 14px;
    }
    .mui-ellipsis {
      font-size: 12px;
      color: #22a0ff;
      // 下面两行设置是左右对齐布局
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>