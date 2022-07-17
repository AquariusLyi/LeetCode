/**
 标题：最长广播响应 | 时间限制：1秒 | 内存限制：262144K | 语言限制：不限
 
 最长广播效应
 
某通信网络中有N个网络结点，用1到N进行标识。网络中的结点互联互通，且结点之间的消息传递有时延，相连结点的时延均为一个时间单位。
现给定网络结点的连接关系link[i]={u,v}，其中u和v表示网络结点。
当指定一个结点向其他结点进行广播，所有被广播结点收到消息后都会在原路径上回复一条响应消息，请计算发送结点至少需要等待几个时间单位才能收到所有被广播结点的响应消息。
注：
1、N的取值范围为[1,100]；
2、连接关系link的长度不超过3000，且1 <= u,v <= N；
3、网络中任意结点间均是可达的；


输入描述:
输入的第一行为两个正整数，分别表示网络结点的个数N，以及时延列表的长度I；
接下来的I行输入，表示结点间的连接关系列表；
最后一行的输入为一个正整数，表示指定的广播结点序号；
 
输出描述:
输出一个整数，表示发送结点接收到所有响应消息至少需要等待的时长。


示例1
输入
5 7
2 1
1 4
2 4
2 3
3 4
3 5
4 5
2
 
输出
4
 
说明
2到5的最小时延是2个时间单位，而2到其他结点的最小时延是1个时间单位，所以2收到所有结点的最大响应时间为2*2=4。
 解体思路：（以示例1为例）

    将广播连接模拟成二维数组，根据输入可得：
    1 1 0 1 0
    1 1 1 1 0
    0 1 1 1 1
    1 1 1 1 1
    0 0 1 1 1

        注：1）1表示2个广播相连，广播本身也用1表示
           2）二维数组从0开始，而广播从1开始，所以广播在数组中表示需要-1
                        指定广播为2，二维数组第二行开始，行下标为1

1. 创建一个set集合（自动去重）表示已经广播到的节点，根据题意从节点2开始广播，所以将1（节点2的行坐标）放入，创建变量count用来表示延时单位

2. 以set集合中的数据作为行坐标下标进行遍历，当值为1的时候表示两节点相连，可以得到1，3，4（列坐标为0，2，3）的广播与2相连，并将0，2，3放入set集合中，遍历结束后count进行加1，表示2到1，3，4广播延时一个单位

3. 判断set集合的长度是否等于广播长度5
若不等，则重复步骤2：当遍历节点3（行坐标为2）的时候发现节点5（行坐标为4）与之相连，将4 放入set集合，遍历结束后count加1，表示2到节点5的广播延时为2个单位；之后再重复步骤3；
若相等，则输出count*2（广播传播需要来回，所以需要乘2）

 */
// 解法一
function maxGuangBo() {
  let [count, line] = readline().trim().split(/\s+/).map(Number);
  let arr = new Array(count + 1)
    .fill("")
    .map(() => new Array(count + 1).fill(0));
  for (let i = 0; i < line; i++) {
    let nextArr = readline().trim().split(/\s+/);
    let x1 = parseInt(nextArr[0]);
    let y1 = parseInt(nextArr[1]);
    arr[x1][y1] = 1;
  }
  let from = parseInt(readline().trim());
  let dis = new Array(count + 1).fill(0);
  for (let i = 0; i <= count; i++) {
    if (i == from) {
      dis[i] = 0;
    } else {
      dis[i] = Number.MAX_VALUE;
    }
  }
  let mark = new Array(count + 1).fill(false);
  calcTls(from, count);

  function calcTls(local, count) {
    mark[local] = true;
    for (let i = 1; i <= count; i++) {
      if (arr[local][i] != 0) {
        dis[i] = arr[local][i];
      }
    }

    let used = 0;
    while (used < count) {
      let tempLocal = 0;
      let distMin = Number.MAX_VALUE;
      for (let i = 1; i <= count; i++) {
        if (!mark[i] && dis[i] < distMin) {
          distMin = dis[i];
          tempLocal = i;
        }
      }
      local = tempLocal;

      mark[local] = true;
      for (let i = 1; i <= count; i++) {
        if (arr[local][i] != 0) {
          dis[i] = Math.min(dis[local] + arr[local][i], dis[i]);
        }
      }
      used++;
    }
    let maxDis = Number.MIN_VALUE;
    for (let i = 1; i <= count; i++) {
      maxDis = Math.max(maxDis, dis[i]);
    }
    console.log(maxDis << 1);
  }
}

maxGuangBo();

// 解法二 超时了
function guangbo() {
  let [m, n] = readline().trim().split(/\s+/).map(Number);

  let ints = new Array(m).fill("").map(() => new Array(m).fill(0));
  for (let i = 0; i < m; i++) {
    ints[i][i] = 1; //二阶数组，i=j相当于自己跟自己连接
  }

  for (let i = 0; i < n; i++) {
    let nextArr = readline().trim().split(/\s+/).map(Number);
    let r = nextArr[0] - 1; //因为数组是从0开始的所以要-1
    let c = nextArr[1] - 1;
    ints[r][c] = 1; //二阶数组中值等于1相当于i与j相连
    ints[c][r] = 1;
  }

  let fs = +readline().trim();
  let count = 0; //fs节点广播所有节点所需长度
  let hashSet = new Set(); //已经广播到的节点数组
  let temp = []; //上次广播到的节点
  temp.push(fs - 1); //因为数组是从0开始的所以要-1
  hashSet.add(fs - 1);
  while (hashSet.size < m) {
    let list = []; //上次广播到的节点进入本次广播
    temp = [];
    for (let j = 0; j < list.length; j++) {
      let index = list[j]; //当前广播节点
      for (let i = 0; i < m; i++) {
        if (!hashSet.has(i) && index != j && ints[index][i] == 1) {
          //将index能广播的节点添加到set、temp数组中
          hashSet.add(i); //已经广播到的节点数组
          temp.push(i);
        }
      }
      if (hashSet.size == m) {
        //标识所有节点都已经广播到了
        break;
      }
    }
    count++;
  }

  console.log(count * 2);
}
guangbo();
/**
 
java

// 解法一
import java.util.Scanner;

public class Main {
    private static int[][] arr;
    private static int[] dis;
    private static boolean[] mark;
    private static int from;

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] nms = sc.nextLine().split(" ");
        int count = Integer.parseInt(nms[0]);
        int line = Integer.parseInt(nms[1]);
        arr = new int[count + 1][count + 1];
        for (int i = 0; i < line; i++) {
            String[] dis = sc.nextLine().split(" ");
            int x1 = Integer.parseInt(dis[0]);
            int y1 = Integer.parseInt(dis[1]);
            arr[x1][y1] = 1;
        }
        from = Integer.parseInt(sc.nextLine());
        dis = new int[count + 1];
        for (int i = 0; i <= count; i++) {
            if (i == from) {
                dis[i] = 0;
            } else {
                dis[i] = Integer.MAX_VALUE;
            }
        }
        mark = new boolean[count + 1];
        calcTls(from, count);
    }

    private static void calcTls(int local, int count) {
        mark[local] = true;
        for (int i = 1; i <= count; i++) {
            if (arr[local][i] != 0) {
                dis[i] = arr[local][i];
            }
        }

        int used = 0;
        while (used < count) {
            int tempLocal = 0;
            int distMin = Integer.MAX_VALUE;
            for (int i = 1; i <= count; i++) {
                if (!mark[i] && dis[i] < distMin) {
                    distMin = dis[i];
                    tempLocal = i;
                }
            }
            local = tempLocal;

            mark[local] = true;
            for (int i = 1; i <= count; i++) {
                if (arr[local][i] != 0) {
                    dis[i] = Math.min(dis[local] + arr[local][i], dis[i]);
                }
            }
            used++;
        }
        int maxDis = Integer.MIN_VALUE;
        for (int i = 1; i <= count; i++) {
            maxDis = Math.max(maxDis, dis[i]);
        }
        System.out.println(maxDis << 1);
    }
}

// 解法二
  
 public class Main{
 
    public static void main(String[] args) {
 
        Scanner sc = new Scanner(System.in);
 
        int m = sc.nextInt();
        int n = sc.nextInt();
 
        int[][] ints = new int[m][m];
        for(int i=0;i<m;i++){
            ints[i][i] = 1;     //二阶数组，i=j相当于自己跟自己连接
        }
 
        for(int i=0;i<n;i++){
            int r = sc.nextInt()-1;    //因为数组是从0开始的所以要-1
            int c = sc.nextInt()-1;
            ints[r][c] = 1;     //二阶数组中值等于1相当于i与j相连
            ints[c][r] = 1;
        }
 
        int fs = sc.nextInt();
        int count = 0;  //fs节点广播所有节点所需长度
        HashSet<Integer> hashSet = new HashSet<>(); //已经广播到的节点数组
        List<Integer> temp = new ArrayList<>();     //上次广播到的节点
        temp.add(fs-1); //因为数组是从0开始的所以要-1
        hashSet.add(fs-1);
        while (hashSet.size()<m){
 
            List<Integer> list = new ArrayList<>(temp); //上次广播到的节点进入本次广播
            temp.clear();
            for (int j=0;j<list.size();j++) {
                int index = list.get(j);    //当前广播节点
                for(int i=0;i<m;i++){
                    if(!hashSet.contains(i) && index!=j && ints[index][i]==1){  //将index能广播的节点添加到set、temp数组中
                        hashSet.add(i); //已经广播到的节点数组
                        temp.add(i);
                    }
                }
                if(hashSet.size()==m){  //标识所有节点都已经广播到了
                    break;
                }
            }
            count++;
        }
 
        System.out.println(count*2);
    }
}
 */
