<template>
  <ValidationProvider
    v-slot="{ errors, valid }"
    :vid="vid"
    :name="$attrs.name || $attrs.label"
    :rules="rules"
  >
    <b-field
      v-bind="$attrs"
      :type="{ 'is-danger': errors[0], 'is-success': valid }"
      :message="errors"
    >
      <b-input v-model="innerValue" v-bind.sync="$attrs"></b-input>
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
export default class InputWithValidation extends Vue {
  innerValue = ''

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
