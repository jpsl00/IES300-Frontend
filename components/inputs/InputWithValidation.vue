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
      <b-input v-model="innerValue" v-bind="$attrs"></b-input>
    </b-field>
  </ValidationProvider>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  PropSync,
  Vue,
  Watch,
  Emit,
} from 'nuxt-property-decorator'
import { ValidationProvider } from 'vee-validate'

@Component({
  components: {
    ValidationProvider,
  },
})
/*
  watch: {
    // Handles internal model changes.
    innerValue(newVal) {
      this.$emit('input', newVal)
    },
    // Handles external model changes.
    value(newVal) {
      this.innerValue = newVal
    },
  },
  created() {
    if (this.value) {
      this.innerValue = this.value
    }
  },
} */
export default class InputWithValidation extends Vue {
  @Prop(String) readonly vid: String | undefined
  @Prop([Object, String]) readonly rules!: [Object, String]
  @PropSync('innerValue', { type: String }) readonly value!: String

  @Watch('innerValue')
  @Emit()
  onInnerValueChanged(val: string) {
    return val
  }
}
</script>
