<template class="has-navbar-fixed-top">
  <div>
    <NavbarComponent />
    <nuxt />
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'

// Components
import NavbarComponent from '@/components/Navbar'

@Component({
  components: {
    NavbarComponent,
  },
})
export default class DefaultLayout extends Vue {}
</script>
