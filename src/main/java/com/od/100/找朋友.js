/**
 找朋友
 
在学校中，N个小朋友站成一队， 第i个小朋友的身高为height[i]，
第i个小朋友可以看到的第一个比自己身高更高的小朋友j，那么j是i的好朋友(要求j > i)。
请重新生成一个列表，对应位置的输出是每个小朋友的好朋友位置，如果没有看到好朋友，请在该位置用0代替。
小朋友人数范围是 [0, 40000]。

输入描述:
第一行输入N，N表示有N个小朋友
第二行输入N个小朋友的身高height[i]，都是整数
输出描述:
输出N个小朋友的好朋友的位置

示例1
输入
2
100 95
输出
0 0
说明
第一个小朋友身高100，站在队尾位置，向队首看，没有比他身高高的小朋友，所以输出第一个值为0。
第二个小朋友站在队首，前面也没有比他身高高的小朋友，所以输出第二个值为0。
示例2
输入
8
123 124 125 121 119 122 126 123
输出
1 2 6 5 5 6 0 0
说明
123的好朋友是1位置上的124
124的好朋友是2位置上的125
125的好朋友是6位置上的126
以此类推

解题思路：
从第一个小朋友开始遍历，每个小朋友都从前一个小朋友开始向前遍历寻找比自己高的小朋友，找到则输出其位置，进入下一个小朋友的遍历，否则用0代替，接着进入下一个小朋友的遍历
 */

function findFriends(str1, str2) {
  let length = str1.trim();
  let splitArr = str2.trim().split(/\s+/g).map(Number);
  let list = [];
  for (let i = 0; i < length - 1; i++) {
    //最后一个直接跳过
    for (let j = i + 1; j < length; j++) {
      if (splitArr[j] > splitArr[i]) {
        list.push(j);
        break;
      }
      if (j == length - 1) {
        //到最后一位都没有符合的
        list.push(0);
      }
    }
  }
  list.push(0); //最后一位小朋友
  console.log(list.join(" "));
}
findFriends("2", "100 95");
findFriends("8", "123 124 125 121 119 122 126 123");
/**
 java

// 解法一

import java.util.Arrays;
import java.util.List;
import java.util.Scanner;
import java.util.stream.Collectors;

public class Main {
     public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        in.nextLine();
        List<Integer> highs = Arrays.stream(in.nextLine().split(" "))
                .map(Integer::parseInt)
                .collect(Collectors.toList());
        in.close();

        StringBuilder builder = new StringBuilder();

        for (int i = 0; i < highs.size(); i++) {
            int pos = 0;
            for (int j = i; j < highs.size(); j++) {
                if (highs.get(j) > highs.get(i)) {
                    pos = j;
                    break;
                }
            }
            builder.append(pos).append(" ");
        }

        System.out.println(builder.substring(0, builder.length() - 1));
    }
}


// 解法二

import java.util.Scanner;
public class Main{
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int m = sc.nextInt();
        int[][] map = new int[n][m];
        int maxNum = 0;
        int num[] = new int[n];
        for(int i = 0 ; i < n ; i ++){
            for(int j = 0; j < m ; j ++){
                map[i][j] =sc.nextInt(); 
            }
        }
        for(int i =0 ;i <n;i++){
            int[] hang = new int[m];
            int[] lie = new int[m];
            for(int j = i;j < n ; j ++){
                for(int k = 0;k<m;k++){
                    hang[k] = hang[k]+map[j][k];
                    maxNum =Math.max(maxNum,hang[k]);
                    lie[0] =hang[0];
                    for(int s=1;s<m;s++){
                        if(lie[s-1]<0){
                            lie[s] = hang[s];
                        }else{
                            lie[s] =lie[s-1]+hang[s];
                        }
                        maxNum = Math.max(maxNum,lie[s]);
                    }
                }
            }
        }
        System.out.println(maxNum);
    } 
}
 */
