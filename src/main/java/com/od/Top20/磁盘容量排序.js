/**
 
磁盘容量排序

磁盘的容量单位常用的有M，G，T这三个等级，它们之间的换算关系为1T = 1024G，1G = 1024M，现在给定n块磁盘的容量，请对它们按从小到大的顺序进行稳定排序，例如给定5块盘的容量，1T，20M，3G，10G6T，3M12G9M排序后的结果为20M，3G，3M12G9M，1T，10G6T。注意单位可以重复出现，上述3M12G9M表示的容量即为3M+12G+9M，和12M12G相等。

输入描述:
输入第一行包含一个整数n(2 <= n <= 100)，表示磁盘的个数，接下的n行，每行一个字符串(长度大于2，小于30)，表示磁盘的容量，由一个或多个格式为mv的子串组成，其中m表示容量大小，v表示容量单位，例如20M，1T，30G，10G6T，3M12G9M。

磁盘容量m的范围为1到1024的正整数，容量单位v的范围只包含题目中提到的M，G，T三种，换算关系如题目描述。
输出描述:
输出n行，表示n块磁盘容量排序后的结果。

示例1：
输入
3
1G
2G
1024M
输出
1G
1024M
2G
说明
1G和1024M容量相等，稳定排序要求保留它们原来的相对位置，故1G在1024M之前
示例2：
输入
3
2G4M
3M2G
1T
输出
3M2G
2G4M
1T
说明
1T的容量大于2G4M，2G4M的容量大于3M2G

 磁盘的容量单位常用的有M G T ， 他们之间的换算关系为 1T =1024G 1G=1024M
现在给定n块磁盘的容量，请对他们按从小到大的顺序进行稳定排序

例如给定5块盘的容量
5
1T
20M
3G
10G6T
3M12G9M

排序后的结果为
20M
3G
3M 12G 9M
1T,10G 6T
注意单位可以重复出现

上述3M 12G 9M表示的容量即为 3M 12G 9M 和12M 12G相等


输入描述、
输入第一行包含一个整数n， 2<=n<=100 表示磁盘的个数
接下来的n行，每行一个字符串，2<长度<30 ，表示磁盘的容量
由一个或多个格式为MV的子串组成，其中m表示容量大小，v表示容量单位。例如20M 1T， 磁盘容量的范围1~1024的正整数，单位 M G T

输出n行，表示n块磁盘容量排序后的结果。

实例
输入
3
1G
2G
1024M


输出
1G
1024M
2G
说明：稳定排序要求相等值保留原来位置

示例2
3
2G4m
3M2G
1T

输出
3M2G
2G4M
1T

https://www.cnblogs.com/Jukim/p/16056717.html
 */

function niuke() {
  let num = parseInt(readline().trim());
  let list = [];
  for (let i = 0; i < num; i++) {
    list.push(readline().trim());
  }
  list.sort((val1, val2) => getChangeVal(val1) - getChangeVal(val2));
  for (item of list) {
    console.log(item);
  }
}

//辅助函数
function getChangeVal(str) {
  let temp = str.toUpperCase();
  let split = temp.split(/[A-Z]/g).filter((item) => item);
  let sum = 0; //记录s同一单位后的数值
  let length = 0; //定位单位位置所用
  for (let i = 0; i < split.length; i++) {
    let num = parseInt(split[i]);
    length += split[i].length;
    let chr = temp.charAt(length);
    switch (chr) {
      case "M":
        sum += num;
        break;
      case "G":
        sum += num * 1024;
        break;
      case "T":
        sum += num * 1024 * 1024;
        break;
    }
    length++;
  }
  return sum;
}

// 本地调试
function sortDisk(str1, str2) {
  let list = str2.split(/\n\s+/g);
  list.sort((val1, val2) => getChangeVal(val1) - getChangeVal(val2));
  for (item of list) {
    console.log(item);
  }
}

sortDisk(
  "3",
  `2G4m
3M2G
1T`
);
sortDisk(
  "3",
  `1G
  2G
  1024M`
);

/**
 java

 private static void cacl() {
    Scanner scanner = new Scanner(System.in);
    int count = Integer.valueOf(scanner.nextLine());
    List<String> list = new ArrayList<>();
    for (int i = 0; i < count; i++) {
        String s = scanner.nextLine();
        list.add(s);
    }
    list.sort(new Comparator<String>() {
        @Override
        public int compare(String o1, String o2) {
            return getValues(o1) - getValues(o2);
        }
    });
    for (String str : list) {
        System.out.println(str);
    }
}

private static int getValues(String s) {
    String content = s.toUpperCase().replace(" ", "");
    String[] split = content.split("[A-Z]");
    int result = 0;
    int len = 0;
    for (int i = 0; i < split.length; i++) {
        // 寻找单位的位置
        String num = split[i];
        len += num.length();
        String substring = content.substring(len, len + 1);
        switch (substring) {
            case "M":
                result += Integer.valueOf(num);
                len++;
                break;
            case "G":
                result += Integer.valueOf(num) * 1024;
                len++;
                break;
            case "T":
                result += Integer.valueOf(num) * 1024 * 1024;
                len++;
                break;
        }
    }
    return result;
}

 */
