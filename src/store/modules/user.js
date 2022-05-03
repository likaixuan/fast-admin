import { defineStore } from 'pinia'
import User from '@/model/User'
import { dyModuleMap } from '@/router'
import { router } from '@/router'
const layout = () => import("@/pages/layout.vue");
import useM from "@/hooks/useM.js";
import Module from "@/model/Module";
import { useCommonStore } from './common';
export const useUserStore = defineStore({
  id: 'user',
  state: () => {
    return {
      userInfo: null
    }
  },
  actions: {
    setUserInfo(userInfo) {
      this.userInfo = userInfo
    },
    // 登录
    async login(params) {
      const res = await User.login(params)
      this.setUserInfo(res.data)
    },
    // 获取路由及其权限
    async getMyGrantModule() {
      const res = await User.getMyGrantModule()

      const genRouter = (arr) => {
        return arr.map((item) => {
          let component = dyModuleMap[item.routerName] || {};
          component.meta = component.meta || {};
          component.meta.icon = item.modulePic;
          component.meta.moduleName = item.moduleName;

          // 权限
          component.meta.actions = item.actions;
          if (Array.isArray(item.items) && item.items.length > 0) {
            component.component = layout;
            component.path = '/'+ item.routerName || `/xxxx${i++}`;
            component.name = item.routerName
            component.children = genRouter(item.items);
            return component;
          }

          if (dyModuleMap[item.routerName]) {
            return component;
          } else {
            return false
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
        }).filter((item) => {
          return item
        });
      }
      const arr = genRouter(res.data)
      const commonStore = useCommonStore()
      commonStore.setRoutes(arr)
      return res
    },
    async setRouter() {
      let ModuleM = useM(Module)
      await ModuleM.findTree().then((res)=>{
        console.log(ModuleM.treeData,456454545)
      })
      const genRouter = (arr) => {
        return arr.map((item) => {
          console.log(item,6432)
          let component = dyModuleMap[item.module_url] || {};
          component.meta = component.meta || {};
          // component.meta.icon = item.modulePic;
          component.meta.moduleName = item.module_name;

          if (Array.isArray(item.children) && item.children.length > 0) {
            component.component = layout;
            component.path = '/'+ item.module_url || `/xxxx${i++}`;
            component.name = item.module_url
            component.children = genRouter(item.children);
            return component;
          }

          if (dyModuleMap[item.module_url]) {
            return component;
          } else {
            return false
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
        }).filter((item) => {
          return item
        });
      }
      const arr = genRouter(ModuleM.treeData)
      console.log(arr,'9999')
      const commonStore = useCommonStore()
      commonStore.setRoutes(arr)
      return
    }
  },
  persist: {
    enabled: true
  }

})