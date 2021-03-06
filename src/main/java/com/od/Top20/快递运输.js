/**
 快递运输
 
一辆运送快递的货车，运送的快递均放在大小不等的长方体快递盒中，为了能够装载更多的快递，同时不能让货车超载，需要计算最多能装多少个快递。
注：快递的体积不受限制，快递数最多1000个，货车载重最大50000。

输入描述:
第一行输入每个快递的重量，用英文逗号分隔，如：5,10,2,11
第二行输入货车的载重量，如：20
不需要考虑异常输入。
输出描述:
输出最多能装多少个快递，如：3

示例1：
输入
5,10,2,11
20
输出
3
说明
货车的载重量为20，最多只能放三个快递5、10、2，因此输出3

【快递运输】

运送的快递放在大小不等的长方体快递盒中，为了能够装载更多的快递同时不能让货车超载，需要计算最多能装多少个快递。

注：快递的体积不受限制

快递数最多1000个

货车载重最大50000

输入描述

第一行输入每个快递的重量

用英文逗号隔开

如 5,10,2,11

第二行输入货车的载重量

如 20

输出描述

输出最多能装多少个快递

如 3

示例1 输入输出示例仅供调试，后台判题数据一般不包含示例

输入

5,10,2,11

20

输出

3

 */

function getMaxKuaidi(str1, str2) {
  let list = str1.trim().split(",").map(Number);
  let max = +str2.trim();
  let sum = 0; // 当前装货量
  let count = 0; // 当前快递个数
  list.sort((a, b) => a - b);
  for (const item of list) {
    if ((sum += item) > max) {
      console.log(count);
      return;
    } else {
      count++;
    }
  }
  console.log(count);
}
getMaxKuaidi("5,10,2,11", "20");

/**
 java


import java.util.*;

public class Main {
    public static void main(String args[]) {
        Scanner input = new Scanner(System.in);
        String s = input.nextLine(); //快递重量 英文逗号隔开
        int w = input.nextInt(); //货车载重量
        String[] split = s.split(",");
        List list = new LinkedList<Integer>();
        for (int i=0;i<split.length;i++){
            list.add(Integer.valueOf(split[i]));
        }
        int minNum;
        int count = 0;
        while (true){
            minNum = 100000;
            //找出最小
            for (int i=0;i<list.size();i++){
                if (minNum>(Integer) list.get(i)){
                    minNum = (Integer) list.get(i);
                }
            }
            list.remove(Integer.valueOf(minNum));
            if (w-minNum<0){
                break;
            }
            w = w-minNum;
            count++;
        }
        System.out.println(count);

    }
}
 */
