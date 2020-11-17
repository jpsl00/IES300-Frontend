<template>
  <ValidationObserver
    ref="observer"
    v-slot="{ handleSubmit, invalid }"
    class="modal-card"
  >
    <!-- <div class="modal-card" style="width: auto"> -->
    <header class="modal-card-head">
      <p class="modal-card-title">
        {{
          modalConfig && modalConfig.title ? modalConfig.title : '༼ つ ◕_◕ ༽つ'
        }}
      </p>
    </header>
    <section class="modal-card-body">
      <b-field v-show="isPartner || isFull" grouped group-multiline expanded>
        <b-field label="Nome" expanded>
          <b-input
            :value="data.personal.name"
            :loading="isSubmitted"
            disabled
            icon="user"
          />
        </b-field>
        <b-field v-show="!isPartner || isEmployee" label="E-Mail" expanded>
          <b-input
            :value="data.personal.email"
            :loading="isSubmitted"
            disabled
            icon="envelope"
          />
        </b-field>
      </b-field>
      <b-field v-show="isFull && !isPartner" grouped group-multiline expanded>
        <b-field label="Endereço" expanded>
          <b-input
            :value="data.personal.address"
            :loading="isSubmitted"
            disabled
            icon="map"
          />
        </b-field>
        <b-field label="Telefone" expanded>
          <b-input
            :value="data.personal.telephone"
            :loading="isSubmitted"
            disabled
            icon="phone"
          />
        </b-field>
      </b-field>
      <hr v-show="isFull && !isPartner" />
      <b-field grouped group-multiline>
        <b-field expanded>
          <InputWithValidation
            v-model="data.personal.weight"
            label="Peso"
            rules="required|min_value:1|max_value:250"
            type="number"
            vid="weight"
            icon="weight"
            input-expanded
            :disabled="
              !isAllowEditing || isPartner || isEmployee || isSubmitted
            "
            :loading="isSubmitted"
          >
            <template slot="addon">
              <p class="control">
                <b-button disabled>Kg</b-button>
              </p>
            </template>
          </InputWithValidation>
        </b-field>
        <b-field expanded>
          <InputWithValidation
            v-model="data.personal.height"
            label="Altura"
            rules="required|min_value:1|max_value:3"
            type="number"
            vid="height"
            icon="ruler"
            input-expanded
            :disabled="
              !isAllowEditing || isPartner || isEmployee || isSubmitted
            "
            :loading="isSubmitted"
          >
            <template slot="addon">
              <p class="control">
                <b-button disabled>m</b-button>
              </p>
            </template>
          </InputWithValidation>
        </b-field>
        <b-field v-show="isPartner || isFull" label="Idade" expanded>
          <b-input
            type="number"
            field-expanded
            :value="userAge"
            disabled
            icon="birthday-cake"
            :loading="isSubmitted"
          />
        </b-field>
      </b-field>
      <hr v-show="isPartner || isFull" />
      <b-field v-show="isPartner || isFull" grouped group-multiline>
        <b-field expanded>
          <InputWithValidation
            v-model="data.medical.language"
            :rules="isEmployee && isAllowEditing ? 'required' : ''"
            type="text"
            label="Língua"
            vid="language"
            icon="language"
            field-expanded
            :disabled="!isAllowEditing || !isEmployee || isSubmitted"
            :loading="isSubmitted"
          />
        </b-field>
        <b-field expanded>
          <InputWithValidation
            v-model="data.medical.pulse"
            :rules="isEmployee && isAllowEditing ? 'required' : ''"
            type="text"
            label="Pulso"
            vid="pulse"
            icon="heartbeat"
            field-expanded
            :disabled="!isAllowEditing || !isEmployee || isSubmitted"
            :loading="isSubmitted"
          />
        </b-field>
      </b-field>
      <b-field v-show="isPartner || isFull" grouped group-multiline>
        <b-field expanded>
          <InputWithValidation
            :rules="isEmployee && isAllowEditing ? 'required' : ''"
            type="text"
            label="Dosha"
            vid="dosha"
          >
            <template slot="input">
              <b-taginput
                v-model="data.medical.dosha"
                icon="flask"
                :loading="isSubmitted"
                :disabled="!isAllowEditing || !isEmployee || isSubmitted"
                expanded
                type="is-primary"
              >
              </b-taginput>
            </template>
          </InputWithValidation>
        </b-field>
        <b-field expanded>
          <InputWithValidation
            :rules="isEmployee && isAllowEditing ? 'required' : ''"
            type="text"
            label="Especialistas"
            vid="partners"
          >
            <template slot="input">
              <b-taginput
                v-model="recommendations"
                :allow-new="false"
                autocomplete
                allow-duplicates
                open-on-focus
                :data="partners"
                field="field"
                icon="user-md"
                :loading="isSubmitted"
                :disabled="!isAllowEditing || !isEmployee || isSubmitted"
                expanded
                type="is-primary"
              >
              </b-taginput>
            </template>
          </InputWithValidation>
        </b-field>
      </b-field>
      <hr />
      <InputWithValidation
        v-model="data.complaint.text"
        rules="required|min:25|max:2500"
        type="textarea"
        label="Problemas Atuais"
        vid="complaint"
        field-expanded
        maxlength="2500"
        placeholder="Principais problemas que se apresentam no momento (o que o motivou a procurar ajuda)"
        :disabled="!isAllowEditing || isPartner || isEmployee || isSubmitted"
        :loading="isSubmitted"
      >
      </InputWithValidation>
      <SelectWithValidation
        v-model="data.complaint.type"
        rules="required"
        label="Estado dos Problemas"
        :input-disabled="
          !isAllowEditing || isPartner || isEmployee || isSubmitted
        "
        :loading="isSubmitted"
      >
        <option value="1">Estáveis</option>
        <option value="2">Flutuantes</option>
        <option value="3">Gradualmente Melhorando</option>
        <option value="4">Gradualmente Piorando</option>
        <option value="5">Rapidamente Melhorando</option>
        <option value="6">Rapidamente Piorando</option>
      </SelectWithValidation>
    </section>
    <footer class="modal-card-foot">
      <b-button
        :type="
          modalConfig && modalConfig.button
            ? modalConfig.button.type
            : 'is-primary'
        "
        :disabled="invalid"
        :loading="isSubmitted"
        :label="
          modalConfig && modalConfig.button
            ? modalConfig.button.text
            : '¯\\_(ツ)_/¯'
        "
        @click="handleSubmit(onSubmit)"
      />
      <b-button
        type="is-danger"
        :disabled="isSubmitted"
        @click="$emit('close')"
      >
        Cancelar
      </b-button>
      <!-- <b-button type="is-warning" :disabled="isSubmitted" @click="onResetForm">
        Limpar
      </b-button> -->
    </footer>
    <!-- </div> -->
  </ValidationObserver>
</template>

<script lang="ts">
import { Component, Vue, Prop, namespace } from 'nuxt-property-decorator'
import { ValidationObserver } from 'vee-validate'
import InputWithValidation from '@/components/inputs/InputWithValidation.vue'
import SelectWithValidation from '@/components/inputs/SelectWithValidation.vue'
import {
  IAuthenticationUser,
  EAuthenticationPermissionLevel,
} from '~/store/authentication'
import { $axios } from '~/utils/api'

const authentication = namespace('authentication')

@Component({
  components: {
    ValidationObserver,
    InputWithValidation,
    SelectWithValidation,
  },
})
export default class NewAppointmentModalComponent extends Vue {
  $refs!: {
    observer: InstanceType<typeof ValidationObserver>
  }

  @authentication.State
  private user!: IAuthenticationUser

  @authentication.Getter
  private role!: EAuthenticationPermissionLevel

  public data = {
    id: 0,
    personal: {
      client: 0,
      name: '',
      email: '',
      address: '',
      telephone: '',
      weight: '',
      height: '',
      age: '',
    },
    medical: {
      pulse: '',
      language: '',
      dosha: [],
      recommendations: [''],
    },
    complaint: {
      text: '',
      type: '',
    },
  }

  public partners = []
  public recommendations: string[] = []

  public isSubmitted = false

  @Prop(Object) readonly passedData!: Object

  @Prop(Boolean) readonly isFull!: Boolean

  @Prop(Boolean) readonly isAllowEditing!: Boolean

  @Prop(Object) readonly modalConfig!: IAppointmentModalConfig

  async fetch() {
    this.partners = (await $axios.$get('/partner/')).data
    this.recommendations = this.data.medical.recommendations?.map((v) =>
      this.partners.find((va: any) => `${va.id}` === v)
    ) as any[]
  }

  fetchOnServer = false

  mounted() {
    this.data = { ...this.data, ...this.passedData }

    if (!(this.partners?.length > 0)) this.$fetch()
    if (!this.data.personal.client) this.data.personal.client = this.user.id
    if (!this.data.personal.name) this.data.personal.name = this.user.name
    if (!this.data.personal.email) this.data.personal.email = this.user.email
    if (!this.data.personal.age)
      this.data.personal.age = this.userAge.toString()
  }

  onSubmit() {
    this.isSubmitted = true
    this.data.medical.recommendations = [
      ...this.recommendations.map((v: any) => (v ? `${v.id}` : '')),
    ]
    const data = this.data
    this.$emit('success', data, this)
  }
  /*
  onResetForm() {
    this.data = {
      personal: {
        name: '',
        email: '',
        address: '',
        telephone: '',
        weight: '',
        height: '',
        age: '',
      },
      medical: {
        pulse: '',
        language: '',
        dosha: '',
      },
      complaint: {
        text: '',
        type: '',
      },
      ...this.passedData,
    }
    this.mounted()
    requestAnimationFrame(() => {
      this.$refs.observer.reset()
    })
  } */

  get userAge() {
    return (
      new Date().getFullYear() - new Date(this.user?.birthdate).getFullYear()
    )
  }

  @authentication.Getter
  readonly isClient!: boolean

  @authentication.Getter
  readonly isPartner!: boolean

  @authentication.Getter
  readonly isEmployee!: boolean
}

export interface IAppointmentModalConfig {
  title: string
  button: {
    text: string
    type: string
  }
}

export interface IAppointmentModalData {
  id: number
  personal: {
    client: number
    name: string
    email: string
    address: string
    telephone: string
    weight: string
    height: string
    age: string
  }
  medical: {
    pulse: string
    language: string
    dosha: string
    recommendations: string[]
  }
  complaint: {
    text: string
    type: string
  }
  appointments?: any[]
}
</script>
