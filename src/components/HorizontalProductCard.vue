<template lang="pug">
  .productCard
    router-link(:to="`/${product.slug}`")
      .productCard__image(:style='{backgroundImage: `url(${product.pictures[0]})`}')
    div.content
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
        p(style="font-size 12px") Reviews ({{ reviews.length }})
      .productCard__social
        span.upvote(
          @click="likeProduct()"
          :disabled="!$store.getters.isUserLoggedIn"
          :title="$store.getters.isUserLoggedIn ? 'Love it':'Please login to give it some love'"
        )
          button.productCard__transparentButton(
            @click="likeProduct()"
            :disabled="!$store.getters.isUserLoggedIn"
            :title="$store.getters.isUserLoggedIn ? 'Love it':'Please login to give it some love'"
          )
            i(
              @click="likeProduct()"
              class="fa-arrow-alt-up"
              :class="product.user_upvoted ? 'fas likeAnimation' : 'fal'"
            )
          div(
            class="productCard__likeCounter"
            :class="{ 'productCard__likeCounter--liked': product.user_upvoted }"
          )
            p {{ product.upvotes ? product.upvotes : 0 }}
            p {{ product.upvotes ? product.upvotes : 0 }}
      //- button.addToCart(
      //-   v-if="product.item_type !== 'article' && product.item_type !== 'post'"
      //-   @click.stop="product.offering = offering; $emit('addProductToCart')"
      //- ) Add to Cart
</template>

<script>
import httpClient from '@/services/httpClient.js'
// A card of a product displayed on Home page.
export default {
  name: 'HorizontalProductCard',
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
      if (this.$store.getters.isUserLoggedIn) {
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
      else {
        alert('You need to login to upvote')
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.productCard
  display grid
  position relative
  margin 0 auto
  width 100%
  height 100%
  text-align left
  border-bottom 1px solid #ddd
  padding 30px 0 30px 0
  grid-template 1fr / 2fr 8fr
  gap 20px
  button
    background transparent
    padding 0
    border none
    font inherit
    i
      color black
    &[disabled]
      cursor default
      color #eee
      i
        color #ccc
        cursor default
  button.addToCart
    background transparent
    padding 5px 15px
    border 1px solid #ff264c
    border-radius 50px
    cursor pointer
    font inherit
    font-size 13px
    color #ff264c
    &[disabled]
      cursor default
      border-color #eee
      color #eee
  &__image
    position relative
    width 100%
    min-height 110px
    background-color white
    background-size contain
    background-repeat no-repeat
    background-position center
    overflow hidden
  &__info
    padding 10px 5px 5px 5px
    width 100%
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
  &__tag
    font-size 12px
    color #00b1ab
    cursor pointer
    margin-right 8px
  &__social
    position relative
    bottom 5px
    user-select none
    margin auto
    span
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
      transform translateY(0)
      transition 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)
      padding 0
    &--liked
      p
        transform translateY(-22px)

.likeAnimation
  animation-name like
  animation-duration 0.5s

.upvote
  border 1px solid #ddd
  padding 20px
  height auto
  cursor pointer
  width auto

.content
  display flex
  flex-direction row

@keyframes like
  0%
    transform scale(1)
  25%
    transform scale(1.2)
  70%
    transform scale(0.9)

@media screen and (max-width: 955px)
  .productCard
    grid-template 1fr / 2fr 6fr
@media screen and (max-width: 780px)
  .productCard
    max-width 100%
@media screen and (max-width: 435px)
  .productCard
    grid-template 1fr / 1fr
    max-width 100%
    &__image
      min-height 400px
</style>
