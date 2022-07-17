/**
 * 
表达式括号匹配


(1+(2+3)*(3+(8+0))+1-2)这是一个简单的数学表达式,今天不是计算它的值,而是比较它的括号匹配是否正确。

前面这个式子可以简化为(()(()))这样的括号我们认为它是匹配正确的,

而((())这样的我们就说他是错误的。注意括号里面的表达式可能是错的,也可能有多个空格，对于这些我们是不用去管的，

我们只关心括号是否使用正确。

输入

给出一行表达式(长度不超过 100)。

输出

如果匹配正确输出括号的对数，否则输出-1。

样例

示例 1  输入输出示例仅供调试，后台判题数据一般不包含示例

输入

(1+(2+3)*(3+(8+0))+1-2)

输出

4
 */

function isRightKuoHao(arg) {
  let leftCSum = 0;
  let rightCSum = 0;
  let input = arg.trim();
  for (let i = 0; i < input.length; i++) {
    const ele = input[i];
    if (ele == "(") {
      leftCSum++;
    }
    if (ele == ")") {
      rightCSum++;
    }
  }
  if (leftCSum == rightCSum) {
    // console.log(leftCSum || rightCSum);
    return leftCSum || rightCSum;
  } else {
    console.log(-1);
    return -1;
  }
}
console.log(isRightKuoHao("(1+(2+3)*(3+(8+0))+1-2)"));
console.log(isRightKuoHao("(1+(2+3)*(3+(8+0))+(1-2))"));

//  采用栈的数据结构处理

function isRightKH(args) {
  let input = args.trim();
  let count = 0;
  let stack = [];
  for (let i = 0; i < input.length; i++) {
    const ele = input[i];
    if (ele == "(") {
      stack.push(ele);
    } else if (ele == ")") {
      // 栈的先进后出 压栈处理
      if (stack.length && stack.pop() == "(") {
        count++;
        // console.log(count, "===");
      } else {
        count = -1;
        break;
      }
    }
  }
  if (stack.length) {
    count = -1;
  }
  console.log(count);
}
isRightKH("(1+(2+3)*(3+(8+0))+(1-2))");
