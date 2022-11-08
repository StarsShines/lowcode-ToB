/*
 * @Author: M.H
 * @Date: 2022-11-08 10:47:07
 * @LastEditors: M.H
 * @LastEditTime: 2022-11-08 11:39:47
 * @Description: 请填写简介
 */
import { reactive, readonly, computed } from 'vue';

interface ControlProp {
  curComponent?: any;
  modules?: any[];
}

let state: ControlProp = reactive({
  curComponent: undefined,
  modules: [],
});

let getters: any = {
  getCurComponent: computed(() => {
    return state.curComponent;
  }),
  getModules: computed(() => {
    return state.modules;
  }),
};

let mutations: any = {
  CHANGE_CURCOMPONENT(curComponent: any) {
    state.curComponent = curComponent;
  },
  CHANGE_MODULES(modules: any[]) {
    state.modules = modules;
  },
};

export const ControlModules = {
  state: readonly(state),
  getters: readonly(getters),
  mutations,
};
