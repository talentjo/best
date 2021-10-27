<template lang="pug">
  .productPage
    DetailedProductCard(
      @addProductToCart="$emit('addProductToCart', productData)"
      :productData='productData'
    )
      div(style="width: 100%; margin-top: 15px")
        .productPage__tabs(v-if="productData.item_type !== 'article' && productData.item_type !== 'post'")
          button.productPage__tab(
            @click="openTab = 'About'",
            :class="{'productPage__tab--active': (openTab === 'About')}"
          )
            span.productPage__tab--label About
            i.productPage__tab--icon(class="fal fa-info-circle")
          button.productPage__tab(
            @click="openTab = 'Nutrition Facts'"
            :class="{'productPage__tab--active': (openTab === 'Nutrition Facts')}"
          )
            span.productPage__tab--label Nutrition Facts
            i.productPage__tab--icon(class="fal fa-clipboard-list")
          button.productPage__tab(
            @click="openTab = 'Ingredients'"
            :class="{'productPage__tab--active': (openTab === 'Ingredients')}"
          )
            span.productPage__tab--label Ingredients
            i.productPage__tab--icon(class="fal fa-carrot")
          button.productPage__tab(
            @click="openTab = 'Reviews'"
            :class="{'productPage__tab--active': (openTab === 'Reviews')}"
          )
            span.productPage__tab--label Reviews ({{ reviews.length }})
            i.productPage__tab--icon(class="fal fa-comments")
          //- button.productPage__tab(
          //-   @click="openTab = 'FAQ'"
          //-   :class="{'productPage__tab--active': (openTab === 'FAQ')}") FAQ
        .productPage__openTab(v-if="productData.item_type !== 'article' && productData.item_type !== 'post'")
          template(v-if='openTab === "About"')
            div(v-if="productData.content")
              vue-markdown(:class="`${readMore ? 'content content--full' : 'content'}`")
                | {{ productData.content }}
              span.readMore(v-if="readMore !== true" @click="readMore = true") Read More
            p.content(v-else) About
          template(v-else-if='openTab === "Nutrition Facts"')
            p.content Nutrition Facts
          template(v-else-if='openTab === "Ingredients"')
            IngredientsDisplay(
              v-if="productData.ingredients && productData.ingredients.length>0"
              :ingredients="productData.ingredients"
            )
            p(v-else).content Ingredients
          template(v-else-if='openTab === "Reviews"')
            div.productPage__writeReview
              h2 Write a review
              .editorMode(v-if="$store.getters.isUserLoggedIn && editorMode")
                div.editorMode--editor
                  | Rank this product from 1 to 10: &nbsp
                  RankInput(v-model="newReview.rank")
                  textarea(
                    v-model="newReview.content"
                    placeholder="Please enter your review here"
                  )
                div
                  PhotoUploader(v-model="newReview['pictures']")
                div
                  button.productPage__writeReview__add(@click="addReview()" :disabled="newReview.content === ''")
                    span(v-if="!loading") Submit
                    i(v-else class="fal fa-spinner")
                  button.productPage__writeReview__cancel(@click="cancelReview()")
                    | Cancel
              button.productPage__writeReview--editorButton(
                v-else-if="!editorMode && $store.getters.isUserLoggedIn"
                @click="editorMode = true"
              )
                i(class="fal fa-plus") &nbsp
                span Add review
              p(v-else) Please
                button.signIn(@click.stop="$emit('openMagicSidebar')") sign in
                | to continue.
            h3(style="text-align: left") Reviews({{ reviews.length }}):
            div.productPage__reviews(v-for="(review, index) in reviews" :key="index")
              div
                div.productPage__reviews--heading--title
                  img.productPage__reviews--heading--avatar(:src="review.owner.image")
                  h4 {{ review.owner.name }} &nbsp
                p Rating: {{ review.rank }}
                  i(class="fas fa-star")
                p(:class="`${readMore ? 'content content--full' : 'content'}`") {{ review.content }}
                span.readMore(v-if="readMore !== true" @click="readMore = true") Read More
              img.productPage__reviews--heading--image(v-if="review.pictures[0]" :src="review.pictures[0]")
            //- p.content Reviews
          //- template(v-else-if='openTab === "FAQ"')
          //-   p FAQ
        .row(v-if="productData.owner.id.includes('org_')")
          ProductCard(
            v-for='(product, index) in ownerData'
            :product="product"
            :key='`product_${index}`'
            @addProductToCart="$emit('addProductToCart', product)"
          )
</template>

<script>
import httpClient from '@/services/httpClient'
import DetailedProductCard from '@/components/DetailedProductCard.vue'
import ProductCard from '@/components/ProductCard.vue'
import VueMarkdown from 'vue-markdown'
import PhotoUploader from '@/components/PhotoUploader.vue'
import IngredientsDisplay from '@/components/IngredientsDisplay.vue'
import RankInput from '@/components/RankInput.vue'
import { reject } from 'q'

export default {
  components: {
    RankInput,
    DetailedProductCard,
    ProductCard,
    VueMarkdown,
    IngredientsDisplay,
    PhotoUploader
  },
  computed: {
    slug () {
      return this.$route.params.slug
    }
  },
  data: function () {
    return {
      loading: false,
      editorMode: false,
      productLoaded: false,
      productData: [],
      openTab: 'About',
      ownerId: '',
      ownerData: [],
      reviews: [],
      newReview: {
        post_type: 'review',
        pictures: [],
        content: '',
        rank: 1
      },
      readMore: false
    }
  },
  created () {
    httpClient.get(`/item/${this.slug}`)
      .then(response => {
        this.productData = response.data
        this.productLoaded = true
        this.ownerId = response.data.owner.id
        this.getOfferings()
        this.getReviews()
      })
      .finally(() => {
        this.loading = false
        this.getOwnerItems() // get owners rest items
      })
  },
  methods: {
    getOfferings () {
      this.productData.offerings = []
      httpClient.get(`/item/${this.productData.id}/links?page=1&per_page=100&link_format=full`)
        .then(response => {
          for (let link of response.data) {
            if (link.link_type === 'product-has-offerings') {
              httpClient.get(`/item/${link.target}`)
                .then(response2 => {
                  this.productData.offerings.push(response2.data)
                  this.productData = { ...this.productData } // To make the state refresh
                })
            }
          }
        })
    },
    getOwnerItems () {
      httpClient.get(`/org/${this.ownerId}/items?format=full`).then(response => {
        let products = response.data
        this.ownerData = response.data
      })
    },
    getReviews () {
      httpClient.get(`/item/${this.productData.id}/posts?format=full&type=review&sort_by=desc(rank)`).then(response => {
        this.reviews = response.data
      })
    },
    cancelReview () {
      this.newReview = {}
      this.editorMode = false
    },
    addReview () {
      this.loading = true
      this.newReview.rank = parseInt(this.newReview.rank, 10)
      httpClient.post(`/item/${this.productData.id}/post`, this.newReview)
        .then(response => {
          this.loading = false
          this.editorMode = false
          this.getReviews()
        })
        .catch(error => {
          this.editorMode = false
          this.loading = false
          alert('Oops! Something went wrong, please try again.')
          reject(error)
        })
    }
  },
  metaInfo () {
    return {
      title: this.productData.name,
      meta: [
        { vmid: 'keywords', name: 'keywords', content: this.productData.tags ? this.productData.tags.join`,` : '' },
        // OpenGraph data
        { property: 'og:title', content: this.productData.name + ' - Best Vegan Burger' },
        { property: 'og:site_name', content: 'Best Vegan Burger' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://bestveganburger.com/' + this.productData.slug },
        { property: 'og:image', content: this.productData.featured_picture },
        { property: 'og:description', content: this.productData.description },
        // Twitter card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: this.productData.name + ' - Best Vegan Burger' },
        { name: 'twitter:description', content: this.productData.description },
        { name: 'twitter:image:src', content: this.productData.featured_picture },
        // Google / Schema.org markup:
        { itemprop: 'name', content: this.productData.name + ' - Best Vegan Burger' },
        { itemprop: 'description', content: this.productData.description },
        { itemprop: 'image', content: this.productData.featured_picture }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
h2
  font-weight normal
h3
  font-weight normal
h4
  font-weight normal
.signIn
  text-decoration underline
  background transparent
  border none
  cursor pointer
.productPage
  margin 0 auto
  text-align center
  &__tabs
    width 100%
    border-top 1px solid #ddd
    display flex
    align-items center
    justify-content space-around
    padding 10px 0
    margin-bottom 15px
  &__tab
    width auto
    padding 0 10px
    height 40px
    display flex
    align-items center
    font inherit
    font-size 14px
    color black
    border none
    background-color white
    justify-content center
    cursor pointer
    &--icon
      display none
    &--active
      border-bottom 1px solid #222
      p
        color black
        height 100%
        display block
  &__openTab
    border-bottom 1px solid #ddd
    padding-bottom 20px
  &__writeReview
    font-size 14px
    text-align left
    border-bottom 1px solid #ddd
    padding-bottom 20px
    input
      position relative
      border none
      background #fff
      border 1px solid rgba(0, 0, 0, .1)
      padding 10px
      margin-bottom 20px
      font inherit
      transition border-color 0.3s
      &:focus
        border-color dodgerblue
    textarea
      width 100%
      min-height 100px
      position relative
      border none
      background #fff
      border 1px solid rgba(0, 0, 0, .1)
      padding 10px
      margin-bottom 10px
      font inherit
      transition border-color 0.3s
      &:focus
        border-color dodgerblue
    &--editorButton
      border none
      width auto
      border-radius 2px
      color white
      font inherit
      background-color black
      padding 5px 16px
      box-shadow 0 0 6px rgba(0, 0, 0, .13)
      cursor pointer
      margin 10px 0
      &[disabled]
        opacity .4
        cursor default
        &:hover
          opacity .4
    &__add
      border none
      width auto
      border-radius 2px
      color white
      font inherit
      background-color dodgerblue
      padding 5px 16px
      box-shadow 0 0 6px rgba(0, 0, 0, .13)
      cursor pointer
      margin 10px 0
      &[disabled]
        opacity .4
        cursor default
        &:hover
          opacity .4
    &__cancel
      border none
      width auto
      color black
      text-decoration underline
      font inherit
      background transparent
      padding 5px 16px
      cursor pointer
      margin 10px
      &[disabled]
        opacity .4
        cursor default
        &:hover
          opacity .4
  &__reviews
    display grid
    font-size 14px
    height auto
    max-width 100%
    grid-template auto / auto 300px
    text-align left
    border-bottom 1px solid #ddd
    margin-bottom 20px
    padding 20px 0
    i
      color #ffd700
      margin 11px 5px
    &--heading
      display flex
      &--title
        display flex
        flex-direction row
        h3
          width 100%
          margin 10px 0
        h4
          margin 10px 0
      &--image
        position relative
        vertical-align middle
        width auto
        max-height 150px
        float left
      &--avatar
        position relative
        vertical-align middle
        height 50px
        border-radius 50%
        width 50px
        margin-right 10px
.editorMode
  display flex
  font-size 14px
  flex-direction row
  flex-wrap wrap
  &--editor
    min-width 60%
  div
    margin 0 20px
    margin-left 0
.content
  font-size 14px
  text-align left
  font-size 14px
  max-height 200px
  width 100%
  overflow-y hidden
  &--full
    max-height 100%
.readMore
  float left
  font-size 14px
  color dodgerblue
  cursor pointer
.row
  font-size 14px
  display grid
  justify-content center
  align-items center
  margin 0 auto
  width 100%
  gap 30px
  grid-template 1fr / 1fr 1fr 1fr 1fr
  padding-bottom 30px
@media screen and (max-width: 955px)
  .row
    grid-template 1fr / 1fr 1fr 1fr
@media screen and (max-width: 780px)
  .row
    grid-template 1fr / 1fr 1fr
    max-width 460px
  .productPage
    &__reviews
      grid-template auto / auto
      &--heading
        &__image
          max-height 150px
          max-width 100%
        &--title
          flex-direction column
  .editorMode
    flex-direction column
    div
      margin 0
@media screen and (max-width: 550px)
  .row
    gap 10px
  .productPage
    &__tab
      &--label
        display none
      &--icon
        display block
    &__reviews
      &--heading
        flex-direction column-reverse
        &--image
          margin-right 0
          max-width 100%
        &--title
          flex-direction row
@media screen and (max-width: 450px)
  .row
    gap 0
@media screen and (max-width: 435px)
  .row
    grid-template 1fr / 1fr
    max-width 460px
  .productPage
    &__reviews
      grid-template auto / auto
      max-width 200px
      &--heading
        &__image
          max-height 150px
          max-width 200px
</style>
