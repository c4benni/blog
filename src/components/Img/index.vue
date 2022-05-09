<template>
  <div
    class="Img"
    :style="{
      width: `${width}px`,
      height: `${height}px`,
      minWidth: `${width}px`,
      minHeight: `${height}px`,
    }"
  >
    <IconWrapper
      v-if="!hasLoaded && showLoader"
      class="loader"
      :size="loaderSize"
    >
      <Spinner />
    </IconWrapper>
    <img
      :src="src"
      :alt="alt"
      :loading="loading"
      decoding="async"
      class="image"
      :class="{
        [loadedClass]: hasLoaded,
      }"
      :style="{
        opacity: !hasLoaded ? '0' : undefined,
        width: `${width}px`,
        height: `${height}px`,
        minWidth: `${width}px`,
        minHeight: `${height}px`,
      }"
      @load="onLoad"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";
import IconWrapper from "../IconWrapper/index.vue";
import Spinner from "../Icon/Spinner.vue";

export default defineComponent({
  name: "Img",
  props: {
    showLoader: Boolean,
    loaderSize: {
      type: Number,
      default: 32,
    },
    alt: {
      type: String,
      required: true,
    },
    src: {
      type: String,
      required: true,
    },
    loading: {
      type: String as PropType<"eager" | "lazy">,
      default: "lazy",
    },
    loadedClass: {
      type: String,
      default: "fade-appear",
    },
    width: {
      type: Number,
      default: undefined,
    },
    height: {
      type: Number,
      default: undefined,
    },
  },
  setup(_props) {
    const props = computed(() => _props);
    const hasLoaded = ref(false);
    const onLoad = () => {
      hasLoaded.value = true;
    };
    return { onLoad, hasLoaded };
  },
  components: { IconWrapper, Spinner },
});
</script>

<style scoped>
.Img {
  display: grid;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
}

.loader {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
}
.image {
  font-size: 1rem;
  font-weight: 400;
  color: var(--raised-text);
  user-select: none;
}
</style>
