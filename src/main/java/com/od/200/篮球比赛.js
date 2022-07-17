/**
 篮球比赛

 篮球比赛
题目描述
篮球(5V5)比赛中，每个球员拥有一个战斗力，每个队伍的所有球员战斗力之和为该队伍的总体战斗力。现有 10 个球员准备分为两队进行训练赛，教练希望 2 个队伍的战斗力差值能够尽可能的小，以达到最佳训练效果。给出 10 个球员的战斗力，如果你是教练，你该如何分队，才能达到最佳训练效果？请输出该分队方案下的最小战斗力差值。
输入描述
10 个篮球队员的战斗力(整数，范围[1,10000]),战斗力之间用空格分隔，如:10 9 8 7 6 5 4 3 2 1 不需要考虑异常输入的场景。
输出描述
最小的战斗力差值，如:1
示例 1
输入
10 9 8 7 6 5 4 3 2 1
输出
1

 */

function basketball(args) {
  // let ints = new Array(10).fill(0);
  let ints = args.trim().split(/\s+/).map(Number);
  let count = 0;
  for (let i = 0; i < 10; i++) {
    count += ints[i];
  }
  let n;
  let min = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < 6; i++) {
    for (let j = i + 1; j < 7; j++) {
      for (let k = j + 1; k < 8; k++) {
        for (let l = k + 1; l < 9; l++) {
          for (let m = l + 1; m < 10; m++) {
            n = ints[i] + ints[j] + ints[k] + ints[l] + ints[m];
            min = Math.min(min, Math.abs(count - 2 * n));
          }
        }
      }
    }
  }
  console.log(min);
}

basketball("10 9 8 7 6 5 4 3 2 1");

/**
 
 算法一：
1）先求出总数组的平均值mid
2）新建两个集合dui1，dui2；两个队战斗力count1，count2
3）再将数组与mid进行比较，最接近的放入其中一队集合中并计算此时队伍战斗力
规则：当两队队员数量不同时，将队员加入队员较少的队伍；当两队队员数量相同时，将队员加入战斗力较小的队伍

public class Main{
 
    public static void main(String[] args) {
 
        Scanner sc = new Scanner(System.in);
 
        List<Integer> list = new ArrayList<>();
        int count = 0;
        for(int i=0;i<10;i++){
            list.add(sc.nextInt());
            count += list.get(i);    //总战力
        }
 
        int mid = count/2;    //两队平均战力
        List<Integer> dui1 = new ArrayList<>();    //一队队员
        List<Integer> dui2 = new ArrayList<>();    //二队队员
        int count1 = 0;    //一队总战力
        int count2 = 0;    //二队总战力
 
        while (list.size()>0){
            int index = 0;
            int min = Integer.MAX_VALUE;
            for(int i=0;i<list.size();i++){
                int n = Math.abs(list.get(i)-mid);
                min = Math.min(n,min);
                if(min == n){    //求最接近平均数的队员及其下标
                    index = i;
                }
            }
            int num = list.get(index);
            list.remove(index);
            if(dui1.size()>dui2.size() || (count1>count2 && dui1.size()==dui2.size())){
                dui2.add(num);
                count2+=num;
            }else {
                dui1.add(num);
                count1+=num;
            }
        }
 
        System.out.println(Math.abs(count1-count2));
    }
 
}

算法二：
因为题目确定了是10个队员分两队，也就是每个队5个人，我们可以先固定前四个队员，接着遍历剩下的六名选择其中一个队员为一队，剩下5人为二队，计算两队战力并求差。然后固定前三个队员+第五位队员，接着遍历后面的五位队员选择其中一个队员为一队，剩下5人为二队，计算两队战力并求差。。。。最后求差值的最小值

public class Main{
 
    public static void main(String[] args) {
 
        Scanner sc = new Scanner(System.in);
 
        int[] ints = new int[10];
        int count = 0;
        for(int i=0;i<10;i++){
            ints[i] = sc.nextInt();
            count+=ints[i];
        }
        int n ;
        int min = Integer.MAX_VALUE;
        for(int i=0;i<6;i++){
            for(int j=i+1;j<7;j++){
                for(int k=j+1;k<8;k++){
                    for(int l=k+1;l<9;l++){
                        for(int m=l+1;m<10;m++){
                            n = ints[i]+ints[j]+ints[k]+ints[l]+ints[m];
                            min = Math.min(min,Math.abs(count-2*n));
                        }
                    }
                }
            }
        }
        System.out.println(min);
    }
 
}
 */
