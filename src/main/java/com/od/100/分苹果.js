/**
 分苹果 
 
 有A，B两个同学想要分苹果

A、B两个人把苹果分为两堆，A希望按照他的计算规则等分苹果，他的计算规则是按照二进制加法计算，并且不计算进位 12+5=9（1100 + 0101 = 9），B的计算规则是十进制加法，包括正常进位，B希望在满足A的情况下获取苹果重量最多。

输入苹果的数量和每个苹果重量，输出满足A的情况下B获取的苹果总重量。

如果无法满足A的要求，输出-1。

数据范围

1 <= 总苹果数量 <= 20000

1 <= 每个苹果重量 <= 10000

输入描述：

输入第一行是苹果数量：3

输入第二行是每个苹果重量：3 5 6

输出描述：

输出第一行是B获取的苹果总重量：11

示例1 输入输出示例仅供调试，后台判题数据一般不包含示例

输入

3
3 5 6

输出

11

示例2 输入输出示例仅供调试，后台判题数据一般不包含示例

输入

8
7258 6579 2602 6716 3050 3564 5396 1773

输出

35165


// 重新学习异或
在计算机中普遍运用，异或的逻辑符号 ^ (Shift + 6)或一个圆圈里面增加一个+或者·.形象表示为：

（1）真^假=真；

（2）假^真=真；

（3）假^假=假；

（4）真^真=假。

通俗的解释为：假如两者相同，则为“假”，否则就为“真”
 */

function apple() {
  let n = readline().trim();
  let nums = readline().trim().split(/\s+/).map(Number);
  let x = 0;
  for (let i = 0; i < n; i++) {
    x ^= nums[i]; // 异或运算
  }
  if (x == 0) {
    nums.sort((a, b) => a - b);
    let b = 0;
    for (let i = 1; i < n; i++) {
      b += nums[i];
    }
    console.log(b);
  } else {
    console.log(-1);
  }
}

/**
 java
 
public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int n = scanner.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i <n ; i++) {
            nums[i] = scanner.nextInt();
        }
        int x = 0;
        for (int i = 0; i <n ; i++) {
            x ^= nums[i];
        }
        if (x  == 0){
            Arrays.sort(nums);
            int b = 0;
            for (int i = 1; i < n; i++) {
                b += nums[i];
            }
            System.out.println(b);
        }else {   
            System.out.println(-1);
        }
    }


 */
