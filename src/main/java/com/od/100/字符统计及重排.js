/**
字符统计及重排

给出一个仅包含字母的字符串，不包含空格，统计字符串中各个字母（区分大小写）出现的次数，并按照字母出现次数从大到小的顺序输出各个字母及其出现次数。如果次数相同，按照自然顺序进行排序，且小写字母在大写字母之前。

输入描述:
输入一行，为一个仅包含字母的字符串。
输出描述:
按照字母出现次数从大到小的顺序输出各个字母和字母次数，用英文分号分隔，注意末尾的分号；字母和次数间用英文冒号分隔。

示例1
输入
xyxyXX
输出
x:2;y:2;X:2;
说明
每个字符出现的个数都是2，故x排在y之前，而小写字母x在X之前
示例2
输入
abababb
输出
b:4;a:3;
说明
b的出现个数比a多，故b排在a之前

 */

function zfctj() {
  let s = readline().trim();

  let map = new Map();

  for (let i = 0; i < s.length; i++) {
    let ele = s[i];
    map.set(ele, Number(map.get(ele) || 0) + 1);
    // map.set(s.charAt(i), (map.get(s.charAt(i)) || 0) + 1); //将输入内容转成键值对
  }

  let entryList = Array.from(map.entries());

  entryList.sort((a, b) => {
    if (b[1] > a[1]) {
      //按出现次数顺序排序
      return 1;
    }
    if (b[1] < a[1]) {
      //按出现次数顺序排序
      return -1;
    }
    if (/^[a-z]+$/.test(b[0]) && /^[A-Z]+$/.test(a[0])) {
      //限制小写在前
      return 1;
    }
    if (/^[a-z]+$/.test(a[0]) && /^[A-Z]+$/.test(b[0])) {
      //限制小写在前
      return -1;
    }
    if (b[0] < a[0]) {
      //按字母顺序排序
      return 1;
    }
    return -1;
  });

  let res = "";
  for (let i = 0; i < entryList.length; i++) {
    res += entryList[i][0] + ":";
    res += entryList[i][1] + ";";
  }

  console.log(res);
}

/**
 解法一：

import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String str = sc.nextLine();
        int[] a = new int[256];
        for (int i = 0; i < str.length(); i ++) {
            a[str.charAt(i)] ++;
        }
        int max = 0;
        for (int i : a) {
            max = Math.max(i ,max);
        }
        for (int i = max; i > 0; i --) {
            for (int j = 97; j < 123; j ++) {
                if (a[j] == i) {
                    System.out.print((char)j);
                    System.out.print(":");
                    System.out.print(i);
                    System.out.print(";");
                }
            }
            for (int j = 65; j < 91; j ++) {
                if (a[j] == i) {
                    System.out.print((char)j);
                    System.out.print(":");
                    System.out.print(i);
                    System.out.print(";");
                }
            }
        }
    }
}


// 解法二
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class Main{
    public static void main(String[] args) {

        Scanner in = new Scanner(System.in);
        String str = in.nextLine();
        in.close();

        HashMap<Character, Integer> map = new HashMap<>();
        for (char c : str.toCharArray()) {
            map.put(c, map.getOrDefault(c, 0) + 1);
        }

        print(map.entrySet().stream().filter(e -> e.getKey() >= 'a'));
        print(map.entrySet().stream().filter(e -> e.getKey() <= 'Z'));

    }

    private static void print(Stream<Map.Entry<Character, Integer>> stream) {
        List<Map.Entry<Character, Integer>> list = stream
                .sorted((o1, o2) -> {
                    int v1 = o1.getValue();
                    char k1 = o1.getKey();
                    int v2 = o2.getValue();
                    char k2 = o2.getKey();
                    if (v1 != v2) {
                        return v2 - v1;
                    } else {
                        return k1 - k2;
                    }
                }).collect(Collectors.toList());

        StringBuilder builder = new StringBuilder();
        for (Map.Entry<Character, Integer> entry : list) {
            builder.append(entry.getKey()).append(":")
                    .append(entry.getValue()).append(";");
        }

        System.out.print(builder);
    }

}

 */
