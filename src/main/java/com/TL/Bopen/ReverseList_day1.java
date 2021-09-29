package com.TL.Bopen;

/**
 * B站算法公开课练习题：https://www.bilibili.com/video/BV1Jv411A7Ty?p=2&spm_id_from=pageDriver
 *
 * LeetCode206题：反转一个单链表。
 * 输入: 1->2->3->4->5 输出: 5->4->3->2->1
 *
 * 解法1：迭代，重复某一过程，每一次处理结果作为下一次处理的初始值，这些初始值类似于状态、每
 * 次处理都会改变状态、直至到达最终状态
 *
 * 解法2：递归：以相似的方法重复，类似于树结构，先从根节点找到叶子节点，从叶子节点开始遍历
 * 大的问题(整个链表反转)拆成性质相同的小问题(两个元素反转)curr.next.next = curr
 * 将所有的小问题解决，大问题即解决、
 *
 *
 */
public class ReverseList_day1 {
    static class ListNode {
        int val;

        ListNode next;

        public ListNode(int val, ListNode next) {
            this.val = val;
            this.next = next;
        }
    }
    public static void main(String[] args) {
        ListNode node5 = new ListNode(5, null);
        ListNode node4 = new ListNode(4, node5);
        ListNode node3 = new ListNode(3, node4);
        ListNode node2 = new ListNode(2, node3);
        ListNode node1 = new ListNode(1, node2);
        //ListNode node = iterate(node1);
        ListNode node_1 = recursion(node1); System.out.println(node_1);
    }

    /**
     * https://leetcode-cn.com/problems/reverse-linked-list/solution/shi-pin-jiang-jie-die-dai-he-di-gui-hen-hswxy/
     * 视频讲解反转
     */

    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }

    /**
     * TL 解法1 迭代
     */
    public static ListNode iterate(ListNode head) {
        ListNode prev = null, curr, next;
        curr = head;
        while (curr != null) {
            next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }

    /**
     * TL 解法2 递归
     */
    public static ListNode recursion(ListNode head) {
        if (head == null || head.next == null) {
            return head;
        }
        ListNode newHead = recursion(head.next);
        head.next.next = head;
        head.next = null;
        return newHead;
    }

    /**
     * 啊这～ 按照题目测试只要值颠倒就行啊，击败100%、95.95%
     * 评论里面
     */
    public ListNode reverseList03(ListNode head) {
        ListNode ans = null;
        for (ListNode x = head; x != null; x = x.next) {
            ans = new ListNode(x.val,ans);
        }
        return ans;
    }



}