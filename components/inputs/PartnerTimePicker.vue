<template>
  <ValidationObserver ref="observer" v-slot="{ handleSubmit, invalid }">
    <b-field :label="day" grouped>
      <b-switch
        v-model="data.toggle"
        size="is-medium"
        passive-type="is-danger"
        type="is-success"
        class="mr-0"
        v-bind="$attrs"
        :disabled="loading"
        @input="onChange"
      />
      <b-timepicker
        v-model="data.startInternal"
        placeholder="Início"
        hour-format="24"
        :min-time="minTime"
        :max-time="maxTimeOffset"
        :increment-minutes="60"
        :default-seconds="0"
        :default-minutes="0"
        :disabled="!data.toggle || loading"
        :mobile-native="false"
        expanded
      />
      <b-timepicker
        v-model="data.endInternal"
        placeholder="Fim"
        hour-format="24"
        :min-time="minTimeOffset"
        :max-time="maxTime"
        :increment-minutes="60"
        :default-seconds="0"
        :default-minutes="0"
        :disabled="!data.toggle || loading"
        :mobile-native="false"
        expanded
      />
    </b-field>
  </ValidationObserver>
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
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import InputWithValidation from '@/components/inputs/InputWithValidation.vue'

import dayjs from 'dayjs'

@Component({
  components: {
    ValidationObserver,
    ValidationProvider,
    InputWithValidation,
  },
})
export default class PartnerTimePicker extends Vue {
  public data: {
    toggle: boolean
    day: number
    start: number | null
    startInternal: Date | null
    end: number | null
    endInternal: Date | null
  } = {
    toggle: false,
    day: 0,
    start: null,
    startInternal: null,
    end: null,
    endInternal: null,
  }

  @Prop(Boolean) readonly loading: boolean = false
  @Prop(Boolean) readonly reset: boolean = false

  @Prop(Number) readonly vid: number | undefined

  @Prop({ type: [Object] }) readonly default!: {
    day: number
    start: number
    end: number
  }

  onChange() {
    if (!this.data.toggle) {
      this.data.start = null
      this.data.end = null
    } else {
      this.data.start = this.default.start
      this.data.end = this.default.end
    }
  }

  get day() {
    return [
      'Domingo',
      'Segunda-Feira',
      'Terça-Feira',
      'Quarta-Feira',
      'Quinta-Feira',
      'Sexta-Feira',
      'Sábado',
    ][this.data.day]
  }

  @Watch('data.startInternal')
  onStartChange() {
    this.data.start = dayjs(this.data.startInternal!).hour()
    if (!this.data.endInternal) this.data.endInternal = this.maxTime
  }

  @Watch('data.endInternal')
  onEndChange() {
    this.data.end = dayjs(this.data.endInternal!).hour()
    if (!this.data.startInternal) this.data.startInternal = this.minTime
  }

  get minTime() {
    return this.toTime(1)
  }

  get maxTime() {
    return this.toTime(23)
  }

  get minTimeOffset() {
    return this.toTime((this.data.start || 1) + 1)
  }

  get maxTimeOffset() {
    return this.toTime((this.data.end || 23) - 1)
  }

  toTime(nbr: number) {
    const dt = new Date()
    dt.setHours(nbr, 0, 0)
    return dt
  }

  mounted() {
    if (this.default) this.data = { ...this.data, ...this.default }
    this.data.toggle = !!this.data.start

    if (this.data.toggle) {
      this.data.startInternal = this.toTime(this.data.start!)
      this.data.endInternal = this.toTime(this.data.end!)
    }
  }

  @Watch('reset')
  onDefaultChange(newReset: boolean) {
    if (newReset) return
    this.data = { ...this.data, ...this.default }
    this.data.toggle = !!this.data.start

    if (this.data.toggle) {
      this.data.startInternal = this.toTime(this.data.start!)
      this.data.endInternal = this.toTime(this.data.end!)
    }
  }

  @Watch('data.toggle')
  @Watch('data.start')
  @Watch('data.end')
  @Emit('input')
  onDataChanged() {
    return {
      id: this.vid,
      day: this.data.day,
      start: this.data.start,
      end: this.data.end,
    }
  }
}
</script>

<style lang="scss" scoped>
.mr-neg-9 {
  margin-right: -9px !important;
}
</style>
