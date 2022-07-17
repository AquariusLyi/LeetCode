/**
 非严格递增连续数字序列
输入一个字符串仅包含大小写字母和数字，求字符串中包含的最长的非严格递增连续数字序列的长度（比如12234属于非严格递增连续数字序列）。

输入描述:
输入一个字符串仅包含大小写字母和数字，输入的字符串最大不超过255个字符。
输出描述:
最长的非严格递增连续数字序列的长度

示例1：
输入
abc2234019A334bc
输出
4
说明
2234为最长的非严格递增连续数字序列，所以长度为4。

 */

/**
 解题思路：
1、创建一个dp数组，来保存每个位置上的非严格递增连续数字序列的长度，因为是非严格，因此相邻两个数可以相等。

2、初始化dp数组时应该将每个位置都填充上1，因为数字本身就可以作为一个长度为1的递增序列。

3、Math.max.apply()可以调用数字中的求最大值的方法，数组本身没有求最大值的方法，但通过apply调用，apply方法传入的第二个参数是一个数组，将dp数组传入得到dp数组中的最大值。
————————————————
版权声明：本文为CSDN博主「G1useppE」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/G1useppE/article/details/125013624
 */

function longestList(str) {
  //字符串中的每一个数字本身就可以作为一个连续子序,因此dp数组中填充1
  const dp = new Array(str.length).fill(1);
  let arr = str.split("").map((n) => Number(n));
  for (let i = 0; i < arr.length; i++) {
    // 遍历arr数组,如果不是数字,那么就跳过进入下一次循环
    if (isNaN(arr[i])) {
      continue;
    }
    // 记录该位置的最长递增连续数字序列长度
    if (arr[i] >= arr[i - 1]) {
      dp[i] = dp[i - 1] + 1;
    }
  }
  // 将dp数组作为参数传入,得到最大值就是题目所要求的结果
  let result = Math.max.apply(Math, dp);
  console.log(result);
}

longestList("abc2234019A334bc"); //打印结果:4

/**
 java

import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        while (in.hasNext()) {// 注意，如果输入是多个测试用例，请通过while循环处理多个测试用例
            String str = in.nextLine();
            if (str.length()==1&&str.charAt(0)>='0'&&str.charAt(0)<='9'){
                System.out.println(1);
                continue;
            }
            boolean flag = false;
            char[] c = str.toCharArray();
            int size = str.length();
            int max = 1;
            int length = 1;
            for (int i = 1; i < size ; i++) {
                if ((c[i - 1] >= '0' && c[i - 1] <= '9') || (c[i] >= '0' && c[i] <= '9')) {
                    flag = true;
                }
                if (c[i-1] <= c[i]&&c[i-1]>='0'&&c[i]<='9') {
                    length++;
                    if (length > max) {
                        max = length;
                    }
                    continue;
                } else {
                    length = 1;
                }

            }
            if (flag == true) {
                System.out.println(max);
            } else {
                System.out.println(0);
            }
        }
    }
}
 */

/**
 java 二
 import java.util.Scanner;


public class Main38 {
    public static void main(String[] args) {
      
        Scanner in = new Scanner(System.in);
        String line = in.nextLine();
        in.close();

        char[] chars = line.toCharArray();

        int curLen = 0, maxLen = 0;

        char last = 'a';
        for (char cur : chars) {
            if (Character.isDigit(cur)) {
                if (curLen == 0) {
                    curLen++;
                } else if (cur >= last) {
                    curLen++;
                } else {
                    if (curLen > maxLen) {
                        maxLen = curLen;
                    }
                    curLen = 1;
                }
                last = cur;
            } else {
                if (curLen > maxLen) maxLen = curLen;
                curLen = 0;
                last = 'a';
            }
        }

        if (curLen > maxLen) {
            maxLen = curLen;
        }

        System.out.println(maxLen);
    }
}
 */
