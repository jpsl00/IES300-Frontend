/* eslint-disable import/no-mutable-exports */

import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'

// Stores
import authentication from '@/store/authentication'
let authenticationStore: authentication

function initialiseStores(store: Store<any>): void {
  authenticationStore = getModule(authentication, store)
}

export { initialiseStores, authenticationStore }
