<template>
  <div>
    <Head
      title-template="Home"
      :meta="[
        {
          uid: 'description',
          name: 'description',
          content: 'Untitled App description',
        },
      ]"
    />

    <div v-if="loading" class="page-loading">
      <IconWrapper :size="64">
        <Spinner />
      </IconWrapper>
    </div>

    <template v-else>
      <UiTransition config="slideY(10)" appear>
        <h2 class="title">Blog</h2>
      </UiTransition>

      <BlogCardWrapper :blogs="blogs" />

      <Pagination />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import Head from "../components/Head/index.vue";
import BlogCardWrapper from "../components/BlogCardWrapper/index.vue";
import Pagination from "../components/Pagination/index.vue";
import fetchPostService from "../services/fetchPost";
import IconWrapper from "../components/IconWrapper/index.vue";
import Spinner from "../components/Icon/Spinner.vue";
import { posts } from "../store/fetchedPosts";
import { computed } from "@vue/reactivity";
import { Post } from "../types";

export default defineComponent({
  name: "IndexPage",
  components: { Head, BlogCardWrapper, Pagination, IconWrapper, Spinner },

  setup() {
    const loading = ref(false);

    const range = computed(() => {
      const page = parseInt((useRoute().query.page || "1") as string);

      // range of posts to fetch
      return {
        from: page * 3 - 3,
        to: page * 3,
      };
    });

    const blogs = computed(() => {
      if (loading.value) return [];

      const output: Post[] = [];

      for (let i = range.value.from + 1; i < range.value.to + 1; i++) {
        output.push(posts.value[`${i}`]);
      }

      return output;
    });

    onBeforeMount(async () => {
      loading.value = true;

      const promises: Promise<0 | 1>[] = [];

      for (let i = range.value.from + 1; i < range.value.to + 1; i++) {
        promises.push(fetchPostService(`${i}`));
      }

      await Promise.allSettled(promises);

      loading.value = false;
    });

    return {
      loading,
      blogs,
    };
  },
});
</script>

<style scoped>
.title {
  font-size: 2rem;
  margin-left: 1rem;
  margin-bottom: 0.75rem;
}

@media (min-width: 970px) {
  .title {
    font-size: 2.25rem;
    margin-left: 0;
  }
}
</style>
