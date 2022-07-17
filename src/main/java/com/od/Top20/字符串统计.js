/**
 字符串统计
 
 全量和已占用字符集

 字符串统计（全量和占用字符集）

给定两个字符集合，一个为全量字符集，一个为已占用字符集。已占用的字符集中的字符不能再使用，要求输出剩余可用字符集。

输入描述:
1、输入为一个字符串，一定包含@符号。@前的为全量字符集，@后的字为已占用字符集。
2、已占用字符集中的字符一定是全量字符集中的字符。字符集中的字符跟字符之间使用英文逗号分隔。
3、每个字符都表示为字符加数字的形式，用英文冒号分隔，比如a:1，表示1个a字符。
4、字符只考虑英文字母，区分大小写，数字只考虑正整形，数量不超过100。
5、如果一个字符都没被占用，@标识仍然存在，例如a:3,b:5,c:2@
输出描述:
输出可用字符集，不同的输出字符集之间回车换行。
注意，输出的字符顺序要跟输入一致。不能输出b:3,a:2,c:2
如果某个字符已全被占用，不需要再输出。

示例1
输入
a:3,b:5,c:2@a:1,b:2
输出
a:2,b:3,c:2
说明
全量字符集为3个a，5个b，2个c。
已占用字符集为1个a，2个b。
由于已占用字符不能再使用，因此，剩余可用字符为2个a，3个b，2个c。
因此输出a:2,b:3,c:2
 */
// a:3,b:5,c:2    a:1,b:2
function getNotNull(args) {
  let input = args.trim();
  let split = input.split("@");
  if (input.length == 0 || split.length != 2) {
    return;
  }
  let all = new Map();
  let leftArr = split[0].split(",");
  for (let i = 0; i < leftArr.length; i++) {
    let map = leftArr[i].split(":");
    all.set(map[0], +map[1]);
  }
  let rightArr = split[1].split(",");
  let used = new Map();
  for (let i = 0; i < rightArr.length; i++) {
    let map = rightArr[i].split(":");
    used.set(map[0], +map[1]);
  }
  used.forEach((val, key) => {
    let temp = all.get(key) - val;
    if (temp > 0) {
      all.set(key, temp);
    } else {
      all.delete(key);
    }
  });
  let result = "";
  all.forEach((val, key) => {
    result = result.concat(key, ":", val, ",");
  });
  console.log(result.substring(0, result.length - 1));
}
getNotNull("a:3,b:5,c:2@a:1,b:2");

/**
 java


import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        while (in.hasNext()) {// 注意，如果输入是多个测试用例，请通过while循环处理多个测试用例
            String a = in.nextLine();
            String[] s = a.split("@");
            String[] pre = s[0].split(",");

            if(s.length >1) {
                LinkedHashMap<String, Integer> map = new LinkedHashMap();
                for (String temp : pre) {
                    String[] temp2 = temp.split(":");
                    map.putIfAbsent(temp2[0], (Integer) map.getOrDefault(temp2[0], 0) + Integer.valueOf(temp2[1]));
                }
                String[] end = s[1].split(",");
                for (String temp : end) {
                    String[] temp2 = temp.split(":");
                    map.put(temp2[0],  map.get(temp2[0]) - Integer.valueOf(temp2[1]));
                }
                StringBuilder stringBuilder = new StringBuilder();
                map.entrySet().forEach(f-> {
                    Map.Entry entry = ( Map.Entry)f;
                    if(f.getValue()>0) {
                        stringBuilder.append(entry.getKey()+":"+ entry.getValue());
                        stringBuilder.append(",");
                    }
                });
                if(stringBuilder.length()>0)
                stringBuilder.delete(stringBuilder.lastIndexOf(","),stringBuilder.length());
                System.out.println(stringBuilder.toString());
            } else {
                System.out.println(s[0]);
            }
        }
    }
}
 */
