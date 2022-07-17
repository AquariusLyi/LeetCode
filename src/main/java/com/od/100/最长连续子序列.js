/**
 
最长连续子序列
 
题目描述：

有N个正整数组成的一个序列，给定一个整数sum
求长度最长的的连续子序列使他们的和等于sum
返回次子序列的长度，如果没有满足要求的序列 返回-1
备注：

输入序列仅由数字和英文逗号构成，数字之间采用英文逗号分割
序列长度 1<=N<=200，输入序列不考虑异常情况
由题目保证输入序列满足要求
示例

输入：

1,2,3,4,2
6
输出：

3
解析：

1,2,3和4,2两个序列均能满足要求，所以最长的连续序列为1,2,3 因此结果为3
输入：

1,2,3,4,2
20
输出：

-1
解释：

没有满足要求的子序列，返回-1
————————————————
版权声明：本文为CSDN博主「G1useppE」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/G1useppE/article/details/124698369
 */
function longList(str1, str2) {
  let list = str1.trim().split(",").map(Number);
  let sum = +str2.trim();
  let max = -1;
  for (let i = 0; i < list.length; i++) {
    let temp = sum;
    for (let j = i; j < list.length; j++) {
      temp -= parseInt(list[j]);
      if (temp == 0) {
        max = Math.max(max, j - i); // max > j - i ? max : j - i;
      }
    }
  }
  max = max > -1 ? max + 1 : -1;
  console.log(max);
}
longList("1,2,3,4,2", "6");
longList("1,2,3,4,2", "20");

// 第二种写法--------------------------
var longestConsecutive = function (nums, k) {
  let len = nums.length;

  preSum = 0;
  result = -1;
  map = { 0: -1 };

  for (let i = 0; i < len; i++) {
    preSum += nums[i];
    if (map[preSum] === undefined) {
      map[preSum] = i;
    }
    if (map[preSum - k] !== undefined) {
      result = Math.max(result, i - map[preSum - k]);
    }
  }
  console.log(result);
};

longestConsecutive([1, 2, 3, 4, 2], 6);
longestConsecutive([1, 2, 3, 4, 2], 20);

/**
 java



import java.util.*;
import java.io.*;
public class Main{
    public static void main(String[] rds)throws IOException{
        Scanner br = new Scanner(System.in);
        String str = br.nextLine();
        int sum = br.nextInt();
        String[] list = str.split(",");
        int max = -1;
        for(int i =0;i<list.length;i++){
            int temp = sum;
            for(int j = i;j<list.length;j++){
                temp -= Integer.parseInt(list[j]);
                if(temp == 0){
                    max = max>j-i?max:j-i;
                }
            }
        }
        max = max >-1?max+1:-1;
        System.out.println(max);
    }
}
 */
