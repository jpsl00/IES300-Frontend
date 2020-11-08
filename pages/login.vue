<template>
  <div>
    <section class="hero is-medium">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-12-mobile is-6-desktop">
              <div class="box">
                <div class="content">
                  <p class="subtitle is-6">Logins para teste:</p>
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Usuário</th>
                        <th>Senha</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>cliente1</td>
                        <td>123456</td>
                      </tr>
                      <tr>
                        <td>cliente2</td>
                        <td>123456</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="column is-12-mobile is-6-desktop">
              <form class="box" @submit.prevent="handleSubmit">
                <b-field label="Nome de Usuário"> </b-field>
                <div class="field">
                  <label class="label">Nome de Usuário</label>
                  <div class="control has-icons-left">
                    <input
                      v-model="username"
                      class="input"
                      type="text"
                      name="username"
                      placeholder="Nome de Usuário"
                      :class="{
                        'is-danger': !username,
                        'is-loading': isLoggingIn,
                      }"
                      :disabled="isLoggingIn"
                    />
                    <span class="icon is-small is-left">
                      <i class="fas fa-user"></i>
                    </span>
                  </div>
                </div>
                <div class="field">
                  <label class="label">Senha</label>
                  <div class="control has-icons-left">
                    <input
                      v-model="password"
                      class="input"
                      type="password"
                      name="password"
                      placeholder="Senha"
                      :class="{
                        'is-danger': !password,
                        'is-loading': isLoggingIn,
                      }"
                      :disabled="isLoggingIn"
                    />
                    <span class="icon is-small is-left">
                      <i class="fas fa-key"></i>
                    </span>
                  </div>
                </div>
                <div class="field is-grouped">
                  <div class="control">
                    <button
                      class="button is-link"
                      :class="{ 'is-loading': isLoggingIn }"
                      :disabled="isLoggingIn"
                    >
                      Entrar
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { authenticationStore } from '~/store'

@Component
export default class Login extends Vue {
  private username = ''
  private password = ''

  get isLoggingIn() {
    return authenticationStore.status === 'loading'
  }

  handleSubmit() {
    if (this.username && this.password)
      this.$store.dispatch('authentication/login', {
        username: this.username,
        password: this.password,
      })
  }
}
</script>
