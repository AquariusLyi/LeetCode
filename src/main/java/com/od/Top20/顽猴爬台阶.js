/**
 顽猴爬台阶
 
 猴子爬山

  一天一只顽猴想要从山脚爬到山顶途中经过一个有n个台阶的阶梯，但是这个猴子有个习惯，每一次只跳1步或3步。  试问？猴子通过这个阶梯有多少种不同的跳跃方式

输入描述：输入只有一个这个数n    0<n<50  此阶梯有多个台阶


输出描述：有多少种跳跃方式

实例:
输入 50   输出 122106097

输入 3    输出2
 */

function getNum(str) {
  let n = parseInt(str.trim());
  let f1 = 1;
  let f2 = 1;
  let f3 = 2;
  let f4 = n == 3 ? 2 : 1; //f4用来存储结果
  for (let i = 4; i <= n; i++) {
    f4 = f1 + f3;
    f1 = f2;
    f2 = f3;
    f3 = f4;
  }
  console.log(f4);
}
getNum("3");
getNum("50");

function Monkey(args) {
  let num = parseInt(args);
  if (num == 1) return 1;
  if (num == 2) return 1;
  if (num == 3) return 2;
  let sum = 0;
  if (num > 3) {
    sum = Monkey(num - 1) + Monkey(num - 3);
  }
  return sum;
}
Monkey(3);
Monkey(50);
