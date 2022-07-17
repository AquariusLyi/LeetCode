/**
 信道分配
标题：
【信道分配】

算法工程师小明面对着这样一个问题 ，需要将通信用的信道分配给尽量多的用户:

信道的条件及分配规则如下:

1)所有信道都有属性:”阶”。阶为 r的信道的容量为 2^r比特;

2)所有用户需要传输的数据量都一样:D比特;

3)一个用户可以分配多个信道，但每个信道只能分配给一个用户;

4)只有当分配给一个用户的所有信道的容量和>=D，用户才能传输数据;

给出一组信道资源，最多可以为多少用户传输数据?

输入描述

第一行，一个数字 R。R为最大阶数。0<=R<20

第二行，R+1个数字，用空格隔开。

代表每种信道的数量 Ni。按照阶的值从小到大排列。

0<=i<=R,0<=Ni<1000.

第三行，一个数字 D。

D为单个用户需要传输的数据量。0<D<1000000

输出描述

一个数字,代表最多可以供多少用户传输数据。

示例 1  输入输出示例仅供调试，后台判题数据一般不包含示例

输入

5
10 5 0 1 3 2
30
输出

4


华为
说明
最大阶数为5.
信道阶数：0       1    2    3    4    5
信道容量：1       2    4    8    16  32  
信道个数：10     5    0    1    3    2
单个用户需要传输的数据量为30
可能存在很多分配方式，举例说明：
分配方式1：
1)     32*1 = 32
2)     32*1 = 32
3)     16*2 = 32
4)     16*1 + 8*1 + 2*3 = 30
剩下2*2 + 1*10=14不足以再分一个用户了。
分配方式2：
1)     16*1 + 8*1 + 2*3 = 30
2)     16*1 + 2*2 + 1*10 = 30
3)     32*1 = 32
4)     32*1 = 32
剩下16*1=16不足以再分一个用户了。
分配方式3：
1)     16*1 + 8*1 + 2*3 = 30
2)     16*1 + 2*2 + 1*10 = 30
4)     32*1 = 32
恰好用完。
虽然每种分配方式剩下的容量不同，但服务的用户数量是一致的。因为这个问题中我们只关心服务的用户数，所以我们认为这些分配方式等效。

解题思路
题目需要我们尽可能的分配最多的用户，也就是每个用户在满足信道需求的情况下信道容量要尽可能的小。
将所有信道求出并放入集合中
先将单独容量大于所需容量的信道剔除，因为它单独就能满足用户，不能让他与其他信道相加而浪费资源。
取出集合中最大的信道（count），
用（D-count=chazhi）求出还差多少信道满足需求。
取出集合中与chazhi最近的信道进行相加（count），如果和满足信道需求，则重复步骤3；如不满足，则重复步骤4
当所有信道相加都不满足需求时，程序结束！
 */
// let R = Number("5");
// let splitArr = "10 5 0 1 3 2".split(" ").map(i=>parseInt(i));

function xindao() {
  let R = Number(readline().trim());
  let splitArr = readline().trim().split(/\s+/).map(Number);
  let N = [];
  for (let i = 0; i <= R; i++) {
    N[i] = splitArr[i];
  }
  let D = Number(readline().trim());
  let list = [];

  let res = 0; //支持用户数量
  for (let i = 0; i <= R; i++) {
    for (let j = 0; j < N[i]; j++) {
      let num = Math.pow(2, i); //信道容量
      if (num >= D) {
        //信道容量大于用户需求时直接满足
        res++;
        continue;
      }
      list.push(num);
    }
  }

  let flag = true; //是否够一个用户使用
  while (flag) {
    let count = list[list.length - 1]; //取最大的信道
    list.splice(list.length - 1, 1); //取完需要剔除
    while (count < D && flag) {
      let min = Number.MAX_VALUE;
      let minIdx = 0;
      let temp = 0;
      for (let i = 0; i < list.length; i++) {
        temp += list[i];
        let chazhi = Math.abs(D - count - list[i]); //求出与所需信道最接近的信道
        min = Math.min(min, chazhi);
        if (min == chazhi) {
          minIdx = i;
        }
      }
      count += list[minIdx];
      list.splice(minIdx, 1);
      if (count >= D) {
        res++;
        break;
      }
      if (count + temp < D) {
        //总共的信道不够一个用户使用
        flag = false;
      }
    }
  }
  console.log(res);
}
xindao();
/**
 解题思路：
        题目需要我们尽可能的分配最多的用户，也就是每个用户在满足信道需求的情况下信道容量要尽可能的小。
将所有信道求出并放入集合中
先将单独容量大于所需容量的信道剔除，因为它单独就能满足用户，不能让他与其他信道相加而浪费资源。
取出集合中最大的信道（count），
用（D-count=chazhi）求出还差多少信道满足需求。
取出集合中与chazhi最近的信道进行相加（count），如果和满足信道需求，则重复步骤3；如不满足，则重复步骤4
当所有信道相加都不满足需求时，程序结束！
 */

/**
 java

 public class Main{
 
    public static void main(String[] args) {
 
        Scanner sc = new Scanner(System.in);
 
        int R = sc.nextInt();
 
        int[] N = new int[R+1];
        for(int i=0;i<=R;i++){
            N[i] = sc.nextInt();
        }
 
        int D = sc.nextInt();
        List<Integer> list = new ArrayList<>();
 
        int res = 0;    //支持用户数量
        for(int i=0;i<=R;i++){
            for(int j=0;j<N[i];j++){
                int num = (int) Math.pow(2,i);  //信道容量
                if(num>=D){ //信道容量大于用户需求时直接满足
                    res++;
                    continue;
                }
                list.add(num);
            }
        }
 
        boolean flag = true;    //是否够一个用户使用
        while (flag){
            int count = list.get(list.size()-1);    //取最大的信道
            list.remove(list.size()-1); //取完需要剔除
            while (count<D && flag){
                int min = Integer.MAX_VALUE;
                int minIdx = 0;
                int temp = 0;
                for(int i = 0;i<list.size();i++){
                    temp+=list.get(i);
                    int chazhi =  Math.abs(D-count-list.get(i));    //求出与所需信道最接近的信道
                    min = Math.min(min, chazhi);
                    if(min == chazhi){
                        minIdx = i;
                    }
                }
                count+=list.get(minIdx);
                list.remove(minIdx);
                if(count>=D){
                    res++;
                    break;
                }
                if(count+temp<D){   //总共的信道不够一个用户使用
                    flag = false;
                }
            }
        }
        System.out.println(res);
    }
 
}
 */

/**
 // 解法二：此解法正确率为60%，最终得分为120分（满分200分）
 
 public class Main{
 
    public static void main(String args[]) {
 
        Scanner scan=new Scanner(System.in);
        int R = scan.nextInt();
        int count[] = new int[R+1];
        for(int i=0; i<R+1; i++) {
            count[i] = scan.nextInt();
        }
        int D = scan.nextInt();
        scan.close();
        int total = 0;
        for(int i=0; i<count.length; i++) {
            int c1 = (int) Math.pow(2,i);
            total += count[i]*c1;
        }
        System.out.println(total/D);    //求出所有值对D进行整数除
    }
}
 */
