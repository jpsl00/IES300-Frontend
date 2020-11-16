<template>
  <div class="box">
    <div class="columns is-multiline">
      <div class="column is-12">
        <nav class="level is-mobile">
          <div class="level-left">
            <div class="level-item"></div>
            <p class="subtitle is-5">Agendamento ID {{ record.id }}</p>
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
    <div>
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
      class="tile is-ancestor"
    >
      <div class="tile is-parent is-vertical is-12">
        <div
          v-for="(appointment, idx) in record.appointments"
          :key="appointment.id"
          class="tile is-child is-vertical is-12 notification is-primary"
        >
          <div class="">{{ idx }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, namespace } from 'nuxt-property-decorator'
import AppointmentModalComponent, {
  IAppointmentModalData,
} from '@/components/appointment/AppointmentModal.vue'
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
          title: 'Visualizar Agendamento',
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
          title: 'Visualizar Agendamento',
          button: {
            text: 'OK',
            type: 'is-info',
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
}
</script>

<style scoped>
.level {
  margin-bottom: 0px;
}
</style>
