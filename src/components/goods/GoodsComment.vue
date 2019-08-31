<template>
  <div>
    <comment-box :id="$route.params.id"></comment-box>
  </div>
</template>

<script>
import comment from '../subcomponents/comment.vue'

export default{
  components:{//注册组件
    'comment-box':comment
  }
}
</script>

<style lang="scss" scoped>

</style>