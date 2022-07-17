/**
查找众数及中位数

1.众数是指一组数据中出现次数量多的那个数，众数可以是多个
2.中位数是指把一组数据从小到大排列，最中间的那个数，如果这组数据的个数是奇数，那最中间那个就是中位数，如果这组数据的个数为偶数，那就把中间的两个数之和除以2，所得的结果就是中位数
3.查找整型数组中元素的众数并组成一个新的数组，求新数组的中位数

输入描述:
输入一个一维整型数组，数组大小取值范围 0<N<1000，数组中每个元素取值范围 0<E<1000
输出描述:
输出众数组成的新数组的中位数

众数是指一组数据中出现次数多的数，众数可以是多个

中位数是指把一组数据从小到大排列，最中间的那个数，
如果这组数据的个数是奇数，那最中间那个就是中位数，如果这组数据的个数为偶数，那就把中间的两个数之和除以2就是中位数

查找整型数组中元素的众数并组成一个新的数组，求新数组的中位数。

输入描述
输入一个一维整型数组，数组大小取值范围   0<n<1000
数组中每个元素取值范围，  0<e<1000

输出描述
输出众数组成的新数组的中位数

示例一
输入：
10 11 21 19 21 17 21 16 21 18 16
输出
21

示例二
输入
2 1 5 4 3 3 9 2 7 4 6 2 15 4 2 4
输出
3

示例三
输入
5 1 5 3 5 2 5 5 7 6 7 3 7 11 7 55 7 9 98 9 17 9 15 9 9 1 39
输出
7   
 */

function getMiddleNum(str) {
  let split = str.trim().split(/\s+/g).map(Number);
  //   众数中的中数
  let map = new Map();
  split.forEach((item) => {
    if (map.has(item)) {
      const num = map.get(item);
      map.set(item, num + 1);
    } else {
      map.set(item, 1);
    }
  });
  // js  map 排序问题 1
  let sortArr = Array.from(map.values()).sort((a, b) => a - b);
  let max = sortArr[sortArr.length - 1];
  let result = [];
  for (const [key, val] of map.entries()) {
    if (val == max) {
      let temp = new Array(val).fill(key);
      result.push(...temp);
    }
  }

  //   js map 排序问题处理 2
  //   let sortArr = Array.from(map).sort((a, b) => a[1] - b[1]);
  //   let max = sortArr[sortArr.length - 1][1];
  //   let result = [];
  //   sortArr.forEach((item) => {
  //     if (item[1] == max) {
  //       let temp = new Array(max).fill(item[0]);
  //       result.push(...temp);
  //     }
  //   });

  result.sort((a, b) => a - b);
  let out = "";
  let len = result.length;
  if (len % 2 == 0) {
    let left = +result[len / 2 - 1]; // [0,1,2,3,4,5]
    let right = +result[len / 2]; // [0,1,2,3]
    out = (left + right) / 2;
  } else {
    out = result[Math.floor(len / 2) + 1];
  }
  console.log(out);
}
getMiddleNum("10 11 21 19 21 17 21 16 21 18 16");
getMiddleNum("2 1 5 4 3 3 9 2 7 4 6 2 15 4 2 4");
getMiddleNum("5 1 5 3 5 2 5 5 7 6 7 3 7 11 7 55 7 9 98 9 17 9 15 9 9 1 39");

/**
 java

解法一：

import java.util.*;
public class Main {
    public static void main(String[] args) {
        // 输入
        Scanner scanner = new Scanner(System.in);
        String input = scanner.nextLine();
        String[] s = input.split(" ");
        int[] nums = new int[s.length];
        for (int i = 0; i < nums.length; i++) {
            nums[i] = Integer.parseInt(s[i]);
        }
        scanner.close();
        // 获取众数数组和中位数
        Integer[] manyNums = getManyArr(nums);
        int medium = 0;
        int len = manyNums.length;
        if (len % 2 == 0) {
            medium = (manyNums[len / 2 - 1] + manyNums[len / 2]) / 2;
        } else {
            medium = manyNums[len / 2];
        }
        System.out.println(medium);
    }
    
    private static Integer[] getManyArr(int[] arr) {
        if (arr == null) {
            return new Integer[0];
        }
        // 将数组元素和出现的次数转换为key-value
        Map<Integer, Integer> countMap = new HashMap<>();
        for (int i = 0; i < arr.length; i++) {
            int current = arr[i];
            if (countMap.containsKey(current)) {
                Integer count = countMap.get(current);
                countMap.put(current, ++count);
            } else {
                countMap.put(current, 1);
            }
        }
        // 获取出现最多的次数
        int countMax = 0;
        for (int value : countMap.values()) {
            if (value > countMax) {
                countMax = value;
            }
        }
        // 获取众数，并排序
        List<Integer> list = new ArrayList<>();
        for (int key : countMap.keySet()) {
            if (countMap.get(key) == countMax) {
                list.add(key);
            }
        }
        list.sort(new Comparator<Integer>() {
            @Override
            public int compare(Integer o1, Integer o2) {
                return o1 - o2;
            }
        });
        Integer[] newArr = new Integer[list.size()];
        return list.toArray(newArr);
    }
}

解法二：

import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        HashMap<Integer, Integer> map = new HashMap<>();
        int max = 0;
        List<Integer> list =new ArrayList<>();
        while (in.hasNextInt()) {
            int num = in.nextInt();
            map.merge(num,1,(a,b)->a+b);
            if (map.get(num)>max){
                list.clear();
                list.add(num);
                max = map.get(num);
            }else if (map.get(num)==max){
                list.add(num);
            }
        }
        list.sort(Integer::compare);
        int n = list.size();
        if (n%2==0){
            System.out.print((list.get(n/2)+list.get(n/2-1))/2);
        }else{
            System.out.print(list.get(n/2));
        }
    }
}


 */
