/**
素数之积

RSA加密算法在网络安全世界中无处不在，它利用了极大整数因数分解的困难度，数据越大，安全系数越高，给定一个32位正整数，请对其进行因数分解，找出是哪两个素数的乘积。

输入描述:
一个正整数num
0 < num <= 2147483647
输出描述:
如果成功找到，以单个空格分割，从小到大输出两个素数，分解失败，请输出-1 -1

示例1
输入
15
输出
3 5
说明
因数分解后，找到两个素数3和5，使得3*5=15，按从小到大排列后，输出3 5

示例2
输入
27
输出
-1 -1
说明
通过因数分解，找不到任何素数，使得他们的乘积为27，输出-1 -1
 */
demo("15");
demo("27");
function demo(args) {
  let n = Number(args.trim());
  let list = [];
  let m = 0;
  /**
   * 本题就是求出一个数只有两个因子（1不是素数）
   * 遍历n求出它所有的因子
   */
  while (m != n) {
    //当n==m时说明已经不能再除了，跳出循环
    n = m != 0 ? m : n;
    for (let i = 2; i < Math.sqrt(n) + 1; i++) {
      if (n % i == 0) {
        m = n / i; //把商作为下次的被除数
        list.push(i); //i就是因子
        break;
      }
    }
  }

  list.push(m);

  if (list.length == 2) {
    console.log(list[0] + " " + list[1]);
  } else {
    console.log("-1 -1");
  }
}

// 第二种解法
// 判断一个数是不是素数
var isPrime = function (n) {
  if (n < 1) return false;

  let sqrt = Math.sqrt(n);

  for (let i = 2; i <= sqrt; i++) {
    if (n % i === 0) return false;
  }
  return true;
};

var productPrime = function (num) {
  let x = -1;
  let y = -1;
  let sqrt = Math.sqrt(num);

  for (let i = 2; i <= sqrt; i++) {
    // 先判断第一个因子是否为素数
    if (isPrime(i)) {
      // 判断能否除尽
      if (num % i === 0) {
        // 判断第二个因子是否为素数
        if (isPrime(num / i)) {
          x = i;
          y = num / i;
        } else {
          continue;
        }
      } else {
        continue;
      }
    } else {
      continue;
    }
  }
  console.log(`${x} ${y}`);
};

productPrime(15);
productPrime(27);

/**
 

import java.util.*;

public class Main{
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        long num = sc.nextLong();
        long limit = (long)Math.floor(Math.sqrt(num));
        String res = "";
        boolean flag = false;
        for(long i = 2;i<=limit;i++){
            if(num%i==0){
                if(isPrime(i)&&isPrime(num/i)){
                    flag = true;
                    if(i<num/i){
                        res = i+" "+num/i;
                    }
                    else{
                        res = num/i+" "+i;
                    }
                }
            }
        }
        if(flag==true){
            System.out.println(res);
        }
        else{
            System.out.println("-1 -1");
        }
    }
    
    public static boolean isPrime(long num){
        long limit = (long)Math.floor(Math.sqrt(num));
        for(long i = 2;i<=limit;i++){
            if(num%i==0) return false;
        }
        return true;
    }
    
}
 */
