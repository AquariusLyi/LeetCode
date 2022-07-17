/**
 考勤信息
 
 ■ 题目描述

【考勤信息】

公司用一个字符串来表示员工的出勤信息

absent：缺勤

late：迟到

leaveearly：早退

present：正常上班

现需根据员工出勤信息，判断本次是否能获得出勤奖，能获得出勤奖的条件如下：

缺勤不超过一次；

没有连续的迟到/早退；

任意连续7次考勤，缺勤/迟到/早退不超过3次。

输入描述

用户的考勤数据字符串，记录条数 >= 1；

输入字符串长度 < 10000；

不存在非法输入

如：

2

present

present absent present present leaveearly present absent

输出描述

根据考勤数据字符串，如果能得到考勤奖，输出”true”；否则输出”false”，

对于输入示例的结果应为：

true false

示例1 输入输出示例仅供调试，后台判题数据一般不包含示例

输入

2

present

present present

输出

true

true

示例2 输入输出示例仅供调试，后台判题数据一般不包含示例

输入

2

present

present absent present present leaveearly present absent

输出

true

false

思路分析
感觉题目有点怪，一行是一个月的考勤吗？
不管是否符合实际，就是根据得出勤奖的条件判断，并打印结果。
参考代码
注：题目网上找的，参考代码是练习用，仅供参考，并不保证用例通过率。
————————————————
版权声明：本文为CSDN博主「巨坚强」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/AOBO516/article/details/125228558

 */

// 解法一

/**
 * 华为机试：根据员工出勤信息,判断本次是否能获得出勤奖
 */
function kaoqin1() {
  let n = parseInt(readline().trim());
  let records = [];
  for (let i = 0; i < n; i++) {
    let s = readline().trim();
    records[i] = s;
  }
  let res = [];
  for (let record of records) {
    res.push(extracted(record.split(" ")));
  }
  console.log(res);
}

function extracted(s) {
  // 1.缺勤不超过1次
  for (let j = 0; j < s.length; j++) {
    if ("absent".includes(s[j])) {
      return false;
    }
  }

  // 2.没有连续的迟到/早退
  if (s.length >= 2) {
    for (let i = 1; i < s.length; i++) {
      let yesterday = s[i - 1];
      let today = s[i];
      if (
        ("late".includes(yesterday) || "leaveearly".includes(yesterday)) &&
        ("late".includes(today) || "leaveearly".includes(today))
      ) {
        return false;
      }
    }
  }

  // 3.任意连续7次考勤 缺勤/迟到/早退 不超过3次
  if (s.length >= 7) {
    for (let i = 0; i < s.length; i++) {
      let count = 0;
      if (i + 7 > s.length) {
        break;
      }
      for (let j = i; j < i + 7; j++) {
        let today = s[j];
        if (
          "absent".includes(today) ||
          "late".includes(today) ||
          "leaveearly".includes(today)
        ) {
          count++;
          if (count >= 3) {
            return false;
          }
        }
      }
    }
  }
  return true;
}

// 解法二

function kaoqin2() {
  let cnt = parseInt(readline().trim());
  let arr = [];
  for (let i = 0; i < cnt; i++) {
    let s = readline().trim();
    arr[i] = s;
  }
  let sb = "";
  for (let i = 0; i < cnt; i++) {
    if (arr[i] == null || arr[i].length == 0) break;
    let split = arr[i].split(/\s+/);
    let absentCnt = 0;
    let lastLastOrEarly = -1;
    let flag = false;
    for (let j = 0; j < split.length; j++) {
      if ("absent".includes(split[j].toLowerCase())) {
        absentCnt++;
        if (absentCnt >= 2) {
          sb = sb.concat("false ");
          flag = true;
          break;
        }
      } else if (
        "late".includes(split[j].toLowerCase()) ||
        "leaveearly".includes(split[j].toLowerCase())
      ) {
        if (lastLastOrEarly == -1) {
          lastLastOrEarly = j;
        } else {
          if (j - lastLastOrEarly == 1) {
            sb = sb.concat("false ");
            flag = true;
            break;
          } else lastLastOrEarly = j;
        }
      }

      let b = judge7C(split, j);
      if (!b) {
        sb = sb.concat("false ");
        flag = true;
        break;
      }
    }
    if (!flag) sb = sb.concat("true ");
  }
  console.log(sb.toString().trim());
}

function judge7C(split, now) {
  let cnt = 0;
  if (now < 7) {
    for (let i = 0; i <= now; i++) {
      let s = split[i];
      if (
        "absent".includes(s) ||
        "late".includes(s) ||
        "leaveearly".includes(s)
      ) {
        cnt++;
      }
    }
  } else {
    for (let i = now - 6; i <= now; i++) {
      let s = split[i];
      if (
        "absent".includes(s) ||
        "late".includes(s) ||
        "leaveearly".includes(s)
      ) {
        cnt++;
      }
    }
  }
  return cnt <= 3;
}

/**
 package com.amoscloud.newcoder.easy;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Scanner;
import java.util.stream.Collectors;

public class Main54 {
   
    public static void main(String[] args) {
      Scanner in = new Scanner(System.in);
      int n = Integer.parseInt(in.nextLine());
      ArrayList<List<String>> days = new ArrayList<>();
      for (int i = 0; i < n; i++) {
        String[] split = in.nextLine().split(" ");
        List<String> list = Arrays.stream(split)
            .collect(Collectors.toList());
        days.add(list);
      }
      in.close();
  
      StringBuilder sb = new StringBuilder();
  
      for (List<String> day : days) {
  
        //1.缺勤超过1次
        long absent = day.stream()
            .filter(x -> x.equals("absent"))
            .count();
        if (absent > 1) {
          sb.append("false").append(" ");
          continue;
        }
  
        //2.没有连续的迟到/早退
        boolean flag = true;
        for (int i = 0; i < day.size() - 1; i++) {
          String cur = day.get(i);
          String next = day.get(i + 1);
          if (("late".equals(cur) ||
              "leaveearly".equals(cur)) &&
              ("late".equals(next) ||
                  "leaveearly".equals(next))) {
            flag = false;
            break;
          }
        }
        if (!flag) {
          sb.append(flag).append(" ");
          continue;
        }
  
        //3.任意连续7次考勤 缺勤/迟到/早退 不超过3次
        int[] ints = new int[day.size()];
        for (int i = 0; i < day.size(); i++) {
          ints[i] = "present".equals(day.get(i)) ? 0 : 1;
        }
        if (ints.length <= 7 && Arrays.stream(ints).sum() >= 3) {
          sb.append("false").append(" ");
        } else {
          flag = true;
          for (int i = 0; i < ints.length - 7; i++) {
            int[] subArr = Arrays.copyOfRange(ints, i, i + 7);
            if (Arrays.stream(subArr).sum() >= 3) {
              flag = false;
              break;
            }
          }
          sb.append(flag).append(" ");
        }
      }
  
      System.out.println(sb.substring(0, sb.length() - 1));
  
    }
  }

  // 解法二



import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Scanner;
import java.util.stream.Collectors;


public class Main {
 public static void main(String[] args) {
    Scanner in = new Scanner(System.in);
    int n = Integer.parseInt(in.nextLine());
    ArrayList<List<String>> days = new ArrayList<>();
    for (int i = 0; i < n; i++) {
      String[] split = in.nextLine().split(" ");
      List<String> list = Arrays.stream(split)
          .collect(Collectors.toList());
      days.add(list);
    }
    in.close();

    StringBuilder sb = new StringBuilder();

    for (List<String> day : days) {

      //1.缺勤超过1次
      long absent = day.stream()
          .filter(x -> x.equals("absent"))
          .count();
      if (absent > 1) {
        sb.append("false").append(" ");
        continue;
      }

      //2.没有连续的迟到/早退
      boolean flag = true;
      for (int i = 0; i < day.size() - 1; i++) {
        String cur = day.get(i);
        String next = day.get(i + 1);
        if (("late".equals(cur) ||
            "leaveearly".equals(cur)) &&
            ("late".equals(next) ||
                "leaveearly".equals(next))) {
          flag = false;
          break;
        }
      }
      if (!flag) {
        sb.append(flag).append(" ");
        continue;
      }

      //3.任意连续7次考勤 缺勤/迟到/早退 不超过3次
      int[] ints = new int[day.size()];
      for (int i = 0; i < day.size(); i++) {
        ints[i] = "present".equals(day.get(i)) ? 0 : 1;
      }
      if (ints.length <= 7 && Arrays.stream(ints).sum() >= 3) {
        sb.append("false").append(" ");
      } else {
        flag = true;
        for (int i = 0; i < ints.length - 7; i++) {
          int[] subArr = Arrays.copyOfRange(ints, i, i + 7);
          if (Arrays.stream(subArr).sum() >= 3) {
            flag = false;
            break;
          }
        }
        sb.append(flag).append(" ");
      }
    }

    System.out.println(sb.substring(0, sb.length() - 1));

  }
}


import java.util.*;
import java.util.ArrayList;
import java.util.Scanner;

根据员工出勤信息,判断本次是否能获得出勤奖
 public class Main {
  public static void main(String[] args) {
      Scanner scanner = new Scanner(System.in);
      int n = scanner.nextInt();
      scanner.nextLine();


      String[] records = new String[n];
      for (int i = 0; i < n; i++) {
          records[i] = scanner.nextLine();
      }

      ArrayList<String> res = new ArrayList<>(n);
      for (String record : records) {
          res.add(String.valueOf(extracted(record.split(" "))));
      }

      System.out.println(String.join(" ", res));
  }

  private static boolean extracted(String[] s) {
      // 1.缺勤不超过1次
      for (int j = 0; j < s.length; j++) {
          if ("absent".equals(s[j])) {
              return false;
          }
      }

      // 2.没有连续的迟到/早退
      if (s.length >= 2) {
          for (int i = 1; i < s.length; i++) {
              String yesterday = s[i - 1];
              String today = s[i];
              if (("late".equals(yesterday) || "leaveearly".equals(yesterday))
                      && ("late".equals(today) || "leaveearly".equals(today))) {
                  return false;
              }
          }
      }

      // 3.任意连续7次考勤 缺勤/迟到/早退 不超过3次
      if (s.length >= 7) {
          for (int i = 0; i < s.length; i++) {
              int count = 0;
              if (i + 7 > s.length) {
                  break;
              }
              for (int j = i; j < i + 7; j++) {
                  String today = s[j];
                  if ("absent".equals(today) || "late".equals(today) || "leaveearly".equals(today)) {
                      count++;
                      if (count >= 3) {
                          return false;
                      }
                  }
              }
          }
      }
      return true;
  }
}
 */
