/**
5键键盘的输出
有一个特殊的5键键盘，上面有a，ctrl-c，ctrl-x，ctrl-v，ctrl-a五个键。a键在屏幕上输出一个字母a；ctrl-c将当前选择的字母复制到剪贴板；ctrl-x将当前选择的字母复制到剪贴板，并清空选择的字母；ctrl-v将当前剪贴板里的字母输出到屏幕；ctrl-a选择当前屏幕上的所有字母。注意：
1 剪贴板初始为空，新的内容被复制到剪贴板时会覆盖原来的内容
2 当屏幕上没有字母时，ctrl-a无效
3 当没有选择字母时，ctrl-c和ctrl-x无效
4 当有字母被选择时，a和ctrl-v这两个有输出功能的键会先清空选择的字母，再进行输出

给定一系列键盘输入，输出最终屏幕上字母的数量。

输入描述:
输入为一行，为简化解析，用数字1 2 3 4 5代表a，ctrl-c，ctrl-x，ctrl-v，ctrl-a五个键的输入，数字用空格分隔
输出描述:
输出一个数字，为最终屏幕上字母的数量

示例1：
输入
1 1 1
输出
3
说明
连续键入3个a，故屏幕上字母的长度为3

示例2：
输入
1 1 5 1 5 2 4 4
输出
2
说明
输入两个a后ctrl-a选择这两个a，再输入a时选择的两个a先被清空，所以此时屏幕只有一个a，后续的ctrl-a，ctrl-c选择并复制了这一个a，最后两个ctrl-v在屏幕上输出两个a，故屏幕上字母的长度为2（第一个ctrl-v清空了屏幕上的那个a）

 */
function getAllNums(str) {
  let nums = str.trim().split(/\s+/g).map(Number);
  let len = nums.length;
  let count = 0;
  let copyCount = 0;
  let selCount = 0;
  for (let i = 0; i < len; i++) {
    const op = nums[i];
    if (op == "1") {
      //a
      count = selCount > 0 ? 1 : count + 1;
      selCount = 0;
    } else if (op == "2") {
      //复制
      copyCount = selCount;
    } else if (op == "3") {
      //剪切
      count -= selCount;
      copyCount = selCount;
      selCount = 0;
    } else if (op == "4") {
      //粘贴
      count -= selCount;
      selCount = 0;
      count += copyCount;
    } else if (op == "5") {
      //全选
      selCount = count;
    }
  }
  console.log(count);
}
getAllNums("1 1 1");
getAllNums("1 1 5 1 5 2 4 4");

/**
 java

public class Main{
 
    public static void main(String[] args) {
 
        Scanner sc = new Scanner(System.in);
 
        String[] s = sc.nextLine().split(" ");
 
        String temp = "";//剪贴板
        String screen = "";//屏幕
        String select = "";//选择的
 
        for(int i=0;i<s.length;i++){
 
            switch (s[i]){
                case "1":
                    if(select!=""){
                        screen = "a";
                        select = "";
                    }else {
                        screen+="a";
                    }
                    break;
                case "2":
                    if(select!=""){
                        temp = select;
                    }
                    break;
                case "3":
                    if(select!=""){
                        temp = select;
                        screen = "";
                        select = "";
                    }
                    break;
                case "4":
                    if(select!=""){
                        screen = temp;
                        select = "";
                    }else {
                        screen+=temp;
                    }
                    break;
                case "5":
                    if(screen!=""){
                        select = screen;
                    }
                    break;
            }
        }
        System.out.println(screen.length());
    }
}

// 解法二

import java.util.Scanner;

public class Main{

  public static void main(String[] args) {
    Scanner in = new Scanner(System.in);
    String ops = in.nextLine();
    in.close();
    String[] list = ops.split(" ");

    StringBuilder builder = new StringBuilder();

    String choose = "";
    String tab = "";

    for (String op : list) {
      switch (op) {
        case "1":
          choose = reset(builder, choose);
          builder.append('A');
          break;
        case "2":
          if (!choose.isEmpty()) {
            tab = choose;
          }
          break;
        case "3":
          if (!choose.isEmpty()) {
            tab = choose;
            choose = "";
            builder = new StringBuilder();
          }
          break;
        case "4":
          choose = reset(builder, choose);
          builder.append(tab);
          break;
        case "5":
          if (builder.length() != 0) {
            choose = builder.toString();
          }
          break;
        default:
          break;
      }

      System.out.println(builder);
      System.out.println(builder.length());
    }

    System.out.println(builder.length());
  }

  private static String reset(StringBuilder builder, String choose) {
    if (!choose.isEmpty()) {
      builder.replace(0, choose.length(), "");
      choose = "";
    }
    return choose;
  }
}

 */
