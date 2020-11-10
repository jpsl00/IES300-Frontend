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
    <section class="section">
      <div class="container">
        <div class="columns is-vcentered is-centered is-multiline">
          <div class="column is-6-desktop is-12-mobile">
            <div class="container">
              <nav class="level">
                <div class="level-item has-text-centered">
                  <h3 class="title is-3 has-text-primary">
                    Bem-vindo à Bioveda
                  </h3>
                </div>
              </nav>
              <div class="block">
                <p>
                  Com sede no bairro de Santana (São Paulo – SP) a Bioveda tem
                  seu enfoque na Medicina Ayurvedica e o uso da Fitoterapia.
                  Temos um cuidado especial para Saúde Mental. Oferecemos um
                  conjunto de tratamentos em Ayurveda desde a consulta
                  ayurvédica e as técnicas compondo os tratamentos:
                  <strong>
                    Shirodhara, Abhyanga, Udwartana, Garshana, Swedana,
                    Shiroabhyanga, Shiropichu, Lepa e Kati Basti.
                  </strong>
                </p>
              </div>
              <div class="block">
                <p>
                  Também oferecemos atendimentos com
                  <strong>
                    Ventosaterapia e Massagens como: Massagem Harmonia, Shiatsu,
                    Muscle Melt, Back Massage, Relax Pernas e Pés, Massagem
                    Equilíbrio Feminino, Head Massage, Drenagem Linfática e
                    Stretching
                  </strong>
                  . Temos a preocupação em utilizar Produtos Naturais e Veganos,
                  pois amamos a Natureza!
                </p>
              </div>
              <div class="block">
                Trata-se, portanto, de uma nova proposta de cuidado holístico,
                no qual cada pessoa tem seu tratamento único e integral.
                Conhecendo melhor a integralidade de cada ser, as necessidades
                individuais são atendidas e tratadas de modo global, visando ao
                equilíbrio e ao caminho para a consciência plena.
              </div>
            </div>
          </div>
          <div class="column is-6-desktop is-hidden-mobile">
            <div class="content">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7317.710982458599!2d-46.634051!3d-23.501714!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cef7d2f39e5517%3A0x3e92dc00fab4c521!2sR.%20Emb.%20Jo%C3%A3o%20Neves%20da%20Fontoura%2C%20175%20-%20Santana%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2002013-040!5e0!3m2!1spt-BR!2sbr!4v1604415898068!5m2!1spt-BR!2sbr"
                width="100%"
                height="350px"
                frameborder="0"
                style="border: 0; border-radius: 6px"
                allowfullscreen=""
                aria-hidden="false"
                tabindex="0"
                class="box p-0"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section has-background-white-ter">
      <div class="container">
        <nav class="level">
          <div class="level-item has-text-centered">
            <h3 class="title is-3 has-text-primary">Tratamentos Ayurveda</h3>
          </div>
        </nav>
        {{ tratamentos }}
        <b-carousel-list></b-carousel-list>
      </div>
    </section>
  </div>
  <!-- <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App :)" />
  </div> -->
</template>

<script lang="ts">
import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Home extends Vue {
  async asyncData({ $axios }: { $axios: NuxtAxiosInstance }) {
    let tratamentos = []
    try {
      tratamentos = await $axios.$get('/')
    } catch (err) {}
    return { tratamentos }
  }
}
</script>

<style scoped>
.card-header-title {
  color: #363636 !important;
}

.hero {
  background: url('~assets/bioveda-centro-de-saude-integrativa-ayurveda.webp')
    center center !important;
  background-size: cover !important;
}
</style>
