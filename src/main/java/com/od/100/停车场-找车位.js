/**
 找车位
停车场有一横排车位，0代表没有停车，1代表有车。至少停了一辆车在车位上，也至少有一个空位没有停车。
为了防剐蹭，需为停车人找到一个车位，使得距停车人的车最近的车辆的距离是最大的，返回此时的最大距离。

输入描述:
1、一个用半角逗号分割的停车标识字符串，停车标识为0或1，0为空位，1为已停车。
2、停车位最多100个。
输出描述:
输出一个整数记录最大距离。

示例1
输入
1,0,0,0,0,1,0,0,1,0,1
输出
2
说明
当车停在第3个位置上时，离其最近的的车距离为2（1到3）。
当车停在第4个位置上时，离其最近的的车距离为2（4到6）。
其他位置距离为1。
因此最大距离为2。

解题思路
求最大距离，就是求连续0的最大长度。
如果是偶数直接除以2；如果是奇数则-1除以2。
*难点是要考虑到前后为0的情形，这两种情形是不需要进行除法的。
 */

// 解法一

function niuke() {
  // 1,0,0,0,0,1,0,0,1,0,1
  let input = readline().trim();
  let replace = input.replace(/,/g, "");
  let split = input.split(",");
  let max = 0;
  for (let i = 0; i < split.length; i++) {
    let cur = split[i];
    if (cur == "0") {
      // 下一个位置
      let last = replace.indexOf("1", i);
      // 上一个位置
      let pre = replace.lastIndexOf("1", i);
      if (last == -1) {
        last = replace.length - 1;
      }
      if (pre == -1) {
        pre = 100;
      }
      let min = Math.min(last - i, i - pre);
      max = Math.max(min, max);
    }
  }
  console.log(max);
}

// 解法二
function parking(args) {
  let splitArr = args.trim().split(",");
  let listArr = [];
  for (let i = 0; i < splitArr.length; i++) {
    if (splitArr[i] == "1") {
      listArr.push(i); //记录1的下标，0的长度=后一个下标 - 前一个下标 - 1
    }
  }
  let count = 0;
  if (splitArr[0] == "0") {
    //考虑到开头为0的情形
    count = Math.max(count, listArr[0]);
  }
  if (splitArr[splitArr.length - 1] == "0") {
    //考虑到末尾为0的情形
    count = Math.max(count, splitArr.length - 1 - listArr[listArr.length - 1]);
  }

  let max = 0;

  for (let i = 1; i < listArr.length; i++) {
    max = Math.max(max, listArr[i] - listArr[i - 1] - 1); //通过1的下标求0的长度
  }

  if (max % 2 == 0) {
    console.log(Math.max(count, max / 2)); //偶数直接除以2
  } else {
    console.log(Math.max(count, (max + 1) / 2)); //奇数-1除以2
  }
}
parking("1,0,0,0,0,1,0,0,1,0,1");
parking("1,0,0,0,0,0,0,1,0,0,1,0,1");
/**
 java


答案：
解法一：

import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String line = sc.next();
        String[] place = line.split(",");
        int count = 0, max = 0, left = 0;
        for (String s : place) {
            if (s.equals("0")) {
                count++;
            } else {
                if (left == 0) {
                    max = count * 2;
                    left = 1;
                } else {
                    max = Math.max(max, count);
                }
                count = 0;
            }
        }
        if (place[place.length - 1].equals("0")) {
            max = Math.max(max, count * 2);
        } else {
            max = Math.max(max, count);
        }
        System.out.println((max + 1) / 2);
    }
}
 */

/**
 import java.util.Scanner;
 
public class Main {
 
  public static void main(String[] args) {
      Scanner in = new Scanner(System.in);
      String line = in.nextLine()
              .replaceAll(",", "");
      char[] sites = line.toCharArray();
      in.close();

      int max = 0;

      for (int i = 0; i < sites.length; i++) {
          char cur_site = sites[i];
          if (cur_site == '0') {
              int pre = line.indexOf('1', i);
              int suf = line.lastIndexOf('1', i);
              if (pre == -1) pre = 100;
              if (suf == -1) suf = line.length() - 1;
              int min = Math.min(pre - i, i - suf);
              if (min > max) max = min;
          }
      }

      System.out.println(max);

  }
}
 */
