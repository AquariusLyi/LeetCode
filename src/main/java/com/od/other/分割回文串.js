/**
 题目：
给你一个字符串 s，请你将 s 分割成一些子串，使每个子串都是回文串 。返回 s 所有可能的分割方案。

回文串 是正着读和反着读都一样的字符串。

示例 1：

输入：s = "aab"
输出：[["a","a","b"],["aa","b"]]
示例 2：

输入：s = "a"
输出：[["a"]]

提示：

1 <= s.length <= 16
s 仅由小写英文字母组成。

解题思路：
1.题目要求返回所有的分割方案，因此可以使用回溯穷举所有的可能结果，放入到结果集当中。

2.判断是否是回文串，就是判断首字符和尾字符是否相同，然后在判断首字符的下一个和伪字符的下一个是否相同，以此类推。因此不难想到封装一个函数，函数使用首尾双指针的方法进行判断是否是回文串，如果不是回文串就返回false，否则返回true。

3.递归的终止条件就是，当startIndex>=s.length时递归终止，这里为什么需要startIndex呢？

因为题目要求返回的是所有可能分割方案，这道题属于组合问题，["a","a","b"]和["b","a","a"]本质上是同一个结果，所以是组合问题，组合问题则需要startIndex。

4.当我们判断这个字符串是回文串后，我们就需要使用substr或者是substring来截取这部分的字符。
————————————————
版权声明：本文为CSDN博主「G1useppE」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/G1useppE/article/details/124872856
 */

var partition = function (s) {
  let res = [],
    path = [];
  backTracking(0);
  return res;

  function backTracking(startIndex) {
    if (startIndex >= s.length) {
      res.push(Array.from(path));
      return;
    }
    for (let i = startIndex; i < s.length; i++) {
      if (isPalindrome(s, startIndex, i)) {
        let str = s.substring(startIndex, i + 1);
        path.push(str);
      } else {
        continue;
      }
      backTracking(i + 1);
      path.pop();
    }
  }
};

function isPalindrome(s, start, end) {
  for (let i = start, j = end; i < j; i++, j--) {
    if (s[i] != s[j]) {
      return false;
    }
  }
  return true;
}
console.log(partition("aab"));
