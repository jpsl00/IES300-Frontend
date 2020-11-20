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
        <div :key="index" class="content">
          <p class="title is-4">Consulta {{ index + 1 }}</p>
          <b-field grouped group-multiline expanded>
            <b-field label="Médico" expanded>
              <b-input :value="record.name" disabled icon="user-md"> </b-input>
            </b-field>
            <b-field label="Especialidade" expanded>
              <b-input :value="record.specialty" disabled icon="stethoscope">
              </b-input>
            </b-field>
          </b-field>
          <b-field grouped group-multiline expanded>
            <b-field expanded>
              <InputWithValidation label="Data" rules="required">
                <template slot="input">
                  <b-datepicker
                    ref="datepicker"
                    v-model="createdSchedules[index].tempdate"
                    expanded
                    placeholder="Selecione a data da consulta"
                    :unselectable-days-of-week="
                      unselectableDaysOfTheWeek(record)
                    "
                    :min-date="new Date()"
                    :mobile-native="false"
                    :disabled="index != 0 && !createdSchedules[index - 1].date"
                    @input="changeDate(index)"
                  >
                  </b-datepicker>
                </template>
              </InputWithValidation>
            </b-field>
            <b-field expanded>
              <InputWithValidation label="Hora" rules="required">
                <template slot="input">
                  <b-timepicker
                    ref="datepicker"
                    v-model="createdSchedules[index].date"
                    expanded
                    placeholder="Selecione a hora da consulta"
                    :default-minutes="0"
                    :min-time="getTime(index, 0)"
                    :max-time="getTime(index, 1)"
                    :disabled="
                      !createdSchedules[index] ||
                      !createdSchedules[index].tempdate
                    "
                    :unselectable-times="unselectableTimes(record, index)"
                    :increment-minutes="60"
                    :mobile-native="false"
                    :time-creator="
                      () => createdSchedules[index].tempdate || new Date()
                    "
                  >
                  </b-timepicker>
                </template>
              </InputWithValidation>
            </b-field>
          </b-field>
          <hr />
        </div>
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
import { $axios } from '~/utils/api'
import { IAuthenticationUser } from '~/store/authentication'

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

  public isSubmitted = false

  public schedules: Schedule[] = []

  public createdSchedules: any[] = []

  @authentication.State
  private user!: IAuthenticationUser

  async fetch() {
    const response: any[] = (await $axios.$get('/partner/')).data
    this.schedules = this.appointment.medical.recommendations.map(
      (v) => response.filter((vi) => `${vi.id}` === v)[0]
    )
    this.createdSchedules = this.schedules.map((v, index) => ({
      index,
      partner: v.id,
      tempdate: null,
      date: null,
    }))
  }

  mounted() {
    if (!(this.schedules?.length > 0)) this.$fetch()
  }

  onSubmit() {
    try {
      this.isSubmitted = true

      const data = this.createdSchedules.map((v: any) => ({
        client: this.user.id,
        partner: v.partner,
        preAppointment: this.appointment.id,
        date: v.date,
      }))
      this.$emit('success', data, this)
    } catch (e) {
      this.$buefy.toast.open({
        duration: 3000,
        message: 'Houve um erro inesperado, por favor tente novamente',
        type: 'is-warning',
        position: 'is-bottom-right',
        queue: false,
      })
      this.isSubmitted = false
    }
  }

  unselectableDaysOfTheWeek(schedule: Schedule) {
    const what = schedule.workHours
      .filter((v: any) => !v.start || !v.end)
      .map((v: any) => parseInt(v.day))

    return what
  }

  unselectableTimes(schedule: Schedule, index: number) {
    try {
      const allSchedules = [
        ...schedule.appointments,
        ...this.createdSchedules.map((v: any) => v.date),
      ]

      // eslint-disable-next-line prefer-const
      let when = new Date(this.createdSchedules[index]?.tempdate?.getTime())
      when.setHours(0, 0, 0, 0)
      if (!when) return []

      const unselectable = allSchedules
        .filter((v) => !!v)
        .filter((v: Date) => {
          const value: Date = new Date(v.getTime())
          if (value) value.setHours(0, 0, 0, 0)

          return value.valueOf() === when.valueOf()
          /* v.date?.getDate() === when */
        })
        ?.map((v: any) => new Date(v))
      /*
      const created = [...this.createdSchedules]
      created.splice(index, 1)
      if (!created || created.length === 0) return []
      const what = schedule.appointments.concat(created)
      const unselectable = what
        .filter((v: any) => v.date.getDate() === when)
        .map((v: any) => (v && v.date ? v.date : null)) */

      return unselectable
    } catch (e) {
      return []
    }
  }

  getTime(index: number, type: number) {
    const date = this.createdSchedules[index].tempdate as Date
    if (date) {
      const day = date.getDay()
      const workDays = this.schedules[index].workHours
      const found: any = workDays.find((v: any) => v.day === day)
      if (found) {
        const hour = type ? found.end : found.start
        const newDate = new Date()
        newDate.setHours(type ? hour : hour - 1)
        return newDate
      }
    }
  }

  changeDate(index: number) {
    this.createdSchedules[index].date = null
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
