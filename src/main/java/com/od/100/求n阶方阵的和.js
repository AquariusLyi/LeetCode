/**
 求n阶方阵的和

给出n阶方阵里所有数
求方阵里所有数的和
输入描述：
输入有多个测试用例
每个测试用例第一个第一个整数n n<=1000 表示方阵阶数为n
接下来是n行的数字，每行n个数字用空格隔开
输出描述：
输出一个整数表示n阶方阵的和

例子

输入：

3
1 2 3
2 1 3
3 2 1

输出：

18
————————————————
版权声明：本文为CSDN博主「Mendax92」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_41802443/article/details/123808238
 */

function niuke() {
  let count = parseInt(readline().trim());
  let sum = 0;
  for (let i = 0; i < count; i++) {
    let arr = readline().trim().split(/\s+/);
    for (let j = 0; j < arr.length; j++) {
      sum += parseInt(arr[j]);
    }
  }
  console.log(sum);
}

/**
 java
 

     private static void phalanx() {
        Scanner scanner = new Scanner(System.in);
        int count = Integer.parseInt(scanner.nextLine());
        int sum=0;
        for (int i = 0; i < count; i++) {
            String[] arr1 = scanner.nextLine().split("\\s+");
            for (int j = 0; j < arr1.length; j++) {
                sum+=Integer.parseInt(arr1[j]);
            }
        }
        System.out.println(sum);
    }

 */
