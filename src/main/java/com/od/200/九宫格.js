/**
 九宫格按键输入法

注意！答案仅作为参考（实际考试中下列代码通过用例100%，但不代表最优解）

九宫格按键输入，输出显示内容，有英文和数字两个模式，默认是数字模式，数字模式直接输出数字，

英文模式连续按同一个按键会依次出现这个按键上的字母，如果输入 ‘/’ 或者其他字符，则循环中断。
字符对应关系如图所示。

1（,.） 2（abc）3（def）
4（ghi）5（jkl）6（mno）
7（pqrs）8（tuv）9（wxyz）
0（空格） # /

(图像: 在这里插入图片描述)

https://img-blog.csdnimg.cn/a4614134a9f8444bae340cb42e00b7b9.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5py66K-V5Y-u5b2T54yr,size_18,color_FFFFFF,t_70,g_se,x_16

输入描述
输入范围为数字 0~9 和字符 ‘#’、’/’，输出屏幕显示，例如：
在数字模式下，输入 1234，显示 1234
在英文模式下，输入 1234，显示,adg
输出描述
#用于切换模式，默认是数字模式，执行 # 后切换为英文模式；
/ 表示延迟，例如在英文模式下，输入 22/222，显示为 bc；
英文模式下，多次按同一键，例如输入 22222，显示为 b；
示例 1
输入
1
123
输出
1
123
样例 1 解释
输入法默认为数字模式状态，按键123即输出123。
示例 2
输入
123#222235/56
输出
123adjjm
样例 2 解释
输入法默认为数字模式状态，按键123即输出123，按下‘#’后切换为英文模式，连续输入4个’2’，输出a，
其后按下’3’，输出d，其后按下’5’，输出j，然后按下’/‘被中断，其后分别按下’5’和’6’，因此最后输出123adjjm。
测试用例：
Case1:
输入：123
输出：123
Case2:
输入：123#222235/56
输出：123adjjm
Case3:
输入：#22/222
输出：bc
Case4:
输入：#22222
输出：b
Case5:
输入：#1234
输出：,adg
Case6:
输入：#44882933444
输出：huawei

 */

function jiugongge() {
  let arr = readline().trim().split("");
  let list = [",.", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"];
  let flag = true;
  let i = 0;
  let res = "";
  while (i < arr.length) {
    if (arr[i] == "#") {
      flag = false;
    } else if (flag && arr[i] != "/") {
      res += arr[i];
    } else if (arr[i] == "0") {
      res += " ";
    } else {
      let ch = 0;
      while (i < arr.length - 1 && arr[i] == arr[i + 1]) {
        i++;
        ch++;
      }
      if (arr[i] != "/") {
        let s = list[arr[i] - 1];
        let i1 = ch % s.length;
        let s1 = list[arr[i] - 1];
        let temp = s1.split("");
        for (let j = 0; j < temp.length; j++) {
          if (j == i1) {
            res += temp[j];
          }
        }
      }
    }
    i++;
  }
  console.log(res);
}
jiugongge();

/**
  java


import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;


public class Main {
    public static void main(String[] args) {
        Main main = new Main();
        main.test2();
    }
    private void test2() {
        Scanner scanner = new Scanner(System.in);
        char[] chars = scanner.nextLine().toCharArray();
        ArrayList<String> strings = new ArrayList<>();
        strings.add(",.");
        strings.add("abc");
        strings.add("def");
        strings.add("ghi");
        strings.add("jkl");
        strings.add("mno");
        strings.add("pqrs");
        strings.add("tuv");
        strings.add("wxyz");
                    boolean flag = true;
                    int i =0;
                    String re = "";
            while (i<chars.length){
                if (chars[i] =='#'){
                    flag =false;
                }else  if (flag&& chars[i] !='/'){
                    re += chars[i];
                }else  if (chars[i] =='0'){
                    re += " ";
                }else {
                    int c = 0;
                    while (i< chars.length-1&&chars[i]==chars[i+1]){
                        i++;
                        c++;
                    }
                    if (chars[i]!='/'){
                        String s = strings.get(chars[i] - '1');
                        int i1 = c % s.length();
                        String s1 = strings.get(chars[i] - '1');
                        char[] chars1 = s1.toCharArray();
                        for (int i2 = 0; i2 < chars1.length; i2++) {
                            if (i2 == i1){
                                re += chars1[i2];
                            }
                        }
                       // re+= strings.get(chars[i]-'1').indexOf(i1);
                    }


                }
                i++;
            }
        System.out.println(re);
    }
    }
}

// 解法二

public class 九宫格输入法 {
    public static Map<Character,String[]> keyBoards = new HashMap<>();

    static {
        keyBoards.put('1',new String[] {",","."});
        keyBoards.put('2',new String[] {"a","b","c"});
        keyBoards.put('3',new String[] {"d","e","f"});
        keyBoards.put('4',new String[] {"g","h","i"});
        keyBoards.put('5',new String[] {"j","k","l"});
        keyBoards.put('6',new String[] {"m","n","o"});
        keyBoards.put('7',new String[] {"p","q","r","s"});
        keyBoards.put('8',new String[] {"t","u","v"});
        keyBoards.put('9',new String[] {"w","x","y","z"});
        keyBoards.put('0',new String[] {" "});
    }

    public static void main(String[] args) {
        System.out.println(printKeyBoard("#/22/2022#33#872233444/44"));
    }

    public static String printKeyBoard(String command) {
        if(command.length() == 0) {
            return "";
        }

        int mod = 0; // 输入模式: 0-数字 1-字符
        char[] cs = command.toCharArray();
        StringBuilder sb = new StringBuilder();
        for(int i=0;i<cs.length;i++) {
            if(cs[i] == '#') {
                mod = mod == 0 ? 1 : 0;
            } else if(mod == 1 && Character.isDigit(cs[i])){
                 // #2223/2
                 int num = 1;
                 for(int j=i;j<cs.length;j++) {
                     if(j+1<cs.length && cs[j] == cs[j+1]) {
                         num++;
                         i=j+1;
                     } else {
                         break;
                     }
                 }
                 String curStr = keyBoards.get(cs[i])[(num-1)%keyBoards.get(cs[i]).length];
                 sb.append(curStr);
            } else if(mod == 0 && Character.isDigit(cs[i])) {
                sb.append(cs[i]);
            }
        }

        return sb.toString();
    }
}

  */
