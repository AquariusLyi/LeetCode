/**
 猜密码

 小杨申请了一个保密柜，但是他忘记了密码。只记得密码都是数字，而且所有数字都是不重复的。请你根据他记住的数字范围和密码的最小数字数量，帮他算下有哪些可能的组合，规则如下：
1、输出的组合都是从可选的数字范围中选取的，且不能重复；
2、输出的密码数字要按照从小到大的顺序排列，密码组合需要按照字母顺序，从小到大的顺序排序。
3、输出的每一个组合的数字的数量要大于等于密码最小数字数量；
4、如果可能的组合为空，则返回“None”
输入描述:
1、输入的第一行是可能的密码数字列表，数字间以半角逗号分隔
2、输入的第二行是密码最小数字数量
输出描述:
可能的密码组合，每种组合显示成一行，每个组合内部的数字以半角逗号分隔，从小到大的顺序排列。
输出的组合间需要按照字典序排序。
比如：
2,3,4放到2,4的前面
示例1
输入
2,3,4
2

输出
2,3
2,3,4
2,4
3,4
说明
最小密码数量是两个，可能有三种组合：
2,3
2,4
3,4
三个密码有一种：
2,3,4
示例2
输入
2,0
1
输出
0
0,2
2
说明
可能的密码组合，一个的有两种 ：
0
2
两个的有一个：
0,2
备注:
字典序是指按照单词出现在字典的顺序进行排序的方法，比如：
a排在b前
a排在ab前
ab排在ac前
ac排在aca前
————————————————
版权声明：本文为CSDN博主「旧梦昂志」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/csfun1/article/details/124643796
 */

function mima() {
  let str = readline().split(",");
  str.sort((a, b) => a - b);
  let num = Number(readline());
  let len = str.length;
  var list = [];

  for (let i = num; i <= len; i++) {
    combine(str, i, new String(), 0);
  }

  list.sort((a, b) => a - b);

  if (list.length == 0) {
    console.log("None");
  } else {
    list.forEach((item) => {
      let str = "";
      for (let i = 0; i < item.length; i++) {
        str += item.charAt(i);
        if (i != item.length - 1) {
          str += ",";
        }
      }
      console.log(str);
    });
  }

  function combine(str, num, res, idx) {
    if (num == 0) {
      list.push(res);
    } else {
      for (let i = idx; i < str.length; i++) {
        res += str[i];
        combine(str, num - 1, res, i + 1);
        res = res.substring(0, res.length - 1);
      }
    }
  }
}

/**
 java
 
 public class Main{
 
    public static List<String> list = new ArrayList<>();
 
    public static void main(String[] args) {
 
        Scanner sc = new Scanner(System.in);
 
        String[] strings = sc.nextLine().split(",");
 
        Arrays.sort(strings);   //先对输入数字进行升序，因为密码是升序的
        int n = sc.nextInt();
 
        int len = strings.length;
 
        for(int i=n;i<=len;i++){    //对数组从最小长度到最大长度求全组合排列
            combine(strings,i,new String(),0);
        }
 
        Collections.sort(list);
 
        if(list.size()==0){
            System.out.println("None");
        }else {
            list.forEach(v->{
                String str = "";
                for(int i=0;i<v.length();i++){
                    str+=v.charAt(i);
                    if(i!=v.length()-1){
                        str+=",";
                    }
                }
                System.out.println(str);
            });
        }
    }
 
   
    //    经典的 M 中取 N 个字符排列的递归算法，大家如果理解不了可以记一下
    //  str    数字池（从中取数字）
    //  n      数字个数（每添加一个数字进行减一，到0时满足，输出）
    //  res    数字排列
    //  index  下标（数字池中的索引）

     public static void combine(String[] str,int n,String res,int index){
 
        if(n==0){
            list.add(res);
        }else {
            for(int i=index;i<str.length;i++){
                res += str[i];
                combine(str,n-1,res,i+1);
                res = res.substring(0,res.length()-1);  //非常关键的一步
            }
        }
 
    }
 
}
 */
