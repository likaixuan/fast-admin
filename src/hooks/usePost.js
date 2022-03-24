import { ref } from "vue";
import request from "@/request";
export default function (url, params = {}) {
  const loading = ref(true);
  const data = ref(null);
  const errorMsg = ref("");
  const code = ref(1);
  request
    .post(url, params)
    .then((res) => {
      loading.value = false;
      data.value = res.data;
      code.value = res.data;
    })
    .catch((error) => {
      code.value = error.code;
      errorMsg.value = error.msg;
    });
  return {
    loading,
    data,
    errorMsg,
    code,
  };
}
