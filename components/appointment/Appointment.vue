<template>
  <div class="box">
    <div class="columns is-multiline">
      <div class="column is-12">
        <nav class="level">
          <div class="level-left">
            <div class="level-item"></div>
            <p class="subtitle is-5">Agendamento ID {{ record.id }}</p>
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
      </div>
    </div>
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
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { $axios } from '~/utils/api'

@Component({
  props: ['record', 'renderClient', 'renderPartner'],
})
export default class AppointmentComponent extends Vue {
  @Prop(Number) readonly index!: number

  deleteRecord() {
    $axios.delete(`/pre-appointment/${this.$props.record.id}`).finally(() => {
      this.$emit('delete:record', this.index)
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
