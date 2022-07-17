/**
 标题：出错的或电路 | 时间限制：1秒 | 内存限制：262144K | 语言限制：不限

某生产门电路的厂商发现某一批次的或门电路不稳定，具体现象为计算两个二进制数的或操作时，第一个二进制数中某两个比特位会出现交换，交换的比特位置是随机的，但只交换这两个位，其他位不变。很明显，这个交换可能会影响最终的或结果，也可能不会有影响。为了评估影响和定位出错的根因，工程师需要研究在各种交换的可能下，最终的或结果发生改变的情况有多少种。

输入描述:
第一行有一个正整数N，其中1 \leq N \leq 10000001≤N≤1000000。
第二行有一个长为N的二进制数，表示与电路的第一个输入数，即会发生比特交换的输入数。
第三行有一个长为N的二进制数，表示与电路的第二个输入数。注意第二个输入数不会发生比特交换。
 
输出描述:
输出只有一个整数，表示会影响或结果的交换方案个数。

示例1
输入
3
010
110
 
输出
1
 
说明
原本010和110的或结果是110，但第一个输入数可能会发生如下三种交换：
1. 交换第1个比特和第2个比特，第一个输入数变为100，计算结果为110，计算结果不变
2. 交换第1个比特和第3个比特，第一个输入数变为010，计算结果为110，计算结果不变
3. 交换第2个比特和第3个比特，第一个输入数变为001，计算结果为111，计算结果改变
故只有一种交换会改变计算结果。
示例2
输入
6
011011
110110
 
输出
4
 
说明
原本011011和110110的或结果是111111，但第一个输入数发生如下比特交换会影响最终计算结果：
1. 交换第1个比特和第3个比特，第一个输入数变为110011，计算结果变为110111
2. 交换第1个比特和第6个比特，第一个输入数变为111010，计算结果变为111110
3. 交换第3个比特和第4个比特，第一个输入数变为010111，计算结果变为110111
4. 交换第4个比特和第6个比特，第一个输入数变为011110，计算结果变为111110
其他的交换都不会影响计算结果，故输出4。
 
或运算：同位置两个只要一个非0就等于1
根据或运算特性，说明只有第二个数中0的位置会受第一个数的影响；
第一个数在第二个数0的位置上
如果是0，则会受到第一个数中1的个数的影响
如果是1，则会受到第一个数中0的个数的影响

 */

function dianlu() {
  let num = readline().trim();
  let str1 = readline().trim();
  let str2 = readline().trim();

  let list = [];
  let one = 0; //第一个数中1的个数
  let zero = 0; //第一个数中0的个数

  for (let i = 0; i < num; i++) {
    if (str1.charAt(i) == "0") {
      zero++;
      if (str2.charAt(i) == "0") {
        list.push(1); //受第一个数中1的影响
      }
    } else {
      one++;
      if (str2.charAt(i) == "0") {
        list.push(0); //受第一个数中0的影响
      }
    }
  }
  let res = 0;
  list.forEach((item) => {
    if (item == 0) {
      res += zero; //受0的影响则加0的个数
    } else {
      res += one; //受1的影响则加1的个数
    }
  });
  console.log(res);
}

/**
 java
 
// 解法一
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        sc.nextLine();
        String s1 = sc.nextLine();
        String s2 = sc.nextLine();

        List<Integer> list = new ArrayList<>();
        int one = 0;    
        int zero = 0;   

        for (int i = 0; i < n; i++) {
            if (s1.charAt(i) == '0') {
                zero++;
                if (s2.charAt(i) == '0') list.add(1);  
            } else {
                one++;
                if (s2.charAt(i) == '0') list.add(0);  
            }
        }
        int res = 0;
        for (Integer integer : list) {
            if (integer == 0) {
                res += zero;  
            } else {
                res += one;   
            }
        }
        System.out.println(res);
    }
}

// 解法二
 public class Main{
 
    public static void main(String[] args) {
 
        Scanner sc = new Scanner(System.in);
 
        int n = sc.nextInt();
        sc.nextLine();
        String s1 = sc.nextLine();
        String s2 = sc.nextLine();
 
        List<Integer> list = new ArrayList<>();
        int one = 0;    //第一个数中1的个数
        int zero = 0;   //第一个数中0的个数
 
        for(int i=0;i<n;i++){
            if(s1.charAt(i)=='0'){
                zero++;
                if(s2.charAt(i)=='0') list.add(1);  //受第一个数中1的影响
            }else{
                one++;
                if(s2.charAt(i)=='0') list.add(0);  //受第一个数中0的影响
            }
        }
        int res = 0;
        for(int i=0;i<list.size();i++){
            if(list.get(i)==0){
                res+=zero;  //受0的影响则加0的个数
            }else {
                res+=one;   //受1的影响则加1的个数
            }
        }
        System.out.println(res);
    }
 
}
 */
