<template>
  <ValidationObserver
    ref="observer"
    v-slot="{ handleSubmit, invalid }"
    class="modal-card"
  >
    <header class="modal-card-head">
      <p class="modal-card-title">
        {{
          modalConfig && modalConfig.title ? modalConfig.title : '༼ つ ◕_◕ ༽つ'
        }}
      </p>
    </header>
    <section class="modal-card-body">
      <b-field expanded>
        <InputWithValidation
          v-model="comment"
          rules="max:2500"
          type="textarea"
          label="Comentários sobre a Consulta"
          vid="comment"
          field-expanded
          maxlength="2500"
          placeholder="Principais problemas que se apresentam no momento (o que o motivou a procurar ajuda)"
          :disabled="isSubmitted"
          :loading="isSubmitted"
        >
        </InputWithValidation>
      </b-field>
    </section>
    <footer class="modal-card-foot">
      <b-button
        :type="
          modalConfig && modalConfig.button
            ? modalConfig.button.type
            : 'is-primary'
        "
        :disabled="invalid"
        :loading="isSubmitted"
        :label="
          modalConfig && modalConfig.button
            ? modalConfig.button.text
            : '¯\\_(ツ)_/¯'
        "
        @click="handleSubmit(onSubmit)"
      />
      <b-button
        type="is-danger"
        :disabled="isSubmitted"
        @click="$emit('close')"
      >
        Cancelar
      </b-button>
      <!-- <b-button type="is-warning" :disabled="isSubmitted" @click="onResetForm">
        Limpar
      </b-button> -->
    </footer>
  </ValidationObserver>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { ValidationObserver } from 'vee-validate'
import InputWithValidation from '@/components/inputs/InputWithValidation.vue'
import {
  IAppointmentModalConfig,
  IAppointmentModalData,
} from './AppointmentModal.vue'

@Component({
  components: {
    ValidationObserver,
    InputWithValidation,
  },
})
export default class ConcludeSchedulingModalComponent extends Vue {
  @Prop(Object) readonly modalConfig!: IAppointmentModalConfig

  @Prop(Object) readonly appointment!: Partial<IAppointmentModalData>

  public isSubmitted = false

  public comment: string = ''

  onSubmit() {
    try {
      this.isSubmitted = true

      this.$emit('success', this.comment, this)
    } catch (e) {
      this.$buefy.toast.open({
        duration: 3000,
        message: 'Houve um erro inesperado, por favor tente novamente',
        type: 'is-warning',
        position: 'is-bottom-right',
        queue: false,
      })
      this.isSubmitted = false
    }
  }
}
</script>
