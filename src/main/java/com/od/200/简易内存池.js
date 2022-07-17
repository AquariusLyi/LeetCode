/**
 【编程题目 |200分】 简易内存池【2021 H2, 2022 Q1,Q2 考试题】

简易内存池


请实现一个简易内存池,根据请求命令完成内存分配和释放。
内存池支持两种操作命令，REQUEST和RELEASE，其格式为：
REQUEST=请求的内存大小 表示请求分配指定大小内存，如果分配成功，返回分配到的内存首地址；如果内存不足，或指定的大小为0，则输出error。
RELEASE=释放的内存首地址 表示释放掉之前分配的内存，释放成功无需输出，如果释放不存在的首地址则输出error。
注意：

内存池总大小为100字节。
内存池地址分配必须是连续内存，并优先从低地址分配。
内存释放后可被再次分配，已释放的内存在空闲时不能被二次释放。
不会释放已申请的内存块的中间地址。
释放操作只是针对首地址所对应的单个内存块进行操作，不会影响其它内存块。
解答要求

时间限制: 1000ms, 内存限制: 256MB
首行为整数 N , 表示操作命令的个数，取值范围：0 < N <= 100。

接下来的N行, 每行将给出一个操作命令，操作命令和参数之间用 “=”分割。

样例1：

输入

2
REQUEST=10
REQUEST=20

输出
0
10

样例2：

5
REQUEST=10
REQUEST=20
RELEASE=0
REQUEST=20
REQUEST=10

输出样例2：

0
10
30
0

提示说明：

第一条指令，申请地址0~9的10个字节内存，返回首地址0

第二条指令，申请地址10~29的20字节内存，返回首地址10

第三条指令，释放首地址为0的内存申请，0~9地址内存被释放，变为空闲，释放成功，无需输出

第四条指令，申请20字节内存，09地址内存连续空间不足20字节，往后查找到3049地址，返回首地址30

第五条指令，申请10字节，0~9地址内存空间足够，返回首地址0
 */

function EasyMemory() {
  let line = parseInt(readline().trim());
  let map = new Map();
  let start = 0;
  let end = 100;
  for (let i = 0; i < line; i++) {
    let command = readline().trim();
    if (command.startsWith("REQUEST=")) {
      let s = command.split("=")[1];
      let size = parseInt(s);
      console.log(request(size));
    } else {
      let s = command.split("=")[1];
      let address = parseInt(s);
      release(address);
    }
  }
  // 返回分配到的内存首地址
  // 0-9  20-39   50-69
  function request(size) {
    if (size < 0 || size > 100) {
      console.log("error");
    }
    if (map.size == 0) {
      map.set(start, start + size - 1);
      return start;
    }
    let curr = start;
    let keysArr = Array.from(map.keys());
    // 判断已使用的内存中间是否有空闲的内存
    for (let i = 0; i < keysArr.length; i++) {
      if (keysArr[i] - curr >= size) {
        map.set(curr, curr + size - 1);
        return curr;
      } else {
        curr = map.get(keysArr[i]) + 1;
      }
    }
    // 最大内存和已使用的内存地址的最大值是否空闲
    if (end - curr >= size) {
      map.set(curr, curr + size - 1);
      return curr;
    } else {
      return "error";
    }
  }

  // 释放内存
  function release(address) {
    if (map.has(address)) {
      map.delete(address);
    } else {
      console.log("error");
    }
  }
}

EasyMemory();

/**
 java

import java.util.*;

class no17 {
    static class AllocatedMemory {
        private TreeMap<Integer, Integer> hasAllocated;
        private int ADDRESS_DEFAULT_HEAD = 0;
        private int ADDRESS_DEFAULT_END = 100;
        AllocatedMemory() {
            hasAllocated = new TreeMap<>();
        }

        String request(int size) {
            int addressHead = ADDRESS_DEFAULT_HEAD;
            if (size <= 0 || size > 100) {
                return "error";
            }
            if (hasAllocated.isEmpty()) {
                hasAllocated.put(ADDRESS_DEFAULT_HEAD, size);
            } else {
                List<Integer> headList = new ArrayList<>(hasAllocated.keySet());
                for (int i=0; i<headList.size(); i++) {
                    if (headList.get(i) - addressHead >= size) {
                        hasAllocated.put(addressHead, addressHead + size);
                    } else {
                        addressHead = hasAllocated.get(headList.get(i));
                    }
                }
                if (size <= ADDRESS_DEFAULT_END - addressHead) {
                    hasAllocated.put(addressHead, addressHead + size);
                } else {
                    return "error";
                }
            }
            return String.valueOf(addressHead);
        }

        boolean release(int startAddress) {
            if (hasAllocated.containsKey(startAddress)) {
                hasAllocated.remove(startAddress);
                return true;
            }
            return false;
        }

        public static void main(String[] args) {
            no17.AllocatedMemory allocatedMemory =
                    new no17.AllocatedMemory();
            Scanner sc = new Scanner(System.in);
            int len = Integer.parseInt(sc.nextLine());
            String[][] ins = new String[len][2];
            for (int i = 0; i< len; i++) {
                ins[i] = sc.nextLine().split("=");
                if (ins[i][0].equals("REQUEST")) {
                    System.out.println(allocatedMemory.request(Integer.parseInt(ins[i][1])));
                } else {
                    boolean ret = allocatedMemory.release(Integer.parseInt(ins[i][1]));
                    if (!ret) {
                        System.out.println("error");
                    }
                }
            }
            sc.close();
        }
    }
}
 */
