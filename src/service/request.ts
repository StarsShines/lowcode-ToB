/*
 * @Author: M.H
 * @Date: 2022-11-04 16:25:25
 * @LastEditors: M.H
 * @LastEditTime: 2022-11-04 18:18:20
 * @Description: axios初始化
 */
import axios from 'axios';
import { UserModule } from '@/vuex/userModule';
import { ElMessage, ElMessageBox } from 'element-plus';

interface Response {
  data: any;
  message: string;
  error_message: string;
  result?: any;
  /**
   * @fix 200
   */
  code: number;
}

const request: any = axios.create({
  baseURL: import.meta.env.VITE_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 15000, // request timeout
});
// request interceptor
request.interceptors.request.use(
  (config: any) => {
    if (UserModule.getters.userInfo.token) {
      config.headers['Access-Token'] = UserModule.getters.userInfo.token;
      config.headers['Content-Type'] = 'application/json;charset=utf8';
    }

    return config;
  },
  (error: any) => {
    ElMessage.info('请求超时...');
    Promise.reject(error);
  },
);

// response interceptor
request.interceptors.response.use(
  (response: Response) => {
    const res = response.data;
    if (res.code !== 200) {
      // session过期
      if (res.code === -1) {
        ElMessageBox.confirm('超时自动登出，您可以重新登录系统', '信息提示', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            ElMessage({
              type: 'success',
              message: 'JUMP',
            });
            UserModule.actions.dispath('loginOut', {});
          })
          .catch(() => {});
      } else {
        ElMessage.error(res.message);
      }
      return Promise.reject('error');
    } else {
      return res;
    }
  },
  (error: any) => {
    console.log(error);
    ElMessage.error(error.message);
    return Promise.reject(error);
  },
);
