/**
 编程题目 | 200分】服务器广播 [ 200 / 困难 ]

■ 题目描述

某地有N个广播站，站点之间有些有连接，有些没有。有连接的站点在接受到广播后会互相发送。
给定一个N*N的二维数组matrix,数组的元素都是字符’0’或者’1’。matrix[i][j]=‘1’,则代表i和j站点之间有连接，matrix[i][j] = ‘0’代表没连接，
现在要发一条广播，问初始最少给几个广播站发送，才能保证所有的广播站都收到消息。
输入描述：

从stdin输入，共一行数据，表示二维数组的各行，用逗号分隔行。保证每行字符串所含的字符数一样的。
比如：110,110,001。
输出描述：

返回初始最少需要发送广播站个数。
示例1   输入输出示例仅供调试，后台判题数据一般不包含示例

服务器广播
题目描述：
服务器连接方式包括直接相连，间接连接。A 和 B 直接连接，B 和 C 直接连接，则 A 和 C 间接连接。直接连接和间接连接都可以发送广播。

给出一个 N*N 数组，代表 N 个服务器，matrix[i][j]==1，则代表 i 和 j 直接连接；
不等于 1 时，代表 i 和 j 不直接连接。
matrix[i][i]==1，即自己和自己直接连接。matrix[i][j]==matrix[j][i]。
计算初始需要给几台服务器广播，才可以使每个服务器都收到广播。

输入描述
输入为N行，每行有N个数字，为0或1，由空格分隔，构成N*N的数组，N的范围为 1<=N<=50

输出描述
输出一个数字，为需要广播的服务器数量

示例 1：
输入
1 0 0
0 1 0
0 0 1


输出
3

说明
3台服务器互不连接，所以需要分别广播这3台服务器

示例 1：
输入
1 1
1 1


输出
1

说明
2台服务器相互连接，所以只需要广播其中一台服务器

思路分析：
从第一个开始判断，依次将直连的服务器加进来
从1找到的集合中依次将直连的服务器加进来，直到集合没有变化
获取1集合中不存在的服务器，重复以上步骤
上述集合的个数，就是需要发出广播的服务器数量
————————————————
版权声明：本文为CSDN博主「小朱小朱绝不服输」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_44052055/article/details/124148459



服务器连接方式包括直接相连，间接连接。
A 和 B 直接连接， B 和 C 直接连接，则 A 和 C 间接连接。直接连接和间接连接都可以发送广播。
给出一个 N * N 数组，代表 N 个服务器， matrix[i][j] == 1 ，则代表 i 和 j 直接连接；
不等于 1 时，代表 i 和 j 不直接连接。 matrix[i][i]== 1 ，即自己和自己直接连接。
matrix[i][j]==matrix[j][i] 。
计算初始需要给几台服务器广播，才可以使侮个服务器都收到广播。


【分析】
实质是图的遍历，求连通分量的个数；
做这道题的时候没想到遍历该怎么写，用了比较麻烦的方法；
用一个 Set 存储一个连通分量，将它们保存到数组中，数组的长度就是连通分量的个数，即本题的答案；
具体做法是：遍历整个邻接矩阵，每遍历到新的一行，判断当前节点是否已经存在于某个已有的连通分量，如果有，将与其直接连接的节点存到该连通分量；如果没有，新建一个 Set （新连通分量）进行存储，最后得到整个连通分量的数组，用 Set 是保证没有重复，数组也可


————————————————
版权声明：本文为CSDN博主「下一个路口遇见你48」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/m0_56229413/article/details/117739284

*/
// 解法一
function ServiceBroadcast_dfs() {
  let count = 0;
  let str = readline().trim().split(" ");
  let n = str.length;
  let arr = new Array(n).fill().map(() => new Array(n).fill(0)); // new int[n][n];
  for (let i = 0; i < n; i++) {
    // 把第一行加入arr
    arr[0][i] = parseInt(str[i]);
  }
  for (let i = 1; i < n; i++) {
    // 把剩下的行加入arr
    let s = readline().split(" ");
    for (let j = 0; j < n; j++) {
      arr[i][j] = parseInt(s[j]);
    }
  }
  let visited = [];
  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      dfs(arr, visited, i);
    }
  }
  console.log(count);
  function dfs(arr, visited, index) {
    visited[index] = true;
    let flag = true;
    for (let i = index + 1; i < arr.length; i++) {
      if (arr[index][i] == 1) {
        flag = false;
        dfs(arr, visited, i);
      }
    }
    if (flag) {
      count++;
    }
  }
}
ServiceBroadcast_dfs();

// 解法二

function ServiceBroadcast() {
  let str = readline().trim().split(" ");
  let n = str.length;
  let arr = new Array(n).fill().map(() => new Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    // 把第一行加入arr
    arr[0][i] = parseInt(str[i]);
  }
  for (let i = 1; i < n; i++) {
    // 把剩下的行加入arr
    let s = readline().split(" ");
    for (let j = 0; j < n; j++) {
      arr[i][j] = parseInt(s[j]);
    }
  }

  const len = arr.length;
  // 记录连通分量
  const res = [];
  for (let i = 0; i < len; i++) {
    // 标记：判断当前节点是否已经被记录（已属于已有的某个连通分量）
    let flag = false;

    // 当前所指向的连通分量
    let temp = null;

    for (const x of res) {
      if (x.has(i)) {
        // 若在连通分量数组中找到，表示该节点已经与之前的节点连通，那么与该节点连通的节点，也与之前的节点间接连通
        temp = x;
        flag = true;
        break;
      }
    }

    if (!flag) {
      // 如果未找到，则创建一个新的set：表示一个新的连通分量
      const set = new Set();
      set.add(i);
      res.push(set);
      temp = set;
    }

    for (let j = i + 1; j < len; j++) {
      // 邻接矩阵对称，所以从 i+1 开始
      if (arr[i][j] === 1) {
        // i 与 j 直接连通，将 j 存储到 i 所属的连通分量中
        temp.add(j);
      }
    }
  }

  // 输出结果
  console.log(res.length);
}
ServiceBroadcast();

/**
 java


 
 import java.util.*;

public class Main {
    public static int count = 0;
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        String[] str = in.nextLine().split(" ");
        int n = str.length;
        int[][] arr = new int[n][n];
        for(int i = 0; i < n; i++) {  // 把第一行加入arr
            arr[0][i] = Integer.parseInt(str[i]);
        }
        for(int i = 1; i < n; i++) {  // 把剩下的行加入arr
            String[] s = in.nextLine().split(" ");
            for(int j = 0; j < n; j++) {
                arr[i][j] = Integer.parseInt(s[j]);
            }
        }
        boolean[] visited = new boolean[n];
        for(int i = 0; i < n; i++) {
            if(!visited[i]) {
                dfs(arr, visited, i);
            }
        }
        System.out.println(count);
    }
    public static void dfs(int[][] arr, boolean[] visited, int index) {
        visited[index] = true;
        boolean flag = true;
        for (int i = index + 1; i < arr.length; i++) {
            if (arr[index][i] == 1) {
                flag = false;
                dfs(arr, visited, i);
            }
        }
        if (flag) {
            count++;
        }
    }
}

// 解法二
import java.util.*;

public class ServiceBroadcast {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        while (in.hasNext()) {
            String[] str = in.nextLine().split(" ");
            List<Integer> list = new ArrayList<>();
            for (int i = 0; i < str.length; i++) {  // 把第一行加入list
                list.add(Integer.parseInt(str[i]));
            }
            for (int i = 0; i < str.length - 1; i++) {  // 把剩下的行都加入list
                String[] s = in.nextLine().split(" ");
                for (int j = 0; j < s.length; j++) {
                    list.add(Integer.parseInt(s[j]));
                }
            }
            int N = str.length;
            List<List<Integer>> res = new ArrayList<>(); // 存储需要广播的服务器
            for (int i = 0; i < N; i++) {  // 每一行
                if (isContainer(res, i)) {  // 判断某个服务器是否已经存在其连通的服务器集合中
                    continue;
                }
                List<Integer> newList = new ArrayList<>();
                newList.add(i);
                int lastLength = 0;
                while (lastLength != newList.size()) { // 判断当前集合可以联通的服务器
                    for (int k = 0; k < newList.size(); k++) {
                        int x = newList.get(k);
                        for (int j = 0; j < N; j++) {
                            int index = x * (N) + j;  // 找到在对应list的索引
                            if (list.get(index).equals(1)) {
                                if (!newList.contains(j)) {
                                    newList.add(j);
                                }
                            }
                        }
                    }
                    lastLength = newList.size();
                }
                res.add(newList);
            }
            System.out.println(res.size());
        }
    }
    public static Boolean isContainer(List<List<Integer>> res, int x) {
        for (List<Integer> integers : res) {
            if (integers.contains(x)) {
                return true;
            }
        }
        return false;
    }
}

 */

//dfs Java  解法

/**
 import java.util.*;

public class ServiceBroadcast_dfs {
    public static int count = 0;
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        String[] str = in.nextLine().split(" ");
        int n = str.length;
        int[][] arr = new int[n][n];
        for(int i = 0; i < n; i++) {  // 把第一行加入arr
            arr[0][i] = Integer.parseInt(str[i]);
        }
        for(int i = 1; i < n; i++) {  // 把剩下的行加入arr
            String[] s = in.nextLine().split(" ");
            for(int j = 0; j < n; j++) {
                arr[i][j] = Integer.parseInt(s[j]);
            }
        }
        boolean[] visited = new boolean[n];
        for(int i = 0; i < n; i++) {
            if(!visited[i]) {
                dfs(arr, visited, i);
            }
        }
        System.out.println(count);
    }
    public static void dfs(int[][] arr, boolean[] visited, int index) {
        visited[index] = true;
        boolean flag = true;
        for (int i = index + 1; i < arr.length; i++) {
            if (arr[index][i] == 1) {
                flag = false;
                dfs(arr, visited, i);
            }
        }
        if (flag) {
            count++;
        }
    }
}

 */
