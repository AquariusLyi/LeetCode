/**
分糖果

 小明从糖果盒中随意抓一把糖果，每次小明会取出一半的糖果分给同学们。
当糖果不能平均分配时，小明可以选择从糖果盒中（假设盒中糖果足够）取出一个糖果或放回一个糖果。
小明最少需要多少次（取出、放回和平均分配均记一次），能将手中糖果分至只剩一颗

输入描述:
抓取的糖果数（<10000000000）：
15
输出描述:
最少分至一颗糖果的次数：
5

示例1：
输入
15
输出
5
备注:
解释： (1) 15+1=16;
      (2) 16/2=8;
      (3) 8/2=4;
      (4) 4/2=2;
      (5) 2/2=1;
 */

function getNum(str) {
  let num = +str.trim();
  let count = 0;
  if (num % 2 != 0) {
    num++;
    count++;
    while (num != 1) {
      num = Math.floor(num / 2);
      count++;
    }
  }
  console.log(count);
}
getNum("15");

function fenTang(x) {
  if (x == 1) return 0;
  if (x == 2) return 1;
  if (x % 2 == 0) {
    const result = fenTang(x / 2) + 1;
    return result;
  } else {
    const left = fenTang(x + 1) + 1;
    const right = fenTang(x - 1) + 1;
    return Math.min(left, right);
  }
}
console.log(fenTang(15));

/**
 java


import java.io.InputStream;
import java.util.Scanner;
public class Main {
    public static void main(String[] args) throws Exception {
        Scanner scanner = new Scanner(System.in);
        long sum = scanner.nextLong();
        System.out.println(count(sum, 0)); 
    }
    
    private static int count(long sum, int count){
        if(sum <= 1){
            return count;
        }
        if(sum%2==0){
            return count(sum/2, count + 1);
        }
        return Math.min(count(sum + 1, count + 1), count(sum - 1,count + 1));
    }
}
 */
