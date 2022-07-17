/**
 停车场车辆统计
 
 标题：停车场车辆统计 | 时间限制：1秒 | 内存限制：262144K | 语言限制：不限
 特定大小的停车场，数组cars[]表示，其中1表示有车，0表示没车。车辆大小不一，小车占一个车位（长度1），货车占两个车位（长度2），卡车占三个车位（长度3），统计停车场最少可以停多少辆车，返回具体的数目。
 输入描述:
 整型字符串数组cars[]，其中1表示有车，0表示没车，数组长度小于1000。
 输出描述:
 整型数字字符串，表示最少停车数目。

 示例1
 输入
 1,0,1
 输出
 2
 说明 1个小车占第1个车位 第二个车位空 1个小车占第3个车位 最少有2辆车

 示例2
 输入
 1,1,0,0,1,1,1,0,1
 输出
 3
 说明
1个货车占第1、2个车位
第3、4个车位空
1个卡车占第5、6、7个车位
第8个车位空
1个小车占第9个车位
最少3辆车
 */

function demo(args) {
  let cars = args.trim().split(",");
  let count = 0; //1的个数
  let res = 0;
  for (let i = 0; i < cars.length; i++) {
    if (cars[i] == "1") {
      count++;
    } else {
      if (count != 0) {
        //只要1的数量不是0则记为1辆车
        res++;
        count = 0;
      }
      continue;
    }
    if (count == 3 || i == cars.length - 1) {
      //3个1为1辆卡车直接计数
      res++;
      count = 0;
    }
  }

  console.log(res);
}
demo("1,0,1");
demo("1,1,0,0,1,1,1,0,1");

// 第二种解法
// ---------------

function carStatis(arg) {
  const input = arg.trim().split(",");
  var s = "";
  input.forEach((element) => {
    s += element;
  });
  var newStr = s.split("0");
  // console.log(newStr);
  let count = 0;
  for (let i = 0; i < newStr.length; i++) {
    let length = newStr[i].length;
    if (length == 0) {
      continue;
    }
    if (length % 3 != 0) {
      count += (length - (length % 3)) / 3 + 1;
    } else {
      count += length / 3;
    }
  }
  console.log(count);
  // console.log(input);
}

carStatis("1,1,0,0,1,1,1,0,1");

// 第三种解法
// -------

var minCar = function (lines) {
  let cars = lines;
  let result = 0; // 最少停车数目
  let offCars = []; // 计算空车位，即cars[i]=0的下标

  offCars.push(-1); // 第一个初始值，防止出现只有一个字母或者没有字母，无法进入循环的情况

  for (let i = 0; i < cars.length; i++) {
    if (cars[i] === 0) {
      offCars.push(i);
    }
  }

  offCars.push(cars.length); // 最后一个初始值，防止出现只有一个字母或者没有字母，无法进入循环的情况

  // 计算空车位可以停车的数目
  for (let i = 0; i < offCars.length - 1; i++) {
    let offset = offCars[i + 1] - offCars[i] - 1;
    let kache = Math.floor(offset / 3);
    let huoche = Math.floor((offset - 3 * kache) / 2);
    let qiche = Math.floor(offset - 3 * kache - 2 * huoche);
    result += kache;
    result += huoche;
    result += qiche;
  }

  console.log(result);
};

minCar([1, 0, 1]);
minCar([1, 1, 0, 0, 1, 1, 1, 0, 1]);

/**
 java 
 
import java.util.Scanner;

public class prakingCar {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        String[] str = in.nextLine().split(",");
        String s = "";
        for (String st : str) {
            s += st;
        }
        String[] newStr = s.split("0");
        int count = 0;
        for (int i = 0; i < newStr.length; i++) {
            int length = newStr[i].length();
            if (length == 0) {
                continue;
            }
            if (length % 3 != 0) {
                count += (length - length % 3) / 3 + 1;
            } else {
                count += length / 3;
            }
        }
        System.out.println(count);
    }
}

解法二：

import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);

        while (scan.hasNext()) {
            String line = scan.next();
            if(line.split(",").length >= 1000){
                System.out.println(0);
                continue;
            }
            int result = 0;
            String[] split = line.replaceAll(",", "").split("0+");
            if(split != null && split.length != 0){
                for (int i = 0; i < split.length; i++){

                    String temp = split[i];
                    if(temp.length() == 1 || temp.length() == 2 || temp.length() == 3){
                        result ++;
                    }else {
                        int length = temp.length();
                        if(length % 3 == 0){
                            result = result + length / 3;
                        }else {
                            result = result + length / 3 + 1;
                        }
                    }
                }
            }

            System.out.println(result);
        }
    }
}
 */
