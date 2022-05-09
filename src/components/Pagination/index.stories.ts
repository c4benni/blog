import { BuildTemplate } from "../../types/stories";
import Pagination from "./index.vue";

export default {
  title: "Components/Pagination",
  component: Pagination,
};

const Template: BuildTemplate = (args) => ({
  components: { Pagination },
  setup() {
    return { args };
  },
  template: `<div style='display: grid; justify-content:center;align-items:center;position:absolute;top:0;left:0;bottom:0;right:0'><Pagination/></div>`,
});

export const Default = Template.bind({});
