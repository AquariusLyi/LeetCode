/**
 靠谱的车
程序员小明打了一辆出租车去上班。出于职业敏感，他注意到这辆出租车的计费表有点问题，总是偏大。

出租车司机解释说他不喜欢数字4，所以改装了计费表，任何数字位置遇到数字4就直接跳过，其余功能都正常。

比如：

23再多一块钱就变为25；
1
39再多一块钱变为50；
1
399再多一块钱变为500；
1
小明识破了司机的伎俩，准备利用自己的学识打败司机的阴谋。

给出计费表的表面读数，返回实际产生的费用。

输入描述:
只有一行，数字N，表示里程表的读数。

(1<=N<=888888888)。

输出描述:
一个数字，表示实际产生的费用。以回车结束。

示例1：
输入
5
输出
4
说明
5表示计费表的表面读数。
4表示实际产生的费用其实只有4块钱。
示例2：
输入
17
输出
15
说明
17表示计费表的表面读数。
15表示实际产生的费用其实只有15块钱。
示例3：
输入
100
输出
81
说明
100表示计费表的表面读数。
81表示实际产生的费用其实只有81块钱。
 */

function taxi1(args) {
  let num = +args.trim();
  let digit = 0; //个位数
  let power = 0; //次方数， 9进制下，123转为10进制：123 = 1*9^2 + 2*9^1 + 3*9^0
  let res = 0; //十进制下的总数
  while (num > 0) {
    digit = num % 10; //个位数
    if (digit > 4) {
      res += (digit - 1) * Math.pow(9, power);
    } else {
      res += digit * Math.pow(9, power);
    }
    power++; //次方数加1
    num = Math.floor(num / 10); // input去除个位数， 即右移一位
  }
  console.log(res);
}
taxi1("5");
taxi1("17");
taxi1("100");
taxi1("53");

// 第二种写法
function taxi2(args) {
  let n = +args.trim();
  let ans = n;
  let temp = 0;
  let k = 0;
  let j = 1;
  while (n > 0) {
    //先判断个位上是否跳了4，如果个位上是5~9，就先temp=1
    if (n % 10 > 4) {
      temp += ((n % 10) - 1) * k + j;
    } else {
      temp += (n % 10) * k;
    }
    k = k * 9 + j; // k代表跳了多少次4，多收了多少个1元
    j *= 10; // j代表位数，1代表个位，10代表十位
    n = Math.floor(n / 10); // 相当于将N整体右移一位
  }
  console.log(ans - temp);
}
taxi2("5");
taxi2("17");
taxi2("100");
taxi2("53");

/**
 java


import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int n = in.nextInt();
        int ans = n,temp = 0,k = 0,j = 1;
        while(n > 0){
            if (n % 10  > 4){
                temp  += (n % 10 - 1) * k + j ;
            }else {
                temp  += (n % 10) * k;
            }
            k = k * 9 + j;
            j *= 10;
            n /= 10;
        }
        System.out.println(ans - temp);
    }
}

// 解法二

import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner in = new Scanner(System.in);
    int N = in.nextInt();
    int ans = N, temp = 0, k = 0, j = 1;
    while (N > 0) {
      //先判断个位上是否跳了4，如果个位上是5~9，就先temp=1。
      if (N % 10 > 4) {
        temp += (N % 10 - 1) * k + j;
      } else {
        temp += (N % 10) * k;
      }
      k = k * 9 + j;//k代表跳了多少次4，多收了多少个1元
      j *= 10;//j代表位数，1代表个位，10代表十位
      N /= 10;//相当于将N整体右移一位
    }
    System.out.println(ans - temp);
  }
}

 */
