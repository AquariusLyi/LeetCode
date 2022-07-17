/**
 标题：补种未成活胡杨 | 时间限制：1秒 | 内存限制：262144K | 语言限制：不限

 近些年来，我国防沙治沙取得显著成果。某沙漠新种植N棵胡杨（编号1-N），排成一排。一个月后，有M棵胡杨未能成活。
现可补种胡杨K棵，请问如何补种（只能补种，不能新种），可以得到最多的连续胡杨树？


输入描述:
N 总种植数量
M 未成活胡杨数量
M 个空格分隔的数，按编号从小到大排列
K 最多可以补种的数量
其中：
1<=N<=100000
1<=M<=N
0<=K<=M
输出描述:
最多的连续胡杨棵树
示例1
输入
5
2
2 4
1
输出
3
说明
补种到2或4结果一样，最多的连续胡杨棵树都是3
示例2
输入
10
3
2 4 7
1
输出
6
说明
补种第7棵树，最多的连续胡杨棵树为6(5,6,7,8,9,10)
解题思路：
根据题意需要获取最多的连续胡杨树，则补种的胡杨需要时相邻的
例：10棵胡杨 4棵死亡 2，3，6，8  可以补种2棵
则应该是2，3 / 3，6 / 6，8这样补种才会最多
2，3 ： 连续胡杨  6（未成活） -1 = 5
3，6 ： 连续胡杨 8（未成活）-2（未成活）-1 = 5
6，8 ： 连续胡杨10（总数目）-3（未成活）= 7
由此可以对未成活的胡杨进行遍历补种。


 */

function huyanglin() {
  let n = +readline().trim(); //总共棵树
  let m = +readline().trim(); //未成活的棵树
  let arr = readline().trim().split(/\s+/).map(Number);
  let k = +readline().trim(); //补种的棵树
  let maxNum = 0;
  for (let i = k - 1; i < m; i++) {
    //i为补种的最后一棵胡杨下标
    if (i == k - 1) {
      maxNum = Math.max(maxNum, arr[k] - 1); //种最前面的k棵树
    } else if (i == m - 1) {
      maxNum = Math.max(maxNum, n - arr[i - k]); //种最后面的k棵树
    } else {
      maxNum = Math.max(maxNum, arr[i + 1] - arr[i - k] - 1); //种中间的k棵树
    }
  }
  console.log(maxNum);
}

/**
 java
 
 public class Main{
 
    public static void main(String[] args) {
 
        Scanner sc = new Scanner(System.in);
 
        int n = sc.nextInt();   //总共棵树
        int m = sc.nextInt();   //未成活的棵树
 
        List<Integer> dead = new ArrayList<>();
        for(int i=0;i<m;i++){
            dead.add(sc.nextInt()); //未成活的数
        }
 
        int k = sc.nextInt(); //补种的棵树
        int max = 0;
 
        for(int i=k-1;i<m;i++){ //i为补种的最后一棵胡杨下标
            if(i==k-1){
                max = Math.max(max,dead.get(k)-1);  //种最前面的k棵树
            }else if(i==m-1){
                max = Math.max(max,n-dead.get(i-k));  //种最后面的k棵树
            }else {
                max = Math.max(max,dead.get(i+1)-dead.get(i-k)-1);  //种中间的k棵树
            }
        }
 
        System.out.println(max);
    }
}
 */
