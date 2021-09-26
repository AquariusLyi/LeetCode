package com.TL.Bopen;

/**
 * B站算法公开课练习题：https://www.bilibili.com/video/BV1Jv411A7Ty?p=2&spm_id_from=pageDriver
 *
 * 反转一个单链表。
 * 输入: 1->2->3->4->5 输出: 5->4->3->2->1
 *
 * 解法1：迭代，重复某一过程，每一次处理结果作为下一次处理的初始值，这些初始值类似于状态、每
 * 次处理都会改变状态、直至到达最终状态
 *
 * 解法2：递归：以相似的方法重复，类似于树结构，先从根节点找到叶子节点，从叶子节点开始遍历
 * 大的问题(整个链表反转)拆成性质相同的小问题(两个元素反转)curr.next.next = curr
 * 将所有的小问题解决，大问题即解决
 */
public class ReverseList {
    static class ListNode {
        int val;

        ListNode next;

        public ListNode(int val, ListNode next) {
            this.val = val;
            this.next = next;
        }
    }

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

    public static ListNode recursion(ListNode head) {
        if (head == null || head.next == null) {
            return head;
        }
        ListNode newHead = recursion(head.next);
        head.next.next = head;
        head.next = null;
        return newHead;
    }

    public static void main(String[] args) {
        ListNode node5 = new ListNode(5, null);
        ListNode node4 = new ListNode(4, node5);
        ListNode node3 = new ListNode(3, node4);
        ListNode node2 = new ListNode(2, node3);
        ListNode node1 = new ListNode(1, node2);
        //ListNode node = iterate(node1);
        ListNode node_1 = recursion(node1); System.out.println(node_1); } }