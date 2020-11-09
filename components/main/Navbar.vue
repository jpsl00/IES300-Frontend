<template>
  <div>
    <b-navbar transparent fixed-top>
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img
            :src="require('@/assets/bioveda-logo.png')"
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
        <b-navbar-dropdown label="Serviços" hoverable boxed>
          <b-navbar-item
            tag="router-link"
            :to="{ path: '/serviços/agendamento' }"
          >
            Agendamento
          </b-navbar-item>
        </b-navbar-dropdown>
        <b-navbar-item href="#"> Contato </b-navbar-item>
      </template>
      <template v-show="shouldShow" slot="end">
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
    </b-navbar>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  computed: {},
  methods: {
    logout() {
      this.$store.dispatch('authentication/logout')
      location.reload()
    },
  },
})
export default class Navbar extends Vue {
  get shouldShow() {
    return this.$route.path !== '/login'
  }
}
</script>

<style scoped>
strong {
  padding-left: 5px;
}
</style>
