/**
 编程题目 |200分】比较两个版本号的大小【2021 H1,H2 考试题】

时间限制：C/C++ 1秒，其他语言 2秒

空间限制：C/C++262144K，其他语言524288K

64bit IO Format：%lld

本题可使用本地IDE编码，不能使用本地已有代码，无跳出限制，

编码后请点击”保存并调试“按钮进行代码提交。

■ 题目描述

【比较两个版本号的大小】

输入两个版本号 version1 和 version2，每个版本号由多个子版本号组成。

子版本号之间由 “.” 隔开，由大小写字母、数字组成，并且至少有一个字符。

按从左到右的顺序比较子版本号，比较规则如下：

子版本号前面的0不参与比较，比如 001 和 1 是相等的。

小写字母 > 大写字母 > 数字

空字符和0相等，比如 1 和 1.0 相等

比较结果

如果 version1 > version2 ，返回 1

如果 version1 < version2 ，返回-1

其他情况返回0

示例1 输入输出示例仅供调试，后台判题数据一般不包含示例

输入
5.2
5.1a

输出
1

示例2 输入输出示例仅供调试，后台判题数据一般不包含示例

输入
5.6.1
5.6.2a

输出
-1

示例3 输入输出示例仅供调试，后台判题数据一般不包含示例

输入
5.6.8.a
5.6.8.0a

输出
0
 */

function VersionNumber() {
  let arr1 = readline().trim().split(/\./);
  let arr2 = readline().trim().split(/\./);

  let len1 = arr1.length;
  let len2 = arr2.length;

  for (let i = 0; i < len1 && i < len2; i++) {
    let res = helper(arr1[i], arr2[i]);
    if (res != 0) {
      console.log(res);
      return;
    }
  }

  if (len1 > len2) {
    let k = len2;
    while (k < len1) {
      let res = helper(arr1[k], "");
      if (res != 0) {
        console.log(res);
        return;
      }
      k++;
    }
    console.log(0);
    return;
  }

  if (len2 > len1) {
    let k = len1;
    while (k < len2) {
      let res = helper("", arr2[k]);
      if (res != 0) {
        console.log(res);
        return;
      }
      k++;
    }
    console.log(0);
    return;
  }

  console.log(0);
}

function helper(v1, v2) {
  let sb1 = v1;
  while (sb1.length > 0 && sb1.charAt(0) == "0") {
    sb1 = sb1.slice(1);
  }

  let sb2 = v2;
  while (sb2.length > 0 && sb2.charAt(0) == "0") {
    sb2 = sb2.slice(1);
  }

  for (let i = 0; i < sb1.length && i < sb2.length; i++) {
    if (sb1.charAt(i) > sb2.charAt(i)) return 1;
    else if (sb1.charAt(i) < sb2.charAt(i)) return -1;
  }

  let len1 = sb1.length;
  let len2 = sb2.length;
  if (len1 > len2) {
    let k = len2;
    while (k < len1) {
      if (sb1.charAt(k) > "0") return 1;
      k++;
    }
    return 0;
  }

  if (len2 > len1) {
    let k = len1;
    while (k < len2) {
      if (sb2.charAt(k) > "0") return -1;
      k++;
    }
    return 0;
  }
  return 0;
}
VersionNumber();

/**
 java

 import java.util.Scanner;

public class VersionNumber {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        String v1 = in.next();
        String v2 = in.next();

        String[] arr1 = v1.split("\\.");
        String[] arr2 = v2.split("\\.");

        int len1 = arr1.length;
        int len2 = arr2.length;

        for (int i = 0; i < len1 && i < len2; i++) {
            int res = helper(arr1[i], arr2[i]);
            if (res != 0) {
                System.out.println(res);
                return;
            }
        }

        if (len1 > len2) {
            int k = len2;
            while (k < len1) {
                int res = helper(arr1[k], "");
                if (res != 0) {
                    System.out.println(res);
                    return;
                }
                k++;
            }
            System.out.println(0);
            return;
        }

        if (len2 > len1) {
            int k = len1;
            while (k < len2) {
                int res = helper("", arr2[k]);
                if (res != 0) {
                    System.out.println(res);
                    return;
                }
                k++;
            }
            System.out.println(0);
            return;
        }

        System.out.println(0);
    }

    public static int helper(String v1, String v2) {
        StringBuilder sb1 = new StringBuilder(v1);
        while (sb1.length() > 0 && sb1.charAt(0) == '0') {
            sb1.deleteCharAt(0);
        }

        StringBuilder sb2 = new StringBuilder(v2);
        while (sb2.length() > 0 && sb2.charAt(0) == '0') {
            sb2.deleteCharAt(0);
        }

        for (int i = 0; i < sb1.length() && i < sb2.length(); i++) {
            if (sb1.charAt(i) > sb2.charAt(i)) return 1;
            else if (sb1.charAt(i) < sb2.charAt(i)) return -1;
        }

        int len1 = sb1.length();
        int len2 = sb2.length();
        if (len1 > len2) {
            int k = len2;
            while (k < len1) {
                if (sb1.charAt(k) > '0') return 1;
                k++;
            }
            return 0;
        }

        if (len2 > len1) {
            int k = len1;
            while (k < len2) {
                if (sb2.charAt(k) > '0') return -1;
                k++;
            }
            return 0;
        }
        return 0;
    }
}
 */
