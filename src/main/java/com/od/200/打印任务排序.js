/**
标题：打印任务排序 | 时间限制：1秒 | 内存限制：262144K | 语言限制：不限

某个打印机根据打印队列执行打印任务。打印任务分为九个优先级，分别用数字1~9表示，数字越大优先级越高。打印机每次从队列头部取出第一个任务A，然后检查队列余下任务中有没有比A优先级更高的任务，如果有比A优先级高的任务，则将任务A放到队列尾部，否则就执行任务A的打印。请编写一个程序，根据输入的打印队列，输出实际的打印顺序
输入描述:
输入一行，为每个任务的优先级，优先级之间用逗号隔开，优先级取值范围是1~9
输出描述:
输出一行，为每个任务的打印顺序，打印顺序从0开始，用逗号隔开

示例1
输入
9,3,5
输出
0,2,1
说明
队列头部任务的优先级为9，最先打印，故序号为0；接着队列头部任务优先级为3，队列中还有优先级为5的任务，优先级3任务被移到队列尾部；接着打印优先级为5的任务，故其序号为1；最后优先级为3的任务的序号为2

示例2
输入
1,2,2
输出
2,0,1

说明
队列头部任务的优先级为1，被移到队列尾部；接着顺序打印两个优先级为2的任务，故其序号分别为0和1；最后打印剩下的优先级为1的任务，其序号为2

解题思路：
将所有打印任务的各自的序列号和优先级都放入各自的集合中，再将集合放入双向队列中。
从队列中的第一个元素开始向后遍历，判断优先级是否最高，如果是取出其集合，继续第二个元素；如不是则将其放入队列最后，重复步骤2。
当所有元素全部取出，则获取任务序列的排序。再经过序号和其处理顺序的交换就看得到原始任务的处理顺序。
 */

function dayin() {
  let strings = readline().trim().split(",");
  let len = strings.length;

  let mask = [];
  let list = [];

  for (let i = len - 1; i >= 0; i--) {
    //双向队列是先进先出所以需要倒装
    let num = parseInt(strings[i]);
    let temp = [];
    temp.push(i); //使用下标方便最后获取执行顺序
    temp.push(num);
    mask.push(temp);
  }

  while (mask.length > 0) {
    let first = mask[0][1]; //队列最前的任务
    let flag = true; //是否进行打印
    for (l of mask) {
      if (first < l[1]) {
        //如果发现队列中有大于最前的
        mask.push(mask.shift()); //将最前的移动到队列最后
        flag = false;
        break;
      }
    }
    if (flag) {
      list.push(mask.shift()[0]); //打印完就移除任务，并将任务下标添加到list
    }
  }

  let res = [];
  for (let i = 0; i < len; i++) {
    res[list[i]] = i; //list的值与下标进行交换就是所需要的结果
  }

  console.log(res.toString());
}

/**
 java
 

 public class Main{
 
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
 
        String[] strings = sc.nextLine().split(",");
        int len = strings.length;
 
        Deque<List<Integer>> mask = new ArrayDeque<>();
        List<Integer> list = new ArrayList<>();
 
        for(int i=len-1;i>=0;i--){  //双向队列是先进先出所以需要倒装
            int num = Integer.parseInt(strings[i]);
            List temp = new ArrayList();
            temp.add(i);    //使用下标方便最后获取执行顺序
            temp.add(num);
            mask.push(temp);
        }
 
        while (mask.size()>0){
            int first = mask.peekFirst().get(1);    //队列最前的任务
            boolean isDayin = true; //是否进行打印
            for (List<Integer> l:mask){
                if(first<l.get(1)){ //如果发现队列中有大于最前的
                    mask.addLast(mask.pollFirst()); //将最前的移动到队列最后
                    isDayin = false;
                    break;
                }
            }
            if(isDayin){
                list.add(mask.pollFirst().get(0));  //打印完就移除任务，并将任务下标添加到list
            }
        }
 
        int[] res = new int[len];
        for (int i=0;i<len;i++){
            res[list.get(i)] = i;   //list的值与下标进行交换就是所需要的结果
        }
 
        System.out.println(Arrays.toString(res));
    }
 
}

// 解法二

import java.util.Scanner;
import java.util.*;

public class PrintTaskSort {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        String[] strings = sc.nextLine().split(",");
        int len = strings.length;

        Deque<List<Integer>> mask = new ArrayDeque<>();
        List<Integer> list = new ArrayList<>();

        for (int i = len - 1; i >= 0; i--) { 
            int num = Integer.parseInt(strings[i]);
            List temp = new ArrayList();
            temp.add(i); 
            temp.add(num);
            mask.push(temp);
        }

        while (mask.size() > 0) {
            int first = mask.peekFirst().get(1); 
            boolean isDayin = true; 
            for (List<Integer> l : mask) {
                if (first < l.get(1)) { 
                    mask.addLast(mask.pollFirst());
                    isDayin = false;
                    break;
                }
            }
            if (isDayin) {
                list.add(mask.pollFirst().get(0)); 
            }
        }

        int[] res = new int[len];
        for (int i = 0; i < len; i++) {
            res[list.get(i)] = i;
        }
        StringBuilder sb = new StringBuilder();
        for(int i:res)
            sb.append(i).append(",");
        System.out.println(sb.substring(0, sb.length() - 1));
    }
}
// 解法三

import java.util.Scanner;
import java.util.*;

public class PrintTaskSort {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        String[] strings = sc.nextLine().split(",");
        int len = strings.length;

        Deque<List<Integer>> mask = new ArrayDeque<>();
        List<Integer> list = new ArrayList<>();

        for (int i = len - 1; i >= 0; i--) { 
            int num = Integer.parseInt(strings[i]);
            List temp = new ArrayList();
            temp.add(i); 
            temp.add(num);
            mask.push(temp);
        }

        while (mask.size() > 0) {
            int first = mask.peekFirst().get(1); 
            boolean isDayin = true; 
            for (List<Integer> l : mask) {
                if (first < l.get(1)) { 
                    mask.addLast(mask.pollFirst());
                    isDayin = false;
                    break;
                }
            }
            if (isDayin) {
                list.add(mask.pollFirst().get(0)); 
            }
        }

        int[] res = new int[len];
        for (int i = 0; i < len; i++) {
            res[list.get(i)] = i;
        }
        StringBuilder sb = new StringBuilder();
        for(int i:res)
            sb.append(i).append(",");
        System.out.println(sb.substring(0, sb.length() - 1));
    }
}
 */
