<template>
  <div class="side-menu" :class="{ 'side-menu--hidden': hidden }">
    <div class="side-menu__content">
      <div class="side-menu__header">
        <button
          class="side-menu__close-btn"
          @click="$emit('requestCloseSideMenu')"
        >
          <img
            class="side-menu__close-icon"
            src="../assets/times-light-white.svg"
            alt="close icon"
            draggable="false"
          />
        </button>
        <!-- <router-link to="/">
          <img
            class="side-menu__logo"
            src="../assets/logo.png"
            alt="kiuki"
            draggable="false"
          />
        </router-link> -->
      </div>

      <nav class="magic-menu" :class="{ 'magic-menu--reversed': reversedMenu }">
        <button
          class="goBack"
          :class="{
            visible:
              browsedCategories[browsedCategories.length - 1] !== categories,
          }"
          @click="
            browsedCategories.pop();
            reversedMenu = true;
            selectedCategory = '';
          "
        >
          <i
            class="fal fa-arrow-left"
            :style="{ marginRight: '15px', fontSize: '20px' }"
          ></i>
          MAIN MENU
        </button>
        <p
          :style="{
            color: 'gray',
            marginLeft: '7px',
            textTransform: 'uppercase',
            color: '#fff',
            'font-size': '20px',
            'line-height': 1,
          }"
        >
          {{ selectedCategory }}
        </p>
        <!-- <transition-group class="list" name="list">
        <button
          class="list-item"
          v-for="(categories, key) in browsedCategories[browsedCategories.length - 1].categories"
          :key="key"
          :class="{active: key === $route.params.categoryName && categories.collection}"
          @click="handleButtonClick(categories, key); reversedMenu = false">
          <span>{{ categories.name || key }}</span>
          <i v-if="typeof categories.url === 'undefined'" :style="{ marginLeft: '10px' }" class="fal fa-chevron-right"></i>
        </button>
      </transition-group> -->
        <transition-group class="list" name="list">
          <button
            class="list-item"
            v-for="(categories, key) in browsedCategories[
              browsedCategories.length - 1
            ]"
            :key="key"
            :class="{ active: $route.path === categories.url }"
            @click="
              handleButtonClick(categories, key);
              reversedMenu = false;
            "
          >
            <span>{{ categories.name || key }}</span>
          </button>
        </transition-group>
      </nav>
      <div class="side-menu__footer">
        <router-link
          v-for="link in footerLinks"
          class="side-menu__footer-link"
          :to="getLinkPath(link.href)"
          :key="link.name"
        >
          {{ link.name }}
        </router-link>
        <br />
        <a
          href="https://www.facebook.com/bestveganmeat/"
          target="_blank"
          class="side-menu__footer-link side-menu__footer-link--social"
        >
          <i class="fab fa-facebook-f"></i>
        </a>
        <a
          href="https://www.instagram.com/bestveganmeat/"
          target="_blank"
          class="side-menu__footer-link side-menu__footer-link--social"
        >
          <i class="fab fa-instagram"></i>
        </a>
        <a
          href="https://twitter.com/bestveganmeat"
          target="_blank"
          class="side-menu__footer-link side-menu__footer-link--social"
        >
          <i class="fab fa-twitter"></i>
        </a>
        <a
          href="https://www.linkedin.com/company/bestveganmeat/"
          target="_blank"
          class="side-menu__footer-link side-menu__footer-link--social"
        >
          <i class="fab fa-linkedin"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Utils from '../utils.js'
import menuCategories from '@/menuCategories.js'

export default {
  name: 'SideMenu',
  props: {
    hidden: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data: function () {
    return {
      categories: {
        beef: {
          sample: { url: '/' }
        },
        chiken: {
          sample: { url: '/' }
        },
        pork: {
          sample: { url: '/' }
        },
        fish: {
          sample: { url: '/' }
        },
        burger: {
          sample: { url: '/' }
        },
        sausages: {
          sample: { url: '/' }
        },
        bacon: {
          sample: { url: '/' }
        },
        shop: menuCategories.categories
      },
      selectedCategory: '',
      reversedMenu: false,
      browsedCategories: [],
      footerLinks: [
        {
          name: 'contact',
          href: 'contact',
          disabled: true
        },
        {
          name: 'privacy',
          href: 'privacy',
          disabled: true
        }
      ]
    }
  },
  created () {
    this.browsedCategories.push(this.categories)
  },
  methods: {
    getSpecialClass (button) {
      return button.special ? 'side-menu__button--special' : ''
    },
    getMarginClass (button) {
      return button.margin ? 'side-menu__button--margin' : ''
    },
    isDisabled (button) {
      return button.disabled
    },
    getLinkPath (path) {
      return Utils.getLinkPath(path, this.$route)
    },
    handleButtonClick (newCategories, categoryName) {
      if (typeof newCategories.url === 'undefined') {
        if (
          newCategories.categories &&
          categoryName !== this.selectedCategory
        ) {
          this.$router.push(`/${categoryName}`)
        } else {
          this.selectedCategory = categoryName
          this.browsedCategories.push(newCategories)
        }
      } else {
        this.$router.push(newCategories.url)
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.side-menu {
  left: 0;
  top: 0;
  width: 350px;
  height: 100vh;
  box-sizing: border-box;
  text-align: left;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  text-transform: capitalize;
  background-color: #3D77C8;
  transition: transform 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  z-index: 13;
  padding: 15px 20px;
  box-shadow: 0 0 0 2000px rgba(0, 0, 0, 0.1);
  transform: translateX(0);
  position: fixed;

  &--hidden {
    transform: translateX(-100%);
    box-shadow: none;
  }

  &__content {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  &__header {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  &__close-btn {
    background: none;
    border: none;
    height: 35px;
    width: 35px;
    padding: 0;
    margin: 0;
    margin-right: 25px;
    cursor: pointer;
  }

  &__close-icon {
    width: 100%;
    height: 100%;
  }

  &__logo {
    width: 150px;
  }

  &__dropdown {
    box-sizing: border-box;
    max-height: 500px;
    padding-left: 10px;
    min-height: 66px;
    overflow: hidden;
    transition-duration: 0.2s;
    transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);

    &--closed {
      min-height: 0;
      max-height: 0;
    }
  }

  &__button {
    margin-top: 14px;
    width: 100%;
    box-sizing: border-box;
    padding-left: 19px;
    cursor: pointer;
    user-select: none;
    color: inherit;

    svg {
      margin-right: 5px;
      font-size: 1.4em;
    }

    a {
      display: flex;
      align-items: center;
      text-decoration: none;
      transition-duration: 0.2s;

      &:hover {
        opacity: 0.8;
      }
    }

    &--special {
      a {
        color: #ff4660;
        text-transform: none;
        text-transform: capitalize;
      }
    }

    &--margin {
      margin-top: 3em;

      p {
        display: inline-block;

        &::first-letter {
          text-transform: uppercase;
        }
      }
    }
  }

  &__footer {
    display: block;
    text-align: center;
    padding: 10px 0;
    font-family: 'Bebas Neue', cursive;
  }

  &__footer-link {
    display: inline-block;
    font-size: 15px;
    font-weight: 400;
    margin: 0 4px;
    text-transform: capitalize;
    color: #fff;
    text-decoration: none;

    &--social {
      margin: 10px 5px 0 5px;
      font-size: 16px;
      color: #fff;
    }
  }
}

.magic-menu {
  position: relative;
  min-height: 130px;
  background: transparent;
  box-sizing: border-box;
  overflow: hidden;
  transition: all 0.2s;
  margin-bottom: auto;
  margin-left: 10px;

  &--reversed {
    .list-enter {
      opacity: 0;
      transform: translateX(-200px);
    }

    .list-leave-to {
      transform: translateX(40px);
    }
  }

  p {
    font-family: 'Bebas Neue', cursive;
  }

  button {
    margin: 15px 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    font-size: 30px;
    color: #fff;
    border: none;
    background: transparent;
    font-family: 'Bebas Neue', cursive;
    line-height: 1;

    span {
      position: relative;
      margin: 0;
      text-transform: uppercase;
      text-align: left;
    }
  }

  .active span {
    color: #F0D764;
  }

  button.goBack {
    font-weight: 700;
    text-transform: capitalize;
    transition-duration: 0.2s;
    opacity: 0;
    width: 100%;
    text-align: left;
    padding: 9px 0;
    border-bottom: 1px solid #ddd;
    justify-content: flex-start;
    pointer-events: none;
  }

  button.goBack.visible {
    opacity: 1;
    left: 22px;
    pointer-events: all;
  }
}

.list {
  overflow: hidden;
  margin-top: 10px;
  display: block;
}

.list-item {
  display: block;
  margin-right: 10px;
  z-index: 2;
}

.list-enter-active, .list-leave-active {
  transition: all 0.5s;
}

.list-enter {
  opacity: 0;
  transform: translateX(200px);
}

.list-leave-to {
  transform: translateX(-40px);
}

.list-move {
  transition: transform 10s;
}

.list-leave-active {
  position: absolute;
  left: 0;
  opacity: 0;
  z-index: -1;
}

.downloadButton {
  font-size: 1.5em;
  font-weight: 400;
  margin-right: 6px;
}

@media screen and (max-width: 800px) {
  .magic-menu {
    overflow-y: auto;
  }
}

@media screen and (max-width: 350px) {
  .side-menu {
    width: 100%;
  }
}
</style>
