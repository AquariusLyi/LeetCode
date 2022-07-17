/**
流水线

 工厂流水线最短时间优先调度算法问题

 
 一个工厂有m条流水线，来并行完成n个独立的作业，该工厂设置了一个调度系统。
在安排作业时，总是优先执行处理时间最短的作业。现给定流水线个数m，需要完成的作业数n
每个作业的处理时间分别为 t1,t2...tn  ，请你编程计算处理完所有作业的耗时为多少
当n>m时 首先处理时间短的m个作业进入流水线，其他的等待，当某个作业完成时，
依次从剩余作业中取处理时间最短的，进入处理。

输入描述：
第一行为两个整数(采取空格分隔)   分别表示流水线个数m和作业数n
第二行输入n个整数(采取空格分隔)   表示每个作业的处理时长 t1,t2...tn
0<m,n<100
0<t1,t2...tn<100

输出描述
输出处理完所有作业的总时长

案例
输入
3 5
8 4 3 2 10
输出
13
说明
先安排时间为2,3,4的三个作业，第一条流水线先完成作业，调度剩余时间最短的作业8
第二条流水线完成作业，调度剩余时间最短的作业10，总共耗时 就是二条流水线完成作业时间13(3+10)

3 9
1 1 1 2 3 4 6 7 8
13
 */

function getSumSecond(str1, str2) {
  let input = str1.trim().split(/\s+/g).map(Number);
  let splitArr = str2.trim().split(/\s+/g).map(Number);
  let num = input[0];
  let len = input[1];
  splitArr.sort((a, b) => a - b);
  let res = new Array(len).fill(0);
  //m条流水线，m个结果，取最大
  for (let i = 0; i < len; i++) {
    const ele = splitArr[i];
    res[i % num] += ele;
  }
  res.sort((a, b) => a - b);
  console.log(res[len - 1]);
}
getSumSecond("3 5", "8 4 3 2 10");
getSumSecond("3 9", "1 1 1 2 3 4 6 7 8");

/**
 java
解法一


import java.util.Arrays;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        int m=sc.nextInt(); //流水线
        int n=sc.nextInt();//作业数目
        int time[]=new int[n];
        for(int i=0;i<n;i++){
            time[i]=sc.nextInt();
        }
        System.out.println(caculate(m,n,time));
    }

    public static int caculate(int m,int n,int time[]){
        Arrays.sort(time);
        int sum[]=new int[m]; //m条流水线，m个结果，取最大
        for(int i=0;i<n;i++){
           sum[i%m]+=time[i];
        }
        int res=0;
        for(int j=0;j<m;j++){
            res=Math.max(res,sum[j]);
        }
        return res;
    }
}


解法二
 private static void work() {
    Scanner scanner = new Scanner(System.in);
    String[] split = scanner.nextLine().split("\\s+");
    // 流水线个数m
    int m = Integer.valueOf(split[0]);
    // 作业数n
    int n = Integer.valueOf(split[1]);
    String[] split1 = scanner.nextLine().split("\\s+");
    Integer[] arr = new Integer[split1.length];
    // 总工作量
    int total = 0;
    for (int i = 0; i < n; i++) {
        arr[i] = Integer.valueOf(split1[i]);
        total += arr[i];
    }
    Arrays.sort(arr);
    if (n == m) {
        System.out.println("n == m");
        int[] que = new int[m];
        for (int i = 0; i < m; i++) {
            // 将任务分配到流水线
            que[i] = que[i] + arr[i];
        }
        Arrays.sort(que);
        System.out.println(que[que.length-1]);
    } else if (n < m) {
        System.out.println("n < m");
        // 流水线数量m>作业数n
        int[] que = new int[n];
        for (int i = 0; i < n; i++) {
            // 将任务分配到流水线
            que[i] = que[i] + arr[i];
        }
        Arrays.sort(que);
        System.out.println(que[que.length-1]);
    } else {
        System.out.println("n > m");
        // 流水线数量m<作业数n
        int[] que = new int[m];
        int flag = 0;
        int index = 0;
        for (int i = 0; i < m; ) {
            // 将任务分配到流水线
            flag += arr[index];
            que[i] = que[i] + arr[index];
            if (flag == total) {
                break;
            }
            index++;
            i = (i + 1) % m;
        }
        Arrays.sort(que);
        System.out.println(que[que.length-1]);
    }
}

 */
