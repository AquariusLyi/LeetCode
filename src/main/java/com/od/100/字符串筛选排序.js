/**
 
字符串筛选排序

输入一个由n个大小写字母组成的字符串，按照Ascii码值从小到大的排序规则，查找字符串中第k个最小ascii码值的字母（k>=1），输出该字母所在字符串的位置索引(字符串的第一个字符位置索引为0）。
k如果大于字符串长度，则输出最大ascii值的字母所在字符串的位置索引，如果有重复的字母，则输出字母的最小位置索引。

输入描述:
第一行输入一个由大小写字母组成的字符串
第二行输入k，k必须大于0，k可以大于输入字符串的长度
输出描述:
输出字符串中第k个最小ascii码值的字母所在字符串的位置索引。k如果大于字符串长度，则输出最大ascii值的字母所在字符串的位置索引，如果第k个最小ascii码值的字母存在重复，则输出该字母的最小位置索引。

示例1
输入
AbCdeFG
3
输出
5
说明
根据ascii码值排序，第3个最小ascii码值的字母为F，F在字符串中的位置索引为5（0为字符串的第一个字母位置索引）
示例2
输入
fAdDAkBbBq
4
输出
6
说明
根据ascii码值排序，前4个字母为AABB ，由于B重复，则只取B的（第一个）最小位置索引6 ，而不是第二个B的位置索引8

 */

function strSort() {
  let line = readline().trim();
  let list = line.split("");
  let k = +readline().trim();
  list.sort((a, b) => a.charCodeAt() - b.charCodeAt());
  let res = k >= list.length ? list[list.length - 1] : list[k - 1];
  console.log(line.indexOf(res));
}
strSort();
/**
 java
 

答案：
解法一：

import java.util.Arrays;
import java.util.Scanner;

public class Main {
    public static void main(String[] args){
        Scanner in = new Scanner(System.in);
        while (in.hasNext()){
            String item = in.nextLine();
            int k = Integer.parseInt(in.nextLine());
            char[] arrs = item.toCharArray();
            Arrays.sort(arrs);
           if(k>arrs.length){
               char max = arrs[arrs.length-1];
               System.out.println(item.indexOf(max));
           }else{
              char max = arrs[k-1];
              System.out.println(item.indexOf(max));
           }
        }
    }
}

// 解法二

import java.util.ArrayList;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        String line = in.nextLine();
        int k = in.nextInt();
        in.close();

        char[] chars = line.toCharArray();
        ArrayList<Character> list = new ArrayList<>();
        for (char aChar : chars) {
            list.add(aChar);
        }

        list.sort(Character::compareTo);
        char c = k >= list.size() ? list.get(list.size() - 1) : list.get(k - 1);
        System.out.println(line.indexOf(c));
    }
}

 */
