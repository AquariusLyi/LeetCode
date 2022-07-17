/**
高矮个子排队

现在有一队小朋友，他们高矮不同，我们以正整数数组表示这一队小朋友的身高，如数组{5,3,1,2,3}。
我们现在希望小朋友排队，以“高”“矮”“高”“矮”顺序排列，每一个“高”位置的小朋友要比相邻的位置高或者相等；每一个“矮”位置的小朋友要比相邻的位置矮或者相等；
要求小朋友们移动的距离和最小，第一个从“高”位开始排，输出最小移动距离即可。
例如，在示范小队{5,3,1,2,3}中，{5, 1, 3, 2, 3}是排序结果。{5, 2, 3, 1, 3} 虽然也满足“高”“矮”“高”“矮”顺序排列，但小朋友们的移动距离大，所以不是最优结果。
移动距离的定义如下所示：
第二位小朋友移到第三位小朋友后面，移动距离为1，若移动到第四位小朋友后面，移动距离为2；

输入描述:
排序前的小朋友，以英文空格的正整数：
4 3 5 7 8
注：小朋友<100个
输出描述:
排序后的小朋友，以英文空格分割的正整数：
4 3 7 5 8

示例1：
输入
4 1 3 5 2
输出
4 1 5 2 3
示例2：
输入
1 1 1 1 1
输出
1 1 1 1 1
说明
相邻位置可以相等
示例3：
输入
xxx
输出
[ ]
说明：
出现非法参数情况， 返回空数组
备注:
4（高）3（矮）7（高）5（矮）8（高）， 输出结果为最小移动距离，只有5和7交换了位置，移动距离都是1。

 */

function getSort(args) {
  let input = args.trim().split(/\s+/);
  let reg = /^[0-9]+$/;
  let bool = true;
  for (let i = 0; i < input.length; i++) {
    const ele = input[i];
    if (!reg.test(ele)) {
      bool = false;
      break;
    }
  }
  if (!bool) {
    console.log("[ ]");
    return;
  }
  let arr = input.map(Number);
  let flag = 0;
  let n = 0;
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j > 0; j--) {
      if (flag == 0) {
        // 排矮, 高--矮
        if (arr[i] < arr[j]) {
          // 后面的高, 交换
          swap(arr, i, j);
          n++;
        }
        flag = 1;
      } else {
        // 排高的, 矮--高
        if (arr[i] > arr[j]) {
          // 后面的矮, 交换
          swap(arr, i, j);
          n++;
        }
        flag = 0;
      }
      break;
    }
  }
  //   console.log("\n移动次数: " + n);
  console.log(arr.join(" "));
}
function swap(arr, x, y) {
  let tmp = arr[x];
  arr[x] = arr[y];
  arr[y] = tmp;
}
getSort("5 3 1 2 3");
getSort("4 1 3 5 2");
getSort("4 1 3 5 =-");
getSort("1 1 1 1 1");

/**
 java

import java.util.Scanner;
import java.util.LinkedList;
public class Main {
    public static void main(String[] args) {
       Scanner sc = new Scanner(System.in);
        LinkedList<Integer> list = new LinkedList<Integer>();
        try {
            while (sc.hasNext()) {
                list.add(Integer.valueOf(sc.next()));
            }
        } catch (Exception e) {
            System.out.println("[]");
            return;
        }

        for (int i = 0; i < list.size() - 1; i++) {
            if (i % 2 == 0 && Integer.valueOf(list.get(i)) < Integer.valueOf(list.get(i + 1))) {
                int tmp = list.get(i);
                list.set(i, list.get(i + 1));
                list.set(i + 1, tmp);
            } else if (i % 2 == 1 && Integer.valueOf(list.get(i)) > Integer.valueOf(list.get(i + 1))) {
                int tmp = list.get(i);
                list.set(i, list.get(i + 1));
                list.set(i + 1, tmp);
            }
            //System.out.print(str[i]);
        }
        for (int i = 0; i < list.size(); i++) {
            if (i != list.size() - 1) {
                System.out.print(list.get(i) + " ");
            } else {
                System.out.println(list.get(i));
            }
        }
    }
}

// 解法二
import java.util.Arrays;
import java.util.List;
import java.util.Scanner;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        List<Integer> high = null;
        try {
            high = Arrays.stream(in.nextLine().split(" "))
                    .map(Integer::parseInt).collect(Collectors.toList());
        } catch (Exception e) {
            System.out.println("[]");
            return;
        } finally {
            in.close();
        }

        for (int i = 0; i < high.size() - 1; i++) {
            if (i % 2 == 0 && high.get(i) < high.get(i + 1)) {
                swap(high, i, i + 1);
            }
            if (i % 2 == 1 && high.get(i) > high.get(i + 1)) {
                swap(high, i, i + 1);
            }
        }
        StringBuilder builder = new StringBuilder();
        high.forEach(x -> builder.append(x).append(" "));
        String res = builder.substring(0, builder.length() - 1);
        System.out.println(res);

    }

    static void swap(List<Integer> list, int x, int y) {
        Integer tmp = list.get(x);
        list.set(x, list.get(y));
        list.set(y, tmp);
    }
}

 */
