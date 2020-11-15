import {
  Module,
  VuexModule,
  VuexMutation,
  VuexAction,
} from 'nuxt-property-decorator'
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
  public user: IAuthenticationUser | null = null
  public authenticated: boolean = false

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
      const resp: {
        token: string
        user: IAuthenticationUser
      } = await $axios.$post('/auth/login', { data: encodedData })
      const { token, user } = resp
      await this.context.commit('authSuccess', { token, user })
    } catch (err) {
      this.context.commit('authError')
    }
  }

  @VuexAction
  logout() {
    this.context.commit('authLogout')
  }

  // Mutations
  @VuexMutation
  authRequest() {
    this.status = 'loading'
    this.authenticated = false
  }

  @VuexMutation
  authSuccess({ token, user }: { token: string; user: IAuthenticationUser }) {
    $axios.defaults.headers.common.authorization = token
    this.status = 'success'
    this.token = token
    this.user = user
    this.authenticated = true
  }

  @VuexMutation
  authError() {
    delete $axios.defaults.headers.common.authorization
    this.status = 'error'
    this.token = null
    this.user = null
    this.authenticated = false
  }

  @VuexMutation
  authLogout() {
    delete $axios.defaults.headers.common.authorization
    this.status = 'loggedOut'
    this.status = null
    this.token = null
    this.authenticated = false
  }

  // Getters
  get isLoggedIn() {
    return this.authenticated && !!this.token
  }

  get authStatus() {
    return this.status
  }

  get role() {
    return (this.authenticated
      ? this.user?.role
      : -1) as EAuthenticationPermissionLevel
  }
}

// TS Stuff
export interface IAuthenticationLoginUser {
  username: string
  password: string
}

export interface IAuthenticationUser {
  id: number
  name: string
  role: number
  birthdate: string
}

export enum EAuthenticationPermissionLevel {
  'Invalid' = -1,
  'User' = 0,
  'Partner' = 1,
  'Employee' = 2,
  'Admin' = 10,
}
