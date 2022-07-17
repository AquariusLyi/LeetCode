/**
 输出单向链表中倒数第k个结点
 

题目描述
输入一个单向链表，输出该链表中倒数第k个结点，链表的倒数第1个结点为链表的尾指针。
链表结点定义如下：

struct ListNode
{
    int m_nKey;
    ListNode* m_pNext;
};

正常返回倒数第k个结点指针，异常返回空指针.

要求：
(1)正序构建链表;
(2)构建后要忘记链表长度。

输入描述：
输入说明
1 输入链表结点个数
2 输入链表的值
3 输入k的值

输出描述：
输出一个整数

示例1

输入：

8
1 2 3 4 5 6 7 8
4

输出：

5


思路分析
主要通过这道题学习一下OJ模式下链表的处理，怎么定义链表生成链表。

参考代码




 */

/**
 java
 顺序查找


import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        while (in.hasNext()) {
            int n = Integer.parseInt(in.next());
            ListNode head = new ListNode(-1);
            ListNode temp = head;
          //生成链表
            for (int i = 0; i < n; i++) {
                ListNode node = new ListNode(in.nextInt());
                temp.next = node;
                temp = temp.next;
            }
            int k = Integer.parseInt(in.next());
            if(getKthFromEnd(head.next,k) != null){
                System.out.println(getKthFromEnd(head.next,k).val);
            }
            else{
                System.out.println(0);
            }
            
        }
    }
    public static ListNode getKthFromEnd(ListNode head, int k) {
        int n = 0;
        ListNode node = null;
      //记录有多少节点
        for (node = head; node != null; node = node.next) {
            n++;
        }
      //找倒数第k个
        for (node = head; n > k; n--) {
            node = node.next;
        }

        return node;
    }
}

class ListNode {
    ListNode next;
    int val;
    ListNode(int val) {
        this.val = val;
        next = null;
    }
}



// 2.插入采用尾插法，记录尾指针，采用快慢指针实现查询效率为n的方法。
import java.util.*;
public class Main{
    public static class ListNode{
        int val;
        ListNode next;
        ListNode(int val){
            this.val = val;
        }
    }
    public static void main(String[] args){
        Scanner in = new Scanner(System.in);
        while(in.hasNext()){
            int n = in.nextInt();
            ListNode head = new ListNode(in.nextInt());
            ListNode rear = head;
            for(int i = 1; i < n;i++){
                ListNode listNode = new ListNode(in.nextInt());
                rear.next = listNode;
                rear = rear.next;
            }
            int k = in.nextInt();
            if(k > n || k < 1){
                System.out.println(0);
            }
            else{
                ListNode fast = head;
                ListNode slow = head;
                for(int i = 1; i < k; i++){
                    fast = fast.next;
                }
                while(fast.next != null)
                {
                    fast = fast.next;
                    slow = slow.next;
                }
                 System.out.println(slow.val);
            }
        }
    }
}


// 3. 采用头插法构造单链表
import java.util.*;

class ListNode {
    int val;
    ListNode next;
    public ListNode(){

    }
    public ListNode(int val, ListNode next){
        this.val = val;
        this.next = next;
    }
}
public class Main {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int num = in.nextInt();
        ListNode head = new ListNode();
        for (int i = 0; i < num; i++) {
            ListNode node = new ListNode(in.nextInt(), head.next);
            head.next = node;
        }
        int target = in.nextInt();
        for (int i = 0; i < target; i++) {
            head = head.next;
        }
        System.out.println(head.val);
    }
}

 */
