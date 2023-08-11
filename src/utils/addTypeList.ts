const addTypeListFn = (name: string, value: any) => {
  // console.log(value);
  switch (name) {
    case 'McTab':
      return {
        type: 'string',
        label: '卡片' + value.length,
        value: value.length,
      };
  }
};
export { addTypeListFn };
