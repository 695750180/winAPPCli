class Util {
  private static instance: Util = new Util();
  private constructor() {}
  static getInstance(): Util {
    return this.instance;
  }

  /**
   * 日期格式化
   * @param date 要格式化的日期
   * @param str 需要转换的格式 yyyy-MM-dd hh:mm:ss
   */
  formatDate(date: any, str: string): string {
    let formateDate: Date;
    if (date) {
      formateDate = new Date(date);
    } else {
      formateDate = new Date();
    }
    let month: string =
      formateDate.getMonth() + 1 > 9
        ? String(formateDate.getMonth() + 1)
        : "0" + (formateDate.getMonth() + 1);
    let day: string =
      formateDate.getDate() > 9
        ? formateDate.getDate() + ""
        : "0" + formateDate.getDate();
    let hour: string =
      formateDate.getHours() < 10
        ? "0" + formateDate.getHours()
        : formateDate.getHours() + "";
    let minutes: string =
      formateDate.getMinutes() < 10
        ? "0" + formateDate.getMinutes()
        : formateDate.getMinutes() + "";
    let seconds: string =
      formateDate.getSeconds() < 10
        ? "0" + formateDate.getSeconds()
        : formateDate.getSeconds() + "";
    str = str.replace("yyyy", formateDate.getFullYear() + "");
    str = str.replace("MM", month);
    str = str.replace("dd", day);
    str = str.replace("hh", hour);
    str = str.replace("mm", minutes);
    str = str.replace("ss", seconds);
    return str;
  }

  /**
   * 对象深拷贝
   * @param obj 要复制的对象
   */
  copyObject(obj: any): any {
    let copy: any = JSON.parse(JSON.stringify(obj));
    return copy;
  }

  /**
   * @description : .号多层字段解析
   * @author ： houjianhong
   * @param obj 要读取对象
   * @param key 要读取的属性
   */
  readObjectKey(obj: any, key: string) {
    let keys: string[] = key.split(".");
    let result: any = "";
    let newObj: any = this.copyObject(obj); //深拷贝一份数据

    for (let i: number = 0; i < keys.length; i++) {
      if (i == 0) {
        if (!newObj) {
          result = "";
          return result;
        } else {
          result = newObj[keys[i]];
        }
      } else {
        if (!result) {
          result = "";
          return result;
        } else {
          result = result[keys[i]];
        }
      }
    }
    return result;
  }

  /**
   * 给对象数组按升序排序 并保证原始顺序
   * 不该变原数组
   * @param list
   * @param sortField
   */
  sortObjList(list : object[], sortField: string): object[] {
    if ('' === sortField.trim()) {
      sortField = 'sortNo';
    }
    // 复制 不影响原数组
    list = [...list];

    let tempList: object[] = [];
    let len: number = list.length;
    // 将下标扩展出来，解决谷歌排序下，值相等时无法保证原来顺序，对于数据是对象时，这是不稳定的排序
    for (let i: number = 0; i < len; i++) {
      tempList.push({index: i, data: list[i]});
    }
    tempList.sort(function(a: object, b: object){
      let aSort: any = a['data'][sortField];
      let bSort: any = b['data'][sortField];
      if (aSort === bSort) {
        // 值相等 按下标排序 保证原始顺序
        return a['index'] - b['index'];
      }
      if (aSort == null || bSort == null) {
        // 通过同值比较不会同时是空值，空值放最后面
        return bSort == null ? -1 : 1;
      }
      return aSort < bSort ? -1 : 1;
    });
    for (let i: number = 0; i < len; i++) {
      list[i] = tempList[i]['data'];
    }
    return list;
  }

  /**
   * 列表转为树状结构
   * 不影响原数组
   * @param list
   * @param props
   */
  listToTree(list: object[], props: {code?: string, parent?: string, children?: string}): object[] {
    // 默认字段
    const defaultProps: any = {
      code: 'code',
      parent: 'parent',
      children: 'children'
    }
    // 检验
    if ('string' !== typeof props.code || '' === props.code.trim()) {
      props.code = defaultProps.code;
    }
    if ('string' !== typeof props.parent || '' === props.parent.trim()) {
      props.parent = defaultProps.parent;
    }
    if ('string' !== typeof props.children || '' === props.children.trim()) {
      props.children = defaultProps.children;
    }

    // 把同一个父节点的排到一起
    list = this.sortObjList(list, props.parent);

    // 保留原始顺序数据
    let extendList: object[] = [];
    for (let i: number = 0; i < list.length; i++) {
      extendList.push({index: i, data: list[i]});
    }

    // 将同个父节点的放一个数据
    let root: object[] = [];
    let holder: object = {} // 容器
    let curParent: any = null;
    let tempList: object[] = [];
    for (let i:number = 0; i < extendList.length; i++) {
      const item: object = extendList[i];
      const data: object = item['data'];

      // 父节点code为空 或者 自己的父节点是自身，则是一个根节点
      if (data[props.parent] == null || data[props.code] === data[props.parent]) {
        root.push(item);
        continue;
      }

      // 由于已经按父节点排完序，故如果当前父节点不等于数据父节点，则进入下一个子树遍历
      if (curParent !== data[props.parent]) {
        curParent = data[props.parent];
        tempList = [];
        holder[curParent] = tempList;
      }
      tempList.push(item);
    }

    // 挂到对应的父节点 形成树
    for (let i: number = 0; i < extendList.length; i++) {
      const item: object = list[i];
      const code: any = item[props.code];
      if (holder.hasOwnProperty(code)) {
        const children: object[] = holder[code];
        item[props.children] = children;

        // 还原数据
        for (let j: number = 0; j < children.length; j++) {
          children[j] = children[j]['data'];
        }
        delete holder[code];
      } else {
        item[props.children] = [];
      }
    }

    // 没有被摘走的组成森林
    for (let key in holder) {
      if(holder.hasOwnProperty(key)) {
        root = root.concat(holder[key]);
      }
    }

    // 根节点按原来顺序排序
    root = this.sortObjList(root, 'index');

    // 还原根节点数据
    for (let i: number = 0; i < root.length; i++) {
      root[i] = root[i]['data'];
    }

    return root;
  }
}
export default Util.getInstance();
