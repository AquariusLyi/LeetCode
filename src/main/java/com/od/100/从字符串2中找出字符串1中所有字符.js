/**
【找出符合要求的字符串子串】

给定两个字符串，从字符串2中找出字符串1中的所有字符，去重并按照ASCII值从小到大排序。

输入字符串1：长度不超过1024

输入字符串2：长度不超过1000000

字符范围满足ASCII编码要求，按照ASCII的值由小到大排序

输入描述

bach

bbaaccedfg

输出描述

abc

示例1 输入输出示例仅供调试，后台判题数据一般不包含示例

输入

fach

bbaaccedfg

输出

acf

说明

备注

输入字符串1 为给定字符串bach，输入字符串2 bbaaccedfg

从字符串2中找出字符串1的字符，去除重复的字符，并且按照ASCII值从小到大排序，得到输出的结果为abc。

字符串1中的字符h在字符串2中找不到不输出。

https://www.cnblogs.com/Jukim/p/16052267.html 

 */

function getNewWord(str1, str2) {
  let split1 = str1.trim().split("");
  let split2 = str2.trim().split("");

  let set = new Set();
  for (let item of split1) {
    if (split2.includes(item)) {
      set.add(item);
    }
  }
  let arr = Array.from(set).sort((a, b) => a.localeCompare(b));

  console.log(arr.join(""));
}
getNewWord("bach", "bbaaccddfg");
getNewWord("fach", "bbaaccedfg");

/**
 java

 
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner s =new Scanner(System.in);
        String str1=s.nextLine();
        String str2=s.nextLine();
        char[] arr2=str2.toCharArray();
        int[] arr4=new int[150];
        for(char c:arr2){
            if(str1.contains(c+"")){
                int b=(int)c;
                arr4[(int)c]=1;
            }
        }
        for(int i=1;i<arr4.length;i++){
            if(arr4[i]==1){
                System.out.print((char)i);
            }
        }
    }
}
 */
