/**
报数游戏

100个人围成一圈，每个人有一个编码，编号从1开始到100。
他们从1开始依次报数，报到为M的人自动退出圈圈，然后下一个人接着从1开始报数，直到剩余的人数小于M。
请问最后剩余的人在原先的编号为多少？
输入描述:

输入一个整数参数 M
输出描述:

如果输入参数M小于等于1或者大于等于100，输出“ERROR!”；
否则按照原先的编号从小到大的顺序，以英文逗号分割输出编号字符串
示例1 输入输出示例仅供调试，后台判题数据一般不包含示例

输入
3

输出
58,91

说明

输入M为3，最后剩下两个人。

示例2 输入输出示例仅供调试，后台判题数据一般不包含示例

输入
4

输出
34,45,97

说明

输入M为4，最后剩下三个人。

 */

function getLastNums(args) {
  let nums = +args.trim();

  if (nums <= 1 || nums >= 100) {
    console.log("ERROR!");
    return;
  }
  let arr = [];
  for (let i = 0; i < 100; i++) {
    arr.push(i + 1);
  }
  let size = 0;
  //   报道为M的人退出 结束
  while (arr.length >= nums) {
    let len = arr.length;
    let outNum = 0;
    for (let j = 0; j < len; j++) {
      size++;
      if (size == nums) {
        size = 0;
        arr.splice(j - outNum, 1);
        outNum++;
      }
    }
  }
  console.log(arr.join(","));
}
getLastNums("1");
getLastNums("113");
getLastNums("3");
getLastNums("4");
getLastNums("7");

/**
 java 解法一

 public class Main{
 
    public static void main(String[] args) {
 
        Scanner sc = new Scanner(System.in);
 
        int n = sc.nextInt();
 
        List<Integer> list = new ArrayList<>();
 
        for(int i=1;i<=100;i++){
            list.add(i);    //100个人的集合
        }
 
        int i=n-1;  //初始下标（集合下标从0开始，所有要-1）
 
        while (list.size()>=n){ //如果人数大于等于n就需要继续
                list.remove(i); //移除报n的人
                i--;    //因为少了一个人所以后面的所有下标都要向前移一位
                i = i+n<list.size() ? i+n : i+n-list.size();  //因为是围成的圆圈，所以下标越界后需要绕到最前面
        }
 
        System.out.println(list);
 
    }
 
}

 */

/**
 java 解法二

import java.util.Scanner;
import java.util.Collections;
import java.util.ArrayList;

public class Main {
    static class node{
        int val;
        node next = null;
        node(int val){this.val=val;}
    }
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int M = in.nextInt();
        if(M<=1||M>=100) System.out.println("ERROR!");
        else{
            ArrayList<Integer> ans = new ArrayList<>();
            node head = new node(1),pre = head;
            for(int i=2;i<=100;i++){
                node now = new node(i);
                pre.next=now;
                pre = now;
            }
            pre.next=head;
            //num记录剩下的人的数量,k记录当前的报数
            int num = 100,k=1;
            while(true){
                k++;
                pre = pre.next;
                head = head.next;
                //如果报数为M，就删除链表的结点
                if(k==M){
                    pre.next=head.next;
                    head=pre.next;
                    k=1;
                    num--;
                }
                if(num<M){
                    pre=head;
                    do{
                        ans.add(head.val);
                        head=head.next;
                    }while(head !=pre);
                    break;
                }
            }
            Collections.sort(ans);
            for(int i=0;i<ans.size();i++){
                System.out.printf("%d%c",ans.get(i),i==ans.size()-1?'\n':',');
            }
        }
    }
}

解法二：
import java.util.*;

public class Main {

    public static void main(String[] args) {
        List<Integer> peopleNos = new ArrayList(100);
        for(int i = 1; i <= 100;i++) {
            peopleNos.add(i);
        }
        Scanner scan = new Scanner(System.in);
        int m = scan.nextInt();
        if (m <= 1 || m >= 100) {
            System.out.println("ERROR!");
            return;
        }
        int num = 0;
        int index = 0;
        while (peopleNos.size() >= m) {
            num++;
            if (index >= peopleNos.size()) {
                index = 0;
            }
            Integer no = peopleNos.get(index);
            if (num == m) {
                //删除该元素，下个元素从1开始报数
                peopleNos.remove(no);
                num = 0;
                index--;
            }
            index++;
        }

        StringBuilder builder = new StringBuilder();
        int count = 0;
        for (Integer i : peopleNos) {
            builder.append(i);
            if (count != peopleNos.size() - 1) {
                builder.append(",");
            }
            count++;
        }
        System.out.println(builder.toString());
    }
}

解法三：

 public static void t9(int M) {
        int max = 100; // 100人
        if (M <= 1 || M >= max) {
            System.out.println("ERROR!");
            return;
        }
		// 非链表版, 测试了一下数组遍历是相当的快.
        Boolean[] alive = new Boolean[max];
        // 一共100人
        int aliveNum = max;
        // 复活所有人
        Arrays.fill(alive, true);
        // 当前报数下标
        int index = -1;

        // 报数计数器 1234...m
        int count = 0;
        while (aliveNum >= M) {

            index = ++index >= max ? index - max : index;

            // 活人报数, 等于M就退出
            if (alive[index] && ++count == M) {
                // 先退出游戏
                alive[index] = false;

                // 在重置报数
                count = 0;
                // 活人减1
                aliveNum--;
            }

        }
        String result = "";
        for (int i = 0; i < max; i++) {
            if (alive[i]) {
                result += (i + 1) + ",";
            }
        }
        System.out.println(result.substring(0, result.length() - 1));
    }
————————————————
版权声明：本文为CSDN博主「小鸟不会费」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/f_h_h/article/details/121369375
 */
/**
 java

 import java.util.*;

public class Main {

    public static void main(String[] args) {
        List<Integer> peopleNos = new ArrayList(100);
        for(int i = 1; i <= 100;i++) {
            peopleNos.add(i);
        }
        Scanner scan = new Scanner(System.in);
        int m = scan.nextInt();
        if (m <= 1 || m >= 100) {
            System.out.println("ERROR!");
            return;
        }
        int num = 0;
        int index = 0;
        while (peopleNos.size() >= m) {
            num++;
            if (index >= peopleNos.size()) {
                index = 0;
            }
            Integer no = peopleNos.get(index);
            if (num == m) {
                peopleNos.remove(no);
                num = 0;
                index--;
            }
            index++;
        }

        StringBuilder builder = new StringBuilder();
        int count = 0;
        for (Integer i : peopleNos) {
            builder.append(i);
            if (count != peopleNos.size() - 1) {
                builder.append(",");
            }
            count++;
        }
        System.out.println(builder.toString());
    }
}
 */
