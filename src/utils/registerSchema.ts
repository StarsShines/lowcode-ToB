/*
 * @Author: M.H
 * @Date: 2022-11-04 17:49:30
 * @LastEditors: M.H
 * @LastEditTime: 2022-11-04 18:12:16
 * @Description: 全局方法注册
 */

export const registerComponentsSchema = () => {
  // 获取所有自定义组件schema
  const files: any = import.meta.glob('@/material/**/*.json', { eager: true });
  let fields: any = {};
  let initializing: any = [];
  files.keys().forEach((key: any) => {
    const [, name] = key.split('/');
    let config = { component: name, ...files(key) };
    console.log(config);

    fields[name] = config.fields;
    initializing.push(initDefaulValue(config));
  });
  return { initializing, fields };
};

// 初始化组件初始数据
const initDefaulValue = (config: any) => {
  let { component, name, icon, fields } = config;
  let temp = { component, name, icon };
  setDefaultValue(fields, temp);
  return temp;
};

// 递归设置各层级初始数据
function setDefaultValue(fields: any, initializing: any) {
  for (let key in fields) {
    let { type, value, child } = fields[key];
    if (type == 'object') {
      initializing[key] = {};
      child && setDefaultValue(fields[key].child, initializing[key]);
    } else {
      initializing[key] = value;
    }
  }
  return initializing;
}
