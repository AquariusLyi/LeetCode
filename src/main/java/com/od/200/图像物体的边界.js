/**
 图像物体的边界

标题：图像物体的边界 | 时间限制：1秒 | 内存限制：262144K | 语言限制：不限
给定一个二维数组M行N列，二维数组里的数字代表图片的像素，为了简化问题，仅包含像素1和5两种像素，每种像素代表一个物体，2个物体相邻的格子为边界，求像素1代表的物体的边界个数。

像素1代表的物体的边界指与像素5相邻的像素1的格子，边界相邻的属于同一个边界，相邻需要考虑8个方向（上，下，左，右，左上，左下，右上，右下）。
其他约束：
地图规格约束为：
0<M<100
0<N<100
1）如下图，与像素5的格子相邻的像素1的格子（0,0）、（0,1）、（0,2）、（1,0）、（1,2）、（2,0）、（2,1）、（2,2）、（4,4）、（4,5）、（5,4）为边界，另（0,0）、（0,1）、（0,2）、（1,0）、（1,2）、（2,0）、（2,1）、（2,2）相邻，为1个边界，（4,4）、（4,5）、（5,4）相邻，为1个边界，所以下图边界个数为2。
(图像)
2）如下图，与像素5的格子相邻的像素1的格子（0,0）、（0,1）、（0,2）、（1,0）、（1,2）、（2,0）、（2,1）、（2,2）、（3,3）、（3,4）、（3,5）、（4,3）、（4,5）、（5,3）、（5,4）、（5,5）为边界，另这些边界相邻，所以下图边界个数为1。注：（2,2）、（3,3）相邻。
(图像)
输入描述:
第一行，行数M，列数N
第二行开始，是M行N列的像素的二维数组，仅包含像素1和5
输出描述:
像素1代表的物体的边界个数。如果没有边界输出0（比如只存在像素1，或者只存在像素5）。
示例1
输入
6  6
1    1    1    1    1    1
1    5    1    1    1    1
1    1    1    1    1    1
1    1    1    1    1    1
1    1    1    1    1    1
1    1    1    1    1    5
输出
说明
参考题目描述部分
示例2
输入
6  6
1    1    1    1    1    1
1    5    1    1    1    1
1    1    1    1    1    1
1    1    1    1    1    1
1    1    1    1    5    1
1    1    1    1    1    1
输出
说明
参考题目描述部分
解题思路：
1、通过二维数组遍历到像素为5的位置，再将其周围的1变为2作为边界；
2、重复步骤1，直至将所有像素为5的周围的1全部变为2；
如果两个边界相邻的话，会被一同清除。
如果两个边界不相邻的话，重复步骤2。
步骤2执行的次数即为边界个数。

 */
// let ints = [[1,1,1,1,1,1],
//             [1,5,1,1,1,1],
//             [1,1,1,1,1,1],
//             [1,1,1,1,1,1],
//             [1,1,1,1,1,1],
//             [1,1,1,1,1,5]];
function pic() {
  let arrSplit = readline().trim().split(/\s+/).map(Number);
  let hang = arrSplit[0];
  let lie = arrSplit[1];
  let ints = [];
  for (let i = 0; i < hang; i++) {
    ints[i] = [];
    let str = readline().split(" ");
    for (let j = 0; j < lie; j++) {
      ints[i][j] = Number(str[j]);
    }
  }

  /**
   * 将5周围的1转变为2作为边界
   * 遍历数组找到边界2，将其变为0，再通过递归将其周围的2全部变为0
   * 如果边界相邻则所有的2都会变为0
   */
  for (let i = 0; i < hang; i++) {
    for (let j = 0; j < lie; j++) {
      if (ints[i][j] == 5) {
        if (i > 0) {
          //表示上面有值
          if (ints[i - 1][j] == 1) {
            //正上方
            ints[i - 1][j] = 2; //边界用0表示
          }
          if (j > 0) {
            //表示左边有值
            if (ints[i - 1][j - 1] == 1) {
              //左上方
              ints[i - 1][j - 1] = 2;
            }
          }
          if (j < lie - 1) {
            //右边有值
            if (ints[i - 1][j + 1] == 1) {
              //右上方
              ints[i - 1][j + 1] = 2;
            }
          }
        }
        if (j > 0) {
          //表示左边有值
          if (ints[i][j - 1] == 1) {
            //左边
            ints[i][j - 1] = 2;
          }
        }
        if (i < hang - 1) {
          //表示下面有值
          if (ints[i + 1][j] == 1) {
            //正下方
            ints[i + 1][j] = 2;
          }
          if (j > 0) {
            //表示左边有值
            if (ints[i + 1][j - 1] == 1) {
              //左下方
              ints[i + 1][j - 1] = 2;
            }
          }
          if (j < lie - 1) {
            //右边有值
            if (ints[i + 1][j + 1] == 1) {
              //右下方
              ints[i + 1][j + 1] = 2;
            }
          }
        }
        if (j < lie - 1) {
          //右边有值
          if (ints[i][j + 1] == 1) {
            //右边
            ints[i][j + 1] = 2;
          }
        }
      }
    }
  }

  let count = 0; //边界个数
  for (let i = 0; i < hang; i++) {
    for (let j = 0; j < lie; j++) {
      if (ints[i][j] == 2) {
        count++;
        ints[i][j] = 0;
        boundary(i, j);
      }
    }
  }
  console.log(count);
  function boundary(i, j) {
    if (i > 0) {
      //表示上面有值
      if (ints[i - 1][j] == 2) {
        //正上方
        ints[i - 1][j] = 0;
        boundary(i - 1, j);
      }
      if (j > 0) {
        //表示左边有值
        if (ints[i - 1][j - 1] == 2) {
          //左上方
          ints[i - 1][j - 1] = 0;
          boundary(i - 1, j - 1);
        }
      }
      if (j < lie - 1) {
        //右边有值
        if (ints[i - 1][j + 1] == 2) {
          //右上方
          ints[i - 1][j + 1] = 0;
          boundary(i - 1, j + 1);
        }
      }
    }
    if (j > 0) {
      //表示左边有值
      if (ints[i][j - 1] == 2) {
        //左边
        ints[i][j - 1] = 0;
        boundary(i, j - 1);
      }
    }
    if (i < hang - 1) {
      //表示下面有值
      if (ints[i + 1][j] == 2) {
        //正下方
        ints[i + 1][j] = 0;
        boundary(i + 1, j);
      }
      if (j > 0) {
        //表示左边有值
        if (ints[i + 1][j - 1] == 2) {
          //左下方
          ints[i + 1][j - 1] = 0;
          boundary(i + 1, j - 1);
        }
      }
      if (j < lie - 1) {
        //右边有值
        if (ints[i + 1][j + 1] == 2) {
          //右下方
          ints[i + 1][j + 1] = 0;
          boundary(i + 1, j + 1);
        }
      }
    }
    if (j < lie - 1) {
      //右边有值
      if (ints[i][j + 1] == 2) {
        //右边
        ints[i][j + 1] = 0;
        boundary(i, j + 1);
      }
    }
  }
}

/**
 java
 

 public class Main{
 
    public static int hang;
    public static int lie;
    public static int[][] ints;
 
    public static void main(String[] args) {
 
        Scanner sc = new Scanner(System.in);
 
        hang = sc.nextInt();
        lie = sc.nextInt();
 
        ints = new int[hang][lie];
 
        for(int i=0;i<hang;i++){
            for(int j=0;j<lie;j++){
                ints[i][j] = sc.nextInt();
            }
        }
 
        //   将5周围的1转变为2作为边界
        //   遍历数组找到边界2，将其变为0，再通过递归将其周围的2全部变为0
        //   如果边界相邻则所有的2都会变为0
         
         for(int i=0;i<hang;i++){
            for(int j=0;j<lie;j++){
                if(ints[i][j] == 5){
                    if(i>0){    //表示上面有值
                        if(ints[i-1][j]==1){    //正上方
                            ints[i-1][j] = 2;   //边界用0表示
                        }
                        if(j>0){    //表示左边有值
                            if(ints[i-1][j-1]==1){  //左上方
                                ints[i-1][j-1] = 2;
                            }
                        }
                        if(j<lie-1){//右边有值
                            if(ints[i-1][j+1]==1){  //右上方
                                ints[i-1][j+1] = 2;
                            }
                        }
                    }
                    if(j>0){    //表示左边有值
                        if(ints[i][j-1]==1){    //左边
                            ints[i][j-1]=2;
                        }
                    }
                    if(i<hang-1){ //表示下面有值
                        if(ints[i+1][j]==1){    //正下方
                            ints[i+1][j]=2;
                        }
                        if(j>0){    //表示左边有值
                            if(ints[i+1][j-1]==1){  //左下方
                                ints[i+1][j-1] = 2;
                            }
                        }
                        if(j<lie-1){//右边有值
                            if(ints[i+1][j+1]==1){  //右下方
                                ints[i+1][j+1] = 2;
                            }
                        }
                    }
                    if(j<lie-1){//右边有值
                        if(ints[i][j+1]==1){  //右边
                            ints[i][j+1] = 2;
                        }
                    }
                }
            }
        }
 
        int count = 0;  //边界个数
        for(int i=0;i<hang;i++){
            for(int j=0;j<lie;j++){
                if(ints[i][j]==2){
                    count++;
                    ints[i][j] = 0;
                    boundary(i,j);
                }
            }
        }
        System.out.println(count);
    }
 
    public static void boundary(int i,int j){
        if(i>0){    //表示上面有值
            if(ints[i-1][j]==2){    //正上方
                ints[i-1][j]=0;
                boundary(i-1,j);
            }
            if(j>0){    //表示左边有值
                if(ints[i-1][j-1]==2){  //左上方
                    ints[i-1][j-1]=0;
                    boundary(i-1,j-1);
                }
            }
            if(j<lie-1){//右边有值
                if(ints[i-1][j+1]==2){  //右上方
                    ints[i-1][j+1]=0;
                    boundary(i-1,j+1);
                }
            }
        }
        if(j>0){    //表示左边有值
            if(ints[i][j-1]==2){    //左边
                ints[i][j-1]=0;
                boundary(i,j-1);
            }
        }
        if(i<hang-1){ //表示下面有值
            if(ints[i+1][j]==2){    //正下方
                ints[i+1][j]=0;
                boundary(i+1,j);
            }
            if(j>0){    //表示左边有值
                if(ints[i+1][j-1]==2){  //左下方
                    ints[i+1][j-1]=0;
                    boundary(i+1,j-1);
                }
            }
            if(j<lie-1){//右边有值
                if(ints[i+1][j+1]==2){  //右下方
                    ints[i+1][j+1]=0;
                    boundary(i+1,j+1);
                }
            }
        }
        if(j<lie-1){//右边有值
            if(ints[i][j+1]==2){  //右边
                ints[i][j+1]=0;
                boundary(i,j+1);
            }
        }
    }
}

 */
