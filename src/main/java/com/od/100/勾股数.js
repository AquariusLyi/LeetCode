/**
 勾股数

 如果三个正整数A B C ,A²+B²=C²则为勾股数
如果ABC之间两两互质，即A与B A与C B与C均互质没有公约数，
则称其为勾股数元组。 请求出给定n m 范围内所有的勾股数元组

输入描述： 起始范围 1<n<10000 n<m<10000
输出描述：  abc 保证a<b<c  输出格式 a b c

多组勾股数元组 按照a升序b升序 c升序的排序方式输出。给定范围内，找不到勾股数元组时，输出 Na


案例
输入
1
20
输出
3 4 5
5 12 13
8 15 17


输入
5
10
输出
Na
 */

//勾股数
function getGouGu(str1, str2) {
  let n = parseInt(str1.trim());
  let m = parseInt(str2.trim());
  let count = 0;
  //暴力求解
  for (let a = n; a < m; a++) {
    for (let b = n + 1; b < m; b++) {
      for (let c = n + 2; c < m; c++) {
        if (
          Math.pow(a, 2) + Math.pow(b, 2) == Math.pow(c, 2) &&
          a < b &&
          b < c &&
          huZhi(a, b) == 1 &&
          huZhi(a, c) == 1 &&
          huZhi(b, c) == 1
        ) {
          console.log(a + " " + b + " " + c);
          count++;
        }
      }
    }
  }

  if (count == 0) {
    console.log("Na");
  }
}

//辅助函数,判断两个数是否互质
function huZhi(a, b) {
  if (a == 0 || b == 0) {
    return 1;
  } else if (a % b == 0) {
    return b;
  } else {
    return huZhi(b, a % b);
  }
}

getGouGu("1", "20");
getGouGu("5", "10");

/**
 java

 import java.util.Scanner;

public class Main0001 {
  public static void main(String[] args) {
    try (Scanner scanner = new Scanner(System.in)) {
      int n = scanner.nextInt();
      int m = scanner.nextInt();
      solution(n, m);
    }
  }

  private static void solution(int n, int m) {
    int count = 0;
    for (int a = n; a < m - 1; a++) {
      for (int b = a + 1; b < m; b++) {
        for (int c = b + 1; c < m + 1; c++) {
          if (relativelyPrime(a, b) &&
              relativelyPrime(b, c) &&
              relativelyPrime(a, c) &&
              a * a + b * b == c * c) {
            count++;
            System.out.printf("%d %d %d\n", a, b, c);
          }
        }
      }
    }
    if (count == 0) {
      System.out.println("Na");
    }
  }

  private static boolean relativelyPrime(int x, int y) {
    int min = Math.min(x, y);
    double sqrt = Math.sqrt(min);
    for (int i = 2; i < sqrt; i++) {
      if (x % i == 0 && y % i == 0) {
        return false;
      }
    }
    return true;
  }
}
 */
