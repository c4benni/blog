import { BuildTemplate } from "../../../types/stories";
import Drawer from "./index.vue";

export default {
  title: "Components/Header/Drawer",
  component: Drawer,
};

const Template: BuildTemplate = (args) => ({
  components: { Drawer },
  setup() {
    return { args };
  },
  template: `<div style='padding:1rem; position: relative; z-index:1; background-color:var(--surface);width:100%;display:flex;justify-content:flex-end'><Drawer /></div>`,
});

export const Default = Template.bind({});
