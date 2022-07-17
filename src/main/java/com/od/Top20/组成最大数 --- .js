/**
 组成最大数
 
小组中每位都有一张卡片，卡片上是6位内的正整数，将卡片连起来可以组成多种数字，计算组成的最大数字。

输入描述:
“,”号分割的多个正整数字符串，不需要考虑非数字异常情况，小组最多25个人
输出描述:
最大的数字字符串

示例1
输入
22,221
输出
22221
示例2
输入
4589,101,41425,9999
输出
9999458941425101
    
 */

// #解题想法：
// 利用冒泡排序，每次将最小位置的数放在最后

function getMaxNumber(args) {
  let nums = args.trim().split(",");
  let length = nums.length;
  if (length > 26) {
    return;
  }
  for (let i = 0; i < length - 1; i++) {
    for (let j = i + 1; j > 0; j--) {
      if (Number(nums[j - 1] + nums[j]) < Number(nums[j] + nums[j - 1])) {
        let temp = nums[j];
        nums[j] = nums[j - 1];
        nums[j - 1] = temp;
      } else {
        break;
      }
    }
  }
  console.log(nums.join(""));
}
getMaxNumber("22,221");
getMaxNumber("4589,101,41425,9999");

// 第二种处理方式
function getMaxNumber2(args) {
  let nums = args.trim().split(",");
  let length = nums.length;
  if (length > 26) {
    return;
  }
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - 1; j++) {
      if (nums[j] + nums[j + 1] < nums[j + 1] + nums[j]) {
        let temp = nums[j];
        nums[j] = nums[j + 1];
        nums[j + 1] = temp;
      }
    }
  }
  console.log(nums.join(""));
}
getMaxNumber2("22,221");
getMaxNumber2("4589,101,41425,9999");

/**
 import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String str = scanner.nextLine();
        String[] s = str.split(",");
        String sum = "";
        for (int i = 0; i < s.length-1; i++) {
            for (int j = i+1; j < s.length ; j++) {
                String s1 = s[i].length() >= s[j].length() ? s[i] : s[j];
                String s2 = s[i].length() < s[j].length() ? s[i] : s[j];
                for (int k = 0; k < s2.length(); k++) {
                    if ((k == s2.length() - 1) && (s1.charAt(k) == s2.charAt(k))) {
                        if (k == s1.length() - 1) {
                            break;
                        } else if ((s1.charAt(k + 1) < s2.charAt(0))) {
                            String s3 = s1;
                            s1 = s2;
                            s2 = s3;
                            break;
                        }
                    } else {
                        if (s1.charAt(k) < s2.charAt(k)) {
                            String s3 = s1;
                            s1 = s2;
                            s2 = s3;
                            break;
                        }else if (s1.charAt(k) > s2.charAt(k)) {
                            break;
                        }
                    }
                }
                s[i]=s1;
                s[j]=s2;
            }
        }
        for (int i = 0; i <s.length ; i++) {
            sum+=s[i];
        }
        System.out.println(sum);
    }
}

// 解法二


import java.util.Arrays;
import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner in = new Scanner(System.in);
    String nums = in.nextLine();
    in.close();

    StringBuilder builder = new StringBuilder();

    Arrays.stream(nums.split(","))
        .sorted((s1, s2) -> {
          char[] v1 = s1.toCharArray();
          char[] v2 = s2.toCharArray();
          int len1 = v1.length;
          int len2 = v2.length;

          if (len1 == len2) {
            return s2.compareTo(s1);
          }

          int min = Math.min(len1, len2);
          for (int i = 0; i < min; i++) {
            char c1 = v1[i];
            char c2 = v2[i];
            if (c1 != c2) {
              return c2 - c1;
            }
          }

          if (len1 > len2) {
            return v1[0] - v1[min];
          } else {
            return v2[min] - v2[0];
          }
        })
        .forEach(builder::append);

    System.out.println(builder);

  }
}

 */
