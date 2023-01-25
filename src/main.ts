import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "@/router";
import type { Router } from "vue-router";

declare module "pinia" {
  export interface PiniaCustomProperties {
    router: Router;
  }
}

const pinia = createPinia();
pinia.use(({ store }) => {
  store.router = markRaw(router);
});

createApp(App).use(pinia).use(router).mount("#app");
