<template>
  <RouterLink v-if="content?.id" :to="`/post/${content?.id}`" class="BlogCard">
    <Img
      :src="content.thumbnail.src"
      :alt="content.thumbnail.alt"
      :height="320"
      show-loader
      class="thumbnail"
    />

    <div class="info">
      <h3 class="line-clamp-1">
        {{ content?.title }}
      </h3>

      <h4 class="line-clamp-2 subtitle">
        {{ content?.subtitle }}
      </h4>
    </div>
  </RouterLink>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Img from "../Img/index.vue";
import { Blog } from "./types";

export default defineComponent({
  name: "BlogCard",
  components: { Img },
  props: {
    content: {
      type: Object as PropType<Blog>,
      required: true,
    },
  },
});
</script>

<style scoped>
.BlogCard {
  display: grid;
  border-radius: var(--rounded-lg);
  background-color: var(--raised);
  --raised-alpha: 0.5;
  overflow: hidden;
  border: var(--divide);
  --divide-color-alpha: 0.25;
  transition: 0.25s;
  transition-property: transform, box-shadow;
}

.thumbnail {
  border-bottom: var(--divide);
  --divide-color-alpha: 0.2;
  max-width: 100%;
  width: 100%;
  object-fit: fill;
}

.BlogCard:active {
  transform: scale3d(1.01, 1.01, 1);
  --raised-alpha: 0.85;
}

@media (hover: hover) and (pointer: fine) {
  .BlogCard:hover {
    box-shadow: var(--shadow-lg);
    transition-property: all;
  }

  .BlogCard:hover {
    transform: translate3d(0, -2px, 0);
  }

  .BlogCard:active {
    transform: translate3d(0, -2px, 0) scale3d(1.025, 1.025, 1);
  }
}

.info {
  padding: 0.75rem 1rem 1.25rem;
}

.info > h3,
.subtitle {
  color: var(--raised-text);
}

.subtitle {
  --raised-text-alpha: 60%;
  font-weight: 500;
  font-size: 0.95rem;
}

@media (min-width: 970px) {
  .subtitle {
    font-size: 0.9rem;
  }
}
</style>
