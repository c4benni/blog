<template>
  <ul class="Pagination">
    <!-- left pedal -->
    <li class="left-pedal">
      <Button
        icon
        :to="leftPedalTo"
        :disabled="activePage == 1"
        :title="`Jump to page ${leftPedalTo.query.page}`"
      >
        <IconWrapper :size="20">
          <ChevronLeft />
        </IconWrapper>
      </Button>
    </li>

    <li
      v-for="i in 3"
      :key="i"
      :class="{
        space: i == 2,
      }"
    >
      <Button :to="pageQuery(i)" icon :readonly="activePage == i">
        {{ i }}
      </Button>
    </li>

    <!-- right pedal -->
    <li class="right-pedal">
      <Button
        icon
        :to="rightPedalTo"
        :disabled="activePage == 3"
        :title="`Jump to page ${rightPedalTo.query.page}`"
      >
        <IconWrapper :size="20">
          <ChevronRight />
        </IconWrapper>
      </Button>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "../Button/index.vue";
import ChevronLeft from "../Icon/Chevron/Left.vue";
import ChevronRight from "../Icon/Chevron/Right.vue";

import IconWrapper from "../IconWrapper/index.vue";
import { useRoute } from "vue-router";
import { computed } from "@vue/reactivity";

export default defineComponent({
  name: "Pagination",
  components: {
    Button,
    ChevronLeft,
    ChevronRight,
    IconWrapper,
  },
  setup() {
    const route = useRoute();
    const activePage = computed(
      () => parseInt((route.query.page as string) || "1") || 1
    );

    const pageQuery = (page: number) => ({
      name: "home",
      query: {
        page,
      },
    });

    const leftPedalTo = computed(() =>
      pageQuery(Math.max(activePage.value - 1, 1))
    );

    const rightPedalTo = computed(() =>
      pageQuery(Math.min(activePage.value + 1, 3))
    );

    return {
      leftPedalTo,
      rightPedalTo,
      pageQuery,
      activePage,
    };
  },
});
</script>

<style scoped>
.Pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 4rem;
}

.left-pedal {
  margin-right: 1rem;
}

.right-pedal {
  margin-left: 1rem;
}

.space {
  margin: 0 0.5rem;
}

@media (min-width: 970px) {
  .Pagination {
    margin-bottom: 0;
  }
}
</style>
