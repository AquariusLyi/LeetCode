/**
导师请吃火锅

入职后，导师会请你吃饭，你选择了火锅。

火锅里会在不同时间下很多菜。

不同食材要煮不同的时间，才能变得刚好合适。

你希望吃到最多的刚好合适的菜，但你的手速不够快，用m代表手速，每次下手捞菜后至少要过m秒才能再捞（每次只能捞一个）。

那么用最合理的策略，最多能吃到多少刚好合适的菜？

输入描述

第一行两个整数n，m，其中n代表往锅里下的菜的个数，m代表手速。

接下来有n行，每行有两个数x，y代表第x秒下的菜过y秒才能变得刚好合适。

（1 < n, m < 1000）（1 < x, y < 1000）

输出描述

输出一个整数代表用最合理的策略，最多能吃到刚好合适的菜的数量。

示例1   输入输出示例仅供调试，后台判题数据一般不包含示例

输入

2 1
1 2
2 1
输出

1

 入职后，导师会请你吃饭，你选择了火锅。

火锅里会在不同时间下很多菜。

不同食材要煮不同的时间，才能变得刚好合适。你希望吃到最多的刚好合适的菜，但你的手速不够快，用m代表手速，每次下手捞菜后至少要过m庙才能在捞（每次只能捞一个）。

那么用最合理的策略，最多能吃到多少刚好合适的菜？

输入描述：
第一行两个整数n，m，其中n代表往锅里下的菜的个数，m代表手速。

接下来有n行，每行有两个数x，y代表第x秒下的菜过y秒才能变得刚好合适。

（1 < n, m < 1000）

（1 < x, y < 1000）

输出描述：
输出一个整数代表用最合理的策略，最多能吃到刚好合适的菜的数量

示例1
输入
2 1
1 2
2 1
输出
1
说明
一共下了两个菜，在第一秒下的菜需要到第三秒吃，在第二秒下的菜也要到第三秒吃，所以只能吃一个


示例2
输入
3 1
1 2
1 3
2 3
输出
3
说明
一共下了两个菜，可以每秒捞一个，第一个在第一秒下的菜需要到第3秒吃，第二个在第一秒下的菜需要到第4秒吃，在第二秒下的菜也要到第5秒吃，所以三个都能吃到

 */

function niuke() {
  let input = readline().trim().split(/\s+/).map(Number);
  let n = +input[0];
  let m = +input[1];
  let set = new Set(); //set可以自动去重和排序
  for (let i = 0; i < n; i++) {
    let xy = readline().trim().split(/\s+/).map(Number);
    let x = xy[0];
    let y = xy[1];
    set.add(x + y);
  }
  let count = 0; //吃菜的次数
  let list = Array.from(set).sort((a, b) => a - b);
  let len = list.length;
  let time = 0; //吃菜的时间
  for (let i = 0; i < len; i++) {
    if (time <= list[i]) {
      //吃菜的时间小于菜的最佳时机，表示可以吃上
      count++;
      time = list[i] + m; //这个菜吃完需要过m秒才能再次吃菜
    }
  }
  console.log(count);
}

// 解法二
function daoshi() {
  let input = readline().trim().split(/\s+/).map(Number);
  let n = +input[0];
  let m = +input[1];
  // 设置一个数组，存放每道菜可以吃到的时间。
  let arrTime = [];
  for (let i = 0; i < n; i++) {
    let xy = readline().trim().split(/\s+/).map(Number);
    let x = xy[0];
    let y = xy[1];
    arrTime[i] = x + y;
  }
  // 对数组进行从小到大进行排序，这样便于后面比较计算
  arrTime.sort((a, b) => a - b);
  // 新建一个数组，和数组arrTime对应，用于记录每道菜是否可以吃到，可以吃到标记加1.
  let arrCount = [1];
  let next = 0;
  for (let i = 1; i < n; i++) {
    if (arrTime[i] >= arrTime[next] + m) {
      arrCount[i] = 1;
      next = i;
    }
  }
  let count = 0;
  for (let i = 0; i < n; i++) {
    if (arrCount[i] > 0) {
      count++;
    }
  }

  console.log(count);
}
daoshi();

/**
 java

 import java.util.Arrays;
import java.util.Scanner;
 
public class Main {
 
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		while (sc.hasNextInt()) {
			int n = sc.nextInt();
			int m = sc.nextInt();
			int[] x = new int[n];
			int[] y = new int[n];
			for (int i = 0; i < n; i++) {
				x[i] = sc.nextInt();
				y[i] = sc.nextInt();
			}
			// 设置一个数组，存放每道菜可以吃到的时间。
			int[] arrTime = new int[n];
			for (int i = 0; i < n; i++) {
				arrTime[i] = x[i] + y[i];
			}
			// 对数组进行从小到大进行排序，这样便于后面比较计算
			Arrays.sort(arrTime);
 
			// 新建一个数组，和数组arrTime对应，用于记录每道菜是否可以吃到，可以吃到标记加1.
			int[] arrCount = new int[n];
 
			int next = 0;
			arrCount[0] = 1;
			for (int i = 1; i < n; i++) {
				if (arrTime[i] >= (arrTime[next] + m)) {
					arrCount[i] = 1;
					next = i;
				}
			}
 
			int count = 0;
			for (int i = 0; i < n; i++) {
				if (arrCount[i] > 0) {
					count++;
				}
			}
 
			// 遍历输出结果
//			for (int a : arrCount) {
//				System.out.println(a);
//			}
 
			System.out.println(count);
		}
 
	}
}
 */

/**
 java

 解题思路：
菜可以吃的秒数=下菜的秒数x+菜适合吃的秒数y
第一个菜可以直接吃，后面的菜必须在吃前一个菜的秒数上加上手速
同一秒的菜肯定只能吃一个


 public class Main{
 
    public static void main(String[] args) {
 
        Scanner sc = new Scanner(System.in);
 
        int n = sc.nextInt();
        int m = sc.nextInt();
 
        TreeSet<Integer> treeSet = new TreeSet<>(); //treeset可以自动去重和排序
 
        for(int i=0;i<n;i++){
            treeSet.add(sc.nextInt()+sc.nextInt()); //所有菜的最佳时机
        }
 
        int count = 0;  //吃菜的次数
        List<Integer> list = new ArrayList<>(treeSet);
        int len = list.size();
        int time = 0;   //吃菜的时间
        for(int i=0;i<len;i++){
            if(time <= list.get(i)){    //吃菜的时间小于菜的最佳时机，表示可以吃上
                count++;
                time = list.get(i)+m;   //这个菜吃完需要过m秒才能再次吃菜
            }
        }
 
        System.out.println(count);
    }
}
 */
