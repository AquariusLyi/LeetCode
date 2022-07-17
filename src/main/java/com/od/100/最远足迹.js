/**
 
最远足迹
最远足迹】

某探险队负责对地下洞穴进行探险。探险队成员在进行探险任务时，随身携带的记录器会不定期地记录自身的坐标，但在记录的间隙中也会记录其他数据。探索工作结束后，探险队需要获取到某成员在探险过程中相对于探险队总部的最远的足迹位置。

仪器记录坐标时，坐标的数据格式为(x,y)，如(1,2)、(100,200)，其中0<x<1000，0<y<1000。同时存在非法坐标，如(01,1)、(1,01)，(0,100)属于非法坐标。
设定探险队总部的坐标为(0,0)，某位置相对总部的距离为：x*x+y*y。
若两个座标的相对总部的距离相同，则第一次到达的坐标为最远的足迹。
若记录仪中的坐标都不合法，输出总部坐标（0,0）。
备注：

不需要考虑双层括号嵌套的情况，比如sfsdfsd((1,2))。

输入描述

字符串，表示记录仪中的数据。

如：ferga13fdsf3(100,200)f2r3rfasf(300,400)

输出描述

字符串，表示最远足迹到达的坐标。

如： (300,400)

示例1 输入输出示例仅供调试，后台判题数据一般不包含示例

输入
ferg(3,10)a13fdsf3(3,4)f2r3rfasf(5,10)

输出
(5,10)

说明

记录仪中的合法坐标有3个： (3,10)， (3,4)， (5,10)，其中(5,10)是相距总部最远的坐标， 输出(5,10)。

示例2 输入输出示例仅供调试，后台判题数据一般不包含示例

输入
asfefaweawfaw(0,1)fe

输出
(0,0)

说明

记录仪中的坐标都不合法，输出总部坐标（0,0）。

 */

/**
 解题思路：
 
遍历字符串找出“(”、“)”的下标，然后将其坐标提取出来。
将符合要求的坐标放入列表中，找出其中最远距离，输出坐标。
 */

function zuiyuan() {
  let str = readline().trim();
  let right = 0;
  let left = 0;

  let arr = [];
  let list = [];

  for (let i = 0; i < str.length; i++) {
    if (str.charAt(i) == "(") {
      left = i + 1;
    } else if (str.charAt(i) == ")") {
      right = i;
    }
    if (right != 0) {
      let ss = str.substring(left, right).split(","); //利用小括号下标提取出坐标
      let j = parseInt(ss[0]);
      let w = parseInt(ss[1]);
      if (
        j > 0 &&
        j < 1000 &&
        w > 0 &&
        w < 1000 &&
        ss[0].charAt(0) != "0" &&
        ss[1].charAt(0) != "0"
      ) {
        arr.push(j);
        arr.push(w);
        list.push(arr);
        arr = [];
      }
      left = right = 0;
    }
  }

  if (list.length == 0) {
    console.log("(0,0)");
  } else {
    list.sort((a, b) => {
      //对坐标进行降序排序
      let ax = a[0] * a[0] + a[1] * a[1];
      let bx = b[0] * b[0] + b[1] * b[1];
      if (bx >= ax) {
        return 1;
      }
      return -1;
    });

    console.log("(" + list[0][0] + "," + list[0][1] + ")");
  }
}

/**
 java
 

解法

import java.util.ArrayList;
import java.util.Scanner;

public class maxDistance {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        String res = in.nextLine();
        char[] str = res.toCharArray();
        int max = 0;
        String ans = "(0,0)";  // 默认值，非法时的结果
        ArrayList<Integer> left = new ArrayList<>();
        ArrayList<Integer> right = new ArrayList<>();
        for (int i = 0; i < str.length; i++) {  // 统计左右括号的位置，不考虑嵌套，所以两个list一一对应
            if (str[i] == '(') {
                left.add(i);
            }
            if (str[i] == ')') {
                right.add(i);
            }
        }
        for (int i = 0; i < left.size(); i++) {
            String[] s = res.substring(left.get(i) + 1, right.get(i)).split(",");  // 记录两个坐标
            // 判断是否非法
            if (s[0].charAt(0) != '0' && s[1].charAt(0) != '0') {
                int num1 = Integer.parseInt(s[0]);
                int num2 = Integer.parseInt(s[1]);
                if (num1 < 1000 && num2 < 1000 && num1 * num1 + num2 * num2 > max) {
                    max = num1 * num1 + num2 * num2;
                    ans = "(" + s[0] + "," + s[1] + ")";
                }
            }
        }
        System.out.println(ans);
    }
}


答案：
解法一：

import java.util.*;

public class Main{
    public static void main(String[] args){

        Scanner sc = new Scanner(System.in);
        while (sc.hasNextLine()) {
            String str = sc.nextLine();
            int maxDistance = -1;
            String result = "";
            while (true) {
                if (str.length() == 0) {
                    break;
                }
                int leftIndex = str.indexOf("(");
                int rightIndex = str.indexOf(")");
                if (leftIndex == -1 || rightIndex == -1) {
                    break;
                }
                String ele = str.substring(leftIndex + 1, rightIndex);
                String[] es = ele.split(",");
                boolean flag = true;

                for (String s : es) {
                    if (s.startsWith("0")) {
                        flag = false;
                        break;
                    }
                    if (Integer.parseInt(s) <= 0 || Integer.parseInt(s) >= 1000){
                        flag = false;
                        break;
                    }
                }

                if (flag == false) {
                    str = str.substring(rightIndex + 1);
                    continue;
                }

                int number1 = Integer.parseInt(es[0]);
                int number2 = Integer.parseInt(es[1]);

                int distance = number1 * number1 + number2 * number2;
                if (distance > maxDistance) {
                    result = "(" + es[0] + "," + es[1] + ")";
                    maxDistance = distance;
                }
                str = str.substring(rightIndex + 1);
            }
            if (maxDistance == -1) {
                System.out.println("(0,0)");
            } else {
                System.out.println(result);
            } 
        }
    }
}
 */
