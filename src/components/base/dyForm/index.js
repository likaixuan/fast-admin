import { reactive,markRaw } from "vue";

export const formMap = reactive({});

export const addFormItem = function ({ name, component }) {
  formMap[name] = markRaw(component);
};
