<template>
  <div class="box">
    <div class="columns is-multiline is-centered">
      <div class="column is-12">
        <nav class="level is-mobile">
          <div class="level-left">
            <div class="level-item">
              <p class="title is-4">Agendamento</p>
              <p class="subtitle is-6">(ID {{ record.id }})</p>
            </div>
          </div>
          <div class="level-right is-hidden-mobile">
            <div class="level-item">
              <p class="buttons">
                <b-button type="is-info" icon-left="info" @click="viewRecord">
                  Visualizar
                </b-button>
                <b-button
                  v-show="isEmployee"
                  type="is-primary"
                  icon-left="edit"
                  @click="editRecord"
                >
                  Editar
                </b-button>
                <b-button
                  v-show="isClient && currentStep === 2"
                  type="is-success"
                  icon-left="calendar-plus"
                  @click="schedule"
                >
                  Marcar Consultas
                </b-button>
                <b-button
                  v-show="!record.appointments || !record.appointments.length"
                  type="is-danger"
                  icon-left="ban"
                  @click="deleteRecord"
                >
                  Cancelar
                </b-button>
              </p>
            </div>
          </div>
        </nav>
      </div>
      <div class="column is-10 is-8-widescreen is-12-mobile">
        <b-steps
          v-model="currentStep"
          rounded
          animated
          mobile-mode="minimalist"
          :has-navigation="false"
        >
          <b-step-item step="0" label="Criar Agendamento" :clickable="false" />
          <b-step-item
            step="1"
            label="Análise do Profissional"
            :clickable="false"
          />
          <b-step-item
            step="2"
            label="Marcação de Consultas"
            :clickable="false"
          />
          <b-step-item step="3" label="Consultas" :clickable="false" />
          <b-step-item step="4" label="Concluído" :clickable="false" />
        </b-steps>
      </div>
      <div class="column is-12">
        <div class="control">
          <textarea
            class="textarea has-fixed-size is-borderless is-unselectable"
            :value="record.complaint.text"
            readonly
          />
        </div>
      </div>
      <div
        v-show="record && record.appointments && record.appointments.length"
        class="column is-12"
      >
        <div class="columns is-multiline is-variable is-3">
          <div
            v-for="(appointment, idx) in record.appointments"
            :key="idx"
            class="column is-6 is-12-mobile is-6-widescreen"
          >
            <div class="notification is-info" :class="appointment.type">
              <nav class="level is-mobile">
                <div class="level-left">
                  <div class="level-item">
                    <p class="title is-4">Consulta {{ idx + 1 }}</p>
                    <p class="subtitle is-6">(ID: {{ appointment.id }})</p>
                  </div>
                </div>
                <div class="level-right">
                  <div class="level-item">
                    <p class="subtitle is-5">
                      {{
                        new Date(appointment.date).toLocaleString('pt-BR', {
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
                <p>
                  <span class="has-text-weight-semibold">Médico: </span>
                  {{ appointment.partner.name }}
                  <br />
                  <span v-show="!!appointment.partner.specialty">
                    <span class="has-text-weight-semibold"
                      >Especialidade:
                    </span>
                    {{ appointment.partner.specialty }}
                    <br />
                  </span>
                  <span v-show="!!appointment.partner.address">
                    <span class="has-text-weight-semibold">Endereço: </span>
                    {{ appointment.partner.address }}
                    <br />
                  </span>
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
      <div class="column is-12 is-hidden-tablet">
        <nav class="level is-mobile">
          <div class="level-right">
            <div class="level-item">
              <p class="buttons">
                <b-button type="is-info" icon-left="info" @click="viewRecord">
                  Visualizar
                </b-button>
                <b-button
                  v-show="isEmployee"
                  type="is-primary"
                  icon-left="edit"
                  @click="editRecord"
                >
                  Editar
                </b-button>
                <b-button
                  v-show="isClient && currentStep === 2"
                  type="is-success"
                  icon-left="calendar-plus"
                  @click="schedule"
                >
                  Marcar Consultas
                </b-button>
                <b-button
                  v-show="!record.appointments || !record.appointments.length"
                  type="is-danger"
                  icon-left="ban"
                  @click="deleteRecord"
                >
                  Cancelar
                </b-button>
              </p>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, namespace } from 'nuxt-property-decorator'
import AppointmentModalComponent, {
  IAppointmentModalData,
} from '@/components/appointment/AppointmentModal.vue'
import SchedulingModalComponent from '@/components/appointment/SchedulingModal.vue'
import { $axios } from '~/utils/api'

const authentication = namespace('authentication')

@Component({
  propsData: {
    record: {
      id: -1,
      complaint: {
        text: 'ಠ_ಠ',
      },
    },
  },
})
export default class AppointmentComponent extends Vue {
  @Prop(Object) readonly record!: IAppointmentModalData

  @Prop(Number) readonly index!: number

  @authentication.Getter
  readonly isEmployee!: boolean

  @authentication.Getter
  readonly isClient!: boolean

  viewRecord() {
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
        passedData: this.record,
      },
      events: {
        success: (_: IAppointmentModalData, modal: Vue) => {
          modal.$emit('close')
        },
      },
    })
  }

  editRecord() {
    this.$buefy.modal.open({
      parent: this,
      component: AppointmentModalComponent,
      trapFocus: true,
      hasModalCard: true,
      canCancel: false,
      fullScreen: true,
      props: {
        isAllowEditing: true,
        isFull: true,
        modalConfig: {
          title: 'Editar Agendamento',
          button: {
            text: 'Salvar',
            type: 'is-success',
          },
        },
        passedData: this.record,
      },
      events: {
        success: (_: IAppointmentModalData, modal: Vue) => {
          return $axios
            .patch(`/pre-appointment/${this.record.id}`, {
              medical: { ...this.record.medical },
            })
            .then(({ data: { data: updatedRecord } }) => {
              this.$emit('update:record', this.index, updatedRecord)
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
            .finally(() => {
              modal.$emit('close')
            })
        },
      },
    })
  }

  deleteRecord() {
    this.$buefy.dialog.confirm({
      title: 'Cancelar Agendamento',
      message:
        'Deseja realmente cancelar esse agendamento? Esta ação não poderá ser desfeita',
      confirmText: 'Sim',
      cancelText: 'Não',

      type: 'is-danger',
      hasIcon: true,
      onConfirm: () => {
        $axios.delete(`/pre-appointment/${this.record.id}`).finally(() => {
          this.$emit('delete:record', this.index)
          this.$destroy()
          this.$el.parentNode?.removeChild(this.$el)
        })
      },
    })
  }

  schedule() {
    this.$buefy.modal.open({
      parent: this,
      component: SchedulingModalComponent,
      trapFocus: true,
      hasModalCard: true,
      canCancel: false,
      fullScreen: true,
      props: {
        isAllowEditing: false,
        isFull: true,
        appointment: this.record,
        modalConfig: {
          title: 'Marcar Consultas',
          button: {
            text: 'Salvar',
            type: 'is-success',
          },
        },
        passedData: this.record,
      },
      events: {
        success: (data: any, modal: Vue) => {
          $axios
            .$post(`/appointment/`, data)
            .then((response) => {
              this.record.appointments = response
              this.$buefy.toast.open({
                message: 'Consultas marcadas!',
                type: 'is-success',
                position: 'is-bottom-right',
                duration: 3000,
              })
              modal.$emit('close')
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

  get currentStep() {
    if (
      !this.record.medical.recommendations ||
      !(this.record.medical?.recommendations.length > 0)
    )
      return 1
    else if (
      !this.record.appointments ||
      !(this.record.appointments!.length > 0)
    )
      return 2
    else if (!this.record.appointments.every((v) => v.type === 'is-success'))
      return 3
    else return 4
  }
}
</script>

<style scoped>
/* .level {
  margin-bottom: 0px;
} */

.notification {
  padding-right: 24px !important;
}
</style>
