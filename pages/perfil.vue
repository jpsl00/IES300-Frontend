<template>
  <div>
    <section class="hero is-medium has-background-white-ter has-inset-shadow">
      <div class="hero-body">
        <div class="container">
          <!-- Novo Formulário de login -->
          <ValidationObserver
            ref="observer"
            v-slot="{ handleSubmit, invalid }"
            tag="div"
            class="columns is-centered is-multiline"
          >
            <!-- Dados Principais -->
            <div class="column is-12-touch is-6-desktop">
              <div class="columns is-centered is-multiline">
                <div class="column is-12">
                  <section class="box">
                    <InputWithValidation
                      v-model="user.name"
                      mode="passive"
                      rules="required|min:4|max:128"
                      maxlength="128"
                      type="text"
                      label="Nome"
                      vid="name"
                      icon="user-tag"
                      :loading="isSubmitted"
                      disabled
                    />
                    <InputWithValidation
                      v-model="user.birthdate"
                      mode="passive"
                      rules="required|max:128"
                      maxlength="128"
                      type="date"
                      label="Data de Nascimento"
                      vid="birthdate"
                      icon="birthday-cake"
                      :loading="isSubmitted"
                      disabled
                    />
                    <InputsInputWithValidation
                      v-model="email"
                      mode="eager"
                      rules="required|email|max:128"
                      maxlength="128"
                      type="email"
                      label="E-Mail"
                      vid="email"
                      icon="at"
                      :loading="isSubmitted"
                      :disabled="isSubmitted"
                    />
                    <InputWithValidation
                      v-model="telephone"
                      mode="eager"
                      :rules="{
                        required: true,
                        max: 15,
                        regex: /(\(?\d{2}\)?\s)?(\d{4,5}\-{0,1}\d{4})/,
                      }"
                      maxlength="15"
                      type="text"
                      label="Telefone"
                      vid="telephone"
                      icon="phone"
                      :loading="isSubmitted"
                      :disabled="isSubmitted"
                    />
                    <InputWithValidation
                      v-model="address"
                      mode="eager"
                      rules="required|max:256"
                      maxlength="256"
                      type="text"
                      label="Endereço"
                      vid="address"
                      icon="map-marker-alt"
                      :loading="isSubmitted"
                      :disabled="isSubmitted"
                    />
                    <!-- <InputWithValidation
                  v-model="user.username"
                  mode="passive"
                  disabled
                  rules="required|min:4|max:32"
                  maxlength="32"
                  type="text"
                  label="Nome de Usuário"
                  vid="username"
                  icon="user"
                  :loading="isSubmitted"
                /> -->
                    <!-- <InputWithValidation
                    v-model="user.password"
                    rules="required|min:6|max:128"
                    maxlength="128"
                    type="password"
                    label="Senha"
                    vid="password"
                    icon="key"
                    :loading="isSubmitted"
                    :disabled="isSubmitted"
                  /> -->
                  </section>
                </div>
                <!-- Botões do Form -->
                <div class="column is-12 is-hidden-touch">
                  <section class="box">
                    <div class="buttons">
                      <b-button
                        type="is-success"
                        icon-left="sign-in-alt"
                        :loading="isSubmitted"
                        :disabled="invalid"
                        @click="handleSubmit(onSubmit)"
                      >
                        Salvar
                      </b-button>
                      <b-button
                        type="is-danger"
                        icon-left="redo"
                        :disabled="isSubmitted"
                        @click="onResetForm"
                      >
                        Cancelar
                      </b-button>
                    </div>
                  </section>
                </div>
              </div>
            </div>
            <div v-if="user.role === 1" class="column is-12-touch is-6-desktop">
              <section class="box">
                <PartnerTimePicker
                  v-for="(hour, idx) in workHours"
                  :key="idx"
                  :default="hour"
                  :vid="idx"
                  :loading="isSubmitted"
                  :reset="isReset"
                  @input="onWorkHourInput"
                />
              </section>
            </div>
            <div class="column is-12 is-hidden-desktop">
              <section class="box">
                <div class="buttons">
                  <b-button
                    type="is-success"
                    icon-left="sign-in-alt"
                    :loading="isSubmitted"
                    :disabled="invalid"
                    @click="handleSubmit(onSubmit)"
                  >
                    Salvar
                  </b-button>
                  <b-button
                    type="is-danger"
                    icon-left="redo"
                    :disabled="isSubmitted"
                    @click="onResetForm"
                  >
                    Cancelar
                  </b-button>
                </div>
              </section>
            </div>
          </ValidationObserver>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue, namespace, Watch } from 'nuxt-property-decorator'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import InputWithValidation from '@/components/inputs/InputWithValidation.vue'
import PartnerTimePicker from '@/components/inputs/PartnerTimePicker.vue'
import { IAuthenticationUser } from '~/store/authentication'

const authentication = namespace('authentication')

@Component({
  components: {
    ValidationObserver,
    ValidationProvider,
    InputWithValidation,
    PartnerTimePicker,
  },
  middleware: ['auth'],
})
export default class Perfil extends Vue {
  // ! These are necessary because TS...
  [x: string]: any

  $refs!: {
    observer: InstanceType<typeof ValidationObserver>
  }

  public isSubmitted = false
  public isReset = false

  @authentication.State
  private user!: IAuthenticationUser

  @authentication.Getter
  private readonly isClient!: boolean

  @authentication.Getter
  private readonly isPartner!: boolean

  @authentication.Getter
  private readonly authStatus!: string

  public email: string = ''
  public telephone: string = ''
  public address: string = ''
  public workHours: Object[] = []

  onSubmit() {
    if (this.timeoutId) clearTimeout(this.timeoutId)
    this.isSubmitted = true

    this.$store.dispatch('authentication/edit', {
      email: this.email,
      telephone: this.telephone,
      address: this.address,
      workHours: {
        days: this.workHours,
      },
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

  onWorkHourInput(val: {
    id: number
    day: number
    start: number
    end: number
  }) {
    this.workHours[val.id] = { day: val.day, start: val.start, end: val.end }
  }

  onResetForm() {
    this.isSubmitted = false
    this.isReset = true
    this.email = this.user.email
    this.telephone = this.user.telephone
    this.address = this.user.address
    this.workHours = [...this.user.workHours?.days]

    requestAnimationFrame(() => {
      this.$refs.observer.reset()
    })

    setTimeout(() => {
      this.isReset = false
    }, 1)
  }

  @Watch('authStatus')
  onAuthStatusChanged(status: string) {
    if (status === 'error') {
      if (this.timeoutId) clearTimeout(this.timeoutId)
      this.isSubmitted = false
      this.$buefy.toast.open({
        duration: 3000,
        message: 'Houve um erro inesperado, por favor tente novamente',
        type: 'is-warning',
        position: 'is-bottom-right',
        queue: false,
      })
    } else if (status === 'success') {
      if (this.timeoutId) clearTimeout(this.timeoutId)
      this.isSubmitted = false
      this.$buefy.toast.open({
        duration: 3000,
        message: 'Dados atualizados com sucesso!',
        type: 'is-success',
        position: 'is-bottom-right',
        queue: false,
      })
    }
  }

  mounted() {
    this.email = this.user.email
    this.telephone = this.user.telephone
    this.address = this.user.address
    this.workHours = [...this.user.workHours?.days]
  }
}
</script>
