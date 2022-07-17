/**
 题目
考古问题，假设以前的石碑被打碎成了很多块，每块上面都有一个或若干个字符，请你写个程序来把之前石碑上文字可能的组合全部写出来，排序按大小升序

输入
3
a b c
输出
abc
acb
bac
bca
cab
cba

输入
3
a b a
输出
aab
aba
baa

思路
一开始想先生成下标序列再转换为字符串，后面觉得吧，还不如我直接动态递归生成这些，我用StringBuilder即可，反正字符串必定是要生成的。
我把那些碎片当做一个字符串集合，每次取一块（排列组合），然后递归继续取，最后取完了就把最后的字符串丢到Set集合中去重。最后排个序输出。其中一定要注意List、StringBuilder这种对象进行递归调用传递参数的时候传递的是引用类型，所以每次操作完下去递归的时候都是需要复制一份的，不要直接传递会改的同一份的。
————————————————
版权声明：本文为CSDN博主「HumoChen99」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/HumorChen99/article/details/120329819

 */

function getPermutation(str) {
  if (str.length == 1) return [str]; //递归出口
  let res = [];
  for (let i = 0; i < str.length; i++) {
    //当前的字符
    let first_str = str[i];
    //截出当前值的剩下字符的排列。明白这里需要的是 剩下字符的排列数组。
    let other_str = getPermutation(str.slice(0, i) + str.slice(i + 1));
    //返回的是数组
    let temp = other_str.map((d) => first_str + d);
    res = res.concat(temp);
  }
  return res;
}
function kaogu() {
  let num = readline().trim();
  let input = readline().trim().replace(/\s+/g, "");
  let arr = getPermutation(input);
  let brr = Array.from(new Set(arr));
  brr.sort((a, b) => {
    for (let i = 0; i < a.length; i++) {
      if (a.charCodeAt(i) == b.charCodeAt(i)) {
        continue;
      }
      return a.charCodeAt(i) - b.charCodeAt(i);
    }
  });
  brr.forEach((item) => {
    console.log(item);
  });
}

/**
 * java
 
import java.util.HashSet;
import java.util.Scanner;
import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int n = Integer.parseInt(scanner.nextLine());
        String str = scanner.nextLine();
        String[] strings = str.split(" ");
        ArrayList<String> items = new ArrayList<>();
        Collections.addAll(items, strings);
        HashSet<String> hashSet = new HashSet<>();
        dynamicCombine(items, new StringBuilder(), hashSet);
        List<String> list = new ArrayList(strings.length);
        list.addAll(hashSet);
        list.sort((Comparator.comparing(o -> o)));
        for (String s : list) {
            System.out.println(s);
        }
    }

    public static void dynamicCombine(ArrayList<String> items, StringBuilder builder, HashSet<String> ret)           
    {
        if (items.size() != 0) {
            for (int i = 0, len = items.size(); i < len; i++) {
                StringBuilder newBuilder = new StringBuilder(builder);
                newBuilder.append(items.get(i));
                ArrayList<String> newItems = new ArrayList<>();
                for (int j = 0; j < len; j++) {
                    newItems.add(j, items.get(j));
                }
                newItems.remove(i);
                dynamicCombine(newItems, newBuilder, ret);
            }
        } else {
            if (builder.length() > 0) {
                ret.add(builder.toString());
            }
        }
    }
}
  

//   解法二

import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int n  = Integer.parseInt(scanner.nextLine());
        String str = scanner.nextLine();
        String[] strings = str.split(" ");
        ArrayList<String> items = new ArrayList<>();
        for (String s : strings){
            items.add(s);
        }
        HashSet<String> hashSet = new HashSet<>();
        dynamicCombine(items,new StringBuilder(),hashSet);
        //最后排序
        List<String> list = new ArrayList(strings.length);
        Iterator<String> iterator = hashSet.iterator();
        while (iterator.hasNext()){
            list.add(iterator.next());
        }
        list.sort(((o1, o2) -> {
            return ((String)o1).compareTo((String)o2);
        }));
        for (String s : list){
            System.out.println(s);
        }
    }

    组合
     public static void dynamicCombine(ArrayList<String> items,StringBuilder builder,HashSet<String> ret){
        if (items.size() != 0){
            for (int i = 0,len = items.size(); i < len ;i++){
                StringBuilder newBuilder = new StringBuilder(builder);
                newBuilder.append(items.get(i));
                ArrayList<String> newItems = new ArrayList<>();
                for (int j = 0; j < len;j++){
                    newItems.add(j,items.get(j));
                }
                newItems.remove(i);
                dynamicCombine(newItems,newBuilder,ret);
            }
        }else {
            if (builder.length() > 0){
                ret.add(builder.toString());
            }
            return;
        }
    }
}

 */
