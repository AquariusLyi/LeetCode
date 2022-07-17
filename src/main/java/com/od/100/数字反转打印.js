/**
数字反转打印

标题：数字反转打印 | 时间限制：1秒 | 内存限制：262144K | 语言不限


小华是个很有对数字很敏感的小朋友，他觉得数字的不同排列方式有特殊美感。

某天，小华突发奇想，如果数字多行排列，第一行1个数，第二行2个，第三行3个，即第n行有n个数字，并且奇数行正序排列，偶数行逆序排列，数字依次累加。

这样排列的数字一定很有意思。聪明的你能编写代码帮助小华完成这个想法吗？

规则总结如下：

a、每个数字占据4个位置，不足四位用‘*’补位，如1打印为1***。
b、数字之间相邻4空格。
c、数字的打印顺序按照正序逆序交替打印,奇数行正序，偶数行逆序。
d、最后一行数字顶格，第n-1行相对第n行缩进四个空格

输入描述

第一行输入为N，表示打印多少行; 1<=N<=30

输入：2

输出描述

XXXX1***

3***XXXX2***

示例1  输入输出示例仅供调试，后台判题数据一般不包含示例

输入

2

输出

1***

3*** 2***

备注

符号*表示，数字不满4位时的补位，符号X表示数字之间的空格。注意实际编码时不需要打印X，直接打印空格即可。此处为说明题意，故此加上X。
 */

function stampWord() {
  let no = readline().trim();
  let arr = [];
  let start = 0;
  let temp = [];
  for (let i = 0; i < no; i++) {
    temp = [];
    for (let j = 0; j < i + 1; j++) {
      start++;
      temp.push(start);
    }
    arr.push(temp);
  }
  arr.forEach((item, i) => {
    if ((i + 1) % 2 == 0) {
      const even = item.reverse();
      console.log(even.join("***  ") + "***");
    } else {
      console.log(item.join("***  ") + "***");
    }
  });
}
stampWord();

/**
 java

 public static void main(String[] args) {
 
        Scanner sc = new Scanner(System.in);
 
        int n = sc.nextInt();
 
        List<List<String>> lists = new ArrayList<>();
 
        for(int i=1;i<=n;i++){      //为了方便i初始值设为1
            List<String> list = new ArrayList<>();
            int fn = firstNum(i);     //先计算出行头数字
            lists.forEach(x->{
                x.add(0,"    ");        //每加一行，前面的所有行前面都加一个"    "
            });
            for(int j=0;j<i;j++){
                String temp = fn++ + "***";        //每个数后面都加三个*，因为至少一位数，所以只要加三个
                list.add(temp.substring(0,4));     //头数向后递加，只取前面四个字符串
                if(j!=i-1){
                    list.add("    ");       //除了最后一个数，其余全部加上"    "
                }
            }
            if((i)%2==0){
                Collections.reverse(list);      //偶数行进行翻转
            }
            lists.add(list);
        }
 
        lists.forEach(x->{
            String res = "";        //把所有行转化成字符串类型
            for(int i=0;i<x.size();i++){
                res+=x.get(i);
            }
            System.out.println(res);
        });
    }
 
    public static int firstNum(int n){
        if(n==1){
            return 1;
        }
        return firstNum(n-1)+n-1;       //根据规律推出第n行的头为n-1的头加上n-1
    }
 */
