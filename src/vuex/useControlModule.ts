/*
 * @Author: M.H
 * @Date: 2022-11-08 10:47:07
 * @LastEditors: M.H
 * @LastEditTime: 2022-11-08 11:39:47
 * @Description: 请填写简介
 */
import { reactive, readonly, computed } from 'vue';
import { deepClone } from '@/utils/utils';
interface ControlProp {
  curComponent?: any;
  modules?: any[];
  oldModules?: any[];
}

let state: ControlProp = reactive({
  curComponent: undefined,
  modules: [],
  oldModules: [],
});

let getters: any = {
  getCurComponent: computed(() => {
    return state.curComponent;
  }),
  getModules: computed(() => {
    // console.log('getModules', state.modules);
    return state.modules;
  }),
  getOldModules: computed(() => {
    return state.oldModules;
  }),
};

let mutations: any = {
  CHANGE_CURCOMPONENT(curComponent: any) {
    state.curComponent = curComponent;
  },
  CHANGE_MODULES(modules: any[]) {
    // console.log('CHANGE_MODULES', state.modules);
    state.modules = modules;
  },
  CHANGE_OLDMODULES(oldModules: any[]) {
    state.oldModules = oldModules;
  },
};

export const useControlModules = {
  state: readonly(state),
  getters: readonly(getters),
  mutations,
};
