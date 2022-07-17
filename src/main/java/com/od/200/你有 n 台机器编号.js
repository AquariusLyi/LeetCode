/**
 华为机试：高效的任务规划

 【编程题目 | 200分】高效的任务规划 [ 200 / 中等 ]

高效的任务规划

■ 题目描述

你有 n 台机器编号为 1~n，每台都需要完成完成一项工作，机器经过配置后都能完成独立完成一项工作。
假设第 i 台机器你需要花 B 分钟进行设置，然后开始运行，J 分钟后完成任务。
现在，你需要选择布置工作的顺序，使得用最短的时间完成所有工作。
注意，不能同时对两台进行配置，但配置完成的机器们可以同时执行他们各自的工作。
输入描述：

第一行输入代表总共有 M 组任务数据（1<M<=10）。
每组数第一行为一个整数指定机器的数量 N（0<N<=1000）。
随后的 N 行每行两个整数，第一个表示 B（0<=B<=10000），第二个表示 J（0<=J<=10000）。
每组数据连续输入，不会用空行分隔。各组任务单独计时。
输出描述：

对于每组任务，输出最短完成时间，且每组的结果独占一行。例如，两组任务就应该有两行输出。
示例1  输入输出示例仅供调试，后台判题数据一般不包含示例

输入

1
1
2 2

输出

4

解释：

第一行1为一组任务，第二行1代表只有一台机器，第三行表示该机器配置需2分钟，执行需2分钟。

示例2  输入输出示例仅供调试，后台判题数据一般不包含示例

输入

2
2
1 1
2 2
3
1 1
2 2
3 3

输出

4
7

解释：

第一行2代表两组任务，

第二行2代表第一组任务有2个机器，

第三行1 1代表机器1配置需要1分运行需要1分，

第四行2 2代表机器2配置需要2分运行需要2分，

第五行3代表第二组任务需要3个机器，

第6-8行分别表示3个机器的配置与运行时间。



解题思路：

题中要求总耗时最短，而且注意到题中：每次只能配置一台机器，那么一个简单道理就是让任务工作时间最长的机器先运行；
最浅显的解释是：如果让任务工作时间最短的在前面运行，那么同段时间的时间利用率就不是最高，因此并行数量越多越好，这样才会获得总体最短时间；

动态规划：dp[i]表示当前机器工作完成经过的总时间。

转移方程：因为第i台机器开始配置并工作必须是前i-1台机器都完成了配置，当前机器之前所有机器的总配置时间用last来表示，则第i台机器完成工作所用的总时间dp[i] = last + machine[i][0] + machine[i][1];(包含了此前所有机器的配置时间last)；

设最短的完成时间res，初始化res=0,last=0，则 res = max(res, dp[i]);
————————————————
版权声明：本文为CSDN博主「小朱小朱绝不服输」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_44052055/article/details/123996124


 */

function jiqi() {
  let M = +readline().trim();
  for (let i = 0; i < M; i++) {
    let N = +readline().trim();
    // 动态规划，让任务工作时间最长的机器先运行，这样总体时间才最短啊
    // 空间优化
    let time = 0;
    let last = 0; // 之前机器配置完成的时间
    let res = 0; //总时间
    let machine = new Array(N).fill("").map(() => new Array(2).fill(0)); // 每组任务的N台机器的配置时间和工作时间
    for (let i = 0; i < N; i++) {
      let curr = readline().trim().split(/\s+/).map(Number);
      let B = curr[0];
      let J = curr[1];
      machine[i][0] = B;
      machine[i][1] = J;
    }
    // lambda按第二元素降序排序，即按工作时间降序排序
    machine.sort((a, b) => b[1] - a[1]);
    for (let i = 0; i < N; i++) {
      time = last + machine[i][0] + machine[i][1];
      last += machine[i][0];
      res = Math.max(res, time);
    }
    console.log(res);
  }
}

/**
 java
 
 import java.util.*;

public class assignmentArrangement {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int M = in.nextInt();
        for(int m = 0; m < M; m++) {
            int N = in.nextInt();
            // 动态规划，让任务工作时间最长的机器先运行，这样总体时间才最短啊
            int[] dp = new int[N]; // dp[i]第i台机器工作完的时间
            int last = 0; // 之前机器配置完成的时间
            int res = 0; //总时间
            int[][] machine = new int[N][2];  // 每组任务的N台机器的配置时间和工作时间
            for (int i = 0; i < N; i++) {
                int B = in.nextInt();
                int J = in.nextInt();
                machine[i][0] = B;
                machine[i][1] = J;
            }
            // lambda按第二元素降序排序，即按工作时间降序排序
            Arrays.sort(machine, (e1, e2) -> (e2[1] - e1[1]));
            for (int i = 0; i < N; i++) {
                dp[i] = last + machine[i][0] + machine[i][1];
                last += machine[i][0];
                res = Math.max(res, dp[i]);
            }
            System.out.println(res);
        }
    }
}

// 解法二 空间优化  
 
import java.util.*;

public class assignmentArrangement {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int M = in.nextInt();
        for(int m = 0; m < M; m++) {
            int N = in.nextInt();
            // 动态规划，让任务工作时间最长的机器先运行，这样总体时间才最短啊
            // 空间优化
            int time = 0;
            int last = 0; // 之前机器配置完成的时间
            int res = 0; //总时间
            int[][] machine = new int[N][2];  // 每组任务的N台机器的配置时间和工作时间
            for (int i = 0; i < N; i++) {
                int B = in.nextInt();
                int J = in.nextInt();
                machine[i][0] = B;
                machine[i][1] = J;
            }
            // lambda按第二元素降序排序，即按工作时间降序排序
            Arrays.sort(machine, (e1, e2) -> (e2[1] - e1[1]));
            for (int i = 0; i < N; i++) {
                time  = last + machine[i][0] + machine[i][1];
                last += machine[i][0];
                res = Math.max(res, time);
            }
            System.out.println(res);
        }
    }
}

 */
