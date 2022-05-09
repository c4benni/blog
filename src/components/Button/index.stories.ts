import { BuildTemplate } from "../../types/stories";
import Button from "./index.vue";
import IconWrapper from "../IconWrapper/index.vue";
import CloseIcon from "../Icon/Close.vue";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
  },
};

const Template: BuildTemplate = (args) => ({
  components: { Button, CloseIcon, IconWrapper },
  setup() {
    return { args };
  },
  template: `
        <div style='display: grid; justify-content:center;align-items:center;position:absolute;top:0;left:0;bottom:0;right:0'>
            <Button v-if="args.icon" v-bind="args">
                <IconWrapper>
                    <CloseIcon />
                </IconWrapper>
            </Button>

            <Button v-else v-bind="args">
                {{args.label || 'Button'}}
            </Button>
        </div>
    `,
});

export const Default = Template.bind({});
Default.args = {
  label: "Button",
};
