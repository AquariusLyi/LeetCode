/**
 ■ 题目描述

华为商城举办了一个促销活动，如果某顾客是某一秒内最早时刻下单的顾客（可能是多个人），则可以获取免单。

请你编程计算有多少顾客可以获取免单。

解答要求

时间限制： 3000ms,内存限制： 64MB

输入

输入为 n 行数据，每一行表示一位顾客的下单时间

以（年-月-日时-分-秒.毫秒） yyyy-MM-ddHH:mm:ss.fff 形式给出。

0<n<50000
2000<yyyy<2020
0<MM<=12
0<dd<=28
0<=HH<=23
0<=mm<=59
0<=ss<=59
0<=fff<=999

所有输入保证合法。

输出

输出一个整数，表示有多少顾客可以获取免单。

样例

输入样例 1

2019-01-01 00:00:00.001
2019-01-01 00:00:00.002
2019-01-01 00:00:00.003

输出样例 1

1

输入样例 2

2019-01-01 08:59:00.123

2019-01-01 08:59:00.123

2018-12-28 10:08:00.999

输出样例 2

3

输入样例 3

2019-01-01 00:00:00.004
2019-01-01 00:00:00.004
2019-01-01 00:00:01.006
2019-01-01 00:00:01.006
2019-01-01 00:00:01.005

输出样例 3

3

提示

样例 1 中，三个订单都是同一秒内下单，只有第一个订单最早下单，可以免单。
样例 2 中，前两个订单是同一秒内同一时刻（也是最早）下单，都可免单，第三个订单是当前秒内唯一一个订单（也是最早），也可免单。
样例 3 中，前两个订单是同一秒内同一时刻（也是最早）下单，第三第四个订单不是当前秒内最早下单，不可免单，第五个订单可以免单。
 */

function getNum(args) {
  const input = args.trim().split("\n");
  input.sort((a, b) => +new Date(a) - +new Date(b));
  let count = 1;
  const start = input[0];
  console.log(input, start);
  if (!start) {
    count = 0;
    console.log(count);
    return;
  }
  for (let i = 1; i < input.length; i++) {
    const ele = input[i];
    if (ele == start) {
      count++;
    }
  }
  console.log(count);
}
getNum(`
2019-01-01 00:00:00.003
2019-01-01 00:00:00.004
2019-01-01 00:00:01.007
2019-01-01 00:00:01.006
2019-01-01 00:00:01.005
`);
