import { reactive, toRefs, computed, createVNode } from "vue";
import request from "@/request";
import { check, arrToTree, deepCopy, getIds, objToUrl } from "@/utils/util.js";
import { message } from "ant-design-vue";
import { Modal } from "ant-design-vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { ElMessageBox,ElMessage } from "element-plus";
export default function (model, options = {}) {
  let url = model.url || "/common/base";
  let urlSuffix =
    model.urlSuffix ||
    `?tableName=${model.tableName}&primaryKey=${model.primaryKey}`;
  let m = reactive({
    queryParams: {},
    updateParams: {},
    addUpdateParams: {},
    addQueryParams: {},
    tableData: [],
    treeData: [],
    isShowTableLoading: false,
    isShowEditLoading: false,
    isShowEditPanel: false,
    isShowQueryPanel: true,
    buttonSize: "default", // large | default | small
    primaryKey: model.primaryKey,
    fields: model.fields || [],
    selectedRowKeys: [],
    $parent: null,
    inject:[],
    pParams: computed(() => {
      if (!m.$parent) {
        return {};
      }
      const $parent = m.$parent;
      if ($parent.isUpdate) {
        let [key=$parent.primaryKey,valKey] = m.inject
        if(!valKey) {
          valKey = key
        }
        return {
          [key]: $parent.updateParams[valKey],
        };
      } else {
        return {};
      }
    }), // 父参数
    isPage: true,
    dialogWidth: "100%",
    pageInfo: {
      total: 0,
      current: 1,
      pageSize: 15,
    },
    isUpdate: computed(() => {
      const val = m.updateParams[model.primaryKey];
      return !check.isUndefined(val) && !check.isNull(val);
    }),
    editPanelTitle: computed(() => {
      return m.isUpdate ? `编辑${model.modelCname}` : `创建${model.modelCname}`;
    }),
    ...options,
    canActions: {
      add: true,
      remove: true,
      save: true,
      back: true,
      ...(options.canActions || {}),
    },
  });

  for (let key in options) {
    if (key.slice(-1) === "M") {
      // 防止循环引用
      // const t = JSON.parse(JSON.stringify(m))
      m[key].$parent = m;
    }
  }

  // 钩子
  let hooks = {};
  const mountHook = function (name, fun) {
    hooks[name] = fun;
  };

  // 表格loading
  const showTableLoading = function () {
    m.isShowTableLoading = true;
  };
  const hideTableLoading = function () {
    m.isShowTableLoading = false;
  };

  // 编辑区域loading
  const showEditLoading = function () {
    m.isShowEditLoading = true;
  };
  const hideEditLoading = function () {
    m.isShowEditLoading = false;
  };

  // 设置field Options
  const setFieldOptions = (name, list) => {
    const index = m.fields.findIndex((item) => item.name === name);
    if (index !== -1) {
      m.fields[index].inputOptions.list = list;
    }
  };

  // 是否显示编辑区域
  const showEditPanel = async function (options = {}) {
    const { addParams = {} } = options;
    m.updateParams = {
      ...addParams,
    };
    if (hooks.beforeShowEditPanel) {
      await hooks.beforeShowEditPanel(options);
    }
    m.isShowEditPanel = true;
    if (hooks.after) {
      await hooks.afterShowEditPanel(options);
    }
  };
  const hideEditPanel = function () {
    m.isShowEditPanel = false;
  };

  // 查询全部
  const findAll = async function (options = {}) {
    const { params } = options;
    showTableLoading();
    try {
      const res = await request.post(`${url}/findAll${urlSuffix}`, {
        ...m.addQueryParams,
        ...m.queryParams,
        ...params,
        ...m.pParams,
      });
      m.tableData = res.data;
      hideTableLoading();
      return res;
    } catch (err) {
      hideTableLoading();
      return err;
    }
  }.bind(m);

  // 查询树
  const findTree = async function (options = {}) {
    if (!model.parentIdName) {
      alert("父id名未制定");
      return;
    }
    const { params } = options;
    // showTableLoading();
    try {
      const res = await request.post(`${url}/findAll${urlSuffix}`, {
        ...m.addQueryParams,
        ...m.queryParams,
        ...params,
        ...m.pParams,
      });
      m.treeData = arrToTree({
        data: res.data,
        key: model.primaryKey,
        pIdName: model.parentIdName,
      });
      // hideTableLoading();
      return res;
    } catch (err) {
      // hideTableLoading();
      return err;
    }
  }.bind(m);

  // 分页查询
  const find = async function (options = {}) {
    const { params } = options;
    showTableLoading();
    try {
      let suffix = urlSuffix ? "&" + urlSuffix.slice(1) : urlSuffix;
      const res = await request.post(
        `${url}/find${objToUrl(m.pageInfo)}${suffix}`,
        {
          ...m.addQueryParams,
          ...m.queryParams,
          ...params,
          ...m.pParams,
        }
      );
      m.tableData = res.data.list;
      m.pageInfo.total = res.data.total;
      m.pageInfo.pageSize = Number(res.data.pageSize);

      m.pageInfo.current = Number(res.data.current);

      hideTableLoading();
      return res;
    } catch (err) {
      hideTableLoading();
      return err;
    }
  }.bind(m);

  const save = async function (options = {}) {
    const { params } = options;
    // if (m.isShowEditLoading) {
    //   message.error("不可重复点击！");
    //   return;
    // }
    showTableLoading();
    showEditLoading();
    try {
      const res = await request.post(`${url}/update${urlSuffix}`, {
        ...m.addUpdateParams,
        ...m.updateParams,
        ...params,
        ...m.pParams,
      });
      if (m.isUpdate) {
        ElMessage({
          type: 'success',
          message: '保存成功',
        })
      } else {
        ElMessage({
          type: 'success',
          message: '创建成功',
        })
      }

      m.updateParams = res.data;
      hideEditLoading();
      if (!m.isTree) {
        if (m.isPage) {
          await find();
        } else {
          await findAll();
        }
      } else {
        await findTree();
      }
      return res;
    } catch (err) {
      hideEditLoading();
      hideTableLoading();
      return err;
    }
  };

  // 删除n条数据
  const remove = async function (options = {}) {
    const { params, record } = options;
    let tip = "您确定要删除当前记录吗";
    let ids = "";
    const selectedRowKeysLen = m.selectedRowKeys.length;
    if (selectedRowKeysLen === 0) {
      if (record) {
        ids = record[m.primaryKey];
      } else {
        ElMessage({
          type: 'warning',
          message: '请选中一条记录',
        })
        return;
      }
    } else {
      tip = `当前共选中了${selectedRowKeysLen}条记录，您确定要删除吗？`;
      ids = m.selectedRowKeys
        .map((item) => {
          return item[m.primaryKey];
        })
        .join(",");
    }

    // Modal.confirm({
    //   title: `提示`,
    //   icon: createVNode(ExclamationCircleOutlined),
    //   content: tip,
    //   okText: "确定",
    //   okType: "danger",
    //   cancelText: "取消",
    //   async onOk() {
    //     showTableLoading();
    //     try {
    //       const res = await request.post(`${url}/remove${urlSuffix}`, {
    //         ids,
    //       });
    //       message.success("删除成功");
    //       hideTableLoading();
    //       if (!m.isTree) {
    //         if (m.isPage) {
    //           await find();
    //         } else {
    //           await findAll();
    //         }
    //       } else {
    //         await findTree();
    //       }

    //       return res;
    //     } catch (err) {
    //       hideTableLoading();
    //       return err;
    //     }
    //   },
    //   onCancel() {
    //     message.info("已取消删除");
    //   },
    // });

    ElMessageBox.confirm(
      tip,
      '提示',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )
      .then( async() => {
      
             showTableLoading();
        try {
          const res = await request.post(`${url}/remove${urlSuffix}`, {
            ids,
          });
          ElMessage({
            type: 'success',
            message: '删除成功',
          })
          hideTableLoading();
          if (!m.isTree) {
            if (m.isPage) {
              await find();
            } else {
              await findAll();
            }
          } else {
            await findTree();
          }

          return res;
        } catch (err) {
          hideTableLoading();
          return err;
        }
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '已取消删除',
        })
      })
  
  };

  return reactive({
    ...toRefs(m),
    findAll,
    findTree,
    find,
    mountHook,
    save,
    remove,
    showTableLoading,
    hideTableLoading,
    showEditLoading,
    hideEditLoading,
    showEditPanel,
    hideEditPanel,
    setFieldOptions,
  });
}
