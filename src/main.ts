import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import { createRouter } from "./router.js";
// import { store } from "./store/index.ts";
import { VueClipboard } from "@soerenmartius/vue3-clipboard";

const app = createApp(App);

app.use(createRouter()).use(ElementPlus).use(VueClipboard);
app.mount("#app");
