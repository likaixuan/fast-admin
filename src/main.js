import { createApp } from "vue";
import App from "./App.vue";
import "./plugins/tailwind";
import { initPinia } from "./store";
import { initVueRouter } from "./router";
import { initElementPlus } from "./plugins/elementPlus";
import { initAntDesignVue } from "./plugins/antDesignVue";
import Crud from "@/components/bus/Crud"
import "./mountWindow.js";
import dyForm from "./components/base/dyForm";
import dyTable from "./components/base/dyTable";

import { useUserStore } from "@/store/modules/user";

const init = async () => {
  const app = createApp(App);
  initPinia(app);
  initElementPlus(app);
  initAntDesignVue(app);
  app.use(dyForm);
  app.use(dyTable);
  app.use(Crud)
  const userStore = useUserStore();
  try {
    await userStore.setRouter();
  } catch (err) {
    console.log(err);
  }
  initVueRouter(app);

  app.mount("#app");
};

init();
