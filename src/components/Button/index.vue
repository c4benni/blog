<script lang="ts">
import {
  computed,
  defineComponent,
  h,
  PropType,
  resolveComponent,
  VNode,
} from "@vue/runtime-core";
import eventKey from "../../utils/eventKey";

type Size = "sm" | "md" | "lg";

export default defineComponent({
  name: "Button",

  props: {
    icon: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    active: Boolean,
    autofocus: Boolean,
    replace: Boolean,

    tag: {
      type: String,
      default: "button",
    },

    to: {
      type: [String, Object],
      default: undefined,
    },
    size: {
      type: String as PropType<Size>,
      default: "md",
    },
  },

  setup(p, { slots, attrs }) {
    const props = computed(() => p);

    // dynamic tag to be rendered
    const getTag = computed(() => {
      if (props.value.to) {
        return resolveComponent("router-link");
      }

      return props.value.tag;
    });

    const isButtonEl = getTag.value === "button";

    const isInactive = props.value.disabled || props.value.readonly;

    return function () {
      return h(
        // @ts-ignore
        getTag.value,
        {
          "aria-readonly": props.value.readonly || undefined,
          role: isButtonEl ? undefined : "button",
          tabindex: isInactive ? "-1" : isButtonEl ? undefined : "0",
          ...attrs,
          disabled: props.value.disabled ? "disabled" : undefined,
          to: props.value.to,

          replace: props.value.to ? props.value.replace : undefined,

          class: [
            "Button fill-before",
            props.value.size,
            {
              icon: props.value.icon,
              disabled: props.value.disabled,
              readonly: props.value.readonly,
              active: props.value.active,
            },
          ],
          onKeydown: (e: KeyboardEvent) => {
            if (/space|enter/.test(eventKey(e)) && !isInactive && !isButtonEl) {
              e.preventDefault();
            }
          },
          onKeyup: (e: KeyboardEvent) => {
            if (/space|enter/.test(eventKey(e)) && !isInactive && !isButtonEl) {
              const self = e.currentTarget as unknown as HTMLElement;

              self?.click?.();
            }
          },

          onVnodeMounted: (vnode: VNode) => {
            if (props.value.autofocus) {
              vnode.el?.focus?.();
            }
          },
        },
        {
          default: () => [slots.default?.()],
        }
      );
    };
  },
});
</script>

<style scoped>
.Button {
  font-weight: 600;
  outline: none;
  display: inline-grid;
  grid-auto-flow: column;
  justify-content: center;
  align-items: center;
  user-select: none;
  transition-duration: 250ms;
  transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
  transition-property: opacity, transform, box-shadow, border-color;
  position: relative;
  gap: 0.4em;
  isolation: isolate;
  appearance: none;
  background-color: var(--raised);
  color: var(--raised-text);
  border: var(--divide);
  --divide-color-alpha: 25%;
  font-family: var(--default-font-family);
}

.Button:active {
  transform: scale3d(0.985, 0.985, 1);
}

.Button::before {
  opacity: 0;
  transition: opacity 250ms;
  background-color: currentColor;
  z-index: -1;
}

.Button:not(.disabled) {
  cursor: pointer;
}

@media (hover: hover) and (pointer: fine) {
  .Button:not(.disabled):active::before {
    opacity: 0.2;
  }

  .Button:hover {
    --divide-color-alpha: 90%;
    will-change: transform;
  }
}

.Button:not(.disabled):focus-visible {
  --raised-alpha: 70%;
}

.Button:not(.disabled):active {
  transform: scale3d(0.95, 0.95, 1);
  opacity: 0.9;
}

.Button:not(.disabled):active::before {
  opacity: 0.2;
}

@media (min-width: 970px) {
  .Button:not(.disabled):active {
    transform: scale3d(0.985, 0.985, 1);
  }
}

@media (hover: hover) and (pointer: fine) {
  .Button:hover::before {
    opacity: 0.05;
  }
}
.Button:active {
  opacity: 0.9;
}

.Button:not(.icon):focus-visible {
  outline: 1.5px solid var(--divide-color);
  --divide-color-alpha: 100%;
  outline-offset: 1px;
}

.Button.sm {
  border-radius: var(--rounded-sm);
  padding: 0 0.75rem;
  font-size: 0.85rem;
  height: 28px;
}

.Button.md {
  border-radius: var(--rounded);
  padding: 0 1rem;
  font-size: 0.95rem;
  height: 32px;
}

.Button.lg {
  border-radius: var(--rounded-lg);
  padding: 0 1.5rem;
  font-size: 1.15rem;
  height: 42px;
}

.Button.icon {
  padding: 0;
  height: 36px;
  width: 40px;
  padding: 0;
  border-radius: var(--rounded-lg);
  opacity: 0.95;
  --divide-color-alpha: 30%;
}

.dark .Button.icon {
  opacity: 0.8;
}

.Button:active {
  opacity: 1;
}

.Button:active::before,
.Button.active::before {
  opacity: 0.2;
}

.Button.disabled {
  cursor: not-allowed;
  filter: grayscale(1);
  opacity: 0.6;
  --raised-alpha: 0.2;
  --raised-text-alpha: 0.5;
}

.Button.disabled,
.Button.readonly {
  --divide-color-alpha: 0.15;
}

.Button.readonly {
  pointer-events: none;
  --raised-alpha: 0.6;
}
</style>
