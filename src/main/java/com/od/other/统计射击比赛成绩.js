/**
 统计射击比赛成绩
给定一个射击比赛成绩单，包含多个选手若干次射击的成绩分数，请对每个选手按其最高3个分数之和进行降序排名，输出降序排名后的选手ID序列。条件如下：
1、一个选手可以有多个射击成绩的分数，且次序不固定。
2、如果一个选手成绩少于3个，则认为选手的所有成绩无效，排名忽略该选手。
3、如果选手的成绩之和相等，则成绩之和相等的选手按照其ID降序排列。

输入描述:
输入第一行，一个整数N，表示该场比赛总共进行了N次射击，产生N个成绩分数（2<=N<=100）。
输入第二行，一个长度为N整数序列，表示参与每次射击的选手ID（0<=ID<=99）。
输入第三行，一个长度为N整数序列，表示参与每次射击的选手对应的成绩（0<=成绩<=100）。
输出描述:
符合题设条件的降序排名后的选手ID序列。

示例1
输入
13
3,3,7,4,4,4,4,7,7,3,5,5,5
53,80,68,24,39,76,66,16,100,55,53,80,55

输出
5,3,7,4

说明
该场射击比赛进行了13次，参赛的选手为{3,4,5,7}。
3号选手成绩：53,80,55，最高3个成绩的和为：80+55+53=188。
4号选手成绩：24,39,76,66，最高3个成绩的和为：76+66+39=181。
5号选手成绩：53,80,55，最高3个成绩的和为：80+55+53=188。
7号选手成绩：68,16,100，最高3个成绩的和为：100+68+16=184。
比较各个选手最高3个成绩的和，有3号=5号>7号>4号，由于3号和5号成绩相等且ID号5>3，所以输出为：5,3,7,4


 */

function demo() {
  let n = Number(readLine());
  let s1 = readLine().split(","); //队员
  let s2 = readLine().split(","); //射击成绩

  // let n = Number("13");
  // let s1 = "3,3,7,4,4,4,4,7,7,3,5,5,5".split(","); //队员
  // let s2 = "53,80,68,24,39,76,66,16,100,55,53,80,55".split(","); //射击成绩

  let map = {}; //将队员和射击成绩放入map对象中

  /**
   * 队员作为key值，成绩作为value值（集合）
   */
  for (let i = 0; i < n; i++) {
    let key = Number(s1[i]);
    let value = Number(s2[i]);
    if (map[key]) {
      map[key].push(value);
    } else {
      let list = [];
      list.push(value);
      map[key] = list;
    }
  }
  /**
   * 将队员id及最高三个成绩之和放入集合list
   */
  var scoreLists = [];

  for (var key in map) {
    let len = map[key].length;
    if (len >= 3) {
      let list = []; //将所有队员数据放在集合scoreLists
      map[key].sort(); //对成绩进行排序并计算三个最高成绩和
      list.push(key);
      list.push(map[key][len - 1] + map[key][len - 2] + map[key][len - 3]);
      scoreLists.push(list);
    }
  }

  scoreLists.sort((a, b) => {
    if (b[1] > a[1]) {
      //成绩高的在前
      return 1;
    }
    if (b[0] > a[0]) {
      //成绩相等时，id高的在前
      return 1;
    }
    return -1;
  });

  let res = "";
  let scoListsLen = scoreLists.length;
  for (let i = 0; i < scoListsLen - 1; i++) {
    res += scoreLists[i][0] + ","; //各队员成绩的第一个数为其id
  }
  console.log(res + scoreLists[scoListsLen - 1][0]);
}

/**
java
https://blog.csdn.net/qq_34465338/article/details/125032767

public class Main{
 
    public static void main(String[] args) {
 
        Scanner sc = new Scanner(System.in);
 
        int n = sc.nextInt();
        sc.nextLine();
 
        String[] s1 = sc.nextLine().split(","); //队员
        String[] s2 = sc.nextLine().split(","); //射击成绩
 
        Map<Integer, List<Integer>> map = new HashMap<>();
 
    //  队员作为key值，成绩作为value值（集合）
		 for(int i=0;i<n;i++){
            int key = Integer.valueOf(s1[i]);
            int value = Integer.valueOf(s2[i]);
            if(map.containsKey(key)){
                map.get(key).add(value);
            }else {
                List<Integer> list = new ArrayList<>();
                list.add(value);
                map.put(key,list);
            }
        }
        //   将队员id及最高三个成绩之和放入集合list
        //   将所有队员数据放在集合lists
        List<List<Integer>> lists = new ArrayList<>();
        map.forEach((a,b)->{
            List<Integer> list = new ArrayList<>();
            if(b.size()>=3){    //成绩大于等于3才有效
                Collections.sort(b);    //升序排序（从小到大）
                list.add(a);    //a为队员id
                //取倒数三个成绩之和为总成绩
                list.add(b.get(b.size()-1)+b.get(b.size()-2)+b.get(b.size()-3));
            }
            lists.add(list);
        });
 
        lists.sort((a,b)->{
            if(b.get(1)>a.get(1)){  //成绩高的在前
                return 1;
            }
            if(b.get(0)>a.get(0)){  //成绩相等时，id高的在前
                return 1;
            }
            return -1;
        });
 
        String res = "";
        for(int i=0;i<lists.size()-1;i++){
            res+=lists.get(i).get(0)+",";   //各队员成绩的第一个数为其id
        }
        System.out.println(res+lists.get(lists.size()-1).get(0));
    }
}

// 解法一
import java.util.*;
import java.util.stream.Collectors;

public class Main {
 public static void main(String[] args) {
    Scanner in = new Scanner(System.in);
    int n = Integer.parseInt(in.nextLine());
    List<Integer> ids = toIntList(in.nextLine());
    List<Integer> scores = toIntList(in.nextLine());
    in.close();

    HashMap<Integer, List<Integer>> map = new HashMap<>();

    for (int i = 0; i < n; i++) {
      Integer id = ids.get(i);
      Integer score = scores.get(i);
      List<Integer> list = map.getOrDefault(id, new LinkedList<>());
      list.add(score);
      map.put(id, list);
    }
    StringBuilder builder = new StringBuilder();

    map.entrySet()
        .stream()
        .filter(x -> x.getValue().size() >= 3)
        .sorted((o1, o2) -> {
          Integer sum1 = sumT3(o1.getValue());
          Integer sum2 = sumT3(o2.getValue());
          if (sum1.equals(sum2)) {
            return o2.getKey() - o1.getKey();
          } else {
            return sum2 - sum1;
          }
        })
        .map(Map.Entry::getKey)
        .forEach(x -> builder.append(x).append(","));

    System.out.println(builder.substring(0, builder.length() - 1));

  }

  private static Integer sumT3(List<Integer> list) {
    list.sort(Integer::compareTo);
    int sum = 0;
    for (int i = list.size() - 1; i >= list.size() - 3; i--) {
      sum += list.get(i);
    }
    return sum;
  }

  private static List<Integer> toIntList(String str) {
    return Arrays.stream(str.split(","))
        .map(Integer::parseInt)
        .collect(Collectors.toList());
  }
}


// 解法二


import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Scanner;

public class Main
{
	public static void main(String[] args)
	{
		Scanner in = new Scanner(System.in);
		String a = in.nextLine();
		String b = in.nextLine();
		String[] bSplit = b.split(",");
		String c = in.nextLine();
		String[] cSplit = c.split(",");
		Map<Integer, Integer> countMap = new java.util.HashMap<>();
		Map<Integer, Integer> cjMap = new java.util.HashMap<>();
		Map<Integer, List<Integer>> cjDataMap = new java.util.HashMap<>();
		for (int i = 0; i < Integer.valueOf(a); i++)
		{
			Integer mc = Integer.valueOf(bSplit[i]);
			Integer cj = Integer.valueOf(cSplit[i]);
			if (countMap.containsKey(mc))
			{
				countMap.put(mc, countMap.get(mc) + 1);
				// cjMap.put(mc, cjMap.get(mc) + cj);
				List<Integer> data = cjDataMap.get(mc);
				insertList(data, cj);
				cjDataMap.put(mc, data);
			} else
			{
				List<Integer> data = new ArrayList<>();
				insertList(data, cj);
				countMap.put(mc, 1);
				// cjMap.put(mc, cj);
				cjDataMap.put(mc, data);
			}
		}
		for (Entry<Integer, List<Integer>> data : cjDataMap.entrySet())
		{
			if (data.getValue().size() < 3)
			{
				continue;
			}
			for (int i = 0; i < data.getValue().size(); i++)
			{
				if (i > 2)
				{
					break;
				}
				if (cjMap.containsKey(data.getKey()))
				{
					cjMap.put(data.getKey(), cjMap.get(data.getKey()) + data.getValue().get(i));
				} else
				{
					cjMap.put(data.getKey(), data.getValue().get(i));
				}
			}
		}
		Map<Integer, Integer> countMapOne = new java.util.HashMap<>();
		Map<Integer, Integer> cjMapOne = new java.util.HashMap<>();
		List<Integer> cjList = new ArrayList<>();
		for (Entry<Integer, Integer> count : countMap.entrySet())
		{
			if (count.getValue() >= 3)
			{
				countMapOne.put(count.getKey(), count.getValue());
				cjMapOne.put(count.getKey(), cjMap.get(count.getKey()));
				if (!cjList.contains(cjMap.get(count.getKey())))
				{
					insertList(cjList, cjMap.get(count.getKey()));
				}
			}
		}
		String ss = "";
		for (Integer integer : cjList)
		{
			List<Integer> mcList = new ArrayList<>();
			for (Entry<Integer, Integer> count : cjMapOne.entrySet())
			{
				if (count.getValue().toString().equals(integer.toString()))
				{
					insertList(mcList, count.getKey());
				}
			}
			for (Integer integer2 : mcList)
			{
				ss += integer2 + ",";
			}
		}
		System.out.println(ss.substring(0, ss.length() - 1));
	}

	private static void insertList(List<Integer> cjList, Integer integer)
	{
		for (int i = 0; i < cjList.size(); i++)
		{
			if (cjList.get(i) < integer)
			{
				cjList.add(i, integer);
				break;
			}
			if (i == cjList.size() - 1)
			{
				cjList.add(integer);
				break;
			}
			if (cjList.get(i) > integer && cjList.get(i + 1) < integer)
			{
				cjList.add(i + 1, integer);
				break;
			}
		}
		if (cjList.isEmpty())
		{
			cjList.add(integer);
		}
	}
}


解法二 

public class Main{
 
    public static void main(String[] args) {
 
        Scanner sc = new Scanner(System.in);
 
        int n = sc.nextInt();
        sc.nextLine();
 
        String[] s1 = sc.nextLine().split(","); //队员
        String[] s2 = sc.nextLine().split(","); //射击成绩
 
        Map<Integer, List<Integer>> map = new HashMap<>();
 
       
        //  队员作为key值，成绩作为value值（集合）
        
		 for(int i=0;i<n;i++){
            int key = Integer.valueOf(s1[i]);
            int value = Integer.valueOf(s2[i]);
            if(map.containsKey(key)){
                map.get(key).add(value);
            }else {
                List<Integer> list = new ArrayList<>();
                list.add(value);
                map.put(key,list);
            }
        }
        //   将队员id及最高三个成绩之和放入集合list
        //   将所有队员数据放在集合lists
        List<List<Integer>> lists = new ArrayList<>();
        map.forEach((a,b)->{
            List<Integer> list = new ArrayList<>();
            if(b.size()>=3){    //成绩大于等于3才有效
                Collections.sort(b);    //升序排序（从小到大）
                list.add(a);    //a为队员id
                //取倒数三个成绩之和为总成绩
                list.add(b.get(b.size()-1)+b.get(b.size()-2)+b.get(b.size()-3));
            }
            lists.add(list);
        });
 
        lists.sort((a,b)->{
            if(b.get(1)>a.get(1)){  //成绩高的在前
                return 1;
            }
            if(b.get(0)>a.get(0)){  //成绩相等时，id高的在前
                return 1;
            }
            return -1;
        });
 
        String res = "";
        for(int i=0;i<lists.size()-1;i++){
            res+=lists.get(i).get(0)+",";   //各队员成绩的第一个数为其id
        }
        System.out.println(res+lists.get(lists.size()-1).get(0));
    }
}

 */
