/**
 转骰子

 标题：转骰子 | 时间限制：1秒 | 内存限制：262144K | 语言限制：不限
骰子是一个立方体，每个面一个数字，初始为左1，右2，前3（观察者方向），后4，上5，下6，用123456表示这个状态，放置到平面上，可以向左翻转（用L表示向左翻转1次），可以向右翻转（用R表示向右翻转1次），可以向前翻转（用F表示向前翻转1次），可以向后翻转（用B表示向后翻转1次），可以逆时针旋转（用A表示逆时针旋转90度），可以顺时针旋转（用C表示顺时针旋转90度），现从123456这个初始状态开始，根据输入的动作序列，计算得到最终的状态。
骰子的初始状态和初始状态转动后的状态如图所示

输入描述:
输入一行，为只包含LRFBAC的字母序列，最大长度50，字母可重复
输出描述:
输出最终状态

示例1
输入
LR
输出
123456

说明
骰子先向左翻转，再向右翻转回来，故还是原来的状态123456
示例2
输入
FCR
输出
342156
说明
骰子向前翻转，状态变为125643，再顺时针旋转，状态变为651243，最后向右翻转，状态变为342156

解题思路
将转向各个方向的排序列出，然后对输入值进行遍历，求出骰子最终状态


 */

main("LR");
main("FCR");

function main(args) {
  let input = args.trim();
  let res = "123456"; //骰子的初始状态
  for (let i = 0; i < input.length; i++) {
    res = zhuanSZ(input.charAt(i), res);
  }
  console.log(res);
}

function zhuanSZ(s, sz) {
  /**
   * 需要将char转成sting，否则会变成ASCII码值的和
   */
  let s1 = sz.charAt(0);
  let s2 = sz.charAt(1);
  let s3 = sz.charAt(2);
  let s4 = sz.charAt(3);
  let s5 = sz.charAt(4);
  let s6 = sz.charAt(5);

  /**
   * 骰子转向各个方向的重新排序
   */
  switch (s) {
    case "L":
      return s5 + s6 + s3 + s4 + s2 + s1;
    case "R":
      return s6 + s5 + s3 + s4 + s1 + s2;
    case "F":
      return s1 + s2 + s5 + s6 + s4 + s3;
    case "B":
      return s1 + s2 + s6 + s5 + s3 + s4;
    case "A":
      return s4 + s3 + s1 + s2 + s5 + s6;
    case "C":
      return s3 + s4 + s2 + s1 + s5 + s6;
  }
  return "";
}

/**
 java
 public class Main{
 
    public static void main(String[] args) {
 
        Scanner sc = new Scanner(System.in);
 
        String s = sc.nextLine();
 
        String res = "123456";  //骰子的初始状态
 
        for(int i=0;i<s.length();i++){
            res = zhuanSZ(String.valueOf(s.charAt(i)),res);
        }
 
        System.out.println(res);
    }
 
    public static String zhuanSZ(String s,String sz){
 
  
        // 需要将char转成sting，否则会变成ASCII码值的和
       
         String s1 = String.valueOf(sz.charAt(0));
         String s2 = String.valueOf(sz.charAt(1));
         String s3 = String.valueOf(sz.charAt(2));
         String s4 = String.valueOf(sz.charAt(3));
         String s5 = String.valueOf(sz.charAt(4));
         String s6 = String.valueOf(sz.charAt(5));
  
 
         // 骰子转向各个方向的重新排序
      
         switch (s){
             case "L":
                 return s5+s6+s3+s4+s2+s1;
             case "R":
                 return s6+s5+s3+s4+s1+s2;
             case "F":
                 return s1+s2+s5+s6+s4+s3;
             case "B":
                 return s1+s2+s6+s5+s3+s4;
             case "A":
                 return s4+s3+s1+s2+s5+s6;
             case "C":
                 return s3+s4+s2+s1+s5+s6;
         }
         return "";
     }
 }
//  解法二

import java.util.Scanner;

public class ShaiZi {
    public static void main(String[] args) {
        final Scanner sc = new Scanner(System.in);
        final String s = sc.nextLine();
        int[] status = new int[]{1, 2, 3, 4, 5, 6};
        for (int i = 0; i < s.length(); i++) {
            switch (s.charAt(i)) {
                case 'L' -> {
                    int t = status[0];
                    status[0] = status[4];
                    status[4] = status[1];
                    status[1] = status[5];
                    status[5] = t;
                }
                case 'R' -> {
                    int tm = status[5];
                    status[5] = status[1];
                    status[1] = status[4];
                    status[4] = status[0];
                    status[0] = tm;
                }
                case 'F' -> {
                    int m = status[2];
                    status[2] = status[4];
                    status[4] = status[3];
                    status[3] = status[5];
                    status[5] = m;
                }
                case 'B' -> {
                    int mt = status[5];
                    status[5] = status[3];
                    status[3] = status[4];
                    status[4] = status[2];
                    status[2] = mt;
                }
                case 'A' -> {
                    int a = status[0];
                    status[0] = status[3];
                    status[3] = status[1];
                    status[1] = status[2];
                    status[2] = a;
                }
                case 'C' -> {
                    int c = status[2];
                    status[2] = status[1];
                    status[1] = status[3];
                    status[3] = status[0];
                    status[0] = c;
                }
            }
        }
        for (int i : status) {
            System.out.print(i);
        }
    }
}
 */
