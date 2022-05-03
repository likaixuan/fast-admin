import input from "./input/index.js";
import textarea from "./textarea/index.js";
import number from "./number/index.js";
import select from "./select/index.js";
import cascader from "./cascader/index.js";
export default {
  install(app) {
    app.use(input)
    app.use(textarea)
    app.use(number)
    app.use(select)
    app.use(cascader)
  },
};
