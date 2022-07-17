/**
标题：找终点 | 时间限制：1秒 | 内存限制：262144K | 语言限制：不限

给定一个正整数数组，设为nums，最大为100个成员，求从第一个成员开始，正好走到数组最后一个成员，所使用的最少步骤数。

要求：
1、第一步必须从第一元素开始，且1<=第一步的步长<len/2;（len为数组的长度，需要自行解析）。
2、从第二步开始，只能以所在成员的数字走相应的步数，不能多也不能少, 如果目标不可达返回-1，只输出最少的步骤数量。
3、只能向数组的尾部走，不能往回走。

输入描述:
由正整数组成的数组，以空格分隔，数组长度小于100，请自行解析数据数量。

输出描述:
正整数，表示最少的步数，如果不存在输出-1


输入描述：
有正整数数组 空格分割，数组长度<100

输出描述 ：
正整数 最小步数，不存在输出-1

例子：
输入
7 5 9 4 2 6 8 3 5 4 3 9
输出
2
第一个可选步长选择2，从第一个成员7开始走两步到9，第二步：从9经过9个成员到最后


例子：
输入
1 2 3 7 1 5 9 3 2 1
输出
-1
 */

function runner(args) {
  let split = args.trim().split(/\s+/g).map(Number);
  let len = split.length;
  let res = [];

  for (let i = 1; i < parseInt(len / 2); i++) {
    let count = 1;
    let step = i;
    while (true) {
      if (step > len - 1) {
        break;
      } else if (step == len - 1) {
        res.push(count);
        break;
      } else {
        count++;
        step += split[step];
      }
    }
  }
  if (res.length) {
    const min = Math.min(...res);
    console.log(min);
  } else {
    console.log(-1);
  }
}
runner("7 5 9 4 2 6 8 3 5 4 3 9");
runner("1 2 3 7 1 5 9 3 2 1");

// ----------第二种解法处理------------ //
let step = 0;
let ins = [];

function getOut(args) {
  let split = args.trim().split(/\s+/g);
  let len = split.length;
  for (let i = 0; i < len; i++) {
    ins[i] = parseInt(split[i]);
  }

  //尝试存在的可能性
  let set = new Set();
  for (let i = 1; i < len / 2; i++) {
    step = 1;
    set.add(getSteps(i));
  }
  let res = Array.from(set);
  if (res.length > 1) {
    res.shift();
    console.log(res[0]);
  } else {
    console.log(-1);
  }
}

//辅助函数，用来处理每一次尝试的过程
function getSteps(curPos) {
  if (curPos <= ins.length - 1) {
    //要先判断是否超出数组范围
    let stepNum = ins[curPos];
    if (curPos == ins.length - 1) return step;
    else if (curPos < ins.length - 1) {
      step++;
      return getSteps(curPos + stepNum); //这里一定要加return
    }
  }
  return -1;
}

getOut("7 5 9 4 2 6 8 3 5 4 3 9");
getOut("1 2 3 7 1 5 9 3 2 1");

/**
 java

 private static void runner() {
    Scanner scanner = new Scanner(System.in);
    String[] split = scanner.nextLine().split("\\s+");
    int startNum = Integer.valueOf(split[0]);
    int step1Max = (split.length) / 2;
    int count = -1;//走的总步数
    int size = split.length;
    // 第一步 [1,len/2) 得考虑第二步，不能多不能少
    // 第二步 split(index)
    if (size - startNum == 0) {
        // 当第一步走num,一步是否能走到
        count = 1;
    } else {
        // 当第一步走num,两步是否能走到
        for (int i = 1; i < step1Max; i++) {
            int num = Integer.valueOf(split[i]);
            // 第二步剩余步数
            if (i + 1 + num == size) {
                count = 2;
            }
        }
    }
    System.out.print(count);
}

 */
