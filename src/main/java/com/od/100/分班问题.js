/**
 分班问题
 
幼儿园两个班的小朋友在排队时混在了一起，每位小朋友都知道自己是否与前面一位小朋友是否同班，请你帮忙把同班的小朋友找出来。
小朋友的编号为整数，与前一位小朋友同班用Y表示，不同班用N表示。

输入描述:
输入为空格分开的小朋友编号和是否同班标志。

比如：6/N 2/Y 3/N 4/Y，表示共4位小朋友，2和6同班，3和2不同班，4和3同班。
其中，小朋友总数不超过999，每个小朋友编号大于0，小于等于999。
不考虑输入格式错误问题。

输出描述:
输出为两行，每一行记录一个班小朋友的编号，编号用空格分开。且：
1、编号需要按照大小升序排列，分班记录中第一个编号小的排在第一行。
2、若只有一个班的小朋友，第二行为空行。
3、若输入不符合要求，则直接输出字符串ERROR。

 示例：
 输入
 1/N 2/Y 3/N 4/Y
 输出
 1 2
 3 4
 说明：2的同班标记为Y因此和1同班
            3的同班标记位N因此和1,2不同班
            4的同班标记位Y因此和3同班

解题思路：
需要一个boolean值来转换班级
True：一班
N：表示在二班
Y：表示在一班
False：二班
N：表示在一班
Y：表示在二班

解题思路:
1、当第一个同学的标识为N，那么我们将他放入到班级1当中，并将flag改为2，此时遍历下一个数时，相当于是站在第一个同学所在的班级1来看，那么如果第二个同学的标识为Y，就加入到同一个班级，否则加入到另一个班级，并且再次修改flag为1，回到了另一个班级的角度来继续判断该同学的下一个同学。

2、得到不同班级的同学后，都应进行排序，因为题目要求编号要按照大小升序进行排序。
————————————————
版权声明：本文为CSDN博主「G1useppE」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/G1useppE/article/details/124993576


 */

function diffClass(str) {
  let studentList = str.trim().split(/\s+/g);
  let classOne = [],
    classTwo = [],
    flag = 1;
  for (let student of studentList) {
    let stdName = student.split("/")[0];
    let judge = student.split("/")[1];
    if (flag == 1) {
      if (judge == "Y") {
        classTwo.push(stdName);
      } else {
        classOne.push(stdName);
        flag = 2;
      }
    } else if (flag == 2) {
      if (judge == "Y") {
        classOne.push(stdName);
      } else {
        classTwo.push(stdName);
        flag = 1;
      }
    }
  }
  let one = classOne.sort().join(" ");
  let two = classTwo.sort().join(" ");

  console.log(one);
  console.log(two);
}
diffClass("1/N 2/Y 3/N 4/Y");

//打印结果为：
// 1 2
// 3 4

/**
 java
 
import java.util.*;
import java.util.ArrayList;
import java.util.stream.Collectors;

public class Main {

    public static void main(String[] args) {
        try{
            Scanner scan = new Scanner(System.in);
            String in = scan.nextLine();
            String[] a = in.split(" ");
            ArrayList<Integer> l1 = new ArrayList<Integer>(999);
            ArrayList<Integer> l2 = new ArrayList<Integer>(999);
            ArrayList<Integer> l0 = null;
            boolean same = true;
            for (int i = a.length - 1; i >= 0; i--) {
                Integer num = Integer.parseInt(a[i].substring(0,a[i].indexOf("/")));
                if(num<=0||num>999){
                    throw new Exception();
                }
                same = a[i].endsWith("Y");
                if (i == a.length - 1) {
                    l0 = l1;
                }
                l0.add(num);
                if(!same){
                    l0 = l0==l1?l2:l1;
                }
            }
            Collections.sort(l1);
            Collections.sort(l2);
            if(new HashSet(l1).size()<l1.size()||new HashSet(l2).size()<l2.size()){
                throw new Exception();
            }
            if(l2.size()!=0 && l1.get(0)>l2.get(0)){
                System.out.println(l2.stream().map(String::valueOf).collect(Collectors.joining(" ")));
                System.out.println(l1.stream().map(String::valueOf).collect(Collectors.joining(" ")));
            }else{
                System.out.println(l1.stream().map(String::valueOf).collect(Collectors.joining(" ")));
                System.out.println(l2.stream().map(String::valueOf).collect(Collectors.joining(" ")));
            }
        }catch(Exception e){
            System.out.println("ERROR");
        }
    }

}
 */

/**
 java 二

 public class ZT16 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] input = sc.nextLine().split(" ");
        List<Integer> list1 = new ArrayList<>();
        List<Integer> list2 = new ArrayList<>();
        //0号是1班 剩下是2班
        int preCla = 1;
        for (int i = 0; i < input.length; i++) {
            String[] num = input[i].split("/");
            if (i == 0){
                list1.add(Integer.parseInt(num[0]));
                preCla = 1;
                continue;
            }
            if (preCla == 1){
                if (num[1].equals("Y")){
                    list1.add(Integer.parseInt(num[0]));
                }else {
                    list2.add(Integer.parseInt(num[0]));
                    preCla = 2;
                }
            }else {//N
                if (num[1].equals("Y")){
                    list2.add(Integer.parseInt(num[0]));
                }else {
                    list1.add(Integer.parseInt(num[0]));
                    preCla = 1;
                }
            }
        }
        Collections.sort(list1);
        Collections.sort(list2);
        for (int i = 0; i < list1.size(); i++) {
            System.out.print(list1.get(i) + " ");
        }
        System.out.println();
        for (int i = 0; i < list2.size(); i++) {
            System.out.print(list2.get(i) + " ");
        }
    }
}

 */
