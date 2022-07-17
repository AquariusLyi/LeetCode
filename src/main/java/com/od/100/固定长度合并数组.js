/**
固定长度合并数组

数组拼接

现在有多组整数数组，需要将它们合并成一个新的数组。合并规则，从每个数组里按顺序取出固定长度的内容合并到新的数组中，取完的内容会删除掉，如果该行不足固定长度或者已经为空，则直接取出剩余部分的内容放到新的数组中，继续下一行。

输入描述:
第一行是每次读取的固定长度，0<长度<10
第二行是整数数组的数目，0<数目<1000
第3-n行是需要合并的数组，不同的数组用回车换行分隔，数组内部用逗号分隔，最大不超过100个元素。
输出描述:
输出一个新的数组，用逗号分隔。

示例1
输入
3
2
2,5,6,7,9,5,7
1,7,4,3,4
输出
2,5,6,1,7,4,7,9,5,3,4,7
说明
1、获得长度3和数组数目2。
2、先遍历第一行，获得2,5,6；
3、再遍历第二行，获得1,7,4；
4、再循环回到第一行，获得7,9,5；
5、再遍历第二行，获得3,4；
6、再回到第一行，获得7，按顺序拼接成最终结果。

示例2
输入
4
3
1,2,3,4,5,6
1,2,3
1,2,3,4
输出
1,2,3,4,1,2,3,1,2,3,4,5,6


https://www.cnblogs.com/Jukim/p/16056524.html
 */

function niuke() {
  let len = parseInt(readline().trim());
  let num = parseInt(readline().trim());
  let list = [];
  let res = [];
  let sum = 0;
  for (let i = 0; i < num; i++) {
    let split = readline().trim().split(",");
    sum += split.length;
    list.push(split);
  }
  while (res.length != sum) {
    for (item of list) {
      if (item.length == 0) continue;
      let times = Math.min(item.length, len);
      while (times > 0) {
        res.push(item.shift());
        times--;
      }
    }
  }
  let out = "";
  for (let item of res) {
    out += item + ",";
  }
  console.log(out.substring(0, out.length - 1));
}
niuke();

/**
 
import java.util.*;

public class Demo15 {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int len = Integer.parseInt(sc.nextLine());
        int n = Integer.parseInt(sc.nextLine());

        //存储数据
        ArrayList<ArrayList<String>> list = new ArrayList<>();
        int sum = 0;
        for(int i = 0; i < n; i++){
            String[] split = sc.nextLine().split(",");
            sum += split.length;
            ArrayList<String> temp = new ArrayList<>(Arrays.asList(split));
            list.add(temp);
        }

        //处理数据
        ArrayList<String> res = new ArrayList<>();
        while(res.size() != sum){
            for(ArrayList<String> s : list){
                if(s.size() == 0) continue;
                int times = Math.min(s.size(), len);
                while(times > 0){
                    res.add(s.remove(0));
                    times--;
                }
            }
        }

        StringBuilder sb = new StringBuilder();
        for(String s : res)
            sb.append(s).append(",");
        String ans = sb.toString();
        System.out.println(ans.substring(0, ans.length() - 1));
    }
}
 */

/**
 
import java.util.*;

public class Demo15 {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int len = Integer.parseInt(sc.nextLine());
        int n = Integer.parseInt(sc.nextLine());

        //存储数据
        ArrayList<ArrayList<String>> list = new ArrayList<>();
        int sum = 0;
        for(int i = 0; i < n; i++){
            String[] split = sc.nextLine().split(",");
            sum += split.length;
            ArrayList<String> temp = new ArrayList<>(Arrays.asList(split));
            list.add(temp);
        }

        //处理数据
        ArrayList<String> res = new ArrayList<>();
        while(res.size() != sum){
            for(ArrayList<String> s : list){
                if(s.size() == 0) continue;
                int times = Math.min(s.size(), len);
                while(times > 0){
                    res.add(s.remove(0));
                    times--;
                }
            }
        }

        StringBuilder sb = new StringBuilder();
        for(String s : res)
            sb.append(s).append(",");
        String ans = sb.toString();
        System.out.println(ans.substring(0, ans.length() - 1));
    }
}
 */

/**
 
import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        while (sc.hasNextLine()) {
            int len = Integer.parseInt(sc.nextLine());
            int arrNum = Integer.parseInt(sc.nextLine());
            String[][] strArr = new String[arrNum][];
            int maxLen = 0;
            for (int i = 0; i < arrNum; i++){
                String str = sc.nextLine();
                if (str.length() > 0){
                    strArr[i] = str.split(",");
                    if (strArr[i].length > maxLen){
                        maxLen = strArr[i].length;
                    }
                }
            }
            int index = 0;
            StringBuilder sb = new StringBuilder();
            while (index < maxLen){
                for (int i = 0; i < arrNum; i++){
                    String[] arr = strArr[i];
                    if (arr == null){
                        continue;
                    }
                    for (int j = index; j < index + len; j++){
                        if (j < arr.length){
                            sb.append(arr[j]).append(",");
                        }
                    }
                }
                index += len;
            }
            int lastIndex = sb.lastIndexOf(",");
            if (lastIndex != -1){
                sb.deleteCharAt(lastIndex);
            }
            System.out.println(sb);
        }
    }
}
 */
