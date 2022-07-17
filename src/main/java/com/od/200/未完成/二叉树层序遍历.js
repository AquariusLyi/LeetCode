/**
 【编程题目 |200分】二叉树层序遍历【2022 Q2考试题】

二叉树层序遍历

■ 题目描述

有一棵二叉树，每个节点由一个大写字母标识(最多26个节点）。

现有两组字母，分别表示后序遍历（左孩子->右孩子->父节点）和中序遍历（左孩子->父节点->右孩子）的结果，请你输出层序遍历的结果。

输入

每个输入文件一行，第一个字符串表示后序遍历结果，第二个字符串表示中序遍历结果。（每串只包含大写字母）

中间用单空格分隔。

输出

输出仅一行，表示层序遍历的结果，结尾换行。

示例1   输入输出示例仅供调试，后台判题数据一般不包含示例

输入

CBEFDA CBAEDF

输出

ABDCEF
 */
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.LinkedList;
import java.util.Queue;

public class LevelTraversal {
    public static void main(String[] args) throws IOException {

        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        String s;
        while ((s = br.readLine()) != null) {
            String[] str = s.split(" ");
            Node node = createTree(str[0], str[1]);
            Queue<Node> queue = new LinkedList<>();
            queue.offer(node);
            StringBuilder sb = new StringBuilder();
            while (!queue.isEmpty()) {
                Node head = queue.poll();
                sb.append(head.ch);
                if (head.left != null) {
                    queue.offer(head.left);
                }
                if (head.right != null) {
                    queue.offer(head.right);
                }
            }
            System.out.println(sb);
        }
    }

    public static Node createTree(String a, String b) {
        if (a == null) {
            return null;
        }
        char ch = a.charAt(a.length() - 1);
        Node root = new Node(ch);
        int i = 0;
        while (b.charAt(i) != ch) {
            i++;
        }
        if (i > 0) {
            root.left = createTree(a.substring(0, i), b.substring(0, i));
        } else {
            root.left = null;
        }
        if (b.length() - 1 - i > 0) {
            root.right = createTree(a.substring(i, a.length() - 1), b.substring(i + 1));
        } else {
            root.right = null;
        }
        return root;
    }

    static class Node {
        char ch;
        Node left;
        Node right;

        Node(char ch) {
            this.ch = ch;
        }
    }
}

/**
 java

 import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.LinkedList;
import java.util.Queue;

public class LevelTraversal {
    public static void main(String[] args) throws IOException {

        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        String s;
        while ((s = br.readLine()) != null) {
            String[] str = s.split(" ");
            Node node = createTree(str[0], str[1]);
            Queue<Node> queue = new LinkedList<>();
            queue.offer(node);
            StringBuilder sb = new StringBuilder();
            while (!queue.isEmpty()) {
                Node head = queue.poll();
                sb.append(head.ch);
                if (head.left != null) {
                    queue.offer(head.left);
                }
                if (head.right != null) {
                    queue.offer(head.right);
                }
            }
            System.out.println(sb);
        }
    }

    public static Node createTree(String a, String b) {
        if (a == null) {
            return null;
        }
        char ch = a.charAt(a.length() - 1);
        Node root = new Node(ch);
        int i = 0;
        while (b.charAt(i) != ch) {
            i++;
        }
        if (i > 0) {
            root.left = createTree(a.substring(0, i), b.substring(0, i));
        } else {
            root.left = null;
        }
        if (b.length() - 1 - i > 0) {
            root.right = createTree(a.substring(i, a.length() - 1), b.substring(i + 1));
        } else {
            root.right = null;
        }
        return root;
    }

    static class Node {
        char ch;
        Node left;
        Node right;

        Node(char ch) {
            this.ch = ch;
        }
    }
}
 */
