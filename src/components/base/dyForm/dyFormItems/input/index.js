import index from "./index.vue";
import { addFormItem } from "components/base/dyForm/index.js";
export default {
  install(app) {
    app.component("inputItem", index);
    addFormItem({
      name: "input",
      component: index,
    });
  },
};
