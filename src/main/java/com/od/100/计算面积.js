/**
计算面积

绘图机器的绘图笔初始位置在原点（0, 0），机器启动后其绘图笔按下面规则绘制直线：
1）尝试沿着横向坐标轴正向绘制直线，直到给定的终点值E。
2）期间可通过指令在纵坐标轴方向进行偏移，并同时绘制直线，偏移后按规则1 绘制直线；指令的格式为X offsetY，表示在横坐标X 沿纵坐标方向偏移，offsetY为正数表示正向偏移，为负数表示负向偏移。

给定了横坐标终点值E、以及若干条绘制指令，请计算绘制的直线和横坐标轴、以及 X=E 的直线组成图形的面积。

输入描述:
首行为两个整数 N E，表示有N条指令，机器运行的横坐标终点值E。
接下来N行，每行两个整数表示一条绘制指令X offsetY，用例保证横坐标X以递增排序方式出现，且不会出现相同横坐标X。
取值范围：0 < N <= 10000, 0 <= X <= E <=20000, -10000 <= offsetY <= 10000。
输出描述:
一个整数，表示计算得到的面积，用例保证，结果范围在0~4294967295内

示例1：
输入
4 10
1 1
2 1
3 1
4 -2
输出
12

示例2：
输入
2 4
0 1
2 -2
输出
4


解题思路：
N E
a1 b1
a2 b2
a3 b3
宽：a2-a1 高：b1
宽：a3-a2 高：b1+b2
宽：E - a3 高：b1+b2+b3
https://blog.csdn.net/qq_34465338/article/details/125248763
 */

function niuke() {
  let input = readline().trim().split(/\s+/);
  let num = input[0];
  let total = input[1];
  let list = [];
  for (let i = 0; i < num; i++) {
    let temp = readline().trim().split(/\s+/).map(Number);
    list.push(temp);
  }
  let res = 0;
  let high = 0;
  for (let i = 1; i < list.length; i++) {
    high += list[i - 1][1]; //Y轴方向的运动轨迹(相当于高)
    res += Math.abs((list[i][0] - list[i - 1][0]) * high);
  }

  res += Math.abs((total - list[num - 1][0]) * (high + list[num - 1][1]));
  console.log(res);
}

/**
 java

https://blog.csdn.net/csfun1/article/details/124509176?spm=1001.2014.3001.5502#021_7_1

 public class ZT25 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] input = sc.nextLine().split(" ");
        int count = Integer.parseInt(input[0]);
        int maxX1 = Integer.parseInt(input[1]);
        int sqa = 0;
        int tempX1 = 0;
        int tempY1 = 0;
        for (int i = 0; i < count; i++) {
            String[] str = sc.nextLine().split(" ");
            int x1New = Integer.parseInt(str[0]);
            sqa += (x1New - tempX1) * Math.abs(tempY1);
            tempY1 += Integer.parseInt(str[1]);
            tempX1 = x1New;
        }
        sqa += (maxX1 - tempX1) * tempY1;
        System.out.println(sqa);
    }
}


// 解法 二
 
import java.util.Scanner;

public class Main {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		String[] a1 = sc.nextLine().split(" ");
		int count = Integer.valueOf(a1[0]);
		int total = Integer.valueOf(a1[1]);
		long result = 0;
		int last_x = 0, last_y = 0;
		for (int i = 0; i < count; i++) {
			String[] a2 = sc.nextLine().split(" ");
			int x = Integer.valueOf(a2[0]);
			int y = Integer.valueOf(a2[1]);
			result += (x - last_x) * Math.abs(last_y);;
			last_x = x;
			last_y += y;
		}
		result += (total - last_x) * Math.abs(last_y);
		System.out.println(result);
	}
}

// 解法 三
public class Main{
 
    public static void main(String[] args) {
 
        Scanner sc = new Scanner(System.in);
 
        int n = sc.nextInt();
        int e = sc.nextInt();
 
        List<int[]> list = new ArrayList<>();
        int[] ints = new int[2];
 
        for(int i=0; i<n; i++){
            ints[0] = sc.nextInt();
            ints[1] = sc.nextInt();
            list.add(ints);
            ints = new int[2];
        }
 
        int res = 0;
        int high = 0;
 
        for(int i=1; i<list.size(); i++){
            high += list.get(i-1)[1];   //Y轴方向的运动轨迹(相当于高)
            res += Math.abs((list.get(i)[0]-list.get(i-1)[0])*high);
        }
 
        res += Math.abs((e - list.get(n-1)[0])*(high + list.get(n-1)[1]));
 
        System.out.println(res);
    }
 
}

// 解法 四

https://blog.csdn.net/weixin_44219664/article/details/124439585

import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        String[] split = in.nextLine().split(" ");
        int N = Integer.parseInt(split[0]);
        int E = Integer.parseInt(split[1]);

        int curX = 0, curY = 0, area = 0;

        for (int i = 0; i < N; i++) {
            String[] strs = in.nextLine().split(" ");
            int x = Integer.parseInt(strs[0]);
            int y = Integer.parseInt(strs[1]);

            area += (x - curX) * Math.abs(curY);

            curX = x;
            curY += y;
        }
        if (curX < E) {
            area += (E - curX) * Math.abs(curY);
        }

        System.out.println(area);
        in.close();
    }
}

// 解法

import java.util.Scanner;

public class drawMachine {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        String[] str = in.nextLine().split(" ");
        int n = Integer.parseInt(str[0]);
        int end = Integer.parseInt(str[1]);
        int[] x = new int[n];
        int[] offsetY = new int[n];
        for (int i = 0; i < n; i++) {
            x[i] = in.nextInt();
            offsetY[i] = in.nextInt();
        }
        int area = 0;
        int a = 0, b = 0;
        for (int i = 0; i < n; i++) {
            area += (x[i] - a) * Math.abs(b);
            a = x[i];
            b += offsetY[i];
        }
        area += (end - a) * Math.abs(b);
        System.out.println(area);
    }
}


 */
