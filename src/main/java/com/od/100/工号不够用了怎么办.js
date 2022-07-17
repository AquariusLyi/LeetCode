/**
 题目：
3020年，空间通信集团的员工人数突破20亿人，即将遇到现有工号不够用的窘境。现在，请你负责调研新工号系统。继承历史传统，新的工号系统由小写英文字母（a-z）和数字（0-9）两部分构成。新工号由一段英文字母开头，之后跟随一段数字，

比如"aaahw0001","a12345","abcd1","a00"。注意新工号不能全为字母或者数字,允许数字部分有前导0或者全为0。但是过长的工号会增加同事们的记忆成本，现在给出新工号至少需要分配的人数X和新工号中字母的长度Y，求新工号中数字的最短长度Z。

输入描述:
一行两个非负整数 X Y，用数字用单个空格分隔。
0< X <=2^50 - 1
0< Y <=5
输出描述:
输出新工号中数字的最短长度Z
示例1
输入
260 1
输出
1
示例2
输入
26 1
输出
1
说明
数字长度不能为0
示例3
输入
2600 1
输出
2

解题思路：
解题思路在下面的代码注释当中，这里我们不妨思考一下题目并没有要求工号不能数字大的在前面，也就是说可以任意拼接，那么假如一个工号是 a01 ,这个工号的1应该可以放到0的前面也可以放到后面，也就是增加一个数字长度，以一个数字为基准应该增加两种情况，那么为什么只需要*10而不是*10*2呢？这是因为假如我们后面轮到以1为基准数前后添加0时，会发现产生了01和10两种情况，跟上面的以0为基准数的两种情况重复了，只用取其中一种即可，因此只需要*10，不需要*10*2。
————————————————
版权声明：本文为CSDN博主「G1useppE」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/G1useppE/article/details/125008959
 */

function getWorkNum(total, charNum) {
  // 如果所需人数少于26人，那么工牌的数字长度最多不超过1即可，因为题目要求不能纯数字或纯字
  //母，因此长度至少为1
  if (total <= 26) {
    return 1;
  }
  // 用del表示可能的情况数
  let del = 1;
  // 当字母长度为1时，因为字母总共有26个，因此初始的仅凭给定的字母可以拼凑的情况有26种。
  // 注意：假如给定的字母长度不为1，那么可以拼凑的情况应该是del = del * 26,因为一个字母跟
  // 另一个字母拼接有26种情况，26个字母那么就是有26*26种情况，以此类推。
  for (let i = 0; i < charNum; i++) {
    del *= 26;
  }
  // 用r来表示数字的长度。
  let res = 1;
  // 上面的到的del是还没有跟数字进行拼接的，因此这里将数字初始值长度设置为1，长度为1的数字跟
  // 上面得到的字母情况del拼接，因为数字为0-9总共有10个，因此得到的一个数字长度跟字母拼接
  // 的总共情况为del*10。
  del *= 10;
  // 判断得到的情况，也即工号数量是否符合题目要求，如果不满足，说明还需要继续添加数字进行拼接，
  // 因此需要将数字长度r++,通过while循环不断进行判断,判断添加了多一个数字长度得到的工号数量
  // 是否满足要求,如果满足,就退出循环,返回r即为工号最少需要的数字长度
  while (del < total) {
    del *= 10;
    res++;
  }
  console.log(res);
  return res;
}

getWorkNum(260, 1); //1
getWorkNum(2600, 1); //1

/**
 import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long x = sc.nextLong();
        int y = sc.nextInt();
        int z = 1;
        int f = (int) Math.pow(26, y);
        while (f * Math.pow(10, z) < x) {
            z++;
        }
        System.out.println(z);
    }
}
 */
