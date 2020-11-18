<template>
  <ValidationObserver
    ref="observer"
    v-slot="{ handleSubmit, invalid }"
    class="modal-card"
  >
    <header class="modal-card-head">
      <p class="modal-card-title">
        {{
          modalConfig && modalConfig.title ? modalConfig.title : '༼ つ ◕_◕ ༽つ'
        }}
      </p>
    </header>
    <section class="modal-card-body">
      <template v-for="(record, index) in schedules">
        <p :key="index" class="title is-4">Consulta {{ index + 1 }}</p>
        <b-field :key="index" grouped group-multiline>
          <b-field label="Médico" expanded>
            <b-input :value="record.name" disabled icon="user-md"> </b-input>
          </b-field>
          <b-field label="Especialidade" expanded>
            <b-input
              :value="record.specialty"
              disabled
              icon="stethoscope"
            ></b-input>
          </b-field>
        </b-field>
        <b-field :key="index" grouped group-multiline>
          <b-field expanded>
            <InputWithValidation v-model="createdSchedules[index].date" />
          </b-field>
        </b-field>
        <hr :key="index" />
      </template>
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
  </ValidationObserver>
</template>

<script lang="ts">
import { Component, Vue, Prop, namespace } from 'nuxt-property-decorator'
import { ValidationObserver } from 'vee-validate'
import InputWithValidation from '@/components/inputs/InputWithValidation.vue'
import {
  IAppointmentModalConfig,
  IAppointmentModalData,
} from './AppointmentModal.vue'
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
  },
})
export default class SchedulingModalComponent extends Vue {
  @Prop(Object) readonly modalConfig!: IAppointmentModalConfig

  @Prop(Object) readonly appointment!: IAppointmentModalData

  public schedules: Schedule[] = []

  public createdSchedules: any[] = []

  async fetch() {
    const response: any[] = (await $axios.$get('/partner/')).data
    console.log(response)
    this.schedules = this.appointment.medical.recommendations.map(
      (v) => response.filter((vi) => `${vi.id}` === v)[0]
    )
    this.createdSchedules = this.schedules.map((v) => ({
      partner: v.id,
      date: null,
    }))
  }

  mounted() {
    if (!(this.schedules?.length > 0)) this.$fetch()
  }
}

export interface Schedule {
  id: number
  field: string
  name: string
  specialty: string
  workHours: Object[]
  appointments: Date[]
}

export interface ISchedulingModalData {}
</script>
