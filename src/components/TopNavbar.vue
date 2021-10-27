<template lang="pug">
  .topNavbar
    button.topNavbar__cart(@click.stop="$emit('openCart')")
      <i class="fal fa-shopping-bag"></i>
      .counter
        p {{ ordersQuantity }}
    template(v-if='$store.state.userLoggedIn')
      button.topNavbar__user(
        @click.stop="$emit('openMagicSidebarUser')"
        :style="{backgroundImage: `url(${avatar})`}"
      )
    template(v-else)
      button(@click.stop="$emit('openMagicSidebar')")
        i(class="fal fa-user")
    router-link.topNavbar__logo(to='/')
      img.topNavbar__logo(src='@/assets/logo.png')
    router-link(to='/addBurger')
      i(class="fal fa-plus") &nbsp
      span Add burger
    button.mobile-menu(@click.stop="hamburgerClicked")
      i(class="fas fa-bars")
  //- .topNavbar.topNavbar__search
  //-   i(class="fal fa-search" @click="searchOpen = true; $refs.search.focus()")
  //-   input.topNavbar__searchbox(
  //-     ref="search"
  //-     placeholder="Search for items..."
  //-     v-model="searchInput"
  //-     @blur="searchOpen = false"
  //-     @keyup.enter="search"
  //-   )
</template>

<script>
import Utils from '../utils.js'

export default {
  name: 'TopNavbar',
  props: {
    sideMenuHidden: Boolean,
    userData: Object,
    ordersQuantity: Number
  },
  data: function () {
    return {
      searchOpen: false,
      searchInput: ''
    }
  },
  computed: {
    avatar () {
      if (typeof this.userData.avatar !== 'undefined') {
        return this.userData.avatar
      } else {
        return ''
      }
    }
  },
  methods: {
    search () {
      let query = this.searchInput
      this.$router.push(`/search/${query}`)
    },
    hamburgerClicked () {
      this.$emit('hamburgerClicked')
    },
    openMagicSidebar () {
      this.$emit('openMagicSidebar')
    }
  }
}
</script>

<style scoped lang="stylus">
.topNavbar
  position relative
  width 100%
  margin-top 10px
  height auto
  padding 20px 10px 10px 10px
  display flex
  flex-direction row-reverse
  align-items center
  .mobile-menu
    cursor pointer
    font-size 20px
    padding 0 5px
    margin 0
    background none
    border none
    margin-right 20px
  i
    font-size 20px
  &__search
    cursor pointer
    border-radius 5px
    box-shadow 4px 4px 2px #F4F4F4
    // border 1px solid #888
    background-color white
    height 35px
    width 100%
    max-width 700px
    margin-top 30px
    padding 0px 10px 0px 10px
    align-self center
    i
      font-size 20px
      color #888
  &__searchbox
    margin-right auto
    width 100%
    padding 3px 0
    margin 10px
    border none
    font-size 14px
    color black
    transition all .1s
  &__user
    margin-left 10px
    width 23px
    height 23px
    border-radius 50px
    background-size cover
    background-position center
  &__cart
    position relative
    .counter
      position absolute
      width 17px
      height 17px
      bottom -5px
      right 0
      font-size 12px
      background-color black
      color white
      border-radius 50px
      font-weight 600
      display flex
      align-items center
      justify-content center
      padding 0
      text-align center
      p
        margin 0
        margin-left 1px
  &__logo
    padding-right 30px
    align-self center
    height auto
    width auto
    margin auto
    max-width 140px
    left 0
    right 0
  button
    background-color transparent
    border none
    cursor pointer
    font-size 13px
  &__hamburger
    display block
    position absolute
    left 0
    z-index 2
    height 40px
    width 40px
    box-sizing border-box
    cursor pointer
    &--closed
      display none
  &__hamburgerElement
    position absolute
    margin 0 10px 10px 10px
    width 20px
    height 2px
    background black
    transition-duration .2s
    border-radius 2px
    &:nth-child(1)
      top 18px
      transition-duration .2s
    &:nth-child(2)
      top 22px
    &:nth-child(3)
      top 26px
      transition-duration .2s
</style>
