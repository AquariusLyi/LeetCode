/**
 数组二叉树
二叉树也可以用数组来存储，给定一个数组，树的根节点的值存储在下标1，对于存储在下标N的节点，它的左子节点和右子节点分别存储在下标2N和2N+1，并且我们用值-1代表一个节点为空。

给定一个数组存储的二叉树，试求从根节点到最小的叶子节点的路径，路径由节点的值组成。

输入描述:
输入一行为数组的内容，数组的每个元素都是正整数，元素间用空格分隔。注意第一个元素即为根节点的值，即数组的第N个元素对应下标N，下标0在树的表示中没有使用，所以我们省略了。输入的树最多为7层。
输出描述:
输出从根节点到最小叶子节点的路径上，各个节点的值，由空格分隔，用例保证最小叶子节点只有一个。

示例1
输入
3 5 7 -1 -1 2 4
输出
3 7 2
说明
数组存储的二叉树如图，故到最小叶子节点的路径为3 7 2

示例2
输入
5 9 8 -1 -1 7 -1 -1 -1 -1 -1 6
输出
5 8 7 6
说明
数组存储的二叉树如图，故到最小叶子节点的路径为10 8 7 6，注意数组仅存储至最后一个非空节点，故不包含节点“7”右子节点的-1

https://www.online1987.com/wp-content/uploads/2022/05/%E6%95%B0%E7%BB%84%E4%BA%8C%E5%8F%89%E6%A0%91.png

 */

// 辅助函数
function fun(split, minPos, path) {
  path.push(split[minPos]);
  if (minPos == 1) {
    return;
  }
  if (minPos % 2 == 0) {
    fun(split, Math.floor(minPos / 2), path);
  } else {
    fun(split, Math.floor((minPos - 1) / 2), path);
  }
}

function solution() {
  let str = readline().trim();
  let splitArr = ("0 " + str).split(/\s+/);
  let min = Number.MAX_SAFE_INTEGER;
  let minPos = 0;
  for (let i = 2; i < splitArr.length; i++) {
    let tmp = parseInt(splitArr[i]);
    if (tmp != 0 && tmp != -1 && tmp < min) {
      min = tmp;
      minPos = i;
    }
  }
  let pathArr = [];
  fun(splitArr, minPos, pathArr);
  pathArr.reverse();
  console.log(pathArr.join());
  // for (let i = pathArr.length - 1; i >= 0; i--) {
  //   console.log(pathArr[i]);
  //   if (i != 0) {
  //     console.log(" ");
  //   }
  // }
}

/*
 java

给定一个数组存储的二叉树
试求从根节点到最小的叶子节点的路径
路径由节点的值组成
先找到最小节点值，然后 indexOf 找出索引位
然后根据节点生成算法 n,n+1 反推回索引为1的根节点
过程中的值保存起来 如 3 2 1
最后输出时再颠倒一下顺序 1 2 3

import java.util.*;
 
public class Test13 {
    public static void main(String[] args){
      
        Scanner sc = new Scanner(System.in);
        String[] split = sc.nextLine().split("\\s+");
 
        //第一步 重建二叉树数组
        ArrayList<Integer> list = new ArrayList<>();
        list.add(Integer.MAX_VALUE);//二叉树数组 第0位不使用，这里用超大值填充
        for(String s:split){
            list.add(Integer.parseInt(s)); //二叉树数组重建完毕
        }
 
        //第二步 寻找最小叶子结点
        int min=Integer.MAX_VALUE;
        for(Integer i:list){
            if( !i.equals(list.get(1)) && (i!=-1) ){
                if(i<min) min = i;
            }
        }
 
        //第三步 确定最小叶子结点在二叉树数组的下标 index
        int indexMin = list.indexOf(min);
 
        //第四步 反推回根节点,获得路径值
        ArrayList<Integer> list2 = new ArrayList<>();
        for(int i=indexMin; i>0;){
            list2.add(list.get(i));
            i = i/2;
        }
 
        //第五步 颠倒输出
        StringBuilder bu = new StringBuilder();
        for(int i = list2.size()-1; i>=0 ;i--)
        {
            bu.append(list2.get(i)).append(" ");
        }
 
        System.out.println(bu.toString().trim());
 
    }
}
 */

/**
 java

//  dfs

import java.util.*;

public class arrayBinaryTree {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        List<Integer> res = new ArrayList<>();
        String[] str = in.nextLine().split(" ");
        in.close();
        for (String s : str) {
            res.add(Integer.parseInt(s));
        }
        int idx = dfs(res, 0);  // 找到叶子节点的索引
        List<Integer> arr = new ArrayList<>();  //存储根节点到最小叶子节点路径上的所有节点
        while (idx > 0) {  // 找到最小叶子节点的所有父节点的索引
            arr.add(res.get(idx));
            idx = (idx - 1) / 2;
        }
        arr.add(res.get(0));  // 加入根节点
        Collections.reverse(arr);  // 反转list
        for (int i = 0; i < arr.size(); i++) {
            if (i == arr.size() - 1) {
                System.out.print(arr.get(i));
            } else {
                System.out.print(arr.get(i) + " ");
            }
        }
    }
    private static int dfs(List<Integer> res, int idx) {  // 返回最小叶子节点对应索引
        if (isLeaf(res, idx)) {
            return idx;
        } else {
            int idx_left = dfs(res, 2 * idx + 1);  // 递归左叶子节点
            int idx_right = dfs(res, 2 * idx + 2); // 递归右叶子节点
            if (idx_left >= res.size() || res.get(idx_left) == -1) {  // 只有右叶子节点
                return idx_right;
            } else if (idx_right >= res.size() || res.get(idx_right) == -1) {  // 只有左叶子节点
                return idx_left;
            } else {  // 左右叶子节点都有，找最小的
                return res.get(idx_left) < res.get(idx_right) ? idx_left : idx_right;
            }
        }
    }
    private static boolean isLeaf(List<Integer> res, int idx) {  // 判断是否是叶子节点
        return (2 * idx + 1 >= res.size() || res.get(2 * idx + 1) == -1)
                && (2 * idx + 2 >= res.size() || res.get(2 * idx + 2) == -1);
    }
}




 解法一


import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        ArrayList<Integer> array = new ArrayList<>();

        while (in.hasNextInt()) {
            array.add(in.nextInt());
        }
        fun(array);

    }

    private static int dfs(List<Integer> nums, int index) {
        if (isLeaf(nums, index)) {
            return index;
        } else {
            int i1 = dfs(nums, 2 * index + 1);
            int i2 = dfs(nums, 2 * index + 2);
            if (i1 >= nums.size() || nums.get(i1) == -1) {
                return i2;
            } else if (i2 >= nums.size() || nums.get(i2) == -1) {
                return i1;
            } else {
                return nums.get(i1) < nums.get(i2) ? i1 : i2;
            }
        }
    }

    private static boolean isLeaf(List<Integer> nums, int index) {
        return (2 * index + 1 >= nums.size() || nums.get(2 * index + 1) == -1)
                && (2 * index + 2 >= nums.size() || nums.get(2 * index + 2) == -1);
    }

    private static void fun(List<Integer> nums) {
        int index = dfs(nums, 0);
        ArrayList<Integer> arr = new ArrayList<>();
        while (index > 0) {
            arr.add(nums.get(index));
            index = (index - 1) / 2;
        }
        arr.add(nums.get(0));

        Collections.reverse(arr);
        for (Integer integer : arr) {
            System.out.print(integer + " ");
        }
    }
}

 解法二

 package com.amoscloud.newcoder.refactor;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Main0011 {
    public static void main(String[] args) {
      try (Scanner scanner = new Scanner(System.in)) {
        String treeStr = scanner.nextLine();
        solution(treeStr);
      }
    }
  
    private static void solution(String treeStr) {
      String[] split = ("0 " + treeStr).split(" ");
      int min = Integer.MAX_VALUE;
      int minPos = 0;
      for (int i = 2; i < split.length; i++) {
        int tmp = Integer.parseInt(split[i]);
        if (tmp != 0 && tmp != -1 && tmp < min) {
          min = tmp;
          minPos = i;
        }
      }
      List<String> path = new ArrayList<>();
      back(split, minPos, path);
  
      for (int i = path.size() - 1; i >= 0; i--) {
        System.out.print(path.get(i));
        if (i != 0) {
          System.out.print(" ");
        }
      }
  
    }
  
    private static void back(String[] split, int minPos, List<String> path) {
      path.add(split[minPos]);
      if (minPos == 1) {
        return;
      }
      if (minPos % 2 == 0) {
        back(split, minPos / 2, path);
      } else {
        back(split, (minPos - 1) / 2, path);
      }
    }
  }

 */
