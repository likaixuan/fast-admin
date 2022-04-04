import { reactive, toRefs, computed, createVNode } from "vue";
import request from "@/request";
import { check, deepCopy, getIds, objToUrl } from "@/utils/util.js";
import { message } from "ant-design-vue";
import { Modal } from "ant-design-vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
export default function (model, options = {}) {
  let url = model.url || '/common/base';
  let urlSuffix = model.urlSuffix || `?tableName=${model.tableName}&primaryKey=${model.primaryKey}`;
  let m = reactive({
    queryParams: {},
    updateParams: {},
    addUpdateParams: {},
    addQueryParams: {},
    tableData: [],
    isShowTableLoading: false,
    isShowEditLoading: false,
    isShowEditPanel: false,
    isShowQueryPanel: true,
    buttonSize: "middle", // large | middle | small
    queryFieldMap: model.queryFieldMap || {},
    updateFieldMap: model.updateFieldMap || {},
    listFieldMap: model.listFieldMap || {},
    primaryKey: model.primaryKey,
    selectedRowKeys: [],
    $parent: null,
    pParams: computed(() => {
      if (!m.$parent) {
        return {};
      }
      const $parent = m.$parent;
      if ($parent.isUpdate) {
        return {
          [$parent.primaryKey]: $parent.updateParams[$parent.primaryKey]
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
  });

  for (let key in options) {
    if (key.slice(-1) === "M") {
      m[key].$parent = m;
    }
  }

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

  // 是否显示编辑区域
  const showEditPanel = function (options = {}) {
    const { addParams = {} } = options;
    m.updateParams = {
      ...addParams,
    };
    m.isShowEditPanel = true;
  };
  const hideEditPanel = function () {
    m.isShowEditPanel = false;
  };

  // 查询全部
  const findAll = (
    options.findAll ||
    async function (options = {}) {
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
    }
  ).bind(m);

  // 分页查询
  const find = (
    options.find ||
    async function (options = {}) {
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
        console.log(err, 343434);
        hideTableLoading();
        return err;
      }
    }
  ).bind(m);

  const save =
    options.save ||
    async function (options = {}) {
      const { params } = options;
      if (m.isShowEditLoading) {
        message.error("不可重复点击！");
        return;
      }
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
          message.success("保存成功");
        } else {
          message.success("创建成功");
        }
        m.updateParams = res.data;
        hideEditLoading();
        if (m.isPage) {
          await find();
        } else {
          await findAll();
        }
        return res;
      } catch (err) {
        console.log(err, 4354545);
        hideEditLoading();
        hideTableLoading();
        return err;
      }
    };

  // 删除n条数据
  const remove =
    options.remove ||
    async function (options = {}) {
      const { params } = options;
      const selectedRowKeysLen = m.selectedRowKeys.length;
      if (selectedRowKeysLen === 0) {
        message.warning("请选中一条记录");
        return;
      }
      Modal.confirm({
        title: `提示`,
        icon: createVNode(ExclamationCircleOutlined),
        content: `当前共选中了${selectedRowKeysLen}条记录，您确定要删除吗？`,
        okText: "确定",
        okType: "danger",
        cancelText: "取消",
        async onOk() {
          showTableLoading();
          try {
            console.log(m.selectedRowKeys, 55555);
            const res = await request.post(`${url}/remove${urlSuffix}`, {
              ids: m.selectedRowKeys.join(","),
            });
            message.success("删除成功");
            hideTableLoading();
            if (m.isPage) {
              await find();
            } else {
              await findAll();
            }
            return res;
          } catch (err) {
            hideTableLoading();
            return err;
          }
        },
        onCancel() {
          message.info("已取消删除");
        },
      });
    };

  return reactive({
    ...toRefs(m),
    findAll,
    find,
    save,
    remove,
    showTableLoading,
    hideTableLoading,
    showEditLoading,
    hideEditLoading,
    showEditPanel,
    hideEditPanel,
  });
}
