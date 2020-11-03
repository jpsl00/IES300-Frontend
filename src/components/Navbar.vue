<template>
  <nav class="navbar is-transparent is-fixed">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <img
          :src="require('@/assets/bioveda-logo.png')"
          alt="Bulma: a modern CSS framework based on Flexbox"
          width="112"
          height="28"
        />
      </router-link>
      <div
        class="navbar-burger burger"
        data-target="navbarExampleTransparentExample"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div id="navbarExampleTransparentExample" class="navbar-menu">
      <div class="navbar-start">
        <router-link class="navbar-item" to="/">
          Home
        </router-link>
        <a class="navbar-item">
          Cursos
        </a>
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            Serviços
          </a>
          <div class="navbar-dropdown is-boxed">
            <router-link class="navbar-item" to="/serviços/agendamento">
              Agendamento
            </router-link>
          </div>
        </div>
        <a class="navbar-item">
          Blog
        </a>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="field is-grouped">
            <p class="control">
              <a class="button is-primary">
                <span class="icon">
                  <i class="fas fa-sign-in-alt"></i>
                </span>
                <span>Entrar</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class Navbar extends Vue {}
</script>
