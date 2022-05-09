<template>
  <div>
    <UiTransition
      :config="['fade(0,0.8)', 'scale(0.85)']"
      :spring="{ enter: 'wobbly' }"
      :delay="150"
    >
      <ThemeButton v-if="drawer" class="theme-button" />
    </UiTransition>

    <Button
      :title="`${drawer ? 'Close' : 'Open'} nav`"
      icon
      :aria-controls="activatorId"
      :aria-expanded="drawer"
      aria-haspopup="dialog"
      @click="drawer = !drawer"
    >
      <IconWrapper>
        <Component :is="icon" />
      </IconWrapper>
    </Button>
  </div>

  <Teleport to="body">
    <div
      :id="activatorId"
      role="dialog"
      tabindex="0"
      aria-describedby="drawer-id"
      :aria-hidden="!drawer || undefined"
      class="Drawer"
    >
      <h1 v-if="drawer" id="drawer-id" class="sr-only">Navigation drawer</h1>

      <UiTransition
        :config="['slideY(-10)', 'fade']"
        :duration="{ enter: 150 }"
        v-slot="{ inProgress }"
      >
        <div v-if="drawer" class="content pseudo">
          <nav v-if="!inProgress">
            <UiTransition
              tag="ul"
              appear
              group
              :config="{
                enter: ['slideY(-100)', 'fade'],
                leave: false,
              }"
              spring="wobbly"
              class="nav-links"
            >
              <li
                v-for="(link, i) in links"
                :key="link.title"
                :data-uit-delay="`${i * 100}`"
              >
                <Button
                  :active="link.active"
                  :to="link.to"
                  size="lg"
                  :autofocus="i === 0"
                >
                  {{ link.title }}
                </Button>
              </li>
            </UiTransition>
          </nav>
        </div>
      </UiTransition>
    </div>
  </Teleport>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";
import Button from "../../Button/index.vue";
import IconWrapper from "../../IconWrapper/index.vue";
import Menu from "../../Icon/Menu.vue";
import Close from "../../Icon/Close.vue";
import { computed } from "@vue/reactivity";
import { drawer } from "../../../store/mobileDrawer";
import ThemeButton from "../ThemeButton/index.vue";
import { links } from "../utils";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "HeaderDrawer",
  components: { Button, IconWrapper, Menu, Close, ThemeButton },
  setup() {
    const icon = computed(() => (drawer.value ? "Close" : "Menu"));

    // to watch route and close drawer when page changes
    const route = computed(useRoute);

    watch(
      () => route.value.fullPath,
      () => {
        drawer.value = false;
      }
    );

    watch(
      () => drawer.value,
      (newVal) => {
        const html = document.documentElement || document.querySelector("html");

        if (newVal) {
          html.classList.add("lock-html");
        } else {
          html.classList.remove("lock-html");
        }
      }
    );

    return {
      icon,
      drawer,
      activatorId: "drawer-control",
      links,
    };
  },
});
</script>

<style scoped>
.Drawer {
  position: fixed;
  top: var(--header-height);
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  pointer-events: none;
}

.content {
  background-color: var(--surface);
  pointer-events: auto;
  z-index: 1;
  padding: 2rem 1.5rem 1rem;
}

.nav-links {
  display: grid;
  align-content: flex-start;
  row-gap: 1.5rem;
}

.theme-button {
  margin-right: 0.75rem;
}
</style>
