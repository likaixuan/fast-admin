import { reactive,markRaw } from "vue";
import dyForm from './index.vue'
import dyFormItems from './dyFormItems'

export const formMap = reactive({});

// 用于收集已扩展的表单项组件
export const addFormItem = function ({ name, component }) {
  formMap[name] = markRaw(component);
};

export default {
  install(app) {
    app.use(dyFormItems)
    app.component('dyForm',dyForm)
  },
};
