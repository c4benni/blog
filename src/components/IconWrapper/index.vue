<script lang="ts">
import { computed, defineComponent, h } from "vue";

export default defineComponent({
  name: "IconWrapper",

  props: {
    tag: {
      type: String,
      default: "span",
    },
    size: {
      type: Number,
      default: 16,
    },
  },

  setup(p, { slots, attrs }) {
    const props = computed(() => p);

    return () => {
      return h(
        props.value.tag,
        {
          ...attrs,
          class: "IconWrapper",
          style: {
            fontSize: `${props.value.size}px`,
          },
        },
        [slots.default?.() || null]
      );
    };
  },
});
</script>

<style scoped>
.IconWrapper {
  display: inline-flex;
  align-self: center;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 1em;
  width: 1em;
}

.IconWrapper > :deep(svg) {
  height: 1em;
  width: 1em;
  fill: currentColor;
  position: absolute;
}
</style>
