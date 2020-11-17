<template>
  <ValidationObserver
    ref="observer"
    v-slot="{ handleSubmit, invalid }"
    class="modal-card"
  >
  </ValidationObserver>
</template>

<script lang="ts">
import { Component, Vue, Prop, namespace } from 'nuxt-property-decorator'
import { ValidationObserver } from 'vee-validate'
import InputWithValidation from '@/components/inputs/InputWithValidation.vue'
import {
  IAuthenticationUser,
  EAuthenticationPermissionLevel,
} from '~/store/authentication'
import { $axios } from '~/utils/api'

const authentication = namespace('authentication')

@Component({
  components: {
    ValidationObserver,
    InputWithValidation,
  },
})
export default class CreateAppointmentModalComponent extends Vue {}
</script>
