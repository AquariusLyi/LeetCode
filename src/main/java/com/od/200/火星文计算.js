/**

火星文计算

已知火星人使用的运算符为#、$，其与地球人的等价公式如下：
x#y = 2*x+3*y+4
x$y = 3*x+y+2
1、其中x、y是无符号整数
2、地球人公式按C语言规则计算
3、火星人公式中，$的优先级高于#，相同的运算符，按从左到右的顺序计算
现有一段火星人的字符串报文，请你来翻译并计算结果。

输入描述
火星人字符串表达式（结尾不带回车换行）
输入的字符串说明：字符串为仅由无符号整数和操作符（#、$）组成的计算表达式。
例如：123#4$5#67$78。
用例保证字符串中，操作数与操作符之间没有任何分隔符。
用例保证操作数取值范围为32位无符号整数。
保证输入以及计算结果不会出现整型溢出。
保证输入的字符串为合法的求值报文，例如：123#4$5#67$78
保证不会出现非法的求值报文，例如类似这样字符串：
#4$5 //缺少操作数
4$5# //缺少操作数
4#$5 //缺少操作数
4 $5 //有空格
3+4-5*6/7 //有其它操作符
12345678987654321$54321 //32位整数计算溢出

输出描述
根据输入的火星人字符串输出计算结果（结尾不带回车换行）。
示例1 输入输出示例仅供调试，后台判题数据一般不包含示例

输入
7#6$5#12

输出
226

说明

示例

7#6$5#12
=7#(3*6+5+2)#12
=7#25#12
=(2*7+3*25+4)#12
=93#12
=2*93+3*12+4
=226

 */

// # 运算符计算
var sharp = function (x, y) {
  return 2 * x + 3 * y + 4;
};
// $ 运算符计算
var dollar = function (x, y) {
  return 3 * x + y + 2;
};

function MartianCalculate() {
  let nums = readline().trim().split("#");
  let res = 0; // 记录结果
  // 计算 #
  for (let i = 1; i < nums.length; i++) {
    // 计算 $
    let pos = nums[i].indexOf("$");
    if (pos !== -1) {
      let tmps = nums[i].split("$").map((item) => parseInt(item));
      // $ 计算后将值放回
      nums[i] = dollar(tmps[0], tmps[1]);
    }
    res = sharp(parseInt(nums[i - 1]), parseInt(nums[i]));

    // # 计算后将值放回
    nums[i] = res;
  }
  // 输出结果
  console.log(res);
}

MartianCalculate();

/**
 java

 
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // x#y = 2*x+3*y+4  x$y = 3*x+y+2  $优先级高于#
        while (sc.hasNextLine()) {
            String input = sc.nextLine();
            System.out.print(func(input));
        }
        sc.close();

    }

    private static int func (String input) {
        //优先算最后
        int index = input.lastIndexOf("#");
        if (index!= -1) {
            String left = input.substring(0, index);
            String right = input.substring(index +1);
            int res = 2 * func(left) + 3 * func(right) + 4;
            return res;
        }
        // 优先算第一
        index = input.lastIndexOf("$");
        if (index != -1) {
            String left = input.substring(0, index);
            String right = input.substring(index +1);
            int res = 3 * func(left) + func(right) + 2;
            return res;
        }
        return Integer.parseInt(input);

    }
}
 */
