/**
  叠积木

  
积木宽高相等，长度不等，每层只能放一个或拼接多个积木，每层长度相等，求最大层数，最少2层。
输入
给定积木的长度，以空格分隔，例如:3 6 6 3。
输出
如果可以搭建，返回最大层数，如果不可以返回-1。

样例输入
3 6 6 3
样例输出
3

样例输入
3 5
样例输出
-1

【分析】
设所有积木长度总和为 sum ，若可以搭建为 m 层，每层积木长度为 n ，则必有 sum = mn ；设积木中长度最大值为 max ，则必有 n >= max
所以本题只需求出积木总长度 sum ，并找出其所有大于 max 小于 sum 的因数，分别判断以此为每层长度能否成功搭建，如果可以，记录层数，最终找到最大的层数
在找每一层所要用的积木时，使用贪心策略，从大的积木开始判断
————————————————
版权声明：本文为CSDN博主「下一个路口遇见你48」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/m0_56229413/article/details/117779383
 */
// 判断每层为当前长度时能否拼成
function judge(width) {
  // 临时用于遍历的数组
  const temp = [...arr];
  // 层数
  let count = 0;

  for (let i = 0; i < len; i++) {
    if (temp[i] === 0) {
      // 当前积木已被使用，跳过
      continue;
    }

    if (i === len - 1 && temp[i] !== width) {
      // 已找到最后一个，无法刚好拼成，返回-1，表示该长度不行
      return -1;
    }

    // 当前层已拼的积木总长度
    let sum = temp[i];
    // 将当前积木置为0，表示已经使用
    temp[i] = 0;

    if (sum === width) {
      // 刚好铺满该层，层数加一，向后继续
      count++;
      continue;
    } else {
      // 没有铺满，继续向后找
      for (let j = i + 1; j < len; j++) {
        if (temp[j] === 0) {
          // 积木已被使用，向后继续
          continue;
        }

        if (j === len - 1 && temp[j] + sum !== width) {
          // 找到最后一个了，但不能刚好拼成，返回-1
          return -1;
        }

        if (temp[j] + sum > width) {
          // 当前积木超出剩余长度，不能使用
          continue;
        } else if (temp[j] + sum === width) {
          // 加上该积木刚好铺满，以 i 位置打头的这一层已拼好，继续拼下一层
          temp[j] = 0;
          count++;
          break;
        } else {
          // 加上该积木还不够
          sum += temp[j];
          temp[j] = 0;
          continue;
        }
      }
    }
  }

  // 可以以该长度拼成，返回此时的层数
  return count;
}

// 获取输入
const input = "3 6 6 3";

const arr = input
  .split(" ")
  .map((x) => parseInt(x, 10))
  .sort((a, b) => b - a);
const len = arr.length;

// 最大值
const max = arr[0];
// 积木长度总和
let num = 0;
for (const x of arr) {
  num += x;
}

// 最终结果：初始为-1
let res = -1;

// 找因数：最少两层，所以最多找到 num/2
const range = Math.floor(num / 2);
for (let i = max; i <= range; i++) {
  if (num % i === 0) {
    // i 为 num 的因数，判断每层长度为 i 能否拼成
    res = judge(i);
  }

  if (res !== -1) {
    // 要找最大层数，所以从小的长度向大的找，当找到时，不需要向后继续，直接结束
    break;
  }
}

console.log(res);
