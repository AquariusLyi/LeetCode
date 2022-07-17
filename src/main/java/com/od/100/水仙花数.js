/**
 水仙花数

所谓水仙花数，是指一个n位的正整数，其各位数字的n次方和等于该数本身。例如153是水仙花数，153是一个3位数，并且153 = 1^3 + 5^3 + 3^3。

输入描述:
第一行输入一个整数n，表示一个n位的正整数。n在3到7之间，包含3和7。
第二行输入一个正整数m，表示需要返回第m个水仙花数。
输出描述:
返回长度是n的第m个水仙花数。个数从0开始编号。
若m大于水仙花数的个数，返回最后一个水仙花数和m的乘积。
若输入不合法，返回-1。

示例1
输入
3
0
输出
153
说明
153是第一个水仙花数

示例2
输入
9
1
输出
-1
说明
9超出范围

 */

function shuixianhua() {
  let N = +readline().trim();
  let M = +readline().trim();

  if (N < 3 || N > 7) {
    console.log(-1);
    return;
  }

  let res = [];

  let start = Math.pow(10, N - 1);
  let end = Math.pow(10, N);

  for (let i = start; i < end; i++) {
    let sum = 0;
    let bit = start;
    while (bit != 1) {
      sum += Math.pow(Math.floor(i / bit) % 10, N);
      bit = Math.floor(bit / 10);
    }
    sum += Math.pow(i % 10, N);
    if (sum == i) {
      res.push(i);
    }
    if (res.length == M + 1) {
      console.log(i);
      return;
    }
  }

  if (M > res.length) {
    console.log(M * res[res.length - 1]);
  }
}

/**
 java


import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class Main{
      public static void main(String[] args) {
        //水仙数个数
        calcute1();
    }
    
       public static void calcute1(){
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();//位数
        if (n >= 3 && n <= 7){
            int m = sc.nextInt();//第几个
            int temp = 1;
            for (int i = 0 ; i < n ; i ++){
                temp *= 10;
            }
            int min = temp / 10;
            int max = temp- 1;
            Map<Integer, Integer> data = new HashMap<>();
            int count = 0;
            int lastNum = 0;
            for (int i = min ; i <= max ; i ++){
                if (isRightNum(i, n)) {
                    data.put(count++, i);
                    if (i > lastNum){
                        lastNum = i;
                    }
                }
            }
            if (data.containsKey(m)){
                System.out.println(data.get(m));
            } else {
                System.out.println(lastNum * m);
            }
        } else {
            System.out.println(-1);
        }
    }

    public static boolean isRightNum(int num, int n){
        boolean result = false;
        String[] numStrs = String.valueOf(num).split("");
        int[] data = new int[numStrs.length];
        for (int i = 0 ; i < numStrs.length; i ++){
            data[i] = Integer.parseUnsignedInt(numStrs[i]);
        }
        int sum = 0;
        for (int i = 0 ; i < n ; i ++){
            sum += getCalcuteNum(data[i], n);
        }
        if (sum == num){
            result = true;
        }
        return result;
    }

    public static int getCalcuteNum(int a, int b){
        int result = 1;
        for (int i = 0; i < b ; i ++){
            result *=a;
        }
        return result;
    }
}


// 解法二

import java.util.LinkedList;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);

        int N = Integer.parseInt(in.nextLine());
        int M = Integer.parseInt(in.nextLine());
        in.close();

        if (N < 3 || N > 7) {
            System.out.println(-1);
            return;
        }

        LinkedList<Integer> res = new LinkedList<>();

        int start = (int) Math.pow(10, N - 1);
        int end = (int) Math.pow(10, N);

        for (int i = start; i < end; i++) {
            int sum = 0;
            int bit = start;
            while (bit != 1) {
                sum += Math.pow(i / bit % 10, N);
                bit /= 10;
            }
            sum += Math.pow(i % 10, N);
            if (sum == i) {
                res.add(i);
            }
            if (res.size() == M + 1) {
                System.out.println(i);
                return;
            }
        }

        if (M > res.size()) {
            System.out.println(M * res.getLast());
        }

    }
}

 */
