import index from "./index.vue";
import { addFormItem } from "components/base/dyForm/index.js";
export default {
  install(app) {
    app.component("numberItem", index);
    addFormItem({
      name: "number",
      component: index,
    });
  },
};
