/**
 数组连续和
 标题：数组连续和 | 时间限制：1秒 | 内存限制：65536K | 语言限制：不限
给定一个含有N个正整数的数组, 求出有多少个连续区间（包括单个正整数）, 它们的和大于等于x。
输入描述:
第一行两个整数N x（0 < N <= 100000, 0 <= x <= 10000000)
第二行有N个正整数（每个正整数小于等于100)。
输出描述:
输出一个整数，表示所求的个数。

示例1
输入
3 7
3 4 7
输出
4
说明
3+4 4+7 3+4+7 7这四组数据都是大于等于7的，所以答案为4
示例2
输入
10 10000000
1 2 3 4 5 6 7 8 9 10


输出
0

解题思路
因为都是正整数，所以只要前面的数字和满足条件了，则后面所有的数字组合都满足。
 */
function sumArr() {
  let [n, x] = readline().split(" ").map(Number);
  let ints = readline().split(" ");

  // let n = Number("3");
  // let x = Number("7");
  // let ints = "3 4 7".split(" ");

  // let n = Number("10");
  // let x = Number("10000000");
  // let ints = "1 2 3 4 5 6 7 8 9 10".split(" ");

  let count; //连续正数和
  let res = 0;

  for (let i = 0; i < n; i++) {
    count = Number(ints[i]); //当前数字
    /**
     * 因为是正整数，所以如果当前数字符合要求
     * 则由此往后的连续和都符合要求
     * 连续区间数为长度n-当前数字下标i
     */
    if (count >= x) {
      res += n - i;
      break;
    }
    for (let j = i + 1; j < n; j++) {
      count += Number(ints[j]);
      if (count >= x) {
        res += n - j;
        break;
      }
    }
  }
  console.log(res);
}
sumArr();
