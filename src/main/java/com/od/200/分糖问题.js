/**
 分糖问题
分糖果II
 问题描述
Solo和koko是两兄弟，妈妈给了他们一大袋糖，每块糖上都有自己的重量。现在他们想要将这些糖分成两堆。分糖的任务当然落到了大哥Solo的身上，然而koko要求必须两个人获得的糖的总重量“相等”（根据Koko的逻辑），要不然就会哭的。
非常不幸的是，koko还非常小，并且他只会先将两个数转成二进制再进行加法，而且总会忘记进位。如当12（1100）加5（101）时：

  1100
+0101
———
  1001

于是koko得到的计算结果是9（1001）。

此外还有一些例子：

5 + 4 = 1
7 + 9 = 14
50 + 10 = 56

现在Solo非常贪婪，他想要尽可能使自己得到的糖的总重量最大，且不让koko哭。

输入
输入的第一行是一个整数N(2 ≤ N ≤ 15)，表示有袋中多少块糖。第二行包含N个用空格分开的整数Ci (1 ≤ Ci ≤ 106)，表示第i块糖的重量。

输出
如果能让koko不哭，输出Solo所能获得的糖的总重量，否则输出“NO”。

分析
koko的加法不进位，显然是在做异或运算(^)。

1 ^ 1 = 0
0 ^ 1 = 1
1 ^ 0 = 1
0 ^ 0 = 0

因此该题就转换成将所有的数分成两堆，堆内的所有数做异或运算，最后判断两堆的结果，若相同则分别对两堆内的数进行累加，累加后，结果最大的数即为Solo分得的糖的重量。

如果按这种思路走下去，我能想到的只有暴力破解，然而抛开时间复杂度高不说，暴力破解的代码我也没弄清楚要怎么写。。

因此需要转换思路，理一下，由于分糖成功的先决条件是koko和solo两方拥有相同重量的糖，也就是说，分成两堆数各自进行异或运算，运算到最后，剩下两个相等的数，那么对于相同的两个数，再做一次异或运算呢？没错，结果是0。

因此，对于判断是否能成功分糖，可以将所有的数执行一次异或运算，判断最终结果是否为0即可，为0即意味着分糖成功。否则失败。

那Solo怎么拿到最多的糖？很简单，只需要让koko拿最少的糖就行，在分糖成功的情况下，只需要将所有糖中重量最小的糖分给koko即可，因为剩下的糖的总重量经过异或，最终肯定会等于koko拿的糖的重量，因此只需找出所有数中最小的数以及所有数之和即可，最终Solo分得的糖的重量就等于和减去最小值。

最终转换为代码逻辑，只需要遍历一次数组，取出最小值和所有值之和，就能算出Solo所能分得的糖的重量。
————————————————
版权声明：本文为CSDN博主「Fredroid」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/Fredroid/article/details/100753070


Solo和koko是两兄弟，妈妈给了他们一大堆积木，每块积木上都有自己的重量。现在他们想要将这些积木分成两堆。哥哥Solo负责分配，弟弟koko要求两个人获得的积木总重量“相等”（根据Koko的逻辑），个数可以不同，不然就会哭，但koko只会先将两个数转成二进制再进行加法，而且总会忘记进位（每个进位都忘记）。如当25（11101）加11（1011）时，koko得到的计算结果是18（10010）：
11001
+01011--------
10010
Solo想要尽可能使自己得到的积木总重量最大，且不让koko哭。
输入描述:
3
3 5 6
第一行是一个整数N(2≤N≤100)，表示有多少块积木；第二行为空格分开的N个整数Ci(1≤Ci≤106)，表示第i块积木的重量。
输出描述:
11
让koko不哭，输出Solo所能获得积木的最大总重量；否则输出“NO”。
示例1
输入
3
3 5 6
输出
11
备注:
如果能让koko不哭，输出Solo所能获得的积木的总重量，否则输出-1。
该样例输出为11。
解释：Solo能获得重量为5和6的两块积木，5转成二级制为101，6转成二进制位110，按照koko的计算方法（忘记进位），结果为11(二进制)。Koko获得重量为3的积木，转成二进制位11(二进制)。Solo和koko得到的积木的重量都是11(二进制)。因此Solo可以获得的积木的总重量是5+6=11（十进制）。
————————————————
版权声明：本文为CSDN博主「旧梦昂志」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/csfun1/article/details/124643796

 */

function getRes(arr) {
  if (
    arr.length == 0 ||
    arr.length == 1 ||
    (arr.length == 2 && arr[0] != arr[1])
  )
    return "NO";
  let min = arr[0];
  let sum = min;
  let temp = min;
  for (let i = 1; i < arr.length; i++) {
    sum += arr[i];
    min = min < arr[i] ? min : arr[i];
    temp ^= arr[i];
  }
  if (temp != 0) {
    return "NO";
  } else {
    return sum - min;
  }
}

function Candy() {
  let n = +readline().trim();
  let arr = [];
  let ss = readline().trim().split(/\s+/);
  for (let i = 0; i < n; i++) {
    arr[i] = +ss[i].trim();
  }
  let result = getRes(arr);
  console.log(result);
}

Candy();

/**
 java

//  解法一

import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] weights = new int[n];
        int sumKoko = 0;
        int min = Integer.MAX_VALUE;
        long sum = 0;
        for (int i = 0; i < n; i++) {
            int x = sc.nextInt();
            sum += x;
            sumKoko ^= x;
            min = Math.min(min, x);
        }
        if (sumKoko != 0) {
            System.out.println("NO");
        } else {
            System.out.println(sum - min);
        }
        sc.close();
    }
}

// 解法二


 import java.util.Scanner;

public class Candy {
	public static void main(String[] args) {
		Scanner in = new Scanner(System.in);
		while(in.hasNextLine()){
			int n = Integer.parseInt(in.nextLine().trim());
			int[] arr = new int[n];
			String[] ss = in.nextLine().trim().split(" ");
			for(int i=0;i<n;i++){
				arr[i] = Integer.parseInt(ss[i].trim());
			}
			String result = getResult(arr);
			System.out.println(result);
		}
	}

	private static String getResult(int[] arr) {
		if(arr.length == 0 || arr.length == 1 || (arr.length == 2 && arr[0] != arr[1]))
			return "NO";
		int min = arr[0];
		int sum = min;
		int temp = min;
		for(int i=1;i<arr.length;i++){
			sum += arr[i];
			min = min < arr[i] ? min : arr[i];
			temp ^= arr[i];
		}
		if(temp != 0){
			return "NO";
		}else{
			return String.valueOf(sum - min);
		}
	}
}

 */
