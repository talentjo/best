<template lang="pug">
  .pictureDisplayer
    .pictureDisplayer__mainPicture(
      :style='{ backgroundImage: `url(${pictures[selectedPictureIndex]})` }'
    )
    .pictureDisplayer__miniatures
      .pictureDisplayer__container#pictureContainer
        .pictureDisplayer__miniature(
          v-for='(picture, index) in pictures'
          @click='selectedPictureIndex = index'
          :style='{ backgroundImage: `url(${picture})` }'
        )
      .pictureDisplayer__arrow.pictureDisplayer__arrow--left(v-if='pictures.length > 4' @click='scrollLeft')
        <i class="fal fa-chevron-left"></i>
      .pictureDisplayer__arrow.pictureDisplayer__arrow--right(@click='scrollRight')
        <i class="fal fa-chevron-right"></i>
</template>

<script>
export default {
  name: 'PictureDisplayer',
  props: {
    pictures: {
      required: true,
      type: Array
    }
  },
  data: function () {
    return {
      selectedPictureIndex: 0
    }
  },
  methods: {
    scrollRight () {
      let element = document.getElementById('pictureContainer')
      element.scrollBy({ left: 60, behavior: 'smooth' })
    },
    scrollLeft () {
      let element = document.getElementById('pictureContainer')
      element.scrollBy({ left: -60, behavior: 'smooth' })
    }
  }
}
</script>

<style scoped lang="stylus">
.pictureDisplayer
  width 50%
  height 500px
  min-width 300px
  max-width 350px
  display flex
  flex-direction column
  &__mainPicture
    width 100%
    height 100%
    background-color white
    background-size contain
    background-repeat no-repeat
    background-position center
  &__miniatures
    position relative
    width 100%
    overflow hidden
    min-height 100px
  &__container
    width auto
    height calc(100% + 20px)
    overflow-x scroll
    -webkit-overflow-scrolling touch
    display flex
    align-items center
    justify-content flex-start
  &__miniature
    display inline-block
    min-width 60px
    height 80px
    margin-right 8px
    background-size cover
    background-position center
    background-color white
    cursor pointer
  &__arrow
    position absolute
    font-size 22px
    color white
    padding 5px
    top calc(50% - 11px)
    cursor pointer
    z-index 2
    &--left
      left 2px
    &--right
      right 2px
@media screen and (max-width: 850px)
  .pictureDisplayer
    width 100%
    max-width 100%
    min-width auto
</style>
