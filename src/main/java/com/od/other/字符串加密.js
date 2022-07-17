/**
 字符串加密
题目描述
给你一串未加密的字符串str，通过对字符串的每一个字母进行改变来实现加密，加密方式是在每一个字母 str[i]偏移特定数组元素 a[i]的量。数组 a 的前三位已经赋值：a[0] = 1,a[1] = 2,a[2] = 4。当 i>=3 时，数组元素 a[i] = a[i-1] + a[i-2] + a[i-3]。例如：原文 abcde 加密后 bdgkr，其中偏移量分别是 1，2，4，7，13。
输入描述
第一行为一个整数 n，(1 <= n <= 1000)，表示有 n 组测试数据。每组数据包含一行，原文 str(只含有小写字母，0 <= 长度 <= 50)。
输出描述
每组测试数据输出一行，表示字符串的密文。
示例 1
输入
1
xy
输出
ya

说明
第一个字符 x 偏移量是 1，即为 y，第二个字符 y 偏移量是 2，即为 a
示例 2
输入
xy
abcde
输出
ya
bdgkr
说明
第二行输出字符偏移量分别为 1、2、4、7、13

 */

// 递归公式
var fn = function (num) {
  if (num == 0) {
    return 1;
  } else if (num == 1) {
    return 2;
  } else if (num == 2) {
    return 4;
  } else {
    return fn(num - 1) + fn(num - 2) + fn(num - 3);
  }
};

var StrEncrypt = function (str) {
  let arr = [];
  for (let j = 0; j < str.length; j++) {
    let num1 = str.charCodeAt(j); //获取当前字符ASCII码
    let num2 = fn(j); //获取当前偏移量
    let num3 = num1 + num2;
    if (num3 >= 97 && num3 <= 122) {
      arr.push(String.fromCharCode(num3));
    } else {
      let num4 = 97 + ((num3 - 97) % 26);
      arr.push(String.fromCharCode(num4));
    }
  }
  console.log(arr.join(""));
};

StrEncrypt("xy");
StrEncrypt("abcde");

// 动态规划
var StrEncrypt = function (str) {
  let result = str.split("");
  let arr = [1, 2, 4]; // 偏移量
  let len = str.length;

  // 先处理前三个
  for (let i = 0; i < 3; i++) {
    if (result[i]) {
      // 求出result[i]的ASCII编码，加上偏移量，再转换成相应的字符
      result[i] = String.fromCharCode(result[i].charCodeAt() + arr[i]);

      if (result[i] > "z") {
        result[i] = "a";
      }
    }
  }

  for (let i = 3; i < len; i++) {
    //  递推公式
    arr[i] = arr[i - 1] + arr[i - 2] + arr[i - 3];
    result[i] = String.fromCharCode(result[i].charCodeAt() + arr[i]);
    if (result[i] > "z") {
      result[i] = "a";
    }
  }
  console.log(result.join(""));
};

StrEncrypt("xy");
StrEncrypt("abcde");

/**
 java

 public class ZT77 {
    private static int[] arrOff = new int[50];

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int count = Integer.parseInt(sc.nextLine());
        char[] arr = {'a','b','c','d','e','f','g','h','i','j','k','l','m',
            'n','o','p','q','r','s','t','u','v','w','x','y','z'};
        arrOff[0] = 1;
        arrOff[1] = 2;
        arrOff[2] = 4;
        for (int i = 3; i < 50; i++) {
            arrOff[i] = arrOff[i-1] + arrOff[i-2] + arrOff[i-3];
        }
        for (int i = 0; i < count; i++) {
            System.out.println(handleStr(sc.nextLine(),arr));
        }
    }
    
    public static String handleStr(String str,char[] arr){
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < str.length(); i++) {
            char ch = str.charAt(i);
            int offset = arrOff[i];
            ch = arr[(ch -'a' +  offset) % 26];
            sb.append(ch);
        }
        return sb.toString();
    }
}



 */
