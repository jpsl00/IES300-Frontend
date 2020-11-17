<template>
  <ValidationProvider
    v-slot="{ errors, valid }"
    :vid="vid"
    :name="$attrs.label"
    :rules="rules"
    slim
  >
    <b-field
      v-bind="$attrs"
      :type="{ 'is-danger': errors[0], 'is-success': valid }"
      :message="errors"
      :expanded="$attrs['field-expanded']"
    >
      <b-select
        v-model="innerValue"
        :expanded="$attrs['input-expanded']"
        placeholder="Select a subject"
        :disabled="$attrs['input-disabled']"
      >
        <slot />
      </b-select>
    </b-field>
  </ValidationProvider>
</template>

<script lang="ts">
import {
  Component,
  Emit,
  Prop,
  /*   PropSync, */
  Vue,
  Watch,
} from 'nuxt-property-decorator'
import { ValidationProvider } from 'vee-validate'

@Component({
  components: {
    ValidationProvider,
  },
})
export default class SelectWithValidation extends Vue {
  public innerValue = ''

  @Prop(String) readonly vid: string | undefined

  @Prop({ type: [Object, String], default: '' }) readonly rules!:
    | Object
    | string

  @Prop(String) readonly value!: string

  /* @PropSync('innerValue', { type: String }) readonly value!: String */
  @Watch('innerValue')
  @Emit('input')
  onInnerValueChanged(val: string) {
    return val
  }

  @Watch('value')
  onValueChanged(val: string) {
    this.innerValue = val
  }

  created() {
    if (this.value) this.innerValue = this.value
  }
}
</script>
