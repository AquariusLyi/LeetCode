/**
【编程题目 |200分】移除K位数字【2022 Q1, Q2考试题】

找最小数 【移除K位数字】 移除 K 位数字的最小值

给一个正整数NUM1，计算出新正整数NUM2，NUM2为NUM1中移除N位数字后的结果，需要使得NUM2的值最小。

输入描述：

1.输入的第一行为一个字符串，字符串由0-9字符组成，记录正整数NUM1，NUM1长度小于32。
2.输入的第二行为需要移除的数字的个数，小于NUM1长度。

如：
2615371
4

输出描述：

输出一个数字字符串，记录最小值NUM2。
如：131

示例1 输入输出示例仅供调试，后台判题数据一般不包含示例

输入

2615371
4

说明

移除2、6、5、7这四个数字，剩下1、3、1按原有顺序排列组成131，为最小值。


【移除 K 位数字的最小值】

输入描述

第一行输入一个非负整数字符串，第二行输入一个整数n

输出描述

输出从该字符串中取出n个字符后剩下的字符组成的最小的数（不改变字符顺序）

输入

2615371

4

输出

131

给出一个数字组成的字符串，去除指定个数的字符，剩余的组成最小值。

这个解题思路可以是递归，按照顺序取剩余个数的字符，组成数字，依次比较获取，但是可能超时。

例如 6525441，去除 4 个字符，得到 241。

最优解是删除出现的第一个左边>右边的数，

例如第一次删除 6，因为 6>5，变成 525441；

第二次删除 5，5>2，变成 25441，第三次是 5，第四次是 4，结果为 241


 */

// leetcode代码

/**
 * @param {string} num
 * @param {number} k
 * @return {string}
 */
var removeKdigits = function () {
  let num = readline().trim();
  let k = +readline().trim();
  let stack = [];
  for (let i = 0, len = num.length; i < len; i++) {
    let temp = num[i];
    //当遍历的元素比此时栈顶元素小，删除栈顶元素
    while (k > 0 && stack.length > 0 && temp < stack[stack.length - 1]) {
      stack.pop();
      k--;
    }
    stack.push(temp);
  }
  // 如果未删除，从尾部继续
  while (k > 0) {
    stack.pop();
    k--;
  }
  // 去除无效的0
  while (stack.length > 0 && stack[0] === "0") {
    stack.shift();
  }

  return stack.length ? stack.join("") : "0";
};

/**
 解题思路：
根据题意，获取的最后值为原长度-需要移除的长度
因为是移除，所以数字的位置不能有所改变。
要最小数则前面的数要尽量的小
注：题意没有明确表示第一位不能为0，需要注意一下
如例一所示：
最后值 3（7-4） 位数
a、第一位数在前5位数种找最小值1，位置是3
b、第二位数在第3位数到第6位数找最小值3，位置是5
c、第三位数在第6位数到第7位数找最小值1
所以最后的值131
 */
function deleteNum() {
  let input = readline().trim();
  let num = +readline().trim();
  let last = num + 1; //截取字符的右边界
  let idx = 0;
  let res = "";

  while (res.length < input.length - num) {
    let str = input.substring(idx, last); //求出第一个数字的最小值
    let min = Number.MAX_SAFE_INTEGER;
    let len = str.length;
    let arr = [];
    for (let i = 0; i < len; i++) {
      let temp = str.charAt(i) - "0"; //char转换成int
      arr[i] = temp; //放入数组求出下标
      if (res == "" && temp == 0) {
        //第一位不能为0（如没有要求可以删掉）
        continue;
      }
      min = Math.min(min, temp);
    }
    res += min;

    for (let i = 0; i < len; i++) {
      if (arr[i] == min) {
        idx += i; //求出第一个最小值的下标然后去截取循环获取最小值
        break;
      }
    }
    idx++;
    last++; //数字要往后移一位
  }
  console.log(res);
}

// 解法三

function demo() {
  let s = readLine();
  let m = Number(readLine());
  // let  s = "2615371";
  // let m = Number("4");

  let l = m + 1; //截取字符的右边界
  let index = 0;
  let res = "";

  while (res.length < s.length - m) {
    let str = s.substring(index, l); //求出第一个数字的最小值
    let min = Number.MAX_VALUE;
    let len = str.length;
    let ints = [];
    for (let i = 0; i < len; i++) {
      let temp = str.charAt(i); //char转换成int
      ints[i] = temp; //放入数组求出下标
      if (res == "" && temp == 0) {
        //第一位不能为0（如没有要求可以删掉）
        continue;
      }
      min = Math.min(min, temp);
    }
    res += String(min);

    for (let i = 0; i < len; i++) {
      if (ints[i] == min) {
        index += i; //求出第一个最小值的下标然后去截取循环获取最小值
        break;
      }
    }
    index++;
    l++; //数字要往后移一位
  }

  console.log(res);
}

/**
 java

 import java.util.*;

public class RemoveKNum {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        String s = sc.nextLine();
        int m = sc.nextInt();
        int l = m + 1;        
        int index = 0;
        StringBuilder res = new StringBuilder();

        while (res.length() < s.length() - m) {
            String str = s.substring(index, l);        
            int min = Integer.MAX_VALUE;
            int len = str.length();
            int[] ints = new int[len];
            for (int i = 0; i < len; i++) {
                int temp = str.charAt(i) - '0';  
                ints[i] = temp;
                if (res.toString().equals("") && temp == 0) { 
                    continue;
                }
                min = Math.min(min, temp);
            }
            res.append(min);

            for (int i = 0; i < len; i++) {
                if (ints[i] == min) {
                    index += i;      
                    break;
                }
            }
            index++;
            l++;
        }
        System.out.println(res);
    }
}
 */

/**
 java
 public class Main{
 
    public static void main(String[] args) {
 
        Scanner sc = new Scanner(System.in);
 
        String  s = sc.nextLine();
        int m = sc.nextInt();
        int l = m+1;        //截取字符的右边界
        int index = 0;
        String res = "";
 
        while (res.length()<s.length()-m){
            String str = s.substring(index,l);        //求出第一个数字的最小值
            int min = Integer.MAX_VALUE;
            int len = str.length();
            int[] ints = new int[len];
            for(int i=0;i<len;i++){
                int temp = str.charAt(i)-'0';   //char转换成int
                ints[i] = temp; //放入数组求出下标
                if(res=="" && temp==0){ //第一位不能为0（如没有要求可以删掉）
                    continue;
                }
                min = Math.min(min,temp);
            }
            res+=String.valueOf(min);
 
            for(int i=0;i<len;i++){
                if(ints[i] == min){
                    index += i;      //求出第一个最小值的下标然后去截取循环获取最小值
                    break;
                }
            }
            index++;
            l++;//数字要往后移一位
        }
        System.out.println(res);
    }
 
}
 */
