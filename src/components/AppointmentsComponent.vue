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
            class="textarea has-fixed-size is-borderless"
            :value="record.comment"
            readonly
          ></textarea>
        </div>
      </div>
      <div
        class="tile is-ancestor"
        v-show="record && record.appointments && record.appointments.length"
      >
        <div class="tile is-parent is-vertical is-12">
          <div
            class="tile is-child is-vertical is-12 notification is-primary"
            v-for="(appointment, idx) in record.appointments"
            :key="appointment.id"
          >
            <div class="">{{ idx }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import config from "../config";

@Component({
  props: {
    record: {},
    index: null,
    renderClient: false,
    renderPartner: false,
  },
})
export default class AppointmentsComponent extends Vue {
  deleteRecord() {
    axios
      .delete(`${config.apiUrl}/pre-appointment/${this.$props.record.id}`, {
        headers: {
          authorization: `Bearer ${this.$store.state.authentication.user.token}`,
        },
      })
      .then((v) => {
        this.$destroy();
        this.$el.parentNode?.removeChild(this.$el);
      })
      .catch((e) => {
        this.$destroy();
        this.$el.parentNode?.removeChild(this.$el);
      });
  }
}
</script>

<style scoped>
.level {
  margin-bottom: 0px;
}
</style>
