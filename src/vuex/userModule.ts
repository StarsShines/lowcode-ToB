/*
 * @Author: M.H
 * @Date: 2022-10-31 16:41:02
 * @LastEditors: M.H
 * @LastEditTime: 2022-11-04 17:47:02
 * @Description: 请填写简介
 */
import { reactive, readonly, computed } from 'vue';

interface UseInfoProp {
  token: string;
}

let state: UseInfoProp = reactive({
  token: 'token',
});

let mutations: any = {
  CHANGE_TOKEN(token: string) {
    state.token = token;
  },
};
let getters: any = {
  userInfo: computed(() => {
    return {
      token: state.token,
    };
  }),
};

let actions: any = {
  dispath: async (fn: any, params: any) => {
    actions[fn](params);
  },
  getUserInfoApi: async () => {
    // try {
    //   const { isValid, data } = getUserInfo();
    //   if (isValid) {
    //     state.token = data.token
    //   }
    // } catch(e) {
    //   console.log(e);
    // }
  },
  loginOut: async (params: any) => {
    mutations.CHANGE_TOKEN('');
  },
};
export const UserModule = {
  state: readonly(state),
  getters: readonly(getters),
  mutations,
  actions,
};
