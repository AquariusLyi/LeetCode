/**
 喊7游戏

 喊7的次数重排

 喊7是一个传统的聚会游戏，N个人围成一圈，按顺时针从1-7编号
编号为1的人从1开始喊数，下一个人喊得数字是上一个人喊得数字+1
但是当将要喊出数字7的倍数或者含有7的话，不能喊出 而是要喊过

假定N个人都没有失误。当喊道数字k时，可以统计每个人喊 “过"的次数

现给定一个长度n的数组，存储打乱的每个人喊”过"的次数，请把它还原成正确顺序，
即数组的第i个元素存储编号i的人喊“过“的次数

 

输入为1行，空格分割的喊过的次数， 注意k并不提供，k不超过200，数字个数为n
输出为1行，顺序正确的喊过的次数  空格分割

 

例子
输入
0 1 0
输出
1 0 0
只有一次过，发生在7，按顺序编号1的人遇到7  所以100，结束时的k不一定是7 也可以是 8 9, 喊过都是100

 

例子
输入
0 0 0 2 1
输出
0 2 0 1 0
一共三次喊过，发生在7 14 17，编号为2 的遇到7 17，编号为4 的遇到14。
 */

function games(str) {
  let split = str.trim().split(" ").map(Number);
  let len = split.length;
  let sum = 0;
  for (let item of split) {
    sum += item;
  }

  let res = new Array(len).fill(0);
  let flag = 0;
  for (let i = 1; i < 200; i++) {
    //编号从1开始
    if (i % 7 == 0 || (i + "").includes("7")) {
      res[(i - 1) % len]++; //这里需要好好体会
      flag++;
    }
    if (flag == sum) break;
  }
  let result = "";
  for (let i = 0; i < len; i++) {
    result = result.concat(res[i]);
    if (i != len - 1) {
      result = result.concat(" ");
    }
  }
  console.log(result);
}
games("0 1 0");
games("0 0 0 2 1");

// 解法二
function demo7(input) {
  // 输入
  // const input = "0 1 0"

  const str = input.split(" ");
  // 得到喊7的总次数
  let num = 0;
  for (const x of str) {
    num += parseInt(x, 10);
  }

  const len = str.length;
  // 初始化数组：记录每个人喊7的次数
  const arr = new Array(len).fill(0);

  // index：当前该喊的人
  // count：当前喊七的次数
  let [index, count] = [1, 0];

  while (count < num) {
    if (index.toString(10).indexOf("7") !== -1 || index % 7 === 0) {
      // 取余：找到喊当前数的是第一个人
      let i = (index % len) - 1;
      arr[i]++;
      count++;
    }

    index++;
  }

  // 输出
  console.log(arr.join(" "));
}

demo7("0 1 0");
demo7("0 0 0 2 1");

/**
 java

 public class Main{
 
    public static void main(String[] args) {
 
        Scanner sc = new Scanner(System.in);
 
        String[] s = sc.nextLine().split(" ");
        int len = s.length;
 
        int[] ints = new int[len];
 
        int num = 0;
        for(int i=0;i<len;i++){
            num+=Integer.valueOf(s[i]);     //计算出符合的次数
        }
        int step = 7;   //直接从7开始
        while (num>0){
            if(step%7==0 || String.valueOf(step).contains("7")){
                ints[(step-1)%len]++;      //同过数组长度算出符合的下标
                num--;      //符合的次数递减
            }
            step++;     //报数的次数递增
        }
 
        String res = "";
        for(int i=0;i<len;i++){
            res+=String.valueOf(ints[i]);
            if(i == len-1){
                break;
            }
            res+=" ";
        }
 
        System.out.println(res);
    }
 
}

// 解法二

import java.util.Arrays;
import java.util.Scanner;
public class Demo18 {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        String[] split = in.nextLine().split(" ");
        int sum = 0;
        for (String s : split) {
            sum += Integer.parseInt(s);
        }

        int[] res = new int[split.length];

        int j = 0;
        for (int i = 1; i < 300; i++, j++) {
            if (j == split.length) j = 0;
            if (i % 7 == 0 || (i + "").contains("7")) {
                res[j] += 1;
            }
            int sum1 = 0;
            for (int re : res) sum1 += re;
            if (sum == sum1) break;
        }

        StringBuilder builder = new StringBuilder();
        for (int re : res) builder.append(re).append(" ");

        String s = builder.toString();
        System.out.println(s.substring(0, s.length() - 1));

        in.close();

    }
}


 */
