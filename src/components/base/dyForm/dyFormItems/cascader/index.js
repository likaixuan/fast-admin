import index from "./index.vue";
import { addFormItem } from "components/base/dyForm/index.js";
export default {
  install(app) {
    app.component("cascaderItem", index);
    addFormItem({
      name: "cascader",
      component: index,
    });
  },
};
