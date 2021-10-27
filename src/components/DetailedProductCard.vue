<template lang="pug">
  .detailedProductCard
    PictureDisplayer(:pictures='productData.pictures || []')
    .detailedProductCard__description(v-if='productData')
      h1 {{productData.name}}
      div(v-if="productData.owner.id.includes('org_')")
        router-link(v-if="productData.owner.slug" :to="`/brand/${productData.owner.slug}`")
          h2 {{ productData.owner.name }}
        router-link(v-else :to="`/brand/${productData.owner.id}`")
          h2 {{ productData.owner.name }}
      .detailedProductCard__tags
        router-link.detailedProductCard__tag(
          v-for='tag in productData.tags'
          :to="`/tag/${tag}/`"
        ) {{ `#${tag}` }}
      p {{productData.description}}
      br
      h4(v-if='productData.offerings && productData.offerings.length > 0') Offerings for this product:
      p(v-for='offering in productData.offerings' :key="offering.id")
        span {{ offering.owner.name }} -
        <span style="text-decoration: line-through; margin: 0 5px; font-size: 0.8em">{{ offering.compare_at_price > offering.price ? `${getPrice(offering.compare_at_price, offering.currency)} ${offering.currency}`:''}}</span>
        span <b>{{ getPrice(offering.price, offering.currency) }} {{ offering.currency }}</b>
        button.addToCart(
          v-if="productData.item_type !== 'article' && productData.item_type !== 'post'"
          @click.stop="productData.offering = offering; $emit('addProductToCart')"
        ) Add to Cart
    slot
</template>

<script>
import PictureDisplayer from '@/components/PictureDisplayer.vue'
import currencyList from '@/assets/currencyList.json'

export default {
  name: 'detailedProductCard',
  components: {
    PictureDisplayer
  },
  props: {
    productData: {}
  },
  computed: {

  },
  methods: {
    getPrice (price, currency) {
      // Converts a price from minor currency units to major ones
      return price / Math.pow(10, currencyList[currency]['fractionSize'])
    }
  }
}
</script>

<style scoped lang="stylus">
.detailedProductCard
  display inline-flex
  padding 40px 0
  background-color white
  border-radius 30px
  width 100%
  flex-wrap wrap
  padding 35px
  min-height 100px
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
  &__description
    width 50%
    text-align left
    margin-left 35px
    h1
      font-size 22px
      font-weight 400
      margin-bottom 3px
    h2
      font-size 15px
      font-weight 400
      margin-top 0
      color #666
    h4
      font-weight 100
    p
      font-size 14px
      line-height 1.8em
      white-space pre-line
  &__tags
    margin 20px 0
    display flex
    flex-wrap wrap
    width 80%
  &__tag
    font-size 13px
    color #00b1ab
    margin-right 8px
    cursor pointer

@media screen and (max-width: 780px)
  .detailedProductCard
    flex-direction column
    &__description
      width 100%
      margin 0
@media screen and (max-width: 470px)
  .detailedProductCard
    padding 12px
    &__description
      width 100%
      margin 0
</style>
