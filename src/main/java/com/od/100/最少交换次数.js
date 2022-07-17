/**

最少交换次数

给出数字K,请输出所有结果小于K的整数组合到一起的最少交换次数。

组合一起是指满足条件的数字相邻，不要求相邻后在数组中的位置。

数据范围

-100 <= K <= 100

-100 <= 数组中数值 <= 100

输入描述

第一行输入数组：1 3 1 4 0

第二行输入K数值：2

输出描述

第一行输出最少交换次数：1

示例1   输入输出示例仅供调试，后台判题数据一般不包含示例

1 3 1 4 0

2

输出

1

示例 2
输入：
0 0 1 0
2
输出： 0
示例 3
输入：
2 3 2
1
输出： 0
参考代码
将大于等于k的置为0，小于k的置为1；
1 3 1 4 0 转换后 1 0 1 0 1
一共有3个小于k的数，确定宽度为3的窗口向右滑动，窗口中1的数量越多移动的次数越少。


备注

小于2的表达式是1 1 0, 共三种可能将所有符合要求数字组合一起，最少交换1次。

 */

function getMin(args, str2) {
  let input = args.trim().split(/\s+/).map(Number);
  let K = +str2.trim();
  let num = 0;
  input.forEach((item) => {
    if (item < K) {
      num++;
    }
  });
  let min = num;
  for (let i = 0; i < input.length - num + 1; i++) {
    let temp = 0;
    for (let j = 0; j < num; j++) {
      if (input[i + j] > K) {
        // console.log(i, j, input[i + j]);
        temp++;
      }
    }
    min = Math.min(min, temp);
  }
  console.log(min);
}
getMin("1 3 1 4 0", "2");
getMin("0 0 1 0", "2");
getMin("2 3 2", "1");
/**
 java
 
 */
