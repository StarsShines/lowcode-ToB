/*
 * @Author: M.H
 * @Date: 2022-11-04 17:49:30
 * @LastEditors: M.H
 * @LastEditTime: 2022-11-08 17:07:18
 * @Description: 全局方法注册
 */

export const registerComponentsSchema = () => {
  // 获取所有自定义组件schema
  const files: any = import.meta.glob('@material/**/*.json', { eager: true });
  let material: any = {
    basic: {},
    search: {},
  };
  let fields: any = {};
  // console.log(files);
  Object.keys(files).forEach((key: any) => {
    let initializing: any = [];
    const [, , , name] = key.split('/');
    let config = { component: name, ...files[key]['default'] };
    // console.log(config);
    fields[name] = config.fields;
    const modulesConfig = initDefaulValue(config);
    initializing.push(modulesConfig);
    Object.keys(material).forEach((i: string) => {
      if (config.group.includes(i)) {
        material[i]['$initializing'] ? material[i]['$initializing'].push(modulesConfig) : (material[i]['$initializing'] = [modulesConfig]);
      }
    });
  });
  return { material, fields };
};

// 初始化组件初始数据
const initDefaulValue = (config: any) => {
  let { component, name, icon, fields, childrens } = config;
  let temp = { component, name, icon, childrens };
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
