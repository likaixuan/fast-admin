import index from "./index.vue";
import { addFormItem } from "components/dyForm/index.js";
export default {
  install(app) {
    app.component("selectItem", index);
    addFormItem({
      name: "select",
      component: index,
    });
  },
};
