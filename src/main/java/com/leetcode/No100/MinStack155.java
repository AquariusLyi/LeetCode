package com.leetcode.No100;

import java.util.Scanner;
import java.util.Stack;

/**
 * 设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。
 *
 * 实现 MinStack 类:
 *
 * MinStack() 初始化堆栈对象。
 * void push(int val) 将元素val推入堆栈。
 * void pop() 删除堆栈顶部的元素。
 * int top() 获取堆栈顶部的元素。
 * int getMin() 获取堆栈中的最小元素。
 *
 * 来源：力扣（LeetCode）
 * 链接：https://leetcode.cn/problems/min-stack
 * 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
public class MinStack155 {
    private Stack<Integer> stack;
    private Stack<Integer> min_stack;
    public void MinStack() {
        stack = new Stack<>();
        min_stack = new Stack<>();
    }
    public void push(int x) {
        stack.push(x);
        if(min_stack.isEmpty() || x <= min_stack.peek())
            min_stack.push(x);
    }
    public void pop() {
        if(stack.pop().equals(min_stack.peek()))
            min_stack.pop();
    }
    public int top() {
        return stack.peek();
    }
    public int getMin() {
        return min_stack.peek();
   }
//    Deque<Integer> xStack;
//    Deque<Integer> minStack;
//
//    public MinStack() {
//        xStack = new LinkedList<Integer>();
//        minStack = new LinkedList<Integer>();
//        minStack.push(Integer.MAX_VALUE);
//    }
//
//    public void push(int x) {
//        xStack.push(x);
//        minStack.push(Math.min(minStack.peek(), x));
//    }
//
//    public void pop() {
//        xStack.pop();
//        minStack.pop();
//    }
//
//    public int top() {
//        return xStack.peek();
//    }
//
//    public int getMin() {
//        return minStack.peek();
//    }

}
