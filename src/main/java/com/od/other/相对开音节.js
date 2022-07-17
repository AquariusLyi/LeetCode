/**
 相对开音节
相对开音节构成的结构为辅音+元音（aeiou）+辅音(r除外)+e，常见的单词有bike、cake等。

给定一个字符串，以空格为分隔符，反转每个单词中的字母，若单词中包含如数字等其他非字母时不进行反转。
反转后计算其中含有相对开音节结构的子串个数（连续的子串中部分字符可以重复）。

输入描述:
字符串，以空格分割的多个单词，字符串长度<10000，字母只考虑小写
输出描述:
含有相对开音节结构的子串个数，注：个数<10000

示例1
输入
ekam a ekac
输出
2
说明
反转后为 make a cake 其中make、cake为相对开音节子串，返回2
示例2
输入
!ekam a ekekac
输出
2
说明
反转后为!ekam a cakeke 因!ekam含非英文字符所以未反转，其中 cake、keke为相对开音节子串，返回2

 */
function demo(args) {
  let s = args.trim().split(" ");
  //let s = "ekam a ekac".split(" ");

  let len = s.length;
  let count = 0;

  let reg = new RegExp("^[a-zA-Z]+$"); //全部英文的正则
  for (let i = 0; i < len; i++) {
    let str = s[i];
    let strLen = str.length; //当前字符串长度
    if (strLen < 4) {
      //字符串小于4不符合
      continue;
    }
    if (reg.test(str)) {
      str = str.split("").reverse().join(""); //全英文则反转
    }
    for (let j = 0; j <= strLen - 4; j++) {
      if (isKYJ(str.substring(j, j + 4))) {
        count++;
      }
    }
  }

  console.log(count);
}
function isKYJ(str) {
  let yuanyin = "aeiou";

  let s1 = str[0];
  let s2 = str[1];
  let s3 = str[2];
  let s4 = str[3];

  if (
    yuanyin.indexOf(s1) == -1 && //非元音即辅音
    yuanyin.indexOf(s2) != -1 &&
    yuanyin.indexOf(s3) == -1 &&
    s3 != "r" &&
    s4 == "e"
  ) {
    return true;
  }
  return false;
}

demo("ekam a ekac");
demo("!ekam a ekekac");

/**
 java 


import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        while(sc.hasNextLine()) {
            String[] temp = sc.nextLine().split("\\s+");
            System.out.println(handle(temp));
        }
        sc.close();
    }
    public static int getCount(String str) {
        if (str.length() < 4) {
            return 0;
        }
        int val = 0;
        if (!zimu(str)) {
            for (int i = 0; i <= str.length() - 4; i++) {
                if (check(str.charAt(i), str.charAt(i + 1), str.charAt(i + 2), str.charAt(i + 3))) {
                    val++;
                }
            }
        } else {
            for (int i = str.length() - 1; i > 2; i--) {
                if (check(str.charAt(i), str.charAt(i - 1), str.charAt(i - 2), str.charAt(i - 3))) {
                    val++;
                }
            }
        }
        return val;
    }
    public static boolean check(char c1, char c2, char c3, char c4) {
        if (c4 != 'e') {
            return false;
        }
        if (c2 != 'a' && c2 != 'e' && c2 != 'i' && c2 != 'o' && c2 != 'u') {
            return false;
        }
        if (c1 == 'a' || c1 == 'e' || c1 == 'i' || c1 == 'o' || c1 == 'u') {
            return false;
        }
        if (!('a' <= c1 && c1 <= 'z')) {
            return false;
        }
        if (c3 == 'a' || c3 == 'e' || c3 == 'i' || c3 == 'o' || c3 == 'u' || c3 == 'r') {
            return false;
        }
        if (!('a' <= c3 && c3 <= 'z')) {
            return false;
        }
        return true;
    }
    public static int handle(String[] temp) {
        int count = 0;
        for (int i = 0; i < temp.length; i++) {
            count += getCount(temp[i]);
        }
        return count;
    }
    public static boolean zimu(String s) {
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (!('a' <= c && c <= 'z')) {
                return false;
            }
        }
        return true;
    }
}
 */
