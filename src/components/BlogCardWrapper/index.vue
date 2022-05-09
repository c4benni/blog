<template>
  <UiTransition
    tag="section"
    group
    :config="{
      leave: false,
      enter: ['slideY(10)', 'fade'],
    }"
    class="BlogCardWrapper"
    spring="gentle"
    appear
  >
    <BlogCard
      v-for="(blog, i) in blogs"
      :key="i"
      :content="blog"
      :data-uit-delay="`${i * 75}`"
    />
  </UiTransition>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Blog } from "../BlogCard/types";
import Img from "../Img/index.vue";
import BlogCard from "../BlogCard/index.vue";

export default defineComponent({
  name: "BlogCardWrapper",
  components: { Img, BlogCard },

  props: {
    blogs: {
      type: Array as PropType<Blog[]>,
      required: true,
    },
  },
});
</script>

<style scoped>
.BlogCardWrapper {
  --gap: 1rem;
  padding: 1rem var(--gap) 2rem;
  display: grid;
  grid-template-rows: repeat(3, 33.3%);
  width: 100%;
  row-gap: var(--gap);
  margin-bottom: 3rem;
}

@media (min-width: 970px) {
  .BlogCardWrapper {
    --gap: 0.75rem;
    display: grid;
    grid-template-columns: repeat(3, calc(33.3% - calc(var(--gap))));
    grid-template-rows: auto;
    width: 100%;
    row-gap: 0;
    column-gap: var(--gap);
    overflow-y: hidden;
    overflow-x: auto;
    margin-bottom: 0;
  }
}
</style>
