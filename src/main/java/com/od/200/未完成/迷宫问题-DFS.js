/**
 【迷宫问题】[图-dfs]

 定义一个二维数组 N*M ，如 5 × 5 数组下所示：
int maze[5][5] = {
0, 1, 0, 0, 0,
0, 1, 1, 1, 0,
0, 0, 0, 0, 0,
0, 1, 1, 1, 0,
0, 0, 0, 1, 0,
};
它表示一个迷宫，其中的1表示墙壁，0表示可以走的路，只能横着走或竖着走，不能斜着走，要求编程序找出从左上角到右下角的路线。入口点为[0,0],既第一格是可以走的路。
数据范围： 2≤n,m≤10 ， 输入的内容只包含 0≤val≤1
输入描述：
输入两个整数，分别表示二维数组的行数，列数。再输入相应的数组，其中的1表示墙壁，0表示可以走的路。数据保证有唯一解,不考虑有多解的情况，即迷宫只有一条通道。
输出描述：
左上角到右下角的最短路径，格式如样例所示。
示例1
输入：
5 5
0 1 0 0 0
0 1 1 1 0
0 0 0 0 0
0 1 1 1 0
0 0 0 1 0
输出：
(0,0)
(1,0)
(2,0)
(2,1)
(2,2)
(2,3)
(2,4)
(3,4)
(4,4)
示例2
输入：
5 5
0 1 0 0 0
0 1 0 1 0
0 0 0 0 1
0 1 1 1 0
0 0 0 0 0
输出：
(0,0)
(1,0)
(2,0)
(3,0)
(4,0)
(4,1)
(4,2)
(4,3)
(4,4)
说明：注意：不能斜着走！！
————————————————
版权声明：本文为CSDN博主「旧梦昂志」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/csfun1/article/details/124643796

 */

/**
 * DFS找最短路线
 int maze[5][5] = {
0,1,0,0,0
0,1,1,1,0
0,0,0,0,0
0,1,1,1,0
0,0,0,1,0
 };
 */
/**
 java
 
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Scanner;

public class Main {
    private static int n1;
    private static int m1;
    private static int[][] arr;//邻接表
    private static boolean[][] mark;
    private static int endX1;
    private static int endY1;
    private static List<Point> list = new ArrayList<>();
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] sa = sc.nextLine().split(" ");
        n1 = Integer.parseInt(sa[0]);
        m1 = Integer.parseInt(sa[1]);
        endX1 = n1 -1;
        endY1 = m1 -1;
        arr = new int[n1][m1];
        mark = new boolean[n1][m1];
        for (int i = 0; i < n1; i++) {
            String[] split = sc.nextLine().split(" ");
            for (int j = 0; j < m1; j++) {
                arr[i][j] = Integer.parseInt(split[j]);
            }
        }
        dfs(0, 0, 0);
        Collections.reverse(list);
        for (int i = 0; i < list.size(); i++) {
            Point point = list.get(i);
            System.out.println("(" + point.x1 + "," +point.y1+ ")");
        }
    }

    //dfs就是递归求最小值
    private static boolean dfs(int x1,int y1,int step){
        if (x1 == endX1 && y1 == endY1){
            list.add(new Point(endX1,endY1));
            return true;
        }
        int[][] next = {{1,0},{0,1},{0,-1},{-1,0}};
        boolean flag = false;
        for (int i = 0; i < 4; i++) {
            int nextX = x1 + next[i][0];
            int nextY = y1 + next[i][1];
            if (nextX < 0 || nextX >= n1 || nextY<0 || nextY>= m1){
                continue;
            }
            if (arr[nextX][nextY] == 0 && !mark[nextX][nextY]){//下个点是0 且未做标记
                mark[nextX][nextY] = true;
                if (dfs(nextX, nextY, step + 1)) {
                    flag = true;
                    list.add(new Point(x1,y1));
                }
                mark[nextX][nextY] = false;
            }
        }
        return flag;
    }
    static class Point{
        int x1;
        int y1;

        public Point(int x1, int y1) {
            this.x1 = x1;
            this.y1 = y1;
        }
    }
}

 */
