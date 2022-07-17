/**
 最大矩阵和
给定一个二维整数矩阵，要在这个矩阵中选出一个子矩阵，使得这个子矩阵内所有的数字和尽量大，我们把这个子矩阵称为和最大子矩阵，子矩阵的选取原则是原矩阵中一块相互连续的矩形区域。

输入描述:
输入的第一行包含2个整数n, m(1 <= n, m <= 10)，表示一个n行m列的矩阵，下面有n行，每行有m个整数，同一行中，每2个数字之间有1个空格，最后一个数字后面没有空格，所有的数字的在[-1000, 1000]之间。
输出描述:
输出一行一个数字，表示选出的和最大子矩阵内所有的数字和。

示例1
输入
3 4
-3 5 -1 5
2 4 -2 4
-1 3 -1 3
输出
20
说明
一个3*4的矩阵中，后面3列的子矩阵求和加起来等于20，和最大。

 */
demo();
function demo() {
  let n = Number(readline()); //行
  let m = Number(readline()); //列
  //let n = Number("3");   //行
  //let m = Number("4");   //列

  //let test = ["-3,5,-1,5","2,4,-2,4","-1,3,-1,3"];

  let ints = [];

  for (let i = 0; i < n; i++) {
    let input = readline()
      .trim()
      .split(",")
      .map((i) => parseInt(i));
    // let input = test[i].split(",").map((i) => parseInt(i));
    let hang = [];
    for (let j = 0; j < m; j++) {
      hang[j] = input[j];
    }
    ints[i] = hang;
  }

  let max = 0;
  for (let start_row = 0; start_row < n; start_row++) {
    //开始行
    for (let start_col = 0; start_col < m; start_col++) {
      //开始列
      for (let end_row = start_row; end_row < n; end_row++) {
        //结束行
        let jisuan = 0; //矩阵和
        for (let end_col = start_col; end_col < m; end_col++) {
          //结束列
          let rowindex = end_row; //将结束行作为边界
          while (rowindex >= start_row) {
            //最后一行不能超过开始行
            jisuan += ints[rowindex][end_col]; //从结束行向上遍历到开始行
            rowindex--;
          }
          max = Math.max(max, jisuan);
        }
      }
    }
  }

  console.log(max);
}

/**
 
import java.util.Scanner;

public class Main {
    public static void main (String[] args) {
        Scanner sc = new Scanner(System.in);
        while (sc.hasNext()) {
            String[] str = sc.nextLine().split(" ");
            int n = Integer.parseInt(str[0]);
            int m = Integer.parseInt(str[1]);
            int[][] map = new int[n][m];
            long result = Long.MIN_VALUE;
            for (int i = 0; i < n; i++) {
                String[] item = sc.nextLine().split(" ");
                for (int j = 0; j < m; j++) {
                    map[i][j] = Integer.parseInt(item[j]);
                }
            }
            for (int start = 0; start < n; start++) {
                long[] ring = new long[m];
                long[] dp = new long[m];
                for (int end = start; end < n; end++) {
                    for (int j = 0; j < m; j++) {
                        ring[j] += map[end][j];
                    }
                    result = Math.max(result, ring[0]);
                    dp[0] = ring[0];
                    for (int j = 1; j < m; j++) {
                        if (dp[j - 1] < 0) {
                            dp[j] = ring[j];
                        } else {
                            dp[j] = dp[j - 1] + ring[j];
                        }
                        result = Math.max(result, dp[j]);
                    }
                }
            }
            System.out.println(result);
        }
    }
}
 */
