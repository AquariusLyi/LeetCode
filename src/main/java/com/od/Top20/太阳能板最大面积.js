/**
太阳能板最大面积

给航天器一侧加装长方形或正方形的太阳能板（图中的红色斜线区域），需要先安装两个支柱（图中的黑色竖条），再在支柱的中间部分固定太阳能板。但航天器不同位置的支柱长度不同，太阳能板的安装面积受限于最短一侧的那根支柱长度。如图：

输入描述

10,9,8,7,6,5,4,3,2,1

注释，支柱至少有两根，最多10000根，能支持的高度范围1~10^9的整数，柱子的高度是无序的，例子中的递减是巧合

输出描述

可以支持的最大太阳板面积:(10m高支柱和5m高支柱之间)

25

示例1

输入

10,9,8,7,6,5,4,3,2,1

输出

25

备注 10米高支柱和5米高支柱之间宽度为5，高度取小的支柱高度也是5

面积为25

任取其他两根支柱所能获得的面积都小于25 所以最大面积为25。

解题思路：
1.注意题目中黑色加粗字体，我们理解一下。也就是说对于两根柱子而言，即使一个是1，一个是9，那么这个太阳能板能安装的最大面积也只是取决于最短柱子的长度，因此我们在获取这两根柱子高度时，应该选择Math.min(arr[i],arr[j])来作为太阳能板的高度。

2.而太阳能板的宽度，则是两根柱子的索引差，用j-i即可。

3.用一个变量来保存最大的面积，通过不断比较更新最大面积。
————————————————
版权声明：本文为CSDN博主「G1useppE」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/G1useppE/article/details/124780308
 */

/**
可以使用双指针的解法，初始化双指针分列水槽左右两端，循环每轮将短板向内移动一格，并更新面积最大值，直到两指针相遇时跳出；即可获得最大面积。

因为每次移动短板，这个太阳板的最短板可能变大，下一个太阳板的面积可能增大。

而如果移动长板，则这个太阳板的短板不变或者变小，下一个太阳板的面积必然变小。

因此应该移动短板。
 */

var maxArea = function (str) {
  let arr = str.trim().split(",").map(Number);
  let len = arr.length;
  let i = 0;
  let j = len - 1;
  let res = 0;
  while (i < j) {
    if (arr[i] < arr[j]) {
      res = Math.max(res, (j - i) * arr[i++]);
    } else {
      res = Math.max(res, (j - i) * arr[j--]);
    }
  }
  console.log(res);
};
maxArea("10, 9, 8, 7, 6, 5, 4, 3, 2, 1"); //25

// 第二种解法
//  -----------------------------
function demo(args) {
  let strings = args.trim().split(",");
  //let strings ="10,9,8,7,6,5,4,3,2,1".split(",");
  let num = []; //将输入放入整数数组中

  for (let m = 0; m < strings.length; m++) {
    num[m] = Number(strings[m]);
  }

  let max = 0; //最大面积

  for (let n = 1; n < num.length; n++) {
    let min = num[n]; //假设当前挡板为最小挡板
    let temp = n - 1; //前一个挡板下标
    for (let i = 1; i <= n; i++) {
      /**
       * 循环计算当前挡板到前面i个挡板的面积并求出最大值
       */
      min = Math.min(min, num[temp--]); //min 求出前挡板到前面i个挡板最小高度
      max = Math.max(min * i, max); //min*i 求出前挡板到前面i个挡板的面积
    }
  }

  console.log(max);
}
demo("10,9,8,7,6,5,4,3,2,1");

// 复杂度较高
// 第三种解法
//  -----------------------------
function maxSqr(arr) {
  let maxValue = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      maxValue = Math.max(maxValue, Math.min(arr[i], arr[j]) * (j - i));
    }
  }
  return maxValue;
}

console.log(maxSqr([10, 9, 8, 7, 6, 5, 4, 3, 2, 1])); //25

/**
 
52、太阳能板最大面积
给航天器一侧加装长方形或正方形的太阳能板（图中的红色斜线区域），需要先安装两个支柱（图中的黑色竖条），再在支柱的中间部分固定太阳能板。但航天器不同位置的支柱长度不同，太阳能板的安装面积受限于最短一侧的那根支柱长度。如图：
现提供一组整形数组的支柱高度数据，假设每根支柱间距离相等为1个单位长度，计算如何选择两根支柱可以使太阳能板的面积最大。

输入描述:
10,9,8,7,6,5,4,3,2,1
注：支柱至少有2根，最多10000根，能支持的高度范围1~10^9的整数。柱子的高度是无序的，例子中递减只是巧合。
输出描述:
可以支持的最大太阳能板面积：（10米高支柱和5米高支柱之间）
25

示例1
输入
10,9,8,7,6,5,4,3,2,1
输出
25
备注:
10米高支柱和5米高支柱之间宽度为5，高度取小的支柱高也是5，面积为25。任取其他两根支柱所能获得的面积都小于25。所以最大的太阳能板面积为25。

答案：
解法一：

import java.util.Scanner;

public class Main{
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] strs = sc.nextLine().split(",");
        int len = strs.length;
        long res = 0;
        for(int i = 0; i < len - 1; i++) {
            for(int j = i + 1; j < len; j++) {
                long a = Long.valueOf(strs[i]);
                long b = Long.valueOf(strs[j]);
                long c = j - i;
                if (a > b){
                    if (res < b * c)
                    res = b * c;
                }else{
                    if (res < a *c)
                    res = a * c;
                }
            }
        }
        System.out.print(res);
    }
}
 */
