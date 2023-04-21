package com.leetcode.simple;

import java.util.Stack;

/**
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']'的字符串 s ，判断字符串是否有效。
 *
 * 有效字符串需满足：
 *
 * 左括号必须以正确的顺序闭合。
 *
 * 来源：力扣（LeetCode）
 * 链接：https://leetcode.cn/problems/valid-parentheses
 * 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
public class isValid20 {
    public static void main(String[] args) {
        // false
//        String s = "([)]{}";
//        boolean valid = isValid(s);
        // true
//        String trueStr = "()[]{}";
//        boolean validTru = isValid(trueStr);
        String trueStr = "()";
        boolean validTru = isValid(trueStr);
        String trueStr2 = "()";
        boolean validTru2 = isValid2(trueStr2);
        System.out.println();

    }

    public static boolean isValid2(String s) {
        if(s.isEmpty()){
            return true;
        }
        Stack<Character> stack = new Stack<Character>();
        for(char c:s.toCharArray()){
            if(c=='('){
                stack.push(')');

            }else if(c=='{'){
                stack.push('}');
            }else if(c=='['){
                stack.push(']');
            }else if(stack.empty()||c!=stack.pop()){
                return false;
            }
        }
        if(stack.empty()){
            return true;
        }
        return false;
    }

    /**
     * 这个挺简单的 因为给定的字符串括号是按顺序排序的
     * @param s
     * @return
     */
    public static boolean isValid(String s) {
        if(s.isEmpty())
            return true;
        Stack<Character> stack=new Stack<Character>();
        for(char c:s.toCharArray()){
            if(c=='(')
                stack.push(')');
            else if(c=='{')
                stack.push('}');
            else if(c=='[')
                stack.push(']');
            else if(stack.empty()||c!=stack.pop())
                return false;
        }
        if(stack.empty())
            return true;
        return false;

    }
}
