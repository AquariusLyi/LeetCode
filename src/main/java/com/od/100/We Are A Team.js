/**
【We Are A Team】

总共有 n 个人在机房，每个人有一个标号（1<=标号<=n），他们分成了多个团队，需要你根据收到的 m 条消息判定指定的两个人是否在一个团队中，具体的：

1、消息构成为 a b c，整数 a、b 分别代表两个人的标号，整数 c 代表指令

2、c == 0 代表 a 和 b 在一个团队内

3、c == 1 代表需要判定 a 和 b 的关系，如果 a 和 b 是一个团队，输出一行’we are a team’,如果不是，输出一行’we are not a team’

4、c 为其他值，或当前行 a 或 b 超出 1~n 的范围，输出‘da pian zi’

输入描述

第一行包含两个整数 n，m(1<=n,m<100000),分别表示有 n 个人和 m 条消息
随后的 m 行，每行一条消息，消息格式为：a b c(1<=a,b<=n,0<=c<=1)
输出描述: 1、c ==1,根据 a 和 b 是否在一个团队中输出一行字符串，在一个团队中输出‘we are a team‘,不在一个团队中输出’we are not a team’ 2、c 为其他值，或当前行 a 或 b 的标号小于 1 或者大于 n 时，输出字符串‘da pian zi‘
如果第一行 n 和 m 的值超出约定的范围时，输出字符串”Null“。

示例1 输入输出示例仅供调试，后台判题数据一般不包含示例
输入
5 6
1 2 0
1 2 1
1 5 0
2 3 1
2 5 1
1 3 2
输出
we are a team
we are not a team
we are a team
da pian zi

说明
第2行定义了1和2是一个团队
第3行要求进行判定，输出"we are a team"
第4行定义了1和5是一个团队，自然2和5也是一个团队
第5行要求进行判定，输出"we are not a team"
第6行要求进行判定，输出"we are a team"
第7行c为其它值，输出"da pian zi"


示例2 输入输出示例仅供调试，后台判题数据一般不包含示例

输入
5 7
1 2 0
4 5 0
2 3 0
1 2 1
2 3 1
4 5 1
1 5 1

输出

We are a team
We are a team
We are a team
We are not a team

————————————————
版权声明：本文为CSDN博主「旧梦昂志」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/csfun1/article/details/124643796
 */
/**
5 6
1 2 0
1 2 1
1 5 0
2 3 1
2 5 1
1 3 2
 */

function WeAreATeam() {
  // 存储同一个team
  let teamList = [];
  // 存储需要判断是否同一个团队的队友
  let list = [];
  let [people, number] = readline().trim().split(/\s+/).map(Number);
  for (let i = 0; i < number; i++) {
    let nextArr = readline().trim().split(/\s+/).map(Number);
    let [a, b, c] = nextArr;
    if (c == 0) {
      // 标识是否与前面的组是相同团队
      let flag = false;
      for (let set of teamList) {
        if (set.has(a) || set.has(b)) {
          set.add(a);
          set.add(b);
          flag = true;
          break;
        }
      }
      if (!flag) {
        let set = new Set();
        set.add(a);
        set.add(b);
        teamList.push(set);
      }
    } else {
      list.push(a + " " + b + " " + c);
    }
  }
  for (let s of list) {
    let split = s.split(" ");
    let a = parseInt(split[0]);
    let b = parseInt(split[1]);
    let c = parseInt(split[2]);
    if (c != 1) {
      console.log("da pian zi");
    } else {
      let flag = false;
      for (let set of teamList) {
        if (set.has(a) && set.has(b)) {
          console.log("we are a team");
          flag = true;
          break;
        }
      }
      if (!flag) {
        console.log("we are not a team");
      }
    }
  }
}
WeAreATeam();

/**
 java

 public class ZT95 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] nms = sc.nextLine().split(" ");
        int nums = Integer.parseInt(nms[0]);
        int mes = Integer.parseInt(nms[1]);
        List<Set<Integer>> lists = new ArrayList<>();
        List<String> waitForVerify = new ArrayList<>();
        for (int i = 0; i < mes; i++) {
            String real = sc.nextLine();
            String[] rels = real.split(" ");
            int i1 = Integer.parseInt(rels[0]);
            int i2 = Integer.parseInt(rels[1]);
            int i3 = Integer.parseInt(rels[2]);
            if (i3 != 0){
                waitForVerify.add(real);
            }else {
                boolean flag = false;
                for (int j = 0; j < lists.size(); j++) {
                    Set<Integer> set = lists.get(j);
                    if (set.contains(i1) || set.contains(i2)){
                        set.add(i1);
                        set.add(i2);
                        flag = true;
                        break;
                    }
                }
                if (!flag){
                    Set<Integer> set = new HashSet<>();
                    set.add(i1);
                    set.add(i2);
                    lists.add(set);
                }
            }
        }
        //判断非0的关系
        for (int i = 0; i < waitForVerify.size(); i++) {
            String[] reli = waitForVerify.get(i).split(" ");
            int i1 = Integer.parseInt(reli[0]);
            int i2 = Integer.parseInt(reli[1]);
            int i3 = Integer.parseInt(reli[2]);
            if (i3 != 1){
                System.out.println("da pian zi");
                continue;
            }
            for (int j = 0; j < lists.size(); j++) {
                Set<Integer> set = lists.get(j);
                if (set.contains(i1) && set.contains(i2)){
                    System.out.println("we are a team");
                }else {
                    System.out.println("we are not a team");
                }
            }
        }
    }
}

 
 */
