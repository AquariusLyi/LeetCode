/**
 【区间交集】

给定一组闭区间，其中部分区间存在交集。

任意两个给定区间的交集，称为公共区间(如:[1,2],[2,3]的公共区间为[2,2]，[3,5],[3,6]的公共区间为[3,5])。

公共区间之间若存在交集，则需要合并(如:[1,3],[3,5]区间存在交集[3,3]，需合并为[1,5])。

按升序排列输出合并后的区间列表。

输入描述

一组区间列表，区间数为 N: 0<=N<=1000;区间元素为 X: -10000<=X<=10000。

输出描述

升序排列的合并区间列表

备注:

1、区间元素均为数字，不考虑字母、符号等异常输入。

2、单个区间认定为无公共区间。

示例1  输入输出示例仅供调试，后台判题数据一般不包含示例

输入

[[0, 3], [1, 3], [3, 5], [3, 6]]

输出

[[1, 5]]


 */

function mergeSection() {
  let arr = JSON.parse(readline().trim());

  if (arr.length == 1) return arr[0];
  arr.sort((a, b) => a[0] - b[0]);

  let brr = [];
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i][arr[i].length - 1] >= arr[j][0]) {
        brr.push([
          arr[j][0],
          Math.min(arr[i][arr[i].length - 1], arr[j][arr[j].length - 1]),
        ]);
      }
    }
  }

  if (brr.length == 1) return brr;
  brr.sort((a, b) => a[0] - b[0]);

  let len = brr.length;
  let i = 0;

  while (i <= len - 2) {
    if (brr[i][brr[i].length - 1] >= brr[i + 1][0]) {
      brr[i][brr[i].length - 1] = Math.max(
        brr[i][brr[i].length - 1],
        brr[i + 1][brr[i + 1].length - 1]
      );
      brr.splice(i + 1, 1);
      len--;
    } else {
      i++;
    }
  }
  return brr;
}

console.log(JSON.stringify(mergeSection()));
/**
 // python
 def common_section_merge(arr):
    if len(arr) == 1:
        return arr[0]
    arr.sort(key=lambda x: x[0])  
    brr = []  
    for i in range(len(arr) - 1):
        for j in range(i + 1, len(arr)):
            if arr[i][-1] >= arr[j][0]:  
                brr.append([arr[j][0], min(arr[i][-1], arr[j][-1])])
    if len(brr) == 1:
        return brr
    brr.sort(key=lambda x: x[0])
    l = len(brr)
    i = 0
    while i <= l - 2:
        if brr[i][-1] >= brr[i + 1][0]:
            brr[i][-1] = max(brr[i][-1], brr[i + 1][-1])
            brr.pop(i + 1)
            l -= 1
        else:
            i += 1
    return brr


if __name__ == "__main__":
    print(common_section_merge([[0, 3], [1, 3], [3, 5], [3, 6]]))
 */
