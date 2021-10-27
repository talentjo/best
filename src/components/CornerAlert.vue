<template lang="pug">
  .cornerAlert
    .cornerAlert__alert(
      :class="{ 'cornerAlert__alert--hidden': hidden }"
    )
      p {{ message }}
      .cornerAlert__item(v-if='productData.id')
        .cornerAlert__image(:style='{backgroundImage: `url(${productData.featured_picture})`}')
        .cornerAlert__info
          h4 {{ trimmedName }}
          p Added to cart
      <i class="fal fa-check-circle"></i>
</template>

<script>
import { setTimeout } from 'timers'
export default {
  name: 'CornerAlert',
  data () {
    return {
      hidden: true,
      message: '',
      productData: {}
    }
  },
  methods: {
    open (message) {
      this.message = message
      this.hidden = false
      setTimeout(() => {
        this.hidden = true
      }, 2500)
    },
    openItem (itemData) {
      this.open('')
      this.productData = itemData
    }
  },
  computed: {
    trimmedName () {
      if (this.productData.name.length > 30) {
        return this.productData.name.substring(0, 30) + '...'
      } else {
        return this.productData.name
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.cornerAlert
  position fixed
  top 0
  right 0
  width 365px
  padding 10px
  overflow hidden
  display flex
  align-items center
  justify-content center
  z-index 20
  pointer-events none
  &__alert
    top 0
    right 0
    font-size 14px
    width calc(100% - 16px) // Include box-shadow
    border-radius 2px
    background-color white
    box-shadow 0 2px 8px rgba(0, 0, 0, .2)
    display flex
    padding 4px 10px
    align-items center
    justify-content flex-start
    transition all .2s
    transform translateX(0%)
    i
      font-size 18px
      margin-left auto
      margin-right 4px
    &--hidden
      transform translateX(150%)
  &__item
    display flex
    align-items center
    justify-content space-between
  &__image
    width 80px
    height 60px
    overflow hidden
    background-size contain
    background-repeat no-repeat
    background-position center
    margin-right 15px
  &__info
    display flex
    flex-direction column
    align-items flex-start
    justify-content center
    h4, p
      margin 3px 0
</style>
