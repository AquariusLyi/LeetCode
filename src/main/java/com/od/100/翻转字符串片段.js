/**
 翻转字符串片段
 
按索引范围翻转文章片段

输入一个英文文章片段翻转指定区域的单词顺序标点符号和普通字母一样处理
例如输入字符串
I am a developer.
0
3
则输出 developer. a am I

输入描述
使用换行隔开3个参数
第一个参数为文章内容 即英文字符串
第二个参数为翻转起始单词下标，下标从0开始
第三个参数为结束单词下标

输出描述
翻转后英文文章片段每个单词之间以一个半角空格分割输出

 

输入
  hello world!
0
1                                                                            
输出
world! hello

输入字符串可以在前面或者后面包含多个空格但是翻转后的字符不能包括

指定反转区间只有一个单词或无有效单词则输出EMPTY

 https://www.cnblogs.com/Jukim/p/16051592.html
 */

function reverse(str1, str2, str3) {
  let split = str1.trim().split(/\s+/);
  let start = parseInt(str2.trim());
  let end = parseInt(str3.trim());

  //处理特殊情况
  if (end - start < 1) {
    console.log("EMPTY");
    return;
  }
  let j = end;
  let res = "";
  for (let i = 0; i < split.length; i++) {
    // I am a developer. 0 3
    if (i >= start && i <= end) {
      res = res.concat(split[j--], " ");
    } else {
      res = res.concat(split[i], " ");
    }
  }

  console.log(res.trim());
}
reverse(" hello world!", "0", "1 ");
reverse(" I am a developer.", "0", "3");

/**
 java

 import java.util.Scanner;

public class Main0007 {
  public static void main(String[] args) {
    try (Scanner scanner = new Scanner(System.in)) {
      String line = scanner.nextLine();
      int l = scanner.nextInt();
      int r = scanner.nextInt();
      solution(line, l, r);
    }
  }

  private static void solution(String line, int l, int r) {
    String[] words = line.trim().split(" ");
    if (r > words.length - 1) r = words.length - 1;
    if (words.length == 0 ||
        l < 0 ||
        r - l <= 0) {
      System.out.println("EMPTY");
      return;
    }

    while (l < r) {
      String tmp = words[l];
      words[l] = words[r];
      words[r] = tmp;
      l++;
      r--;
    }

    for (int i = 0; i < words.length; i++) {
      System.out.print(words[i]);
      if (i != words.length - 1) {
        System.out.print(" ");
      }
    }
  }
}
 */
