import { BuildTemplate } from "../../types/stories";
import Header from "./index.vue";

export default {
  title: "Components/Header",
  component: Header,
};

const Template: BuildTemplate = (args) => ({
  components: { Header },
  setup() {
    return { args };
  },
  template: `<div style='padding:1rem'><Header /></div>`,
});

export const Default = Template.bind({});
