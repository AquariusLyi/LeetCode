/**
 数大雁

 一群大雁往南飞，给定一个字符串记录地面上的游客听到的大雁叫声，请给出叫声最少由几只大雁发出。

具体的:

1.大雁发出的完整叫声为"quack"，因为有多只大雁同一时间嘎嘎作响，所以字符串中可能会混合多个"quack"。

2.大雁会依次完整发出"quack"，即字符串中’q’ ,‘u’, ‘a’, ‘c’, ‘k’ 这5个字母按顺序完整存在才能计数为一只大雁。如果不完整或者没有按顺序则不予计数。

3.如果字符串不是由’q’, ‘u’, ‘a’, ‘c’, ‘k’ 字符组合而成，或者没有找到一只大雁，请返回-1。

输入描述

一个字符串，包含大雁quack的叫声。1 <= 字符串长度 <= 1000，字符串中的字符只有’q’, ‘u’, ‘a’, ‘c’, ‘k’

输出描述

大雁的数量

示例：

输入：quackquack

输出：1

作者：航游四海
链接：https://leetcode.cn/circle/discuss/zwAzaL/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
 */
/**
字母c,r,o,a,k的个数是相等且等于青蛙的最大数目：字符串长度 / 5。
思路：
1、遍历字符串，减去对应字母的个数；异常返回-1。
2、遍历到k时表示有青蛙呱呱完毕，空闲青蛙+1。
3、遍历c时只要有空闲的青蛙，就表示这只青蛙可以用空闲青蛙，最大青蛙数-1。
4、最终最大青蛙数就是所需青蛙最少数目

作者：hyy-13
链接：https://leetcode.cn/problems/minimum-number-of-frogs-croaking/solution/rong-yi-li-jie-by-hyy-13/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
 */
function getQuackNum(str) {
  const split = str.trim().split("");
  let len = split.length;
  if (len % 5 != 0) {
    console.log(-1);
    return -1;
  }
  if (split[0] !== "q" || split[split.length - 1] !== "k") {
    return -1;
  }
  let quackCount = 0;
  let qCount = 0;
  let uCount = 0;
  let aCount = 0;
  let cCount = 0;
  let kCount = 0;
  for (let i = 0; i < split.length; i++) {
    const ele = split[i];
    if (ele == "q") qCount++;
    if (ele == "u") uCount++;
    if (ele == "a") aCount++;
    if (ele == "c") cCount++;
    if (ele == "k") kCount++;
    quackCount = Math.max(qCount, quackCount);
    if (
      qCount < uCount ||
      uCount < aCount ||
      aCount < cCount ||
      cCount < kCount
    ) {
      console.log(-1);
      return -1;
    }
    if (kCount === 1) {
      qCount--;
      uCount--;
      aCount--;
      cCount--;
      kCount--;
    }
  }
  if (qCount + uCount + aCount + cCount + kCount > 0) return -1;
  console.log(quackCount);
  return quackCount;
}
getQuackNum("quackquack");
