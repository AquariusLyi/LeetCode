/**
 最长方连续方波信号

 标题：最长方连续方波信号 | 时间限制：1秒 | 内存限制：262144K | 语言限制：不限
输入一串方波信号，求取最长的完全连续交替方波信号，并将其输出，如果有相同长度的交替方波信号，输出任一即可，方波信号高位用1标识，低位用0标识，如图：
(图像)
说明：
1） 一个完整的信号一定以0开始然后以0结尾，即010是一个完整信号，但101，1010，0101不是
2）输入的一串方波信号是由一个或多个完整信号组成
3） 两个相邻信号之间可能有0个或多个低位，如0110010，011000010
4） 同一个信号中可以有连续的高位，如01110101011110001010，前14位是一个具有连续高位的信号
5） 完全连续交替方波是指10交替，如01010是完全连续交替方波，0110不是


输入描述:
输入信号字符串（长度>=3且<=1024）：
0010101010110000101000010
注：输入总是合法的，不用考虑异常情况
输出描述:
输出最长的完全连续交替方波信号串：
01010
若不存在完全连续交替方波信号串，输出 -1

示例1
输入
00101010101100001010010
输出
01010
备注:
输入信号串中有三个信号：0 010101010110(第一个信号段) 00 01010(第二个信号段) 010(第三个信号段)
第一个信号虽然有交替的方波信号段，但出现了11部分的连续高位，不算完全连续交替方波，在剩下的连续方波信号串中01010最长
 */

function fangbo() {
  let str = readline().trim();
  let res = "";
  let temp = "";
  let bool = false;
  let flag = true;
  if (str.charAt(0) == "0") {
    //如果第一个为0，则从第一个开始识别
    temp = "0";
    bool = true;
  }

  for (let i = 1; i < str.length; i++) {
    if (bool) {
      //识别中
      if (str.charAt(i) == str.charAt(i - 1)) {
        //此时的数等于前一个数
        if (str.charAt(i) == "0") {
          //出现重复的0则出局
          if (temp.length >= 3 && flag) {
            //如果都是0，且符合规则（不含连续1大于3个长度）
            res = temp.length > res.length ? temp : res; //取最长信号
          }
          temp = "0"; //容器重置
          flag = true;
        } else {
          temp += str.charAt(i); //出现重复的1继续，不过已不符合要求（不含连续的1）
          flag = false;
        }
      } else {
        temp += str.charAt(i); //无重复的值则继续
      }
    } else {
      if (str.charAt(i) == "0") {
        //遇到0就开始识别
        temp = "0";
        bool = true;
      }
    }
  }
  console.log(res);
}
fangbo();

/**
 java
 

 public class Main{
 
    public static void main(String[] args) {
 
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
 
        String res = "";
        String temp = "";
        boolean bool = false;
        boolean isFomat = true;
        if(s.charAt(0)=='0'){       //如果第一个为0，则从第一个开始识别
            temp ="0";
            bool = true;
        }
 
        for(int i=1;i<s.length();i++){
            if(bool){      //识别中
                if(s.charAt(i)==s.charAt(i-1)){     //此时的数等于前一个数
                    if(s.charAt(i)=='0'){       //出现重复的0则出局
                        if(temp.length()>=3 && isFomat){        //如果都是0，且符合规则（不含连续1大于3个长度）
                            res = temp.length()>res.length()?temp:res;      //取最长信号
                        }
                        temp = "0";     //容器重置
                        isFomat = true;
                    }else {
                        temp+=s.charAt(i);      //出现重复的1继续，不过已不符合要求（不含连续的1）
                        isFomat = false;
                    }
                }else {
                    temp+=s.charAt(i);      //无重复的值则继续
                }
            } else {
                if(s.charAt(i)=='0'){   //遇到0就开始识别
                    temp = "0";
                    bool = true;
                }
            }
        }
        System.out.println(res);
    }
 
}
 */

/**
 java 

 解法一
备注:
输入信号串中有三个信号：0 010101010110(第一个信号段) 00 01010(第二个信号段) 010(第三个信号段)
第一个信号虽然有交替的方波信号段，但出现了11部分的连续高位，不算完全连续交替方波，在剩下的连续方波信号串中01010最长。


 import java.util.Scanner;

public class ElectricalSignal {
    private static int maxLength = Integer.MIN_VALUE;
    private static String res;

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine();
        if (input.contains("00")) {
            String[] split = input.split("00");
            for (int i = 0; i < split.length; i++) {
                String temp = split[i];
                if (i == 0) {
                    check(temp + "0");
                } else if (i == split.length - 1) {
                    check("0" + temp);
                } else {
                    check("0" + temp + "0");
                }
            }
        } else {
            check(input);
        }
        if (maxLength == Integer.MIN_VALUE) {
            System.out.println(-1);
        } else {
            System.out.println(res);
        }
    }

    private static void check(String str) {
        char[] chars = str.toCharArray();
        boolean start = false;
        int startIdx = 0;
        int endIdx = -1;
        char pre = '1';
        for (int i = 0; i < chars.length; i++) {
            if (!start && i + 1 < chars.length && chars[i] == '0' && chars[i + 1] == '1') {
                start = true;
                startIdx = i;
                pre = '0';
                continue;
            }
            if (pre != chars[i]) {
                pre = chars[i];
            } else if (pre == '1' && chars[i] == '1') {
                return;
            } else {
                endIdx = i;
                break;
            }
        }
        if (endIdx == -1) {
            if (str.length() - startIdx > maxLength) {
                maxLength = str.length() - startIdx;
                res = str.substring(startIdx);
            }
        } else {
            if (endIdx - startIdx > maxLength) {
                maxLength = endIdx - startIdx;
                res = str.substring(startIdx, endIdx);
            }
        }
    }
}

// 解法二

import java.util.*;

public class ElectricalSignal {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();

        String res = "";
        StringBuilder temp = new StringBuilder();
        boolean bool = false;
        boolean isFomat = true;
        if (s.charAt(0) == '0') {      
            temp = new StringBuilder("0");
            bool = true;
        }

        for (int i = 1; i < s.length(); i++) {
            if (bool) {      
                if (s.charAt(i) == s.charAt(i - 1)) {     
                    if (s.charAt(i) == '0') {       
                        if (temp.length() >= 3 && isFomat) {        
                            res = temp.length() > res.length() ? temp.toString() : res;      
                        }
                        temp = new StringBuilder("0");     
                        isFomat = true;
                    } else {
                        temp.append(s.charAt(i));     
                        isFomat = false;
                    }
                } else {
                    temp.append(s.charAt(i));      
                }
            } else {
                if (s.charAt(i) == '0') {   
                    temp = new StringBuilder("0");
                    bool = true;
                }
            }
        }
        System.out.println(res);
    }
}
 */
