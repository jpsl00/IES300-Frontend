<template>
  <nav class="navbar is-transparent is-fixed-top">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <img
          :src="require('@/assets/bioveda-logo.png')"
          alt="Bulma: a modern CSS framework based on Flexbox"
          width="112"
          height="28"
        />
      </router-link>
      <div class="navbar-burger burger" data-target="main-navbar">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div id="main-navbar" class="navbar-menu">
      <div class="navbar-start">
        <router-link class="navbar-item" to="/"> Home </router-link>
        <a class="navbar-item"> Cursos </a>
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link"> Serviços </a>
          <div class="navbar-dropdown is-boxed">
            <router-link class="navbar-item" to="/serviços/agendamento">
              Agendamento
            </router-link>
            <hr v-show="isLoggedIn && isPartner" class="navbar-divider" />
            <router-link
              v-show="isLoggedIn && isPartner && !isEmployee"
              class="navbar-item"
              to="/gerência/parceiro/consultas"
            >
              Gerenciar Consultas
            </router-link>
            <router-link
              v-show="isLoggedIn && isEmployee"
              class="navbar-item"
              to="/gerência/funcionário/agendamentos"
            >
              Gerenciar Agendamentos
            </router-link>
          </div>
        </div>

        <a class="navbar-item"> Blog </a>
      </div>

      <div v-show="!isLoggedIn" class="navbar-end">
        <div class="navbar-item">
          <div class="field is-grouped">
            <b-button type="is-primary" icon-left="sign-in-alt" to="/login"
              >Entrar</b-button
            >
            <!--             <p class="control">
              <router-link class="button is-primary" to="/login">
                <span class="icon">
                  <i class="fas fa-sign-in-alt"></i>
                </span>
                <span>Entrar</span>
              </router-link>
            </p> -->
          </div>
        </div>
      </div>
      <div v-show="isLoggedIn" class="navbar-end">
        <div class="navbar-item">
          Bem-vindo, <strong>{{ user.name }}</strong>
        </div>
        <div class="navbar-item">
          <div class="field is-grouped">
            <p class="control">
              <a class="button is-danger" @click="logout">
                <span class="icon">
                  <i class="fas fa-sign-out-alt"></i>
                </span>
                <span>Sair</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  computed: {
    user() {
      return {}
    },
    isPartner() {
      return false
    },
    isEmployee() {
      return false
    },
    isLoggedIn() {
      return false
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('authentication/logout')
      location.reload()
    },
  },
})
export default class Navbar extends Vue {}
</script>

<style scoped>
strong {
  padding-left: 5px;
}
</style>
