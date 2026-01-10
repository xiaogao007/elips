import axios from "axios";
import { ElMessage } from "element-plus";
/**
 * 封装curl方法
 */
const curl = ({
  url,
  method = "post",
  headers = {},
  query = {},
  data = {},
  responseType = "json",
  timeout = 60000,
  errorMessage = "网络异常",
}) => {
  // 接口签名处理
  const signKey = "vhcw9548g7hw045g7hg08547y";
  const st = Date.now();

  const dtoHeaders = {
    ...headers,
    s_t: st,
    s_sign: md5(`${signKey}_${st}`),
  };
  if (url.indexOf("/api/proj/") > -1 && window.projKey) {
    dtoHeaders.proj_key = window.projKey;
  }

  // 构造请求参数

  const ajaxSetting = {
    url,
    method,
    params: query,
    data,
    responseType,
    timeout,
    headers: dtoHeaders,
  };

  return axios
    .request(ajaxSetting)
    .then((response) => {
      const resData = response.data || {};
      // 后端api返回格式
      const { success, message, code } = resData;
      // 失败
      if (!success) {
        if (code === 442) {
          ElMessage.error("请求参数异常");
        } else if (code === 445) {
          ElMessage.error("请求不合法");
        } else if (code === 446) {
          ElMessage.error("缺少项目必要参数");
        } else if (code === 50000) {
          ElMessage.error(message);
        } else {
          ElMessage.error(errorMessage);
        }
        console.error(message);
        return Promise.resolve({ success, code, message });
      }
      // 成功
      const { data, metadata } = resData;
      return Promise.resolve({ success, data, metadata });
    })
    .catch((e) => {
      const { message } = e;
      if (message.match(/timeout/)) {
        return Promise.resolve({
          message: "Request Timeout",
          code: 504,
        });
      }
      return Promise.resolve(e);
    });
};
export default curl;
