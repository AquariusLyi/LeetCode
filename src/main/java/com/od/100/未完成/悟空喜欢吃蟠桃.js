/**
 华为机试：猴子吃桃
 【编程题目 | 200分】猴子吃桃 [ 200 / 中等 ]

猴子吃桃
题目描述：
孙悟空喜欢吃蟠桃，一天他乘守卫蟠桃园的天兵天将离开了而偷偷的来到王母娘娘的蟠桃园偷吃蟠桃。
已知蟠桃园有 N 棵蟠桃树，第 i 棵蟠桃树上有 N[i]（大于 0）个蟠桃，天兵天将将在 H（不小于蟠桃树棵数）小时后回来。
孙悟空可以决定他吃蟠桃的速度 K（单位：个/小时），每个小时他会选择一颗蟠桃树，从中吃掉 K 个蟠桃，如果这棵树上的蟠桃数小于 K，他将吃掉这棵树上所有蟠桃，然后这一小时内不再吃其余蟠桃树上的蟠桃。
孙悟空喜欢慢慢吃，但仍想在天兵天将回来前将所有蟠桃吃完。
求孙悟空可以在 H 小时内吃掉所有蟠桃的最小速度 K（K 为整数）。

输入描述:
从标准输入中读取一行数字，前面数字表示每棵数上蟠桃个数，最后的数字表示天兵天将将离开的时间。

输出描述：
吃掉所有蟠桃的 最小速度 K（K 为整数）或 输入异常时输出 -1。

示例 1：

输入
3 11 6 7 8
1
输出
4
1
说明：
天兵天将8个小时后回来，孙悟空吃掉所有蟠桃的最小速度4。

第1小时全部吃完第一棵树，吃3个，
第2小时吃4个，第二棵树剩7个，
第3小时吃4个，第二棵树剩3个，
第4小时吃3个，第二棵树吃完，
第5小时吃4个，第三棵树剩2个，
第6小时吃2个，第三棵树吃完，
第7小时吃4个，第4棵树剩3个，
第8小时吃3个，第4棵树吃完。
思路分析
二分法的应用，找到满足条件的最小K。可以参考875. 爱吃香蕉的珂珂，原题。

参考代码：
Java代码实现：
————————————————
版权声明：本文为CSDN博主「小朱小朱绝不服输」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_44052055/article/details/123959390

 */

/**
 java
 

 import java.util.Arrays;
import java.util.Scanner;

public class MonkeyEatPeach {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        String[] str = in.nextLine().split(" ");
        int[] nums = new int[str.length - 1];
        for (int i = 0; i < str.length - 1; i++) {
            // 判断是否有异常输入,非数字
            for (int j = 0; j < str[i].length(); j++) {
                char ch = str[i].charAt(j);
                if (ch >= '0' && ch <= '9') {
                    continue;
                } else {
                    System.out.println(-1);
                    return ;
                }
            }
            nums[i] = Integer.parseInt(str[i]);
        }
        int H = Integer.parseInt(str[str.length - 1]);
        Arrays.sort(nums);
        // 使用二分查找，找到最小的满足条件的K
        int left = 1, right = nums[nums.length - 1];
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (!check(nums, H, mid)) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        System.out.println(left);
    }
    private static boolean check(int[] nums, int H, int K) {  // 判断选定的天数是否满足条件
        int time = 0;
        for (int num : nums) {
            time += (num + K - 1) / K;
        }
        return time <= H;
    }
}

 */
