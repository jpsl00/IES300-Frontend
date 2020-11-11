<template>
  <div>
    <NavbarComponent />
    <nuxt />
    <FooterComponent />
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'

// Components
import NavbarComponent from '@/components/main/Navbar'
import FooterComponent from '@/components/main/Footer'

@Component({
  components: {
    NavbarComponent,
    FooterComponent,
  },
})
export default class DefaultLayout extends Vue {}
</script>
