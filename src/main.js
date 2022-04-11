import { createApp } from "vue";
import { router } from "./router";
import App from "./App.vue";
import "ant-design-vue/dist/antd.css"; // or 'ant-design-vue/dist/antd.less'
import Antd from "ant-design-vue";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import dyFormItems from 'components/base/dyForm/dyFormItems/index.js'

createApp(App).use(router).use(Antd).use(ElementPlus).use(dyFormItems).mount("#app");