/**

标题：竖直四子棋 | 时间限制：1秒 | 内存限制：262144K | 语言限制：不限
 
竖直四子棋的棋盘是竖立起来的，双方轮流选择棋盘的一列下子，棋子因重力落到棋盘底部或者其他棋子之上，当一列的棋子放满时，无法再在这列上下子。
一方的4个棋子横、竖或者斜方向连成一线时获胜。现给定一个棋盘和红蓝对弈双方的下子步骤，判断红方或蓝方是否在某一步获胜。
 
下面以一个6x5的棋盘图示说明落子过程：

输入描述:
输入为2行，第一行指定棋盘的宽和高，为空格分隔的两个数字；第二行依次间隔指定红蓝双方的落子步骤，第1步为红方的落子，第2步为蓝方的落子，第3步为红方的落子，以此类推。
步骤由空格分隔的一组数字表示，每个数字为落子的列的编号（最左边的列编号为1，往右递增）。用例保证数字均为32位有符号数。
 
输出描述:
如果落子过程中红方获胜，输出 N,red ；如果落子过程中蓝方获胜，输出 N,blue ；如果出现非法的落子步骤，输出 N,error。N为落子步骤的序号，从1开始。如果双方都没有获胜，输出 0,draw 。
非法落子步骤有两种，一是列的编号超过棋盘范围，二是在一个已经落满子的列上落子。N和单词red、blue、draw、error之间是英文逗号连接。

示例1
输入
5 5
1 1 2 2 3 3 4 4
 
输出
7,red
 
说明
在第7步，红方在第4列落下一子后，红方的四个子在第一行连成一线，故红方获胜，输出 7,red


示例2
输入
5 5
0 1 2 2 3 3 4 4
 
输出
1,error
 
说明
第1步的列序号为0，超出有效列编号的范围，故输出 1,error

 */

function Chess() {
  let [m, n] = readline().trim().split(/\s+/).map(Number);
  let arr = readline().trim().split(/\s+/);
  let list = new Array(n).fill().map(() => new Array(m).fill(0));

  let isOver = false;
  for (let i = 0; i < arr.length; i++) {
    let index = -1;
    let color = 1;
    let num = parseInt(arr[i]);
    if (num <= 0 || num > m || list[0][num - 1] != 0) {
      isOver = true;
      console.log(i + 1 + ",error");
      break;
    }
    if (i % 2 != 0) {
      //偶数下标为red，用1表示
      color = 2; //奇数下标为blue，用2表示
    }
    for (let j = n - 1; j >= 0; j--) {
      if (list[j][num - 1] == 0) {
        index = j; //此时棋子横坐标为j，纵坐标为num-1
        list[j][num - 1] = color;
        break;
      }
    }
    if (index == -1) {
      console.log(i + 1 + ",error");
      isOver = true;
      break;
    }
    if (i >= 6 && judgeSuccess(list, index, num - 1)) {
      //第七个棋子才开始符合四棋子的要求
      if (color == 1) {
        console.log(i + 1 + ",red");
        isOver = true;
        break;
      } else {
        console.log(i + 1 + ",blue");
        isOver = true;
        break;
      }
    }
  }
  if (!isOver) {
    console.log("0,draw");
  }
}

function judgeSuccess(list, x, y) {
  let h = list.length; //数组有h行
  let l = list[0].length; //数组有l列
  let count = 0; //统计相同的棋子（3即可）
  let statis = 3; //四个棋子只要统计三次

  if (x < h - 3) {
    //是否满足棋子纵向四棋子
    let a = x;
    let b = y;
    while (statis != 0 && list[a][b] == list[++a][b]) {
      count++;
      statis--;
    }
    if (count == 3) {
      return true;
    }
    count = 0;
    statis = 3;
  }
  if (y >= 3) {
    //是否满足棋子左边横向四棋子
    let a = x;
    let b = y;
    while (statis != 0 && list[a][b] == list[a][--b]) {
      count++;
      statis--;
    }
    if (count == 3) {
      return true;
    }
    count = 0;
    statis = 3;
  }
  if (y < l - 3) {
    //是否满足棋子右边横向四棋子
    let a = x;
    let b = y;
    while (statis != 0 && list[a][b] == list[a][++b]) {
      count++;
      statis--;
    }
    if (count == 3) {
      return true;
    }
    count = 0;
    statis = 3;
  }
  if (x < h - 3 && y >= 3) {
    //是否满足左边斜向四棋子
    let a = x;
    let b = y;
    while (statis != 0 && list[a][b] == list[++a][--b]) {
      count++;
      statis--;
    }
    if (count == 3) {
      return true;
    }
    count = 0;
    statis = 3;
  }
  if (x < h - 3 && y < l - 3) {
    //是否满足右边斜向四棋子
    let a = x;
    let b = y;
    while (statis != 0 && list[a][b] == list[++a][++b]) {
      count++;
      statis--;
    }
    if (count == 3) {
      return true;
    }
  }

  return false;
}

Chess();

/**
 java

 public class Main{
 
    public static void main(String[] args) {
 
        Scanner sc = new Scanner(System.in);
 
        String[] nums = sc.nextLine().split(" ");
        int m = Integer.parseInt(nums[0]);
        int n = Integer.parseInt(nums[1]);
 
        String[] arr = sc.nextLine().split(" ");
 
        int[][] list = new int[n][m];
        Boolean isOver = false;
        for (int i=0;i<arr.length;i++){
            int index = -1;
            int color = 1;
            int num = Integer.parseInt(arr[i]);
            if(num<=0 || num>m || list[0][num-1]!=0){
                isOver = true;
                System.out.println(i+1+",error");
                break;
            }
            if(i%2!=0){ //偶数下标为red，用1表示
                color = 2;  //奇数下标为blue，用2表示
            }
            for(int j=n-1;j>=0;j--){
                if(list[j][num-1]==0){
                    index = j;  //此时棋子横坐标为j，纵坐标为num-1
                    list[j][num-1] = color;
                    break;
                }
            }
            if(index==-1){
                System.out.println(i+1+",error");
                isOver = true;
                break;
            }
            if(i>=6 && isSunccess(list,index,num-1)){   //第七个棋子才开始符合四棋子的要求
                if(color==1){
                    System.out.println(i+1+",red");
                    isOver = true;
                    break;
                }else {
                    System.out.println(i+1+",blue");
                    isOver = true;
                    break;
                }
            }
        }
        if(!isOver){
            System.out.println("0,draw");
        }
 
    }
 
    public static boolean isSunccess(int[][] list,int x,int y){
        int h = list.length;    //数组有h行
        int l = list[0].length; //数组有l列
        int count = 0;  //统计相同的棋子（3即可）
        int statis = 3;  //四个棋子只要统计三次
 
        if(x<h-3){  //是否满足棋子纵向四棋子
            int a = x;
            int b = y;
            while ((statis!=0) && list[a][b] == list[++a][b]){
                count++;
                statis--;
            }
            if(count==3){
                return true;
            }
            count = 0;
            statis = 3;
        }
        if(y>=3){   //是否满足棋子左边横向四棋子
            int a = x;
            int b = y;
            while ((statis!=0) && list[a][b] == list[a][--b]){
                count++;
                statis--;
            }
            if(count==3){
                return true;
            }
            count = 0;
            statis = 3;
        }
        if(y<l-3){  //是否满足棋子右边横向四棋子
            int a = x;
            int b = y;
            while ((statis!=0) && list[a][b] == list[a][++b]){
                count++;
                statis--;
            }
            if(count==3){
                return true;
            }
            count = 0;
            statis = 3;
 
        }
        if(x<h-3 && y>=3){  //是否满足左边斜向四棋子
            int a = x;
            int b = y;
            while ((statis!=0) && list[a][b] == list[++a][--b]){
                count++;
                statis--;
            }
            if(count==3){
                return true;
            }
            count = 0;
            statis = 3;
        }
        if(x<h-3 && y<l-3){ //是否满足右边斜向四棋子
            int a = x;
            int b = y;
            while ((statis!=0) && list[a][b] == list[++a][++b]){
                count++;
                statis--;
            }
            if(count==3){
                return true;
            }
        }
 
        return false;
    }
 
}

// 解法二

public class Main{
 
    public static void main(String[] args) {
 
        Scanner sc = new Scanner(System.in);
 
        String[] nums = sc.nextLine().split(" ");
        int m = Integer.parseInt(nums[0]);
        int n = Integer.parseInt(nums[1]);
 
        String[] arr = sc.nextLine().split(" ");
 
        int[][] list = new int[n][m];
        Boolean isOver = false;
        for (int i=0;i<arr.length;i++){
            int index = -1;
            int color = 1;
            int num = Integer.parseInt(arr[i]);
            if(num<=0 || num>m || list[0][num-1]!=0){
                isOver = true;
                System.out.println(i+1+",error");
                break;
            }
            if(i%2!=0){ 
                color = 2;  
            }
            for(int j=n-1;j>=0;j--){
                if(list[j][num-1]==0){
                    index = j;  
                    list[j][num-1] = color;
                    break;
                }
            }
            if(index==-1){
                System.out.println(i+1+",error");
                isOver = true;
                break;
            }
            if(i>=6 && isSunccess(list,index,num-1)){  
                if(color==1){
                    System.out.println(i+1+",red");
                    isOver = true;
                    break;
                }else {
                    System.out.println(i+1+",blue");
                    isOver = true;
                    break;
                }
            }
        }
        if(!isOver){
            System.out.println("0,draw");
        }
 
    }
 
    public static boolean isSunccess(int[][] list,int x,int y){
        int h = list.length;    
        int l = list[0].length; 
        int count = 0;  
        int statis = 3; 
 
        if(x<h-3){  
            int a = x;
            int b = y;
            while ((statis!=0) && list[a][b] == list[++a][b]){
                count++;
                statis--;
            }
            if(count==3){
                return true;
            }
            count = 0;
            statis = 3;
        }
        if(y>=3){   
            int a = x;
            int b = y;
            while ((statis!=0) && list[a][b] == list[a][--b]){
                count++;
                statis--;
            }
            if(count==3){
                return true;
            }
            count = 0;
            statis = 3;
        }
        if(y<l-3){  
            int a = x;
            int b = y;
            while ((statis!=0) && list[a][b] == list[a][++b]){
                count++;
                statis--;
            }
            if(count==3){
                return true;
            }
            count = 0;
            statis = 3;
 
        }
        if(x<h-3 && y>=3){  
            int a = x;
            int b = y;
            while ((statis!=0) && list[a][b] == list[++a][--b]){
                count++;
                statis--;
            }
            if(count==3){
                return true;
            }
            count = 0;
            statis = 3;
        }
        if(x<h-3 && y<l-3){ 
            int a = x;
            int b = y;
            while ((statis!=0) && list[a][b] == list[++a][++b]){
                count++;
                statis--;
            }
            if(count==3){
                return true;
            }
        }
 
        return false;
    }
 
}
 */
