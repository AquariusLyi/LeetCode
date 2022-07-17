/**
 
查找接口成功率最优时间段

服务之间交换的接口成功率作为服务调用关键质量特性，某个时间段内的接口失败率使用一个数组表示，数组中每个元素都是单位时间内失败率数值，数组中的数值为0~100的整数，给定一个数值(minAverageLost)表示某个时间段内平均失败率容忍值，即平均失败率小于等于minAverageLost，找出数组中最长时间段，如果未找到则直接返回NULL。

输入描述:
输入有两行内容，第一行为{minAverageLost}，第二行为{数组}，数组元素通过空格(" “)分隔，minAverageLost及数组中元素取值范围为0~100的整数，数组元素的个数不会超过100个。
输出描述:
找出平均值小于等于minAverageLost的最长时间段，输出数组下标对，格式{beginIndex}-{endIndx}(下标从0开始)，如果同时存在多个最长时间段，则输出多个下标对且下标对之间使用空格(” ")拼接，多个下标对按下标从小到大排序。

示例1：
输入
1
0 1 2 3 4
输出
0-2
说明
A、输入解释：minAverageLost=1，数组[0, 1, 2, 3, 4]
B、前3个元素的平均值为1，因此数组第一个至第三个数组下标，即0-2
示例2：
输入
2
0 0 100 2 2 99 0 2
输出
0-1 3-4 6-7
说明
A、输入解释：minAverageLost=2，数组[0, 0, 100, 2, 2, 99, 0, 2]
B、通过计算小于等于2的最长时间段为：数组下标为0-1即[0, 0]，数组下标为3-4即[2, 2]，数组下标为6-7即[0, 2]，这三个部分都满足平均值小于等2的要求，因此输出0-1 3-4 6-7


 */

/**
 java


答案：
解法一：

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Main {
    private static List<String> sResultList = new ArrayList<>();
    private static int sCurrentLength = 0;
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        while (scanner.hasNextLine()) {
            int minAvg = Integer.parseInt(scanner.nextLine().trim());
            String[] strings = scanner.nextLine().trim().split(" ");
            List<Integer> list = new ArrayList<Integer>();
            for (int i = 0; i < strings.length; i++) {
                list.add(Integer.parseInt(strings[i]));
            }
            getPeriod(minAvg, list);
            if (!sResultList.isEmpty()) {
                for (int i = 0; i < sResultList.size(); i++) {
                    System.out.print(sResultList.get(i));
                    System.out.print(" ");
                }
            }
        }
    }

    private static void getPeriod(int minAvg, List<Integer> list) {
        sResultList.clear();
        sCurrentLength = 0;
        for (int start = 0; start < list.size() - 1; start++) {
            for (int end  = start + 1; end < list.size(); end++) {
                int sum = getSum(list, start, end);
                String result = "";
                int length = end - start + 1;
                if (sum == 0 && minAvg >= 0) {
                    result = start + "-" + end;
                } else {
                    if (sum <= minAvg * length) {
                        result = start + "-" + end;
                    }
                }
                if (result.contains("-")) {
                    if (length == sCurrentLength) {
                        sResultList.add(result);
                    }
                    if (length > sCurrentLength) {
                        sResultList.clear();
                        sResultList.add(result);
                        sCurrentLength = length;
                    }
                }
            }
        }
    }

    private static int getSum(List<Integer> list, int start, int end) {
        int sum = 0;
        for (int i = start; i <= end; i++) {
            sum += list.get(i);
        }
        return sum;
    }
}

 */
