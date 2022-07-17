/**
 分月饼

 题目描述
中秋节，公司分月饼，m 个员工，买了 n 个月饼，m<=n，每个员工至少分 1 个月饼，但可以分多个，单人分到最多月饼的个数为 Max1，单人分到第二多月饼的个数是 Max2，Max1-Max2<=3,单人分到第 n-1 多月饼个数是 Max(n-1)，单人分到第 n 多月饼的个数是 Max(n)，Max(n-1)-Max(n)<=3。请问有多少种分月饼的方法？
输入描述
每一行输入 m、n，表示 m 个员工，n 个月饼，m<=n
输出描述
输出有多少种分月饼的方法
示例 1
输入
2 4
输出
2

说明
分法有 2 种：
4 = 1 + 3
4 = 2 + 2
注意：1+3 和 3+1 算一种分法

示例 2
输入
3 5
输出
说明
分法有 2 种：
5 = 1 + 1 + 3
5 = 1 + 2 + 2

示例 3
输入
3 12
输出
6
说明
满足要求的有 6 种分法：
12 = 1 + 1 + 10(Max1=10,Max2=1,不满足要求)
12 = 1 + 2 + 9(Max1=9,Max2=2,不满足要求)
12 = 1 + 3 + 8(Max1=8,Max2=3,不满足要求)
12 = 1 + 4 + 7(Max1=7,Max2=4,Max3=1,满足要求)
12 = 1 + 5 + 6(Max1=6,Max2=5,Max3=1,不满足要求)
12 = 2 + 2 + 8(Max1=8,Max2=2,不满足要求)
12 = 2 + 3 + 7(Max1=7,Max2=3,不满足要求)
12 = 2 + 4 + 6(Max1=6,Max2=4,Max3=2,满足要求)
12 = 2 + 5 + 5(Max1=5,Max2=5,Max3=2,满足要求)
12 = 3 + 3 + 6(Max1=6,Max2=3,Max3=3,满足要求)
12 = 3 + 4 + 5(Max1=5,Max2=4,Max3=3,满足要求)
12 = 4 + 4 + 4(Max1=4,Max2=4,Max3=4,满足要求)

*/

var distribute = function (m, p, k) {
  if (p <= 0) return 0;
  if (m <= 0) return 0;

  if (m === 1) {
    if (p >= k && p <= k + 3) {
      return 1;
    }
    return 0;
  }

  let ncount = 0;

  for (let knext = k; knext <= k + 3; knext++) {
    ncount = ncount + distribute(m - 1, p - knext, knext);
  }
  return ncount;
};

var getMoonCake = function (m, n) {
  if (m > n) {
    return 0;
  }

  const p = n - m;
  let count = 0;

  for (let i = 0; i < p; i++) {
    count = count + distribute(m - 1, p - i, i);
  }
  console.log(count);
};

getMoonCake(2, 4);
getMoonCake(3, 5);
getMoonCake(3, 12);
