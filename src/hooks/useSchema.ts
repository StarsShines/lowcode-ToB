/*
 * @Author: M.H
 * @Date: 2022-11-11 15:45:54
 * @LastEditors: M.H
 * @LastEditTime: 2022-11-11 17:43:28
 * @Description: Schema数据
 */

interface Props {
  id?: any;
  modelValue: any;
  label: string;
  options?: any;
}

export default function useSchema(defaultOptions: any, props: Props) {
  let mOptions: any = $computed(() => {
    return { ...defaultOptions, ...props.options };
  });
  return { mOptions };
}
