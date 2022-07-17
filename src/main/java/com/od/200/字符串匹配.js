/**
 【编程题目 |200分】字符串匹配【2021, 2022 H1 考试题】

时间限制：C/C++ 1秒，其他语言 2秒

空间限制：C/C++262144K，其他语言524288K

64bit IO Format：%lld

本题可使用本地IDE编码，不能使用本地已有代码，无跳出限制，

编码后请点击”保存并调试“按钮进行代码提交。

■ 题目描述

【字符串匹配】

给你一个字符串数组（每个字符串均由小写字母组成）和一个字符规律（由小写字母和.和*组成），识别数组中哪些字符串可以匹配到字符规律上。

‘.’ 匹配任意单个字符，’*’ 匹配零个或多个前面的那一个元素，所谓匹配，是要涵盖整个字符串的，而不是部分字符串。

输入描述

第一行为空格分割的多个字符串，1<单个字符串长度<100，0，1<字符串个数<100

第二行为字符规律，1<字符串个数<100

第二行为字符规律，1<=字符规律长度<=50

不需要考虑异常场景。

输出描述

匹配的字符串在数组中的下标（从0开始），多个匹配时下标升序并用,分割，若均不匹配输出-1

示例1 输入输出示例仅供调试，后台判题数据一般不包含示例

输入

ab aab
.*

输出

0,1

示例2 输入输出示例仅供调试，后台判题数据一般不包含示例

输入

ab abc bsd
.*

输出
0,1,2

示例3 输入输出示例仅供调试，后台判题数据一般不包含示例

输入

avd adb sss as
adb

输出
1
 */

function matchStr() {
  let arr = readline().trim().split(" ");
  let str = readline().trim();
  let res = "";
  for (let i = 0; i < arr.length; i++) {
    if (judge(str, arr[i])) {
      res = res.concat(i + ",");
    }
  }
  console.log(res.substring(0, res.length - 1));
}

function judge(str1, str2) {
  let i = 0;
  let j = 0;
  while (i < str1.length && j < str2.length) {
    if (str1[i] == str2[j] || str1[i] == ".") {
      i++;
      j++;
      continue;
    }

    if (str1[i] != "." && str1[i] != "*" && str1[i] != str2[j]) {
      return false;
    }

    if (str1[i] == "*") {
      i++;
      if (i >= str1.length) {
        return true;
      } else {
        if (str1[i] == str2[j]) j++;
        while (str1[i] != str2[j]) {
          if (str1[i] == ".") {
            j++;
            break;
          } else {
            j++;
            if (j >= str2.length) {
              return false;
            }
          }
        }
      }
    }
  }
  return true;
}
matchStr();

/**
 java

 import java.util.Scanner;

public class StringMatch {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String input = scanner.nextLine();
        String[] arr = input.split(" ");
        String line = scanner.nextLine();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < arr.length; i++) {
            if (judge(line, arr[i])) {
                sb.append(String.valueOf(i)).append(",");
            }
        }
        System.out.println(sb.substring(0, sb.length() - 1));
    }

    public static boolean judge(String str1, String str2) {

        int i = 0, j = 0;
        while (i < str1.length() && j < str2.length()) {
            if (str1.charAt(i) == str2.charAt(j) || str1.charAt(i) == '.') {
                i++;
                j++;
                continue;
            }

            if (str1.charAt(i) != '.' && str1.charAt(i) != '*' && str1.charAt(i) != str2.charAt(j))    {
                return false;
            }
            if (str1.charAt(i) == '*') {
                i++;
                if (i >= str1.length())
                    return true;
                else {
                    if (str1.charAt(i) == str2.charAt(j))
                        j++;
                    while (str1.charAt(i) != str2.charAt(j)) {
                        if (str1.charAt(i) == '.') {
                            j++;
                            break;
                        } else {
                            j++;
                            if (j >= str2.length())
                                return false;
                        }
                    }
                }
            }
        }
        return true;
    }
}
 */
