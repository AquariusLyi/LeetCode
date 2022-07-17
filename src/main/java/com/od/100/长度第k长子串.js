/**
 连续字母长度

给定一个字符串，只包含大写字母，求在包含同一字母的子串中，长度第 k 长的子串的长度，相同字母只取最长的那个子串。

输入描述:
第一行有一个子串(1<长度<=100)，只包含大写字母。
第二行为 k的值
输出描述:
输出连续出现次数第k多的字母的次数。

示例1
输入
AAAAHHHBBCDHHHH
3
输出
2
说明
同一字母连续出现的最多的是A和H，四次；第二多的是H，3次，但是H已经存在4个连续的，故不考虑；下个最长子串是BB，所以最终答案应该输出2。
示例2
输入
AABAAA
2
输出
1
说明
同一字母连续出现的最多的是A，三次；第二多的还是A，两次，但A已经存在最大连续次数三次，故不考虑；下个最长子串是B，所以输出1
示例3
输入
ABC
4
输出
-1
说明
只含有3个包含同一字母的子串，小于k，输出-1
示例4
输入
ABC
2
输出
1
说明
三个子串长度均为1，所以此时k = 1，k=2，k=3这三种情况均输出1。特此说明，避免歧义。
备注:
若子串中只包含同一字母的子串数小于k，则输出-1
 */

// 解法一
function getMostNum(args, str2) {
  const input = args.trim().split("");
  const num = +str2.trim();
  const map = new Map();
  let temp = input[0];
  let count = 1;
  map.set(temp, count);
  for (let i = 1; i < input.length; i++) {
    const ele = input[i];
    temp = ele;
    if (temp == input[i - 1]) {
      count++;
    } else {
      count = 1;
    }
    map.set(temp, map.has(temp) ? Math.max(map.get(temp), count) : count);
  }
  const ints = Array.from(map.values()).sort((a, b) => a - b);
  if (num > ints.length) {
    console.log(-1);
  } else {
    console.log(ints[ints.length - num]);
  }
}
getMostNum("AAAAHHHBBCDHHHH", "3");
getMostNum("AABAAA", "2");

// 解法二
function getMostNum2(args, str2) {
  const input = args.trim().split("");
  const num = +str2.trim();
  const map = new Map();
  const arr = JSON.parse(JSON.stringify(input));
  var abc = [];
  while (arr.length) {
    var temp = [];
    let count = 1;
    for (let i = 0; i < arr.length; i++) {
      temp.push(arr[i]);
      if (arr[i] == arr[i + 1]) {
        count++;
      } else {
        arr.splice(0, count);
        count = 1;
        break;
      }
    }
    abc.push(temp);
  }
  abc.forEach((item) => {
    const con = map.get(item[0]);
    if (con) {
      map.set(item[0], Math.max(item.length, con));
    } else {
      map.set(item[0], item.length);
    }
  });
  const ints = Array.from(map.values()).sort((a, b) => a - b);
  if (num > ints.length) {
    console.log(-1);
  } else {
    console.log(ints[ints.length - num]);
  }
}
getMostNum2("AAAAHHHBBCDHHHH", "3");
getMostNum2("AABAAA", "2");
/**
 java

 public class Main{
 
    public static void main(String[] args) {
 
        Scanner sc = new Scanner(System.in);
 
        String s = sc.nextLine();
        int n = sc.nextInt();
 
        Map<Character,Integer> map = new HashMap<>();
        int count = 1;    //相同字符的个数
        for(int i=0;i<s.length()-1;i++){
            if(s.charAt(i)==s.charAt(i+1)){ //当前字符跟后面一个字符比较，所以边界为s.length()-1
                count++;   //相同字符计数加1
            } else {
                if(map.containsKey(s.charAt(i))){
                    count = Math.max(count,map.get(s.charAt(i)));    //同字符长度取最长长度
                }
                map.put(s.charAt(i),count);
                count = 1;
            }
            if(i==s.length()-2){    //最后一个字符
                map.put(count==1?s.charAt(i+1):s.charAt(i),count);
            }
        }
 
        List<Integer> list = new ArrayList<>();    //长度（value）集合
 
        for (Character c:map.keySet()
             ) {
            list.add(map.get(c));
        }
 
        list.sort((a,b)->{    //根据长度降序处理
            if (b>a){
                return 1;
            }
            return -1;
        });
 
        if(list.size()>=n){
            System.out.println(list.get(n-1));
        }else {
            System.out.println(-1);
        }
    }
}
 */
