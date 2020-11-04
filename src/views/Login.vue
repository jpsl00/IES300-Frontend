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
              <form @submit.prevent="handleSubmit" class="box">
                <div class="field">
                  <label class="label">Nome de Usuário</label>
                  <div class="control has-icons-left">
                    <input
                      class="input"
                      type="text"
                      v-model="username"
                      name="username"
                      placeholder="Nome de Usuário"
                      :class="{
                        'is-danger': submitted && !username,
                        'is-loading': loggingIn,
                      }"
                      :disabled="loggingIn"
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
                      class="input"
                      type="password"
                      v-model="password"
                      name="password"
                      placeholder="Senha"
                      :class="{
                        'is-danger': submitted && !password,
                        'is-loading': loggingIn,
                      }"
                      :disabled="loggingIn"
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
                      :class="{ 'is-loading': loggingIn }"
                      :disabled="loggingIn"
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
import { Component, Vue } from "vue-property-decorator";

@Component({
  data() {
    return {
      username: "",
      password: "",
      submitted: false,
    };
  },
  computed: {
    loggingIn() {
      return this.$store.state.authentication.status.loggingIn;
    },
  },
  /* created() {
    // reset login status
    this.$store.dispatch("authentication/logout");
  }, */
  methods: {
    handleSubmit(e) {
      this.submitted = true;
      const { username, password } = this;
      const { dispatch } = this.$store;
      if (username && password) {
        dispatch("authentication/login", { username, password });
      }
    },
  },
})
export default class Login extends Vue {}
</script>
