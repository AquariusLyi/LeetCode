/**
 二叉树中序遍历

根据给定的二叉树结构描述字符串，输出该二叉树按照中序遍历结果字符串。中序遍历顺序为：左子树，根结点，右子树。

输入描述

由大小写字母、左右大括号、逗号组成的字符串:字母代表一个节点值，左右括号内包含该节点的子节点。

左右子节点使用逗号分隔，逗号前为空则表示左子节点为空，没有逗号则表示右子节点为空。

二叉树节点数最大不超过100。

注:输入字符串格式是正确的，无需考虑格式错误的情况。

输出描述

输出一个字符串为二叉树中序遍历各节点值的拼接结果。

示例 1   输入输出示例仅供调试，后台判题数据一般不包含示例

输入

a{b{d,e{g,h{,I}}},c{f}}

输出

dbgehiafc
dbgehIafc
————————————————
版权声明：本文为CSDN博主「一曲華胥乱世成殤」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/qq_44380975/article/details/114198884
 */

function zxbl() {
  let line = readline().trim();
  let list = [];
  dfs(line, list);
  console.log(list.join(""));
}

function dfs(line, list) {
  if (line == null || line.length == 0) return;
  let nodes = getNode(line);
  dfs(nodes[1], list);
  list = list.concat(nodes[0]);
  dfs(nodes[2], list);
}

function getLeftRight(line) {
  if (line == null || line.length == 0) return [null, null];
  if (line.charAt(0) == ",") return [null, line.substring(1)];
  // b{d,e{g,h{,i}}},c{f}
  if (line.length == 1) return [line, null];
  let ans = [];
  if (line.charAt(1) == "{") {
    let opens = 1;
    let i = 2;
    for (; i < line.length; i++) {
      if (line.charAt(i) == "{") opens++;
      else if (line.charAt(i) == "}") opens--;
      if (opens == 0) break;
    }
    ans[0] = line.substring(0, i + 1);
    if (i + 1 == line.length) ans[1] = null;
    else ans[1] = line.substring(i + 2);
    return ans;
  }
  if (line.charAt(1) == ",") {
    ans[0] = line.substring(0, 1);
    ans[1] = line.substring(2);
    return ans;
  }
  return null;
}

function getNode(line) {
  if (line == null) return [null, null, null];
  if (!line.includes("{")) return [line, null, null];
  let indexOfOpen = line.indexOf("{");
  let indexOfClose = -1;
  let opens = 1;
  for (let i = indexOfOpen + 1; i < line.length; i++) {
    let c = line.charAt(i);
    if (c == "{") opens++;
    else if (c == "}") opens--;
    if (opens == 0) {
      indexOfClose = i;
      break;
    }
  }
  let ans = [];
  ans[0] = line.substring(0, indexOfOpen);
  let children = null;
  children = line.substring(indexOfOpen + 1, indexOfClose);
  let leftRight = getLeftRight(children);
  ans[1] = leftRight[0];
  ans[2] = leftRight[1];
  return ans;
}

// a{b{d,e{g,h{,I}}},c{f}}
// b{d,e{g,h{,I}}}
// e{g,h{,I}}
// h{,I}
// c{f}

// a{b{d,e{g,h{,I}}},c{f}}
// b{d,e{g,h{,I}}}
// e{g,h{,I}}
// h{,I}
// c{f}

// [a, b{d,e{g,h{,I}}}, c{f}]
// [b, d, e{g,h{,I}}]
// [e, g, h{,I}]
// [h, null, I]
// [c, f, null]

// [a, b{d,e{g,h{,I}}}, c{f}]
// [b, d, e{g,h{,I}}]
// [d, null, null]
// [e, g, h{,I}]
// [g, null, null]
// [h, null, I]
// [I, null, null]
// [c, f, null]
// [f, null, null]

// a,b{d,e{g,h{,I}}},c{f}
// b,d,e{g,h{,I}}
// d,,
// e,g,h{,I}
// g,,
// h,,I
// I,,
// c,f,
// f,,

/**
 作者：牛客741169438号
链接：https://www.nowcoder.com/discuss/732323
来源：牛客网

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        while (sc.hasNext()) {
            String line = sc.nextLine();
            StringBuilder sb = new StringBuilder();
            dfs(line, sb);
            System.out.println(new String(sb));
        }
    }

    private static void dfs(String line, StringBuilder sb) {
        if (line == null || line.length() == 0) return;
        String[] nodes = getNode(line);
        dfs(nodes[1], sb);
        sb.append(nodes[0]);
        dfs(nodes[2], sb);
    }

    private static String[] getLeftRight(String line) {
        if (line == null || line.length() == 0) return new String[]{null, null};
        if (line.charAt(0) == ',') return new String[]{null, line.substring(1)};
        // b{d,e{g,h{,i}}},c{f}
        if (line.length() == 1) return new String[]{line, null};
        String[] ans = new String[2];
        if (line.charAt(1) == '{') {
            int opens = 1;
            int i = 2;
            for (; i < line.length(); i++) {
                if (line.charAt(i) == '{') opens++;
                else if (line.charAt(i) == '}') opens--;
                if (opens == 0) break;
            }
            ans[0] = line.substring(0, i + 1);
            if (i + 1 == line.length()) ans[1] = null;
            else ans[1] = line.substring(i + 2);
            return ans;
        }
        if (line.charAt(1) == ',') {
            ans[0] = line.substring(0, 1);
            ans[1] = line.substring(2);
            return ans;
        }
        return null;

    }

    private static String[] getNode(String line) {
        if (line == null) return new String[]{null, null, null};
        if (!line.contains("{")) return new String[]{line, null, null};
        int indexOfOpen = line.indexOf("{");
        int indexOfClose = -1;
        int opens = 1;
        for (int i = indexOfOpen + 1; i < line.length(); i++) {
            char c = line.charAt(i);
            if (c == '{') opens++;
            else if (c == '}') opens--;
            if (opens == 0) {
                indexOfClose = i;
                break;
            }
        }
        String[] ans = new String[3];
        ans[0] = line.substring(0, indexOfOpen);
        String children = null;
        children = line.substring(indexOfOpen + 1, indexOfClose);
        System.out.println(line);
        String[] leftRight = getLeftRight(children);
        ans[1] = leftRight[0];
        ans[2] = leftRight[1];
        return ans;
    }
}
 */
