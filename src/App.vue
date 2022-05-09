<template>
  <div
    :aria-hidden="drawerActive || undefined"
    @touchstart.passive="
      () => {
        /**to enable :active state**/
      }
    "
  >
    <Header />

    <main class="main">
      <RouterView v-slot="{ Component }">
        <UiTransition
          :config="{
            leave: false,
            enter: ['slideY(20,0,`px`)', 'fade'],
          }"
          spring="gentle"
        >
          <Component :is="Component" :key="$route.fullPath" />
        </UiTransition>
      </RouterView>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from "@vue/runtime-core";
import { installTheme } from "./utils/theme";
import Header from "./components/Header/index.vue";
import { computed } from "@vue/reactivity";
import { drawer } from "./store/mobileDrawer";

export default defineComponent({
  name: "App",
  components: { Header },
  setup() {
    onBeforeMount(installTheme);

    const drawerActive = computed(() => drawer.value);

    return {
      drawerActive,
    };
  },
});
</script>

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
