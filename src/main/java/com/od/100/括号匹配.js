/**
 给定一个字符串，里边可能包含“()”、“[]”、“{}”三种括号，请编写程序检查该字符串中的括号是否成对出现，且嵌套关系正确。
若括号成对出现且嵌套关系正确，或该字符串中无括号字符，输出：true；
若未正确使用括号字符，输出：false。
实现时，无需考虑非法输入。

输入描述：

输入为：

字符串例子：

(1+2)/(0.5+1)

输出描述：

输出为：

字符串例子：

true
 */

function isTrueOrFalse(args) {
  const input = args.trim();
  const stack = [];
  let count = 0;
  let bool = false;
  if (input.includes("(") && input.includes(")")) {
    for (let i = 0; i < input.length; i++) {
      const ele = input[i];
      if (ele == "(") {
        stack.push("(");
      } else if (ele == ")") {
        if (stack.length && stack.pop() == "(") {
          count++;
        } else {
          count = 0;
          bool = false;
          break;
        }
      }
    }
  } else {
    bool = false;
    console.log(bool);
    return;
  }
  console.log(count);
  if (stack.length == 0 && count > 0) {
    bool = true;
  } else {
    bool = false;
  }
  console.log(stack);
  console.log(bool);
}

isTrueOrFalse("(1+2)/(0.5+1))");
