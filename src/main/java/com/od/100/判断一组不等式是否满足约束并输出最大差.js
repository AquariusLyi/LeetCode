/**
 判断一组不等式是否满足约束并输出最大差

给定一组不等式，判断是否成立并输出不等式的最大差(输出浮点数的整数部分)

要求:

1)不等式系数为 double类型，是一个二维数组

2)不等式的变量为 int类型，是一维数组;

3)不等式的目标值为 double类型，是一维数组

4)不等式约束为字符串数组，只能是:”>”,”>=”,”<“,”=”，

例如，不等式组:

a11x1+a12x2+a13x3+a14x4+a15x5<=b1;

a21x1+a22x2+a23x3+a24x4+a25x5<=b2;

a31x1+a32x2+a33x3+a34x4+a35x5<=b3;

最大差 = max{(a11x1+a12x2+a13x3+a14x4+a15x5-b1),(a21x1+a22x2+a23x3+a24x4+ a25x5-b2),(a31x1+a32x2+a33x3+a34x4+a35x5-b3)},

类型为整数(输出浮点数的整数部分)

输入描述

1)不等式组系数(double类型):

a11,a12,a13,a14,a15

a21,a22,a23,a24,a25

a31,a32,a33,a34,a35

2)不等式变量(int类型):x1,x2,x3,x4,x5

3)不等式目标值(double类型):b1,b2,b3

4)不等式约束(字符串类型):<=,<=,<=

输入

a11,a12,a13,a14,a15,a21,a22,a23,a24,a25, a31,a32,a33,a34,a35,x1,x2,x3,x4,x5,b1,b2,b3,<=,<=,<=

输出描述

true或者 false，最大差

示例1   输入输出示例仅供调试，后台判题数据一般不包含示例

输入

2.3,3,5.6,7,6;11,3,8.6,25,1;0.3,9,5.3,66,7.8;1,3,2,7,5;340,670,80.6;<=,<=,<=

输出

false,458


解题思路：（就是逻辑题）
 
对输入数据用”;”进行分割，分割后的的数组最后三个数组分别为不等式变量、不等式目标值，不等式约束，剩下的都是不等式系数
然后根据题意对系数和变量进行×、+处理
通过目标值和约束进行判断处理，并获取最大值

 */

function zdc() {
  let splitArr = readline().trim().split(";");
  let len = splitArr.length;
  let bl = splitArr[len - 3].split(","); //不等式变量
  let mb = splitArr[len - 2].split(","); //不等式目标值
  let ys = splitArr[len - 1].split(","); //不等式约束

  let m = ys.length; //约束的数量等于数组的数量
  let n = bl.length; //变量的数量等于数组中数据的数量

  let target = []; //目标值的数量等于约束的数量
  let blArr = [];

  for (let i = 0; i < m; i++) {
    target[i] = parseFloat(mb[i]); //不等式目标转换成double类型
  }
  for (let i = 0; i < n; i++) {
    blArr[i] = parseInt(bl[i]); //不等式变量装换成int类型
  }

  let doubles = new Array(m).fill("").map(() => new Array(n).fill(0)); //不等式系数是二维数组

  for (let i = 0; i < m; i++) {
    let xs = splitArr[i].split(","); //不等式系数
    for (let j = 0; j < n; j++) {
      doubles[i][j] = parseFloat(xs[j]); //将不等式系数放入double类型二维数组
    }
  }

  let flag = true;
  let max = 0;

  for (let i = 0; i < m; i++) {
    //循环遍历不等式数组
    let a = 0;
    let b = true;
    for (let j = 0; j < n; j++) {
      a += doubles[i][j] * blArr[j]; //不等式数组值
    }
    max = Math.max(max, a - target[i]); //求出最大差
    if (ys[i].includes(">")) {
      //等于不等式进行判断
      b = a > target[i];
    } else if (ys[i].includes(">=")) {
      b = a >= target[i];
    } else if (ys[i].includes("<")) {
      b = a < target[i];
    } else if (ys[i].includes("<=")) {
      b = a <= target[i];
    } else if (ys[i].includes("=")) {
      b = a == target[i];
    }
    if (!b) {
      //只要一个等式不成立就为false
      flag = false;
    }
  }

  console.log(flag + " " + Math.floor(max));
}

/**
 java

 public class Main{
 
    public static void main(String[] args) {
 
        Scanner sc = new Scanner(System.in);
 
        String[] strings = sc.nextLine().split(";");
 
        int length = strings.length;
        String[] bl = strings[length-3].split(","); //不等式变量
        String[] mb = strings[length-2].split(","); //不等式目标值
        String[] ys = strings[length-1].split(","); //不等式约束
 
        int m = ys.length;  //约束的数量等于数组的数量
        int n = bl.length;  //变量的数量等于数组中数据的数量
 
        Double[] mubiao = new Double[m];    //目标值的数量等于约束的数量
        int[] bianliang = new int[n];
 
        for(int i=0;i<m;i++){
            mubiao[i] = Double.valueOf(mb[i]);  //不等式目标转换成double类型
        }
        for(int i=0;i<n;i++){
            bianliang[i] = Integer.valueOf(bl[i]);  //不等式变量装换成int类型
        }
 
        double[][] doubles = new double[m][n];  //不等式系数是二维数组
 
        for(int i=0;i<m;i++){
            String[] xs = strings[i].split(","); //不等式系数
            for(int j=0;j<n;j++){
                doubles[i][j] = Double.parseDouble(xs[j]);  //将不等式系数放入double类型二维数组
            }
        }
 
        boolean flag = true;
        double max = 0;
 
        for (int i=0;i<m;i++){  //循环遍历不等式数组
            double d=0;
            boolean b = true;
            for(int j=0;j<n;j++){
                d+=doubles[i][j]*bianliang[j];   //不等式数组值
            }
            max = Math.max(max,d-mubiao[i]);    //求出最大差
            if(ys[i].equals(">")){  //等于不等式进行判断
                b = d>mubiao[i];
            }else if(ys[i].equals(">=")){
                b = d>=mubiao[i];
            }else if(ys[i].equals("<")){
                b = d<mubiao[i];
            }else if(ys[i].equals("<=")){
                b = d<=mubiao[i];
            }else if(ys[i].equals("=")){
                b = d==mubiao[i];
            }
            if(!b){ //只要一个等式不成立就为false
                flag = false;
            }
        }
 
        System.out.println(flag+" "+(int)max);
    }
 
}

// 解法2 


import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        double [][] a = new double[3][5];
        int [] x = new int[5];
        double [] b = new double[3];
        String [] eqExpression = new String[3];
        int [] resultArrTemp = new int[3];
        int max = 0;
        Scanner scanner = new Scanner(System.in);
        boolean result = true;

        String lines = scanner.nextLine();
        String [] line = lines.split(";");

        //int i;
        for (int i = 0; i < 3; i++) {
            String [] temp1 = line[i].split(",");
            for (int j = 0; j < 5; j++) {
                a[i][j] = Double.valueOf(temp1[j]);
            }
        }
        String [] temp2 = line[3].split(",");
        for (int i = 0; i < 5; i++) {

            x[i] = Integer.valueOf(temp2[i]);
        }
        String [] temp3 = line[4].split(",");
        for (int i = 0; i < 3; i++) {

            b[i] = Double.valueOf(temp3[i]);
        }
        String [] temp4 = line[5].split(",");
        for (int i = 0; i < 3; i++) {
            eqExpression[i] = temp4[i];
        }

        for (int i = 0; i < 3; i++) {
            double temp=0.0;
            for (int j = 0; j < 5; j++) {
                temp = temp + a[i][j]*x[j];
            }
            if ("<=".equals(eqExpression[i])){
                if (temp<=b[i]){
                    result = result && true;
                    resultArrTemp[i] = (int) ((temp-b[i])/1);
                }else{
                    result = result && false;
                    resultArrTemp[i] = (int) ((temp-b[i])/1);
                }
            } else if ("<".equals(eqExpression[i])) {
                if (temp<b[i]){
                    result = result && true;
                    resultArrTemp[i] = (int) ((temp-b[i])/1);
                }else{
                    result = result && false;
                    resultArrTemp[i] = (int) ((temp-b[i])/1);
                }
            } else if ("=".equals(eqExpression[i])) {
                //String tempStr1 = String.valueOf(temp);
                //String tempStr2 = String.valueOf(b[i]);
                if (temp==b[i]){
                    result = result && true;
                    resultArrTemp[i] = (int) ((temp-b[i])/1);
                }else{
                    result = result && false;
                    resultArrTemp[i] = (int) ((temp-b[i])/1);
                }
            } else if (">".equals(eqExpression[i])) {
                if (temp>b[i]){
                    result = result && true;
                    resultArrTemp[i] = (int) ((temp-b[i])/1);
                }else{
                    result = result && false;
                    resultArrTemp[i] = (int) ((temp-b[i])/1);
                }
            } else if (">=".equals(eqExpression[i])) {
                if (temp>=b[i]){
                    result = result && true;
                    resultArrTemp[i] = (int) ((temp-b[i])/1);
                }else{
                    result = result && false;
                    resultArrTemp[i] = (int) ((temp-b[i])/1);
                }
            }
        }
        for (int i = 0; i < 3; i++) {
            if (i==0){
                max = resultArrTemp[i];
            }
            if (resultArrTemp[i]>=max){
                max = resultArrTemp[i];
            }
        }
        System.out.println(result+" "+max);
    }
}
//  解法二

import java.util.Scanner;

public class maxCha {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        String[] str = in.nextLine().split(";");
        in.close();
        int num_eq = str[str.length - 1].split(",").length;  // 3,等式的数量
        int num_x = str[0].split(",").length;  // 5，系数和未知数的数量
        double[][] a= new double[num_eq][num_x];
        int[] x = new int[num_x];
        double[] b = new double[num_eq];
        String[] eq = new String[num_eq];
        int[] res = new int[num_eq];
        int max = 0;
        boolean flag = true;
        // 分别处理a,x,b,符号
        for (int i = 0; i < num_eq; i++) {  // 处理a
            String[] tmp1 = str[i].split(",");
            for (int j = 0; j < tmp1.length; j++) {
                a[i][j] = Double.valueOf(tmp1[j]);
            }
        }
        String[] tmp2 = str[num_eq].split(",");
        for (int i = 0; i < tmp2.length; i++) {  // 处理x
            x[i] = Integer.parseInt(tmp2[i]);
        }
        String[] tmp3 = str[num_eq + 1].split(",");
        for (int i = 0; i < tmp3.length; i++) {  // 处理b
            b[i] = Double.valueOf(tmp3[i]);
        }
        String[] tmp4 = str[num_eq + 2].split(",");
        for (int i = 0; i < tmp4.length; i++) {  // 处理符号
            eq[i] = tmp4[i];
        }
        for (int i = 0; i < num_eq; i++) {
            double tmp = 0.0;
            for (int j = 0; j < num_x; j++) {
                tmp += a[i][j] * x[j];
            }
            if ("<=".equals(eq[i])) {
                flag = tmp <= b[i] ? flag && true : flag && false;
            } else if ("<".equals(eq[i])) {
                flag = tmp < b[i] ? flag && true : flag && false;
            }else if ("=".equals(eq[i])) {
                flag = tmp == b[i] ? flag && true : flag && false;
            }else if (">=".equals(eq[i])) {
                flag = tmp >= b[i] ? flag && true : flag && false;
            }else if (">".equals(eq[i])) {
                flag = tmp > b[i] ? flag && true : flag && false;
            }
            res[i] =(int) ((tmp - b[i]) / 1);
        }
        for (int i = 0; i < num_eq; i++) {
            max = Math.max(max, res[i]);
        }
        System.out.println(flag + " " + max);
    }
}

 */
