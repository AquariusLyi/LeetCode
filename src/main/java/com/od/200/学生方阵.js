/**
【学生方阵】

学校组织活动，将学生排成一个矩形方阵。
请在矩形方阵中找到最大的位置相连的男生数量。
这个相连位置在一个直线上，方向可以是水平的，垂直的，成对角线的或者呈反对角线的。
注：学生个数不会超过10000
输入描述

输入的第一行为矩阵的行数和列数，接下来的n行为矩阵元素，元素间用”,”分隔。
输出描述

输出一个整数，表示矩阵中最长的位置相连的男生个数。
示例1  输入输出示例仅供调试，后台判题数据一般不包含示例

输入
3,4
F,M,M,F
F,M,M,F
F,F,F,M

输出
3
 */

function studentFZ() {
  let [row, col] = readline().trim().split(",").map(Number);
  let str = [];
  let list = []; //用来存放所有位置相连男生个数
  for (let i = 0; i < row; i++) {
    //将矩形方阵模拟为二维数组
    let rowStrs = readline().split(",");
    str[i] = [];
    for (let j = 0; j < col; j++) {
      str[i][j] = rowStrs[j];
    }
  }

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (str[i][j] == "M") getRes(i, j);
    }
  }

  list.sort(); //对集合进行升序，取最后一个

  console.log(list[list.length - 1]);

  /**
   *
   * @param x 横坐标
   * @param y 纵坐标
   */
  function getRes(x, y) {
    let n = 1;
    let a, b;

    if (y < col) {
      //从此点水平向右
      a = x;
      b = y;
      while (b < col - 1 && str[a][++b] == "M") {
        n++;
      }
      list.push(n);
      n = 1;
    }
    if (x < row) {
      //从此点垂直向下
      a = x;
      b = y;
      while (a < row - 1 && str[++a][b] == "M") {
        n++;
      }
      list.push(n);
      n = 1;
    }
    if (x < row && y < col) {
      //从此点对角线
      a = x;
      b = y;
      while (a < row - 1 && b < col - 1 && str[++a][++b] == "M") {
        n++;
      }
      list.push(n);
      n = 1;
    }
    if (x >= 0 && y < col) {
      //从此点反对角线
      a = x;
      b = y;
      while (a > 0 && b < col - 1 && str[--a][++b] == "M") {
        n++;
      }
      list.push(n);
    }
  }
}

studentFZ();

/**
 
java

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Scanner;

public class Main {

    public static int row;
    public static int col;
    public static String[][] str;
    public static List<Integer> list = new ArrayList<>();   //用来存放所有位置相连男生个数

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        String[] strings = sc.nextLine().split(",");
        row = Integer.parseInt(strings[0]);  //行
        col = Integer.parseInt(strings[1]);  //列

        str = new String[row][col];

        for (int i = 0; i < row; i++) { //将矩形方阵模拟为二维数组
            String[] rowStrs = sc.nextLine().split(",");
            if (col >= 0) System.arraycopy(rowStrs, 0, str[i], 0, col);
        }

        for (int i = 0; i < row; i++) {
            for (int j = 0; j < col; j++) {
                if (str[i][j].equals("M")) getRes(i, j);
            }
        }

        Collections.sort(list); //对集合进行升序，取最后一个

        System.out.println(list.get(list.size() - 1));

    }

  
      x 横坐标
      y 纵坐标
     public static void getRes(int x, int y) {

        int n = 1;
        int a, b;

        if (y < col) { //从此点水平向右
            a = x;
            b = y;
            while (b < col - 1 && str[a][++b].equals("M")) {
                n++;
            }
            list.add(n);
            n = 1;
        }
        if (x < row) { //从此点垂直向下
            a = x;
            b = y;
            while (a < row - 1 && str[++a][b].equals("M")) {
                n++;
            }
            list.add(n);
            n = 1;
        }
        if (x < row && y < col) { //从此点对角线
            a = x;
            b = y;
            while ((a < row - 1 && b < col - 1) && str[++a][++b].equals("M")) {
                n++;
            }
            list.add(n);
            n = 1;
        }
        if (x >= 0 && y < col) { //从此点反对角线
            a = x;
            b = y;
            while ((a > 0 && b < col - 1) && str[--a][++b].equals("M")) {
                n++;
            }
            list.add(n);
        }
    }
}
 */
