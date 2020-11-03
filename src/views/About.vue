<template>
  <div class="about">
    <navbar />
    <h1>This is an about page</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Navbar from "@/components/Navbar.vue";

@Component({
  components: {
    Navbar,
  },
})
export default class About extends Vue {}
</script>
