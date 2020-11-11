<template>
  <div>
    <section class="hero is-large is-bold is-primary">
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
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section has-background-ayurveda has-inset-shadow">
      <div class="container">
        <nav class="level">
          <div class="level-item has-text-centered">
            <h3 class="title is-3 has-text-primary">Tratamentos Ayurveda</h3>
          </div>
        </nav>
        <HomeCarousel :data="tratamentos" />
      </div>
    </section>
    <section class="section">
      <div class="container">
        <nav class="level">
          <div class="level-item has-text-centered">
            <h3 class="title is-3 has-text-primary">Terapias Corporais</h3>
          </div>
        </nav>
        <HomeCarousel :data="terapias" />
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
import HomeCarousel from '~/components/HomeCarousel.vue'
import { ICarouselData } from '~/types/components/Carousel.interface'

@Component({
  components: {
    HomeCarousel,
  },
})
export default class Home extends Vue {
  async asyncData({ $axios }: { $axios: NuxtAxiosInstance }) {
    let tratamentos: ICarouselData[] = [
      {
        title: 'Avaliação Ayurvédica',
        content:
          'A consulta terapêutica ayurvédica consiste em uma avaliação que inclui a forma tradicional de diagnóstico ayurvédico, focando em pontos principais, como a constituição ou a identificação do dosha, as desarmonias existentes, a avaliação de presença de ama (toxina) no organismo e o seu nível de vitalidade.',
        image:
          'https://bioveda.com.br/wp-content/uploads/2018/02/avaliacao-ayurvedica-bioveda-ayurveda-1.jpg',
      },
      {
        title: 'Udwartana',
        content:
          'Massagem realizada por um ou dois profissionais, com uma mistura de ervas em pó, é indicada quando há um desequilíbrio do dosha Kapha. Por isso, a udwartana costuma ser solicitada em tratamentos terapêuticos. Recomendada em casos de obesidade, de sensação de peso no corpo, de indisposição ou de falta de energia.',
        image:
          'https://bioveda.com.br/wp-content/uploads/2018/02/udwartana-bioveda-ayurveda-e-bem-estar-3.jpg',
      },
      {
        title: 'Abhyanga',
        content:
          'A abhyanga geralmente é um tratamento solicitado pelo terapeuta. Trata-se de uma massagem, feita por um ou dois profissionais, com óleo morno herbalizado.',
        image:
          'https://bioveda.com.br/wp-content/uploads/2018/02/abhyanga-bioveda-ayurveda-e-bem-estar.jpg',
      },
      {
        title: 'Abhyanga Facial',
        content:
          'Feita com óleo morno herbalizado, acalma a mente e contribui para a nutrição da pele e dos cabelos, intensificando o brilho de ambos e promovendo o relaxamento e o rejuvenescimento.',
        image:
          'https://bioveda.com.br/wp-content/uploads/2018/02/abhyanga-facial-bioveda-ayurveda-e-bem-estar.jpg',
      },
      {
        title: 'Shirodhara',
        content:
          'É um fio de óleo morno herbalizado que cai suavemente na testa do paciente. O fluxo constante de óleo produz ondas circulares que vão acalmar o cérebro. O shirodhara geralmente é um tratamento solicitado pelo terapeuta.',
        image:
          'https://bioveda.com.br/wp-content/uploads/2018/02/shirodhara-bioveda-ayurveda-e-bem-estar.jpg',
      },
      {
        title: 'Dinacharya',
        content:
          'Rotina diária com hábitos de harmonização do paciente segundo os princípios Ayurvédicos e de acordo com sua constituição individual.',
        image:
          'https://bioveda.com.br/wp-content/uploads/2018/03/dina-charya-1.jpg',
      },
      {
        title: 'Kati Basti',
        content:
          'É uma aplicação de calor à região sacral ou lombar através da retenção de óleo medicado morno dentro de uma estrutura especialmente formada nessa região.',
        image:
          'https://bioveda.com.br/wp-content/uploads/2018/08/kati-basti.jpg',
      },
      {
        title: 'Lepa',
        content:
          'O Lepa é o tratamento ayurvédico que utiliza uma mistura especial de ervas, minerais, óleos vegetais e essenciais para formar uma pasta medicinal para aplicação tópica. São pastas faciais e corporais.',
        image: 'https://bioveda.com.br/wp-content/uploads/2018/08/Lepa.jpg',
      },
      {
        title: 'Shiroabhyanga',
        content:
          'Terapia que faz sentado e trata dos desequilíbrios de Vata ou Pitta na cabeça e pescoço, Problemas no couro cabeludo como: coceira, secura, dermatite seborreica, queda e cabelos brancos. Cefaleia, dores e tensão cervical, Insônia e Estresse.',
        image:
          'https://bioveda.com.br/wp-content/uploads/2018/08/shiroabhyanga.jpg',
      },
      {
        title: 'Shiropichu',
        content:
          'É um tratamento ayurvédico que compreende dois termos, Shiro significa ``cabeça``, Pichu significa ``um cotonete ou um pano estéril embebido em óleos medicinais``.',
        image:
          'https://bioveda.com.br/wp-content/uploads/2018/08/shiropichu.jpg',
      },
      {
        title: 'Swedana',
        content:
          'É sauna úmida de corpo inteiro – exceto a cabeça. Utiliza ervas e óleos essenciais. É uma das mais antigas práticas de terapia de aquecimento do oriente.',
        image: 'https://bioveda.com.br/wp-content/uploads/2018/08/swedana.jpg',
      },
      {
        title: 'Garshana',
        content:
          'É uma terapia que é aplicada em todo o corpo (menos rosto), propício para a perda de peso. Diferente do abhyanga onde é aplicado óleo, nessa massagem aplicasse sal grosso e cânfora, utiliza luvas de seda para dar um toque mais profundo e é feito movimentos específicos por um ou dois terapeutas.',
        image: 'https://bioveda.com.br/wp-content/uploads/2018/08/Garshana.jpg',
      },
    ]
    let terapias: ICarouselData[] = [
      {
        title: 'Yoga Massagem Ayurvédica',
        content:
          'Massagem que trabalha as cadeias musculares e as articulações de todo o corpo, mesclando toques suaves e profundos com alongamentos e trações de yoga.',
        image:
          'https://bioveda.com.br/wp-content/uploads/2018/02/massagem-ayurvedica-bioveda-ayurveda-1.jpg',
      },
      {
        title: 'Drenagem Linfática',
        content:
          'É uma massagem que alterna micropressões ao longo do corpo com movimentos lentos sobre a camada mais superficial da pele. As técnicas utilizadas estimulam o sistema linfático, diminuindo a retenção de líquidos no organismo e evitando celulites.',
        image:
          'https://bioveda.com.br/wp-content/uploads/2018/02/derenagem-linfatica-bioveda-ayurveda-e-bem-estar.jpg',
      },
      {
        title: 'Massagem Harmonia',
        content:
          'É uma massagem realizada em todo o corpo, combinando movimentos de deslizamento, de amassamento e de rolamento.',
        image:
          'https://bioveda.com.br/wp-content/uploads/2018/02/massagem-harmonia-bioveda-ayurveda-e-bem-estar.jpg',
      },
      {
        title: 'Muscle Melt',
        content:
          'Massagem realizada com toques profundos e firmes. Ideal para aliviar tensões musculares e revigorar o corpo.',
        image:
          'https://bioveda.com.br/wp-content/uploads/2018/02/muscle-melt-bioveda-ayurveda-e-bem-estar.jpg',
      },
      {
        title: 'Shiatsu',
        content:
          'Massoterapia oriunda do Japão e obtida pela pressão dos dedos sobre pontos energéticos do corpo no trajeto dos meridianos. Em japonês, o nome é mais transparente: “shi” = dedos + “atsu” = pressão.',
        image:
          'https://bioveda.com.br/wp-content/uploads/2018/02/shiatsu-bioveda-ayurveda-e-bem-estar.jpg',
      },
      {
        title: 'Relax Pernas e Pés',
        content:
          'É uma massagem para quem deseja relaxamento e alívio das pernas e dos pés. Reduz edemas e o cansaço do dia a dia. Favorece a circulação sanguínea e proporciona uma sensação de leveza.',
        image:
          'https://bioveda.com.br/wp-content/uploads/2018/02/relax-pernas-e-pes-bioveda-ayurveda-e-bem-estar.jpg',
      },
      {
        title: 'Massagem Equilíbrio Feminino',
        content:
          'Massagem que trabalha pontos específicos para manter os equilíbrios hormonal e intestinal da mulher. É uma sinergia terapêutica de óleos essenciais e uma linha de produtos naturais.',
        image:
          'https://bioveda.com.br/wp-content/uploads/2018/02/massagem-equilibrio-feminino-bioveda-ayurveda-e-bem-estar.jpg',
      },
      {
        title: 'Back Massage',
        content:
          'Massagem realizada na parte superior do corpo, combinando movimentos de deslizamento, amassamento e rolamento.',
        image:
          'https://bioveda.com.br/wp-content/uploads/2018/02/back-massage-bioveda-ayurveda-e-bem-estar.jpg',
      },
      {
        title: 'Head Massage',
        content:
          'Massagem delicada na cabeça. A técnica ajuda a liberar tensões e proporciona uma prazerosa sensação de bem-estar e relaxamento.',
        image:
          'https://bioveda.com.br/wp-content/uploads/2018/02/head-massage-bioveda-ayurveda-e-bem-estar.jpg',
      },
    ]
    try {
      await $axios.$get('/')
      // tratamentos = await $axios.$get('/treatment')
      // terapias = await $axios.$get('/therapy)
    } catch (err) {}
    return { tratamentos, terapias }
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

.has-background-ayurveda {
  background: url('~assets/fundo-ayurveda.jpg') center center repeat fixed;
  background-size: contain;
}

.has-inset-shadow {
  box-shadow: inset 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1),
    inset 0 0px 0 1px rgba(10, 10, 10, 0.02),
    inset 0 -0.5em 1em -0.125em rgba(10, 10, 10, 0.1);
}
</style>
