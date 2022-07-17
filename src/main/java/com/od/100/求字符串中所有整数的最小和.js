/**

输入字符串s，输出s中包含所有整数的最小和。

说明

字符串s，只包含 a-z A-Z ± ；
合法的整数包括

1） 正整数 一个或者多个0-9组成，如 0 2 3 002 102
2）负整数 负号 – 开头，数字部分由一个或者多个0-9组成，如 -0 -012 -23 -00023

输入描述

包含数字的字符串

输出描述

所有整数的最小和

示例1  输入输出示例仅供调试，后台判题数据一般不包含示例

输入

bb1234aa

输出

10

示例2  输入输出示例仅供调试，后台判题数据一般不包含示例

输入

bb12-34aa

输出

-31

说明

1+2+（-34） = 31
 */

// bb12-34aa
// -31
function getMinSum() {
  var str = readline().trim();
  var arr = [];
  for (let i = 0; i < str.length; i++) {
    if (/([0-9]|-)+/.test(str[i])) {
      arr.push(str[i]);
    }
  }
  let sum = 0;
  let flag = false; // 如果是负数就放到一个string里面  concat 处理
  let noStr = "";
  // 没有符号就显示全是正数，这样每一个相加最小
  // if (!arr.includes("-")) {
  //   sum = arr.reduce((a, b) => Number(a) + Number(b), 0);
  // } else {
  // console.log(arr);
  // 有负数，就需要判断负数在一起最少，这样使用一个中间变量存储，所有的负数，这样可以得到最小的负数
  for (let i = 0; i < arr.length; i++) {
    let current = arr[i];
    // console.log(current, "current");
    if (current >= 0 && current <= 9) {
      if (flag) {
        noStr = noStr.concat(current);
        // console.log(noStr, "==");
      } else {
        sum += Number(current);
      }
    } else if (current == "-") {
      if (noStr.length) {
        sum -= Number(noStr);
        noStr = "";
      }
      flag = true;
    } else {
      // 其他符号的场景 需要考虑
      flag = false;
      if (noStr.length) {
        sum -= Number(noStr);
        noStr = "";
      }
    }
  }
  if (noStr.length) {
    sum -= Number(noStr);
    noStr = "";
  }
  console.log(sum);
}
getMinSum();

/**
 java

 public class Main{
 
    public static void main(String[] args) {
 
        Scanner sc = new Scanner(System.in);
 
        String s = sc.nextLine();
        int len = s.length();
        List<Integer> list = new ArrayList<>();
        String temp = "";
        boolean isFuhao = false;
 
        for(int i=0;i<len;i++){
            char c = s.charAt(i);
            if(Character.isDigit(c)){
                if(isFuhao){
                    temp+=c;    //有负号的情况下数字越大越好，直接拼接
                }else {
                    list.add(Integer.valueOf(String.valueOf(c)));   //没有负号直接加入集合
                }
            }else if(c=='-'){
                if(temp!="" && temp!="-"){    //temp中有值且不是一个“-”单字符串的情况下
                    list.add(Integer.valueOf(temp));
                }
                isFuhao = true; //说明下一个字符串有了负号
                temp = "-";
            }else {
                 // 字母和“+”的情况下进入
                 if(temp!="" && temp!="-"){
                  list.add(Integer.valueOf(temp));
              }
              temp = "";  //无论之前是什么，都需要置空
              isFuhao = false;
          }
      }
      int res = 0;
      for (int i:list
           ) {
          res+=i;
      }
      System.out.println(res);
  }
}
// 解法二

import java.util.Scanner;
public class Main {
  public static void main(String[] args) {
    Scanner in = new Scanner(System.in);
    String line = in.nextLine();
    in.close();

    char[] chars = line.toCharArray();
    int sum = 0;

    for (int i = 0; i < chars.length; i++) {
      char c = chars[i];
      if (c == '-') {
        i++;
        int start = i;
        while (i < chars.length && Character.isDigit(chars[i])) {
          i++;
        }
        String substring = line.substring(start, i);
        if (substring.length() > 0) {
          sum -= Integer.parseInt(substring);
        }
        i--;
        continue;
      }

      if (Character.isDigit(c)) {
        sum += Character.digit(c, 10);
      }
    }

    System.out.println(sum);

  }
}


 */
