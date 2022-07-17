/**
 完全二叉树非叶子部分后序遍历
给定一个以顺序储存结构存储整数值的完全二叉树序列（最多1000个整数），请找出此完全二叉树的所有非叶子节点部分，然后采用后序遍历方式将此部分树（不包含叶子）输出。
1、只有一个节点的树，此节点认定为根节点（非叶子）。
2、此完全二叉树并非满二叉树，可能存在倒数第二层出现叶子或者无右叶子的情况

其他说明：二叉树的后序遍历是基于根来说的，遍历顺序为：左-右-根

输入描述:
一个通过空格分割的整数序列字符串
输出描述:
非叶子部分树结构

示例1
输入
1 2 3 4 5 6 7
输出
2 3 1
说明
找到非叶子部分树结构，然后采用后续遍历输出
备注:
输出数字以空格分隔

*/

class TreeNode {
  constructor(val, left, right) {
    this.val = val;
    this.left = left;
    this.right = right;
    this.degree = null;
  }
}

main();
function main() {
  let nodes = [];
  let arr = readline().trim().split(/\s+/).map(Number);
  buildTree(nodes, arr);
  //检查叶子节点
  for (let i = 0; i < nodes.length; i++) {
    let degree = 0;
    if (nodes[i].left != null) {
      degree++;
    }
    if (nodes[i].right != null) {
      degree++;
    }
    nodes[i].degree = degree;
  }
  let list = [];
  afterPrint(nodes[1], list);
  console.log(list);
}

function buildTree(nodes, arr) {
  nodes.push(new TreeNode(0, null, null));
  //先将所有的节点放到数组中
  for (let i = 1; i < arr.length; i++) {
    nodes.push(new TreeNode(arr[i], null, null));
  }
  for (let i = 1; i < nodes.length; i++) {
    if (2 * i < nodes.length) {
      nodes[i].left = nodes[2 * i];
    }
    if (2 * i + 1 < nodes.length) {
      nodes[i].right = nodes[2 * i + 1];
    }
  }
}

function print(node, list) {
  //只输出非叶子节点
  if (node.degree != 0) {
    // console.log(node.val);
    list.push(node.val);
  }
}

//后续遍历 左-右-根[根输出]
function afterPrint(node, list) {
  if (node.left != null) {
    afterPrint(node.left, list);
  }
  if (node.right != null) {
    afterPrint(node.right, list);
  }
  print(node, list);
}

//前序遍历 根[根输出] 左 右
function prePrint(node, list) {
  print(node, list);
  if (node.left != null) {
    prePrint(node.left, list);
  }
  if (node.right != null) {
    prePrint(node.right, list);
  }
}

//中序遍历  左 根[根输出] 右
function middlePrint(node, list) {
  if (node.left != null) {
    middlePrint(node.left, list);
  }
  print(node, list);
  if (node.right != null) {
    middlePrint(node.right, list);
  }
}

/**
 * 1. 构建二叉树
 * 2. 剔除叶子节点
 * 3. 后序遍历
 * <p>
 * 1 2 3 4 5 6 7 8 9 10 11 12
 */

/**
 * 
 
// 数组实现二叉树

import java.util.*;

public class postTravel_Array {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        String[] str = in.nextLine().split(" ");
        List<Integer> res = new ArrayList<>();
        for (String s : str) {
            res.add(Integer.parseInt(s));
        }
        List<Integer> index = new ArrayList<>();
        dfs(res, 0, index);
        res.removeAll(index);  // 需要注意删除对应索引数据的问题
        List<String> ans = new ArrayList<>();
        postTravel(res, 0, ans);  // 递归后序遍历
        System.out.print(String.join(" ", ans));

    }
    private static void dfs(List<Integer> res, int idx, List<Integer> index) {  // 返回叶子节点对应索引
        if (idx >= res.size()) {
            return;
        }
        if (isLeaf(res, idx)) {
            index.add(res.get(idx));
        } else {
            dfs(res, 2 * idx + 1, index);  // 递归左叶子节点
            dfs(res, 2 * idx + 2, index);  // 递归右叶子节点
        }
    }
    private static boolean isLeaf(List<Integer> res, int idx) {  // 判断是否是叶子节点
        return ((2 * idx + 1 >= res.size() ) && (2 * idx + 2 >= res.size()));
    }
    private static void postTravel(List<Integer> res, int idx, List<String> p) { // 递归后序遍历
        if (idx >= res.size()) {
            return;
        }
        postTravel(res, 2 * idx + 1, p);
        postTravel(res, 2 * idx + 2, p);
        p.add(String.valueOf(res.get(idx)));
    }
}



// 解法二
 import java.util.*;

public class Main {

    static class Node {
        private int val;
        private Node left;
        private Node right;

        public Node() {
        }

        public Node(int val) {
            this.val = val;
        }

        public Node(int val, Node left, Node right) {
            this.val = val;
            this.left = left;
            this.right = right;
        }
    }

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        String[] ss = in.nextLine().split(" ");
        for (String s : ss) {
            queue.add(Integer.parseInt(s));
        }

        Node root = build();
        remove(root);

        List<String> p = new ArrayList<>();
        print(root, p);

        System.out.println(String.join(" ", p));
    }

    private static Queue<Integer> queue = new ArrayDeque<>();
    private static Queue<Node> nodes = new ArrayDeque<>();

    public static Node build() {
        Node root = new Node(queue.poll());
        nodes.add(root);

        while (!nodes.isEmpty()) {
            Node top = nodes.poll();

            if (!queue.isEmpty()) {
                Node left = new Node(queue.poll());
                top.left = left;
                nodes.add(left);
            } else {
                break;
            }

            if (!queue.isEmpty()) {
                Node right = new Node(queue.poll());
                top.right = right;
                nodes.add(right);
            } else {
                break;
            }
        }
        return root;
    }


    public static Node remove(Node root) {
        if (root == null) {
            return null;
        }
        if (root.left == null && root.right == null) {
            return null;
        }

        root.left = remove(root.left);
        root.right = remove(root.right);

        return root;
    }

    public static void print(Node root, List<String> p) {
        if (root == null) {
            return;
        }

        print(root.left, p);
        print(root.right, p);
        p.add(String.valueOf(root.val));
    }
}
 */
