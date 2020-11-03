<template>
  <footer class="footer">
    <div class="container">
      <div class="columns is-multiline">
        <div class="column is-2"></div>
        <div class="column is-3">
          <aside class="menu">
            <p class="menu-label">
              Links
            </p>
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
      </div>
      <!-- <div class="column is-12">
        Site made with <i class="fas fa-heart red"></i> by
        <strong>Grupo 3</strong>
      </div> -->
    </div>
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

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
</style>
