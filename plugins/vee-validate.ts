/* eslint-disable import/namespace */
import { extend } from 'vee-validate'
import { required, min, max } from 'vee-validate/dist/rules'
import { messages } from 'vee-validate/dist/locale/pt_BR.json'

extend('required', {
  ...required,
  message: messages.required,
})

extend('min', {
  ...min,
  message: messages.min,
})

extend('max', {
  ...max,
  message: messages.max,
})
