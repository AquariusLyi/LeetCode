/**
 计算最大乘积
无重复字符的元素长度乘积的最大值

 两个没有相同字符的元素长度乘积的最大值
 
给定一个元素类型为小写字符串的数组，请计算两个没有相同字符的元素 长度乘积的最大值，如果没有符合条件的两个元素，返回0。

输入描述:
输入为一个半角逗号分隔的小写字符串的数组，2 <= 数组长度<=100，0 < 字符串长度<= 50。
输出描述:
两个没有相同字符的元素 长度乘积的最大值。

示例1
输入
iwdvpbn,hk,iuop,iikd,kadgpf
输出
14

说明
数组中有5个元素。
iwdvpbn与hk无相同的字符，满足条件，iwdvpbn的长度为7，hk的长度为2，乘积为14（7*2）。
iwdvpbn与iuop、iikd、kadgpf均有相同的字符，不满足条件。
iuop与iikd、kadgpf均有相同的字符，不满足条件。
iikd与kadgpf有相同的字符，不满足条件。
因此，输出为14。


 */
function niuke() {
  let str = readline().trim().split(",");
  let max = 0;
  for (let i = 0; i < str.length; i++) {
    for (let j = i; j < str.length; j++) {
      let cur = str[j];
      let k = 0;
      while (k < cur.length) {
        if (str[i].includes(cur[k])) {
          break;
        }
        k++;
      }
      let temp = str[i].length * str[j].length;
      if (k == cur.length && temp > max) max = temp;
    }
  }
  console.log(max);
}
niuke();
/**
 java


import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int maxValue = -1;
        String a = in.nextLine();
        if(a == null) {
            System.out.println(0);
        }
        String[] array = a.split(",");
        if(array.length == 1){
            System.out.println(0);
        }
        for(int i = 0; i< array.length; i++) {
            for(int j = i+1; j< array.length; j++) {
                if(equals(array[i], array[j])){
                    int a1 = array[i].length();
                    int b = array[j].length();
                    maxValue = Math.max(maxValue, a1*b);
                }
            }
        }
        System.out.println(maxValue == -1? 0 : maxValue);

    }
    public static boolean equals(String a, String b) {
        for(int i = 0; i< a.length(); i++) {
            for(int j = 0; j< b.length(); j++) {
                if(a.charAt(i) == b.charAt(j)){
                    return false;
                }
            }
        }
        return true;
    }
}

// 解法二

import java.util.Scanner;

public class LongestSubstring {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        String[] words = in.nextLine().split(",");
        int maxLength = 0;
        for (int i = 0; i < words.length - 1; i++) {
            for (int j = i + 1; j < words.length; j++) {
                char[] word1 = words[i].toCharArray();
                char[] word2 = words[j].toCharArray();
                boolean flag = true;
                for (int m = 0; m < word1.length; m++) {
                    for (int n = 0; n < word2.length; n++) {
                        if (word1[m] == word2[n]) {
                            flag = false;
                            break;
                        }
                    }
                }
                if (flag) {  // 两个字符串不相等
                    int Length = word1.length * word2.length;
                    maxLength = Math.max(maxLength, Length);
                }
            }
        }
        System.out.println(maxLength);
    }
}

 */
