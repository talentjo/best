<template>
  <div class="addBurgerPage">
    <div class="addBurgerPage__description">
      <h1>Would you like to see your favourite burger on this rank?</h1>
      <p>
        Do you make plant-based burgers and want to answer your reviews and improve your listing? Just go to ethical.id and easily add it to the listing.
        <br>
        Upload your favourite vegan burger and brand on ethical.id and help others discovering it!
      </p>
      <span>
        <a href="https://ethical.id" target="_blank"><img src="../assets/getEthical.png" height="50"/></a>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddBurgerPage'
}
</script>

<style scoped lang="stylus">
.addBurgerPage
  display flex
  background white
  align-items flex-start
  overflow-y auto
  justify-content center
  height 100%
  flex-wrap wrap
  padding-bottom 50px
  box-sizing border-box
  &__banner
    margin-top 50px
    display flex
    align-items center
  &__description
    text-align left
    max-width 450px
    color #555
    font-size 14px
    h1
      font-size 32px
      font-weight 300
      color black
    span
      margin-right 15px
      img
        margin-top 10px

@media screen and (max-width: 668px)
  .addBurgerPage
    padding 30px 5px
    align-items flex-start
    &__description
      padding 30px 0 0 20px
</style>
