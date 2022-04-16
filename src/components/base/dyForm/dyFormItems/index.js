import input from "./input/index.js";
import select from "./select/index.js";
import cascader from "./cascader/index.js";
export default {
  install(app) {
    app.use(input)
    app.use(select)
    app.use(cascader)
  },
};
