// 归并排序
function MergeSort(arr: number[]): number[] {
  const res = mergeSort(arr, 0, arr.length - 1);

  function mergeSort(arr: number[], left: number, right: number) {
    const mid = left + ((right - left) >> 1);


    
    // 退出条件 只剩一个元素即可
    if (left === right) {
      return [arr[left]];
    }

    // 分解左右数组 直到剩一个元素
    let leftArr = mergeSort(arr, 0, mid);
    let rightArr = mergeSort(arr, mid + 1, right);
    console.log(left, right)
    console.log(11111111111);

    // // 排序 插入零时数组
    // let l = 0,
    //   r = 0;
    // let cache = new Array();
    // while (l < leftArr.length && r < rightArr.length) {
    //   if (leftArr[l] < rightArr[r]) {
    //     cache.push(leftArr[l++]);
    //   } else {
    //     cache.push(rightArr[r++]);
    //   }
    // }
    // // 把未清空的数组插入临时数组 (只会有一个生效)
    // while (l < leftArr.length) {
    //   cache.push(leftArr[l++]);
    // }
    // while (r < rightArr.length) {
    //   cache.push(rightArr[r++]);
    // }

    // return cache;
  }
  return res;
}

console.log(MergeSort([8,6,3,7,2,5,4,1]));
