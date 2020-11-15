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
import { Component, Vue } from 'vue-property-decorator'
import AppointmentComponent from '@/components/appointment/Appointment.vue'
import AppointmentModalComponent from '@/components/appointment/AppointmentModal.vue'
import { $axios } from '~/utils/api'

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
