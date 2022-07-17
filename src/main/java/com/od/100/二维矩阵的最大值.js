/**
计算二维矩阵的最大值

矩阵最大值


 给定一个仅包含0和1的n*n二维矩阵，请计算二维矩阵的最大值。


计算规则如下
1、每行元素按下标顺序组成一个二进制数(下标越大约排在低位)，二进制数的值就是该行的值，矩阵各行之和为矩阵的值
2、允许通过向左或向右整体循环移动每个元素来改变元素在行中的位置
比如：[1,0,1,1,1] 向右整体循环移动两位 [1,1,1,0,1]， 二进制数为11101 值为29
[1,0,1,1,1] 向左整体循环移动两位 [1,1,1,1,0]， 二进制数为11110 值为30

输入描述
1.数据的第一行为正整数，记录了N的大小， 0<N<=20
2.输入的第2到n+1行为二维矩阵信息， 行内元素边角逗号分割

输出描述
矩阵的最大值

示例1

输入
5
1,0,0,0,1 
0,0,0,1,1
0,1,0,1,0
1,0,0,1,1
1,0,1,0,1

输出
122

说明第一行向右整体循环移动一位，得到最大值 11000 24  因此最大122

说明：
第一行向右整体循环移动1位，得到本行的最大值[1,1,0,0,0]，二进制为11000，十进制为24。
第二行向右整体循环移动2位，得到本行的最大值[1,1,0,0,0]，二进制为11000，十进制为24。
第三行向左整体循环移动1位，得到本行的最大值[1,0,1,0,0]，二进制为10100，十进制为20。
第四行向右整体循环移动2位，得到本行的最大值[1,1,1,0,0]，二进制为11100，十进制为28。
第五行向右整体循环移动1位，得到本行的最大值[1,1,0,1,0]，二进制为11010，十进制为26。
总和为24+24+20+28+26=122。
————————————————
版权声明：本文为CSDN博主「小朱小朱绝不服输」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_44052055/article/details/123944693

 */

//  解法一 最简单
function juzheng() {
  let num = +readline().trim();
  let sum = 0;
  for (let i = 0; i < num; i++) {
    let str = readline().trim().replace(/,/g, ""); //直接将输入值转换为字符串
    let max = 0;
    for (let j = 0; j < num; j++) {
      let newS = str.substring(j) + str.substring(0, j); //字符串分段拼接相当于右移
      max = Math.max(max, parseInt(newS, 2));
    }
    sum += max;
  }
  console.log(sum);
}

/**
解法二
 */
function sortArr(arr) {
  return arr.split(",");
}

function getSum(str1, str2) {
  let num = +str1.trim();
  let split = str2.trim().split(/\n+/g);
  let arr = split.map((element) => {
    return element.trim().split(",");
  });
  let sum = 0; // 通过不停的循环计数算法 去获取最大值处理

  for (let i = 0; i < num; i++) {
    const ele = arr[i]; // [ '1', '1', '0', '0', '0' ]
    let curMax = 0;
    for (let j = 0; j < num; j++) {
      ele.push(ele.shift()); // 很巧妙的处理，不停的再处理 新数组，先shift 再push 处理
      const str = ele.toString().replace(/\D+/g, "");
      //   let curSum = parseInt(str, 2);
      //   if (curMax < curSum) {
      //     curMax = curSum;
      //   }
      curMax = Math.max(curMax, parseInt(str, 2));
    }
    sum += curMax;
  }
  console.log(sum);
  //
  // 下面思路错了，要求是向右移动位置 ，去最大值
  // let arr = split.map((element) => {
  //     return sortArr(element);
  //   });
  //   let sum = 0;
  //   arr.forEach((item) => {
  //     item.forEach((_item, index) => {
  //       sum += _item * Math.pow(2, item.length - 1 - index);
  //     });
  //   });
  //   console.log(split);
  //   console.log(arr);
  //   console.log(sum);
}

getSum(
  "5",
  `
  1,0,0,0,1 
  0,0,0,1,1
  0,1,0,1,0
  1,0,0,1,1
  1,0,1,0,1
`
);

// getSum(
//   "5",
//   `
//   1,1,0,0,0
//   1,1,0,0,0
//   1,0,1,0,0
//   1,1,1,0,0
//   1,1,0,1,0
//   `
// );
// 第二种解法
function getSum2(str1, str2) {
  let num = +str1.trim();
  let split = str2.trim().split(/\n+/g);
  let arr = split.map((element) => {
    return element.trim().split(",");
  });
  let sum = 0;
  arr.forEach((element) => {
    sum += del(element);
  });
  console.log(sum);
}

function del(arr) {
  let max = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == 1) {
      let str = "";
      for (let m = i; m < arr.length; m++) {
        // console.log(arr[m], "mmmmm");
        str += arr[m];
      }
      for (let n = 0; n < i; n++) {
        // console.log(arr[n], "nnnnn");
        str += arr[n];
      }
      max = Math.max(max, parseInt(str, 2));
    }
  }
  return max;
}

getSum2(
  "5",
  `
    1,0,0,0,1 
    0,0,0,1,1
    0,1,0,1,0
    1,0,0,1,1
    1,0,1,0,1
  `
);

function getSum3() {
  let n = Number(readline());
  //let n = Number("5");
  let res = 0;

  // let test = ["1,0,0,0,1",
  //             "0,0,0,1,1",
  //             "0,1,0,1,0",
  //             "1,0,0,1,1",
  //             "1,0,1,0,1"]

  for (let i = 0; i < n; i++) {
    let s = readline().replaceAll(",", ""); //直接将输入值转换为字符串
    //let s = test[i].replaceAll(",","");
    let max = 0;
    for (let j = 0; j < n; j++) {
      let newS = s.substring(j) + s.substring(0, j); //字符串分段拼接相当于右移
      max = Math.max(max, parseInt(newS, 2));
    }
    res += max;
  }
  console.log(res);
}

/*

function getSum() {
    let num = +(readline().trim());
      console.log(num)
    let split = [];
    for (i = 0;i<num;i++){
        const ele = readline().trim();
        console.log(ele)
        split.push(ele)
    }
    console.log(split);
    let arr = split.map((element) => {
      return element.trim().split(",");
    });
    console.log(arr);
    let sum = 0; // 通过不停的循环计数算法 去获取最大值处理
  
    for (let i = 0; i < num; i++) {
      const ele = arr[i]; // [ '1', '1', '0', '0', '0' ]
      let curMax = 0;
      for (let j = 0; j < num; j++) {
        ele.push(ele.shift());
        const str = ele.toString().replace(/\D+/g, "");
        let curSum = parseInt(str, 2);
        if (curMax < curSum) {
          curMax = curSum;
        }
      }
      sum += curMax;
    }
    console.log(sum);
  }
  
  getSum()

  */

/**
 java


import java.util.Scanner;

public class Main {
    public static void main(String[] args) throws Exception {
        Scanner sc = new Scanner(System.in);
        int count = sc.nextInt();
        sc.nextLine();
        String[] m = new String[count];
        int result = 0;
        for (int i = 0; i < count; i++) {
            m[i] = sc.nextLine().replaceAll(",", "");
            int max = 0;
            String v = m[i];
            for (int j = 0; j < v.length(); j++) {
                if (max < Integer.parseInt(v, 2)) {
                    max = Integer.parseInt(v, 2);
                }
                v = v.substring(1, v.length()) + v.substring(0, 1);
            }
            result += max;
        }
        System.out.println(result);
    }

}

import java.util.Arrays;
import java.util.LinkedList;
import java.util.Scanner;

 public class Main7 {
  public static void main(String[] args) {
      Scanner in = new Scanner(System.in);
      int n = Integer.parseInt(in.nextLine());
      int res = 0;
      for (int i = 0; i < n; i++) {
          LinkedList<Integer> ints = new LinkedList<>();
          Arrays.stream(in.nextLine().split(","))
                  .forEach(x -> ints.add(Integer.parseInt(x)));
          int max = Integer.MIN_VALUE;
          for (int j = 0; j < n; j++) {
              ints.addLast(ints.remove(0));

              String binInt = ints.toString()
                      .replaceAll("\\W+", "");

              int sum = Integer.parseInt(binInt, 2);
              if (sum > max) max = sum;
          }
          res += max;
      }
      System.out.println(res);
      in.close();
  }
}


// 解法三

import java.util.Arrays;
import java.util.LinkedList;
import java.util.Scanner;
public class Main7 {
    public static void main(String[] args) {
         Scanner in = new Scanner(System.in);
        int n = Integer.parseInt(in.nextLine());
        int res = 0;
        for (int i = 0; i < n; i++) {
            LinkedList<Integer> ints = new LinkedList<>();
            Arrays.stream(in.nextLine().split(","))
                    .forEach(x -> ints.add(Integer.parseInt(x)));
            int max = Integer.MIN_VALUE;
            for (int j = 0; j < n; j++) {
                ints.addLast(ints.remove(0));

                String binInt = ints.toString()
                        .replaceAll("\\W+", "");

                int sum = Integer.parseInt(binInt, 2);
                if (sum > max) max = sum;
            }
            res += max;
        }
        System.out.println(res);
        in.close();
    }
}

 */
