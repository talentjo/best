<template>
  <div class="photoUploader">
    <input type="file" @change="filesChange($event.target.files)">
    <div
      v-if="files.length < 1"
      class="photoUploader__dropContainer"
      ref="dropContainer"
    >
      <p>Drop a picture here</p>
    </div>
    <div
      v-for="(file, index) in files"
      class="photoUploader__photo"
      :key="file.source + index">
      <img v-img-orientation-changer width="300" height="300" :src="file.source">
      <div v-if="file.isLoading" class="photoUploader__spinner">
        <i class="fal fa-spinner-third fa-spin"></i>
      </div>
      <div v-else class="photoUploader__menu">
        <!-- <i title="Move photo left" v-if="index > 0" @click="movePhotoLeft(index)" class="fal fa-arrow-left"></i> -->
        <i title="Delete photo" @click="deletePhoto(index)" class="fal fa-trash-alt"></i>
        <!-- <i title="Make photo main" v-if="index > 0" @click="makePhotoMain(index)" class="fal fa-crown"></i>
        <i title="Move photo right" v-if="index < files.length - 1" @click="movePhotoRight(index)" class="fal fa-arrow-right"></i> -->
      </div>
    </div>
  </div>
</template>

<script>
import httpClient from '@/services/httpClient'

export default {
  name: 'PhotoUploader',
  data: function () {
    return {
      files: []
    }
  },
  mounted () {
    ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach(evt => {
      this.$refs.dropContainer.addEventListener(evt, e => {
        e.preventDefault()
        e.stopPropagation()
      }, false)
    })

    this.$refs.dropContainer.addEventListener('drop', e => {
      this.files.push(e.dataTransfer.files[0])
      this.getImagePreviews()
    })
  },
  methods: {
    restorePictures (pictures) {
      if (typeof pictures !== 'undefined') {
        for (let picture of pictures) {
          let id = picture
          this.files.push({
            source: picture,
            id,
            processed: true,
            isLoading: false
          })
        }
      }
      this.emitModel()
    },
    getImagePreviews () {
      for (let i = 0; i < this.files.length; i++) {
        if (/\.(jpe?g|png|webp)$/i.test(this.files[i].name)) {
          let reader = new FileReader()
          reader.addEventListener('load', () => {
            this.files[i].source = reader.result
          }, false)

          if (!this.files[i].processed) {
            this.files[i].processed = true
            this.files[i].isLoading = true
            reader.readAsDataURL(this.files[i])
            this.uploadPhoto(i)
          }
        }
      }
    },
    // movePhotoLeft (photoIndex) {
    //   let i = photoIndex
    //   let tmp = this.files[i]
    //   this.files[i] = this.files[i - 1]
    //   this.files[i - 1] = tmp
    //   this.emitModel()
    //   this.$forceUpdate()
    // },
    // movePhotoRight (photoIndex) {
    //   let i = photoIndex
    //   let tmp = this.files[i]
    //   this.files[i] = this.files[i + 1]
    //   this.files[i + 1] = tmp
    //   this.emitModel()
    //   this.$forceUpdate()
    // },
    // makePhotoMain (photoIndex) {
    //   let i = photoIndex
    //   let tmp = this.files[i]
    //   this.files[i] = this.files[0]
    //   this.files[0] = tmp
    //   this.emitModel()
    //   this.$forceUpdate()
    // },
    deletePhoto (photoIndex) {
      this.files.splice(photoIndex, 1)
      this.emitModel()
    },
    filesChange (files) {
      [...files].map(file => {
        this.files.pop()
        this.files.push(file)
      })
      this.getImagePreviews()
    },
    uploadPhoto (fileIndex) {
      httpClient.post('/blobs', this.files[fileIndex])
        .then(response => {
          this.files[fileIndex].id = response.data.uri
          this.files[fileIndex].isLoading = false
          this.emitModel()
          this.$forceUpdate()
        })
        .catch(e => {
          console.error(e)
        })
    },
    emitModel () {
      let pictures = this.files.map(file => file.id)
      this.$emit('input', pictures)
    }
  }
}
</script>

<style scoped lang="stylus">
.photoUploader
  display block
  &__dropContainer // Because dropbox was already taken
    margin 15px auto 15px auto
    width 100%
    height auto
    padding 30px 80px
    border 1px dashed #ddd
    display flex
    flex-direction column
    align-items center
    justify-content center
    cursor default
  &__photo
    position relative
    width auto
    height 150px
    overflow hidden
    img
      height 300px
      position absolute
      top: 0
      object-fit cover
      left 0
    &--loading
      opacity .1
  &__menu
    position absolute
    display flex
    align-items center
    justify-content space-around
    bottom 0
    margin 0 auto
    padding 5px
    height 30px
    font-size 18px
    width 100%
    color black
    background rgba(255, 255, 255, .95)
    z-index 2
    i
      cursor pointer
  &__spinner
    position absolute
    width 40px
    font-size 40px
    height 40px
    top calc(50% - 20px)
    left calc(50% - 20px)
</style>
