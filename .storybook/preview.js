import { app } from "@storybook/vue3";
import { createRouter, createWebHistory } from "vue-router";

import Img from "../src/components/Img/index.vue";

import Wrapper from "../src/stories/Wrapper.vue";

// transition component
import uiTransition from "ui-transition";

import UiTransitionConfig from "../src/uiTransition.config";

app.use(uiTransition, UiTransitionConfig);

app.component("Img", Img);

app.use(
    createRouter({
        routes: [{
            path: "/",
            component: {
                template: "<div/>",
            },
            name: "home",
        }, ],
        history: createWebHistory(),
    })
);

export const decorators = [
    (story) => ({
        components: { story, Wrapper },
        template: "<Wrapper><story /></Wrapper>",
    }),
];

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
};