<template lang="pug">
  #app
    CornerAlert(ref="cornerAlert")
    .container
      TopNavbar(
        @openMagicSidebar="openSignInPage"
        @openMagicSidebarUser="() => { magicSideBarOpen = true }"
        :userData="userData"
        @hamburgerClicked="hamburgerClicked"
        :sideMenuHidden="sideMenuHidden"
        @openCart="openCart"
        :ordersQuantity="$refs.magicSidebar ? $refs.magicSidebar.cart.length:0"
      )
      side-menu(
        :hidden="sideMenuHidden"
        @requestCloseSideMenu="sideMenuHidden = true"
        v-click-outside="() => sideMenuHidden = true"
      )
      //- MagicMenu(
      //-   :categories="menuCategories"
      //- )
      .routerView(:class="{'routerView--full' : sideMenuHidden}")
        transition(name="slide-fade")
          router-view(
            :key='$route.path'
            @addProductToCart="addProductToCart"
            @openMagicSidebar="openSignInPage"
          )
      MagicSidebar(
        :apiUrl="apiUrl"
        :staging="isDev"
        ref="magicSidebar"
        :hidden="!magicSideBarOpen"
        @click.stop=""
        @signedIn="handleSignedIn"
        @signedOut="handleSignedOut"
        @tokenChanged="handleCSRFtokenChanged"
        v-click-outside="() => { magicSideBarOpen = false }"
        @close="() => { magicSideBarOpen = false }"
      )
      footer
        img(src='@/assets/logo.png')
</template>

<script>
import TopNavbar from "@/components/TopNavbar.vue";
import MagicMenu from "@/components/MagicMenu.vue";
import MagicSidebar from "@tiago.ethical.id/magic-sidebar";
import SideMenu from "@/components/SideMenu.vue";
import ClickOutside from "vue-click-outside";
import CornerAlert from "@/components/CornerAlert.vue";
import "@tiago.ethical.id/magic-sidebar/dist/sidebar.css";
import menuCategories from "@/menuCategories.js";
import { API_URL } from "@/config.js";
import httpClient from "@/services/httpClient.js";

export default {
  components: {
    TopNavbar,
    MagicMenu,
    MagicSidebar,
    CornerAlert,
    SideMenu,
  },
  created() {
    if (this.getCookie("sideMenuHidden") !== "") {
      this.sideMenuHidden = this.getCookie("sideMenuHidden") === "false";
    }
  },
  computed: {
    isDev() {
      return process.env.NODE_ENV === "development";
    },
    apiUrl() {
      return API_URL;
    },
  },
  directives: {
    ClickOutside,
  },
  metaInfo: {
    title: "Best Vegan Burger",
    meta: [
      { "http-equiv": "Content-Type", content: "text/html; charset=utf-8" },
    ],
  },
  data: function () {
    return {
      sideMenuHidden: false,
      magicSideBarOpen: false,
      magicSideBarUpdatesCounter: 0,
      userData: {},
      API_URL: API_URL,
      menuCategories,
    };
  },
  methods: {
    handleCSRFtokenChanged(newToken) {
      httpClient.defaults.headers.common["X-CSRF-TOKEN"] = newToken;
    },
    hamburgerClicked() {
      this.sideMenuHidden = !this.sideMenuHidden;
      document.cookie = "sideMenuHidden=" + this.sideMenuHidden;
    },
    handleSignedIn(userData) {
      this.$store.commit("login");
      this.userData = userData;
    },
    handleSignedOut(userData) {
      this.$store.commit("logout");
    },
    addProductToCart(itemData) {
      this.$refs.magicSidebar.addOrder(itemData);
      this.$refs.cornerAlert.openItem(itemData);
    },
    openSignInPage() {
      this.magicSideBarOpen = true;
      this.$refs.magicSidebar.openPage = "signIn";
    },
    openCart() {
      this.magicSideBarOpen = true;
      this.$refs.magicSidebar.openCart();
    },
    getCookie(name) {
      name = name + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    },
  },
};
</script>

<style lang="stylus">
@font-face
  font-family "Font Awesome 5 Brands"
  font-style normal
  font-weight normal
  src url(assets/webfonts/fa-brands-400.eot)
  src: url(assets/webfonts/fa-brands-400.eot?#iefix) format("embedded-opentype"),
    url(assets/webfonts/fa-brands-400.woff2) format("woff2"),
    url(assets/webfonts/fa-brands-400.woff) format("woff"),
    url(assets/webfonts/fa-brands-400.ttf) format("truetype"),
    url(assets/webfonts/fa-brands-400.svg#fontawesome) format("svg")
@font-face
  font-family "Font Awesome 5 Pro"
  font-style normal
  font-weight 300
  src url(assets/webfonts/fa-light-300.eot)
  src url(assets/webfonts/fa-light-300.eot?#iefix) format("embedded-opentype"), url(assets/webfonts/fa-light-300.woff2) format("woff2"), url(assets/webfonts/fa-light-300.woff) format("woff"), url(assets/webfonts/fa-light-300.ttf) format("truetype"), url(assets/webfonts/fa-light-300.svg#fontawesome) format("svg")
@font-face
  font-family "Font Awesome 5 Pro Solid"
  font-style normal
  font-weight 800
  src url(assets/webfonts/fa-solid.otf)
.fal
  font-family "Font Awesome 5 Pro"
  font-weight 300
.fab
  font-family "Font Awesome 5 Brands"
.fas
  font-family "Font Awesome 5 Pro Solid"
  font-weight 800
*
  box-sizing border-box
html, body
  margin 0
a
  color inherit
  text-decoration none
*:focus
  outline none

#app
  font-family 'Open Sans', Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  color #000

.routerView
  width 100%
  height 100%
  box-sizing border-box
  transition-duration .4s
  transition-timing-function cubic-bezier(0.645, 0.045, 0.355, 1)
  &--full
    padding-left 0

.container
  max-width 970px
  min-height 100vh
  margin 0 auto
  text-align center
  overflow-x hidden

.slide-fade-enter-active
  transition all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0)
  transition-delay .4s
.slide-fade-leave-active
  transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0)
.slide-fade-enter, .slide-fade-leave-to
  transform translateX(10px)
  opacity 0
.slide-fade-enter-to
  transform translateX(0)
  opacity 1

footer
  display inline-block
  margin 40px auto 20px auto
  left 0
  right 0
  height auto
  font-size 12px
  img
    max-height 110px
    height 100%
    margin-right 15px
    width auto
  i, span
    margin-right 6px
  a:not(.bottomLine)
    margin 0 5px
    font-size 14px
  a.bottomLine
    color #ccc
    margin-bottom 20px

@media screen and (max-width: 850px)
  .container
    padding 0 10px
</style>
