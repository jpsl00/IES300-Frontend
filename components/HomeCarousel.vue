<template>
  <b-carousel-list
    v-model="index"
    :data="data"
    :items-to-show="itemsToShow"
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
/* import { useWindowSize } from '@vueuse/core' */
import { ICarouselData } from '~/types/components/Carousel.interface'

@Component
export default class HomeCarousel extends Vue {
  private index = 0
  /* private items = 3 */

  @Prop(Array) data!: ICarouselData[]

  get itemsToShow() {
    if (process.client) {
      //const { width } = useWindowSize()
      //const pixels: number = width.value
      const pixels = window.innerWidth

      return pixels <= 500 ? 1 : pixels <= 768 ? 2 : 3
    } else return 3
  }

  /* onResize() {
    this.items = this.itemsToShow()
  } */
}
</script>

<style scoped>
.subtitle {
  min-height: 120px;
}
</style>
