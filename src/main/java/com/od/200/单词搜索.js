/**
 【编程题目 |200分】 单词搜索【2021 H2, 2022 Q1,Q2 考试题】

【单词搜索】

找到它是一个小游戏，你需要在一个矩阵中找到给定的单词。

假设给定单词 HELLOWORD，在矩阵中只要能找到 H->E->L->L->O->W->O->R->L->D连成的单词，就算通过。

注意区分英文字母大小写，并且您只能上下左右行走，不能走回头路。

输入描述

输入第 1 行包含两个整数 n、m (0 < n,m < 21) 分别表示 n 行 m 列的矩阵，

第 2 行是长度不超过100的单词 W (在整个矩阵中给定单词 W 只会出现一次)，

从第 3 行到第 n+2 行是指包含大小写英文字母的长度为 m 的字符串矩阵。

输出描述

如果能在矩阵中连成给定的单词，则输出给定单词首字母在矩阵中的位置(第几行 第几列)，

否则输出“NO”。

示例  输入输出示例仅供调试，后台判题数据一般不包含示例

输入
5 5
HELLOWORLD
CPUCY
EKLQH
CHELL
LROWO
DGRBC

输出
3 2

 */

function serchWord() {
  let [n, m] = readline().trim().split(/\s+/).map(Number);
  let str = readline().trim();
  let arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(readline().trim());
  }

  function locFun(loc) {
    let up = [loc[0] - 1, loc[1]];
    let right = [loc[0], loc[1] + 1];
    let down = [loc[0] + 1, loc[1]];
    let left = [loc[0], loc[1] - 1];
    let arr = [];
    for (let item of [up, right, down, left]) {
      if (
        0 <= item[0] &&
        item[0] <= n - 1 &&
        0 <= item[1] &&
        item[1] <= m - 1
      ) {
        arr.push(item);
      }
    }
    return arr;
  }

  function searchFun(start, idx, temp, result) {
    if (idx > str.length - 2) {
      result.push(temp.slice(0));
      return;
    }
    for (let item of locFun(start)) {
      if (
        item != start &&
        !temp.includes(item) &&
        arr[item[0]][item[1]] == str[idx + 1]
      ) {
        temp.push(item);
        searchFun(item, idx + 1, temp, result);
        temp.pop();
      }
    }
  }
  let temp = [];
  let result = [];

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (arr[i][j] == str[0]) {
        temp.push([i, j]);
        searchFun([i, j], 0, temp, result);
        if (result.length) {
          return [i + 1, j + 1];
        }
      }
    }
  }
}
console.log(serchWord());

/**
 python
 
 def WordSearch():
    n, m = tuple([int(x) for x in input().strip().split(" ")])
    s = input().strip()
    arr = []
    for i in range(n):
        arr.append(input().strip())

    def loc_surroundings(loc):
        loc_up = (loc[0] - 1, loc[1])
        loc_right = (loc[0], loc[1] + 1)
        loc_below = (loc[0] + 1, loc[1])
        loc_left = (loc[0], loc[1] - 1)
        surroundings = []
        for location in [loc_up, loc_right, loc_below, loc_left]:
            if 0 <= location[0] <= n - 1 and 0 <= location[1] <= m - 1:
                surroundings.append(location)
        return surroundings

    def search_path(start_loc, s_index, tmp_result, result):
        if s_index > len(s) - 2:
            result.append(tmp_result[:])
            return
        for surround_loc in loc_surroundings(start_loc):
            if surround_loc != start_loc and surround_loc not in tmp_result and \
                    arr[surround_loc[0]][surround_loc[1]] == s[s_index + 1]:
                tmp_result.append(surround_loc)
                search_path(surround_loc, s_index + 1, tmp_result, result)
                tmp_result.pop()

    tmp_result, result = [], []
    for i in range(m):
        for j in range(n):
            if arr[i][j] == s[0]:
                tmp_result.append((i, j))
                search_path((i, j), 0, tmp_result, result)
                if result:
                    return i + 1, j + 1


if __name__ == "__main__":
    print(WordSearch())
 */
