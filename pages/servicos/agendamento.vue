<template>
  <section class="section">
    <div class="columns is-centered is-vcentered is-multiline">
      <div class="column is-10-desktop is-12-mobile">
        <div class="box">
          <nav class="level">
            <div class="level-left">
              <div class="level-item"></div>
              <p class="subtitle is-4">Agendamentos</p>
            </div>
            <div class="level-right">
              <div class="level-item">
                <b-button type="is-warning" icon-left="plus" @click="newRecord">
                  Novo
                </b-button>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <div class="column is-10-desktop is-12-mobile">
        <appointment-component
          v-for="(record, idx) in paginatedRecords"
          :key="record.id"
          :array="paginatedRecords"
          :record="record"
          :index="idx"
          @delete:record="onDeleteRecord"
        />
      </div>
      <div class="column is-10-desktop is-12-mobile">
        <div class="box">
          <b-pagination v-model="current" :total="total" :per-page="perPage" />
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
import { IAuthenticationUser } from '~/store/authentication'

const authentication = namespace('authentication')

@Component({
  components: { AppointmentComponent },
  middleware: ['auth'],
})
export default class Appointments extends Vue {
  private records: any[] = []
  private current = 1
  private perPage = 3

  private comment = ''

  private isNewModalActive = false

  @authentication.State
  private user!: IAuthenticationUser

  async fetch() {
    this.records = await $axios.$get(`/pre-appointment/`)
  }

  newRecord() {
    this.$buefy.modal.open({
      parent: this,
      component: AppointmentModalComponent,
      trapFocus: true,
      hasModalCard: true,
      canCancel: false,
      fullScreen: true,
      props: {
        isAllowEditing: true,
        modalConfig: {
          title: 'Novo Agendamento',
          button: {
            text: 'Criar',
            type: 'is-success',
          },
        },
      },
      events: {
        success: async (data: IAppointmentModalData, modal: Vue) => {
          return $axios
            .post(`/pre-appointment/`, {
              comment: data.complaint.text,
              client: this.user.id,
            })
            .then(({ data: createdAppointment }) => {
              this.records.unshift({
                id: createdAppointment.data.id,
                comment: data.complaint.text,
              })
              this.$buefy.toast.open({
                duration: 3000,
                message: 'Agendamento criado!',
                type: 'is-success',
                position: 'is-bottom-right',
                queue: false,
              })
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
    /* const comment = this.comment || ''
    const id = this.$store.state.authentication.user.id
    $axios
      .post(`/pre-appointment/`, {
        comment,
        client: id,
      })
      .then(() => this.$router.go(0)) */
  }

  onDeleteRecord(index: number) {
    this.records.splice(index, 1)
  }

  get paginatedRecords() {
    return this.records.slice(
      (this.current - 1) * this.perPage,
      this.perPage * this.current
    )
  }

  get total() {
    return this.records.length
  }
}
</script>
