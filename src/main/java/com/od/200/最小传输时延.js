/**
 标题：最小传输时延 | 时间限制：1秒 | 内存限制：262144K | 语言限制：不限
某通信网络中有N个网络结点，用1到N进行标识。网络通过一个有向无环图表示，其中图的边的值表示结点之间的消息传递时延。
现给定相连节点之间的时延列表times[i]={u,v,w}，其中u表示源结点，v表示目的结点，w表示u和v之间的消息传递时延。请计算给定源结点到目的结点的最小传输时延，如果目的结点不可达，返回-1。
注：
1、N的取值范围为[1,100]；
2、时延列表times的长度不超过6000，且1 <= u,v <= N, 0 <= w <= 100；

输入描述:
输入的第一行为两个正整数，分别表示网络结点的个数N，以及时延列表的长度M，用空格分隔；
接下来的M行为两个结点间的时延列表[u v w]；
输入的最后一行为两个正整数u和v，分别表示源结点和目的结点；
输出描述:
输出一个整数，表示源结点到目的结点的最小时延。
示例1
输入
3 3
1 2 11
2 3 13
1 3 50
1 3
输出
24
说明
1->3的时延是50，1->2->3时延是11+13=24，所以1到3的最小时延是24；
解题思路：
看到这种广播类型的，就要想到二维数组，行和列代表其网络节点，值表示延时
如例一所得：（数组下标为节点-1）
0    11  50
11   0  13
50  13   0
1、对源节点1进行遍历，找出与之相连的节点，并进行延时求和
2、对与之相连节点进行步骤1的操作
3、当碰到目的节点的时候，输出延时之和并进行计算最小值
 */

function minTrans() {
  let [N, M] = readline().trim().split(/\s+/).map(Number);

  var ints = Array(N)
    .fill("")
    .map(() => Array(N).fill(0)); //新建全为0的二维数组
  var min = Number.MAX_VALUE;
  var list = []; //存放遍历过的节点

  /**
   * 根据输入值构建二维数组
   * 数组下标从0开始，需要-1
   */
  for (let i = 0; i < M; i++) {
    let str = readline().trim().split(/\s+/).map(Number);
    ints[str[0] - 1][str[1] - 1] = str[2];
    ints[str[1] - 1][str[0] - 1] = str[2];
  }

  let endline = readline().trim().split(/\s+/).map(Number);

  let start = endline[0] - 1; //源节点
  var end = endline[1] - 1; //目的节点

  qiushiyan(start, 0);
  console.log(min);

  /**
   * @param start 源节点
   * @param count 时延总和
   */
  function qiushiyan(start, count) {
    for (let i = 0; i < N; i++) {
      let num = ints[start][i];
      if (num != 0 && list.indexOf(i) == -1) {
        if (i == end) {
          //目的节点到了，说明可以连通了
          min = Math.min(min, count + num);
        } else {
          list.push(i); //每遍历一个节点都需要记录，防止进入死循环
          qiushiyan(i, count + num);
        }
      }
    }
  }
}
minTrans();

/**
 java
 
 public class Main{
 
    //   节点互联的二维数组
    //   值表示两节点时延
     public static int[][] ints;
     public static int N;
     public static int min = Integer.MAX_VALUE;
    //    已经处理过的节点，没有这个会陷入死循环
     public static List<Integer> list = new ArrayList<>();
     public static int end;
  
     public static void main(String[] args) {
  
         Scanner sc = new Scanner(System.in);
  
         N = sc.nextInt();
         int M = sc.nextInt();
  
         ints = new int[N][N];
         sc.nextLine();
  
          * 根据输入值构建二维数组
          * 数组下标从0开始，需要-1
         for(int i=0;i<M;i++){
             int u = sc.nextInt()-1;
             int v = sc.nextInt()-1;
             int w = sc.nextInt();
             ints[u][v] = w;
             ints[v][u] = w;
         }
  
         int start = sc.nextInt()-1; //源节点
         end = sc.nextInt()-1;   //目的节点
  
         qiushiyan(start,0);
  
         System.out.println(min);
  
     }
  
    
    //  start 源节点
    //  count 时延总和
      
     public static void qiushiyan(int start, int count){
         for(int i=0;i<N;i++){
             int num = ints[start][i];
             if( num != 0 && !list.contains(i)){
                 if(i==end){ //目的节点到了，说明可以连通了
                     min = Math.min(min,count+num);
                 }else {
                     list.add(i);    //每遍历一个节点都需要记录，防止进入死循环
                     qiushiyan(i,count+num);
                 }
             }
         }
     }
 }
 */
