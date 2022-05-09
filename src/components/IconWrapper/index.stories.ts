import { BuildTemplate } from "../../types/stories";
import IconWrapper from "./index.vue";

import ChevronRight from "../Icon/Chevron/Right.vue";
import ChevronLeft from "../Icon/Chevron/Left.vue";
import Close from "../Icon/Close.vue";
import Menu from "../Icon/Menu.vue";
import Moon from "../Icon/Moon.vue";
import Spinner from "../Icon/Spinner.vue";
import Sun from "../Icon/Sun.vue";

export default {
  title: "Components/Icons",
  component: IconWrapper,
  argTypes: {
    icon: {
      control: { type: "select" },
      options: [
        "ChevronRight",
        "ChevronLeft",
        "Close",
        "Menu",
        "Moon",
        "Spinner",
        "Sun",
      ],
    },
  },
};

const Template: BuildTemplate = (args) => ({
  components: {
    IconWrapper,
    ChevronRight,
    ChevronLeft,
    Close,
    Menu,
    Moon,
    Spinner,
    Sun,
  },
  setup() {
    return { args };
  },
  template: `<div style='display: grid; justify-content:center;align-items:center;position:absolute;top:0;left:0;bottom:0;right:0'>
        <IconWrapper :size="args.size" :tag='args.tag'>
            <Component :is="args.icon" />
        <IconWrapper/>
    </div>`,
});

export const Default = Template.bind({});
Default.args = {
  icon: "Close",
  size: 20,
};
