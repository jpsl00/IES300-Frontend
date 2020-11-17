<template>
  <section class="section has-inset-shadow">
    <div class="columns is-centered is-vcentered is-multiline">
      <div class="column is-10-desktop is-12-touch">
        <div class="box">
          <nav class="level">
            <div class="level-left">
              <div class="level-item">
                <p class="title is-3">Agendamentos</p>
              </div>
            </div>
            <div v-show="isClient" class="level-right">
              <div class="level-item">
                <b-button type="is-warning" icon-left="plus" @click="newRecord">
                  Novo
                </b-button>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <div class="column is-10-desktop is-12-touch">
        <appointment-component
          v-for="(record, idx) in paginatedRecords"
          :key="record.id"
          :record="record"
          :array="paginatedRecords"
          :index="idx"
          @delete:record="onDeleteRecord"
          @update:record="onUpdateRecord"
        />
      </div>
      <div class="column is-10-desktop is-12-touch">
        <div class="box">
          <b-pagination
            v-model="current"
            :total="total"
            :per-page="perPage"
            @change="onPageChange"
          />
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
export default class Appointments extends Vue {
  public records: Partial<IAppointmentModalData>[] = []
  private current = 1
  private perPage = 3

  private comment = ''

  private isNewModalActive = false

  @authentication.Getter
  private readonly isClient!: boolean

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
        success: (data: IAppointmentModalData, modal: Vue) => {
          return $axios
            .post(`/pre-appointment/`, {
              complaint: { ...data.complaint },
              personal: { ...data.personal },
            })
            .then(({ data: { data: createdAppointment } }) => {
              this.records.unshift(createdAppointment)
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
    this.$buefy.toast.open({
      message: 'Agendamento cancelado!',
      type: 'is-info',
      position: 'is-bottom-right',
      duration: 3000,
    })
  }

  onUpdateRecord(index: number, record: IAppointmentModalData) {
    this.records[index] = record
    this.$buefy.toast.open({
      message: 'Agendamento atualizado!',
      type: 'is-success',
      position: 'is-bottom-right',
      duration: 3000,
    })
  }

  onPageChange() {
    if (process.client) window.scrollTo(0, 0)
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
