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
                <div
                  v-if="!paginatedRecords || !paginatedRecords.length"
                  class="content has-text-centered"
                >
                  <h5 class="subtitle is-5 has-text-weight-semibold">
                    Não há agendamentos para esta data
                  </h5>
                </div>
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
                        <p :class="{ 'mb-0': !appointment.comment }">
                          <span class="has-text-weight-semibold">
                            Paciente:
                          </span>
                          {{ appointment.client.name }}
                          <template v-if="appointment.completedAt">
                            <br />
                            <span class="has-text-weight-semibold">
                              Conclusão:
                            </span>
                            {{
                              new Date(appointment.completedAt).toLocaleString(
                                'pt-BR',
                                {
                                  year: 'numeric',
                                  month: '2-digit',
                                  day: '2-digit',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                }
                              )
                            }}
                          </template>
                        </p>
                        <textarea
                          v-show="appointment.comment"
                          class="
                            textarea
                            has-fixed-size
                            is-borderless is-unselectable
                          "
                          :value="appointment.comment"
                          readonly
                        />
                      </div>
                      <div v-if="!appointment.completedAt">
                        <p class="buttons">
                          <b-button
                            type="is-dark"
                            icon-left="info"
                            @click="viewRecord(idx)"
                          >
                            Ficha Médica
                          </b-button>
                          <b-button @click="onClickConclude(appointment.id)">
                            Marcar Concluído
                          </b-button>
                        </p>
                      </div>
                      <div v-else>
                        <p class="buttons">
                          <b-button
                            type="is-info"
                            icon-left="info"
                            @click="viewRecord(idx)"
                          >
                            Ficha Médica
                          </b-button>
                        </p>
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
import ConcludeSchedulingModalComponent from '@/components/appointment/ConcludeSchedulingModal.vue'
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

  viewRecord(idx: number) {
    this.$buefy.modal.open({
      parent: this,
      component: AppointmentModalComponent,
      trapFocus: true,
      hasModalCard: true,
      canCancel: false,
      fullScreen: true,
      props: {
        isAllowEditing: false,
        isFull: true,
        modalConfig: {
          title: 'Visualizar Ficha',
          button: {
            text: 'OK',
            type: 'is-info',
          },
        },
        passedData: this.records[idx].preAppointment,
      },
      events: {
        success: (_: IAppointmentModalData, modal: Vue) => {
          modal.$emit('close')
        },
      },
    })
  }

  onClickConclude(id: Number) {
    this.$buefy.modal.open({
      parent: this,
      component: ConcludeSchedulingModalComponent,
      trapFocus: true,
      hasModalCard: true,
      canCancel: false,
      fullScreen: true,
      props: {
        isAllowEditing: true,
        modalConfig: {
          title: 'Concluir Consulta',
          button: {
            text: 'Concluir',
            type: 'is-success',
          },
        },
      },
      events: {
        success: (comment: string, modal: Vue) => {
          return $axios
            .post(`/appointment/${id}/conclude`, {
              comment,
            })
            .then(({ data: { data: savedSchedule } }) => {
              this.$buefy.toast.open({
                duration: 3000,
                message: 'Consulta concluída!',
                type: 'is-success',
                position: 'is-bottom-right',
                queue: false,
              })

              savedSchedule = {
                ...savedSchedule,
                date: new Date(savedSchedule.date),
                completedAt: new Date(savedSchedule.completedAt),
              }
              const idx = this.records.findIndex((v) => v.id === id)
              this.records.splice(idx, 1, savedSchedule)

              setTimeout(() => modal.$emit('close'), 2500)
            })
            .catch(() => {
              this.$buefy.toast.open({
                duration: 3000,
                message: 'Houve um erro inesperado, por favor tente novamente',
                type: 'is-warning',
                position: 'is-bottom-right',
                queue: false,
              })
              ;(modal as any).isSubmitted = false
            })
        },
      },
    })
  }

  get paginatedRecords() {
    return this.records.filter((v) => {
      const date = new Date(v.date)
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

.notification {
  padding-right: 24px !important;
}
</style>
