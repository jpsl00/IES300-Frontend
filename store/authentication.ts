import {
  Module,
  VuexModule,
  VuexMutation,
  VuexAction,
} from 'nuxt-property-decorator'
import dayjs from 'dayjs'
import { $axios } from '~/utils/api'
import * as b64 from '~/utils/b64-helper'

export enum EAuthenticationPermissionLevel {
  'Invalid' = -1,
  'User' = 0,
  'Partner' = 1,
  'Employee' = 2,
  'Admin' = 10,
}

export enum EAuthenticationCode {
  'Registrado.' = 1000,
}

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
  /* public message: string = '' */

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

      await this._login(resp)
    } catch (err) {
      this.context.commit('authError')
    }
  }

  @VuexAction
  async edit(data: IAuthenticationEditUser) {
    this.context.commit('authRequestNoDelete')
    try {
      const encodedData = b64.encodeB64(
        JSON.stringify({
          email: data.email,
          telephone: data.telephone,
          address: data.address,
          workHours: data.workHours,
        })
      )

      const { status }: { status: number } = await $axios.$patch('/user/me', {
        data: encodedData,
      })

      if (status === 200) this.context.commit('authSuccessNoDelete', data)
      else this.context.commit('authErrorNoDelete')
    } catch (err) {
      this.context.commit('authErrorNoDelete')
    }
  }

  @VuexAction
  async _login(data: { token: string; user: IAuthenticationUser }) {
    const { token, user } = data
    await this.context.commit('authSuccess', { token, user })
  }

  /* @VuexAction */
  /* async register(data: IAuthenticationRegisterUser) {
    this.context.commit('registerRequest')
    try {
      const encodedData = b64.encodeB64(
        JSON.stringify({
          name: b64.encodeB64(data.name),
          username: b64.encodeB64(data.username),
          password: b64.encodeB64(data.password),
        })
      )
      const resp: {
        code: number
        token: string
        user: IAuthenticationUser
      } = await $axios.$post('/auth/register', { data: encodedData })

      if (resp.code === 1000) await this._login(resp)
      else this.context.commit('registerFail', resp.code)
    } catch (err) {
      this.context.commit('registerError')
    }
  } */

  @VuexAction
  logout() {
    this.context.commit('authLogout')
  }

  // Mutations
  /* @VuexMutation
  registerFail(code) {
    delete $axios.defaults.headers.common.authorization
    this.status = 'fail'
    this.token = null
    this.user = null
    this.authenticated = false
    this.message =
  } */

  @VuexMutation
  authRequest() {
    this.status = 'loading'
    this.authenticated = false
  }

  @VuexMutation
  authRequestNoDelete() {
    this.status = 'loading'
  }

  @VuexMutation
  authSuccess({ token, user }: { token: string; user: IAuthenticationUser }) {
    $axios.defaults.headers.common.authorization = token
    this.status = 'success'
    this.token = token

    user.birthdate = `${dayjs(user.birthdate).format('YYYY-MM-DD')}`
    user.workHours = user.workHours || { days: [] }

    this.user = user
    this.authenticated = true
  }

  @VuexMutation
  authSuccessNoDelete(user: IAuthenticationEditUser) {
    this.user = { ...this.user!, ...user }
    this.status = 'success'
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
  authErrorNoDelete() {
    this.status = 'error'
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
  get isLoggedIn(): boolean {
    return this.authenticated && !!this.token
  }

  get authStatus() {
    return this.status
  }

  get role() {
    return (
      this.authenticated ? this.user?.role : -1
    ) as EAuthenticationPermissionLevel
  }

  get isClient(): boolean {
    return this.isLoggedIn && this.role === EAuthenticationPermissionLevel.User
  }

  get isPartner(): boolean {
    return (
      this.isLoggedIn && this.role === EAuthenticationPermissionLevel.Partner
    )
  }

  get isEmployee(): boolean {
    return (
      this.isLoggedIn && this.role >= EAuthenticationPermissionLevel.Employee
    )
  }
}

// TS Stuff
export interface IAuthenticationLoginUser {
  username: string
  password: string
}

export interface IAuthenticationEditUser {
  email: string
  telephone: string
  address: string
  workHours: {
    days: {
      day: number
      start: number | null
      end: number | null
    }[]
  }
}

export interface IAuthenticationUser
  extends IAuthenticationLoginUser,
    IAuthenticationEditUser {
  readonly id: number
  name: string
  role: number
  birthdate: string
}
