<template lang="pug">
  .home
    h1 {{ $route.params.tag ? `#${$route.params.tag}`:'' }}
    .home__cardContainer
      template(v-if='productsLoaded && products.length > 0')
        HorizontalProductCard(
          v-for='(product, index) in products'
          :product="product"
          :key='`product_${index}`'
          @addProductToCart="$emit('addProductToCart', product)"
        )
      template(v-else-if="!productsLoaded")
        LoadingProductCard(v-for='index in 9' :key='`loadingProduct_${index}`')
    div(v-if='productsLoaded && products.length === 0' style="margin: 20px 0 30px 0")
      <i class="fal fa-cat" style="font-size: 50px"></i>
      p No products found
</template>

<script>
import LoadingProductCard from '@/components/LoadingProductCard.vue'
import ProductCard from '@/components/ProductCard.vue'
import HorizontalProductCard from '@/components/HorizontalProductCard.vue'
import httpClient from '@/services/httpClient'
import { setTimeout } from 'timers'
import { COLLECTION } from '@/config.js'
import socialog from '@/assets/socialog.png'
export default {
  name: 'home',
  components: {
    LoadingProductCard, ProductCard, HorizontalProductCard
  },
  data: function () {
    return {
      productsLoaded: false, // When the products are loaded - the content-loading ones can be hidden.
      products: [],
      loadingCollections: false,
      socialog: socialog
    }
  },
  methods: {
    getOfferings (product) {
      product.offerings = []
      httpClient.get(`/item/${product.id}/links?page=1&per_page=100&link_format=full`)
        .then(response => {
          for (let link of response.data) {
            if (link.link_type === 'product-has-offerings') {
              httpClient.get(`/item/${link.target}`)
                .then(response2 => {
                  product.offerings.push(response2.data)
                })
            }
          }
        })
    },
    getAllItems () {
      httpClient.get(`/items?collections=${COLLECTION}&format=full&sort_by=upvotes.desc`)
        .then(response => {
          response.data.forEach(item => {
            this.getOfferings(item)
            this.products.push(item)
          })
        })
        .catch(error => {
          // Do nothing. Sometimes collections just don't exist.
          // We shouldn't be angry about that. Let it be.
        })
        .finally(() => {
          setTimeout(() => {
            this.productsLoaded = true
          }, 300)
        })
    },
    searchItems (query) {
      httpClient.get(`/items?q=${query}&sort_by=upvotes.desc&type=packagedfood,fashion&per_page=100`)
        .then(response => {
          for (let product of response.data) {
            this.getOfferings(product)
          }
          this.products = this.products.concat(response.data)
        })
        .finally(() => {
          this.productsLoaded = true
        })
    },
    getTaggedItems (tag) {
      httpClient.get(`/tag/${tag}?sort_by=upvotes.desc&type=packagedfood,fashion&format=full`)
        .then(response => {
          for (let product of response.data) {
            this.getOfferings(product)
          }
          this.products = this.products.concat(response.data)
        })
        .finally(() => {
          this.productsLoaded = true
        })
    }
  },
  created () {
    this.products = []
    if (this.$route.name === 'categoryPage') {
      return
    }
    let query = this.$route.params.query
    if (query) {
      this.searchItems(query)
      return
    }
    let tag = this.$route.params.tag
    if (tag) {
      this.getTaggedItems(tag)
      return
    }
    this.getAllItems()
  },
  metaInfo () {
    return {
      title: 'Best Vegan Burger',
      meta: [
        // OpenGraph data
        { property: 'og:title', content: 'Best Vegan Burger' },
        { property: 'og:site_name', content: 'Best Vegan Burger' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://bestveganburger.com' },
        { hid: 'og:image', property: 'og:image', content: 'https://bestveganburger.com' + this.socialog },
        { property: 'og:description', content: 'Upload, review and vote on your favourite plant-based patties' },
        // Twitter card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Best Vegan Burger' },
        { name: 'twitter:description', content: 'Upload, review and vote on your favourite plant-based patties' },
        { name: 'twitter:image:src', content: 'https://bestveganburger.com' + this.socialog },
        // Google / Schema.org markup:
        { itemprop: 'name', content: 'Best Vegan Burger' },
        { itemprop: 'description', content: 'Upload, review and vote on your favourite plant-based patties' },
        { itemprop: 'image', content: 'https://bestveganburger.com' + this.socialog }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.home
  margin 0 auto
  h1
    text-align left
    font-size 25px
  &__cardContainer
    display grid
    justify-content center
    align-items center
    margin 0 auto
    grid-template 1fr / 1fr
    padding-bottom 30px
</style>
