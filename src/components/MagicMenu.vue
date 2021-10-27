<template lang="pug">
  nav.magicMenu
    button.goBack(
      :class="{'goBack--visible': browsedCategories[browsedCategories.length - 1] !== categories}"
      @click="handleGoBack"
    ) <i class="fal fa-arrow-alt-left"></i>
    button.goBack.goBack--visible.goBack--deadEnd(
      v-if='browsedCategories[browsedCategories.length - 1] === categories'
      style="cursor: default"
    ) •
    transition-group(name='list' class='list')
      button(
        v-if='lastCategoryName' key="odd1"
        :class="{'list-item--selected': $route.params.categoryName === lastCategoryName}"
        @click="handleButtonClick(browsedCategories[0], lastCategoryName)") {{ lastCategory.name || lastCategoryName }}:
      button(
        v-for="(categories, key) in browsedCategories[browsedCategories.length - 1].categories"
        :key="key"
        @click="handleButtonClick(categories, key)"
        class="list-item"
        :class="{'list-item--selected': key === $route.params.categoryName && categories.collection}"
      )
        p {{ categories.name || key }}
</template>

<script>
// Navigation component with configurable categories, subcategories, subsubsubcate... you can add as many of them as you wish!
export default {
  name: 'MagicMenu',
  props: {
    categories: Object
  },
  data: function () {
    return {
      // Enables user to go back to previous category list
      browsedCategories: [],
      lastCategoryName: '',
      lastCategory: {}
    }
  },
  created () {
    // Push current category configuration to history
    this.browsedCategories.push(this.categories)
    this.getCollectionNames()
  },
  methods: {
    // When a category button is clicked - show user its subcategories
    handleButtonClick (newCategories, key) {
      if (newCategories.categories && key !== this.lastCategoryName) {
        this.$router.push(`/${key}`)
      } else {
        this.$router.replace(`/${key}`)
      }
    },
    handleGoBack () {
      let categoryName = this.$route.params.categoryName
      let category = this.getCategory(this.categories, categoryName)
      if (this.categories.categories[categoryName]) {
        this.$router.replace('/')
        this.lastCategoryName = ''
        this.lastCategory = {}
        return
      }
      if (category.categories) {
        this.browsedCategories.pop()
      }
      this.$router.back()
    },
    getCollectionNames () {
      if (this.$route.name !== 'categoryPage') {
        this.browsedCategories.push(this.categories)
        this.lastCategoryName = ''
        this.lastCategory = {}
        return
      }
      let categoryName = this.$route.params.categoryName
      let category = this.getCategory(this.browsedCategories[0], categoryName)
      if (!category) return
      if (category.categories) {
        this.browsedCategories.push(category)
        this.lastCategory = category
        this.lastCategoryName = categoryName
      } else {
        let lastCategory = this.getParentCategory(this.browsedCategories[0], categoryName)
        if (lastCategory) {
          this.browsedCategories.push(lastCategory.data)
          this.lastCategoryName = lastCategory.name
        }
      }
      let collection = this.getCollectionsForCategory(category)
      this.$nextTick(() => {
        this.$store.commit('setCollectionNames', collection)
      })
    },
    getCategory (category, name) {
      if (!category.categories) return undefined
      return Object.entries(category.categories).map(([subcategoryName, subcategory]) => {
        if (subcategoryName === name) {
          return subcategory
        } else {
          return this.getCategory(subcategory, name)
        }
      }).filter(e => e !== undefined)[0]
    },
    getParentCategory (category, name) {
      if (!category.categories) return undefined
      return Object.entries(category.categories).map(([subcategoryName, subcategory]) => {
        if (subcategory.categories && subcategory.categories[name]) {
          return { data: subcategory, name: subcategoryName }
        } else {
          return this.getParentCategory(subcategory, name)
        }
      }).filter(e => e !== undefined)[0]
    },
    getCollectionsForCategory (category) {
      /*
        You shall not try to understand how this function works,
        for the author himself has not acquired that knowledge yet.
        ...
        However, I can bless you with the power of knowing what this function does.
        It delves deeply into all menu categories presented to it,
        combining a list of all collection names found inside of them, and returns that list.
      */
      if (!category.categories) return category.collection
      return Object.values(category.categories).map(subcategory => this.getCollectionsForCategory(subcategory)).join(',').split(',').filter(e => e !== '')
    }
  },
  watch: {
    '$route': {
      handler () {
        this.$nextTick(() => {
          this.getCollectionNames()
        })
      },
      immediate: true
    }
  }
}
</script>

<style scoped lang="stylus">
.magicMenu
  position relative
  height 38px
  margin 12px 0 25px 0
  text-align left
  box-sizing border-box
  padding 15px 25px
  border-radius 8px
  overflow hidden
  transition all .2s
  button
    display inline-block
    cursor pointer
    font-size 14px
    text-transform capitalize
    border none
    background transparent
    p
      margin 0
  .goBack
    position absolute
    left -55px
    top 17px
    transition-duration .2s
    opacity 0
    &--deadEnd
      animation-name appear
      animation-duration .2s
      animation-fill-mode forwards
    &--visible
      opacity 1
      left 4px

@keyframes appear
  from
    opacity 0
    transform translateY(30px)
  to
    opacity 1
    transform translateY(0)

.list
  width 100%
  height 100%
  overflow hidden

.list-item
  display inline-block
  margin-right 2px
  z-index 2
  color black
  margin-left 3px
  &--selected
    color red

.list-enter-active, .list-leave-active
  transition all 0.5s

.list-enter
  opacity 0
  transform translateY(200px)

.list-leave-to
  transform translateY(-40px)

.list-move
  transition transform .2s

.list-leave-active
  position absolute
  left 0
  opacity 0
  z-index -1
</style>
