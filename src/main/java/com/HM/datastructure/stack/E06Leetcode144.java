package com.HM.datastructure.stack;


import com.HM.datastructure.binarytree.TreeNode;

import java.util.List;

/**
 * 二叉树前序遍历(父,左,右)
 */
public class E06Leetcode144 {
    public List<Integer> preorderTraversal(TreeNode root) {
        return null;
    }

    public static void main(String[] args) {
//        TreeNode root = new TreeNode(
//                new TreeNode(
//                        2
//                ),
//                1,
//                new TreeNode(
//                        3
//                )
//        );
        TreeNode root = new TreeNode(
                new TreeNode(null, 2, new TreeNode(4)),
                1,
                new TreeNode(new TreeNode(5), 3, new TreeNode(6))
        );

        /*
                  1
                 / \
                2   3

                1 2 3

                第一次循环, curr=1     栈 [] -> [1]           处理1, 下次处理1左
                第二次循环, curr=2     栈 [1] -> [2,1]        处理2, 下次处理2左
                第三次循环, curr=null  栈 [2,1] -> [1]  pop=2 2左完成, 处理2右
                第四次循环, curr=null  栈 [1] -> []     pop=1 2右完成, 处理1右
                第五次循环, curr=3     栈 [] -> [3]           处理3, 下次处理3左
                第六次循环, curr=null  栈 [3] -> []     pop=3 3左完成, 处理3右
                第七次循环, curr=null  栈 [], 退出
         */

        LinkedListStack<TreeNode> stack = new LinkedListStack<>();
        TreeNode curr = root;

        while (!stack.isEmpty() || curr != null) {
            System.out.println("stack:" + stack + " curr:" + curr);
            if (curr != null) {
                stack.push(curr);
                System.out.println(curr);
                curr = curr.left;
            } else {
                TreeNode pop = stack.pop();
                curr = pop.right;
            }

        }
    }
}
