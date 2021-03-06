/**
数组组成的最小数字

给定一个整型数组，请从该数组中选择3个元素组成最小数字并输出（如果数组长度小于3，则选择数组中所有元素来组成最小数字）。

输入描述：
一行用半角逗号分割的字符串记录的整型数组，0 < 数组长度 <= 100，0 < 整数的取值范围 <= 10000。

输出描述：
由3个元素组成的最小数字，如果数组长度小于3，则选择数组中所有元素来组成最小数字。

示例 1：
输入
21,30,62,5,31

输出
21305

说明
数组长度超过3，需要选3个元素组成最小数字，21305由21,30,5三个元素组成的数字，为所有组合中最小的数字

示例 2：
输入
5,21

输出
215

说明
数组长度小于3，选择所有元素组成最小值，215为最小值
————————————————
版权声明：本文为CSDN博主「G1useppE」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/G1useppE/article/details/124822342
 */

function minNum(str) {
  let arr = str.trim().split(",").map(Number);
  if (arr.length == 1) {
    console.log(arr[0]);
    return;
  } else if (arr.length == 2) {
    let num1 = arr[0].toString() + arr[1].toString();
    let num2 = arr[1].toString() + arr[0].toString();
    let min = Math.min(num1, num2);
    console.log(min);
  } else {
    arr.sort((a, b) => a - b);
    let minNum = arr.slice(0, 3);
    minNum.sort((a, b) => {
      return (a.toString() + b.toString()).localeCompare(
        b.toString() + a.toString()
      );
    });
    let res = "";
    for (let item of minNum) {
      res += item;
    }
    console.log(res);
  }
}
minNum("21, 30, 62, 5, 31");
minNum("5,21");
minNum("5");
minNum("");

/**
 java

 
import java.util.Arrays;
import java.util.Comparator;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        //获取输入存到数组中
        Scanner scanner = new Scanner(System.in);
        String inputString = scanner.nextLine();
        String[] numberArr = inputString.split(",");


        //计算
        if(numberArr.length<=0){
            return;
        }else if(numberArr.length ==1 ){ //只有一个数，直接输出
            System.out.println(numberArr[0]);
        }else if(numberArr.length ==2 ){ //有两个数，排列组合一下就行
            int s1 = Integer.parseInt(numberArr[0] + numberArr[1]);
            int s2 = Integer.parseInt(numberArr[1] + numberArr[0]);
            System.out.println(s1<s2?s1:s2);
        }else { //有3个数以上，先排序找出最小的三个数在进行组合
            Arrays.sort(numberArr, new Comparator<String>() {
                @Override
                public int compare(String o1, String o2) {
                    return Integer.parseInt(o1)-Integer.parseInt(o2);
                }
            });

            String[] min3Num = Arrays.copyOf(numberArr,3);

            Arrays.sort(min3Num);

            String res="";
            for (String s:min3Num){
                res += s;
            }
            System.out.println(res);
        }
    }
}
 */
