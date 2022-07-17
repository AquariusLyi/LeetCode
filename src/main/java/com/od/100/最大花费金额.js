/**
尽可能花费最大资金额
购买最多商品

最大花费金额

双11众多商品进行打折销售，小明想购买一些自己心意的商品
但由于受购买资金限制，所以他决定从众多心意商品中购买3件，而且想尽可能的花完资金
现在请你设计一个程序帮助小明计算尽可能花费的最大资金额

输入描述
第一行为整型数组M 数组长度小于100 数组元素记录单个商品的价格
单个商品价格<1000
第二行输入为购买资金的额度R
R<100000

输出描述
输出为满足上述条件的最大花费额度
如果不存在满足上述条件的商品请返回-1

例子1
输入
23,26,36,27
78
输出
76

例子2
输入
23,30,40
26
输出
-1

备注：输入格式正确
https://www.cnblogs.com/Jukim/p/16051637.html

 */

// 索引变化处理
function getShopMoney(str1, str2) {
  let splitArr = str1.trim().split(",").map(Number);
  let money = parseInt(str2.trim());
  let len = splitArr.length;
  splitArr.sort((a, b) => a - b);
  let sum = -1; //巧妙！！
  for (let i = 0; i < len - 3; i++) {
    sum = splitArr[i] + splitArr[i + 1] + splitArr[i + 2];
    if (sum > money) {
      if (i != 0) {
        sum = splitArr[i - 1] + splitArr[i] + splitArr[i + 1];
      }
      break;
    }
  }
  console.log(sum);
}
getShopMoney("23,26,36,27", "78");
getShopMoney("23,30,40", "26");

// 穷举处理
function getShopMoney2(str1, str2) {
  let splitArr = str1.trim().split(",").map(Number);
  let money = parseInt(str2.trim());
  let len = splitArr.length;
  splitArr.sort((a, b) => a - b);
  let sum = 0;
  let set = new Set();
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      for (let k = j + 1; k < len; k++) {
        sum = splitArr[i] + splitArr[j] + splitArr[k];
        if (sum <= money) {
          set.add(sum);
        }
      }
    }
  }
  let arr = Array.from(set).sort((a, b) => a - b);
  if (!arr.length) {
    console.log("-1");
  } else {
    console.log(arr[arr.length - 1]);
  }
}
getShopMoney2("23,26,36,27", "78");
getShopMoney2("23,30,40", "26");

/**
 java

 import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Scanner;

public class Main0008 {
  private static final List<List<Integer>> combines = new ArrayList<>();
  private static final List<Integer> combine = new ArrayList<>(3);
  private static int res = -1;

  public static void main(String[] args) {
    try (Scanner scanner = new Scanner(System.in)) {
      String m = scanner.nextLine();
      int r = scanner.nextInt();
      solution(m, r);
    }
  }

  private static void solution(String m, int r) {

    String[] goodsPricesString = m.split(",");
    int[] goodsPrices = new int[goodsPricesString.length];
    for (int i = 0; i < goodsPricesString.length; i++) {
      goodsPrices[i] = Integer.parseInt(goodsPricesString[i]);
    }
    Arrays.sort(goodsPrices);
    if (goodsPrices.length < 3 ||
        goodsPrices[0] + goodsPrices[1] + goodsPrices[2] > r) {
      System.out.println(-1);
      return;
    }

    takeGoods(goodsPrices, 0);
    combines.stream()
        .map(list -> sum(list))
        .sorted(Integer::compareTo)
        .forEach(sum -> {
          if (sum > res && sum <= r) {
            res = sum;
          }
        });

    System.out.println(res);

  }

  private static void takeGoods(int[] goodsPrices, int start) {
    if (combine.size() == 3) {
      combines.add(new ArrayList<>(combine));
      return;
    }
    for (int i = start; i < goodsPrices.length; i++) {
      combine.add(goodsPrices[i]);
      takeGoods(goodsPrices, i + 1);
      combine.remove(combine.size() - 1);
    }
  }

  private static Integer sum(List<Integer> prices) {
    int sum = 0;
    for (Integer i : prices) {
      sum += i;
    }
    return sum;
  }
}
 */
