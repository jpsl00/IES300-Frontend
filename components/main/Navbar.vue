<template>
  <b-navbar transparent fixed-top shadow>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }" class="mr-3">
        <img
          :src="require('@/assets/bioveda-logo-navbar.webp')"
          alt="Bioveda"
        />
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item
        tag="router-link"
        :to="{ path: '/' }"
        :active="this.$route.path === '/'"
      >
        Home
      </b-navbar-item>
      <b-navbar-item href="#"> Cursos </b-navbar-item>
      <b-navbar-dropdown label="Serviços" hoverable boxed collapsible>
        <b-navbar-item
          tag="router-link"
          :to="{ path: '/servicos/agendamento' }"
        >
          Agendamento
        </b-navbar-item>
      </b-navbar-dropdown>
      <b-navbar-item href="#"> Contato </b-navbar-item>
    </template>
    <template v-if="!isLoggedIn" slot="end">
      <b-navbar-item tag="div">
        <b-button
          type="is-primary"
          icon-left="sign-in-alt"
          tag="router-link"
          to="/login"
          :disabled="this.$route.path === '/login'"
        >
          Entrar
        </b-button>
      </b-navbar-item>
    </template>
    <template v-else slot="end">
      <b-navbar-item class="is-unselectable" tag="div">
        Bem-vindo, <strong>{{ user ? user.name : '' }}</strong>
      </b-navbar-item>
      <b-navbar-item tag="div">
        <div class="buttons">
          <b-button
            type="is-danger"
            icon-left="sign-out-alt"
            :disabled="this.$route.path === '/login'"
            @click="logout"
          >
            Sair
          </b-button>
        </div>
      </b-navbar-item>
    </template>
    <!-- <template v-else slot="end">THIS IS AN ELSE</template> -->
  </b-navbar>
</template>

<script lang="ts">
import { Component, Vue, namespace } from 'nuxt-property-decorator'
import { IAuthenticationUser } from '~/store/authentication'

const authentication = namespace('authentication')

@Component
export default class Navbar extends Vue {
  @authentication.Getter
  private isLoggedIn!: Boolean

  @authentication.State
  private user!: IAuthenticationUser

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
