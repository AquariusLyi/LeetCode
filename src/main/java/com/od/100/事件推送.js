/**
■ 题目描述

【事件推送】

同一个数轴X上有两个点的集合A={A1, A2, …, Am}和B={B1, B2, …, Bn}，Ai和Bj均为正整数，A、B已经按照从小到大排好序，

A、B均不为空，给定一个距离R(正整数)，列出同时满足如下条件的所有（Ai, Bj）数对…

1)Ai<= Bj
2)Ai, Bj之间的距离小于等于R
3)在满足1) 2)的情况下,每个Ai只需输出距离最近的Bj
4)输出结果按Ai从小到大的顺序排序

输入描述

第一行三个正整数m,n,R

第二行m个正整数,表示集合A

第三行n个正整数,表示集合B

输入限制

1<=R<=100000, 1<=n,m<=100000, 1<=Ai,Bj<=1000000000

输出描述

每组数对输出一行Ai和Bj,以空格隔开

示例1   输入输出示例仅供调试，后台判题数据一般不包含示例

输入

4 5 5
1 5 5 10
1 3 8 8 20

输出

1 1
5 8
5 8

 */

function niuke() {
  let splitA = readline().trim().split(/\s+/g).map(Number);
  let splitB = readline().trim().split(/\s+/g).map(Number);
  let splitC = readline().trim().split(/\s+/g).map(Number);
  let m = splitA[0];
  let n = splitA[1];
  let R = splitA[2];
  for (let i = 0; i < splitB.length; i++) {
    const eleB = splitB[i];
    for (let j = 0; j < splitC.length; j++) {
      const eleC = splitC[j];
      if (eleB <= eleC && eleC - eleB <= R) {
        console.log(eleB + " " + eleC);
        break;
      }
    }
  }
}

// 解法二
function method() {
  let m = Number(readline());
  let n = Number(readline());
  let R = Number(readline());
  // let m = Number("4");
  // let n = Number("5");
  // let R = Number("5");

  let a = readline()
    .split(" ")
    .map((i) => parseInt(i));
  let b = readline()
    .split(" ")
    .map((i) => parseInt(i));
  // let a = "1 5 5 10".split(" ").map(i=>parseInt(i));
  // let b = "1 3 8 8 20".split(" ").map(i=>parseInt(i));

  let list = [];

  for (let i = 0; i < a.length; i++) {
    //遍历A数组

    let ints = []; //用来放置A、B数字
    let index = 0; //B数组下标
    while (index < b.length) {
      //
      if (a[i] <= b[index] && b[index] - a[i] <= R) {
        ints[0] = a[i];
        ints[1] = b[index];
        list.push(ints);
        break;
      }
      index++; //因为两数组都是从大到小排列，index可以公用
    }
  }

  list.forEach((e) => {
    console.log(e[0] + " " + e[1]);
  });
}

// 解法一
function getNewResult(str1, str2, str3) {
  let splitA = str1.trim().split(/\s+/g).map(Number);
  let splitB = str2.trim().split(/\s+/g).map(Number);
  let splitC = str3.trim().split(/\s+/g).map(Number);
  let m = splitA[0];
  let n = splitA[1];
  let R = splitA[2];
  for (let i = 0; i < splitB.length; i++) {
    const eleB = splitB[i];
    for (let j = 0; j < splitC.length; j++) {
      const eleC = splitC[j];
      if (eleB <= eleC && eleC - eleB <= R) {
        console.log(eleB + " " + eleC);
        break;
      }
    }
  }
}
getNewResult("  4 5 5", " 1 5 5 10", " 1 3 8 8 20");

/**
 java

 import java.util.Arrays;
import java.util.List;
import java.util.Scanner;
import java.util.stream.Collectors;
public class Main13 {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        String[] split = in.nextLine().split(" ");
        int R = Integer.parseInt(split[2]);
        List<Integer> A = Arrays.stream(in.nextLine().split(" "))
                .map(Integer::parseInt)
                .collect(Collectors.toList());

        List<Integer> B = Arrays.stream(in.nextLine().split(" "))
                .map(Integer::parseInt)
                .collect(Collectors.toList());
        in.close();

        for (int Ai : A) {
            for (int Bj : B) {
                if (Ai <= Bj && Bj - Ai <= R) {
                    System.out.println(Ai + " " + Bj);
                    break;
                }
            }
        }

    }
}

 */

// 解法一

var closeElement1 = function (array_a, array_b, r) {
  let rank = r; // 最大距离
  let len_a = array_a.length;
  let len_b = array_b.length;

  // 因为是从小到大有序的，而且要求输出距离最近的Bj,所以省去了很多情况
  for (let i = 0; i < len_a; i++) {
    for (let j = 0; j < len_b; j++) {
      if (array_a[i] <= array_b[j] && array_b[j] - array_a[i] < rank) {
        console.log(array_a[i] + " " + array_b[j]);
        break;
      }
    }
  }
};

closeElement1([1, 5, 5, 10], [1, 3, 8, 8, 20], 5);

var closeElemen2 = function (array_a, array_b, r) {
  let rank = r; // 最大距离
  let a_point = 0;
  let b_point = 0;
  let len_a = array_a.length;
  let len_b = array_b.length;
  let result = []; // 存放结果

  while (a_point < len_a && b_point < len_b) {
    let val = array_b[b_point] - array_a[a_point];

    if (0 <= val && val <= rank) {
      console.log(array_a[a_point], array_b[b_point]);
      a_point += 1;
      b_point += 1;
    } else if (val < 0) {
      // a数组的值大了
      b_point += 1;
    } else {
      a_point += 1;
    }
  }
};

closeElemen2([1, 5, 5, 10], [1, 3, 8, 8, 20], 5);

/*
      同一个数轴x有两个点的集合A={A1,A2,...,Am}和B={B1,B2,...,Bm}
      A(i)和B(j)均为正整数
      A、B已经按照从小到大排好序，AB均不为空
      给定一个距离R 正整数，列出同时满足如下条件的
      (A(i),B(j))数对
      1. A(i)<=B(j)
      2. A(i),B(j)之间距离小于等于R
      3. 在满足1，2的情况下每个A(i)只需输出距离最近的B(j)
      4. 输出结果按A(i)从小到大排序

      输入描述
      第一行三个正整数m n R
      第二行m个正整数 表示集合A
      第三行n个正整数 表示集合B

      输入限制 1<=R<=100000
      1<=n,m<=100000
      1<= A(i),B(j) <= 1000000000

      输出描述
      每组数对输出一行 A(i)和B(j)
      以空格隔开

      示例一
      输入
      4 5 5
      1 5 5 10
      1 3 8 8 20

      输出
      1 1
      5 8
      5 8

       */

/**
 import java.util.Arrays;
import java.util.List;
import java.util.Scanner;
import java.util.stream.Collectors;


public class Main13 {
  public static void main(String[] args) {
      
      Scanner in = new Scanner(System.in);
      String[] split = in.nextLine().split(" ");
      int R = Integer.parseInt(split[2]);
      List<Integer> A = Arrays.stream(in.nextLine().split(" "))
              .map(Integer::parseInt)
              .collect(Collectors.toList());

      List<Integer> B = Arrays.stream(in.nextLine().split(" "))
              .map(Integer::parseInt)
              .collect(Collectors.toList());
      in.close();

      for (int Ai : A) {
          for (int Bj : B) {
              if (Ai <= Bj && Bj - Ai <= R) {
                  System.out.println(Ai + " " + Bj);
                  break;
              }
          }
      }

  }
}
 */
