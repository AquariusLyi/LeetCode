/**
 叠积木

标题：叠积木 | 时间限制：1秒 | 内存限制：262144K | 语言限制：不限

有一堆长方体积木，它们的宽度和高度都相同，但长度不一。小橙想把这堆积木叠成一面墙，墙的每层可以放一个积木，也可以将两个积木拼接起来，要求每层的长度相同。若必须用完这些积木，叠成的墙最多为多少层？
如下是叠成的一面墙的图示，积木仅按宽和高所在的面进行拼接。
(图像)
输入描述:
输入为一行，为各个积木的长度，数字为正整数，并由空格分隔。积木的数量和长度都不超过5000。
输出描述:
输出一个数字，为墙的最大层数，如果无法按要求叠成每层长度一致的墙，则输出-1。


输入
1 4 2 3 6
输出
-1
说明
无法用这些积木叠成每层长度一致的墙，故输出-1。

示例1   输入输出示例仅供调试，后台判题数据一般不包含示例

输入
3 6 3 3 3

输出
3

解释：以 6 为底的墙，第一层为 6 ，第二层为 3 + 3，第三层 3 + 3。
说明
可以每层都是长度3和6的积木拼接起来，这样每层的长度为9，层数为2；也可以其中两层直接用长度6的积木，两个长度3的积木拼接为一层，这样层数为3，故输出3。

示例2   输入输出示例仅供调试，后台判题数据一般不包含示例

输入
9 9 9 5 3 2 2 2 2 2

输出
5

解释：

5+2+2=9

3+2+2+2=9

9,9,9

共五层


解题思路：
每层只能放一个或两个积木（非常重要）
积木的总长度可以被积木层数整除
积木每层的最小长度为最短积木，最大长度为最短积木和最大积木和（因为一层最多两个积木）
根据步骤2对总长度进行分解因子，从最小长度开始，如果因数符合积木要求，则输出层数；如不符合，则输出-1


 */

function jimu() {
  let str = readline().trim();
  let arr = str.split(/\s+/).map(Number);
  let len = arr.length;
  if (len == 1) {
    console.log(1);
  }
  if (len == 0) {
    console.log(-1);
  }
  arr.sort((a, b) => a - b);
  let max = arr[len - 1];
  let sum = 0;
  for (let num of arr) {
    sum += num;
  }
  for (let i = 0; i < len - 1; i++) {
    if (sum % max == 0) {
      break;
    } else {
      max += arr[i];
    }
  }
  let cnt = parseInt(sum / max);
  sum = parseInt(sum / cnt);
  let dp = new Array(len + 1)
    .fill("")
    .map(() => new Array(sum + 1).fill(false));
  for (let i = 0; i <= len; i++) {
    dp[i][0] = true;
  }
  for (let i = 1; i <= len; i++) {
    for (let j = 1; j <= sum; j++) {
      if (j - arr[i - 1] < 0) {
        dp[i][j] = dp[i - 1][j];
      } else {
        dp[i][j] = dp[i - 1][j] || dp[i - 1][j - arr[i - 1]];
      }
    }
  }
  if (dp[len][sum] && cnt != 1) {
    console.log(cnt);
  } else {
    console.log(-1);
  }
}

/**
 解法一
 import java.util.Arrays;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String str = scanner.nextLine();
        String[] s = str.split(" ");
        int[] nums = new int[s.length];
        for (int i = 0; i < s.length; i++) {
            nums[i] = Integer.parseInt(s[i]);
        }
        int n = nums.length;
        if (n == 1) {
            System.out.println(1);
        }
        if (n == 0) {
            System.out.println(-1);
        }
        Arrays.sort(nums);
        int maxVal = nums[n - 1];
        int sum = 0;
        for (int num : nums) {
            sum += num;
        }
        for (int i = 0; i < n - 1; i++) {
            if (sum % maxVal == 0) {
                break;
            } else {
                maxVal += nums[i];
            }
        }
        int cnt = sum / maxVal;
        sum /= cnt;

        boolean[][] dp = new boolean[n + 1][sum + 1];

        for (int i = 0; i <= n; i++) {
            dp[i][0] = true;
        }
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= sum; j++) {
                if (j - nums[i - 1] < 0) {
                    dp[i][j] = dp[i - 1][j];
                } else {
                    dp[i][j] = dp[i - 1][j] || dp[i - 1][j - nums[i - 1]];
                }
            }
        }
        if (dp[n][sum] && cnt != 1) {
            System.out.println(cnt);
        } else {
            System.out.println(-1);
        }
    }
}

// 解法二
import java.util.Arrays;
import java.util.Scanner;

public class Main {
    private static int[] arr;
    private static boolean[] isUsed;

    public static void main(String[] args) {
        
        Scanner in = new Scanner(System.in);
        String[] strs = in.nextLine().split(" ");
        arr = new int[strs.length];
        isUsed = new boolean[strs.length];
        int i = 0;
        for (i = 0; i < strs.length; i += 1) {
            arr[i] = Integer.parseInt(strs[i]);
        }
        Arrays.sort(arr);
        int max1 = 0, max2 = 0;
        max1 = getLevel(arr[arr.length - 1]);
        max2 = getLevel(arr[arr.length - 1] + arr[0]);
        System.out.println(Math.max(max1, max2));
    }

    private static int getLevel(int levelLength) {
        int maxLength = 0;
        int i = 0, j = 0, k = 0;
        for (i = arr.length - 1; i > 0; i -= 1) {
            if (arr[i] == levelLength) {
                maxLength += 1;
                isUsed[i] = true;
                continue;
            }
            if (!isUsed[i]) {
                for (j = 0; j < i; j += 1) {
                    if (arr[i] + arr[j] == levelLength && (!isUsed[j])) {
                        maxLength += 1;
                        isUsed[i] = true;
                        isUsed[j] = true;
                        break;
                    }
                }
                if (j == i) {
                    for (i = 0; i < arr.length; i += 1) {
                        isUsed[i] = false;
                    }
                    return -1;
                }
            }
        }
        if (arr[0] == levelLength) {
            maxLength += 1;
        }
        for (i = 0; i < arr.length; i += 1) {
            if (!isUsed[i]) {
                maxLength = -1;
            }
            isUsed[i] = false;
        }
        return maxLength;
    }
}
 */
