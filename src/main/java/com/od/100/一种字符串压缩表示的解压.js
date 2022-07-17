/**
 简易压缩算法

一种字符串压缩表示的解压

有一种简易压缩算法：针对全部由小写英文字母组成的字符串，将其中连续超过两个相同字母的部分压缩为连续个数加该字母，其他部分保持原样不变。
例如：字符串“aaabbccccd”经过压缩成为字符串“3abb4cd”。
请您编写解压函数，根据输入的字符串，判断其是否为合法压缩过的字符串，
若输入合法则输出解压缩后的字符串，否则输出字符串“!error”来报告错误。
输入描述

输入一行，为一个ASCII字符串，长度不会超过100字符，用例保证输出的字符串长度也不会超过100字符。
输出描述

若判断输入为合法的经过压缩后的字符串，则输出压缩前的字符串；若输入不合法，则输出字符串“!error”。
示例1 输入输出示例仅供调试，后台判题数据一般不包含示例

输入
4dff

输出
ddddff

说明

4d扩展为dddd，故解压后的字符串为ddddff。

示例2 输入输出示例仅供调试，后台判题数据一般不包含示例

输入
2dff

输出
!error

说明

两个d不需要压缩，故输入不合法。

示例3 输入输出示例仅供调试，后台判题数据一般不包含示例

输入
4d@A

输出
!error

说明

全部由小写英文字母组成的字符串压缩后不会出现特殊字符@和大写字母A，故输入不合法。

 */

/**
 利用正则表达式进行判断每个位置上的字符是字母还是数字，进而执行不同操作。

 */

function compressString() {
  let line = readline().trim();
  let reg = /^[a-z0-9]+$/;
  let arr = [];
  let reg1 = /^[a-z]+$/;
  let reg2 = /^[0-9]+$/;
  //利用正则表达式进行判断，如果是字母或者数字就加入到arr数组当中
  for (let i = 0; i < line.length; i++) {
    if (reg.test(line[i])) arr.push(line[i]);
  }
  // 如果arr数组的长度跟传入的字符串的长度不相等，那么说明有非法字符，返回!error
  if (arr.length < line.length) return "!error";

  let res = "";
  let count = 1;
  for (let i = 0; i < arr.length; i++) {
    let cur = arr[i];
    //如果是字母
    if (reg1.test(cur)) {
      // 如果是连续的三个相同的字母，例如：aaa这样的类型是非法的，直接返回!error
      if (
        res.length > 2 &&
        cur == res.charAt(res.length - 1) &&
        cur == res.charAt(res.length - 2)
      ) {
        return "!error";
      }
      // 如果count为2，是不合法的，因为题目要求只有连续两个以上的字母才能写成3d的形式，两个
      // 字母应该写成dd
      if (count == 2) {
        return "!error";
      }
      // 根据count的数字次数，来添加字母
      for (let j = 0; j < count; j++) {
        res += cur;
      }
      count = 1;
    }
    let pos = i;
    // 当是数字时i++,直到不是数字遇到字母位置，得到数字的最终位置。
    while (reg2.test(arr[i])) {
      i++;
    }
    // 当数字不是个位数，例如：6d.而是16d时，也就是i>pos,截取这一整个字符，也就是截取16
    if (i > pos) {
      count = parseInt(line.substring(pos, i));
      /**这里为什么需要i--呢？是因为在上面的while循环中i++了，此时的i是位于字母位置上。
            比如3d，i初始为0，i++,i=1,位于d位置上。这样可以方便我们用substring时截取，因为
            substring第二个参数是不包含这个索引在内的，恰好符合我们的要求截取的刚好是3。
            但是在下一个循环时，i在for循环中依然会++,就会造成i++了多一次，造成直接跳过了
            一位，因此需要让i--，这样i就不会多走一位。 */
      i--;
    }
  }
  return res;
}

// console.log(compressString("4dff")); //打印结果为：ddddff

/**
 java

 import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine();
        StringBuilder res = new StringBuilder();
        for (int i = 0; i < input.length(); i++) {
            char ch = input.charAt(i);
            int times = 1;
            StringBuilder count = new StringBuilder();
            if ((ch >= '0' && ch <= '9')) {
                for (int j = i; j < input.length(); j++) {
                    ch = input.charAt(j);
                    if (ch >= '0' && ch <= '9') {
                        count.append(input.charAt(j));
                        i++;
                        continue;
                    }
                    break;
                }
                times = Integer.parseInt(count.toString());
                if (times <= 2) {
                    System.out.println("!error");
                    return;
                }
            }
            ch = input.charAt(i);
            if (ch >= 'a' && ch <= 'z') {
                while (times > 0) {
                    res.append(ch);
                    times--;
                }
            } else {
                System.out.println("!error");
                return;
            }
        }
        System.out.println(res);
    }
}

// //
// 解法一



import java.util.Scanner;

public class Main {  
  public static void main(String[] args) {
    Scanner in = new Scanner(System.in);
    String line = in.nextLine();
    in.close();

    String res = decode(line);

    System.out.println(res);

  }

  private static String decode(String line) {
    String fixed = line.replaceAll("[a-z]|[0-9]", "");
    if (fixed.length() > 0) {
      return "!error";
    }

    StringBuilder res = new StringBuilder();
    char[] chars = line.toCharArray();
    int count = 1;
    for (int i = 0; i < chars.length; i++) {
      char cur = chars[i];

      if (Character.isLetter(cur)) {
        if (res.length() > 0 && cur == res.charAt(res.length() - 1)) {
          return "!error";
        }
        for (int j = 0; j < count; j++) {
          res.append(cur);
        }
        count = 1;
      }
      int pos = i;
      while (Character.isDigit(chars[i])) {
        i++;
      }
      if (i > pos) {
        count = Integer.parseInt(line.substring(pos, i--));
      }
    }
    return res.toString();
  }
}


//  解法二

 
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String str, tmp, res;
        char ch;
        int count;
        while (scanner.hasNext()) {
            str = scanner.next();
            res = "";
            if (str.matches(".*[^0-9a-z].*") || str.matches("^.*[0-9]+$")) {
                System.out.println("!error");
                continue;
            }
            for (int i = 0, k, len = str.length(); i < len; i++) {
                ch = str.charAt(i);
                tmp = "";
                if (ch >= 'a' && ch <= 'z') {
                    k = i;
                    for (k = i + 1; k < len; ++k) {
                        if (ch != str.charAt(k)) {
                            break;
                        }
                    }
                    if (k - i > 2) {
                        res = "!error";
                        break;
                    }
                }
                while (ch >= '0' && ch <= '9') {
                    tmp += ch;
                    ++i;
                    ch = str.charAt(i);
                }
                if (!tmp.isEmpty()) {
                    count = Integer.parseInt(tmp);
                    if (count < 3) {
                        res = "!error";
                        break;
                    }
                    for (int j = 0; j < count; j++) {
                        res += ch;
                    }
                } else {
                    res += ch;
                }
            }
            System.out.println(res);
        }
    }
}

// 解法四

import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String str, tmp, res;
        char ch;
        int count;
        while (scanner.hasNext()) {
            str = scanner.next();
            res = "";
            if (str.matches(".*[^0-9a-z].*") || str.matches("^.*[0-9]+$")) {
                System.out.println("!error");
                continue;
            }
            for (int i = 0, k, len = str.length(); i < len; i++) {
                ch = str.charAt(i);
                tmp = "";
                if (ch >= 'a' && ch <= 'z') {
                    k = i;
                    for (k = i + 1; k < len; ++k) {
                        if (ch != str.charAt(k)) {
                            break;
                        }
                    }
                    if (k - i > 2) {
                        res = "!error";
                        break;
                    }
                }
                while (ch >= '0' && ch <= '9') {
                    tmp += ch;
                    ++i;
                    ch = str.charAt(i);
                }
                if (!tmp.isEmpty()) {
                    count = Integer.parseInt(tmp);
                    if (count < 3) {
                        res = "!error";
                        break;
                    }
                    for (int j = 0; j < count; j++) {
                        res += ch;
                    }
                } else {
                    res += ch;
                }
            }
            System.out.println(res);
        }
    }
}
 */
