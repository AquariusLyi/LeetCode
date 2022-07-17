/**
 华为机试：全排列

 编程题目 | 100分】全排列 [ 100 / 中等 ]

全排列
题目描述：
给定一个只包含大写英文字母的字符串S，要求你给出对S重新排列的所有不相同的排列数。

如：S为ABA，则不同的排列有ABA、AAB、BAA三种。

解答要求

时间限制：5000ms, 内存限制：100MB

输入描述
输入一个长度不超过10的字符串S，确保都是大写的。

输出描述
输出S重新排列的所有不相同的排列数（包含自己本身）。

示例 1：
输入
ABA
输出
3

示例 2：
输入
ABCDEFGHHA

输出
907200

思路分析：
回溯DFS
全排列是回溯算法中比较常考的一个点，我的做法一般是定义一个栈，存储排列过的字符，一个布尔数组，判断字符是否使用过，一个结果集。递归是根据深度与数组的长度之间的关系。这道题有重复字符，需要剪枝。

更详细的可以参考：Java实现回溯算法入门（排列+组合+子集）。

数学
先把每个字符当成唯一出现过一次，计算所有排列数；再统计重复出现的字母，除去每个字母的排列次数。
————————————————
版权声明：本文为CSDN博主「小朱小朱绝不服输」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_44052055/article/details/124076922


 */

// 数学公式出来没超时
function pailie() {
  let chars = readline().split("");
  let map = new Map();
  let num = 0;
  for (let item of chars) {
    map.set(item, (map.get(item) || 0) + 1);
  }
  let allSort = SortOne(chars.length);
  for (let key of map.keys()) {
    allSort = parseInt(allSort / SortOne(map.get(key)));
  }
  console.log(allSort);
}

function SortOne(charsnum) {
  if (charsnum == 1) {
    return 1;
  }
  return charsnum * SortOne(charsnum - 1);
}
pailie();

// 解法二 全排列递归处理
function getPermutation(str) {
  if (str.length == 1) return [str]; //递归出口
  let res = [];
  for (let i = 0; i < str.length; i++) {
    //当前的字符
    let first_str = str[i];
    //截出当前值的剩下字符的排列。明白这里需要的是 剩下字符的排列数组。
    let other_str = getPermutation(str.slice(0, i) + str.slice(i + 1));
    //返回的是数组
    let temp = other_str.map((d) => first_str + d);
    res = res.concat(temp);
  }
  return res;
}
// 提示超时了
function kaogu() {
  let input = readline().trim().replace(/\s+/g, "");
  let arr = getPermutation(input);
  let brr = Array.from(new Set(arr));
  console.log(brr.length);
}

// 解法三 还是会提醒超时
var permute = function (nums) {
  let nums = readline().trim().replace(/\s+/g, "");
  let sum = [];
  backtrack(nums, [], sum);
  return sum;
};
function backtrack(nums, arr, sum) {
  if (arr.length === nums.length) {
    sum.push([...arr]); // 解构，防止指向指针
    return;
  }
  for (let i = 0; i < nums.length; i++) {
    // 不合格的节点
    // 例如：全排列题目，判断条件为 当前操作数组是否包含数组[i]，数值相同不进行对比
    // 例如：皇后棋盘位置问题，判断条件为，棋子位置是否被其他棋子攻击到
    if (arr.includes(nums[i])) continue;
    // 前进
    arr.push(nums[i]);
    // 递归
    backtrack(nums, arr, sum);
    // 回溯
    arr.pop();
  }
}

/**
 java
 
//  回溯DFS
import java.util.*;

public class quanPaiLie {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        String str = in.nextLine();
        in.close();
        char[] ch = str.toCharArray();
        Arrays.sort(ch);  // 排序是剪枝的前提
        Deque<Character> path = new ArrayDeque<>(); // 用栈构造path，存储已经选择的字符
        boolean[] used = new boolean[ch.length];  // 判断字符是否使用过
        List<List<Character>> res = new ArrayList<>();
        dfs(ch, 0, path, used, res);
        System.out.println(res.size());
    }
    private static void dfs(char[] ch, int depth, Deque<Character> path, boolean[] used, List<List<Character>> res) {
        if (depth == ch.length) {  // 当遍历的层数等于数组长度时结束
            res.add(new ArrayList<>(path));
            return ;
        }
        for (int i = 0; i < ch.length; i++) {
            if (used[i]) {
                continue;
            }
            // 剪枝
            if (i > 0 && ch[i] == ch[i - 1] && !used[i - 1]) {
                continue;
            }
            path.addLast(ch[i]);
            used[i] = true;
            dfs(ch, depth + 1, path, used, res);
            path.removeLast();
            used[i] = false;
        }
    }
}

// 数学

import java.util.*;

public class ReSortChars {
	public static void main(String[] args) {
		Scanner in = new Scanner(System.in);
		char[] chars = in.nextLine().toCharArray();
		Map<Character, Integer> map = new HashMap<Character, Integer>();
		int num = 0;
		for (char ch:chars) {
			map.put(ch, map.getOrDefault(ch, 0) + 1);
		}
		int allSort = SortOne(chars.length);
		for (char key : map.keySet()) {
			allSort = allSort/SortOne(map.get(key));
		}
		System.out.println(allSort);
	}

	private static int SortOne (int charsnum) {
		if (charsnum == 1) {
			return 1;
		}
		return charsnum * SortOne(charsnum - 1);
	}
}

 */
