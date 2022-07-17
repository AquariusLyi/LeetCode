/**
求解连续数列

已知连续正整数数列{K}=K1,K2,K3…Ki的各个数相加之和为S，i=N (0<S<100000, 0<N<100000), 求此数列K。

输入描述

输入包含两个参数，1）连续正整数数列和S，2）数列里数的个数N。

输出描述

如果有解输出数列K，如果无解输出-1。

示例1  输入输出示例仅供调试，后台判题数据一般不包含示例

输入

525 6

输出

85 86 87 88 89 90

示例2  输入输出示例仅供调试，后台判题数据一般不包含示例

输入

3 5

输出

-1
 */

function getOutput(args) {
  // 525 6
  // 85 86 87 88 89 90
  // 3 5
  // -1
  // 连续正正数数列和
  // sum = (k1+kn)*num/2
  // sum = (k1+ k1+num-1)*num /2
  // k1 = ((2*sum)/num+1-num)/2

  // sum(x x+1 x+2 ... x+n-1) = sum
  // n*x + n*(n-1)/2 = sum
  // x= [sum - n*(n-1)/2 ]/n

  const input = args.split(" ");
  const sum = input[0];
  const num = input[1];

  const k1 = ((2 * sum) / num + 1 - num) / 2;

  //   s = (a1 + an)*n/2-------->  a1 = (2s/n +1 -n )/2  ,则 2s/n - n 必须为奇数
  //   if ( 2*s % n !=0) {
  //    console.log("无解,返回：" + -1);
  //     return ;
  // }
  // else if( (2 * s / n - n)%2 ==0){
  //    console.log("无解,返回：" + -1);
  //     return ;
  // }else
  //     a1 = (2 * s / n + 1 - n) / 2;
  // ————————————————
  // 版权声明：本文为CSDN博主「lotus-wxj」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
  // 原文链接：https://blog.csdn.net/weixin_39772200/article/details/107719443

  if (
    k1 < 0 ||
    sum / num == 0 ||
    (2 * sum) % num != 0 ||
    ((2 * sum) / num - num) % 2 == 0
  ) {
    console.log(-1);
    return;
  }
  var result = [];
  for (let i = 0; i < num; i++) {
    result.push(+k1 + i);
  }
  console.log(result.join(" "));
}
getOutput("525 6");
getOutput("531 6");
// console.log(((2 * 525) / 6 + 1 - 6) / 2);
// console.log(((2 * 3) / 5 + 1 - 5) / 2);

/**
 java

 
import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int sum = in.nextInt();
        int n = in.nextInt();
        // sum(x x+1 x+2 ... x+n-1) = sum
        // n*x + n*(n-1)/2 = sum
        // x= [sum - n*(n-1)/2 ]/n
        int temp = sum - n*(n-1)/2;
        if (temp <=0 || temp%n!=0){
            System.out.println(-1);
            return;
        }
        int begin = temp/n;
        for (int i = 0; i < n; i++) {
            System.out.print(begin+i);
            System.out.print(' ');
        }
    }
}
 */
