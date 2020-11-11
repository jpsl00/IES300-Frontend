<template>
  <div>
    <section class="hero is-large has-background-white-ter has-inset-shadow">
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
              <ValidationObserver
                ref="observer"
                v-slot="{ handleSubmit, invalid }"
              >
                <section class="box">
                  <InputWithValidation
                    v-model="username"
                    rules="required|min:4|max:32"
                    maxlength="32"
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
                    maxlength="128"
                    type="password"
                    label="Senha"
                    vid="password"
                    icon="key"
                    :loading="isSubmitted"
                    :disabled="isSubmitted"
                  />

                  <div class="buttons mt-3">
                    <b-button
                      type="is-primary"
                      icon-left="sign-in-alt"
                      :loading="isSubmitted"
                      :disabled="invalid"
                      @click="handleSubmit(onSubmit)"
                    >
                      Entrar
                    </b-button>
                    <b-button
                      type="is-danger"
                      icon-left="redo"
                      :disabled="isSubmitted"
                      @click="onResetForm"
                    >
                      Limpar
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
  // ! These are necessary because TS...
  [x: string]: any
  $refs!: {
    observer: InstanceType<typeof ValidationObserver>
  }

  private username = ''
  private password = ''
  private isSubmitted = false

  private timeoutId!: NodeJS.Timeout

  @authentication.Getter
  private authStatus!: string

  get isLoggingIn() {
    return this.authStatus === 'loading'
  }

  onSubmit() {
    if (this.username && this.password) {
      if (this.timeoutId) clearTimeout(this.timeoutId)
      this.isSubmitted = true
      this.$store.dispatch('authentication/login', {
        username: this.username,
        password: this.password,
      })
      this.timeoutId = setTimeout(() => {
        this.isSubmitted = false
        this.$buefy.toast.open({
          duration: 3000,
          message: 'Houve um erro inesperado, por favor tente novamente',
          type: 'is-warning',
          position: 'is-bottom-right',
          queue: false,
        })
      }, 30000)
    }
  }

  onResetForm() {
    this.username = ''
    this.password = ''
    this.isSubmitted = false
    requestAnimationFrame(() => {
      this.$refs.observer.reset()
    })
  }

  @Watch('authStatus')
  onAuthStatusChanged(status: string) {
    if (status === 'error') {
      if (this.timeoutId) clearTimeout(this.timeoutId)
      this.$buefy.toast.open({
        duration: 3000,
        message: 'Usuário/Senha incorretos',
        type: 'is-danger',
        position: 'is-bottom-right',
        queue: false,
      })
      this.isSubmitted = false
    } else if (status === 'success') {
      if (this.timeoutId) clearTimeout(this.timeoutId)
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

  created() {
    if (this.authStatus === 'success') this.$router.go(-1)
  }
}
</script>
