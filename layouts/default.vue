<template>
  <div>
    <NavbarComponent />
    <nuxt />
    <FooterComponent />
  </div>
</template>

<script lang="ts">
import { Component, Vue, namespace } from 'nuxt-property-decorator'

// Components
import NavbarComponent from '@/components/main/Navbar.vue'
import FooterComponent from '@/components/main/Footer.vue'

import { $axios } from '~/utils/api'

const authentication = namespace('authentication')

@Component({
  components: {
    NavbarComponent,
    FooterComponent,
  },
})
export default class DefaultLayout extends Vue {
  @authentication.State
  private token!: string

  created() {
    if (this.token) $axios.defaults.headers.common.authorization = this.token

    $axios.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err.response.status === 401) {
          this.$store.dispatch('authentication/logout')
          this.$router.push('/')
        }
      }
    )

    this.checkToken()
  }

  async checkToken() {
    try {
      await $axios.$post('/auth/check')

      // if (res.status === 401) this.$store.dispatch('authentication/logout')
    } catch (e) {
      this.$store.dispatch('authentication/logout')
    }
  }
}
</script>
