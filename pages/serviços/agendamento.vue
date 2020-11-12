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
      <pre-appointments-component
        v-for="(record, idx) in records"
        :key="record.id"
        :record="record"
        :index="idx"
      />
    </div>
    <div class="modal" :class="{ 'is-active': isActive }">
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
  data() {
    return {
      isActive: false,
      comment: '',
    }
  },
  components: { AppointmentComponent },
})
export default class Appointments extends Vue {
  private records: any[] = []

  fetchData() {
    $axios.get(`/pre-appointment/`).then((v) => {
      this.records = v.data
    })
  }

  created() {
    this.fetchData()
  }

  openModal() {
    this.$data.isActive = true
  }

  closeModal() {
    this.$data.isActive = false
  }

  newRecord() {
    const comment = this.$data.comment || ''
    const id = this.$store.state.authentication.user.id
    $axios
      .post(`/pre-appointment/`, {
        comment,
        client: id,
      })
      .then(() => this.$router.go(0))
  }
}
</script>
