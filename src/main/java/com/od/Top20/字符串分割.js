/**

字符串分割（二）

给定一个非空字符串S，其被N个‘-’分隔成N+1的子串，给定正整数K，要求除第一个子串外，其余的子串每K个字符组成新的子串，并用‘-’分隔。对于新组成的每一个子串，如果它含有的小写字母比大写字母多，则将这个子串的所有大写字母转换为小写字母；反之，如果它含有的大写字母比小写字母多，则将这个子串的所有小写字母转换为大写字母；大小写字母的数量相等时，不做转换。


输入描述

输入为两行，第一行为参数K，第二行为字符串S。

输出描述

输出转换后的字符串。

示例1  输入输出示例仅供调试，后台判题数据一般不包含示例

输入

3
12abc-abCABc-4aB@

输出

12abc-abc-ABC-4aB-@

说明

子串为12abc、abCABc、4aB@，第一个子串保留，

后面的子串每3个字符一组为abC、ABc、4aB、@，

abC中小写字母较多，转换为abc，

ABc中大写字母较多，转换为ABC，

4aB中大小写字母都为1个，不做转换，

@中没有字母，连起来即12abc-abc-ABC-4aB-@

示例2  输入输出示例仅供调试，后台判题数据一般不包含示例

输入

12
12abc-abCABc-4aB@

输出

12abc-abCABc4aB@

说明

子串为12abc、abCABc、4aB@，第一个子串保留，

后面的子串每12个字符一组为abCABc4aB@，

这个子串中大小写字母都为4个，不做转换，

连起来即12abc-abCABc4aB@
 */

function isUpOrLow(word) {
  let sumL = 0;
  let sumU = 0;
  for (let i = 0; i < word.length; i++) {
    const ele = word[i];
    if (/[a-z]+/.test(ele)) {
      sumL++;
    }
    if (/[A-Z]+/.test(ele)) {
      sumU++;
    }
  }
  if (sumL > sumU) {
    return "toLowerCase";
  } else if (sumL < sumU) {
    return "toUpperCase";
  } else {
    return "middle";
  }
}

function getNewStr(arg) {
  const input = arg.trim().split(/\s+/g);
  console.log(input);
  const num = input[0];
  const inputStr = input[1];
  const inputStrArr = inputStr.split("-");
  console.log(inputStrArr);
  const firstWord = inputStrArr[0];
  inputStrArr.shift(); // 删除第一个字符
  const otherWord = inputStrArr.join("");
  let output = "";
  if (firstWord) {
    output = firstWord;
  }
  console.log(otherWord);
  //   inpuStrArr 其他数组字符 join 之后的 otherWord  abCABc4aB@
  let len = otherWord.length;
  let result = [];
  if (len) {
    for (let i = 0; i < len; i++) {
      let index = parseInt(i / num);
      if (result.length <= index) {
        result.push([]);
      }
      result[index].push(otherWord[i]);
    }
  }
  var lastArr = [];
  for (let i = 0; i < result.length; i++) {
    const curr = result[i].join("");
    if (isUpOrLow(curr) == "toUpperCase") {
      lastArr.push(curr.toUpperCase());
    } else if (isUpOrLow(curr) == "toLowerCase") {
      lastArr.push(curr.toLowerCase());
    } else {
      lastArr.push(curr);
    }
  }
  lastArr.forEach((item) => {
    output += "-" + item;
  });
  console.log(output);
}
// getNewStr("3 12abc-abCABc-4aB@");
// getNewStr("12 12abc-abCABc-4aBB@");
getNewStr("3 12abc-abCABc-4aB@");

/**
 java

 
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
public class Main {
  public static void main(String[] args) {

        Scanner in = new Scanner(System.in);
        while (in.hasNextInt()) {
            int k = in.nextInt();
            String s = in.next();
            char[] chars = s.toCharArray();

            int indexOfOne = s.indexOf("-");
            List<String> resList = new ArrayList<>();
            resList.add(s.substring(0, indexOfOne));

            StringBuilder tmp = new StringBuilder();
            int up = 0;
            int low = 0;
            int length = 0;
            for (int i = indexOfOne; i < chars.length; i++) {
                char c = chars[i];
                if ('A' <= c && c <= 'Z') {
                    up += 1;
                    tmp.append(c);
                    length += 1;
                } else if ('a' <= c && c <= 'z'){
                    low += 1;
                    tmp.append(c);
                    length += 1;
                } else if (c != '-') {
                    tmp.append(c);
                    length += 1;
                }
                if (length == k || chars.length -1 == i) {
                    String str = tmp.toString();
                    if (up > low) {
                        resList.add(str.toUpperCase());
                    } else if (up < low) {
                        resList.add(str.toLowerCase());
                    } else {
                        resList.add(str);
                    }
                    tmp.delete(0,length);
                    up = 0;
                    low = 0;
                    length = 0;
                }
            }
            System.out.println(String.join("-",resList));
        }
    }
}
 */
