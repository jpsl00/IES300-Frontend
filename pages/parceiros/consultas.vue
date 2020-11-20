<template>
  <section class="section has-inset-shadow">
    <div class="container">
      <div class="columns is-centered is-multiline">
        <div class="column is-10-desktop is-12-touch">
          <div class="box">
            <nav class="level">
              <div class="level-left">
                <div class="level-item">
                  <p class="title is-3">Consultas</p>
                </div>
              </div>
            </nav>
          </div>
        </div>
        <div class="column is-10-desktop is-12-touch">
          <div class="columns is-centered is-multiline">
            <div class="column is-5">
              <div class="container is-centered max-width-333">
                <b-field>
                  <b-datepicker
                    v-model="date"
                    inline
                    :events="records"
                    :loading="$fetchState.pending"
                    class="max-width-333"
                  />
                </b-field>
              </div>
            </div>
            <div class="column is-7">
              <div class="box">
                <div class="columns is-multiline is-variable">
                  <div
                    v-for="(appointment, idx) in paginatedRecords"
                    :key="idx"
                    class="column is-12"
                  >
                    <div class="notification is-info" :class="appointment.type">
                      <nav class="level is-mobile">
                        <div class="level-left">
                          <div class="level-item">
                            <p class="title is-4">Consulta {{ idx + 1 }}</p>
                            <p class="subtitle is-6">
                              (ID: {{ appointment.id }})
                            </p>
                          </div>
                        </div>
                        <div class="level-right">
                          <div class="level-item">
                            <p class="subtitle is-5">
                              {{
                                appointment.date.toLocaleString('pt-BR', {
                                  year: 'numeric',
                                  month: '2-digit',
                                  day: '2-digit',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })
                              }}
                            </p>
                          </div>
                        </div>
                      </nav>
                      <div class="content">
                        <p class="mb-0">
                          <span class="has-text-weight-semibold">
                            Paciente:
                          </span>
                          {{ appointment.client.name }}
                        </p>
                        <textarea
                          v-show="appointment.comment"
                          class="textarea has-fixed-size is-borderless is-unselectable"
                          :value="appointment.comment"
                          readonly
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, namespace } from 'nuxt-property-decorator'
import AppointmentComponent from '@/components/appointment/Appointment.vue'
import AppointmentModalComponent, {
  IAppointmentModalData,
} from '@/components/appointment/AppointmentModal.vue'
import { $axios } from '~/utils/api'

const authentication = namespace('authentication')

@Component({
  components: { AppointmentComponent },
  middleware: ['auth'],
})
export default class Schedulings extends Vue {
  public date = new Date()
  public records: any[] = []

  @authentication.Getter
  private readonly isPartner!: boolean

  async fetch() {
    this.records = (await $axios.$get(`/partner/me`)).data

    this.records = this.records.map((v: any) => {
      const date = new Date(v.date)
      date.setHours(0, 0, 0, 0)

      const today = new Date()
      today.setHours(0, 0, 0, 0)

      let type: string = ''
      if (v.completedAt) type = 'is-success'
      else if (date.getTime() === today.getTime()) type = 'is-warning'
      else if (date.getTime() < today.getTime()) type = 'is-danger'
      else type = 'is-info'

      return {
        ...v,
        date: new Date(v.date),
        type,
      }
    })
  }

  fetchOnServer = false

  mounted() {
    this.date.setHours(0, 0, 0, 0)

    if (!this.isPartner) return this.$router.push('/servicos/agendamentos')

    /* if (!(this.records?.length > 0)) this.$fetch() */
  }

  get paginatedRecords() {
    return this.records.filter((v) => {
      const date = new Date((v.date as Date).getTime())
      date.setHours(0, 0, 0, 0)

      return date.getTime() === this.date.getTime()
    })
  }
}
</script>

<style scoped>
.max-width-333 {
  max-width: 333px;
}
</style>
