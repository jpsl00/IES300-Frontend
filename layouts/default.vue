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
import { IAuthenticationUser } from '~/store/authentication'

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

  @authentication.State
  private user!: IAuthenticationUser

  created() {
    if (this.token) $axios.defaults.headers.common.authorization = this.token

    $axios.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err.response.status === 401 && this.$route.name !== 'login') {
          this.$store.dispatch('authentication/logout')
          this.$router.push('/')
        }
      }
    )

    this.checkToken()
  }

  async checkToken() {
    try {
      if (this.token) {
        const data = await $axios.$post('/auth/check')
        this.$store.commit('authentication/authSuccess', {
          ...data.data,
        })
        // if (res.status === 401) this.$store.dispatch('authentication/logout')
      }
    } catch (e) {
      this.$store.dispatch('authentication/logout')
    }
  }
}
</script>
