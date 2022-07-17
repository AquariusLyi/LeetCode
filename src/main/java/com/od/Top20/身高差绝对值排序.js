/**
 
小朋友排队

 小明今年升学到了小学1年纪来到新班级后，发现其他小朋友身高参差不齐
然后就想基于各小朋友和自己的身高差，对他们进行排序，请帮他实现排序

输入描述
第一行为正整数 h和n  
0<h<200 为小明的身高   0<n<50 为新班级其他小朋友个数
第二行为n各正整数
h1 ~ hn分别是其他小朋友的身高 取值范围0<hi<200 且n个正整数各不相同

输出描述
输出排序结果，各正整数以空格分割
和小明身高差绝对值最小的小朋友排在前面，和小明身高差绝对值最大的小朋友排在后面
如果两个小朋友和小明身高差一样  则个子较小的小朋友排在前面

示例一
输入
100 10
95 96 97 98 99 101 102 103 104 105
输出
99 101 98 102 97 103 96 104 95 105

说明  小明身高100
班级学生10个  身高分别为

https://www.cnblogs.com/Jukim/p/16050756.html
 */

function compareHight(str1, str2) {
  let input = str1.trim().split(/\s+/g).map(Number);
  let tall = input[0];
  let len = input[1];
  let arr = str2.trim().split(/\s+/g).map(Number);
  let map = new Map();
  for (let i = 0; i < len; i++) {
    const frequent = Math.abs(tall - arr[i]);
    map.set(arr[i], frequent);
  }
  const list = [...map.keys()];
  list.sort(function (a, b) {
    if (map.get(a) == map.get(b)) {
      return a - b;
    } else {
      return map.get(a) - map.get(b);
    }
  });
  console.log(list.join(" "));
}

compareHight("100 10", "95 96 97 102 101 99 98 103 104 105");

//打印结果为：99 101 98 102 97 103 96 104 95 105

/**
 java

public class Main0006 {
  public static void main(String[] args) {
    try (Scanner scanner = new Scanner(System.in)) {
      int h = scanner.nextInt();
      int n = scanner.nextInt();
      List<Integer> highs = new ArrayList<>(n);
      for (int i = 0; i < n; i++) {
        highs.add(scanner.nextInt());
      }
      solution(h, highs);
    }
  }

  private static void solution(int h, List<Integer> highs) {
    highs.sort((h1, h2) -> {
      int diff1 = Math.abs(h1 - h);
      int diff2 = Math.abs(h2 - h);
      return diff1 == diff2 ? h1 - h2 : diff1 - diff2;
    });

    for (int i = 0; i < highs.size(); i++) {
      System.out.print(highs.get(i));
      if (i != highs.size() - 1) {
        System.out.print(" ");
      }
    }
  }
}
 */
