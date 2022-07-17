/**
 
整数对最小和

给定两个整数数组array1、array2，数组元素按升序排列。假设从array1、array2中分别取出一个元素可构成一对元素，现在需要取出k对元素，并对取出的所有元素求和，计算和的最小值
注意：两对元素如果对应于array1、array2中的两个下标均相同，则视为同一对元素。

输入描述:
输入两行数组array1、array2，每行首个数字为数组大小size(0 < size <= 100);
0 < array1[i] <= 1000
0 < array2[i] <= 1000
接下来一行为正整数k
0 < k <= array1.size() * array2.size()
输出描述:
满足要求的最小和

示例1
输入
3 1 1 2
3 1 2 3
2
输出
4
说明
用例中，需要取2对元素
取第一个数组第0个元素与第二个数组第0个元素组成1对元素[1,1];
取第一个数组第1个元素与第二个数组第0个元素组成1对元素[1,1];
求和为1+1+1+1=4，为满足要求的最小和
 */

// 两个for循环记录任意两对的和，然后对整数和进行排序，根据题目给的k值，得到题目要求的对数的最小值。

function minSum(str1, str2, str3) {
  let arr1 = str1.trim().split(/\s+/g).map(Number);
  let arr2 = str2.trim().split(/\s+/g).map(Number);
  let k = +str3.trim();
  let sum = 0;
  let res = [];
  for (let i of arr1) {
    for (let j of arr2) {
      res.push(i + j);
    }
  }
  res.sort((a, b) => a - b);
  for (let i = 0; i < k; i++) {
    sum += res[i];
  }
  return sum;
}

console.log(minSum("3 1 1 2", "3 1 2 3", "2"));

/*
java

private static void sum() {
    Scanner scanner = new Scanner(System.in);
    String[] arr = scanner.nextLine().split("\\s+");
    String[] arr1 = scanner.nextLine().split("\\s+");
    int count = scanner.nextInt();
    ArrayList<Integer> sums = new ArrayList<>();
    for (int i = 0; i < arr.length; i++) {
        for (int j = 0; j < arr1.length; j++) {
            sums.add(Integer.parseInt(arr[i]) + Integer.parseInt(arr1[j]));
        }
    }
    int sum = 0;
    Collections.sort(sums);
    for (int i = 0; i < count; i++) {
        sum += sums.get(i);
    }
    System.out.println(sum);
}


import java.util.PriorityQueue;
import java.util.Scanner;

public class minValueOfK {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        String[] str1 = in.nextLine().split(" ");
        int m = Integer.parseInt(str1[0]);
        int[] nums1 = new int[m];
        for (int i = 1; i < str1.length; i++) {
            nums1[i - 1] = Integer.parseInt(str1[i]);
        }
        String[] str2 = in.nextLine().split(" ");
        int n = Integer.parseInt(str2[0]);
        int[] nums2 = new int[n];
        for (int i = 1; i < str2.length; i++) {
            nums2[i - 1] = Integer.parseInt(str2[i]);
        }
        int k = in.nextInt();
        // 优先队列实现,小顶堆
        int min = 0;
        PriorityQueue<int[]> queue = new PriorityQueue<>((a, b) -> (nums1[a[0]] + nums2[a[1]]) - (nums1[b[0]] + nums2[b[1]]));
        // 把nums1索引加入队列
        for (int i = 0; i < Math.min(m, k); i++) {
            queue.add(new int[]{i, 0});
        }
        while (k > 0 && !queue.isEmpty()) {
            int[] idx = queue.poll();
            min += (nums1[idx[0]] + nums2[idx[1]]);
            // 为了避免重复，把nums2的索引增加
            if (idx[1] + 1 < n) {
                queue.add(new int[]{idx[0], idx[1] + 1});
            }
            k--;
        }
        System.out.println(min);
    }
}

*/
