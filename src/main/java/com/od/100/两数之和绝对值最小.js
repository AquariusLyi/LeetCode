/**
两数之和绝对值最小

给定一个从小到大的有序整数序列（存在正整数和负整数）数组 nums ，请你在该数组中找出两个数，其和的绝对值(|nums[x]+nums[y]|)为最小值，并返回这个绝对值。
每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。

输入描述:
一个通过空格分割的有序整数序列字符串，最多1000个整数，且整数数值范围是 -65535~65535。
输出描述:
两数之和绝对值最小值

示例1
输入
-3 -1 5 7 11 15
输出
2
说明
因为 |nums[0] + nums[2]| = |-3 + 5| = 2 最小，所以返回 2

 */

function minSum() {
  let nums = readline().trim().split(/\s+/).map(Number);
  let minNum = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      let temp = Math.abs(nums[i] + nums[j]);

      if (minNum > temp) {
        minNum = temp;
      }
    }
  }
  console.log(minNum);
}

/**
 




解法一：

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException{
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String str;
        while ((str=br.readLine())!=null) {
            String[] nums=str.split(" ");
            int minNum=Integer.MAX_VALUE;
            for(int i=0;i<nums.length-1;i++){
                for(int  j=i+1;j<nums.length;j++){
                    int temp=Math.abs((Integer.valueOf(nums[i])+Integer.valueOf(nums[j])));
                
                    if(minNum>temp){
                        minNum=temp;
                    }
                }
            }
            System.out.println(minNum);
        }
    }
}

// 解法二 

public class Main{
 
    public static void main(String[] args) {
 
        Scanner sc = new Scanner(System.in);
 
        String[] strings = sc.nextLine().split(" ");
        int n = strings.length;
 
        List<Integer> listFu = new ArrayList<>();       //负数数组
        List<Integer> listZhen = new ArrayList<>();     //正数数组
 
        for(int i=0;i<n;i++){
            int num = Integer.valueOf(strings[i]);
            if(num<0){
                listFu.add(num);
            }else {
                listZhen.add(num);
            }
        }
 
        int lenFu = listFu.size();
        int lenZhen = listZhen.size();
        int res = Integer.MAX_VALUE;
 
        if(listFu.size() == 0){
            res = listZhen.get(0) + listZhen.get(1);        //如果没有负数，则最小的两个正数相加即为最小值
        }else if(listZhen.size() == 0){
            res = Math.abs(listFu.get(lenFu-1) + listFu.get(lenFu-2));        //如果没有正数，则最大的两个负数相加即为最小值
        }else {
            for(int i=0;i<lenFu;i++){
                for(int j=0;j<lenZhen;j++){
                    int count = Math.abs(listFu.get(i)+listZhen.get(j));        //正负数都存在则遍历正负两数之和
                    res = Math.min(res,count);
                }
            }
        }
 
        System.out.println(res);
    }
 
}

 */
