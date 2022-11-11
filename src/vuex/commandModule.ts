/*
 * @Author: M.H
 * @Date: 2022-11-08 15:54:06
 * @LastEditors: M.H
 * @LastEditTime: 2022-11-11 17:56:33
 * @Description: 指令集
 */
import { deepClone } from '@/utils/utils';
import { onUnmounted, reactive } from 'vue';
import { ControlModules } from './controlModule';

// let datas: any[] = $computed(() => {
//   return ControlModules.getters.getModules;
// });
interface StateProp {
  current: number;
  queue: any[];
  commands: any;
  commandArray: any[];
  destroyArray: any[];
}
//指针
export let state = reactive<StateProp>({
  // 前进后退需要指针
  current: -1, // 前进后退的索引值
  queue: [], //  存放所有的操作命令
  commands: {}, // 制作命令和执行功能一个映射表  undo : ()=>{}  redo:()=>{}
  commandArray: [], // 存放所有的命令
  destroyArray: [],
});

export const registerCommand = () => {
  //前进指针
  registry(state, {
    name: 'redo',
    keyboard: 'ctrl+y',
    execute() {
      return {
        redo() {
          let item: any = state.queue[state.current + 1]; // 找到当前的下一步还原操作
          if (item) {
            item.redo && item.redo();
            state.current++;
          }
        },
      };
    },
  });
  //后退指针
  registry(state, {
    name: 'undo',
    keyboard: 'ctrl+z',
    execute() {
      return {
        redo() {
          console.log('undo', state.current);
          console.log('undo', state.queue);
          if (state.current == -1) return; // 没有可以撤销的了
          let item: any = state.queue[state.current]; // 找到上一步还原
          if (item) {
            item.undo && item.undo(); // 这里没有操作队列
            state.current--;
          }
        },
      };
    },
  });
  registry(state, {
    name: 'updateData', // 更新整个容器
    pushQueue: true,
    execute(oldValue: any, newValue: any) {
      console.log('1111', oldValue);
      console.log('2222', newValue);
      let state = {
        before: deepClone(oldValue), // 当前的值
        after: deepClone(newValue), // 新值
      };
      return {
        redo: () => {
          console.log('redo');
          ControlModules.mutations.CHANGE_CURCOMPONENT('');
          ControlModules.mutations.CHANGE_MODULES(state.after);
        },
        undo: () => {
          console.log('undo');
          ControlModules.mutations.CHANGE_CURCOMPONENT('');
          ControlModules.mutations.CHANGE_MODULES(state.before);
        },
      };
    },
  });
  onUnmounted(() => {
    // 清理绑定的事件
    state.destroyArray.forEach((fn: any) => fn && fn());
  });
  // return state;
};
//注册器
const registry = (state: any, command: any) => {
  state.commandArray.push(command);
  state.commands[command.name] = (...args: any) => {
    // 命令名字对应执行函数
    const { redo, undo } = command.execute(...args);
    command.name != 'updateData' && redo();
    if (!command.pushQueue) {
      // 不需要放到队列中直接跳过即可
      return;
    }

    let { queue, current } = state;

    // 如果先放了 组件1 -》 组件2 => 组件3 =》 组件4 - -》 组件3
    // 组件1 -> 组件3
    if (queue.length > 0) {
      queue = queue.slice(0, current + 1); // 可能在放置的过程中有撤销操作，所以根据当前最新的current值来计算新的对了
      state.queue = queue;
    }
    queue.push({ redo, undo }); // 保存指令的前进后退
    state.current = current + 1;
    console.log('queues', state.queue);
    console.log('queue', state.current);
  };
};
