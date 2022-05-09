<template>
  <article class="post">
    <Head
      :title-template="post?.title || 'Loaing post'"
      :meta="[
        {
          uid: 'description',
          name: 'description',
          content: post?.subtitle || 'Loading post...',
        },
      ]"
    />

    <div v-if="error" class="error-page">
      <h2>An error occured</h2>

      <p>This post might have been deleted, or doesn't exist yet</p>

      <Button to="/" size="lg" replace> Blog page </Button>
    </div>

    <div v-else-if="loading" class="page-loading">
      <IconWrapper :size="64">
        <Spinner />
      </IconWrapper>
    </div>

    <template v-else>
      <UiTransition config="slideY(10)" appear>
        <h2 class="title">
          {{ post.title }}
        </h2>
      </UiTransition>

      <UiTransition :config="['slideY(10)', 'fade']" appear :delay="70">
        <h3 class="subtitle">
          {{ post.subtitle }}
        </h3>
      </UiTransition>

      <Img
        :src="post.poster.src"
        :alt="post.poster.alt"
        show-loader
        :height="breakpoint.isMobile ? 320 : 400"
        class="poster"
      />

      <div v-html="post.content" class="content" />

      <!-- pagination -->

      <nav class="pagination">
        <Button
          v-for="(link, i) in pagination"
          :to="link.to"
          :disabled="link.disabled"
          size="lg"
        >
          <IconWrapper v-if="i === 0" :size="24">
            <Component :is="link.icon" />
          </IconWrapper>

          {{ link.title }}

          <IconWrapper v-if="i === 1" :size="24">
            <Component :is="link.icon" />
          </IconWrapper>
        </Button>
      </nav>
    </template>
  </article>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { computed } from "@vue/reactivity";

import Head from "../components/Head/index.vue";
import Img from "../components/Img/index.vue";
import Spinner from "../components/Icon/Spinner.vue";
import IconWrapper from "../components/IconWrapper/index.vue";
import ChevronLeft from "../components/Icon/Chevron/Left.vue";
import ChevronRight from "../components/Icon/Chevron/Right.vue";
import Button from "../components/Button/index.vue";
import fetchPostService from "../services/fetchPost";
import { posts } from "../store/fetchedPosts";
import useBreakpoint from "../utils/breakpoint/hook";

interface Link {
  title: string;
  icon: "ChevronLeft" | "ChevronRight";
  to: string;
  disabled: boolean;
}

export default defineComponent({
  name: "BlogPostPage",
  components: {
    Head,
    Img,
    Spinner,
    IconWrapper,
    Button,
    ChevronRight,
    ChevronLeft,
  },

  setup() {
    const postId = computed(() => useRoute().params.id as string);

    const post = computed(() => posts.value[postId.value]);

    const error = ref(false);

    const loading = ref(!post.value);

    const fetchPost = () => {
      error.value = false;

      loading.value = true;

      fetchPostService(postId.value).then((res) => {
        if (!res) {
          error.value = true;
        }
        loading.value = false;
      });
    };

    onBeforeMount(fetchPost);

    // watch(() => postId.value, fetchPost);

    const pagination = computed<Link[]>(() => {
      const page = postId.value;

      return [
        {
          title: "Previous",
          icon: "ChevronLeft",
          to: `/post/${`${Math.max(parseInt(page) - 1, 1)}`}`,
          disabled: page == "1",
        },
        {
          title: "Next",
          icon: "ChevronRight",
          to: `/post/${Math.min(parseInt(page) + 1, 9)}`,
          disabled: page == "9",
        },
      ];
    });

    return {
      loading,
      post,
      pagination,
      postId,
      error,
      breakpoint: useBreakpoint(),
    };
  },
});
</script>

<style scoped>
.error-page {
  display: grid;
  justify-content: center;
  text-align: center;
}

.error-page > h2 {
  margin-bottom: 0.75rem;
}

.error-page > p {
  margin-bottom: 2rem;
  opacity: 0.7;
}

.post {
  width: 100vw;
  max-width: 100%;
  padding: 0 1rem;
  letter-spacing: 0.4px;
}

.poster {
  border-radius: var(--rounded);
  border: var(--divide);
  --divide-color-alpha: 0.25;
  min-height: 320px;
  width: 100%;
  min-width: 100%;
  object-fit: fill;
}

.title {
  font-size: 1.875rem;
}

.subtitle {
  font-weight: 500;
  color: var(--surface-text);
  --surface-text-alpha: 0.7;
  margin-bottom: 2rem;
  margin-top: 0.75rem;
  font-size: 1.025rem;
}

.content > :deep(p),
.content :deep(li) {
  margin: 1.5rem 0;
  font-size: 1.2rem;
  color: var(--surface-text);
  --surface-text-alpha: 0.9;
  line-height: 1.75;
}

.dark .content > :deep(p),
.dark .content :deep(li) {
  --surface-text-alpha: 0.875;
}

.content :deep(li) {
  line-height: 1;
}

.content > :deep(blockquote) {
  max-width: 90%;
  margin-left: 0;
  margin-top: 1.75rem;
  margin-bottom: 1.75rem;
  border-left: 5px solid var(--surface-text);
  --surface-text-alpha: 0.3;
  padding: 0.5rem 0.75rem 0.5rem 1.5rem;
  font-size: 1.15rem;
}

.content > :deep(blockquote) > p {
  color: var(--surface-text);
  --surface-text-alpha: 0.7;
  line-height: 1.75;
  font-size: 1.3rem;
}

.content > :deep(ol) {
  list-style: decimal;
  list-style-position: inside;
}

.content > :deep(ul) {
  list-style: disc;
  list-style-position: inside;
}

.content > :deep(h4) {
  margin-top: 2rem;
  text-decoration: underline;
  font-size: 1.3rem;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4rem 1rem;
}

/* large device */

@media (min-width: 970px) {
  .post {
    padding: 0;
  }
  .poster {
    border-radius: var(--rounded-lg);
    min-height: 400px;
    margin-bottom: 2rem;
  }

  .title {
    font-size: 2.875rem;
  }

  .subtitle {
    margin-bottom: 2.25rem;
    margin-top: 0.25rem;
    font-size: 1.1rem;
  }

  .content > :deep(blockquote) {
    max-width: 95%;
    margin: 0 auto;
    margin-bottom: 2.5rem;
    margin-top: 2.5rem;
  }
}
</style>
