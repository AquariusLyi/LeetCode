/**
 华为机试：叠积木
 
编程题目 | 100分】叠积木 [ 100 / 中等 ]

叠积木
题目描述
给出一个列表如[[6,7,],[5,4],[3,2]],表示木块的长和宽，当木块的长和宽不大于另个木块的长和宽时，就可以放在上面，此外数组还可以左右翻转。求最多能搭多少层。

输入描述
一个二维数组，里面是每个积木的长和宽，可以左右翻转。

输出描述
最多能搭多少层。

样例
输入
[[5,4],[6,3],[6,7],[6,6],[4,6]]
1
输出
4
1
思路分析
首先对输入的积木进行处理，统一大的做长放第一个位置，小的做宽放第二个位置。

自定义排序，所有积木降序排，长度降序，相同则宽度降序。

动态规划求最大。定义一个 dp 数组，dp[i] 表示如果积木为 i 时，最大积木层数。j 表示前 i - 1 个积木，如果前 i - 1 个积木中宽度大于当前积木，dp[i]就等于两者最大值，则状态转移方程：

if (nums[j][1] >= nums[i][1]) {
    dp[i] = Math.max(dp[i], dp[j] + 1);  // 当前值，或从0到i-1中找到宽大于当前积木的
}
1
2
3
参考代码
————————————————
版权声明：本文为CSDN博主「小朱小朱绝不服输」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_44052055/article/details/124261937


 */

import java.util.Arrays;
import java.util.Scanner;

public class dieJiMu {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        String str = in.nextLine();
        // 去掉字符串的所有括号，这里注意下字符串的解析
        str = str.replaceAll("\\[", "");
        str = str.replaceAll("\\]", "");
//        str = str.replaceAll("\\s+", "");  // 去掉所有空格
        String[] str1 = str.split(",");
        int[][] nums = new int[str1.length / 2][2];
        for (int i = 0; i < nums.length; i++) {
            int num1 = Integer.parseInt(str1[2 * i]);
            int num2 = Integer.parseInt(str1[2 * i + 1]);
            nums[i][0] = Math.max(num1, num2);  // 大的为长度
            nums[i][1] = Math.min(num1, num2);  // 小的为宽度
        }
        // 先对积木自定义排序，按长度降序，相同按宽度降序
        Arrays.sort(nums, (o1, o2) -> o1[0] == o2[0] ? o2[1] - o1[1] : o2[0] - o1[0]);
        // 动态规划，dp[i] 表示如果积木为 i 时，最大积木嵌套数
        int[] dp = new int[nums.length];
        Arrays.fill(dp, 1);  // 初始化为1
        int max = 1;
        for (int i = 1; i < nums.length; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[j][1] >= nums[i][1]) {
                    dp[i] = Math.max(dp[i], dp[j] + 1);  // 当前值，或从0到i-1中找到宽大于当前积木的
                }
            }
            max = Math.max(dp[i], max);
        }
        System.out.println(max);
    }
}


/**
 java

 import java.util.Arrays;
import java.util.Scanner;

public class dieJiMu {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        String str = in.nextLine();
        // 去掉字符串的所有括号，这里注意下字符串的解析
        str = str.replaceAll("\\[", "");
        str = str.replaceAll("\\]", "");
//        str = str.replaceAll("\\s+", "");  // 去掉所有空格
        String[] str1 = str.split(",");
        int[][] nums = new int[str1.length / 2][2];
        for (int i = 0; i < nums.length; i++) {
            int num1 = Integer.parseInt(str1[2 * i]);
            int num2 = Integer.parseInt(str1[2 * i + 1]);
            nums[i][0] = Math.max(num1, num2);  // 大的为长度
            nums[i][1] = Math.min(num1, num2);  // 小的为宽度
        }
        // 先对积木自定义排序，按长度降序，相同按宽度降序
        Arrays.sort(nums, (o1, o2) -> o1[0] == o2[0] ? o2[1] - o1[1] : o2[0] - o1[0]);
        // 动态规划，dp[i] 表示如果积木为 i 时，最大积木嵌套数
        int[] dp = new int[nums.length];
        Arrays.fill(dp, 1);  // 初始化为1
        int max = 1;
        for (int i = 1; i < nums.length; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[j][1] >= nums[i][1]) {
                    dp[i] = Math.max(dp[i], dp[j] + 1);  // 当前值，或从0到i-1中找到宽大于当前积木的
                }
            }
            max = Math.max(dp[i], max);
        }
        System.out.println(max);
    }
}

 */
