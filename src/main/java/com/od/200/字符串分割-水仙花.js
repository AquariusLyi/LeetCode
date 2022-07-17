/**
字符串分割

标题：字符串分割 | 时间限制：3秒 | 内存限制：262144K | 语言限制：不限
给定非空字符串s，将该字符串分割成一些子串，使每个子串的ASCII码值的和均为水仙花数。
1、若分割不成功，则返回0
2、若分割成功且分割结果不唯一，则返回-1
3、若分割成功且分割结果唯一，则返回分割后子串的数目
输入描述:
1、输入字符串的最大长度为200
输出描述:
根据题目描述中情况，返回相应的结果

示例1
输入
abc
输出
0

说明
分割不成功

示例2
输入
f3@d5a8
输出
-1

说明
分割成功但分割结果不唯一，可以分割为两组，一组"f3"和"@d5a8"，另外一组"f3@d5"和"a8"
示例3
输入
AXdddF
输出
2
说明
成功分割且分割结果唯一，可以分割“AX"(153)和"dddF"(370)成两个子串

备注:
“水仙花数”是指一个三位数，每位上数字的立方和等于该数字本身，如371是“水仙花数”，因为：371 = 3^3 + 7^3 + 1^3

解题思路
1、对输入的字符串逐字进行ASCII码值求和，当满足水仙花数的时候，将剩下的字符串再进行求和判断，计算到最后一位字符也满足水仙花数，则符合字符分割+1。
2、在上一个求和判断（步骤1）中，当满足水仙花数的时候不进行分割，而是接着继续逐字求和判断，如果计算到最后一位字符还是满足水仙花数，则也符合分割，符合分割+1。
3、重复步骤2的操作，直至遍历到最后一个字符或遍历到大于999的时候，判断符合分割的情况有几个。只有1的时候符合题意。
题目主要使用到了递归。
 */

function demo(args) {
  var fuhe = 0; //能够实现的方案个数
  var zichuan = 1; //分割出的子串个数

  let str = args.trim();
  //let str = "abc";
  let res = 0;

  fenge(str);

  if (fuhe == 1) {
    res = zichuan; //只有一种情况符合
  } else if (fuhe > 1) {
    res = -1; //大于一种情况符合
  }

  console.log(res);

  function fenge(s) {
    let len = s.length;
    let count = 0; //ACSII码计数和
    for (let i = 0; i < len; i++) {
      count += s.charCodeAt(i);
      if (count > 999) {
        //大于999之后都不符合要求，直接退出
        break;
      }
      if (count >= 100 && count <= 999) {
        //水仙数[100,999]之间
        if (isSXS(count)) {
          if (i == len - 1) {
            fuhe++; //字符串遍历到最后一位都符合水仙数，说明是符合要求的
          } else {
            fenge(s.substring(i + 1)); //将剩下的字符继续遍历
            zichuan++; //符合的子串+1
          }
        }
      }
    }
  }
}

function isSXS(i) {
  let b = parseInt(i / 100); //百位数
  let s = parseInt((i % 100) / 10); //十位数
  let g = (i % 100) % 10; //个位数

  let count = Math.pow(b, 3) + Math.pow(s, 3) + Math.pow(g, 3);

  if (count == i) {
    return true;
  }

  return false;
}
demo("abc");
demo("AXdddF");
demo("f3@d5a8");

/**
 java

 public class Main{
 
    public static int fuhe = 0; //能够实现的方案个数
    public static int zichuan = 1;  //分割出的子串个数
 
    public static void main(String[] args) {
 
        Scanner sc = new Scanner(System.in);
 
        String str = sc.nextLine();
        int res = 0;
 
        fenge(str);
        
        if(fuhe==1){
            res = zichuan;  //只有一种情况符合
        }else if(fuhe>1){
            res = -1;   //大于一种情况符合
        }
 
        System.out.println(res);
 
    }
 
    public static void fenge(String s){
 
        int len = s.length();
        int count = 0;  //ACSII码计数和
        for(int i=0;i<len;i++){
            count+=s.charAt(i);
            if(count>999){  //大于999之后都不符合要求，直接退出
                break;
            }
            if( count>=100 && count<=999){  //水仙数[100,999]之间
                if(isSXS(count)){
                    if(i==len-1){
                        fuhe++; //字符串遍历到最后一位都符合水仙数，说明是符合要求的
                    }else {
                        fenge(s.substring(i+1)); //将剩下的字符继续遍历
                        zichuan++;  //符合的子串+1
                    }
                }
            }
        }
    }
 
    public static boolean isSXS(int i){
 
        int b = i/100;  //百位数
        int s = i%100/10;   //十位数
        int g = i%100%10;   //个位数
 
        int count = (int) (Math.pow(b,3) + Math.pow(s,3) + Math.pow(g,3));
 
        if(count == i){
            return true;
        }
 
        return false;
    }
}
 */
