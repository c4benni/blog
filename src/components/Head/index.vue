<script lang="ts">
import {
  computed,
  defineComponent,
  h,
  onBeforeMount,
  PropType,
  Comment,
  onUpdated,
} from "@vue/runtime-core";

type DynamicStringObject = {
  [key in string]: string;
};

interface MetaTag extends DynamicStringObject {
  uid: string;
}

export default defineComponent({
  name: "Head",

  props: {
    title: {
      type: String,
      default: undefined,
    },
    titleTemplate: {
      type: String,
      default: undefined,
    },
    link: {
      type: Array as PropType<MetaTag[]>,
      default: [],
    },
    meta: {
      type: Array as PropType<MetaTag[]>,
      default: [],
    },
  },

  setup(_props) {
    const props = computed(() => _props);

    const createTags = () => {
      const createTitle = () => {
        if (props.value.title || props.value.titleTemplate) {
          const title = document.querySelector("title");

          if (title) {
            title.innerText =
              props.value.title || `${props.value.titleTemplate} - Blog App`;
          }
        }
      };

      const createMetaTag = (tag: "link" | "meta") => {
        if (props.value?.[tag]?.length) {
          props.value[tag].map((content) => {
            const oldTag = document.querySelector(
              `[data-uid="${content.uid}"]`
            );

            const newTag = document.createElement(tag);

            newTag.dataset.uid = content.uid;

            for (const key in content) {
              if (key !== "uid") {
                newTag.setAttribute(key, content[key]);
              }
            }

            if (oldTag) {
              oldTag.remove();
            }

            const head = document.head || document.querySelector("head");

            head.append(newTag);
          });
        }
      };

      createMetaTag("link");

      createMetaTag("meta");

      createTitle();
    };

    onBeforeMount(createTags);

    onUpdated(createTags);

    return () => h(Comment);
  },
});
</script>
