/**
 最大社交距离

【编程题目 |200分】最大社交距离 【2021 H2,2022 Q1,Q2 考试题】

■ 题目描述

疫情期间需要大家保证一定的社交距离，公司组织开交流会议。座位一排共 N 个座位，编号分别为[0,N-1],

要求员工一个接着一个进入会议室，并且可以在任何时候离开会议室。

满足：

每当一个员工进入时，需要坐到最大社交距离（最大化自己和其他人的距离的座位）；

如果有多个这样的座位，则坐到索引最小的那个座位。

输入描述

会议室座位总数seatNum。(1 <= seatNum <= 500)

员工的进出顺序 seatOrLeave 数组，元素值为 1，表示进场；元素值为负数，表示出场（特殊：位置 0 的员工不会离开）。

例如 -4 表示坐在位置 4 的员工离开（保证有员工坐在该座位上）

输出描述

最后进来员工，他会坐在第几个位置，如果位置已满，则输出-1。

示例1   输入输出示例仅供调试，后台判题数据一般不包含示例

输入

10
[1,1,1,1,-4,1]

输出

5

说明

seat -> 0,空在任何位置都行，但是要给他安排索引最小的位置，也就是座位 0
seat -> 9,要和旁边的人距离最远，也就是座位 9
seat -> 4,要和旁边的人距离最远，应该坐到中间，也就是座位 4
seat -> 2,员工最后坐在 2 号座位上
leave[4], 4 号座位的员工离开
seat -> 5,员工最后坐在 5 号座位上

 */

getMaxDistance();

function getMaxDistance() {
  let seatNum = +readline().trim();
  let seat = readline().trim();
  let c = seat.substring(1, seat.length - 1).split(",");
  let seatOrLeave = [];
  for (let i = 0; i < c.length; i++) {
    seatOrLeave[i] = parseInt(c[i]);
  }
  //   [1, 1, 1, 1, -4, 1]
  // 10
  let ans = seatDistance(seatNum, seatOrLeave);
  console.log(ans);
}
function seatDistance(seatNum, seatOrLeave) {
  let seatedNums = new Set(); // 使用TreeSet有序集合记录被坐过的座位
  for (let i = 0; i < seatOrLeave.length; i++) {
    let op = seatOrLeave[i];
    if (op > 0) {
      if (seatedNums.size == 0) {
        // 如果是第一个坐
        if (i == seatOrLeave.length - 1) {
          // 如果只有一个位置
          return 0;
        }
        seatedNums.add(0);
      } else if (seatedNums.size == 1) {
        // 第二个人进来，坐在最右边
        seatedNums.add(seatNum - 1);
        if (i == seatOrLeave.length - 1) {
          // 如果只有两个位置
          return seatNum - 1;
        }
      } else if (seatedNums.size > 1 && seatedNums.size < seatNum) {
        // 坐到中间的位置
        let ints = new Array(seatedNums.size).fill(0);
        let count = 0;
        for (let seatedNum of seatedNums) {
          // 将已经坐过的位置存入到数组中
          ints[count++] = +seatedNum;
        }
        let maxLen = 0;
        let start = 0;
        for (let j = 0; j < ints.length - 1; j++) {
          // 计算最远距离
          let len = ints[j + 1] - ints[j];
          if (parseInt(len / 2) > maxLen) {
            maxLen = parseInt(len / 2);
            start = ints[j];
          }
        }
        seatedNums.add(start + maxLen); // 将对应的起始位置加上最远距离加入seatedNums
        if (i == seatOrLeave.length - 1) {
          return start + maxLen;
        }
      } else {
        // 位置坐满
        return -1;
      }
    } else {
      // 如果是负数，则将该座位移出
      seatedNums.delete(-op);
    }
  }
  return 0;
}

/**
 java
// 解法一

import java.util.Scanner;
import java.util.TreeSet;

public class Main {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int seatNum = in.nextInt();
        in.nextLine();
        String seat = in.nextLine();
        String[] c = seat.substring(1, seat.length() - 1).split(",");
        int[] seatOrLeave = new int[c.length];
        for (int i = 0; i < c.length; i++) {
            seatOrLeave[i] = Integer.parseInt(c[i]);
        }
        int ans = seatDistance(seatNum, seatOrLeave);
        System.out.print(ans);
    }

    public static int seatDistance(int seatNum, int[] seatOrLeave) {
        TreeSet<Integer> seatedNums = new TreeSet<>(); 
        for (int i = 0; i < seatOrLeave.length; i++) {
            int op = seatOrLeave[i];
            if (op > 0) {
                if (seatedNums.size() == 0) { 
                    if (i == seatOrLeave.length - 1) { 
                        return 0;
                    }
                    seatedNums.add(0);
                } else if (seatedNums.size() == 1) { 
                    seatedNums.add(seatNum - 1);
                    if (i == seatOrLeave.length - 1) { 
                        return seatNum - 1;
                    }
                } else if (seatedNums.size() < seatNum) {
                    int[] ints = new int[seatedNums.size()];
                    int count = 0;
                    for (Integer seatedNum : seatedNums) {
                        ints[count++] = seatedNum;
                    }
                    int maxLen = 0;
                    int start = 0;
                    for (int j = 0; j < ints.length - 1; j++) {
                        int len = ints[j + 1] - ints[j];
                        if (len / 2 > maxLen) {
                            maxLen = len / 2;
                            start = ints[j];
                        }
                    }
                    seatedNums.add(start + maxLen); 
                    if (i == seatOrLeave.length - 1) {
                        return start + maxLen;
                    }
                } else { 
                    return -1;
                }
            } else { 
                seatedNums.remove(-op);
            }
        }
        return 0;
    }
}

// 解法二

 import java.util.*;

public class maxSocialDistance {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int seatNum = in.nextInt();
        in.nextLine();
        String seat = in.nextLine();
        String[] c = seat.substring(1, seat.length() - 1).split(",");
        int[] seatOrLeave = new int[c.length];
        for (int i = 0; i < c.length; i++) {
            seatOrLeave[i] = Integer.parseInt(c[i]);
        }
        int ans = seatDistance(seatNum, seatOrLeave);
        System.out.print(ans);
    }
    public static int seatDistance(int seatNum, int[] seatOrLeave) {
        TreeSet<Integer> seatedNums = new TreeSet<>();  // 使用TreeSet有序集合记录被坐过的座位
        for (int i = 0; i < seatOrLeave.length; i++) {
            int op = seatOrLeave[i];
            if (op > 0) {
                if (seatedNums.size() == 0) {  // 如果是第一个坐
                    if (i == seatOrLeave.length - 1) {  // 如果只有一个位置
                        return 0;
                    }
                    seatedNums.add(0);
                } else if (seatedNums.size() == 1) {  // 第二个人进来，坐在最右边
                    seatedNums.add(seatNum - 1);
                    if (i == seatOrLeave.length - 1) {  // 如果只有两个位置
                        return seatNum - 1;
                    }
                } else if (seatedNums.size() > 1 && seatedNums.size() < seatNum) { // 坐到中间的位置
                    int[] ints = new int[seatedNums.size()];
                    int count = 0;
                    for (Integer seatedNum : seatedNums) {  // 将已经坐过的位置存入到数组中
                        ints[count++] = seatedNum;
                    }
                    int maxLen = 0;
                    int start = 0;
                    for (int j = 0; j < ints.length - 1; j++) {  // 计算最远距离
                        int len = ints[j + 1] - ints[j];
                        if (len / 2 > maxLen) {
                            maxLen = len / 2;
                            start = ints[j];
                        }
                    }
                    seatedNums.add(start + maxLen);  // 将对应的起始位置加上最远距离加入seatedNums
                    if (i == seatOrLeave.length - 1) {
                        return start + maxLen;
                    }
                } else {  // 位置坐满
                    return -1;
                }
            } else {  // 如果是负数，则将该座位移出
                seatedNums.remove(-op);
            }
        }
        return 0;
    }
}

 
 */

4;
2;
2;
1;
3;
5;

[0, 9][(0, 4, 9)][(0, 2, 9)];
5;

[1, 1, 1, 1, -4, 1];
10;
