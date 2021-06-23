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
        :active="this.$route.name === 'index'"
      >
        Home
      </b-navbar-item>
      <b-navbar-item href="#" disabled> Cursos </b-navbar-item>
      <b-navbar-dropdown label="Serviços" hoverable boxed collapsible>
        <b-navbar-item
          tag="router-link"
          :to="{ path: '/servicos/agendamento' }"
        >
          Agendamento
        </b-navbar-item>
      </b-navbar-dropdown>
      <b-navbar-item href="#" disabled> Contato </b-navbar-item>
    </template>
    <template v-if="!isLoggedIn" slot="end">
      <b-navbar-item tag="div">
        <b-button
          type="is-primary"
          icon-left="sign-in-alt"
          tag="router-link"
          to="/login"
          :disabled="this.$route.name === 'login'"
        >
          Entrar
        </b-button>
      </b-navbar-item>
    </template>
    <template v-else slot="end">
      <!-- <b-navbar-item class="is-unselectable" tag="div">
        Bem-vindo, <strong>{{ user ? user.name : '' }}</strong>
      </b-navbar-item> -->
      <b-navbar-item tag="div" class="b-tooltips">
        <!-- <div class="buttons"> -->
        <b-tooltip label="Editar Dados" position="is-bottom">
          <b-button
            type="is-primary"
            icon-left="user-circle"
            tag="router-link"
            to="/perfil"
            >{{ user ? user.name : '' }}</b-button
          >
        </b-tooltip>

        <b-tooltip
          label="Sair do Sistema"
          type="is-danger"
          position="is-bottom"
        >
          <b-button
            type="is-danger"
            icon-left="sign-out-alt"
            :disabled="this.$route.name === 'login'"
            @click="logout"
          >
            Sair
          </b-button>
        </b-tooltip>
        <!-- </div> -->
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
    return this.$route.name !== 'login'
  }

  logout() {
    this.$store.dispatch('authentication/logout')
    location.reload()
  }
}
</script>

<style lang="scss" scoped>
strong {
  padding-left: 5px;
}

.b-tooltips {
  .b-tooltip:not(:last-child) {
    margin-right: 0.5em;
  }
}
</style>
