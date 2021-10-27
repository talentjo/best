<template lang="pug">
  .loadingProductCard
    vue-content-loading(:width="900" :height="281")
      rect(x="0" y="3" width="900" height="281")
      //- rect(x="0" y="3" width="280" height="281")
      //- rect(x="290" y="3" width="280" height="281")
      //- rect(x="600" y="3" width="280" height="281")
      //- rect(x="0" y="170" rx="12" ry="12" width="140" height="22")
      //- rect(x="0" y="197" rx="8" ry="8" width="110" height="16")
      //- rect(x="0" y="227" rx="8" ry="8" width="200" height="80")
      //- rect(x="0" y="326" rx="2" ry="2" width="43" height="9")
      //- rect(x="53" y="326" rx="2" ry="2" width="45" height="9")
      //- rect(x="109" y="326" rx="2" ry="2" width="34" height="9")
      //- rect(x="153" y="326" rx="2" ry="2" width="18" height="9")
      //- rect(x="0" y="341" rx="2" ry="2" width="53" height="9")
    //- .loadingProductCard__social
    //-   <span>
    //-     <span><i class="fal fa-heart"></i> ― </span>
    //-     <span><i class="fal fa-comment"></i> ― </span>
    //-   </span>
    //-   <i class="fal fa-plus-circle" style="color: rgb(249, 164, 179)"></i>
</template>

<script>
import VueContentLoading from 'vue-content-loading'

// @vuese
// This component is displayed when data from API has not been received yet.
// It greatly improves the UX
export default {
  name: 'LoadingProductCard',
  components: {
    VueContentLoading
  }
}
</script>

<style scoped lang="stylus">
.loadingProductCard
  display inline-block
  position relative
  margin 0 auto
  width 100%
  height 100%
  text-align left
  background white
  padding 7px 10px
  &__social
    width 100%
    position absolute
    bottom 0
    left 0
    right 0
    padding 10px 16px
    width 100%
    display flex
    align-items center
    justify-content space-between
    color #aaa
    span
      margin-right 9px
</style>
