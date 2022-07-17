/**
 解密犯罪时间
 
 标题：解密犯罪时间 | 时间限制：1秒 | 内存限制：262144K | 语言限制：不限

警察在侦破一个案件时，得到了线人给出的可能犯罪时间，形如 “HH:MM” 表示的时刻。

根据警察和线人的约定，为了隐蔽，该时间是修改过的，

解密规则为：利用当前出现过的数字，构造下一个距离当前时间最近的时刻，则该时间为可能的犯罪时间。

每个出现数字都可以被无限次使用。

输入描述

形如HH:SS字符串，表示原始输入。

输出描述

形如HH:SS的字符串，表示推理处理的犯罪时间。

备注

1.可以保证现任给定的字符串一定是合法的。

例如，“01:35”和“11:08”是合法的，“1:35”和“11:8”是不合法的。

2.最近的时刻可能在第二天。

示例

20:12得到20:20

23:59得到22:22

12:58得到15:11

18:52得到18:55

23:52得到23:53

09:17得到09:19

07:08得到08:00

解题思路：
根据题意可以判断时间都是由四个数字组成，把时间各数取出按序放入数组中
对四个数进行全遍历，获取所有可能的时间（必须符合时间格式要求），并跟错误时间进行比较。分别取出大于错误时间的最小值和小于错误时间的最小值。
如果存在大于错误时间的最小值，则最小值为犯罪时间；若不存在，小于错误时间的最小值为犯罪时间

 */

function format(time) {
  let split = time.split(":");
  let H = split[0];
  let M = split[1];
  H = H.length == 2 ? H : "0" + H;
  M = M.length == 2 ? M : "0" + M;
  return H + ":" + M;
}

function DecodeCrimeTime() {
  let time = readline().trim();
  let chars = time.split("");
  let nums = [];
  for (let c of chars) {
    if (c != ":") {
      nums.push(c - "0");
    }
  }
  let split = time.split(":");
  let H = parseInt(split[0]);
  let M = parseInt(split[1]);
  let list = [];
  for (let i of nums) {
    for (let j of nums) {
      if (i <= 5) {
        list.push(i * 10 + j);
      }
    }
  }
  list.sort((a, b) => a - b);
  for (let i of list) {
    if (i <= M) {
      continue;
    }
    return format(H + ":" + i);
  }
  if (H != 23) {
    for (let i of list) {
      if (i <= H) {
        continue;
      }
      return format(i + ":" + list[0]);
    }
  }
  return format(list[0] + ":" + list[0]);
}
console.log(DecodeCrimeTime());

// public static void main(String[] args) {
//     Scanner scan = new Scanner(System.in);
//     while (scan.hasNextLine()) {
//        String line = scan.nextLine();
//        System.out.println(func(line));
//     }
//     System.out.println("20:12" + "得到" + func("20:12"));
//     System.out.println("23:59" + "得到" + func("23:59"));
//     System.out.println("12:58" + "得到" + func("12:58"));
//     System.out.println("18:52" + "得到" + func("18:52"));
//     System.out.println("23:52" + "得到" + func("23:52"));
//     System.out.println("09:17" + "得到" + func("09:17"));
//     System.out.println("07:08" + "得到" + func("07:08"));
// }

/**
 java
 
 public class Main{
 
    public static void main(String[] args) {
 
        Scanner sc = new Scanner(System.in);
        
        String s = sc.nextLine();
        int errorTime = Integer.parseInt(s.substring(0,2)+s.substring(3));
        String[] num = new String[4];
        num[0] = String.valueOf(s.charAt(0));
        num[1] = String.valueOf(s.charAt(1));
        num[2] = String.valueOf(s.charAt(3));
        num[3] = String.valueOf(s.charAt(4));
        int time;
        int min = Integer.MAX_VALUE;    //大于错误时间的最小时间
        int minThan = Integer.MAX_VALUE;    //小于错误时间的最小时间（第二天）
        for(int i=0;i<4;i++){
            if(Integer.parseInt(num[i])>2){ //首位不能大于2
                continue;
            }
            for(int j=0;j<4;j++){
                if(Integer.parseInt(num[i])==2 && Integer.parseInt(num[j])>3){  //第一位为2时第二位则不能大于3
                    continue;
                }
                for(int k=0;k<4;k++){
                    if(Integer.parseInt(num[k])>6){ //第三位不能大于6
                        continue;
                    }
                    for(int l=0;l<4;l++){
                        time = Integer.parseInt(num[i]+num[j]+num[k]+num[l]);   //重构的时间
                        if(time<errorTime){
                            min = Math.min(min,time);
                        }else {
                            minThan = Math.min(minThan,time);
                        }
                    }
                }
            }
        }
        String res;
        if(min == Integer.MAX_VALUE){ //若重构的时间都小于错误时间，则时间为第二天时间
            res = String.valueOf(minThan);
        }else {
            res = String.valueOf(min);
        }
        System.out.println(res.substring(0,2)+":"+res.substring(2));
        
    }
    
}

// 解法二 

import java.util.ArrayList;
import java.util.Comparator;

public class DecodeCrimeTime {

    public static String func(String time) {
        char[] chars = time.toCharArray();
        ArrayList<Integer> nums = new ArrayList<>();
        for (char c : chars) {
            if (c != ':') {
                nums.add(c - '0');
            }
        }
        String[] split = time.split(":");
        int H = Integer.parseInt(split[0]);
        int M = Integer.parseInt(split[1]);
        ArrayList<Integer> list = new ArrayList<>();

        for (int i : nums) {
            for (int j : nums) {
                if (i <= 5) {
                    list.add(i * 10 + j);
                }
            }
        }
        list.sort(Comparator.comparingInt(o -> o));
        for (int i : list) {
            if (i <= M) {
                continue;
            }
            return format(H + ":" + i);
        }
        if (H != 23) {
            for (int i : list) {
                if (i <= H) {
                    continue;
                }
                //12:59 ->15:11
                return format(i + ":" + list.get(0));
            }
        }
        return format(list.get(0) + ":" + list.get(0));
    }

    public static String format(String time) {
        String[] split = time.split(":");
        String H = split[0];
        String M = split[1];
        H = H.length() == 2 ? H : "0" + H;
        M = M.length() == 2 ? M : "0" + M;
        return H + ":" + M;
    }

    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        while (scan.hasNextLine()) {
           String line = scan.nextLine();
           System.out.println(func(line));
        }
        System.out.println("20:12" + "得到" + func("20:12"));
        System.out.println("23:59" + "得到" + func("23:59"));
        System.out.println("12:58" + "得到" + func("12:58"));
        System.out.println("18:52" + "得到" + func("18:52"));
        System.out.println("23:52" + "得到" + func("23:52"));
        System.out.println("09:17" + "得到" + func("09:17"));
        System.out.println("07:08" + "得到" + func("07:08"));
    }
}

 */
