/**
 标题：计算堆栈中的剩余数字 | 时间限制：1秒 | 内存限制：32768K | 语言限制：不限
 
 堆栈中的剩余数字

向一个空栈中依次存入正整数， 假设入栈元素n(1<=n<=2^31-1)按顺序依次为nx...n4、n3、n2、n1, 每当元素入栈时，如果n1=n2+...+ny(y的范围[2,x]，1<=x<=1000)，则n1~ny全部元素出栈，重新入栈新元素m(m=2*n1)。
如：依次向栈存入6、1、2、3, 当存入6、1、2时，栈底至栈顶依次为[6、1、2]；当存入3时，3=2+1，3、2、1全部出栈，重新入栈元素6(6=2*3)，此时栈中有元素6；因为6=6，所以两个6全部出栈，存入12，最终栈中只剩一个元素12。


输入描述:
使用单个空格隔开的正整数的字符串，如"5 6 7 8"， 左边的数字先入栈，输入的正整数个数为x，1<=x<=1000。
 
输出描述:
最终栈中存留的元素值，元素值使用空格隔开，如"8 7 6 5"， 栈顶数字在左边。
示例1
输入
5 10 20 50 85 1
 
输出
1 170
 
说明
5+10+20+50=85， 输入85时，5、10、20、50、85全部出栈，入栈170，最终依次出栈的数字为1和170。
示例2
输入
6 7 8 13 9
 
输出
9 13 8 7 6

示例3
输入
1 2 5 7 9 1 2 2
 
输出
4 1 9 14 1

 */

function stackNo() {
  let list = readline().trim().split(/\s+/).map(Number);
  let isChange = true; //判断集合是否变化，初始化为true
  while (list.length != 1 && isChange) {
    //当集合长度不为1且有变化的时候进入循环
    for (let i = 1; i < list.length; i++) {
      let n = i;
      let num = list[i]; //第i个数num
      let isEnd = false;
      let count = 0;
      while (!isEnd) {
        n--;
        count += list[n]; //遍历求前i-1到n的和count
        if (count == num) {
          for (let j = n; j <= i; j++) {
            list.splice(n, 1); //当num==count时剔除i到n的值
          }
          list.push(n, 2 * num); //在下标为n的地方添加2*num
          isEnd = true; //表示结束了，可以跳出本次循环了
          isChange = true; //防止上一轮ischange被置反，所以再次赋值为true
          break; //跳出循环
        }
        if (count > num || n == 0) {
          //count已经大于num或者已经遍历到第一个数了
          isEnd = true; //表示结束了，可以跳出本次循环了
          isChange = false; //没有变化的值
        }
      }
      if (isChange) {
        //当有变化的值的时候需要推出for循环重新进入while循环
        break;
      }
    }
  }

  let res = "";
  for (let i = list.length - 1; i >= 0; i--) {
    res += list[i]; //将数据进行逆向输出
    if (i != 0) {
      res += " ";
    }
  }

  console.log(res);
}
stackNo();

/**
 java

 public class Main{
 
    public static void main(String[] args) {
 
        Scanner sc = new Scanner(System.in);
 
        String[] strings = sc.nextLine().split(" ");
 
        int len = strings.length;
 
        List<Integer> list = new ArrayList<>();
 
        for(int i=0;i<len;i++){
            list.add(Integer.parseInt(strings[i]));     //数字放入集合中
        }
        boolean isChange = true;    //判断集合是否变化，初始化为true
        while (list.size()!=1 && (isChange)){   //当集合长度不为1且有变化的时候进入循环
            for(int i=1;i<list.size();i++){
                int n = i;
                int num = list.get(i);  //第i个数num
                boolean isEnd = false;
                int count = 0;
                while (!isEnd){
                    n--;
                    count += list.get(n);   //遍历求前i-1到n的和count
                    if(count == num){
                        for(int j=n;j<=i;j++){
                            list.remove(n);     //当num==count时剔除i到n的值
                        }
                        list.add(n,2*num);  //在下标为n的地方添加2*num
                        isEnd = true;   //表示结束了，可以跳出本次循环了
                        isChange = true;    //防止上一轮ischange被置反，所以再次赋值为true
                        break;  //跳出循环
                    }
                    if(count>num || n==0){   //count已经大于num或者已经遍历到第一个数了
                        isEnd = true;  //表示结束了，可以跳出本次循环了
                        isChange = false;   //没有变化的值
                    }
                }
                if(isChange){   //当有变化的值的时候需要推出for循环重新进入while循环
                    break;
                }
            }
        }
 
        String res = "";
        for(int i=list.size()-1;i>=0;i--){
            res += list.get(i); //将数据进行逆向输出
            if(i!=0){
                res+=" ";
            }
        }
 
        System.out.println(res);
 
    }
 
}
 */
