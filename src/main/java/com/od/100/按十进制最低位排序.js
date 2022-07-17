/**
整型数组按个位值排序

 给定一个非空数组(列表)，起元素数据类型为整型
请按照数组元素十进制最低位从小到大进行排序，十进制最低位相同的元素，相对位置保持不变
当数组元素为负值时，十进制最低为等同于去除符号位后对应十进制值最低位

输入描述
给定一个非空数组(列表)，其元素数据类型为32位有符号整数，数组长度为[1,1000]
输出排序后的数组

输入
1,2,5,-21,22,11,55,-101,42,8,7,32
输出
1,-21,11,-101,2,22,42,32,5,55,7,8

https://www.cnblogs.com/Jukim/p/16058176.html
 */

function getNewArr(str) {
  let list = str.trim().split(",").map(Number);
  list.sort((o1, o2) => {
    let d1 = Math.abs(o1); // o1 > 0 ? o1 : -o1;
    let d2 = Math.abs(o2); // o2 > 0 ? o2 : -o2;
    let k1 = d1 % 10;
    let k2 = d2 % 10;
    return k1 - k2;
  });
  console.log(list.toString());
}
getNewArr("1,2,5,-21,22,11,55,-101,42,8,7,32");

/**
 java
 
答案：
解法一：

import java.util.Scanner;

public class Main {
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		String str = sc.nextLine();
		String [] strs = str.split(",");
		StringBuffer sb= new StringBuffer();
		int i = 0;
		while(i<=9) {
			for(String s : strs) {
				int a = Integer.parseInt(s.substring(s.length()-1));
				if(a == i) {
					sb.append(s).append(",");
				}
			}
			i++;
		}
		String str2 = sb.toString();
		str2 = str2.substring(0,str2.length()-1);
		System.out.print(str2);
		
	}

}

// 解法二

import java.util.ArrayList;
import java.util.Comparator;
import java.util.Scanner;
public class Main4 {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        String[] nums = in.nextLine().split(",");
        in.close();

        ArrayList<Integer> list = new ArrayList<>();
        for (String num : nums) {
            list.add(Integer.parseInt(num));
        }
        list.sort(new Comparator<Integer>() {
            @Override
            public int compare(Integer o1, Integer o2) {
                return getKey(o1) - getKey(o2);
            }

            public Integer getKey(int i) {
                i = i > 0 ? i : -i;
                return i % 10;
            }
        });

        String listStr = list.toString();
        String res = listStr.substring(1, listStr.length() - 1)
                .replaceAll(" ", "");

        System.out.println(res);
    }
}

 */
