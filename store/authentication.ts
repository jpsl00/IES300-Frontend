import {
  Module,
  VuexModule,
  VuexMutation,
  VuexAction,
} from 'nuxt-property-decorator'
import { IAuthenticationLoginUser } from '~/typings/store/authentication'
import { $axios } from '~/utils/api'
import * as b64 from '~/utils/b64-helper'

@Module({
  name: 'authentication',
  stateFactory: true,
  namespaced: true,
  preserveState: true,
})
export default class Authorization extends VuexModule {
  public status: string | null = null
  public token: string | null = null
  public user: Object | null = null

  // Actions
  @VuexAction
  async login(data: IAuthenticationLoginUser) {
    this.context.commit('authRequest')
    try {
      const encodedData = b64.encodeB64(
        JSON.stringify({
          username: b64.encodeB64(data.username),
          password: b64.encodeB64(data.password),
        })
      )
      console.log(encodedData)
      const resp = await $axios.$post('/auth/login', { data: encodedData })
      const { token, user } = resp

      $axios.defaults.headers.common.authorization = token
      this.context.commit('authSuccess', token, user)
    } catch (err) {
      this.context.commit('authError')
    }
  }

  @VuexAction
  logout() {
    this.context.commit('authLogout')
    delete $axios.defaults.headers.common.authorization
  }

  // Mutations
  @VuexMutation
  authRequest() {
    this.status = 'loading'
  }

  @VuexMutation
  authSuccess(token: string, user: Object) {
    this.status = 'success'
    this.token = token
    this.user = user
  }

  @VuexMutation
  authError() {
    this.status = 'error'
    this.token = null
    this.user = null
  }

  @VuexMutation
  authLogout() {
    this.status = 'loggedOut'
    this.status = null
    this.token = null
  }

  // Getters
  get isLoggedIn() {
    return !!this.token
  }

  get authStatus() {
    return this.status
  }
}
