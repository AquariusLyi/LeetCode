package com.TL.Bopen;

import java.util.Arrays;

/**
 * 寻找数组的中心索引
 *
 * 数组中某一个下标，左右两边的元素之后相等，该下标即为中心索引
 * 思路：先统计出整个数组的总和，然后从第一个元素开始叠加 总和递减当前元素，叠加递增当前元素，知道两个值相等
 */
public class pivotIndex_day3 {
    public static int pivotIndex(int[] nums) {
        int sum1 = Arrays.stream(nums).sum();
        int sum2 = 0;

        for (int i = 0; i < nums.length; i++) {
            sum2 += nums[i];
            if (sum1 == sum2) {
                return i;
            }
            sum1 = sum1 - nums[i];
        }
        return -1;

    }
}
