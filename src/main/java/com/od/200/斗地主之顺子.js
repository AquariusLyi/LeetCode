/**
 
13、斗地主之顺子
在斗地主扑克牌游戏中， 扑克牌由小到大的顺序为：3,4,5,6,7,8,9,10,J,Q,K,A,2，玩家可以出的扑克牌阵型有：单张、对子、顺子、飞机、炸弹等。
其中顺子的出牌规则为：由至少5张由小到大连续递增的扑克牌组成，且不能包含2。
例如：{3,4,5,6,7}、{3,4,5,6,7,8,9,10,J,Q,K,A}都是有效的顺子；而{J,Q,K,A,2}、 {2,3,4,5,6}、{3,4,5,6}、{3,4,5,6,8}等都不是顺子。
给定一个包含13张牌的数组，如果有满足出牌规则的顺子，请输出顺子。
如果存在多个顺子，请每行输出一个顺子，且需要按顺子的第一张牌的大小（必须从小到大）依次输出。
如果没有满足出牌规则的顺子，请输出No。

输入描述:
13张任意顺序的扑克牌，每张扑克牌数字用空格隔开，每张扑克牌的数字都是合法的，并且不包括大小王：
2 9 J 2 3 4 K A 7 9 A 5 6
不需要考虑输入为异常字符的情况
输出描述:
组成的顺子，每张扑克牌数字用空格隔开：
3 4 5 6 7

示例1：
输入
2 9 J 2 3 4 K A 7 9 A 5 6
输出
3 4 5 6 7
说明
13张牌中，可以组成的顺子只有1组：3 4 5 6 7

示例2：
输入
2 9 J 10 3 4 K A 7 Q A 5 6
输出
3 4 5 6 7

9 10 J Q K A
说明
13张牌中，可以组成2组顺子，从小到大分别为：3 4 5 6 7 和 9 10 J Q K A

示例3：
输入
2 9 9 9 3 4 K A 10 Q A 5 6
输出
No
说明
13张牌中，无法组成顺子


解题思路
1、将输入转换成集合，将2剔除（不参与排序），J、Q、K转换成数字11，12，13
2、对处理过的集合进行排序，方便找顺子
3、 从第一个数字开始遍历，判断相邻数字是否严格递增（相差1）：若数字相同则跳过；若严格递增，则添加到集合中；若不相同也不严格递增，则判断集合的长度是否大于等于5：若大于等于5则符合顺子，添加到顺子集合中。
4、若集合长度小于5则判断是否整个集合都遍历完全：若遍历完全，则直接退出整个循环；若没有遍历完全，则剃除步骤3处理过的数字；再重复步骤3。
5、将得到的数据还原，11、12、13还原成J、Q、K

 */

function demo(args) {
  let str = args.trim().split(/\s+/g);
  let len = str.length;
  let list = [];

  for (let i = 0; i < len; i++) {
    //剔除2，转化A,J,Q,K
    switch (str[i]) {
      case "J":
        list.push(11);
        break;
      case "Q":
        list.push(12);
        break;
      case "K":
        list.push(13);
        break;
      case "A":
        list.push(14);
        break;
      case "2":
        break;
      default:
        list.push(Number(str[i]));
    }
  }

  list.sort((a, b) => a - b); //从小到大排序方便取值2 9 J 10 2 3 4 K A 7 Q A 5 6

  let ress = [];

  let isA = false; //是否遍历完整个数组

  while (!isA) {
    let res = [];
    res.push(list[0]); //放入第一个数字
    let count = 1;
    for (let i = 1; i < list.length; i++) {
      let x = list[i]; //  本次数字
      if (x == list[i - 1] + 1) {
        //符合严格递增
        count++;
        res.push(x);
      } else if (x == list[i - 1] && i != list.length - 1) {
        continue; //本次数字等于前面一个数字且不是数组最后一位,则进入下次循环
      }
      if (x != list[i - 1] + 1 || i == list.length - 1) {
        if (count >= 5) {
          //符合顺子
          ress.push(res);
        } else if (i == list.length - 1) {
          //整个数组遍历完全，直接退出
          isA = true;
          break;
        }
        for (let j = 0; j < res.length; j++) {
          for (let k = 0; k < list.length; k++) {
            if (res[j] == list[k]) {
              list.splice(list.indexOf(list[k]), 1); //剔除已经处理过的数字
              break;
            }
          }
        }
        if (list.length < 5) {
          //集合剩余数字不满足成为顺子
          isA = true;
        }
        break; //顺子已经提取，跳出本次循环
      }
    }
  }

  if (ress.length == 0) {
    console.log("No");
  } else {
    for (let i = 0; i < ress.length; i++) {
      let stringRes = "";
      for (let j = 0; j < ress[i].length; j++) {
        switch (
          ress[i][j] //将A\J\Q\K还原
        ) {
          case 11:
            stringRes += "J";
            break;
          case 12:
            stringRes += "Q";
            break;
          case 13:
            stringRes += "K";
            break;
          case 14:
            stringRes += "A";
            break;
          default:
            stringRes += ress[i][j];
        }
        if (j < ress[i].length - 1) {
          stringRes += " ";
        }
      }
      console.log(stringRes);
    }
  }
}
demo("2 9 J 2 3 4 K A 7 9 A 5 6");
demo("2 9 J 10 3 4 K A 7 Q A 5 6");
demo("2 9 9 9 3 4 K A 10 Q A 5 6");

/**
 java

import java.util.*;
import java.util.stream.Collectors;

public class Main {

       public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        while (scanner.hasNext()) {
            String inputPoker = scanner.nextLine();
            String[] allPoker = inputPoker.split(" ");

            Queue<Integer> sortedInput = Arrays
                    .stream(allPoker)
                    .filter(poker -> !poker.equals("2"))
                    .map(poker -> {
                        switch (poker) {
                            case "J":
                                return 11;
                            case "Q":
                                return 12;
                            case "K":
                                return 13;
                            case "A":
                                return 14;
                            default:
                                return Integer.parseInt(poker);
                        }
                    })
                    .sorted().collect(Collectors.toCollection(LinkedList::new));


            List<SortedBean> allSortedList = new ArrayList<>();
            int resultCount = 0;
            int lastValue = 0;
            while (!sortedInput.isEmpty()) {
                Integer currentValue = sortedInput.remove();

                if (lastValue == 0) {
                    SortedBean sortedBean = new SortedBean();
                    sortedBean.currLastValue = currentValue;
                    ArrayList<Integer> allData = new ArrayList<>();
                    allData.add(currentValue);
                    sortedBean.allData = allData;
                    allSortedList.add(sortedBean);
                } else {
                    if (currentValue - lastValue == 0) {
                        boolean isAdded = false;
                        for (SortedBean sortedBean : allSortedList) {
                            if (currentValue - sortedBean.currLastValue == 1) {
                                sortedBean.currLastValue = currentValue;
                                sortedBean.allData.add(currentValue);
                                isAdded = true;
                                break;
                            }
                        }

                        if (!isAdded) {
                            SortedBean sortedBean = new SortedBean();
                            sortedBean.currLastValue = currentValue;
                            ArrayList<Integer> allData = new ArrayList<>();
                            allData.add(currentValue);
                            sortedBean.allData = allData;
                            allSortedList.add(sortedBean);
                        }
                    } else if (currentValue - lastValue == 1) {
                        for (SortedBean sortedBean : allSortedList) {
                            if (sortedBean.currLastValue == lastValue) {
                                sortedBean.currLastValue = currentValue;
                                sortedBean.allData.add(currentValue);
                                break;
                            }
                        }
                    } else {
                        SortedBean sortedBean = new SortedBean();
                        sortedBean.currLastValue = currentValue;
                        ArrayList<Integer> allData = new ArrayList<>();
                        allData.add(currentValue);
                        sortedBean.allData = allData;
                        allSortedList.add(sortedBean);
                    }
                }
                lastValue = currentValue;
            }

            allSortedList.sort(Comparator.comparingInt(o -> o.allData.size()));

            for (SortedBean sortedBean : allSortedList) {
                if (sortedBean.allData.size() >= 5) {
                    StringBuilder stringBuilder = new StringBuilder();
                    for (Integer integer : sortedBean.allData) {
                        stringBuilder.append(getValue(integer)).append(" ");
                    }
                    System.out.println(stringBuilder.substring(0, stringBuilder.length() - 1));
                    resultCount++;
                }
            }


            if (resultCount == 0) {
                System.out.println("No");
            }
        }
    }

    private static String getValue(int src) {
        switch (src) {
            case 11:
                return "J";
            case 12:
                return "Q";
            case 13:
                return "K";
            case 14:
                return "A";
            default:
                return src + "";
        }
    }

    private static class SortedBean {
        public int currLastValue;
        private List<Integer> allData;

        @Override
        public String toString() {
            return "SortedBean{" +
                    "currLastValue=" + currLastValue +
                    ", allData=" + allData +
                    '}';
        }
    }
}

// 解法二

package kaoshi;

import java.util.;

public class Main {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String s = scanner.nextLine();
        String[] s1 = s.split( );
        for (int i = 0; i  s1.length; i++) {
            if (s1[i].equals(J)){
                s1[i]=11;
            }else if (s1[i].equals(Q)){
                s1[i]=12;
            }else if (s1[i].equals(K)){
                s1[i]=13;
            }else if (s1[i].equals(A)){
                s1[i]=14;
            }
        }
        int[] ints = Arrays.stream(s1).mapToInt(IntegerparseInt).filter(a-a != 2).toArray();
        Arrays.sort(ints);
        int i = 0;
        int k = 0;
        while (i ints.length-4){
            ArrayListString integers = new ArrayList();
            integers.add(String.valueOf(ints[i]));
            for (int j = 1; j  ints.length ; j++) {
                    if (i+j=ints.length- 1){
                        if (ints[i] +j == ints[i+j]){
                            if (ints[i+j] == 11){
                                integers.add(J);
                            }else if (ints[i+j] == 12){
                                integers.add(Q);
                            } else if (ints[i+j] == 13){
                                integers.add(K);
                            } else if (ints[i+j] == 14){
                                integers.add(A);
                            }else{
                                integers.add(String.valueOf(ints[i+j]));
                            }
                        }else{
                            i =i+j;
                            break;
                        }
                    }else{
                        i =i+j;
                        break;
                    }
            }
            if (integers.size()=5){
                k++;
                System.out.println(integers.toString());
            }
        }
        if (k==0){
            System.out.println(no);
        }
    }
}



 */
