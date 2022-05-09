<template>
  <header
    class="Header fill-after"
    :class="{
      'hide-divider': drawerActive,
    }"
  >
    <h1 class="title">
      <RouterLink to="/">
        <Img
          src="/logo.png"
          alt="Logo"
          :height="36"
          :width="36"
          class="circle logo"
          :style="{
            filter: theme.dark ? 'invert(1)' : undefined,
          }"
        />

        Untitled
      </RouterLink>
    </h1>

    <div class="spacer" />

    <template v-if="!breakpoint.isMobile">
      <nav>
        <ul class="link-group">
          <li v-for="link in links" :key="link.title">
            <Button :active="link.active" :to="link.to">
              {{ link.title }}
            </Button>
          </li>
        </ul>
      </nav>

      <hr class="nav-divider" />

      <ThemeButton class="theme-icon" />
    </template>

    <Drawer v-else />

    <hr class="bottom-divider" />
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Img from "../Img/index.vue";
import theme from "../../utils/theme";
import Button from "../Button/index.vue";
import useBreakpoint from "../../utils/breakpoint/hook";
import Drawer from "./Drawer/index.vue";
import { drawer } from "../../store/mobileDrawer";
import ThemeButton from "./ThemeButton/index.vue";
import { links } from "./utils";

export default defineComponent({
  name: "Header",
  components: {
    Img,
    Button,
    Drawer,
    ThemeButton,
  },
  setup() {
    const breakpoint = useBreakpoint();

    const drawerActive = drawer;

    return { theme, links, breakpoint, drawerActive };
  },
});
</script>

<style scoped>
.Header {
  height: var(--header-height);
  isolation: isolate;
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 0 0.75rem;
}

.Header::after {
  background-color: var(--surface);
  --surface-alpha: 0.975;
  z-index: -1;
}

/* hi mozilla */
@supports (backdrop-filter: blur(1px)) {
  .Header::after {
    backdrop-filter: blur(50px);
    --surface-alpha: 0.8;
  }
}

.bottom-divider,
.Header::after {
  width: 100vw;
  left: 50%;
  transform: translateX(-50%);
  position: absolute;
}

.Header.hide-divider::after {
  --surface-alpha: 100%;
}

.title > a,
.Header {
  display: flex;
  align-items: center;
}

.title > a {
  font-size: 1.25rem;
  color: var(--surface-text);
}

.logo {
  border: 1.25px solid var(--divide-color);
  --divide-color-alpha: 0.2;
  margin-right: 0.75rem;
}

.spacer {
  flex-grow: 1;
}

.link-group {
  display: grid;
  grid-auto-flow: column;
  column-gap: 0.75rem;
}

.nav-divider,
.bottom-divider {
  background-color: transparent;
  border: none;
  --divide-color-alpha: 25%;
  pointer-events: none;
}

.nav-divider {
  height: 75%;
  width: 1px;
  border-right: var(--divide);
  margin: 0 1rem;
}

.dark .nav-divider {
  --divide-color-alpha: 50%;
}

.bottom-divider {
  border-bottom: var(--divide);
  --divide-color-alpha: 0.25;
  transition: opacity 0.25s;
  bottom: 0;
  height: 1px;
}

.Header.hide-divider .bottom-divider {
  opacity: 0;
}

/* large device */
@media (min-width: 970px) {
  .Header {
    padding: 0;
  }
}
</style>
