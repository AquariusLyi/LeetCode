/**
日志排序

标题：日志排序 | 时间限制：1秒 | 内存限制：262144K | 语言不限
运维工程师采集到某产品现网运行一天产生的日志N条，现需根据日志时间按时间先后顺序对日志进行排序。
日志时间格式为：

 H:M:S.N
 H表示小时(0-23)，M表示分钟(0-59)，S表示秒(0-59)，N表示毫秒(0-999)
 时间可能并没有补齐，也就是说: 01:01:01.001，也可能表示为1:1:1.1
 输入描述:
 第一行输入一个整数N，表示日志条数，1<=N<=100000
 接下来N行输入N个时间
 输出描述:
 按时间升序排序之后的时间
 如果有两个时间表示的时间相同，则保持输入顺序
 
 示例1
 输入：
 2
 01:41:8.9
 1:1:09.211
 输出：
 1:1:09.211
 01:41:8.9

 示例2
 输入：
 3
 23:41:08.023
 1:1:09.211
 08:01:22.0
 输出：
 1:1:09.211
 08:01:22.0
 23:41:08.023

 示例3
 输入：
 2
 22:41:08.023
 22:41:08.23
 输出：
 22:41:08.023
 22:41:08.23
 说明：
 两个时间表示的时间相同，保持输入顺序
 
 解题思路
         将日志时间按照时、分、秒、毫秒分割，然后再按照时、分、秒、毫秒进行比较大小，如果时相同，则对分比较，如果分相同，则对秒进行比较，如果秒相同，则对毫秒进行比较，如果毫秒也相同，则顺序不变。
 
 */

function demo() {
  var num = parseInt(readline());
  var list = [];
  for (let i = 0; i < num; i++) {
    var tempArr = [];
    var str = readline().replace(".", ":").split(":");
    for (let j = 0; j < str.length; j++) {
      tempArr.push(str[j]);
    }
    list.push(tempArr);
  }

  list.sort((a, b) => {
    if (Number(b[0]) > Number(a[0])) {
      return -1;
    }
    if (Number(b[0]) < Number(a[0])) {
      return 1;
    }
    if (Number(b[1]) > Number(a[1])) {
      return -1;
    }
    if (Number(b[1]) < Number(a[1])) {
      return 1;
    }
    if (Number(b[2]) > Number(a[2])) {
      return -1;
    }
    if (Number(b[2]) < Number(a[2])) {
      return 1;
    }
    if (Number(b[3]) > Number(a[3])) {
      return -1;
    }
    if (Number(b[3]) < Number(a[3])) {
      return 1;
    }
    return 1;
  });

  for (let i = 0; i < num; i++) {
    console.log(
      list[i][0] + ":" + list[i][1] + ":" + list[i][2] + "." + list[i][3]
    );
  }
}

/**
 java

// 解法一


import java.util.Comparator;
import java.util.LinkedList;
import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner in = new Scanner(System.in);
    int n = Integer.parseInt(in.nextLine());
    LinkedList<String> times = new LinkedList<>();
    for (int i = 0; i < n; i++) {
      times.add(in.nextLine());
    }
    in.close();

    times.sort(Comparator.comparingLong(Main90::getTime));

    times.forEach(System.out::println);
  }

  private static long getTime(String str) {
    String[] t1 = str.split(":");
    String[] t2 = t1[2].split("\\.");
    int h = Integer.parseInt(t1[0]) * 60 * 60 * 1000;
    int m = Integer.parseInt(t1[1]) * 60 * 1000;
    int s = Integer.parseInt(t2[0]) * 1000;
    int n = Integer.parseInt(t2[1]);
    return h + m + s + n;
  }

}



// 解法二

 public class Main{
 
    public static void main(String[] args) {
 
        Scanner sc = new Scanner(System.in);
 
        int n = sc.nextInt();
        sc.nextLine();
        List<List<String>> list = new ArrayList<>();
 
        for(int i=0;i<n;i++){
            List<String> list = new ArrayList<>();
            String[] strings = sc.nextLine()
                                    .replace(".",":")
                                    .split(":");
            for(int j=0;j<strings.length;j++){
                list.add(strings[j]);
            }
            list.add(list);
        }
 
        list.sort((a,b)->{
            if(Integer.valueOf(b.get(0))>Integer.valueOf(a.get(0))){
                return -1;
            }
            if(Integer.valueOf(b.get(0))<Integer.valueOf(a.get(0))){
                return 1;
            }
            if(Integer.valueOf(b.get(1))>Integer.valueOf(a.get(1))){
                return -1;
            }
            if(Integer.valueOf(b.get(1))<Integer.valueOf(a.get(1))){
                return 1;
            }
            if(Integer.valueOf(b.get(2))>Integer.valueOf(a.get(2))){
                return -1;
            }
            if(Integer.valueOf(b.get(2))<Integer.valueOf(a.get(2))){
                return 1;
            }
            if(Integer.valueOf(b.get(3))>Integer.valueOf(a.get(3))){
                return -1;
            }
            if(Integer.valueOf(b.get(3))<Integer.valueOf(a.get(3))){
                return 1;
            }
            return 1;
        });
 
        for(int i=0;i<list.size();i++){
            System.out.println(list.get(i).get(0)+":"+
                               list.get(i).get(1)+":"+
                               list.get(i).get(2)+"."+
                               list.get(i).get(3));
        }
    }
}
 */
