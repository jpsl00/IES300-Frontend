/* eslint-disable camelcase */
import { extend } from 'vee-validate'
import {
  email,
  required,
  min,
  max,
  min_value,
  max_value,
  regex,
} from 'vee-validate/dist/rules'
import { messages } from 'vee-validate/dist/locale/pt_BR.json'

extend('email', {
  ...email,
  message: messages.email,
})

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

extend('min_value', {
  ...min_value,
  message: messages.min_value,
})

extend('max_value', {
  ...max_value,
  message: messages.max_value,
})

extend('regex', {
  ...regex,
  message: messages.regex,
})
