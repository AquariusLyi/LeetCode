/**
英文输入法


主管期望你来实现英文输入法单词联想功能，需求如下
依据用户输入的单词前缀，从已输入的英文语句中联想出用户想输入的单词
按字典序输出联想到的单词序列，如果联想不到，请输出用户输入的单词前缀

注意：英文单词联想时区分大小写，缩略形式如，"don't" 判定为两个单词 "don"和 "t"
输出的单词序列不能有重复单词，且只能是英文单词，不能有标点符号。

输入描述

输入两行
首行输入一段由英文单词word和标点构成的语句str
接下来一行为一个英文单词前缀pre

0 < word.length() <= 20
0 < str.length <= 10000
0 < pre <=20

输出描述

输出符合要求的单词序列或单词前缀
存在多个时，单词之间以单个空格分割

示例一
输入
I love you
He

输出
He

说明
用户已输入单词语句"I love you",  中提炼出"I","love","you"三个单词
接下来用户输入"He" ，从已经输入信息中无法联想到符合要求的单词，所以输出用户输入的单词前缀

示例二
输入
The furthest distance in the world,Is not between life and death,But when I stand in front or you,Yet you don't know that I love you.
f

输出
front furthest

 */

function getNewWord(str1, str2) {
  //   const input = str1.trim().replace(/[,'!.;:?]+/g, " ");
  /**
 \d 数字
 \D 非数字
 \w 字母 数字 下划线 [a-zA-Z0-9_]
 \W 匹配所有与\w 不符合的 字符
 . 匹配除了换行字符意外的所有字符
 ^ 定位符规定匹配模式必须出现在目标字符串的开头
 $ 定位符规定匹配模式必须出现在目标对象的结尾 

 \s 匹配单个空格 包括 tab键和换行符号
 */
  const input = str1.trim().replace(/\W+/g, " ");
  const word = str2.trim();
  const split = input.split(/\s+/g).filter((item) => item);
  let set = new Set();
  split.forEach((element) => {
    if (element.startsWith(word)) {
      set.add(element);
    }
  });
  if (set.size) {
    // sort 默认是根据每个元素的 ASCII 码进行排序，排序的核心是对比两个元素的大小，直接对比数字是可以的

    // let arr = Array.from(set).sort((a, b) => {
    //   let k1 = a.toUpperCase();
    //   let k2 = b.toUpperCase();
    //   if (k1 < k2) {
    //     return -1; // a 小于 b a在前面 返回-1
    //   }
    //   if (k1 > k2) {
    //     return 1; // a 大于b 不在前面 返回 1
    //   }
    //   return 0; // 2个相等 啥也不干
    // });

    //  localeCompare 是字符串 比较
    // Array.from(set).sort((a,b)=>a.localeCompare(b))

    //  也可以使用 Array.from(set).sort()
    let arr = Array.from(set).sort();

    let result = arr.join(" ");
    console.log(result);
  } else {
    console.log(word);
  }
}
getNewWord(
  "The 'furthest' ;distance in the world,Is not; between life and death,But when I stand in front or you,Yet you don't know that I! love you.",
  "f"
);

/**
 java


//  解法一

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        while (in.hasNextLine()) {
            String[] arr = in.nextLine().split("[^a-zA-Z]+");
            String key = in.nextLine();
            List<String> result = new ArrayList<>();
            for (String str : arr) {
                if (str.startsWith(key) && !result.contains(str)) {
                    result.add(str);
                }
            }

            if (result.isEmpty()) {
                System.out.println(key);
            } else {
                Collections.sort(result);
                StringBuffer tmp = new StringBuffer();
                for (String str : result) {
                    tmp.append(str).append(" ");
                }
                System.out.println(tmp.toString().trim());
            }
        }
    }
}


// 解法二
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine();
        String target = sc.nextLine();
        List<String> list = new ArrayList<>();
        StringBuilder word = new StringBuilder();
        for (int i = 0; i < input.length(); i++) {
            char ch = input.charAt(i);
            if ((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z')) {
                word.append(ch);
            } else {
                list.add(word.toString());
                word = new StringBuilder();
            }
        }
        List<String> res = new ArrayList<>();
        for (String s : list) {
            if (s.startsWith(target)) {
                res.add(s);
            }
        }
        Collections.sort(res);
        if (res.size() > 0) {
            for (String re : res) {
                System.out.print(re + " ");
            }
            System.out.println();
        } else {
            System.out.println(target);
        }
    }
}


//  解法三
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Scanner;

public class Main {
	public static void main(String[] args) {
		Scanner in = new Scanner(System.in);
		while (in.hasNextLine()) {// 注意，如果输入是多个测试用例，请通过while循环处理多个测试用例
			String[] arr = in.nextLine().split("[^a-zA-Z]+");
			String key = in.nextLine();
			List<String> result = new ArrayList<>();
			for (String str : arr) {
				if (str.startsWith(key) && !result.contains(str)) {
					result.add(str);
				}
			}

			if (result.isEmpty()) {
				System.out.println(key);
			} else {
				Collections.sort(result);
				StringBuffer tmp = new StringBuffer();
				for (String str : result) {
					tmp.append(str).append(" ");
				}
				System.out.println(tmp.toString().trim());
			}

		}
	}
}
// 解法二-----
public class Main{
 
    public static void main(String[] args) {
 
        Scanner sc = new Scanner(System.in);
        String[] strings = sc.nextLine()
                .replace("'"," ")   //对“'”符号进行空格处理
                .replace(",","")    
                .replace(".","")
                .replace("?","")
                .replace("!","")    //对“, . ? !”符号进行删除处理
                .split(" ");    //按照空格进行分割
 
        Collections.sort(Arrays.asList(strings));   //因为是字典需要进行排序
        String key = sc.nextLine();
        int keyLen = key.length();
        int strLen = strings.length;
        String res = "";
 
        for(int i=0;i<strLen;i++){
            String s = strings[i];
            if(s.length()>=keyLen && s.substring(0,keyLen).equals(key)){    //匹配的字符串需要判断长度，并进行关键词长度的分割
                if(res.length()!=0){
                    res+=" ";
                }
                res+=s;
            }
        }
        if(res.length()==0){
            res = key;
        }
        System.out.println(res);
 
    }
 
}

// 解法二

package com.xahj.bd2006;

import java.util.Arrays;
import java.util.Scanner;
import java.util.TreeSet;
public class Main6 {
    public static void main(String[] args) {
         Scanner in = new Scanner(System.in);
        String[] str = in.nextLine().split("\\W+");
        String pre = in.nextLine();
        in.close();

        TreeSet<String> words = new TreeSet<>(Arrays.asList(str));

        StringBuilder buffer = new StringBuilder();

        for (String word : words) {
            if (word.startsWith(pre)) {
                buffer.append(word).append(" ");
            }
        }
        if (buffer.length() == 0) buffer.append(pre);

        System.out.println(buffer.toString().trim());

    }
}

 */
