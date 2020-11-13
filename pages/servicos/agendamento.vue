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
                <a class="button is-warning" @click="openModal">
                  <span class="icon">
                    <i class="fas fa-plus"></i>
                  </span>
                  <span>Novo</span>
                </a>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <appointment-component
        v-for="(record, idx) in records"
        :key="record.id"
        :record="record"
        :index="idx"
      />
      <div class="column is-10-desktop is-12-mobile">
        <b-pagination
          v-model="current"
          :total="total"
          :per-page="perPage"
          :disabled="isChanging"
          @change="onChangePage"
        />
      </div>
    </div>
    <div class="modal" :class="{ 'is-active': isModalActive }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Novo Agendamento</p>
          <button class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label class="label">Descreva sua situação de saúde</label>
            <div class="control">
              <textarea
                v-model="comment"
                class="input"
                name="comment"
                placeholder="Digite aqui..."
                rows="50"
              />
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="newRecord">Salvar</button>
          <button class="button is-danger" @click="closeModal">Cancelar</button>
        </footer>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AppointmentComponent from '@/components/Appointment.vue'
import { $axios } from '~/utils/api'

@Component({
  components: { AppointmentComponent },
  middleware: ['auth'],
})
export default class Appointments extends Vue {
  private records: any[] = []
  private current = 1
  private total = 0
  private perPage = 3
  private isChanging = false
  private isModalActive = false
  private comment = ''

  async fetch() {
    const { total } = await $axios.$get('/pre-appointment/count')
    const records = await $axios.$get(`/pre-appointment/`)

    this.total = total
    this.records = records
  }

  openModal() {
    this.isModalActive = true
  }

  closeModal() {
    this.isModalActive = false
  }

  newRecord() {
    const comment = this.comment || ''
    const id = this.$store.state.authentication.user.id
    $axios
      .post(`/pre-appointment/`, {
        comment,
        client: id,
      })
      .then(() => this.$router.go(0))
  }

  async onChangePage() {
    this.isChanging = true
    this.records = await $axios.$get(`/pre-appointment/`, {
      params: {
        page: this.current,
        limit: this.perPage,
      },
    })
    this.isChanging = false
  }
}
</script>
