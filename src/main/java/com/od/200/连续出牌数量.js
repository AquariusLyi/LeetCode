/**
 连续出牌数量

手里给一副手牌，数字从0-9，有r(红色),，g(绿色），b(蓝色)，y(黄色)四种颜色，出牌规则为每次打出的牌必须跟上一张的数字或者颜色相同，否则不能抽选。
选手应该怎么选才能使得抽选的次数最大，并且输出这个最大次数。
输入描述

第一行 牌的数值n (1<=n<=9)
第二行 牌的颜色（r,g,b,y四种颜色表示)
输出描述

输出最大出牌数量
示例 1 输入输出示例仅供调试，后台判题数据一般不包含示例

输入

1 4 3 4 5
r y b b r

输出

3

说明

如果打（1, r）-> (5, r)，那么能打两张。

如果打（4，y) -> (4, b) -> (3, b)，那么能打三张。

 */

function puke() {
  let max = Number.MIN_VALUE;
  let s1 = readline().trim().split(/\s+/);
  let s2 = readline().trim().split(/\s+/);
  let list = [];
  handleList(s1, s2, list);
  console.log(max);

  function handleList(s1, s2, list) {
    for (let i = 0; i < s1.length; i++) {
      let key = s1[i] + "_" + s2[i] + "_" + i;
      list.push(key);
      dfs(s1, s2, list, i);
      list.splice(list.indexOf(key), 1);
    }
  }

  function dfs(s1, s2, list, i) {
    max = Math.max(max, list.length);
    for (let n = 0; n < s1.length; n++) {
      let key = s1[n] + "_" + s2[n] + "_" + n;
      if (list.includes(key)) {
        continue;
      }
      if (parseInt(s1[i]) == parseInt(s1[n]) || s2[i] == s2[n]) {
        list.push(key);
        dfs(s1, s2, list, n);
        list.splice(list.indexOf(key), 1);
      }
    }
  }
}

puke();

/**
 java

 import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Main {
    static int max = Integer.MIN_VALUE;

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] s1 = sc.nextLine().split(" ");
        String[] s2 = sc.nextLine().split(" ");
        List<String> list = new ArrayList<>();
        getRe(s1, s2, list);
        System.out.println(max);
    }

    private static void getRe(String[] s1, String[] s2, List<String> list) {
        for (int i = 0; i < s1.length; i++) {
            String key = s1[i] + "_" + s2[i] + "_" + i;
            list.add(key);
            dfs(s1, s2, list, i);
            list.remove(key);
        }
    }

    private static void dfs(String[] s1, String[] s2, List<String> list, int i) {
        max = Math.max(max, list.size());
        for (int n = 0; n < s1.length; n++) {
            String key = s1[n] + "_" + s2[n] + "_" + n;
            if (list.contains(key)) {
                continue;
            }
            if (Integer.parseInt(s1[i]) == Integer.parseInt(s1[n]) || s2[i].equals(s2[n])) {
                list.add(key);
                dfs(s1, s2, list, n);
                list.remove(key);
            }
        }
    }
}
 */
