/**
 题目描述：
解压报文 | 时间限制：1秒 | 内存限制：262144K | 语言限制：不限
为了提升数据传输的效率，会对传输的报文进行压缩处理。输入一个压缩后的报文，请返回它解压后的原始报文。
压缩规则：n[str]，表示方括号内部的 str 正好重复 n 次。注意 n 为正整数（0 < n <= 100），str只包含小写英文字母，不考虑异常情况。
" “输入描述:
输入压缩后的报文：
1）不考虑无效的输入，报文没有额外的空格，方括号总是符合格式要求的；
2）原始报文不包含数字，所有的数字只表示重复的次数 n ，例如不会出现像 5b 或 3[8] 的输入；
输出描述:
解压后的原始报文
注：
1）原始报文长度不会超过1000，不考虑异常的情况
示例1
输入
3[k]2[mn]
输出
kkkmnmn
说明
k 重复3次，mn 重复2次，最终得到 kkkmnmn
示例2
输入
3[m2[c]]
输出
mccmccmcc
说明
m2[c] 解压缩后为 mcc，重复三次为 mccmccmcc”
————————————————
版权声明：本文为CSDN博主「@_南先森」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/nanzhanfei/article/details/124895671
 */

// 解法一
function compressBaowen(args) {
  const inputStr = args.trim();
  let result = "";
  let temp = "";
  let stack = [];
  let index = 0;
  while (index < inputStr.length) {
    if (inputStr[index] === "]") {
      temp = "";
      while (stack.length > 0) {
        let value = stack.pop();
        if (/^[a-z]$/gi.test(value)) {
          // 判断是否由字母组成
          temp = value + temp; // 因为是从右向左加旧值在右
        } else if (Number.isInteger(value / 1)) {
          // 由数字组成。
          // 这里做 value -1 次的字符串相加,因为本身就有一次
          let tempStr = temp; // 需要将tempStr暂存起来,后边tempStr会作为累加的结果
          for (let j = 0; j < value - 1; j++) {
            temp += tempStr;
          }
        }
      }
      //  totalStr清空前累加一次
      result += temp;
    }
    stack.push(inputStr[index]);
    index += 1;
  }
  console.log(result);
}
compressBaowen("3[m2[c]]");
compressBaowen("3[k]2[mn3[j2[op]]]");

// 解法二
function compressStr(args) {
  let str = args.trim();
  let reg1 = /\d+\[[a-z]+\]/g;
  let reg2 = /(?<=\[)([a-z]+)(?=\])/g;
  let arr = str.match(reg1);
  while (arr) {
    for (let i = 0; i < arr.length; i++) {
      let result = "";
      let res = arr[i];
      let num = res.match(/\d+/g);
      let code = res.match(reg2);
      while (num) {
        num--;
        result += code;
      }
      str = str.replace(res, result);
    }
    arr = str.match(reg1);
  }
  console.log(str);
}
compressStr("3[m2[c]]");
compressStr("3[k]2[mn3[j2[op]]]");

// 解法三
function niuke() {
  let input = readline().trim();
  let str = ""; //处理多位数
  let res = ""; //处理前的字母串
  let num = []; //数字队列
  let word = []; //放置处理后的字母串
  for (let i = 0; i < input.length; i++) {
    let chr = input.charAt(i);
    if (!isNaN(Number(chr))) {
      //判断是否为数字
      if (res.length != 0) {
        //数字前的字母暂不处理
        word.push(res);
        res = "";
      }
      str += chr;
    } else if (chr == "[") {
      num.push(Number(str)); //数字放入数字队列
      str = "";
    } else if (chr == "]") {
      let n = num.pop(); //碰到“]”，就需要取出最上面的数字进行解压
      if (res.length != 0) {
        word.push(res);
        res = "";
      }
      let temp = word.pop(); //取出最上面的字母
      let out = "";
      for (let j = 0; j < n; j++) {
        out += temp; //对字母进行解压
      }
      if (word.length == 0) {
        word.push(out);
      } else {
        word.push(word.pop() + out); //后面处理过的字符会跟最上面的字符一起被处理
      }
    } else {
      res += chr;
    }
  }
  console.log(word);
}
/*
java

 解题思路：
看到这种被括号控制的题目，就想到了栈，现在都是用双向队列（Deque）
遍历字符串，将数字和字母分别放入各自队列中
当碰到“]”的时候，取出队列最上层的数字和字母（Deque是先进先出，所以最上层的是最后放入的），进行解压
再将步骤2解压出的字符与字母队列中最上层的字符进行拼接，用于下次解压（因为括号里面的所有字符都受前面数字控制解压，所有需要拼接）
重复步骤1，直至遍历完整个字符串

public class Main{
 
    public static void main(String[] args) {
 
        Scanner sc = new Scanner(System.in);
 
        String s = sc.nextLine();
 
        StringBuffer res = new StringBuffer();  //处理前的字母串
        String numStr = "";  //处理多位数
        Deque<Integer> num = new ArrayDeque<>();    //数字队列
        Deque<StringBuffer> zimu = new ArrayDeque<>();  //放置处理后的字母串
        for(int i=0;i<s.length();i++){
            char c = s.charAt(i);
            if(Character.isDigit(c)){
                if(res.length()!=0){    //数字前的字母暂不处理
                    zimu.push(res);
                    res = new StringBuffer();
                }
                numStr += c;
            }else if(c=='['){
                num.push(Integer.parseInt(numStr));  //数字放入数字队列
                numStr = "";
            }else if(c==']'){
                int n = num.pop();  //碰到“]”，就需要取出最上面的数字进行解压
                if(res.length()!=0){
                    zimu.push(res);
                    res = new StringBuffer();
                }
                StringBuffer temp = zimu.pop(); //取出最上面的字母
                StringBuffer sb = new StringBuffer();
                for(int j=0;j<n;j++){
                    sb.append(temp);    //对字母进行解压
                }
                if(zimu.isEmpty()){
                    zimu.push(sb);
                }else {
                    zimu.push(zimu.pop().append(sb));   //后面处理过的字符会跟最上面的字符一起被处理
                }
            }else {
                res.append(c);
            }
        }
        System.out.println(zimu);
    }
}
*/

/**
 java 解法二

 public class Main{
 
    public static void main(String[] args) {
 
        Scanner sc = new Scanner(System.in);
 
        String s = sc.nextLine();
 
        StringBuffer res = new StringBuffer();  //处理前的字母串
        String numStr = "";  //处理多位数
        Deque<Integer> num = new ArrayDeque<>();    //数字队列
        Deque<StringBuffer> zimu = new ArrayDeque<>();  //放置处理后的字母串
        for(int i=0;i<s.length();i++){
            char c = s.charAt(i);
            if(Character.isDigit(c)){
                if(res.length()!=0){    //数字前的字母暂不处理
                    zimu.push(res);
                    res = new StringBuffer();
                }
                numStr += c;
            }else if(c=='['){
                num.push(Integer.parseInt(numStr));  //数字放入数字队列
                numStr = "";
            }else if(c==']'){
                int n = num.pop();  //碰到“]”，就需要取出最上面的数字进行解压
                if(res.length()!=0){
                    zimu.push(res);
                    res = new StringBuffer();
                }
                StringBuffer temp = zimu.pop(); //取出最上面的字母
                StringBuffer sb = new StringBuffer();
                for(int j=0;j<n;j++){
                    sb.append(temp);    //对字母进行解压
                }
                if(zimu.isEmpty()){
                    zimu.push(sb);
                }else {
                    zimu.push(zimu.pop().append(sb));   //后面处理过的字符会跟最上面的字符一起被处理
                }
            }else {
                res.append(c);
            }
        }
        System.out.println(zimu);
    }
}
 */
