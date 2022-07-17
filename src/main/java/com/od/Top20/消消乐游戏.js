/**
消消乐游戏
游戏规则：输入一个只包含英文字母的字符串，字符串中的两个字母如果相邻且相同，就可以消除。

在字符串上反复执行消除的动作，直到无法继续消除为止，此时游戏结束。
输出最终得到的字符串长度。

输入描述:
输入原始字符串 str ，只能包含大小写英文字母，字母的大小写敏感， str 长度不超过100。

输出描述:
输出游戏结束后，最终得到的字符串长度

示例1
输入
gg
输出
0
说明
gg 可以直接消除，得到空串，长度为0
示例2
输入
mMbccbc
输出
3
说明
在 mMbccbc 中，可以先消除 cc ；此时字符串变成 mMbbc ，可以再消除 bb ；此时字符串变成 mMc ，此时没有相邻且相同的字符，无法继续消除。最终得到的字符串为 mMc ，长度为3
备注:
输入中包含 非大小写英文字母 时，均为异常输入，直接返回 0

 */

function xiaoxiaole(args) {
  let input = args.trim();
  let reg = /^[a-zA-z]+$/g;
  if (!reg.test(input)) {
    console.log(0);
    return;
  }
  for (let i = 0; i < input.length; i++) {
    if (input[i] == input[i + 1]) {
      input = input.replace(input[i] + input[i + 1], "");
      i = 0;
    }
  }
  console.log(input.length);
}
xiaoxiaole("gg");
xiaoxiaole("mMbccbc");

function xiaoxiaole2(args) {
  let input = args.trim();
  let reg = /^[a-zA-z]+$/;
  if (!reg.test(input)) {
    console.log(0);
    return;
  }
  let stack = [];
  let flag = true;
  for (let i = 0; i < input.length; i++) {
    let ele = input[i];
    if (!reg.test(ele)) {
      console.log(0);
      flag = false;
      break;
    }
    if (stack.length && ele == stack[stack.length - 1]) {
      stack.pop();
    } else {
      stack.push(ele);
    }
  }
  if (flag) {
    console.log(stack.length);
  }
}
xiaoxiaole2("gg");
xiaoxiaole2("mMbccbc");
/**
 
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.Stack;

public class Main {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        String a = in.nextLine();
        char[] str = a.toCharArray();
        Stack<Character> stack = new Stack<Character>();
        boolean flag = true;
        for(int i=0;i<str.length;i++){
                String sss = String.valueOf(str[i]).toLowerCase();
                char ssss = sss.charAt(0);
                if((ssss < 'a' || ssss > 'z')){
                    System.out.println(0);
                    flag = false;
                    break;
                }
                if(stack.size()>0 && str[i] == stack.peek()){
                    stack.pop();
                }else{
                    stack.push(str[i]);
                }
        }
        if(flag){
            System.out.println(stack.size());
        }
    }
}
 */
