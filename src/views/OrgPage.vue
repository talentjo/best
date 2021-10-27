<template lang="pug">
  .wrapper
    .wrapper__box
      .wrapper__orgBar
        img.wrapper__orgBar__boxImage(:src='orgData.logo' alt='logo')
    .box
      .wrapper__box__content
        h1 {{orgData.name}}
        div(v-if="orgData.year_founded") Founded in {{orgData.year_founded}}
        div(v-else) Founded in {{ year }}
        .wrapper__box__boxInner(v-if='orgData.description')
          .wrapper__box__boxInnerContent {{orgData.description}}
        .tags_row
          router-link.tags(v-for='(item,index) in orgData.industry' :key='index' :to="`/tag/${item}`") {{ '#' + item }}
          //- This ^ was commented out to remove duplicate tags.
        .wrapper__box__boxInner(v-if='orgData.address')
          .wrapper__box__boxInnerContent  {{orgData.address.street_address}}, {{orgData.address.city}}, {{orgData.address.country}}, {{orgData.address.postcode}}
          .wrapper__box__boxInnerContent(v-if="orgData.urls")
            a(v-if="orgData.urls.website" :href="orgData.urls.website")
              i.urls(class="fal fa-link")
            a(v-if="orgData.urls.facebook" :href="orgData.urls.facebook")
              i.urls(class="fab fa-facebook-f")
            a(v-if="orgData.urls.instagram" :href="orgData.urls.website")
              i.urls(class="fab fa-instagram")
            a(v-if="orgData.urls.linkedin" :href="orgData.urls.website")
              i.urls(class="fab fa-linkedin-in")
    .box
    .wrapper__productCards
      .row
        ProductCard(v-for='(product, index) in orgProducts' :product="product" :key='`product_${index}`')
</template>

<script>
import ProductCard from '@/components/ProductCard.vue'
import httpClient from '@/services/httpClient'

export default {
  components: {
    ProductCard
  },
  data () {
    return {
      orgData: [],
      orgProducts: []
    }
  },
  computed: {
    // orgTags () {
    //   var tags = []
    //   this.orgProducts.forEach(item => {
    //     tags.push(...item.tags)
    //   })
    //   return tags
    // },
    // orgLinks () {
    //   var cachedObject = {}
    //   var links = []
    //   this.orgProducts.forEach(item => {
    //     links.push(item.urls)
    //   })
    //   // remove duplicates
    //   links.map(item => (cachedObject[item.link] = item))
    //   return cachedObject
    // },
    year () {
      return this.orgData.created_at.slice(0, 4)
    }
  },
  created () {
    this.getOrgData()
    this.getOrgProducts()
  },
  methods: {
    getOrgData () {
      const slug = this.$route.params.slug
      httpClient.get(`/org/${slug}`).then(response => {
        this.orgData = response.data
      })
    },
    getOrgProducts () {
      const slug = this.$route.params.slug
      httpClient.get(`/org/${slug}/items?format=full`).then(response => {
        let products = response.data
        this.orgProducts.push(...products)
      })
    },
    getTags () {}
  }
}
</script>

<style lang="stylus">
.wrapper
  padding 40px 0
  background-color white
  border-radius 30px
  width 100%
  padding 35px
  color #000
  display grid
  grid-gap 1em
  grid-template-areas "orgBar" "content" "productCards"
  &__box
    padding 10px
    font-size 150%
    &__content
      display flex
      align-items flex-start
      flex-direction column
      grid-area content
    &__boxInner
      display flex
      align-items flex-start
      flex-direction column
      font-size 1rem
    &__boxInnerContent
      font-size 0.9rem
      text-align left
      margin-top 10px
  &__orgBar
    grid-area orgBar
    &__boxImage
      object-fit contain
      width 100%
      height 100%
  &__productCards
    display flex
    flex-flow row wrap
    grid-area productCards
    background #fff
    justify-content flex-start
    border-top 1px solid #ddd
    margin-top 10px
  h1
    font-size 22px
    font-weight 400
    margin-bottom 3px
  h2
    font-size 15px
    font-weight 400
    margin-top 0
    color #666

.urls
  margin 10px

.row
  display grid
  justify-content center
  align-items center
  margin 0 auto
  gap 30px
  width 100%
  grid-template 1fr / 1fr 1fr 1fr 1fr
  padding-bottom 10px

.tags
  font-size 12px
  color #00b1ab
  cursor pointer
  margin-right 8px
  &_row
    margin 13px 0
    width 100%
    justify-content flex-start
    display flex
    flex-flow row wrap

@media only screen and (min-width: 500px)
  .wrapper
    grid-template-columns 40% auto
    grid-template-areas "orgBar  content" "productCards   productCards"

@media only screen and (min-width: 600px)
  .wrapper
    grid-gap 20px
    grid-template-columns 320px auto
    grid-template-areas "orgBar content" "productCards  productCards  productCards"
    max-width 100%
@media screen and (max-width: 955px)
  .row
    grid-template 1fr / 1fr 1fr 1fr
@media screen and (max-width: 780px)
  .row
    grid-template 1fr / 1fr 1fr
    max-width 460px
@media screen and (max-width: 500px)
  .row
    gap 10px
@media screen and (max-width: 450px)
  .row
    gap 0
@media screen and (max-width: 435px)
  .row
    grid-template 1fr / 1fr
    max-width 460px
</style>
