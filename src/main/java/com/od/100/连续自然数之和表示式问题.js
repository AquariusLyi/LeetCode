/**
用连续自然数之和来表达整数

一个整数可以由连续的自然数之和来表示。给定一个整数，计算该整数有几种连续自然数之和的表达式，且打印出每种表达式。


输入描述:
一个目标整数T (1 <=T<= 1000)
 
输出描述:
该整数的所有表达式和表达式的个数。如果有多种表达式，输出要求为：
1.自然数个数最少的表达式优先输出
2.每个表达式中按自然数递增的顺序输出，具体的格式参见样例。在每个测试数据结束时，输出一行”Result:X”，其中X是最终的表达式个数。


示例1
输入
9

输出
9=9
9=4+5
9=2+3+4
Result:3

说明 整数9有三种表达方法：

示例二
输入
10
输出
10=10
10=1+2+3+4
Result:2

 */

function niuke() {
  let num = +readline().trim();
  console.log(num + "=" + num);
  let list = [];
  let count = 1;
  for (let i = 1; i < num; i++) {
    //从每一个数开始探索
    let sum = 0;
    let result = "";
    // for(int j = i;  sum <= t;  j++){ }  可以这样for 循环处理
    for (let j = i; sum < num; j++) {
      //单个数的探索过程
      sum += j;
      result = result.concat(j, "+");
      if (sum == num) {
        list.push(num + "=" + result.substring(0, result.length - 1));
        count++;
        break;
      }
    }
  }
  list.sort((a, b) => a.length - b.length);
  list.forEach((item) => {
    console.log(item);
  });
  console.log("Result:" + count);
}

// 等差数列概念：公差d ; 通项公式：an = a1 + (n-1)d 。设首项为x，由题意得：d=1
// 前n项和公式为:sum = n(a1+an)/2 ；将an代入得到公式为：sum = n(2x+n-1)/2
//首项a1由公式推导为：x = n(sum - n(n-1)/2)/n  因此x = (2*sum-n*(n-1))/2*n

// 由于不知道n具体为几项，则通过循环获取，其中若要n最大时，可考虑首项为1
// 即可得到sum >= (1+(1+(n-1)))*n/2
// 推导出sum >= n*(n+1)/2 可得出 n*(n+1)<=2*sum

function getSum(n) {
  let startNum = 0;
  let count = 1;
  console.log(n + "=" + n);
  // 此处变量设置n为要表示的整数，i为项数，根据题目要求可知i最小为两项
  for (let i = 2; i * (i + 1) <= 2 * n; i++) {
    // 若除数为零说明此时的项数i可求得满足条件的首项
    if ((2 * n - i * (i - 1)) % (2 * i) == 0) {
      startNum = (2 * n - i * (i - 1)) / (2 * i);
      if (startNum > 0) {
        let sb = "";
        for (let j = 0; j < i; j++) {
          sb += startNum + "+";
          startNum++;
        }
        sb = sb.substring(0, sb.length - 1);
        console.log(n + "=" + sb);
        count++;
      }
    }
  }
  console.log(`result:${count}`);
}
getSum(9);

// 打印结果：
// 9=9
// 9=4+5
// 9=2+3+4
// result:3

var consecutiveNumSum = function (T) {
  let sqrt = parseInt(Math.sqrt(T * 2));
  let count = 0;
  let sum = 0;

  for (let i = 1; i <= sqrt; i++) {
    sum = (i * (i - 1)) / 2;
    if ((T - sum) % i === 0) {
      let startSum = (2 * T - i * (i - 1)) / (2 * i); // 首项
      let res = "";
      for (let j = 0; j < i; j++) {
        // 求公式
        res += startSum++ + "+";
      }
      console.log(`${T}=${res.substring(0, res.length - 1)}`);
      count++;
    }
  }
  console.log(`Result:${count}`);
};

consecutiveNumSum(9);
consecutiveNumSum(10);

/**
 java

 
import java.util.Scanner;
import java.util.Stack;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        while (scanner.hasNext()) {
            int taget = scanner.nextInt();
            findAllResult(taget);
        }
//        findAllResult(10);
    }

    private static void findAllResult(int t){
        //存放结果
        Stack<String> res = new Stack<>();
        int count = 0;
        //以i结尾的表达式
        for (int i = 1; i <=t; i++) {
            int tempR=t;
            int p = i;
            StringBuilder sb = new StringBuilder();
            sb.append(t).append("=");
            while (p<=t && tempR>0) {
                tempR-=p;
                sb.append(p).append(tempR==0 ? "" : "+");
                p++;
            }
            if (tempR==0) {
                count++;
                res.push(sb.toString());
            }
        }
        while (!res.isEmpty()) {
            System.out.println(res.pop());
        }
        System.out.println("Result:"+count);
    }
}
 */
