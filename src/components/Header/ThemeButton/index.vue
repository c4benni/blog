<template>
  <Button @click="toggleTheme" icon class="theme-icon" title="Toggle theme">
    <UiTransition
      :config="{
        enter: ['scale(0.5)', 'fade'],
        leave: false,
      }"
      spring="wobbly"
    >
      <IconWrapper :key="themeIcon">
        <Component :is="themeIcon" />
      </IconWrapper>
    </UiTransition>
  </Button>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import theme from "../../../utils/theme";
import Button from "../../Button/index.vue";
import SunIcon from "../../Icon/Sun.vue";
import MoonIcon from "../../Icon/Moon.vue";
import IconWrapper from "../../IconWrapper/index.vue";

export default defineComponent({
  name: "ThemeButton",
  components: { Button, IconWrapper, SunIcon, MoonIcon },
  setup() {
    const themeIcon = computed(() =>
      theme.value.dark ? "MoonIcon" : "SunIcon"
    );
    const toggleTheme = () => (theme.value.dark = !theme.value.dark);
    return {
      theme,
      themeIcon,
      toggleTheme,
    };
  },
});
</script>
