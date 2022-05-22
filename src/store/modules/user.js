import { defineStore } from "pinia";
import User from "@/model/User";
import { dyModuleMap } from "@/router";
import { router } from "@/router";
import Code from "@/utils/code.js";
const layout = () => import("@/pages/layout.vue");
import useM from "@/hooks/useM.js";
import Module from "@/model/Module";
import { useCommonStore } from "./common";
import { defineAsyncComponent } from "vue";
export const useUserStore = defineStore({
  id: "user",
  state: () => {
    return {
      userInfo: null,
    };
  },
  actions: {
    setUserInfo(userInfo) {
      this.userInfo = userInfo;
    },
    // 登录
    async login(params) {
      const res = await User.login(params);
      this.setUserInfo(res.data);
    },
    async setRouter() {
      let ModuleM = useM(Module);
      await ModuleM.findTree();
      const genRouter = (arr) => {
        return arr
          .map((item) => {
            let component = dyModuleMap[item.module_url] || {};
            component.meta = component.meta || {};
            // component.meta.icon = item.modulePic;
            component.meta.moduleName = item.module_name;

            if (Array.isArray(item.children) && item.children.length > 0) {
              component.component = layout;
              component.path = "/" + item.module_url || `/xxxx${i++}`;
              component.name = item.module_url;
              component.children = genRouter(item.children);
              return component;
            }

            if (dyModuleMap[item.module_url]) {
              return component;
            } else {
              if (item.module_type === Module.MODULE_TYPE_NOCODE_MODULE) {
                console.log(item, "无代码模块");
                return {
                  ...component,
                  name: item.module_url,
                  path: "/" + item.module_url,
                  // 异步组件
                  component: defineAsyncComponent(async () => {
                    const code = await Code.getCode(item.module_id);
                    console.log(code, 723623623623626);
                    let options = {};
                    eval(`options = ${code}`);
                    options.name = item.module_url;
                    return options;
                  }),
                };
              }
              return false;
            }
            // else {
            //   return {
            //     ...component,
            //     name: item.routerName, //用于缓存
            //     path: "/" + item.routerName,
            //     component(resolve, reject) {
            //       Common.queryAll({
            //         targetModelCode: "zfSysModuleCode",
            //         Params: [
            //           {
            //             field: "module_id",
            //             values: [item.moduleId],
            //           },
            //         ],
            //       }).then((res) => {
            //         if(res.data==null || res.data.length==0){
            //           alert("没有定义模块编码");
            //           return;
            //         }
            //         let html = res.data[0].html;
            //         let js = res.data[0].js;
            //         let options = {};
            //         eval(`options = ${js}`);
            //         resolve({
            //           template: res.data[0].html,
            //           ...options,
            //         });
            //       });
            //     },
            //   };
            // }
          })
          .filter((item) => {
            return item;
          });
      };
      const arr = genRouter(ModuleM.treeData);
      const commonStore = useCommonStore();
      commonStore.setRoutes(arr);
      return;
    },
  },
  persist: {
    enabled: true,
  },
});
