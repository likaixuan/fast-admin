import index from "./index.vue";
export default {
  install(app) {
    app.component("Crud", index);
  }
};
