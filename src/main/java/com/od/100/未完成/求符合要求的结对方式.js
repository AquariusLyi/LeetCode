/**
求符合要求的结对方式

用一个数组A代表程序员的工作能力，公司想通过结对编程的方式提高员工的能力，假设结对后的能力为两个员工的能力之和，求一共有多少种结对方式使结对后能力为N。

输入描述:
5
1 2 2 2 3
4
第一行为员工的总人数，取值范围[1,1000]
第二行为数组A的元素，每个元素的取值范围[1,1000]
第三行为N的值，取值范围[1,1000]
输出描述:
4
满足结对后能力为N的结对方式总数

示例1
输入
5
1 2 2 2 3
4
输出
4
说明
满足要求的结对方式为：A[0]和A[4]，A[1]和A[2]，A[1]和A[3]，A[2]和A[3]

 */


import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        Scanner sc = new Scanner(System.in);
        int total = sc.nextInt();
        int[] person = new int[total];
        for (int i = 0; i < total; i++) {
            person[i] = sc.nextInt();
        }
        
        int sum = sc.nextInt();
        int ans = 0;
        for (int i = 0; i < total; i++) {
            int persona = person[i];
            for (int j = i + 1; j < total; j++) {
                int personb = person[j];
                if (sum == persona + personb) {
                    ans++;
                }
            }
        }
        System.out.println(ans);
    }
}


/**
 * java
 
答案：
解法一：

import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        Scanner sc = new Scanner(System.in);
        int total = sc.nextInt();
        int[] person = new int[total];
        for (int i = 0; i < total; i++) {
            person[i] = sc.nextInt();
        }
        
        int sum = sc.nextInt();
        int ans = 0;
        for (int i = 0; i < total; i++) {
            int persona = person[i];
            for (int j = i + 1; j < total; j++) {
                int personb = person[j];
                if (sum == persona + personb) {
                    ans++;
                }
            }
        }
        System.out.println(ans);
    }
}
 */
