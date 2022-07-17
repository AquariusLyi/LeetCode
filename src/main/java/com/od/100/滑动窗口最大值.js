/**
滑动窗口最大值

 有一个N个整数的数组和一个长度为M的窗口，窗口从数组内的第一个数开始滑动，直到窗口不能滑动为止
每次滑动产生一个窗口  和窗口内所有数的和，求窗口滑动产生的所有窗口和的最大值

输入描述
第一行输入一个正整数N，表示整数个数  0<N<100000
第二行输入N个整数，整数取值范围   [-100,100]
第三行输入正整数M，M代表窗口的大小，M<=100000 并<=N

输出描述
窗口滑动产生所有窗口和的最大值

示例一
输入
6
12 10 20 30 15 23
3

输出
68
 */

// 滑动窗口解决
function getSum(str1, str2, str3) {
  const len = +str1.trim();
  const split = str2.trim().split(/\s+/g).map(Number);
  const num = +str3.trim();

  let left = 0;
  let right = num;
  let sumArr = [];
  while (right <= len) {
    let sum = 0;
    for (let i = left; i < right; i++) {
      sum += split[i];
    }
    sumArr.push(sum);
    left++;
    right++;
  }
  console.log(Math.max(...sumArr));
}
getSum(" 6", "12 10 20 30 15 23", "3");

// 双重循环思路处理
function getSum2(str1, str2, str3) {
  const len = +str1.trim();
  const split = str2.trim().split(/\s+/g).map(Number);
  const num = +str3.trim();

  let sumArr = [];
  for (let i = 0; i <= split.length - num; i++) {
    let sum = 0;
    for (let j = i; j < i + num; j++) {
      sum += split[j];
    }
    sumArr.push(sum);
  }
  console.log(Math.max(...sumArr));
}
getSum2(" 6", "12 10 20 30 15 23", "3");
getSum2(" 6", "10 20 30 15 23 12", "3");

/**
 import java.util.Scanner;

public class Main10 {
  public static void main(String[] args) {
    
      Scanner in = new Scanner(System.in);
      int n = Integer.parseInt(in.nextLine());
      String[] strs = in.nextLine().split(" ");
      int m = Integer.parseInt(in.nextLine());
      in.close();

      int[] ints = new int[n];
      for (int i = 0; i < n; i++) {
          ints[i] = Integer.parseInt(strs[i]);
      }

      int res = Integer.MIN_VALUE;
      for (int i = 0; i < n - m + 1; i++) {
          int sum = 0;
          for (int j = i; j < i + m; j++) {
              sum += ints[j];
          }
          if (sum > res) res = sum;
      }
      System.out.println(res);
  }
}

// 解法二

import java.util.Scanner;

 public class Main10 {
  public static void main(String[] args) {
      Scanner in = new Scanner(System.in);
      int n = Integer.parseInt(in.nextLine());
      String[] strs = in.nextLine().split(" ");
      int m = Integer.parseInt(in.nextLine());
      in.close();

      int[] ints = new int[n];
      for (int i = 0; i < n; i++) {
          ints[i] = Integer.parseInt(strs[i]);
      }

      int res = Integer.MIN_VALUE;
      for (int i = 0; i < n - m + 1; i++) {
          int sum = 0;
          for (int j = i; j < i + m; j++) {
              sum += ints[j];
          }
          if (sum > res) res = sum;
      }
      System.out.println(res);
  }
}
// 解法三

import java.util.LinkedList;
import java.util.Scanner;

public class maxSlidingWindow {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int n = in.nextInt();
        int[] nums = new int[n];
        in.nextLine();

        String[] s = in.nextLine().split(" ");
        for (int i = 0; i < s.length; i++) {
            nums[i] = Integer.parseInt(s[i]);
        }
        int k = in.nextInt();
        int res = 0;
        // 双端队列实现
        int ans = 0;
        LinkedList<Integer> queue = new LinkedList<>();
        for (int i = 0; i < n; i++) {
            // 添加当前值对应的数组下标，计算当前窗口和
            queue.add(i);
            ans += nums[i];
            // 初始化窗口，等到窗口长度为k时，下次移动时删除过期数值
            if (queue.getLast() >= k) {
                ans -= nums[queue.getFirst()];
                queue.removeFirst();
            }
            // 窗口长度为k时，后更新所有窗口的最大值
            if (i - k + 1 >= 0) {
                res = Math.max(ans, res);
            }
        }
        System.out.println(res);
    }
}

 */
