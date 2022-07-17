/**

玩牌高手

给定一个长度为n的整型数组，表示一个选手在n轮内可选择的牌面分数。选手基于规则选牌，请计算所有轮结束后其可以获得的最高总分数。选择规则如下：
1、在每轮里选手可以选择获取该轮牌面，则其总分数加上该轮牌面分数，为其新的总分数。
2、选手也可不选择本轮牌面直接跳到下一轮，此时将当前总分数还原为3轮前的总分数，若当前轮次小于等于3（即在第1、2、3轮选择跳过轮次），则总分数置为0。
3、选手的初始总分数为0，且必须依次参加每一轮。

输入描述:
第一行为一个小写逗号分割的字符串，表示n轮的牌面分数，1<= n <=20。
分数值为整数，-100 <= 分数值 <= 100。
不考虑格式问题。
输出描述:
所有轮结束后选手获得的最高总分数。

示例1
输入
1,-5,-6,4,3,6,-2

输出
11

说明
总共有7轮牌面。
第一轮选择该轮牌面，总分数为1。
第二轮不选择该轮牌面，总分数还原为0。
第三轮不选择该轮牌面，总分数还原为0。
第四轮选择该轮牌面，总分数为4。
第五轮选择该轮牌面，总分数为7。
第六轮选择该轮牌面，总分数为13。
第七轮如果不选择该轮牌面，则总分数还原到3轮1前分数，即第四轮的总分数4，如果选择该轮牌面，总分数为11，所以选择该轮牌面。
因此，最终的最高总分为11。

 */

function playerOfTop() {
  let arr = readline().trim().split(",");
  let nums = arr.map(Number);
  let score = [];
  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i < 3) {
      if (nums[i] <= 0) {
        score[i] = 0;
      } else {
        score[i] = sum + nums[i];
      }
    } else {
      if (nums[i] > 0) {
        score[i] = sum + nums[i];
      } else {
        score[i] = Math.max(sum + nums[i], score[i - 3]);
      }
    }
    sum = score[i];
  }
  console.log(score[arr.length - 1]);
}

/**
 java
 
答案：
解法一：

import java.util.*;

public class Main {

    public static void main(String[] args) {
        testAdd();
    }

    public static void testAdd(){
        //1,-5,-6,4,3,6,-2
        Scanner scan = new Scanner(System.in);
        while (scan.hasNext()) {// 注意，如果输入是多个测试用例，请通过while循环处理多个测试用例
            String str = scan.nextLine();
            if(str != null){
                String[] split = str.split(",");
                int num = 0;
                int[] ints = new int[split.length];
                for (int i = 0; i < split.length; i++) {
                    int var = Integer.parseInt(split[i]);
                    //前三位数 负数的话不加
                     if(i < 3){
                        num += var;
                        if(num < 0){
                            num  = 0;
                        }
                    }else{
                        //判断是否要弃权
                        int anInt = ints[i - 3];//前三轮总分数是
                        if(anInt > (num + var)){
                            num = anInt;
                        }else{
                            num += var;
                        }
                    }
                    ints[i] = num;//记录每轮的总分数
                }
                if(ints.length > 0){
                    if(split.length >= 20){
                        System.out.println(ints[19]);
                    }else {
                        System.out.println(ints[split.length - 1]);
                    }
                }
            }
        }
    }
}

// 解法二

import java.util.*;

public class playerOfTop {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        String[] str = in.nextLine().split(",");
        in.close();
        int[] nums = new int[str.length];
        for (int i = 0; i < str.length; i++) {
            nums[i] = Integer.parseInt(str[i]);
        }
        int[] score = new int[str.length];
        int sum = 0;
        for (int i = 0; i < nums.length; i++) {
            if (i < 3) {
                if (nums[i] <= 0) {
                    score[i] = 0;
                } else {
                    score[i] = sum + nums[i];
                }
            } else {
                if (nums[i] > 0) {
                    score[i] = sum + nums[i];
                } else {
                    score[i] = Math.max(sum + nums[i], score[i - 3]);
                }
            }
            sum = score[i];
        }
        System.out.println(score[str.length - 1]);
    }
}

 */
