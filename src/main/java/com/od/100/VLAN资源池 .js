/**
 
VLAN资源池

VLAN是一种对局域网设备进行逻辑划分的技术，为了标识不同的VLAN，引入VLAN ID(1-4094之间的整数)的概念。
定义一个VLAN ID的资源池(下称VLAN资源池)，资源池中连续的VLAN用开始VLAN-结束VLAN表示，不连续的用单个整数表示，所有的VLAN用英文逗号连接起来。
现在有一个VLAN资源池，业务需要从资源池中申请一个VLAN，需要你输出从VLAN资源池中移除申请的VLAN后的资源池。
输入描述

第一行为字符串格式的VLAN资源池，第二行为业务要申请的VLAN，VLAN的取值范围为[1,4094]之间的整数。
输出描述

从输入VLAN资源池中移除申请的VLAN后字符串格式的VLAN资源池，输出要求满足题目描述中的格式，并且按照VLAN从小到大升序输出。
如果申请的VLAN不在原VLAN资源池内，输出原VLAN资源池升序排序后的字符串即可。
示例1 输入输出示例仅供调试，后台判题数据一般不包含示例

输入

1-5

2

输出

1,3-5

说明

原VLAN资源池中有VLAN 1、2、3、4、5，从资源池中移除2后，剩下VLAN 1、3、4、5，按照题目描述格式并升序后的结果为1,3-5。
示例2 输入输出示例仅供调试，后台判题数据一般不包含示例

输入

20-21,15,18,30,5-10

15

输出

5-10,18,20-21,30

说明

原VLAN资源池中有VLAN 5、6、7、8、9、10、15、18、20、21、30，从资源池中移除15后，资源池中剩下的VLAN为 5、6、7、8、9、10、18、20、21、30，按照题目描述格式并升序后的结果为5-10,18,20-21,30。
示例3 输入输出示例仅供调试，后台判题数据一般不包含示例

输入

5,1-3

10

输出

1-3,5

说明

原VLAN资源池中有VLAN 1、2、3，5，申请的VLAN 10不在原资源池中，将原资源池按照题目描述格式并按升序排序后输出的结果为1-3,5。
备注

输入VLAN资源池中VLAN的数量取值范围为[2-4094]间的整数，资源池中VLAN不重复且合法([1,4094]之间的整数)，输入是乱序的。————————————————
版权声明：本文为CSDN博主「G1useppE」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/G1useppE/article/details/124831990
 */

function demo(str1, str2) {
  let split = str1.trim().split(",");
  let num = +str2.trim();
  let list = [];
  split.forEach((item) => {
    let curr = item.split("-");
    if (curr.length > 1) {
      let start = +curr[0];
      let last = +curr[1];
      for (let i = start; i <= last; i++) {
        list.push(i);
      }
    } else {
      list.push(+curr[0]);
    }
  });
  let arr = list.filter((item) => item != num).sort((a, b) => a - b);
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    let temp = [];
    for (let j = i; j < arr.length; j++) {
      temp.push(arr[j]);
      if (arr[j] + 1 != arr[j + 1]) {
        i = j;
        break;
      }
    }
    res.push(temp);
  }
  let result = "";
  res.forEach((item) => {
    if (item.length > 1) {
      result += item[0] + "-" + item[item.length - 1] + ",";
    } else {
      result += item[0] + ",";
    }
  });
  console.log(result.substring(0, result.length - 1));
}
demo("20-21,15,18,30,5-10", "15");

function VLANResource(args, deleteVLAN) {
  //将字符串转换为数组形式
  let VLANPool = args.split(",");
  let list = [];
  for (let vlan of VLANPool) {
    // 根据 - 分隔符将字符串转换为数组,'1-5'会呈现为[ '1', '5' ]
    let temp = vlan.split("-");
    if (temp.length > 1) {
      //以temp数组的第一项为起始位置，最后一项为结束位置，依次遍历然后添加到list数组中
      //可以理解为将1-5进行解构，解构为1，2，3，4，5的形式
      for (let i = parseInt(temp[0]); i <= parseInt(temp[1]); i++) {
        list.push(i);
      }
      // 如果是单个数字那么直接添加到list当中
    } else {
      list.push(parseInt(temp[0]));
    }
  }
  // 遍历list数组，如果当中有要删除的VLAN，就直接将这个元素删除掉
  for (let i = 0; i < list.length; i++) {
    if (list[i] == deleteVLAN) {
      // splice用于删除数组中的元素，第一个参数是起始位置，第二个参数是删除个数
      list.splice(i, 1);
    }
  }
  // 将删除了元素后的数组进行排序
  list.sort((a, b) => a - b);
  let res = "";
  var i = 0;
  while (i < list.length) {
    var first = list[i];
    var j = 1;
    while (j <= list.length - 1 - i) {
      // 判断下一个数是否连续，例如[1,3,4,5]就是1+1 != list[0+1] = 3
      //如果相等就继续遍历，j++,不相等就直接退出循环
      if (list[i] + j == list[i + j]) {
        j++;
      } else {
        break;
      }
    }
    // j==1说明下一个数字不等于上一个数字+1，那么就应该进行划分。
    if (j == 1) {
      res += first;
      res += ",";
      i++;
    } else {
      // 如果是连续的数字那么就用 - 分隔符表示连续的数
      res += list[i] + "-" + list[i + j - 1] + ",";
      i = i + j;
    }
  }
  // 将最后一个逗号截取掉
  console.log(res.substring(0, res.length - 1));
}

VLANResource("20-21,15,18,30,5-10", 15);

/**
 java

 import java.util.ArrayList;
import java.util.Scanner;
import java.util.TreeSet;


public class Main {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        String input = in.nextLine();
        Integer request = Integer.parseInt(in.nextLine());
        in.close();
        TreeSet<Integer> set = new TreeSet<>();
        for (String str : input.split(",")) {
            if (str.contains("-")) {
                String[] split = str.split("-");
                int start = Integer.parseInt(split[0]);
                int end = Integer.parseInt(split[1]);
                for (int i = start; i <= end; i++) {
                    set.add(i);
                }
            } else {
                set.add(Integer.parseInt(str));
            }
        }

        set.remove(request);

        ArrayList<Integer> list = new ArrayList<>(set);
        StringBuilder sb = new StringBuilder();

        Integer start = list.get(0);
        Integer last = start;

        for (int i = 1; i < list.size(); i++) {
            Integer cur = list.get(i);
            if (cur == last + 1) {
                last = cur;
            } else {
                append(sb, start, last);
                start = last = cur;
            }
        }
        append(sb, start, last);

        System.out.println(sb.substring(0, sb.length() - 1));
    }

    private static void append(StringBuilder sb, Integer start, Integer last) {
        if (start.equals(last)) {
            sb.append(last).append(",");
        } else {
            sb.append(start).append("-")
                    .append(last).append(",");
        }
    }
}

// java 解法

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Scanner;

public class VLAN {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] input = sc.nextLine().split(",");
        int search = sc.nextInt();
        List<Integer> list = new ArrayList<>();
        for (String s : input) {
            if (s.contains("-")) {
                String[] num = s.split("-");
                int start = Integer.parseInt(num[0]);
                int end = Integer.parseInt(num[1]);
                for (int j = start; j < end + 1; j++) {
                    list.add(j);
                }
            } else {
                list.add(Integer.parseInt(s));
            }
        }

        Collections.sort(list);
        list.remove((Object) search);
        int idx = 0;
        int start = 0;
        int tem = 1;
        StringBuffer sb = new StringBuffer();
        while (idx < list.size()) {
            if (start == 0) {
                start = list.get(idx);
            }
            if (idx + 1 == list.size()) {
                sb.append(start);
                break;
            }
            if (list.get(idx + 1) == start + tem) {
                idx++;
                tem++;
                continue;
            } else if (start == list.get(idx)) {
                sb.append(start).append(",");
                start = 0;
                tem = 1;
            } else {
                sb.append(start).append("-").append(list.get(idx));
                start = 0;
                tem = 1;
                if (idx + 1 < list.size()) {
                    sb.append(",");
                }
            }
            idx++;
        }
        System.out.println(sb);
    }
}

// 解法二

function VLANResource(args,deleteVLAN) {
    //将字符串转换为数组形式
    let VLANPool = args.split(',')
    let list = []
    for(let vlan of VLANPool) {
        // 根据 - 分隔符将字符串转换为数组,'1-5'会呈现为[ '1', '5' ]
        let temp = vlan.split('-')
        if(temp.length>1) {
            //以temp数组的第一项为起始位置，最后一项为结束位置，依次遍历然后添加到list数组中
            //可以理解为将1-5进行解构，解构为1，2，3，4，5的形式
            for(let i = parseInt(temp[0]);i<=parseInt(temp[1]);i++) {
                list.push(i)
            }
            // 如果是单个数字那么直接添加到list当中
        }else{
            list.push(parseInt(temp[0]))
        }
    }
    // 遍历list数组，如果当中有要删除的VLAN，就直接将这个元素删除掉   
    for(let i = 0 ; i < list.length;i++) {
        if(list[i] == deleteVLAN) {
            // splice用于删除数组中的元素，第一个参数是起始位置，第二个参数是删除个数
            list.splice(i,1)
        }
    }
    // 将删除了元素后的数组进行排序
    list.sort((a,b)=>a-b)
    let res = '' 
    var i = 0 
    while(i<list.length) {
        var first = list[i]
        var j = 1
        while(j<=list.length-1-i) {
            // 判断下一个数是否连续，例如[1,3,4,5]就是1+1 != list[0+1] = 3
            //如果相等就继续遍历，j++,不相等就直接退出循环
            if(list[i]+j == list[i+j]) {
                j++
            }else{
                break
            }
        }
        // j==1说明下一个数字不等于上一个数字+1，那么就应该进行划分。
        if(j == 1) {
            res += first 
            res += ','
            i++
        }else{
            // 如果是连续的数字那么就用 - 分隔符表示连续的数
            res += list[i] +'-'+list[i+j-1]+','
            i=i+j
        }
    }
    // 将最后一个逗号截取掉
    console.log(res.substring(0,res.length-1))
}
 
console.log(VLANResource('1-3,5',2))
 */
