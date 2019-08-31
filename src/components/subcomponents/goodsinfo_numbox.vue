<template>
  <div>
    <div class="mui-numbox" data-numbox-min="1" style="height:25px;">
      <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
      <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numbox"/>
      <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
  </div>
</template>

<script>
// 导入mui
import mui from '../../lib/mui/js/mui.min.js'

export default {
    mounted() {
        mui('.mui-numbox').numbox();
    },
    methods: {
        countChanged(){//向父组件传值
            this.$emit('getcount',parseInt(this.$refs.numbox.value))
        }
    },
    props: ["max"],//父组件传过来的值
    watch: {//属性监视
        max:function(newVal, oldVal){
            // 使用 JS API 设置 numbox 的最大值
            mui('.mui-numbox').numbox().setOption('max',newVal)
        }
    },
   
};
</script>

<style lang="scss" scoped>
</style>