import { reactive, toRefs } from "vue";
import request from "@/request";
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
    async function ({ params = {} }) {
      showTableLoading();
      try {
        const res = await request.post(`${url}/findAll`, {
          ...this.addQueryParams,
          ...this.queryParams,
          ...params,
        });
        this.tableData = res.data;
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
    async function (params) {
      showTableLoading();
      try {
        const res = await request.post(`${url}/save`, params);
        hideTableLoading();
        return res;
      } catch (err) {
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
    save,
    remove,
    showTableLoading,
    hideTableLoading,
    showEditLoading,
    hideEditLoading,
    showEditPanel,
    hideEditPanel
  });
}
