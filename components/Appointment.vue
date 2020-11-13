<template>
  <div class="column is-10-desktop is-12-mobile">
    <div class="box">
      <nav class="level">
        <div class="level-left">
          <div class="level-item"></div>
          <p class="subtitle is-6">Agendamento ID {{ record.id }}</p>
        </div>
        <div class="level-right">
          <div class="level-item">
            <a class="button is-danger" @click="deleteRecord">
              <span class="icon">
                <i class="fas fa-ban"></i>
              </span>
              <span>Cancelar</span>
            </a>
          </div>
        </div>
      </nav>
      <div>
        <div class="control">
          <textarea
            class="textarea has-fixed-size is-borderless is-unselectable"
            :value="record.comment"
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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { $axios } from '~/utils/api'

@Component({
  props: ['record', 'index', 'renderClient', 'renderPartner'],
})
export default class AppointmentComponent extends Vue {
  deleteRecord() {
    $axios
      .delete(`/pre-appointment/${this.$props.record.id}`)
      .then(() => {
        this.$destroy()
        this.$el.parentNode?.removeChild(this.$el)
      })
      .catch(() => {
        this.$destroy()
        this.$el.parentNode?.removeChild(this.$el)
      })
  }
}
</script>

<style scoped>
.level {
  margin-bottom: 0px;
}
</style>
