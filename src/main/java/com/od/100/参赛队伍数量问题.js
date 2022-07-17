/**
 参赛队伍数量问题

 用数组代表每个人的能力一个比赛活动要求 参赛团队的最低能力值为N，每个团队可以由一人或者两人组成
且一个人只能参加一个团队，计算出最多可以派出多少只符合要求的队伍

输入描述
5
3 1 5 7 9
8
第一行代表总人数，范围  1~500000
第二行数组代表每个人的能力，数组大小范围 1~500000，元素取值范围 1~500000
第三行数值为团队要求的最低能力值，1~500000

输出描述
3
最多可以派出的团队数量

示例一
输入
5
3 1 5 7 9
8

输出
3

说明 3、5组成一队   1、7一队  9自己一队  输出3 

https://www.cnblogs.com/Jukim/p/16061172.html

 */

function getSum(str1, str2, str3) {
  let len = +str1.trim();
  let split = str2.trim().split(/\s+/g).map(Number);
  let max = +str3.trim();
  let sum = 0;
  split.sort((a, b) => a - b);
  //   用下标来处理问题，不要非想着要split 数组 来处理问题
  let left = 0;
  let right = len - 1;
  while (left < right) {
    if (split[right] >= max) {
      sum++;
      right--;
    } else {
      if (split[left] + split[right] >= max) {
        left++;
        sum++;
        right--;
      } else {
        left--;
      }
    }
  }
  console.log(sum);
}
getSum("5", "3 1 5 7 9", "8");

/**
 java

 
import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int n = in.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) {
            nums[i] = in.nextInt();
        }
        int tar = in.nextInt();
        int res = 0;

        Arrays.sort(nums);
        int left = 0;
        int right = n-1;
        while (nums[right]>tar){
            right--;
            res++;
        }
        while (left<right){
            //两人团队
            if (nums[left]+nums[right]>=tar){
                res++;
                right--;
            }
            left++;
        }
        System.out.println(res);
    }
}
// 解法二

import java.util.Arrays;
import java.util.List;
import java.util.Scanner;
import java.util.stream.Collectors;
public class Main {
    public static void main(String[] args) {
     Scanner in = new Scanner(System.in);
        int n = Integer.parseInt(in.nextLine());
        String[] nums = in.nextLine().split(" ");
        int base = Integer.parseInt(in.nextLine());
        in.close();

        Integer[] list = Arrays.stream(nums)
                .map(Integer::parseInt)
                .filter(x -> x < base)
                .sorted()
                .toArray(Integer[]::new);

        int count = nums.length - list.length;

        int i = 0, j = list.length - 1;
        while (i < j) {
            if (list[i] + list[j] >= base) {
                count++;
                i++;
                j--;
            } else i++;
        }
        System.out.println(count);
    }
}

 */
