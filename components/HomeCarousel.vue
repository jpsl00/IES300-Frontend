<template>
  <b-carousel-list
    v-model="index"
    :data="data"
    :items-to-show="items"
    class="is-shadowless"
    autoplay="true"
    repeat
    @resize="onResize"
  >
    <template slot="item" slot-scope="list">
      <div class="p-3">
        <div class="card" :class="$attrs.background">
          <div class="card-image" :v-if="!!list.image">
            <figure class="image is-3by2">
              <img :src="list.image" :alt="list.title" />
            </figure>
          </div>
          <div class="card-content" :v-if="!!list.title || !!list.content">
            <div class="content">
              <p class="title is-5" :v-if="!!list.title">{{ list.title }}</p>
              <p class="subtitle is-6" :v-if="!!list.content">
                {{ list.content }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </b-carousel-list>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { ICarouselData } from '~/types/components/Carousel.interface'

@Component
export default class HomeCarousel extends Vue {
  private index = 0
  private items = 0
  private width = 0

  @Prop(Array) data!: ICarouselData[]

  onResize() {
    if (process.client) {
      this.width = window.innerWidth
      this.items = this.itemsToShow
    }
  }

  created() {
    if (process.client) {
      window.addEventListener('resize', this.onResize)
      this.onResize()
    }
  }

  destroyed() {
    if (process.client) window.removeEventListener('resize', this.onResize)
  }

  get itemsToShow() {
    if (process.client) {
      const pixels = this.width

      return pixels <= 500 ? 1 : pixels <= 768 ? 2 : 3
    } else return 3
  }
}
</script>

<style scoped>
.subtitle {
  min-height: 120px;
}
</style>
