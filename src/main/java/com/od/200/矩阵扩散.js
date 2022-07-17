/**
矩阵扩散
存在一个m*n的二维数组，其成员取值范围为0或1。其中值为1的成员具备扩散性，每经过1S，将上下左右值为0的成员同化为1。二维数组的成员初始值都为0，将第[i,j]和[k,l]两个个位置上元素修改成1后，求矩阵的所有元素变为1需要多长时间。

输入描述:
输出数据中的前2个数字表示这是一个m*n的矩阵，m和n不会超过1024大小；中间两个数字表示一个初始扩散点位置为i,j；最后2个数字表示另一个扩散点位置为k,l。

输出描述:
输出矩阵的所有元素变为1所需要秒数。

示例1：
输入
4,4,0,0,3,3
输出
3

说明
输出数据中的前2个数字表示这是一个4*4的矩阵；中间两个数字表示一个初始扩散点位置为0,0；最后2个数字表示另一个扩散点位置为3,3。
给出的样例是一个很简单模型，初始点在对角线上，达到中间的位置分别为3次迭代，即3秒。所以输出为3。


/** 
题目：
* 存在一个m*n的二维数组，其成员取值范围为0或1。其中值为1的成员具备扩散性，
* 每经过1S，将上下左右值为0的成员同化为1。
* 二维数组的成员初始值都为0，将第[i,j]和[k,l]两个位置上元素修改成1后，求矩阵的所有元素变为1需要多长时间。
*
* 输入描述：
* 前两个数是矩阵m*n，中间两个数是第一个点的坐标，最后两个数是第二个点的坐标
* 其中这两个点初始为1，其他点初始为0
*
* 输出描述:
* 输出矩阵的所有元素变为1所需要秒数。
*/

function calcSecond(arr) {
  let used = 0;
  while (checkHasZero(arr)) {
    let arrTemp = new Array(m1).fill("").map(() => new Array(n1).fill(0)); //new int[m1][n1];
    for (let i = 0; i < m1; i++) {
      for (let j = 0; j < n1; j++) {
        if (arr[i][j] == 1) {
          arrTemp[i][j] = 1;
          if (i - 1 >= 0) {
            arrTemp[i - 1][j] = 1;
          }
          if (i + 1 < m1) {
            arrTemp[i + 1][j] = 1;
          }
          if (j - 1 >= 0) {
            arrTemp[i][j - 1] = 1;
          }
          if (j + 1 < n1) {
            arrTemp[i][j + 1] = 1;
          }
        }
      }
    }
    arr = arrTemp;
    used++;
  }
  return used;
}

function checkHasZero(arr) {
  for (let i = 0; i < m1; i++) {
    for (let j = 0; j < n1; j++) {
      if (arr[i][j] == 0) {
        return true;
      }
    }
  }
  return false;
}

let split = readline().trim().split(",");
let m1 = parseInt(split[0]);
let n1 = parseInt(split[1]);
let arr = new Array(m1).fill("").map(() => new Array(n1).fill(0));
let x1 = parseInt(split[2]);
let y1 = parseInt(split[3]);
let x2 = parseInt(split[4]);
let y2 = parseInt(split[5]);
arr[x1][y1] = 1;
arr[x2][y2] = 1;
console.log(calcSecond(arr));

/**
 public class MatrixDiffusion {
    public static void main(String[] args) {
        int[] input = new int[]{4, 4, 0, 0, 3, 3};

        int result = getTime(input);

        System.out.println(result);
    }

  
    // 思路：模拟扩散，暴力破解
    
    private static int getTime(int[] input) {
        int xMax = input[0];
        int yMax = input[1];

        int xA = input[2];
        int yA = input[3];

        int xB = input[4];
        int yB = input[5];

        int[][] matrix = new int[xMax][yMax];

        // 初始化
        for (int x =0; x < xMax; x++) {
            for (int y = 0; y < yMax; y++) {
                matrix[x][y] = 0;

                // 把初始的两个点改成1
                if (x == xA && y == yA || x == xB && y == yB) {
                    matrix[x][y] = 1;
                }
            }
        }

        // 是否继续扩散
        boolean needContinue = true;
        // 扩散次数
        int count = 0;
        // 模拟扩散
        while (needContinue) {
            // 每次扩散前假设这次扩散后就结束了
            needContinue = false;
            // 本次操作是否真实的扩散了
            boolean curDid = false;

            // 先扩散成2（因为本次信扩散的点不能扩散）
            for (int x =0; x < xMax; x++) {
                for (int y = 0; y < yMax; y++) {
                    if (matrix[x][y] == 1) {
                        int topX = x - 1;
                        int topY = y;
                        if (topX >= 0 && topX < xMax && matrix[topX][topY] == 0) {
                            matrix[topX][topY] = 2;
                            curDid = true;
                        }

                        int leftX = x;
                        int leftY = y - 1;
                        if (leftY >= 0 && leftY < yMax && matrix[leftX][leftY] == 0) {
                            matrix[leftX][leftY] = 2;
                            curDid = true;
                        }

                        int belowX = x + 1;
                        int belowY = y;
                        if (belowX >= 0 && belowX < xMax && matrix[belowX][belowY] == 0) {
                            matrix[belowX][belowY] = 2;
                            curDid = true;
                        }

                        int rightX = x;
                        int rightY = y + 1;
                        if (rightY >= 0 && rightY < yMax && matrix[rightX][rightY] == 0) {
                            matrix[rightX][rightY] = 2;
                            curDid = true;
                        }
                    }
                }
            }

            // 本次扩散了就将扩散次数加一
            if (curDid) {
                count++;
            }

            // 善后：把2修改成1，让下一次正常扩散，并且判断需不需要进一步扩散
            for (int x =0; x < xMax; x++) {
                for (int y = 0; y < yMax; y++) {
                    if (matrix[x][y] == 2) {
                        matrix[x][y] = 1;
                    }

                    // 还有0的就继续扩散
                    if (matrix[x][y] == 0) {
                        needContinue = true;
                    }

                    // 输出扩散的中间结果
                    System.out.print(matrix[x][y] + " ");
                }
                // 输出扩散的中间结果
                System.out.println();
            }

            // 输出扩散的中间结果
            System.out.println("\n");
        }

        return count;
    }
}

// 解法二
import java.util.Scanner;

public class Main {
    private static int m1;
    private static int n1;

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] split = sc.nextLine().split(",");
        m1 = Integer.parseInt(split[0]);
        n1 = Integer.parseInt(split[1]);
        int[][] arr = new int[m1][n1];
        int x1 = Integer.parseInt(split[2]);
        int y1 = Integer.parseInt(split[3]);
        int x2 = Integer.parseInt(split[4]);
        int y2 = Integer.parseInt(split[5]);
        arr[x1][y1] = 1;
        arr[x2][y2] = 1;
        System.out.println(calcSecond(arr));
    }

    private static int calcSecond(int[][] arr) {
        int used = 0;
        while (checkHasZero(arr)) {
            int[][] arrTemp = new int[m1][n1];
            for (int i = 0; i < m1; i++) {
                for (int j = 0; j < n1; j++) {
                    if (arr[i][j] == 1) {
                        arrTemp[i][j] = 1;
                        if (i - 1 >= 0) {
                            arrTemp[i - 1][j] = 1;
                        }
                        if (i + 1 < m1) {
                            arrTemp[i + 1][j] = 1;
                        }
                        if (j - 1 >= 0) {
                            arrTemp[i][j - 1] = 1;
                        }
                        if (j + 1 < n1) {
                            arrTemp[i][j + 1] = 1;
                        }
                    }
                }
            }
            arr = arrTemp;
            used++;
        }
        return used;
    }

    private static boolean checkHasZero(int[][] arr) {
        for (int i = 0; i < m1; i++) {
            for (int j = 0; j < n1; j++) {
                if (arr[i][j] == 0) {
                    return true;
                }
            }
        }
        return false;
    }
}
*/
