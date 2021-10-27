import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import AddBurgerPage from './views/AddBurgerPage.vue'
import ItemPage from './views/ProductPage.vue'
import httpClient from '@/services/httpClient'
import menuCategories from '@/menuCategories.js'
Vue.use(Router)

function getCategories (categories) {
  return Object.entries(categories.categories).map(([key, value]) => {
    if (value.categories) return [key.replace(',', '|'), getCategories(value)]
    return key.replace(',', '|')
  }).join(',').split(',').filter(e => e !== '')
}
let categories = getCategories(menuCategories).map(v => v.replace('|', ','))

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/login/:code',
    name: 'login',
    component: {
      template: `<div>{{ message }}</div>`,
      data () {
        return {
          message: 'You\'re being redirected...'
        }
      },
      watch: {
        '$store.state.CSRFtoken' (token) {
          httpClient.defaults.headers.common['X-CSRF-TOKEN'] = token
          httpClient.post(`/auth/login`, {
            login_token: this.$route.params.code
          }, {
            withCredentials: true
          })
            .then(() => {
              this.$router.replace('/')
              location.reload()
            })
            .catch(e => {
              this.message = 'Wrong login token'
            })
        }
      }
    }
  },
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/addBurger',
    name: 'addBurgerPage',
    component: AddBurgerPage
  },
  {
    path: `/:categoryName(${categories.join('|')})`,
    name: 'categoryPage',
    component: Home
  },
  {
    path: '/:slug',
    name: 'itemPage',
    component: ItemPage
  },
  {
    path: '/search/:query',
    name: 'searchPage',
    component: Home
  },
  {
    path: '/tag/:tag',
    name: 'tagPage',
    component: Home
  },
  {
    path: '/brand/:slug',
    name: 'orgPage',
    component: () =>
                import(/* webpackChunkName: "orgPage" */ './views/OrgPage.vue')
  }
  ]
})
