import { reactive, toRefs, computed } from "vue";
import request from "@/request";
import { check, deepCopy } from "@/utils/util.js";
export default function (model, options = {}) {
  let url = model.url;
  let m = reactive({
    queryParams: {},
    editParams: {},
    addEditParams: {},
    addQueryParams: {},
    tableData: [],
    isShowTableLoading: false,
    isShowEditLoading: false,
    isShowEditPanel: false,
    queryFieldMap: model.queryFieldMap || {},
    createFieldMap: model.createFieldMap || {},
    updateFieldMap: model.updateFieldMap || {},
    listFieldMap: model.listFieldMap || {},
    primaryKey: model.primaryKey,
    isPage: true,
    pageInfo: {
      total: 0,
      current: 1,
      pageSize: 15,
    },
    isUpdate: computed(() => {
      const val = m.editParams[model.primaryKey];
      return !check.isUndefined(val) && !check.isNull(val);
    }),
    editPanelTitle: computed(() => {
      return m.isUpdate ? `编辑${model.modelCname}` : `创建${model.modelCname}`;
    }),
    ...options,
  });

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
  const showEditPanel = function () {
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
        const res = await request.post(`${url}/findAll`, {
          ...m.addQueryParams,
          ...m.queryParams,
          ...params,
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
      console.log(123456);
      showTableLoading();
      try {
        const res = await request.post(`${url}/find`, {
          ...m.addQueryParams,
          ...m.queryParams,
          ...m.pageInfo,
          ...params,
        });
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
    }
  ).bind(m);

  const save =
    options.save ||
    async function (options = {}) {
      const { params } = options;
      showTableLoading();
      showEditLoading();
      try {
        const res = await request.post(`${url}/update`, {
          ...m.addEditParams,
          ...m.editParams,
          ...params,
        });
        m.editParams = res.data;
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
    async function (params) {
      showTableLoading();
      try {
        const res = await request.post(`${url}/remove`, params);
        hideTableLoading();
        return res;
      } catch (err) {
        hideTableLoading();
        return err;
      }
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
