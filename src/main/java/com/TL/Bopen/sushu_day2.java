package com.TL.Bopen;

public class sushu_day2 {
    /**
     * 素数：只能被1和自身整除的数，0、1除外
     * 解法一：暴力算法
     * 直接从2开始遍历，判断是否能被2到自身之间的数整除
     */
    public int countPrimes(int n) {
        int ans = 0;
        for (int i = 2; i < n; ++i) {
            ans += isPrime(i) ? 1 : 0;
        }
        return ans;
    }

    //i如果能被x整除，则x/i肯定能被x整除，因此只需判断i和根号x之中较小的即可
    public boolean isPrime(int x) {
        for (int i = 2; i * i <= x; ++i) {
            if (x % i == 0) {
                return false;
            }
        }
        return true;
    }

    /**
     * 解法2：埃氏筛
     * 利用合数的概念(非素数)，素数*n必然是合数，因此可以从2开始遍历，将所有的合数做上标记
     *
     * 将合数标记为true，j = i * i 从 2 * i 优化而来，系数2会随着遍历递增（j += i，相当于递增了系数2），
     * 每一个合数都会有两个比本身要小的因子(0,1除外)，2 * i 必然会遍历到这两个因子
     * 当2递增到大于根号n时，其实后面的已经无需再判断（或者只需判断后面一段），而2到根号n、实际
     * 上在 i 递增的过程中已经计算过了，i 实际上就相当于根号n
     * 例如：n = 25 会计算以下
     * 2 * 4 = 8
     * 3 * 4 = 12
     * 但实际上8和12已经标记过，在n = 17时已经计算了 3 * 4，2 * 4
     */
    public static int eratosthenes(int n) {
        boolean[] isPrime = new boolean[n];
        int ans = 0;
        for (int i = 2; i < n; i++) {
            if (!isPrime[i]) {
                ans += 1;
                for (int j = i * i; j < n; j += i) {
                    isPrime[j] = true;
                }
            }
        }
        return ans;
    }
}
