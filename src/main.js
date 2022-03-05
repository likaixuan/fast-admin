import { createApp } from "vue";
import { router } from "./router";
import App from "./App.vue";
import "ant-design-vue/dist/antd.css"; // or 'ant-design-vue/dist/antd.less'
import Antd from "ant-design-vue";
import dyFormItems from 'components/dyFormItems/index.js'

createApp(App).use(router).use(Antd).use(dyFormItems).mount("#app");