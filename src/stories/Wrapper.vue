<template>
  <div style="position: absolute; top: 0; left: 0; bottom: 0; right: 0">
    <Head
      :link="[
        {
          uid: 'font-preconnect',
          href: 'https://fonts.googleapis.com',
          rel: 'preconnect',
        },
        {
          uid: 'font-preconnect-1',
          href: 'https://fonts.gstatic.com',
          rel: 'preconnect',
          crossorigin: '',
        },
        {
          uid: 'font',
          href: 'https://fonts.googleapis.com/css2?family=Sarabun:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400&display=swap',
          rel: 'stylesheet',
        },
      ]"
    />
    <header
      style="
        padding: 0 3rem;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        height: 44px;
        position: fixed;
        top: 1rem;
        width: 100%;
        z-index: 1;
      "
    >
      <ThemeButton />
    </header>

    <div class="relative" style="height: calc(100% - 44px)">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from "@vue/runtime-core";
import theme, { installTheme } from "../utils/theme";
// add global css files
import "../assets/css/reset.css";
import "../assets/css/scrollbar.css";
import "../assets/css/utilities.css";
import "../assets/css/variables.css";
import ThemeButton from "../components/Header/ThemeButton/index.vue";
import Head from "../components/Head/index.vue";

export default defineComponent({
  name: "App",
  setup() {
    onBeforeMount(() => {
      installTheme();

      theme.value.dark = false;
    });
  },
  components: { ThemeButton, Head },
});
</script>

<style>
body {
  min-height: 100vh;
}
</style>

<style scoped>
.main {
  padding: 2rem 0.5rem;
  min-height: calc(100vh - var(--header-height));
  max-width: 600px;
  margin: 0 auto;
}

@media (min-width: 970px) {
  .main {
    max-width: 100%;
  }
}
</style>
