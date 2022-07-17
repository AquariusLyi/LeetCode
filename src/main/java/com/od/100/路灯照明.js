/**
 标题：路灯照明问题 | 时间限制：1秒 | 内存限制：262144K | 语言限制：不限

 在一条笔直的公路上安装了N个路灯，从位置0开始安装，路灯之间间距固定为100米。
每个路灯都有自己的照明半径，请计算第一个路灯和最后一个路灯之间，无法照明的区间的长度和。

输入描述:
第一行为一个数N，表示路灯个数，1<=N<=100000
第二行为N个空格分隔的数，表示路径的照明半径，1<=照明半径<=100000*100
输出描述:
第一个路灯和最后一个路灯之间，无法照明的区间的长度和
示例1
输入
2
50 50
输出
0
说明
路灯1覆盖0-50，路灯2覆盖50-100，路灯1和路灯2之间(0米-100米)无未覆盖的区间
示例2
输入
4
50 70 20 70
输出
20
说明
[170,180],[220,230]，两个未覆盖的区间，总里程为20
解题思路：
只要将两个相邻路灯的照明半径值进行相加，再跟100进行比较，大于100的说明可以覆盖照明，小于100的计算出的差值就是无法照明的区间长度

*/

function ludeng() {
  let n = readline().trim();
  let ints = readline().trim().split(/\s+/).map(Number);
  let res = 0;
  for (let i = 1; i < ints.length; i++) {
    let add = ints[i] + ints[i - 1]; //计算两个相邻路灯的照明半径值之和
    if (add < 100) {
      res += 100 - add; //与100的差值就是无法照明的区间长度
    }
  }

  console.log(res);
}

/**
 java
 
 public class Main{
 
    public static void main(String[] args) {
 
        Scanner sc = new Scanner(System.in);
 
        int n = sc.nextInt();
        int[] ints = new int[n];
        for (int i=0;i<n;i++){
            ints[i] = sc.nextInt();
        }
 
        int res = 0;
        for(int i=1;i<ints.length;i++){
            int add = ints[i]+ints[i-1];    //计算两个相邻路灯的照明半径值之和
            if(add<100){
                res+=100-add;   //与100的差值就是无法照明的区间长度
            }
        }
 
        System.out.println(res);
 
    }
 
}
 */
