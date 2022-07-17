/**
数列描述

有一个数列a[N] (N=60)，从a[0]开始，每一项都是一个数字。数列中a[n+1]都是a[n]的描述。其中a[0]=1。

规则如下：

a[0]:1

a[1]:11(含义：其前一项a[0]=1是1个1，即“11”。表示a[0]从左到右，连续出现了1次“1”）

a[2]:21(含义：其前一项a[1]=11，从左到右：是由两个1组成，即“21”。表示a[1]从左到右，连续出现了两次“1”)

a[3]:1211(含义：其前一项a[2]=21，从左到右：是由一个2和一个1组成，即“1211”。表示a[2]从左到右，连续出现了1次“2”，然后又连续出现了1次“1”)

a[4]:111221(含义：其前一项a[3]=1211，从左到右：是由一个1、一个2、两个1组成，即“111221”。表示a[3]从左到右，连续出现了1次“1”，连续出现了1次“2”，连续出现了两次“1”)

请输出这个数列的第n项结果（a[n]，0≤n≤59）。

输入描述

数列的第n项(0≤n≤59)

4

输出描述

数列的内容

111221

示例1 输入输出示例仅供调试，后台判题数据一般不包含示例

输入

4

输出

111221

 */

function getNewWord() {
  const num = +readline().trim();
  let content = "1";
  if (num == 0) {
    console.log(1);
    return;
  }
  let result = "";
  for (let i = 1; i <= num; i++) {
    result = "";
    let charts = content.split("");
    let compare = charts[0];
    let count = 1;
    // console.log(charts);
    for (let j = 1; j < content.length; j++) {
      if (charts[j] == compare) {
        count++;
      } else {
        result = result.concat(count, compare);
        compare = charts[j];
        count = 1;
      }
    }
    result = result.concat(count, compare);
    content = result.toString();
  }
  console.log(result);
}

/**
 java 解法一

 解题思路：
看到这种找规律的题目，基本就要想到递归。
注：因为规则是观察连续数出现次数，所以需要对字符串进行前后字符比较，而当n=1的时候只有一位，无法进行比较操作，我们就可以将其单拎出来。将n=2作为递归边界条件。
    

 public class Main{
 
    public static void main(String[] args) {
 
        Scanner sc = new Scanner(System.in);
 
        int n =sc.nextInt();
 
        System.out.println(n==0 ? "1" : getRes(n));
 
    }
 
    public static StringBuffer getRes(int n){
 
        if(n==1){
            return new StringBuffer("11");  //因为当n=0的时候只有一位数，无法进行比较
        }
        StringBuffer s = getRes(n-1);
        int len = s.length();
        StringBuffer sb = new StringBuffer();
        int count = 1;  //连续相同数字的计数
        for(int i=1;i<len;i++){
            if(s.charAt(i)==s.charAt(i-1)){
                count++;    //数字相同且连续则+1
            }else {
                sb.append(count);
                sb.append(s.charAt(i-1));
                count=1;    //重置下计数
            }
            if(i==len-1){   //最后一位
                sb.append(count);
                sb.append(s.charAt(i));
            }
        }
        return sb;
    }
 
}

 */

/**
 java
 

解法二：

import java.util.Scanner;
public class Main{
    public static void main(String[] args){
        int count=new Scanner(System.in).nextInt()+1;
        String[] raw = new String[count];
        raw[0]="1";
        for(int i=1;i<count;i++){
            StringBuilder builder=new StringBuilder();
            char[] lastStr=raw[i-1].toCharArray();
            char now=lastStr[0];
            int charCount=1;
            int index=1;
            while(index<lastStr.length){
                if(lastStr[index]==now) charCount++;
                else{
                    builder.append(charCount).append(now);
                    now = lastStr[index];
                    charCount=1;
                }
                index++;
            }
            builder.append(charCount).append(now);
            raw[i]=builder.toString();
        }
        System.out.println(raw[count-1]);
    }
}
// 解法三

import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int n = Integer.parseInt(in.nextLine());
        in.close();

        StringBuilder next;
        String content = "1";

        if (n == 0) {
            System.out.println(content);
            return;
        }
        for (int i = 1; i <= n; i++) {
            next = new StringBuilder();

            char[] chars = content.toCharArray();
            char last = chars[0];
            int count = 1;
            for (int j = 1; j < chars.length; j++) {
                if (chars[j] == last) count++;
                else {
                    next.append(count).append(last);
                    count = 1;
                    last = chars[j];
                }
            }
            next.append(count).append(last);
            content = next.toString();
        }

        System.out.println(content);

    }
}


 */
