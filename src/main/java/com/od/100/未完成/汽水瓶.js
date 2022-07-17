/**

汽水瓶

某商店规定：三个空汽水瓶可以换一瓶汽水，允许向老板借空汽水瓶（但是必须要归还）。

小张手上有n个空汽水瓶，她想知道自己最多可以喝到多少瓶汽水。

数据范围：输入的正整数满足1<=n<=100

注意：本题存在多组输入。输入的 0 表示输入结束，并不用输出结果。

输入例子1:
3
10
81
0
1
2
3
4
输出例子1:
1
5
40

例子说明1:

样例 1 解释：用三个空瓶换一瓶汽水，剩一个空瓶无法继续交换
样例 2 解释：用九个空瓶换三瓶汽水，剩四个空瓶再用三个空瓶换一瓶汽水，剩两个空瓶，向老板借一个空瓶再用三个空瓶换一瓶汽水喝完得一个空瓶还给老板 

————————————————
版权声明：本文为CSDN博主「Mendax92」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_41802443/article/details/123968770
 */

/**
 java

 public static int f(int n) {
    if (n == 1)
        return 0;
    if (n == 2)
        return 1;
    return n / 3 + f(n % 3 + n / 3);
}

public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    List<Integer> list = new ArrayList<>();
    while (sc.hasNext()) {
        int num = sc.nextInt();
        if (num != 0) {
            list.add(num);
        } else {
            break;
        }
    }
    for (int m : list) {
        System.out.println(f(m));
    }
    sc.close();
}

 */
