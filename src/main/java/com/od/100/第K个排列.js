/**
第k个排列

给定参数n，从1到n会有n个整数：1,2,3,…,n，这n个数字共有 n! 种排列。
按大小顺序升序列出所有排列情况，并一一标记，当 n = 3 时, 所有排列如下：
“123”
“132”
“213”
“231”
“312”
“321”
给定 n 和 k，返回第 k 个排列。

输入描述:
输入两行，第一行为n，第二行为k，给定 n 的范围是 [1,9]，给定 k 的范围是[1,n!]。
输出描述:
输出排在第k位置的数字。

示例1：
输入
3
3
输出
213

说明
3的排列有123 132 213…，那么第3位置的为213


示例2：
输入
2
2
输出
21

说明
2的排列有12 21，那么第2位置的为21


解题思路：
这是一道全排列的变种问题，给定参数n表示1~n范围内的整数。求所有排列，再根据参数k得到所有排列中的第k个元素。

这里需要注意第k个元素转换成索引形式应该是k-1，得到所有全排列的结果集res，返回res[k-1]就是题目要求返回的结果。
————————————————
版权声明：本文为CSDN博主「G1useppE」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/G1useppE/article/details/125012501
 */

function factorials(str1, str2) {
  let n = str1.trim();
  let k = str2.trim();
  let res = [];
  let path = [];
  let arr = [];
  for (let i = 1; i <= n; i++) {
    arr.push(i);
  }
  const used = new Array(arr.length).fill(false);
  backTracking();
  let result = res[k - 1];
  console.log(result.join(""));
  //求全排列的函数
  function backTracking() {
    if (path.length == arr.length) {
      res.push(Array.from(path));
      return;
    }
    for (let i = 0; i < arr.length; i++) {
      if (used[i]) {
        continue;
      }
      path.push(arr[i]);
      used[i] = true;
      backTracking();
      used[i] = false;
      path.pop();
    }
  }
}

factorials("3", "3"); //结果为:[ 2, 1, 3 ]
factorials("2", "2"); //结果为:[ 2, 1]

/**
 java

 public class Main{
 
    public static List<Integer> list = new ArrayList<>();
 
    public static void main(String[] args) {
 
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int k = sc.nextInt();
 
        int[] ints = new int[n];
        for(int i=0;i<n;i++){
            ints[i] = i+1;
        }
 
         //  cursor:从第一个数开始
         fullArray(ints,0,n-1);
 
         list.sort((a,b)->{  //对list进行升序排序
            return b>a ? -1: 1;
         });
  
         System.out.println(list.get(k-1));
  
     }
  
     public static void swap(int[] arr,int a,int b){
         int temp = arr[a];
         arr[a] = arr[b];
         arr[b] = temp;
     }
  
      //  这是经典的全排列递归算法
      //   需要排列的数组
      //   初始位置
      // 结束位置
     private static void fullArray(int[] array, int cursor, int end) {
         if (cursor == end) {    //此次排列完成
             String s = "";
             for (int a:array) {
                 s+=a;
             }
             list.add(Integer.parseInt(s));
         } else {
             for (int i = cursor; i <= end; i++) {
                 swap(array, cursor, i); //将数组下标为cursor和下标为i的数据进行交换
                 fullArray(array, cursor + 1, end);
                 swap(array, cursor, i); // 用于对之前交换过的数据进行还原
             }
         }
     }
  
 }

 */
/**
 java

 
import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int k = sc.nextInt();
        List<Integer> list = new ArrayList<>();
        int[] arr = new int[n + 1];
        arr[0] = 1;
        for (int i = 1; i <= n; i++) {
            list.add(i);
            arr[i] = arr[i - 1] * i;
        }
        k--;
        StringBuffer stringBuffer = new StringBuffer();
        for (int i = n - 1; i >= 0; i--) {
            int index = k / arr[i];
            stringBuffer.append(list.remove(index));
            k -= index * arr[i];
        }
        System.out.println(stringBuffer.toString());
    }
}
 */

/**
 java
 
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Scanner;
import java.util.TreeSet;
import java.util.stream.Collectors;

 public class Main20 {

    static TreeSet<String> set = new TreeSet<>();

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int n = Integer.parseInt(in.nextLine());
        int k = Integer.parseInt(in.nextLine());
        in.close();
        Integer[] arr = new Integer[n];
        for (int i = 0; i < n; i++) {
            arr[i] = i+1;
        }
        perm(arr, 0, n - 1);
        String res = new ArrayList<>(set).get(k - 1);
        System.out.println(res);

    }

    public static void perm(Integer[] array, int start, int end) {

        if (start == end) {
            String num = Arrays.toString(array).replaceAll("\\W+", "");
            set.add(num);
        } else {
            for (int i = start; i <= end; i++) {
                swap(array, start, i);
                perm(array, start + 1, end);
                swap(array, start, i);
            }
        }
    }

    public static void swap(Integer[] array, int i, int j) {
        int temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}


 */
