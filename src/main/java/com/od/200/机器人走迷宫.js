/**
机器人走迷宫

机试
题目描述
机器人走一个迷宫,给出迷宫的 x*y 的迷宫并且迷宫中有障碍物,输入k表示障碍物有k个,并且会将障碍物的坐标挨个输入。
机器人从 0,0 的位置走到 x,y 的位置并且只能向 x,y 增加的方向走（即只能向左向下移动）,不能回退。
#表示可以走的方格, 0代表障碍, 机器人从 0,0 的位置只能向下或者向前走到出口。
其中会有不可达方格和陷阱方格.不可达方格为第四行前三个,该机器人在行走路径上不可能走到的方格,陷阱方格如第一行最后两个,走进之后则不能抵达终点。
要求: 分别输出陷阱和不可达方格方格数量。
示例1：
输入：
3 3
2
0 2
2 0

输出：
0 0

示例2：
输入：
4 6
5
1 4
1 5
2 0
2 1
2 2

输出：
2 3

 */

/**
 该题为动态规划题,采用动态规划+标记法将该二维数组通过迭代方法走过能走的路径并用不同标记标记所路过的方块属性即可.
先采用迭代法迭代到结尾,再从结尾属性一步步回推回来即可
该算法还可以优化,在标记时候记录好陷阱方格数量和路径方格数量最后总方格数量减去这两个类型方格数量就是不可达方格数量.可少了双重循环时间.但我做题的时候下方的路径计算应该有那个地方判断重复导致数量总是多出来.
————————————————
版权声明：本文为CSDN博主「看不见鲸鱼的鼻子」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/he1154910941/article/details/113826092
 */

function migong() {
  let nms = readline().trim().split(/\s+/);
  let n1 = parseInt(nms[1]);
  let m1 = parseInt(nms[0]);
  let arr = new Array(n1).fill().map(() => new Array(m1).fill(0)); // [n1][m1];
  let mark = new Array(n1).fill().map(() => new Array(m1).fill(false)); // [n1][m1];
  let x1 = n1 - 1;
  let y1 = 0;
  let endX1 = 0;
  let endY1 = m1 - 1;
  let trip = 0;
  let wellCount = parseInt(readline().trim());
  for (let i = 0; i < wellCount; i++) {
    let wall = readline().trim().split(/\s+/);
    let weX1 = n1 - 1 - parseInt(wall[1]);
    let weY1 = parseInt(wall[0]);
    arr[weX1][weY1] = 1;
  }
  arr[x1][y1] = 2;
  dfs(x1, y1);
  let unReach = 0;
  for (let i = 0; i < n1; i++) {
    for (let j = 0; j < m1; j++) {
      if (arr[i][j] == 0) {
        unReach++;
        // console.log(i + ":" + j);
      }
    }
  }
  console.log(trip + " " + unReach);
  function dfs(x1, y1) {
    let flag = false;
    if (x1 == endX1 && y1 == endY1) {
      return true;
    }
    let next = [
      [-1, 0],
      [0, 1],
    ];
    let nextX1 = 0;
    let nextY1 = 0;
    for (let i = 0; i < 2; i++) {
      nextX1 = x1 + next[i][0];
      nextY1 = y1 + next[i][1];
      if (nextX1 < 0 || nextY1 >= m1) {
        continue;
      }
      if (arr[nextX1][nextY1] != 1 && !mark[nextX1][nextY1]) {
        mark[nextX1][nextY1] = true;
        arr[nextX1][nextY1] = 2;
        let temp = dfs(nextX1, nextY1);
        if (flag || temp) {
          flag = true;
        }
        mark[nextX1][nextY1] = false;
      }
    }
    if (!flag) {
      trip++;
      // console.log(x1 + ":" + y1);
    }
    return flag;
  }
}
migong();

/**
 * @ClassName 华为机试二星题--机器人走迷宫
 *              进 # # # # #
 *              # # # # 0 0
 *              0 0 0 # # #
 *              # # # # # 出

import java.util.*;
public class Main {
    public static void main(String[] args) {
        // 0 是未踩过的。 1是墙。 2是踩过的。
        Scanner in = new Scanner(System.in);
        int x = in.nextInt();
        int y = in.nextInt();
        int[][] room = new int[x][y];
        int wall = in.nextInt();
        while(wall-->0){
            int wallX = in.nextInt();
            int wallY = in.nextInt();
            room[wallX][wallY] = 1;
        }
        path(room, 0, 0, x-1, y-1);
        int badPath = 0; //陷阱
        int noWay = 0; // 不可达
        for(int i =0; i< x; i++){
            for(int j=0; j< y; j++){
                if(room[i][j] == 9){
                    badPath += 1;
                }else if(room[i][j] == 0){
                    noWay += 1;
                }
            }
        }
        System.out.println(badPath+" "+noWay);
    }

    //不可达方格 : 机器人无法通过增加X Y值到的方格.走完还是0的代表不可达
    //陷阱方格 : 走到该位置不能正确走到终点的方格。 向前/向上不可达/同为陷阱方格则也标记为陷阱方格 9
    //走过的为2
    private static void path(int[][] room, int nextX, int nextY, int x, int y){
        //判断是墙直接跳过
        if(room[nextX][nextY] ==1){
            return;
        }
        if(room[nextX][nextY] != 0){
            return;
        }
        if(nextX == x && nextY == y){
            room[nextX][nextY] = 2;
            return;
        }
        if(nextX < x){
            path(room, nextX+1, nextY, x, y);
        }
        if(nextY < y){
            path(room, nextX, nextY+1, x, y);
        }

        //该点向上/向前均为不可达/陷阱方格则为陷阱方格
        if(nextX == x || nextY == y){
            if(nextX == x && nextY < y && room[nextX][nextY+1] != 2){
                room[nextX][nextY] = 9;
            }else if(nextY == y && nextX < x && room[nextX+1][nextY] != 2){
                room[nextX][nextY] = 9;
            }else{
                room[nextX][nextY] = 2;
            }
        }else if(room[nextX+1][nextY] !=2 && room[nextX][nextY+1] !=2){
            room[nextX][nextY] = 9;
        }else{
            room[nextX][nextY] = 2;
        }
        return;
    }

}
// 解法二
import java.util.Scanner;

public class Maze {
    private static int n1;
    private static int m1;
    private static int endX1;
    private static int endY1;
    private static int[][] arr;
    private static boolean[][] mark;
    private static int trip =0;

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] nms = sc.nextLine().split(" ");
        n1 = Integer.parseInt(nms[1]);
        m1 = Integer.parseInt(nms[0]);
        arr = new int[n1][m1];
        mark = new boolean[n1][m1];
        int x1 = n1 - 1;
        int y1 = 0;
        endX1 = 0;
        endY1 = m1 - 1;
        int wellCount = Integer.parseInt(sc.nextLine());
        for (int i = 0; i < wellCount; i++) {
            String[] wall = sc.nextLine().split(" ");
            int weX1 = n1 -1 - Integer.parseInt(wall[1]);
            int weY1 = Integer.parseInt(wall[0]);
            arr[weX1][weY1] = 1;
        }
        arr[x1][y1] = 2;
        dfs(x1, y1);
        int unReach = 0;
        for (int i = 0; i < n1; i++) {
            for (int j = 0; j < m1; j++) {
                if (arr[i][j] == 0){
                    unReach++;
                    System.out.println(i + ":" + j);
                }
            }
        }
        System.out.println(trip + " " + unReach);
    }

    private static boolean dfs(int x1,int y1){
        boolean flag = false;
        if (x1 == endX1 && y1 == endY1){
            return true;
        }
        int[][] next = {{-1,0},{0,1}};
        int nextX1 = 0;
        int nextY1 = 0;
        for (int i = 0; i < 2; i++) {
            nextX1 = x1 + next[i][0];
            nextY1 = y1 + next[i][1];
            if (nextX1 < 0 || nextY1 >=m1 ){
                continue;
            }
            if (arr[nextX1][nextY1] != 1 && !mark[nextX1][nextY1]){
                mark[nextX1][nextY1] = true;
                arr[nextX1][nextY1] = 2;
                boolean dfs = dfs(nextX1, nextY1);
                if (flag || dfs){
                    flag = true;
                }
                mark[nextX1][nextY1] = false;
            }
        }
        if (!flag){
            trip++;
            System.out.println(x1 + ":" + y1);
        }

        return flag;
    }
}
 */
