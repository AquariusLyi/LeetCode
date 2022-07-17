/**
用户调度问题

在通信系统中，一个常见的问题是对用户进行不同策略的调度，会得到不同的系统消耗和性能。

假设当前有n个待串行调度用户，每个用户可以使用A/B/C三种不同的调度策略，不同的策略会消耗不同的系统资源。请你根据如下规则进行用户调度，并返回总的消耗资源数。

规则：

1.    相邻的用户不能使用相同的调度策略，例如，第1个用户使用了A策略，则第2个用户只能使用B或者C策略。

2.    对单个用户而言，不同的调度策略对系统资源的消耗可以归一化后抽象为数值。例如，某用户分别使用A/B/C策略的系统消耗分别为15/8/17。

3.    每个用户依次选择当前所能选择的对系统资源消耗最少的策略（局部最优），如果有多个满足要求的策略，选最后一个。

输入描述:

第一行表示用户个数n

接下来每一行表示一个用户分别使用三个策略的系统消耗resA resB resC

输出描述:

最优策略组合下的总的系统资源消耗数

示例1   输入输出示例仅供调试，后台判题数据一般不包含示例

输入
3
15 8 17
12 20 9
11 7 5

输出
24

说明
1号用户使用B策略，
2号用户使用C策略，
3号用户使用B策略。
系统资源消耗: 8 + 9 + 7 = 24。

备注:

所有策略对系统的资源消耗均为正整数，n < 1000


https://www.cnblogs.com/Jukim/p/16056219.html

//   let input = new Array(); // 一维数组
//   for (let i = 0; i < num; i++) {
//     input[i] = new Array();  // 二维数组
//     for (let j = 0; j < 3; j++) {
//       input[i][j] = 0;
//     }
//   }

 */
diaodu();
function diaodu() {
  let num = +readline().trim();
  let input = new Array(num).fill("").map(() => new Array(3).fill(0));
  for (let i = 0; i < num; i++) {
    let temp = readline().trim().split(/\s+/).map(Number);
    for (let j = 0; j < 3; j++) {
      input[i][j] = temp[j];
    }
  }
  let preIdx = -1;
  let sum = 0;
  let i = 0;
  while (i < num) {
    let min = 0;
    let curMinIdx = 0;
    for (let j = 0; j < 3; j++) {
      if ((min == 0 && preIdx != j) || (input[i][j] <= min && preIdx != j)) {
        min = input[i][j];
        curMinIdx = j;
      }
    }
    preIdx = curMinIdx;
    sum += min;
    i++;
  }
  console.log(sum);
}

/**
 java 
解法1


import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        while (scanner.hasNextInt()) {
            int num = scanner.nextInt();
            int[][] input = new int[num][3];
            for (int i = 0; i < num; i++) {
                for (int j = 0; j < 3; j++) {
                    input[i][j] = scanner.nextInt();
                }
            }
            int preIdx = -1;
            long sum = 0;
            for (int i = 0; i < num; i++) {
                int min = 0;
                int curMinIdx = 0;
                for (int j = 0; j < 3; j++) {
                    if ((min == 0 && preIdx != j) ||
                            (input[i][j] <= min && preIdx != j)) {
                        min = input[i][j];
                        curMinIdx = j;
                    }
                }
                preIdx = curMinIdx;
                sum += min;
            }
            System.out.println(sum);
        }
    }
}


解法2
 
 import java.util.*;

public class Demo14 {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int N = Integer.parseInt(sc.nextLine());

        ArrayList<TreeMap<Integer, Integer>> mapList = new ArrayList<>();
        for(int i = 0; i < N; i++){
            String[] split = sc.nextLine().split(" ");
            TreeMap<Integer, Integer> map = new TreeMap<>();
            for(int j = 0; j < split.length; j++){
                map.put(Integer.parseInt(split[j]), j);
            }
            mapList.add(map);
        }

        int[] sum = new int[3];
         //保证第一个用户每一种策略都使用，并不按最小值来
        ArrayList<Integer> keyList = new ArrayList<>(mapList.get(0).keySet());
        for(int i = 0; i < 3; i++){
            Integer res1 = keyList.get(i);
            sum[i] = res1;
            Integer type1 = mapList.get(0).get(res1);

            //其它用户根据在类型不同的情况下，选择调度消耗最小的。
            for(int j = 1; j < N; j++){
                ArrayList<Integer> keyNList = new ArrayList<>(mapList.get(j).keySet());
                Integer resN = keyNList.get(0);
                Integer typeN = mapList.get(j).get(resN);

                if(typeN != type1){ //当调度类型不同时直接相加
                    sum[i] += resN;
                    type1 = typeN;
                }else{
                    resN = keyNList.get(1); //相同时，那么下标为1的必定类型不同
                    sum[i] += resN;
                    type1 = mapList.get(j).get(resN);
                }
            }
        }

        //因为第一个用户每一种策略都操作了，故选择其中最小值就是所求。
        int min = Integer.MAX_VALUE;
        for(int i : sum){
            if(i < min)  min = i;
        }
        System.out.println(min);
    }
}
 */
