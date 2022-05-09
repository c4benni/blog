import { BuildTemplate } from "../../types/stories";
import Img from "./index.vue";

export default {
  title: "Components/Img",
  component: Img,
  argTypes: {
    loading: {
      control: { type: "select" },
      options: ["eager", "lazy"],
    },
  },
};

const Template: BuildTemplate = (args) => ({
  components: { Img },
  setup() {
    return { args };
  },
  template: `<div style='display: grid; justify-content:center;align-items:center;position:absolute;top:0;left:0;bottom:0;right:0'><Img v-bind='args' class='rounded-lg' style='box-shadow:var(--shadow-lg); object-fit:fill;border:var(--divide);--divide-color-alpha:0.5'/></div>`,
});

export const Default = Template.bind({});
Default.args = {
  src: "https://loremflickr.com/1000/400/dog/?lock=6&random=6",
  alt: "Image",
  width: 400,
  height: 400,
  loading: "lazy",
};
