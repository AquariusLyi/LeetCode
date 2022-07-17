/**
 数据分类

对一个数据a进行分类，分类方法为：此数据 a(四个字节大小)的四个字节相加对一个给定值 b 取模，如果得到的结果小于一个给定的值 c，则数据 a 为有效类型，其类型为取模的值；如果得到的结果大于或者等于 c ，则数据 a 为无效类型。
比如一个数据 a=0x01010101，b=3，按照分类方法计算(0x01+0x01+0x01+0x01)％3=1，所以如果 c = 2，则此 a 为有效类型，其类型为 1，如果 c= 1，则此 a 为无效类型；
又比如一个数据 a=0x01010103，b=3，按照分类方法计算(0x01+0x01+0x01+0x03)％3=0，所以如果 c=2，则此 a 为有效类型，其类型为 0，如果 c= 0，则此 a 为无效类型。
输入 12 个数据，第一个数据为 c，第二个数据为 b，剩余 10 个数据为需要分类的数据，请找到有效类型中包含数据最多的类型，并输出该类型含有多少个数据。
输入描述
输入 12 个数据，用空格分隔，第一个数据为 c，第二个数据为 b，剩余 10 个数据为需要分类的数据。
输出描述
输出最多数据的有效类型有多少个数据。
示例 1

输入
3 4 256 257 258 259 260 261 262 263 264 265
输出
3
说明
10 个数据 4 个字节相加后的结果分别是 1 2 3 4 5 6 7 8 9 10，故对 4 取模的结果为 1 2 3 0 1 2 3 0 1 2，c 是 3，所以 0 1 2 都是有效类型，类型为 1 和 2 的有 3 个数据， 类型为 0 和 3 的只有 2 个数据，故输出 3
示例 2
输入
1 4 256 257 258 259 260 261 262 263 264 265
输出
2

说明
10 个数据 4 个字节相加后的结果分别为 1 2 3 4 5 6 7 8 9 10，故对 4 取模的结果为 1 2 3 0 1 2 3 0 1 2，c 为 1，所以只有 0 是有效类型，类型为 0 的有 2 个数据，故输出 2
解题思路
使用 key-value 存储类型和个数的对应关系



 */

var byteSum = function (n) {
  let sum = 0;
  for (let i = 0; i < n.length; i++) {
    sum += parseInt(n[i]);
  }
  return sum;
};

var DataClassify = function (nums) {
  let c = nums[0];
  let b = nums[1];

  let map = new Map();

  // 分类计算的方法
  for (let i = 2; i < nums.length; i++) {
    // 求类型
    let result = byteSum(parseInt(nums[i]).toString(16)) % b;

    // result小于c，则数据a为有效类型，其类型为取模的值
    // 如果得到的结果大于或者等于c，则数据a为无效类型
    if (result < c) {
      if (map.has(result)) {
        map.set(result, map.get(result) + 1);
      } else {
        map.set(result, 1);
      }
    }
  }

  // 求最大值
  let max = 0;
  for (const value of map.values()) {
    max = Math.max(max, value);
  }
  console.log(`最大值为：${max}`);
};

DataClassify([3, 4, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265]);
DataClassify([1, 4, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265]);

/**
 java


答案：
解法一：

import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        while (sc.hasNext()) {
            // 取数据
            int c = sc.nextInt();
            int b = sc.nextInt();
            final int size = 10;
            int[] num = new int[size];
            for (int i = 0; i < size; i++) {
                num[i] = sc.nextInt();
            }
            // type记录10个数各自的有效类型，无效记录-1
            int[] type = new int[size];
            // 计算有效类型
            for (int i = 0; i < size; i++) {
                type[i] = getValidType(num[i], b, c);
                // System.out.print(i + "=" + type[i] + ", ");
            }
            // 计算类型最多的数据个数
            int maxCount = 0;
            int count = 0;
            for (int i = 0; i < c; i++) {
                count = 0;
                for (int k = 0; k < size; k++) {
                    if (i == type[k]) {
                        count++;
                    }
                }
                if (count > maxCount) {
                    maxCount = count;
                }
            }
            // 输出结果
            System.out.println(maxCount);
        }
    }
    
    private static int getValidType(int num, int b, int c) {
        // int转换为4个字节相加
        int sum = 0;
        for (int i = 0; i < 4; i++) {
            sum += num % 256;
            num /= 256;
        }
        int mod = sum % b;
        return mod < c ? mod : -1;
    }
}
 */
