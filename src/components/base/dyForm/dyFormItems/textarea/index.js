import index from "./index.vue";
import { addFormItem } from "components/base/dyForm/index.js";
export default {
  install(app) {
    app.component("textareaItem", index);
    addFormItem({
      name: "textarea",
      component: index,
    });
  },
};
