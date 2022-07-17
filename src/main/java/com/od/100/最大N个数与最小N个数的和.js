/**
最大N个数和最小N个数的和
最大N个数与最小N个数的和

给定一个数组，编写一个函数来计算它的最大N个数与最小N个数的和。你需要对数组进行去重。

说明：
*数组中数字范围[0, 1000]
*最大N个数与最小N个数不能有重叠，如有重叠，输入非法返回-1
*输入非法返回-1

说明
第一行输入M，M表示数组大小
第二行输入M个数，表示数组内容
第三行输入N表示需要计算的最大最小N的个数

输出描述
输出最大N个数和最小N个数的和
例一：
输入
5
95 88 83 64 100
2

输出
342

说明：最大2个数[100 95] 最小2个数[83 64]，输出342

例二
输入
5
3 2 3 4 2
2

输出
-1
说明：最大两个数是[4 3]最小2个数是[3 2]，有重叠输出为-1
 */

function getSum(str1, str2, str3) {
  const len = +str1.trim();
  const num = +str3.trim();
  const splitArr = str2.trim().split(/\s+/g).map(Number);
  let set = new Set();
  splitArr.forEach((element) => {
    set.add(element);
  });
  if (set.size < 2 * num) {
    console.log(-1);
    return;
  }
  let arr = Array.from(set).sort((a, b) => a - b);
  let sum = 0;
  for (let i = 0; i < num; i++) {
    sum += arr[i] + arr[set.size - i - 1];
  }
  console.log(sum);
}
getSum("5", "95 88 83 64 100", "2");
getSum("5", "3 2 3 4 2", "2");

/**
 
import java.util.Scanner;
import java.util.TreeSet;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int size = scanner.nextInt();
        if (size < 2) {
            System.out.println(-1);
            return;
        }
        int[] array = new int[size];
        for (int i = 0; i < size; i++) {
            array[i] = scanner.nextInt();
        }
        int length = scanner.nextInt();

        if (length < 0 || length > size / 2) {
            System.out.println(-1);
            return;
        }

        // sort
        TreeSet<Integer> set = new TreeSet<>();
        for (int i = 0; i < size; i++) {
            set.add(array[i]);
        }

        int newSize = set.size();
        if (length > newSize / 2) {
            System.out.println(-1);
            return;
        }

        Object[] newArray = set.toArray();
        int result = 0;
        for (int i = 0; i < length; i++) {
            result += (int) newArray[i] + (int) newArray[newSize - 1 - i];
        }
        System.out.println(result);
    }
}

// 解法二

import java.util.ArrayList;
import java.util.Scanner;
import java.util.TreeSet;
public class Main5 {
    public static void main(String[] args) {
      Scanner in = new Scanner(System.in);
        int m = Integer.parseInt(in.nextLine());
        String[] numsStr = in.nextLine().split(" ");
        int n = Integer.parseInt(in.nextLine());
        in.close();

        TreeSet<Integer> ints = new TreeSet<>();
        for (String s : numsStr) {
            ints.add(Integer.parseInt(s));
        }

        int res = -1;

        if (ints.size() >= 2 * n) {
            res = 0;
            ArrayList<Integer> list = new ArrayList<>(ints);
            for (int i = 0; i < list.size(); i++) {
                if (i < n || i > list.size()-1 - n) {
                    res += list.get(i);
                }
            }
        }
        System.out.println(res);
    }
}

// 用TreeSet直接去重并排序，只是获取元素的时候仍需转为list

import java.util.*;

public class arraySum {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int n = in.nextInt();
        TreeSet<Integer> set = new TreeSet<>();
        for (int i = 0; i < n; i++) {
            int num = in.nextInt();
            set.add(num);
        }
        int N = in.nextInt();
        if (set.size() < 2 * N) {
            System.out.println(-1);
            return ;
        }
        ArrayList<Integer> list = new ArrayList<>(set);
        int sum = 0;
        for (int i = 0; i < N; i++) {
            sum += (list.get(i) + list.get(list.size() - 1 - i));
        }
        System.out.println(sum);
    }
}

 */
