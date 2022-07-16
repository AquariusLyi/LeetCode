package com.leetcode.No100;

/**
 * 示例 1：
 *
 * 输入：nums = [1,1,2]
 * 输出：2, nums = [1,2,_]
 * 解释：函数应该返回新的长度 2 ，并且原数组 nums 的前两个元素被修改为 1, 2 。不需要考虑数组中超出新长度后面的元素。
 * 示例 2：
 *
 * 输入：nums = [0,0,1,1,1,2,2,3,3,4]
 * 输出：5, nums = [0,1,2,3,4]
 * 解释：函数应该返回新的长度 5 ， 并且原数组 nums 的前五个元素被修改为 0, 1, 2, 3, 4 。不需要考虑数组中超出新长度后面的元素。
 *
 * 来源：力扣（LeetCode）
 * 链接：https://leetcode.cn/problems/remove-duplicates-from-sorted-array
 * 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
class removeDuplicates26 {
    public static void main(String[] args) {
        int[] nums = {1,2,3,3,4,4,4,5};
        removeDuplicates(nums);
    }
    public static int removeDuplicates(int[] nums) {
        int n = 0;
        for(int i = 0; i < nums.length; i++){
            if(i==0||nums[i]!=nums[i-1]){
                nums[n] = nums[i];
                n++;
            }
        }
        return n;
    }
}