/**
 
字符串变换最小字符串

给定一个字符串s，最多只能进行一次变换，返回变换后能得到的最小字符串（按照字典序进行比较）。
变换规则：交换字符串中任意两个不同位置的字符。

输入描述:
一串小写字母组成的字符串s
输出描述:
按照要求进行变换得到的最小字符串

示例1
输入
abcdef
输出
abcdef
说明
abcdef已经是最小字符串，不需要交换
示例2
输入
bcdefa
输出
acdefb
说明
a和b进行位置交换，可以等到最小字符串
备注:
s是都是小写字符组成
1<=s.length<=1000


 */

/**
 
1、对字符串按照字典序进行排序，找到字典序最小的字符串。

2、找到这个字符串中字典序最小的字符的位置。

3、找到字符串中第一个跟最小字符串不相同的字符的位置，然后跟第一个最小字符进行交换。

4、题目规定只能交换一次，交换后得到的就是最小字符串

 */
function changeString(str) {
  let unSortStr = str.split("");
  let sortStr = str.split("").sort();
  let minStr = sortStr[0],
    place = 0,
    change = 0;
  for (let i = 0; i < unSortStr.length; i++) {
    if (unSortStr[i] == minStr) {
      place = i;
      break;
    }
  }
  for (let j = 0; j < unSortStr.length; j++) {
    if (unSortStr[j] != minStr) {
      change = j;
      break;
    }
  }
  if (place > change) {
    swap(unSortStr, place, change);
  }
  return unSortStr.join("");
  //用于交换字符的函数
  function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
}

console.log(changeString("bcacdef")); //打印结果：acbcdef
console.log(changeString("abcdef")); //打印结果：abcdef

/**
 java
// 解法一


import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        String str = in.nextLine();
        in.close();

        char[] chars = str.toCharArray();
        char tmp = chars[0];
        int pos = 0;
        for (int i = 1; i < chars.length; i++) {
            char cur = chars[i];
            if (cur <= tmp) {
                tmp = cur;
                pos = i;
            }
        }

        if (pos != 0) {
            chars[pos] = chars[0];
            chars[0] = tmp;
        }

        System.out.println(new String(chars));

    }
}



// 解法二

 

import java.util.Scanner;

public class Main {
	public static void main(String[] args) {
		Scanner scan = new Scanner(System.in);
		String str = scan.next();
		if (str == null || str.isEmpty()) {
			return;
		}
		char[] charArray = str.toCharArray();
		int minIndex = 0;
		int minCharValue = Integer.valueOf(charArray[0]);
		for (int i = 0; i < charArray.length; i++) {
			int charValue = Integer.valueOf(charArray[i]);
			if (charValue <= minCharValue) {
				minCharValue = charValue;
				minIndex = i;
			}
		}
		if (minIndex == 0) {
			System.out.println(str);
		} else {
			char temp = charArray[0];
			charArray[0] = charArray[minIndex];
			charArray[minIndex] = temp;
			System.out.println(String.valueOf(charArray));
		}
	}

}


 */
