/**
 判断字符串子序列
给定字符串 target和 source, 判断 target 是否为 source 的子序列。
你可以认为 target 和 source 中仅包含英文小写字母。字符串 source可能会很长（长度 ~= 500,000），而 target 是个短字符串（长度 <=100）。
字符串的一个子序列是原始字符串删除一些（也可以不删除）字符而不改变剩余字符相对位置形成的新字符串。（例如，"abc"是"aebycd"的一个子序列，而"ayb"不是）。
请找出最后一个子序列的起始位置。

输入描述:
第一行为target，短字符串（长度 <=100）
第二行为source，长字符串（长度 ~= 500,000）
输出描述:
最后一个子序列的起始位置， 即最后一个子序列首字母的下标

示例1
输入
abc
abcaybec
输出
3
说明
这里有两个abc的子序列满足，取下标较大的，故返回3
备注:
若在source中找不到target，则输出-1
 */

//解题方法：双指针法, 题目要求返回下标最大的字串，可以用倒序遍历字符串，返回第一个结果
function getIndex(str1, str2) {
  let target = str1.trim(); //target
  let source = str2.trim(); //source
  //声明2个指针， 分别指向source，target最后一位
  let ti = target.length - 1;
  let si = source.length - 1;
  while (ti >= 0 && si >= 0) {
    //如果指针所指位置字符相等，两个指针都左移一位，否则只将source指针左移一位
    if (target[ti] == source[si]) {
      if (ti == 0) {
        console.log(si); // 倒序搜索第一个子串完成
        return;
      }
      ti--;
    }
    si--;
  }
  console.log(-1);
}
getIndex("abc", "abcaybec");
getIndex("abc", "abcaydec");

/**
 java

// 解题思路：
// 因为是求最后一个子串的第一个字母下标，所以我们从后面向前开始遍历
// 将target作为外部循环内容，从最后一个字符开始向前遍历。
// 将source作为内部循环内容，从最后一个字符开始向前遍历。
// 当source出现字符与target字符相同时，计数加一并记录其下标，将其作为下次遍历source初始的下标。接着是target的倒数第二字符。。。以此类推，直至target或source遍历完成
// 若计数等于target长度，则输出其下标

 public class Main{
 
    public static void main(String[] args) {
 
        Scanner sc = new Scanner(System.in);
 
        String target = sc.nextLine();
        String source = sc.nextLine();
 
        int n1 = target.length();
        int n2 = source.length();
 
        int n = 0;
        int res = n2;
 
        for(int i=n1-1;i>=0;i--){
            for(int j=res-1;j>=0;j--){
                if(target.charAt(i)==source.charAt(j)){
                    n++;
                    res = j;
                    break;
                }
            }
        }
 
        if(n==n1){
            System.out.println(res);
        }else {
            System.out.println(-1);
        }
    }
}
 */

/**
java

import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        char[] tChars = scanner.nextLine().toCharArray();
        char[] sChars = scanner.nextLine().toCharArray();
        LinkedHashMap<Character, Integer> characterIntegerLinkedHashMap = new LinkedHashMap<Character, Integer>();
        int des=sChars.length;
        if (tChars.length>0&&sChars.length>0) {
            for (int j = tChars.length - 1; j >= 0; j--) {
                for (int i = sChars.length - 1; i >= 0; i--) {
                    if (tChars[j] == sChars[i] & des > i) {
                        des = i;
                        characterIntegerLinkedHashMap.put(tChars[j], i);
                        break;
                    }
                }
            }
            int ros = 0;
            for (int j = tChars.length - 1; j >= 0; j--) {
                if (!characterIntegerLinkedHashMap.containsKey(tChars[j])) {
                    ros = -1;
                    break;
                }
            }
            if (ros != -1) {
                System.out.println(characterIntegerLinkedHashMap.get(tChars[0]));
            } else {
                System.out.println(ros);
            }
        }else {
            System.out.println(-1);
        }
    }
}
 */
