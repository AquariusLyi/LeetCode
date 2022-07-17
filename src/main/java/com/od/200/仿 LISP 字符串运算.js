/**
 仿LISP运算

LISP 语言唯一的语法就是括号要配对。
形如 (OP P1 P2 …)，括号内元素由单个空格分割。
其中第一个元素 OP 为操作符，后续元素均为其参数，参数个数取决于操作符类型。
注意：参数 P1, P2 也有可能是另外一个嵌套的 (OP P1 P2 …) 当前 OP 类型为 add/sub/mul/div(全小写)，分别代表整数的加减乘除法。简单起见，所以 OP 参数个数为 2
输入描述
输入为长度不超过 512 的字符串，用例保证了无语法错误；
输出描述
除零错误时，输出"error"，除法遇除不尽，取整，即 3/2=1
示例 1
输入
(div 12 (sub 45 45))
输出
error
说明
45 减 45 得 0，12 除以 0，为除零错误，输出 error
示例 2
输入
(add 1 (div -7 3))
输出
-2
说明 
-7 除以 3 向下取整得-3，1 加-3 得-2
示例 3
输入
(mul 3 -7)
输出
-21
示例 4
输入
(add 1 2)
输出
-3
示例 5
输入
(sub (mul 2 4) (div 9 3))
输出
5
示例 6
输入
(div 1 0)
输出
error
题目设计数字均为整数，可能为负；不考虑 32 位溢出翻转，计算过程中也不会发生 32 位溢出翻转。
解题思路
常规方法是用两个栈分别存放操作数和操作符，首先从后往前提取操作数和操作符存放在 ，然后判断。

 */

function LISP() {
  let arr = readline().trim().split(/\s+/); //输入可以按照空格分割长数组
  let mark = []; //符合堆栈
  let nums = []; //数字堆栈
  let isError = false; //除0表示计算错误
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].includes("a")) {
      mark.push("+"); //如果包含a则表示+
    } else if (arr[i].includes("b")) {
      mark.push("-"); //如果包含b则表示-
    } else if (arr[i].includes("m")) {
      mark.push("*"); //如果包含m则表示*
    } else if (arr[i].includes("v")) {
      mark.push("/"); //如果包含v则表示/
    } else if (arr[i].includes(")")) {
      //如果包含)则表示需要进行计算
      let digit = ""; //）前面的数字
      for (let j = 0; j < arr[i].length; j++) {
        //包含）的字符串需要筛选出数字
        if (arr[i][j] == ")") {
          //考虑到都有多个）,需要计算多次
          if (digit.length != 0) {
            //如果是0表示已经计算过一次
            nums.push(parseInt(digit)); //将数字放入数堆栈中
            digit = ""; //需要置空（这一步很关键）
          }
          let b = nums.pop(); //第二个数
          let a = nums.pop(); //第一个数
          let f = mark.pop(); //符号
          if (f == "/" && b == 0) {
            //除数为0则退出，输出error
            isError = true;
            break;
          } else {
            nums.push(Calc(a, b, f)); //将计算完的数据放入数堆栈中进入下次的计算
          }
        } else {
          digit += arr[i][j]; //不到）都表示数字（主要考虑到多位数）
        }
      }
    } else {
      nums.push(parseInt(arr[i]));
    }
    if (isError) {
      break;
    }
  }
  if (isError) {
    console.log("error");
  } else {
    console.log(nums[0]);
  }
}

function Calc(a, b, f) {
  switch (f) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return Math.floor(a / b); //向下取整
  }
  return 0;
}

LISP();

/**
 java

 public class Main{
 
    public static void main(String[] args) {
 
        Scanner sc = new Scanner(System.in);
 
        //(sub (mul 2 4) (div 9 3))
        // add / sub / mul / div
 
        String[] s = sc.nextLine().split(" ");  //输入可以按照空格分割长数组
 
        Deque<String> mark = new ArrayDeque<>();   //符合堆栈
        Deque<Integer> nums = new ArrayDeque<>();    //数字堆栈
        boolean isError = false;    //除0表示计算错误
 
        for(int i=0;i<s.length;i++){
            if(s[i].contains("a")){ //如果包含a则表示+
                mark.push("+");
            }else if(s[i].contains("b")){   //如果包含b则表示-
                mark.push("-");
            }else if(s[i].contains("m")){   //如果包含m则表示*
                mark.push("*");
            }else if(s[i].contains("v")){   //如果包含v则表示/
                mark.push("/");
            }else if(s[i].contains(")")){   //如果包含)则表示需要进行计算
                String digit = "";   //）前面的数字
                for(int j=0;j<s[i].length();j++){   //包含）的字符串需要筛选出数字
                    if(s[i].charAt(j)==')'){    //考虑到都有多个）,需要计算多次
                        if(digit.length()!=0){   //如果是0表示已经计算过一次
                            nums.push(Integer.parseInt(digit));   //将数字放入数堆栈中
                            digit = "";  //需要置空（这一步很关键）
                        }
                        int b = nums.pop();  //第二个数
                        int a = nums.pop();  //第一个数
                        String f = mark.pop(); //符号
                        if(f=="/" && b==0){ //除数为0则退出，输出error
                            isError = true;
                            break;
                        }else {
                            nums.push(Calc(a,b,f));    //将计算完的数据放入数堆栈中进入下次的计算
                        }
                    }else {
                        digit +=s[i].charAt(j);  //不到）都表示数字（主要考虑到多位数）
                    }
                }
            }else {
                nums.push(Integer.parseInt(s[i]));
            }
            if(isError){break;}
        }
 
        if(isError){
            System.out.println("error");
        }else {
            System.out.println(nums.peek());
        }
    }
 
    public static int Calc(int a,int b,String f){
        switch (f){
            case "+":
                return a+b;
            case "-":
                return a-b;
            case "*":
                return a*b;
            case "/":
                return Math.floorDiv(a,b);  //向下取整
        }
        return 0;
    }
 
}
 */

/**
 public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String input = scanner.nextLine();
        Stack<String> opStack = new Stack<>();
        Stack<Integer> dataStack = new Stack<>();
        try {
            exec(input, opStack, dataStack);
        } catch (Exception e) {
            System.out.println("error");
        }

    }
    public static void exec(String input, Stack<String> opStack, Stack<Integer> dataStack) {
        int length = input.length();
        for (int i = 0; i < length; ) {
            char c = input.charAt(i);
            // 如果是空格，跳过当前循环
            if (c == ' ') {
                i++;
                continue;
            }
            if (c == '(') {
                // 操作符入栈
                opStack.push(input.substring(i + 1, i + 4));
                // 修改循环下标并跳过当前循环
                i = i + 4;
                continue;
            }
            // 如果是数字，连续读取，并压入数据栈
            if (c == '-' || Character.isDigit(c)) {
                int j = i;
                while (Character.isDigit(input.charAt(j + 1))) {
                    j++;
                }
                dataStack.push(Integer.valueOf(input.substring(i, j + 1)));
                i = j + 1;
                continue;
            }
            if (c == ')') {
                // 取出操作符和数据，并将计算结果压入数据栈中
                String op = opStack.pop();
                Integer p2 = dataStack.pop();
                Integer p1 = dataStack.pop();
                Integer result = calculate(op, p1, p2);
                dataStack.push(result);
                i++;
            }
        }
        if (opStack.empty()) {
            // 如果操作符栈为空，则输出数据栈结果
            System.out.println(dataStack.pop());
        } else {
            throw new RuntimeException();
        }
    }

    public static Integer calculate(String op, Integer p1, Integer p2) {
        switch (op) {
            case "add":
                return p1 + p2;
            case "sub":
                return p1 - p2;
            case "mul":
                return p1 * p2;
            case "div":
                return p1 / p2;
            default:
                throw new RuntimeException();
        }
    }
}

 */
