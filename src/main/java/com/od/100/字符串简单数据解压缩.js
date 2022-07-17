/**
字符串简单数据解压缩


将一段压缩后的字符串解压缩，并且排序输出。

解压规则：

每个字符串后面跟随一个数字，表示这个字符串的重复次数。例如，“a5”解压缩的结果为“aaaaa”；“abc3”解压缩后的结果为“abcabcabc”。

排序规则：

1、根据每个字符串的重复次数升序排序，然后输出结果。例如，“a3b2”，输出的结果为“bbaaa”。
2、如果字符重复次数一样，则根据 ASCII 编码顺序做升序排序，然后输出结果。例如，“b2a2”，输出的结果为“aabb”

输入描述：

输入的原始字符串仅包含字母和数字

输出描述：

输出的结果字符串仅包含字母

示例 1  输入输出示例仅供调试，后台判题数据一般不包含示例

输入

a11b2bac3bad3abcd2

输出

abcdabcdbbbacbacbacbadbadbadaaaaaaaaaaa

// 错误答案 bbabcdabcdbacbacbacbadbadbadaaaaaaaaaaa

 */

function getNewResult(args) {
  const res = args.match(/[a-z]+\d+/g);
  //   ['a11', 'b2', 'bac3', 'bad3', 'abcd2']
  let output = "";
  const result = [];
  if (res && res.length) {
    for (let i = 0; i < res.length; i++) {
      const ele = res[i].match(/([a-z]+|\d+)/g);
      if (ele) {
        const letter = ele[0];
        const num = ele[1];
        result.push({
          letter: letter.repeat(num), // letter,
          num: num,
        });
      }
    }
  }
  result.sort((a, b) => {
    if (a.num != b.num) {
      return a.num - b.num;
    } else {
      return a.letter.localeCompare(b.letter);
    }
  });
  console.log(result);
  result.forEach((item) => {
    output += item.letter;
  });
  console.log(output);
}
getNewResult("a11b2bac3bad3abcd2");
// getNewResult("a11b2bac3bad3abcd2cc4aa4");

// abcdabcdbbbacbacbacbadbadbadaaaaaaaaaaa
// abcdabcdbbbacbacbacbadbadbadaaaaaaaaccccccccaaaaaaaaaaa
