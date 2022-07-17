/**
 华为机试：DNA序列


 DNA序列
描述
一个 DNA 序列由 A/C/G/T 四个字母的排列组合组成。 G 和 C 的比例（定义为 GC-Ratio ）是序列中 G 和 C 两个字母的总的出现次数除以总的字母数目（也就是序列长度）。在基因工程中，这个比例非常重要。因为高的 GC-Ratio 可能是基因的起始点。
给定一个很长的 DNA 序列，以及限定的子串长度 N ，请帮助研究人员在给出的 DNA 序列中从左往右找出 GC-Ratio 最高且长度为 N 的第一个子串。
DNA序列为 ACGT 的子串有: ACG , CG , CGT 等等，但是没有 AGT ， CT 等等

数据范围：字符串长度满足 1≤n≤1000，输入的字符串只包含 A/C/G/T 字母

输入描述：
输入一个string型基因序列，和int型子串的长度

输出描述：
找出GC比例最高的子串,如果有多个则输出第一个的子串

示例1：
输入
ACGT
2
1
2
输出
CG
1
说明
ACGT长度为2的子串有AC,CG,GT3个，其中AC和GT2个的GC-Ratio都为0.5，CG为1，故输出CG

示例2：
输入
AACTGTGCACGACCTGA
5
1
2
输出
GCACG
1
说明
虽然CGACC的GC-Ratio也是最高，但它是从左往右找到的GC-Ratio最高的第2个子串，所以只能输出GCACG。

思路分析：
题目中主要信息：

输入的字符串中只有ACGT四种字符
限定长度为nnn的子串，求其中CG比例最高的第一个子串
解读： 长度限定的情况下，要找比例越高即找出现次数越多
可以有两种方法：

暴力搜索：遍历字符串每个位置作为起始，然后遍历以这个字符作为起始的长为n的子串，分别统计子串中CG的数量，与之前记录的最大值比较，然后更新记录下最大值及最大CG含量子串的起始位置。

最后根据最终的起始位置和长度n利用substr函数输出，这样由左到右地找出来的就一定是第一个。

时间复杂度：O(mn)，其中m为字符串的长度，n为限定的子串长度，需要遍历字符串每个位置为起点的子串

这里就不写了。

滑动窗口：首先用一个长度为n的窗口覆盖字符串前n部分子串，统计这里的CG数量，并暂时作为最大值。然后窗口右移，如果左边出去的是CG那么窗口内的CG数量减少一个，如果右边进来的是CG那么窗口内的CG数量增加一个，每次滑动都统计窗口内的CG数量，与临时最大值比较，记录下最大窗口的起始下标。

窗口右端抵达字符串末尾时结束，根据下标用substr函数输出字符串含CG最高的子串。

时间复杂度：O(m)，其中m为字符串的长度，窗口滑动相当于遍历字符串
————————————————
版权声明：本文为CSDN博主「小朱小朱绝不服输」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_44052055/article/details/124121185


 */

import java.util.*;
public class Main {
    public static void main (String[] args) {
        Scanner in = new Scanner(System.in);
        while (in.hasNext()) {
            String str = in.nextLine();
            int n = in.nextInt();
            char[] ch = str.toCharArray();
            int start = 0, count = 0, max = 0;
            for (int i = 0; i < n; i++) {  // 最开始的窗口
                if (ch[i] == 'C' || ch[i] == 'G') {
                    count++;
                }
            }
            max = count;  // 最开始窗口的GC数量
            int left = 1, right = n;  // 从录入窗口的左右点右移一位开始
            while (right < ch.length) {
                if (ch[left - 1] == 'C' || ch[left - 1] == 'G') { // 左边出去的是CG
                    count--;
                }
                if (ch[right] == 'C' || ch[right] == 'G') { // 右边进来的是CG
                    count++;
                }
                if (count > max) {
                    max = count;
                    start = left;
                }
                left++;
                right++;
            }
            System.out.println(str.substring(start, start + n));
        }
    }
}


/**
 java
 

 import java.util.*;
public class Main {
    public static void main (String[] args) {
        Scanner in = new Scanner(System.in);
        while (in.hasNext()) {
            String str = in.nextLine();
            int n = in.nextInt();
            char[] ch = str.toCharArray();
            int start = 0, count = 0, max = 0;
            for (int i = 0; i < n; i++) {  // 最开始的窗口
                if (ch[i] == 'C' || ch[i] == 'G') {
                    count++;
                }
            }
            max = count;  // 最开始窗口的GC数量
            int left = 1, right = n;  // 从录入窗口的左右点右移一位开始
            while (right < ch.length) {
                if (ch[left - 1] == 'C' || ch[left - 1] == 'G') { // 左边出去的是CG
                    count--;
                }
                if (ch[right] == 'C' || ch[right] == 'G') { // 右边进来的是CG
                    count++;
                }
                if (count > max) {
                    max = count;
                    start = left;
                }
                left++;
                right++;
            }
            System.out.println(str.substring(start, start + n));
        }
    }
}

 */
