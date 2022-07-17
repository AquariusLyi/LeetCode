/**
【 编程题目 | 100分】数组去重和排序 [ 100 / 中等 ]

数组去重和排序

题目描述：
给定一个乱序的数组，删除所有的重复元素，使得每个元素只出现一次，并且按照出现的次数从高到低进行排序，相同出现次数按照第一次出现顺序进行先后排序。

输入描述：
一个数组

输出描述：
去重排序后的数组

示例 1：
输入
1,3,3,3,2,4,4,4,5

输出
3,4,1,2,5

备注
数组大小不超过100 数组元素值大小不超过100
————————————————
版权声明：本文为CSDN博主「小朱小朱绝不服输」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_44052055/article/details/124053155

 */

function getNewWord(str) {
  const splitArr = str.trim().split(",");
  // 去重排序，并且按照出现的次数从高到低进行排序，相同出现次数按照第一次出现顺序进行先后排序。
  let map = new Map();
  splitArr.forEach((item) => {
    map.set(item, parseInt(map.get(item) || 0) + 1);
  });
  let res = Array.from(map).sort((a, b) => b[1] - a[1]);
  let out = [];
  res.forEach((item) => {
    out.push(item[0]);
  });
  console.log(out.join(","));
}
getNewWord("1,3,3,3,2,4,4,4,5");

/**
 java

 
import java.util.Scanner;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.Map;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String line = sc.nextLine();
        String[] numbers = line.split(",");
        int[] ints = new int[numbers.length];
        for (int i = 0; i < ints.length; i++) {
            ints[i] = Integer.valueOf(numbers[i]);
        }
        LinkedHashMap<Integer, Integer> map = new LinkedHashMap<>();
        for (int i = 0; i < ints.length; i++) {
            if (map.isEmpty()) {
                map.put(ints[i], 1);
            } else {
                if (map.containsKey(ints[i])) {
                    int value = map.get(ints[i]);
                    value++;
                    map.put(ints[i], value);
                } else {
                    map.put(ints[i], 1);
                }
            }

        }
        Set<Map.Entry<Integer, Integer>> set = map.entrySet();
        LinkedList<Map.Entry<Integer, Integer>> list = new LinkedList<>(set);
        list.sort((o1, o2) -> o2.getValue() - o1.getValue());
        for (int i = 0; i < list.size(); i++) {
            Map.Entry<Integer, Integer> entry = list.get(i);
            if (i != list.size() - 1) {
                System.out.print(entry.getKey() + ",");
            } else {
                System.out.println(entry.getKey());
            }
        }
    }
}

// 由于HashMap无序，无法表示字符原先的顺序，因此这里修改为使用LinkedHashMap。其中，LinkedHashMap继承自HashMap，它的多种操作都是建立在HashMap操作的基础上的。同HashMap不同的是，LinkedHashMap维护了一个Entry的双向链表，保证了插入的Entry中的顺序

import java.util.*;

public class arraySetSort {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        String[] str = in.nextLine().split(",");
        int[] ints = new int[str.length];
        for (int i = 0; i < ints.length; i++) {
            ints[i] = Integer.parseInt(str[i]);
        }
//        HashMap<Integer, Integer> map = new HashMap<>();
        LinkedHashMap<Integer, Integer> map = new LinkedHashMap<>();
        for (int i = 0; i < ints.length; i++) {  // 统计数字出现的频次
            map.put(ints[i], map.getOrDefault(ints[i], 0) + 1);
        }
        // Map按value排序，先将map转为list,再排序list
//        List<Map.Entry<Integer,Integer>> list = new ArrayList<>(map.entrySet());
        LinkedList<Map.Entry<Integer,Integer>> list = new LinkedList<>(map.entrySet());
        list.sort((o1, o2) -> o2.getValue() - o1.getValue());
        for (int i = 0; i < list.size(); i++) {
            Map.Entry<Integer, Integer> entry = list.get(i);
            if (i != list.size() - 1) {
                System.out.print(entry.getKey() + ",");
            } else {
                System.out.println(entry.getKey());
            }
        }
    }
}

 */
