import { createApp } from "vue";
import App from "./App.vue";

// router configuration
import router from "./router";

// transition component
import uiTransition from "ui-transition";

import UiTransitionConfig from "./uiTransition.config";

// add global css files
import "./assets/css/reset.css";
import "./assets/css/scrollbar.css";
import "./assets/css/utilities.css";
import "./assets/css/variables.css";

const app = createApp(App);

app.use(router);

app.use(uiTransition, UiTransitionConfig);

app.mount("#app");
