/**
字符串比较

标题：字符串比较 | 时间限制：1秒 | 内存限制：65536K | 语言限制：不限
 
给定字符串A、B和正整数V，A的长度与B的长度相等， 请计算A中满足如下条件的最大连续子串的长度：
 
1、该连续子串在A和B中的位置和长度均相同。
2、该连续子串|A[i] – B[i]|之和小于等于V。其中|A[i] – B[i]|表示两个字母ASCII码之差的绝对值。
输入描述:
 
输入为三行：
第一行为字符串A，仅包含小写字符，1 <= A.length <=1000。
第二行为字符串B，仅包含小写字符，1 <= B.length <=1000。
第三行为正整数V，0<= V <= 10000。
 
输出描述:
 
字符串最大连续子串的长度，要求该子串|A[i] – B[i]|之和小于等于V。
示例1
 
输入：
 
xxcdefg
cdefghi
5
 
输出：
 
2
说明：
 
字符串A为xxcdefg，字符串B为cdefghi，V=5。
它的最大连续子串可以是cd->ef,de->fg,ef->gh,fg->hi，所以最大连续子串是2。


*/
function strJudge() {
  let s1 = readline().trim();
  let s2 = readline().trim();

  let n = readline().trim();

  let max = 0;
  let length = 0;
  let list = []; //用列表存放符合要求的数

  list.push(Math.abs(s1.charAt(0).charCodeAt() - s2.charAt(0).charCodeAt())); //假设第一个字母就符合要求
  let count = list[0]; //第一个字母ASCII码之差的绝对值

  for (let i = 1; i < s1.length; i++) {
    let temp = Math.abs(s1.charAt(i).charCodeAt() - s2.charAt(i).charCodeAt());

    list.push(temp); //直接将本次的ASCII码之差的绝对值添加进列表
    count += Math.abs(temp); //求最新的绝对值和

    if (count <= n) {
      length = list.length; //若符合要求则最长的为列表的长度
    } else {
      count -= list[0]; //不符合则减去并删除列表第一个数
      list.shift();
    }
    max = Math.max(length, max);
  }

  console.log(max);
}

/**
 java
 
 public class Main{
 
    public static void main(String[] args) {
 
        Scanner scanner = new Scanner(System.in);
 
        String s1 = scanner.nextLine();
        String s2 = scanner.nextLine();
 
        int n = scanner.nextInt();
 
        int max = 0;
        int length = 0;
        List<Integer> list = new ArrayList<>();     //用列表存放符合要求的数
 
        list.add(Math.abs(s1.charAt(0) - s2.charAt(0)));      //假设第一个字母就符合要求
        int count = list.get(0);        //第一个字母ASCII码之差的绝对值
 
        for ( int i=1; i<s1.length(); i++) {
 
            int temp = Math.abs(s1.charAt(i) - s2.charAt(i));
 
            list.add(temp);     //直接将本次的ASCII码之差的绝对值添加进列表
            count+=Math.abs(temp);      //求最新的绝对值和
 
            if ( count <= n ) {
                length = list.size();       //若符合要求则最长的为列表的长度
            } else {
                count -= list.get(0);   //不符合则减去并删除列表第一个数
                list.remove(0);
            }
            max = Math.max( length, max);
        }
 
        System.out.println(max);
    }
 
}

// 解法二


import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class StringCompare {

    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);

        String s1 = scanner.nextLine();
        String s2 = scanner.nextLine();

        int n = scanner.nextInt();

        int max = 0;
        int length = 0;
        List<Integer> list = new ArrayList<>();     

        list.add(Math.abs(s1.charAt(0) - s2.charAt(0)));      
        int count = list.get(0);        

        for (int i = 1; i < s1.length(); i++) {

            int temp = Math.abs(s1.charAt(i) - s2.charAt(i));

            list.add(temp);     
            count += Math.abs(temp);      

            if (count <= n) {
                length = list.size();       
            } else {
                count -= list.get(0);  
                list.remove(0);
            }
            max = Math.max(length, max);
        }

        System.out.println(max);
    }
}
 */
