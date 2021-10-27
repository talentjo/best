<template lang="pug">
  .productCard
    router-link(:to="`/${product.slug}`")
      .productCard__image(:style='{backgroundImage: `url(${product.pictures[0]})`}')
    .productCard__info
      router-link(:to="`/${product.slug}`")
        h4 {{ trimmedName }}
      div(v-if="product.owner.id.includes('org_')")
        router-link(v-if="product.owner.slug" :to="`/brand/${product.owner.slug}`")
          h5 {{ product.owner.name }}
        router-link(v-else :to="`/brand/${product.owner.id}`")
          h5 {{ product.owner.name }}
      p {{ trimmedDescription }}
      .productCard__tags
        .productCard__tag(v-for='tag in product.tags' @click='$router.push(`/tag/${tag}`)') {{ '#' + tag }}
    .productCard__social
      span
        span
          button.productCard__transparentButton(
            @click="likeProduct()"
            :disabled="!$store.getters.isUserLoggedIn"
            :title="$store.getters.isUserLoggedIn ? 'Love it':'Please login to give it some love'"
          )
            i(
              class="fa-arrow-alt-up"
              :class="product.user_upvoted ? 'fas likeAnimation' : 'fal'"
            )
          div(
            class="productCard__likeCounter"
            :class="{ 'productCard__likeCounter--liked': product.user_upvoted }"
          )
            p {{ product.upvotes ? product.upvotes : 0 }}
            p {{ product.upvotes ? product.upvotes : 0 }}
        span
          i(class="fal fa-comment")
          span(style="margin-left: 4px") {{ reviews.length }}
</template>

<script>
import httpClient from '@/services/httpClient.js'
// A card of a product displayed on Home page.
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      reviews: []
    }
  },
  created () {
    this.getReviews()
  },
  computed: {
    trimmedDescription () {
      if (this.product.description.length > 80) {
        return this.product.description.substring(0, 80) + '...'
      } else {
        return this.product.description
      }
    },
    trimmedName () {
      if (this.product.name.length > 37) {
        return this.product.name.substring(0, 37) + '...'
      } else {
        return this.product.name
      }
    }
  },
  methods: {
    addProductToCart (element) {
      this.$emit('addProductToCart')
      let button = element.getElementsByClassName('addToCartButton')[0]
      button.classList.add('likeAnimation')
      setTimeout(() => {
        button.classList.remove('likeAnimation')
      }, 200)
    },
    getReviews () {
      httpClient.get(`/item/${this.product.id}/posts?format=full&type=review&sort_by=desc(rank)`).then(response => {
        this.reviews = response.data
      })
    },
    async likeProduct () {
      if (this.product.user_upvoted) {
        try {
          this.product.user_upvoted = false
          this.product.upvotes--
          await httpClient.delete(`/item/${this.product.id}/upvote`)
        } catch {
          this.product.upvotes++
          this.product.user_upvoted = true
        }
      } else {
        try {
          this.product.user_upvoted = true
          this.product.upvotes++
          await httpClient.post(`/item/${this.product.id}/upvote`)
        } catch {
          this.product.upvotes--
          this.product.user_upvoted = false
        }
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.productCard
  display inline-block
  position relative
  margin 0 auto
  width 100%
  min-height 435px
  height 100%
  text-align left
  background white
  padding 20px 10px
  &__transparentButton
    background transparent
    padding 0
    border none
    font inherit
    &[disabled]
      cursor default
      color #eee
      i
        color #ccc
        cursor default
  &__image
    position relative
    width 100%
    height 150px
    background-color white
    background-size contain
    background-repeat no-repeat
    background-position center
    overflow hidden
  &__info
    padding 10px 5px 5px 5px
    h4
      margin 1px 0
      font-weight 400
      font-size 16px
    h5
      font-weight 100
      margin 0
      color #555
    p
      font-size 13px
      color #888
  &__tags
    display flex
    flex-wrap wrap
    margin-bottom 10px
  &__tag
    font-size 12px
    color #00b1ab
    cursor pointer
    margin-right 8px
  &__social
    position absolute
    bottom 5px
    left 0
    right 0
    padding 10px 16px
    width 100%
    display flex
    align-items center
    justify-content space-between
    user-select none
    span
      margin-right 9px
      display flex
      align-items center
      justify-content space-between
    i
      cursor pointer
  &__likeCounter
    margin-left 4px
    display inline-block
    width auto
    height 22px
    overflow hidden
    p
      margin 0
      transform translateY(1px)
      transition 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)
      padding 0
    &--liked
      p
        transform translateY(-18px)

.likeAnimation
  animation-name like
  animation-duration 0.5s

@keyframes like
  0%
    transform scale(1)
  25%
    transform scale(1.2)
  70%
    transform scale(0.9)
</style>
