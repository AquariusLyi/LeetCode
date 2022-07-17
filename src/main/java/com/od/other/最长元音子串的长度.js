/**
 最长元音子串的长度
定义：当一个字符串只有元音字母（aeiouAEIOU）组成，称为元音字符串。
现给定一个字符串，请找出其中最长的元音字符子串，并返回其长度；如果找不到，则返回0。

子串：字符串中任意个连续的字符组成的子序列称为该字符串的子串。

输入描述:
一个字符串，其长度范围：0 < length <= 65535。
字符串仅由字符a-z和A-Z组成。

输出描述:
一个整数，表示最长的元音字符子串的长度。

示例1
输入
asdbuiodevauufgh
输出
3
说明
样例1解释：最长元音子串为 “uio” 或 “auu”，其长度都为3，因此输出3

 */
function yuanyin(args) {
  let source = "aeiouAEIOU";
  let str = args.trim();
  let result = 0;
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    let temp = str.charAt(i);
    // if (source.includes(temp)) {
    //   count++;
    // } else {
    //   count = 0;
    // }
    count = source.includes(temp) ? count + 1 : 0;
    if (count > result) result = count;
  }
  console.log(result);
}
yuanyin("asdbuiodevauufgh");
/**
 java

import java.util.*;

public class Main {
    public static void main(String[] args) {
        String source = "aeiouAEIOU";
        Scanner sc = new Scanner(System.in);
        String str = sc.next();
        int result = 0;
        int count = 0;
        for (int i = 0; i < str.length(); i++) {
            String temp = String.valueOf(str.charAt(i));
            if(source.contains(temp)) {
                count++;
            } else {
                count = 0;
            }
            if(count > result) {
                result = count;
            }
        }
        System.out.println(result);
    }
}
 */
