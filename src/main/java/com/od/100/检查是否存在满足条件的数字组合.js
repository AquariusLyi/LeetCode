/**
 检查是否存在满足条件的数字组合
给定一个正整数数组，检查数组中是否存在满足规则的数字组合

规则：
A = B + 2C

输入描述:
第一行输出数组的元素个数。

接下来一行输出所有数组元素，用空格隔开。
输出描述:
如果存在满足要求的数，在同一行里依次输出规则里A/B/C的取值，用空格隔开。

如果不存在，输出0。

示例1：
输入
4
2 7 3 0
输出
7 3 2
说明
7 = 3 + 2 * 2
示例2：
输入
3
1 1 1
输出
0
说明
找不到满足条件的组合
备注:

数组长度在3-100之间。

数组成员为0-65535，数组成员可以重复，但每个成员只能在结果算式中使用一次。如：数组成员为[0, 0, 1, 5]，0出现2次是允许的，但结果0 = 0 + 2 * 0是不允许的，因为算式中使用了3个0。

用例保证每组数字里最多只有一组符合要求的解。
 */

function check() {
  let n = readline().trim();
  let ints = readline().trim().split(/\s+/).map(Number);

  let list = [];

  for (let i = 0; i < n; i++) {
    //对输入的list遍历 为A
    for (let j = 0; j < n; j++) {
      //对输入的list遍历 为B
      if (i == j) {
        //下标相同为同一值，跳过
        continue;
      }
      for (let k = 0; k < n; k++) {
        if (i == k || j == k) {
          //下标相同为同一值，跳过
          continue;
        }
        if (ints[i] == ints[j] + 2 * ints[k]) {
          //进行A=B+2C处理判断
          list.push(ints[i]);
          list.push(ints[j]);
          list.push(ints[k]);
        }
      }
    }
  }

  if (list.length == 0) {
    console.log(0);
  } else {
    console.log(list);
  }
}

/**
 
import java.util.Scanner;
public class Main{
    public static void main(String args[]){
        Scanner s = new Scanner(System.in);
        while(s.hasNext()){
            int length = s.nextInt();
            int arr[] = new int [length];
            for(int i=0;i<length;i++){
                arr[i] = s.nextInt();
            }
            sort(arr,0,length-1);
            int i;
            boolean end = false;
            for(i=0;i<length-1;i++){
                for(int j=0;j<length-1;j++){
                    if(j==i)
                        continue;
                    int sum = arr[i]+arr[j]*2;
                    if(sum>arr[length-1])
                        break;
                    int max = i>j ? i : j;
                    for(int k=max+1;k<length;k++){
                        if(sum == arr[k]){
                            System.out.println(arr[k]+" "+arr[i]+" "+arr[j]);
                            end = true;
                            break;
                        }
                    }
                    if(end)
                        break;
                }
                if(end)
                    break;
            }
            if(i==length-1){
                System.out.println(0);
        }
        }
    }
    static void sort(int arr[], int left, int right){
        if(left>=right)
            return;
        int sign = arr[left];
        int l = left;
        int r = right;
        while(l<r){
            while(arr[r]>=sign && l<r)
                r--;
            arr[l] = arr[r];

            while(arr[l]<=sign && l<r)
                l++;
            arr[r] = arr[l];

        }
        arr[l] = sign;
        sort(arr,left,r);
        sort(arr,l+1,right);
    }
}
 */
