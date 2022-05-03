import { defineStore } from 'pinia'
import { router, routes } from '@/router'

const layout = () => import("@/pages/layout.vue");

const defaultCachedPageMap = {
    '/index': {
        path: '/index',
        name: 'index',
        meta: {
            moduleName: '首页'
        }
    }
}

export const useCommonStore = defineStore({
    id: 'common',
    state: () => {
        return {
            menu: [],
            removeRoutes: [],
            cachedPageMap: {
                ...defaultCachedPageMap
            } // 已缓存的页面
        }
    },
    getters: {
        // 缓存的组件name
        cachedPageNames() {
            return Object.keys(this.cachedPageMap).map((key) => {
                return this.cachedPageMap[key].name
            }).join(',')
        },
        // 当前打开的路由
        currentPath() {
            return router.currentRoute.value.path
        },
        // 当前打开的页面在左端（首页右边第一个）
        isLeftEnd() {
            const index = Object.keys(this.cachedPageMap).findIndex((path) => {
                return this.currentPath === path
            })
            if (index === 1) {
                return true
            } else {
                false
            }
        },
        // 当前打开的页面在右端（最右侧）
        isRightEnd() {
            const keys = Object.keys(this.cachedPageMap)
            const index = keys.findIndex((path) => {
                return this.currentPath === path
            })
            if (index === keys.length - 1) {
                return true
            } else {
                false
            }
        }
    },
    actions: {
        // 设置菜单
        setMenu(menu) {
            this.menu = menu
        },
        // 退出登录时 重置路由权限
        restRoutes() {
            this.removeRoutes.forEach((route) => {
                router.removeRoute(route.name)
            })
            this.removeRoutes = []
        },
        // 动态添加路由
        setRoutes(accessRoutes) {
            // 缓存动态路由，用于退出或者权限改变时重置
            this.restRoutes()
            const t = []
            accessRoutes.forEach(route => {
                const removeRoute = router.addRoute(route)
                t.push(route)
            })
            this.removeRoutes = t
            // 设置菜单
            this.setMenu(routes.filter((route) => {
                return !route.hidden
            }).concat(accessRoutes))
        },
        // 设置缓存
        addCachePage({ path, name, meta }) {
            this.cachedPageMap[path] = {
                path, name, meta
            }
        },
        // 清除已缓存的页面
        removeCachedPage(path) {
            delete this.cachedPageMap[path]
        },
        // 刷新页面
        refreshPage() {
            window.location.reload()
        },
        // 关闭全部页面
        closeAllPage() {
            console.log(5555)
            this.cachedPageMap = defaultCachedPageMap
            router.replace('/index')
        },
        // 关闭其他页面
        closeOtherPage() {
            this.cachedPageMap = {
                ...defaultCachedPageMap,
                [this.currentPath]: this.cachedPageMap[this.currentPath]
            }
        },
        // 关闭到右侧
        closeToRightPage() {
            const keys = Object.keys(this.cachedPageMap)
            const index = keys.findIndex((item) => {
                return item === this.currentPath
            })
            this.cachedPageMap = keys.slice(0, index + 1).reduce((map, path) => {
                map[path] = this.cachedPageMap[path]
                return map
            }, {})

        },
        // 关闭到左侧
        closeToLeftPage() {
            const keys = Object.keys(this.cachedPageMap)
            const index = keys.findIndex((item) => {
                return item === this.currentPath
            })
            this.cachedPageMap = keys.slice(index).reduce((map, path) => {
                map[path] = this.cachedPageMap[path]
                return map
            }, {
                ...defaultCachedPageMap
            })

        },
        // 关闭当前
        closeCurrentPage() {
            delete this.cachedPageMap[this.currentPath]
            const keys = Object.keys(this.cachedPageMap);
            router.replace(this.cachedPageMap[keys[keys.length - 1]].path);
        }
    },
    persist: {
        enabled: true
    }

})