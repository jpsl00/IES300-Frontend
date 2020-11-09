<template>
  <div>
    <section class="hero is-medium">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered is-multiline">
            <!-- Tabela de usuários -->
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
            <!-- Novo Formulário de login -->
            <div class="column is-12-mobile is-6-desktop">
              <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
                <!-- <section class="section">
                  <InputWithValidationComponent
                    v-model="username"
                    rules="required"
                    type="text"
                    label="Nome de Usuário"
                    vid="username"
                  />
                </section> -->
                <section class="box">
                  <InputWithValidation
                    v-model="username"
                    rules="required|min:4|max:32"
                    type="text"
                    label="Nome de Usuário"
                    vid="username"
                    icon="user"
                    :loading="isSubmitted"
                    :disabled="isSubmitted"
                  />
                  <InputWithValidation
                    v-model="password"
                    rules="required|min:6|max:128"
                    type="password"
                    label="Senha"
                    vid="password"
                    icon="key"
                    :loading="isSubmitted"
                    :disabled="isSubmitted"
                  />

                  <div class="buttons">
                    <b-button
                      type="is-primary"
                      icon-left="sign-in-alt"
                      :loading="isSubmitted"
                      @click="handleSubmit(onSubmit)"
                    >
                      Entrar
                    </b-button>
                  </div>
                </section>
              </ValidationObserver>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue, namespace, Watch } from 'nuxt-property-decorator'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import InputWithValidationComponent from '@/components/inputs/InputWithValidation.vue'

const authentication = namespace('authentication')

@Component({
  components: {
    ValidationObserver,
    ValidationProvider,
    InputWithValidationComponent,
  },
})
export default class Login extends Vue {
  [x: string]: any
  private username = ''
  private password = ''
  private isSubmitted = false

  @authentication.Getter
  private authStatus!: string

  get isLoggingIn() {
    // return authenticationStore.status === 'loading'
    return this.authStatus === 'loading'
  }

  onSubmit() {
    if (this.username && this.password) {
      this.isSubmitted = true
      this.$store.dispatch('authentication/login', {
        username: this.username,
        password: this.password,
      })
    }
  }

  @Watch('authStatus')
  onAuthStatusChanged(status: string) {
    if (status === 'error') {
      this.$buefy.toast.open({
        duration: 3000,
        message: 'Usuário/Senha incorretos',
        type: 'is-danger',
        position: 'is-bottom-right',
        queue: false,
      })
      this.isSubmitted = false
    } else if (status === 'success') {
      this.$buefy.toast.open({
        duration: 3000,
        message: 'Logado com sucesso, redirecionando em 3 segundos...',
        type: 'is-success',
        position: 'is-bottom-right',
        queue: false,
      })
      setTimeout(() => this.$router.push('/'), 4000)
    }
  }
}
</script>
