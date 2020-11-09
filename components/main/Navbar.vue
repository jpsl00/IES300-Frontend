<template>
  <b-navbar transparent fixed-top>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img
          :src="require('@/assets/bioveda-logo-navbar.webp')"
          alt="Bioveda"
          width="112"
          height="28"
        />
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        Home
      </b-navbar-item>
      <b-navbar-item href="#"> Cursos </b-navbar-item>
      <b-navbar-dropdown label="Serviços" hoverable boxed collapsible>
        <b-navbar-item
          tag="router-link"
          :to="{ path: '/serviços/agendamento' }"
        >
          Agendamento
        </b-navbar-item>
      </b-navbar-dropdown>
      <b-navbar-item href="#"> Contato </b-navbar-item>
    </template>
    <template v-if="shouldShow" slot="end">
      <b-navbar-item>
        <b-button
          type="is-primary"
          icon-left="sign-in-alt"
          tag="router-link"
          to="/login"
        >
          Entrar
        </b-button>
      </b-navbar-item>
    </template>
    <template v-else slot="end">THIS IS AN ELSE</template>
  </b-navbar>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'

@Component()
export default class Navbar extends Vue {
  get shouldShow() {
    return this.$route.path !== '/login'
  }

  logout() {
    this.$store.dispatch('authentication/logout')
    location.reload()
  }
}
</script>

<style scoped>
strong {
  padding-left: 5px;
}
</style>
