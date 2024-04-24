import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "vfonts/Lato.css";
import "vfonts/FiraCode.css";
import naive from "naive-ui";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import zh from "./locales/zh.json";
import en from "./locales/en.json";
import "./style.css";
// import '../public/md-editor/preview.css'
import "../public/md-editor/style.css";
import "viewerjs/dist/viewer.css";
import VueViewer from "v-viewer";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const i18n = createI18n({
  locale: "zh", // 默认语言
  legacy: false,
  messages: {
    zh,
    en,
  },
});

const app = createApp(App);

app.use(pinia).use(i18n).use(naive).use(router).use(VueViewer).mount("#app");
