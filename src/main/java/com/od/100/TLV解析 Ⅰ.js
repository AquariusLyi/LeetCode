/**
【编程题目 | 100分】TLV解析Ⅰ [ 100 / 中等 ]
TLV编码是按[Tag Length Value]格式进行编码的，一段码流中的信元用Tag标识，Tag在码流中唯一不重复，Length表示信元Value的长度，Value表示信元的值。

码流以某信元的Tag开头，Tag固定占一个字节，Length固定占两个字节，字节序为小端序。

现给定TLV格式编码的码流，以及需要解码的信元Tag，请输出该信元的Value。

输入码流的16机制字符中，不包括小写字母，且要求输出的16进制字符串中也不要包含小写字母；码流字符串的最大长度不超过50000个字节。

输入描述

输入的第一行为一个字符串，表示待解码信元的Tag；
输入的第二行为一个字符串，表示待解码的16进制码流，字节之间用空格分隔。
输出描述

输出一个字符串，表示待解码信元以16进制表示的Value。
示例 1   输入输出示例仅供调试，后台判题数据一般不包含示例

输入
31
32 01 00 AE 90 02 00 01 02 30 03 00 AB 32 31 31 02 00 32 33 33 01 00 CC

输出
32 33

说明

需要解析的信元的Tag是31，从码流的起始处开始匹配，Tag为32的信元长度为1（01 00，小端序表示为1）；

第二个信元的Tag是90，其长度为2；

第三个信元的Tag是30，其长度为3；

第四个信元的Tag是31，其长度为2（02 00），所以返回长度后面的两个字节即可，即32 33。


思路分析
字符串转整数时，可以直接转为对应进制的整数。注意是小端，小的在后面。
————————————————
版权声明：本文为CSDN博主「小朱小朱绝不服输」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_44052055/article/details/123903244


解题思路：
1、本题主要是得理解题意，根据题目码流以Tag开头，那么32 01 00 AE 90 02 00 01 02 30 03 00 AB 32 31 31 02 00 32 33 33 01 00 CC中，31就是Tag之一，然后题目还说了Length占两个字节，意思就是32后面的01 00就是Length。要求输出Value，就是根据Length规定的长度得到的值。

2、什么是小端序？这里可以看看阮一峰老师的文章了解一下：了解小端序

我们大致了解为就是将后一个字节放到前面的位置上，也就是将01 00 变成 00 01，因为是字符串，因此我们可以直接通过 + 进行拼接。那么00 01作为16进制转换后的长度就是Length，长度为1。parseInt可以传入第二个参数作为要将这个数以什么进制进行转换。

3、Value是多少个字符，取决于Length。例如：32是tag，后面的01 00变成小端序是00 01,以十六进制形式转换后的长度为1，那么就说明这个Value值的有一个字节，也就是AE。而AE后面的另一个tag 90 ，他的转换后的Length为2 ，那么Value值就是01 02 两个字节。

4、根据题目给的要寻找的tag，for循环查找符合的tag值，然后获取到tag值的Length，再获取对应的Value值。
————————————————
版权声明：本文为CSDN博主「G1useppE」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/G1useppE/article/details/124977396
 */

function TLVAnalyize(str1, str2) {
  let tag = str1.trim();
  let tlv1 = str2.split(/\s+/);
  for (let i = 0; i < tlv1.length; ) {
    //小端序 需要反过来 然后以16进制转换得到tag的长度Length
    let len = parseInt(tlv1[i + 2] + tlv1[i + 1], 16);
    // 找到与传入的字符串匹配的tag
    if (tag == tlv1[i]) {
      var res = [];
      // 这里的j意思是value的起始位置，value的字节长度（或者说是value最后一个字节的索引）要小于下一个tag的起始位置。
      for (let j = i + 3; j < i + 3 + len; j++) {
        res.push(tlv1[j]);
      }
      //将结果转换为字符串形式
      console.log(res.join(" "));
      return;
    } else {
      //下一个tag的起始位置
      i += len + 3;
    }
  }
}

TLVAnalyize(
  "31",
  "32 01 00 AE 90 02 00 01 02 30 03 00 AB 32 31 31 02 00 32 33 33 01 00 CC"
);
//32 33

/**
 java

// 解法一

import java.util.Scanner;

public class TLV {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        while (in.hasNextLine()) {
            String key = in.nextLine();
            String[] arr = in.nextLine().replaceAll("[a-z]", "").split("[ ]");
            String tag;
            int length;
            StringBuilder value;
            for (int i = 0; i < arr.length; ) {
                value = new StringBuilder();
                tag = arr[i];
                length = Integer.valueOf(arr[i + 2] + arr[i + 1], 16);
                for (int j = 1; j <= length; j++) {
                    value.append(arr[i + 2 + j]).append(" ");
                }
                if (key.equals(tag)) {
                    System.out.println(value.toString().trim());
                }
                i = i + 2 + length + 1;
            }
        }
    }
}

// 解法二

import java.util.Scanner;

public class TLVAnalyize1 {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        String tag = in.nextLine();
        String[] tlv = in.nextLine().split(" ");
        for (int i = 0; i < tlv.length; ) {
            int length = Integer.parseInt(tlv[i + 2] + tlv[i + 1], 16);  // 将字符串的Length转为16进制，小端，需要反过来
            if (tag.equals(tlv[i])) {
                StringBuilder sb = new StringBuilder();
                for (int j = i + 3; j < i + 3 + length; j++) {
                    sb.append(tlv[j]).append(" ");
                }
                System.out.println(sb.toString());
                break;
            } else {
                i += length + 3;
            }
        }
    }
}



// 解法一
import java.util.Arrays;
import java.util.Scanner;


public class Main {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        String tag = in.nextLine();
        String data = in.nextLine();
        String[] split = data.split("\\s+");

        for (int i = 0; i < split.length; ) {
            int length = Integer.parseInt(split[i + 2] + split[i + 1], 16);
            if (tag.equals(split[i])) {
                StringBuilder builder = new StringBuilder();
                for (int j = i + 3; j < i + 3 + length; j++) {
                    builder.append(split[j]).append(" ");
                }
                System.out.println(builder.toString());
                break;
            } else {
                i += length + 3;
            }
        }

        in.close();

    }
}


//  解法二
import java.util.Scanner;

public class Main {
	public static void main(String[] args) {
		Scanner in = new Scanner(System.in);
		while (in.hasNextLine()) {// 注意，如果输入是多个测试用例，请通过while循环处理多个测试用例
			String key=in.nextLine();
			String[] arr=in.nextLine().replaceAll("[a-z]", "").split("[ ]");
			String tag="";
			int length;
			String value="";
			for(int i=0;i<arr.length;) {
				tag="";
				length=0;
				value="";
				tag=arr[i];
				length=Integer.valueOf(arr[i+2]+arr[i+1], 16);
				for(int j=1;j<=length;j++) {
					value+=arr[i+2+j]+" ";
				}
				if(key.equals(tag)) {
					System.out.println(value.trim());
				}
//				System.out.println(tag+" "+length+" "+value.trim());
				i=i+2+length+1;
			}
		}
		
		
		
	
	}
}

 */
