import index from "./index.vue";
import { addFormItem } from "components/base/dyForm/index.js";
export default {
  install(app) {
    app.component("datetimeItem", index);
    addFormItem({
      name: "datetime",
      component: index,
    });
  },
};
