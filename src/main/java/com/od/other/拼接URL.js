/**

拼接URL

给定一个URL前缀和URL后缀，通过","分割，需要将其连接为一个完整的URL，如果前缀结尾和后缀开头都没有“/”，需自动补上“/”连接符，如果前缀结尾和后缀开头都为“/”，需自动去重。
约束：不用考虑前后缀URL不合法情况。

输入描述:
URL前缀（一个长度小于100的字符串),URL后缀（一个长度小于100的字符串）。
输出描述:
拼接后的URL。

示例1
输入
/acm,/bb
输出
/acm/bb
示例2
输入
/abc/,/bcd
输出
/abc/bcd
示例3
输入
/acd,bef
输出
/acd/bef
示例4
输入
,
输出
/

 */

function demo() {
  let s = readLine().split(",");
  //let s = "/acm,/bb".split(",");

  let res = "";

  if (s.length == 0) {
    res = "/";
  } else {
    for (let i = 0; i < s.length; i++) {
      /**
       * 将字符串中的"/"直接去除
       */
      res += "/" + s[i].replace("/", "");
    }
  }

  console.log(res);
}

/**
 * 
 java

 import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        while (in.hasNextLine()) {// 注意，如果输入是多个测试用例，请通过while循环处理多个测试用例
            String inStr = in.nextLine();
            String out =  inStr.replaceFirst(",", "/");
            out = out.replace("//", "/");
            out = out.replace("//", "/");
            System.out.println(out);
        }
    }
}
 */
