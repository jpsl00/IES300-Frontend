import { Middleware } from '@nuxt/types'

const authMiddleware: Middleware = (context) => {
  const { store, redirect } = context

  if (!store.getters['authentication/isLoggedIn']) return redirect('/login')
}

export default authMiddleware
