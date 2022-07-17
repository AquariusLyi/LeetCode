/**

执行时长

充分发挥GPU算力

为了充分发挥GPU算力，需要尽可能多的将任务交给GPU执行。
现在有一个任务数组，数组元素表示在这1s内新增的任务个数，且每秒都有新增任务。
假设GPU最多一次执行n个任务，一次执行耗时1s，在保证GPU不空闲的情况下，最少需要多长时间执行完成。
输入描述：

第一个参数为GPU最多执行的任务个数，取值范围1~10000
第二个参数为任务数组的长度，取值范围1~10000
第三个参数为任务数组，数字范围1~10000
输出描述：

执行完所有任务需要多少秒
示例

输入：

3
5
1 2 3 4 5
输出：

6
说明：

一次最多执行3个任务 最少耗时6s
输入：

4
5
5 4 1 1 1
输出：

5
说明：

一次最多执行4个任务 最少耗时5s
————————————————
版权声明：本文为CSDN博主「JOEL-T99」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_47243236/article/details/122775971

https://www.cnblogs.com/Jukim/p/16047895.html
 */

function niuke() {
  let taskNum = parseInt(readline().trim());
  let len = parseInt(readline().trim());
  let arr = readline().trim().split(/\s+/g).map(Number);
  let more = 0;
  let time = 0;
  for (let item of arr) {
    //关键对变量more的处理
    if (item + more > taskNum) {
      more = item + more - taskNum;
    } else if (item + more <= taskNum) {
      more = 0;
    }
    //每循环一次都需要计算耗时1秒
    time++;
  }
  // 当任务组完成后还有剩余未完成的任务，需要继续将其完成。
  while (more > 0) {
    more -= taskNum;
    time++;
  }
  console.log(time);
}

// 解法一
function gpuPower(str1, str2, str3) {
  let taskNum = parseInt(str1.trim());
  let len = parseInt(str2.trim());
  let arr = str3.trim().split(/\s+/g).map(Number);
  let more = 0;
  let time = 0;
  for (let item of arr) {
    //关键对变量more的处理
    if (item + more > taskNum) {
      more = item + more - taskNum;
    } else if (item + more <= taskNum) {
      more = 0;
    }
    //每循环一次都需要计算耗时1秒
    time++;
  }
  // 当任务组完成后还有剩余未完成的任务，需要继续将其完成。
  while (more > 0) {
    more -= taskNum;
    time++;
  }
  return time;
}

console.log(gpuPower("3", "5", " 1 2 3 4 5")); //6
console.log(gpuPower("4", "5", "5 4 1 1 1")); //5

//解法二
function GPUNumber(str1, str2, str3) {
  let k = parseInt(str1.trim());
  let len = parseInt(str2.trim());
  let split = str3.trim().split(" ");
  let ints = [];
  for (let i = 0; i < len; i++) {
    ints[i] = parseInt(split[i]);
  }
  let more = 0;
  let time = 0;
  for (let i of ints) {
    //关键对变量more的处理
    if (more + i > k) more = more + i - k;
    else more = 0;
    time++;
  }
  while (more > 0) {
    more -= k;
    time++;
  }
  console.log(time);
}
GPUNumber("3", "5", " 1 2 3 4 5");
GPUNumber("4", "5", "5 4 1 1 1");

/**
 java
 

答案：
解法一：

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;



public class Main {
    public static void main(String[] args) {
        Scanner s = new Scanner(System.in);
        while (s.hasNextInt()) {
        	int max = s.nextInt();
        	int count = s.nextInt();
        	List<Integer> list = new ArrayList<Integer>();
        	for (int i = 0; i < count; i++) {
        		list.add(s.nextInt());
        	}
            compute(list, max);
       }
       s.close();
    }
    static void compute (List<Integer> list, int max) {
    	int sum = 0;
    	int time = list.size();
    	for (int i = 0; i < list.size(); i++) {
    		sum += list.get(i);
    		if (sum >= max) {
    			sum = sum - max;
    		} else {
    			sum = 0;
    		}
    	}
    	if (sum == 0) {
    		System.out.println(time);
    	} else {
    		if (sum%max == 0) {
    			time += sum/max;
    			System.out.println(time);
    		} else {
    			time += (sum/max + 1);
    			System.out.println(time);
    		}
    	}
    }
}
 */
