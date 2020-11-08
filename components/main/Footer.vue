<template>
  <footer class="footer">
    <div class="container">
      <div class="columns is-multiline">
        <div class="column is-1"></div>
        <div class="column is-3">
          <aside class="menu">
            <p class="menu-label">Links</p>
            <ul class="menu-list">
              <li><router-link to="/">Home</router-link></li>
              <li><a>Cursos</a></li>
              <li>
                <a>Serviços</a>
                <ul>
                  <li>
                    <router-link to="/serviços/agendamento"
                      >Agendamento</router-link
                    >
                  </li>
                </ul>
              </li>
              <li><a>Blog</a></li>
            </ul>
          </aside>
        </div>
        <div class="column is-7">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7317.710982458599!2d-46.634051!3d-23.501714!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cef7d2f39e5517%3A0x3e92dc00fab4c521!2sR.%20Emb.%20Jo%C3%A3o%20Neves%20da%20Fontoura%2C%20175%20-%20Santana%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2002013-040!5e0!3m2!1spt-BR!2sbr!4v1604415898068!5m2!1spt-BR!2sbr"
            width="100%"
            height="100%"
            frameborder="0"
            style="border: 0"
            allowfullscreen=""
            aria-hidden="false"
            tabindex="0"
          ></iframe>
        </div>
        <div class="column is-1"></div>
      </div>
      <!-- <div class="column is-12">
        Site made with <i class="fas fa-heart red"></i> by
        <strong>Grupo 3</strong>
      </div> -->
    </div>
  </footer>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
@Component({})
export default class Footer extends Vue {}
</script>

<style scoped>
.fa-heart {
  margin-left: 3px;
  margin-right: 3px;
}
.red {
  color: red;
}
.footer {
  padding-bottom: 3rem;
}
</style>
