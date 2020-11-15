<template>
  <ValidationObserver class="modal-card">
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
          <b-input :value="user.name" disabled icon="user" />
        </b-field>
        <b-field label="E-Mail" expanded>
          <b-input :value="user.email" disabled icon="envelope" />
        </b-field>
      </b-field>
      <b-field
        v-show="!isPartner || isEmployee"
        grouped
        group-multiline
        expanded
      >
        <b-field expanded>
          <InputWithValidation
            v-model="data.personal.address"
            label="Endereço"
            rules="required"
            type="address"
            vid="address"
            icon="map"
            input-expanded
            :disabled="!isAllowEditing || isPartner"
          >
          </InputWithValidation>
        </b-field>
        <b-field expanded>
          <InputWithValidation
            v-model="data.personal.telephone"
            label="Telefone"
            rules="required"
            type="tel"
            vid="telephone"
            icon="phone"
            input-expanded
            :disabled="!isAllowEditing || isPartner"
          >
          </InputWithValidation>
        </b-field>
      </b-field>
      <hr />
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
            :disabled="!isAllowEditing || isPartner"
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
            :disabled="!isAllowEditing || isPartner"
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
          />
        </b-field>
      </b-field>

      <hr v-show="isPartner || isFull" />
      <b-field v-show="isPartner || isFull" grouped group-multiline>
        <b-field expanded>
          <InputWithValidation
            v-model="data.medical.language"
            rules="required"
            type="text"
            label="Língua"
            vid="language"
            icon="language"
            field-expanded
            :disabled="!isAllowEditing || !isEmployee"
          />
        </b-field>
        <b-field expanded>
          <InputWithValidation
            v-model="data.medical.pulse"
            rules="required"
            type="text"
            label="Pulso"
            vid="pulse"
            icon="heartbeat"
            field-expanded
            :disabled="!isAllowEditing || !isEmployee"
          />
        </b-field>
        <b-field expanded>
          <InputWithValidation
            v-model="data.medical.dosha"
            rules="required"
            type="text"
            label="Dosha"
            vid="dosha"
            icon="flask"
            field-expanded
            :disabled="!isAllowEditing || !isEmployee"
          />
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
        :disabled="!isAllowEditing || isPartner"
      >
      </InputWithValidation>
      <SelectWithValidation
        v-model="data.complaint.problemType"
        rules="required"
        label="Estado dos Problemas"
        :input-disabled="!isAllowEditing || isPartner"
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
      >
        {{
          modalConfig && modalConfig.button
            ? modalConfig.button.text
            : '¯\\_(ツ)_/¯'
        }}
      </b-button>
      <b-button type="is-danger" @click="$emit('close')">Cancelar</b-button>
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

const authentication = namespace('authentication')

@Component({
  components: {
    ValidationObserver,
    InputWithValidation,
    SelectWithValidation,
  },
})
export default class NewAppointmentModalComponent extends Vue {
  @authentication.State
  private user!: IAuthenticationUser

  @authentication.Getter
  private role!: EAuthenticationPermissionLevel

  public data = {
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
      dosha: [],
    },
    complaint: {
      text: '',
      problemType: '',
    },
  }

  @Prop(Object) readonly readonlyData!: Object

  @Prop(Boolean) readonly isFull!: Boolean

  @Prop(Boolean) readonly isAllowEditing!: Boolean

  @Prop(Object) readonly modalConfig!: IAppointmentModalConfig

  get userAge() {
    return (
      new Date().getFullYear() - new Date(this.user.birthdate).getFullYear()
    )
  }

  get isPartner() {
    return this.role >= EAuthenticationPermissionLevel.Partner
  }

  get isEmployee() {
    return this.role >= EAuthenticationPermissionLevel.Employee
  }
}

export interface IAppointmentModalConfig {
  title: string
  button: {
    text: string
    type: string
  }
}
</script>
