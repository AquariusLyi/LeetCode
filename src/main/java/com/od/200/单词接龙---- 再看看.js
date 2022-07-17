/**
 单词接龙的规则是可用于接龙的单词 首字母必须要与前一个单词的尾字母相同，当存在多个首字母相同的单词时
取长度最长的单词，如果长度也相等，则取字典序最小的单词，已经参与接龙的单词不能重复使用。

现给定一组全部由小写字母组成的单词数组，并指定其中一个单词为起始单词，进行单词接龙
请输出最长的单词串，单词串是单词拼接而成的中间没有空格

输入描述
输入第一行为一个非负整数，表示起始单词在数组中的索引k     0<=k<N
输入的第二行为非负整数N，接下来的N行分别表示单词数组中的单词

输出描述，输出一个字符串表示最终拼接的单词串

示例
0
6
word
dd
da
dc
dword
d

输出
worddwordda
说明 先确定起始单词word 在接dword
剩余dd da dc 则取da

示例2
4
6
word
dd
da
dc
dword
d

输出
dwordda

单词个数1<N<20
单个单词的长度  1~30
 */

function niuke() {
  const index = +readline().trim();
  const nums = +readline().trim();
  let input = [];
  // 后面如果是输入多行的 需要 循环处理 readline()
  for (let i = 0; i < nums; i++) {
    let ele = readline().trim();
    input.push(ele);
  }
  let first = input[index];
  let result = first + "";
  input.splice(index, 1);
  input.sort((a, b) => {
    if (a.length != b.length) {
      return b.length - a.length;
    } else if (a.length == b.length) {
      // return a.localeCompare(b);
      for (let i = 0; i < a.length; i++) {
        if (a.charCodeAt(i) == b.charCodeAt(i)) continue;
        return a.charCodeAt(i) - b.charCodeAt(i);
      }
    }
  });
  let len = 0;
  // 学会使用while 循环处理 就可以了
  while (result.length != len) {
    len = result.length;
    let last = result.substr(-1);
    for (let i = 0; i < input.length; i++) {
      const cur = input[i];
      if (cur.startsWith(last)) {
        result += cur;
        input.splice(i, 1);
        break;
      }
    }
  }
  console.log(result);
}

// 解法一
function getNewWord(str1, str2, str3) {
  const index = +str1.trim();
  const nums = +str2.trim();
  const input = str3.trim().split(/[\n\s]+/g);
  let first = input[index];
  let result = first + "";
  input.splice(index, 1);
  input.sort((a, b) => {
    if (a.length < b.length) {
      return 1;
    }
    if (a.length > b.length) {
      return -1;
    }
    return a.localeCompare(b);
  });
  let len = 0;
  // 学会使用while 循环处理 就可以了
  while (result.length != len) {
    len = result.length;
    let last = result.substr(-1);
    for (let i = 0; i < input.length; i++) {
      const cur = input[i];
      if (cur.startsWith(last)) {
        result += cur;
        input.splice(i, 1);
        break;
      }
    }
  }
  console.log(result);
}

getNewWord(
  "4",
  "6",
  `word
dd
da
dc
dword
d`
);
getNewWord(
  "0",
  "6",
  `word
dd
da
dc
dword
  d`
);

// 解法二
function getNewWord2(str1, str2, str3) {
  //接收输入参数
  const k = +str1.trim();
  const N = +str2.trim();
  const list = str3.trim().split(/[\n\s]+/g);

  //确定好初始String以及tail
  let temp = list[k];
  list.splice(k, 1);

  let tail = temp.charAt(temp.length - 1);

  //结果存储在res中
  let res = [];
  res.push(temp);
  while (getStr(list, tail) != null) {
    let str = getStr(list, tail);
    res.push(str);
    let idx = list.findIndex((item) => item == str);
    list.splice(idx, 1);
    tail = str.charAt(str.length - 1);
  }
  console.log(res.join(""));
  // for(String s : res){
  //     System.out.print(s);
  // }
}

//辅助函数,ArrayList是引用数据类型；将计算处理过程独立出来，主函数只需写逻辑过程
function getStr(list, tail) {
  let set = new Set();
  for (s of list) {
    if (s.charAt(0) == tail) {
      set.add(s);
    }
  }

  if (set.size == 0) {
    return null;
  }

  let res = "";
  let max = 0;
  for (s of set) {
    if (s.length > max) {
      max = s.length;
      res = s;
    }
  }
  return res;
}

getNewWord2(
  "4",
  "6",
  `word
dd
da
dc
dword
d`
);

// 解法三
function getNewWord3(str1, str2, str3) {
  const index = +str1.trim();
  const nums = +str2.trim();
  const input = str3.trim().split(/[\n\s]+/g);
  let first = input[index];
  let result = first + "";
  input.splice(index, 1);
  input.sort((a, b) => {
    if (a.length < b.length) {
      return 1;
    }
    if (a.length > b.length) {
      return -1;
    }
    return a.localeCompare(b);
  });
  const arr = JSON.parse(JSON.stringify(input));
  let abc = [];
  while (arr.length) {
    let temp = [];
    let count = 1;
    for (let i = 0; i < arr.length; i++) {
      const ele = arr[i];
      temp.push(ele);
      if (arr[i + 1] && ele.length == arr[i + 1].length) {
        count++;
      } else {
        arr.splice(0, count);
        count = 1;
        break;
      }
    }
    abc.push(temp);
  }
  let map = new Map();
  abc.forEach((item) => {
    map.set(item[0], item.length);
    if (result.substr(-1) == item[0][0]) {
      result += item[0];
    }
  });
  console.log(result);
}

getNewWord3(
  "4",
  "6",
  `word
dd
da
dc
dword
d`
);
getNewWord3(
  "0",
  "6",
  `word
  dd
  da
  dc
  dword
  d`
);

/**
 java


 import java.util.ArrayList;
import java.util.Scanner;
import java.util.TreeSet;
import java.util.concurrent.BrokenBarrierException;

public class Demo16 {
  public static void main(String[] args) {

      Scanner in = new Scanner(System.in);

      int k = Integer.parseInt(in.nextLine());
      int N = Integer.parseInt(in.nextLine());
      ArrayList<String> list = new ArrayList<>();
      for (int i = 0; i < N; i++) {
          list.add(in.nextLine());
      }

      StringBuilder builder = new StringBuilder();
      String head = list.get(k);
      builder.append(head);
      list.remove(k);

      String tail = head.substring(head.length() - 1);

      while (true) {
          TreeSet<String> set = new TreeSet<>();

          for (int i = 0; i < list.size(); i++) {
              String word = list.get(i);
              if (word.startsWith(tail)) {
                  set.add(word);
              }
          }
          if (set.size() == 0) break;
          String first = set.pollFirst();
          int len = first.length();
          String aim = "";
          for (String s : set) {
              if (s.length() > len) {
                  len = s.length();
                  aim = s;
              }
          }
          String into = len != first.length() ? aim : first;
          tail = into.substring(into.length() - 1);
          builder.append(into);
          list.remove(into);
      }
      System.out.println(builder.toString());

      in.close();
  }
}

 */
