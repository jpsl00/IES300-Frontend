<template>
  <div>
    <section class="hero is-fullheight is-bold is-primary">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column is-6-desktop is-12-mobile">
              <div class="card">
                <div class="card-header">
                  <h4 class="card-header-title title is-4">
                    Ayurveda e Bem-Estar
                  </h4>
                </div>
                <div class="card-content">
                  “Para conhecer suas experiências passadas, basta examinar seu
                  corpo hoje. Para saber como será seu corpo no futuro, basta
                  examinar suas experiências hoje.”
                </div>
                <div class="card-footer">
                  <p class="card-footer-item">Antigo Ditado Indiano</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  <!-- <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App :)" />
  </div> -->
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
@Component({})
export default class Home extends Vue {}
</script>

<style scoped>
.card-header-title {
  color: #363636 !important;
}

.hero {
  background: url('~assets/bioveda-centro-de-saude-integrativa-ayurveda.jpg')
    center center !important;
  background-size: cover !important;
}
</style>
