/**
 疫情过后希望小学终于又重新开学了，3年2班开学第一天的任务是：将后面的黑板报重新制作。
黑板上已经写上了N个正整数，同学们需要给这每个数分别上一种颜色，为了让黑板报既美观又有学习意义
老师要求同种颜色的所有数都可以被这个颜色中最小的那个数整除，现在帮小朋友们算算最少需要多少种颜色，给这N个数进行上色

输入描述
第一行有一个正整数N，其中 1 <= n <=100
第二行有N个int型数，保证输入数据在[1,100]范围中，表示黑板上各个正整数的值

输出描述
输出只有一个整数，为最少需要的颜色种数

输入
3
2 4 6
输出
1
说明：
所有数都能被2整除

输入
4
2 3 4 9
输出
2
说明：
2与4涂一种颜色，4能被2整除
3与9涂另一种颜色，9能被3整除
不能涂同一种颜色

https://www.cnblogs.com/Jukim/p/16058062.html
 */

function blackNum(str1, str2) {
  let num = +str1.trim();
  let arr = str2.trim().split(/\s+/g).map(Number);
  if (num == 0) {
    console.log(0);
    return 0;
  }
  arr.sort((a, b) => a - b);
  if (arr[0] == 1) {
    console.log(1);
    return;
  }
  for (let i = 0; i < arr.length; i++) {
    const ele = arr[i];
    for (let j = i + 1; j < arr.length; ) {
      if (arr[j] % ele == 0) {
        arr.splice(j, 1);
      } else {
        j++;
      }
    }
  }
  console.log(arr, arr.length);
}
blackNum("4", "2 3 4 9");
blackNum("4", "1 3 4 9");
blackNum("3", "2 4 6");
blackNum("7", "2 3 4 6 10 21 25");

function colorPaint(num, arr) {
  if (num == 0) {
    return 0;
  }
  if (num == 1) {
    return 1;
  }
  let first = arr[0],
    otherColor = [];
  for (let i = 1; i < arr.length; i++) {
    // 将不能被第一个最小的数整除的数都放入到一个数组当中,if条件中为0不会运行,也就是无法整除的数放入到数组当中
    if (arr[i] % first) {
      otherColor.push(arr[i]);
    }
  }
  // 对无法整除的数递归,继续区分不同颜色的数中的不同颜色
  return 1 + colorPaint(otherColor.length, otherColor);
}

function main(n, list) {
  list.sort((a, b) => a - b);
  let res = colorPaint(n, list);
  return res;
}
console.log(main(7, [2, 3, 4, 6, 10, 21, 25])); //打印结果为:3

/**
 java

 
import com.sun.imageio.plugins.common.I18N;

import java.util.*;
import java.util.stream.Collectors;

public class Main {

    public static void main(String [] args){
        Scanner input = new Scanner(System.in);
        Map<Integer,List<Integer>> result = new HashMap<>();
        List<Integer> numList = new ArrayList<>();
        while(input.hasNext()){
            Integer N = input.nextInt();
            for(int i=0;i<N;i++){
                numList.add(input.nextInt());
            }
            numList = numList.stream().sorted().collect(Collectors.toList());
            for(int i =0;i<numList.size();i++){
                if(i==0){
                    List<Integer> singleList = new ArrayList<>();
                    singleList.add(numList.get(i));
                    result.put(numList.get(i),singleList);
                }else{
                    List<Map.Entry<Integer,List<Integer>>> mapList = result.entrySet().stream().collect(Collectors.toList());
                    for(int j=0;j<mapList.size();j++){
                        if(numList.get(i)%mapList.get(j).getKey()==0){
                            result.get(mapList.get(j).getValue().add(numList.get(i)));
                            break;
                        }else {
                            if(j==mapList.size()-1){
                                List<Integer> singleList = new ArrayList<>();
                                singleList.add(numList.get(i));
                                result.put(numList.get(i),singleList);
                            }
                        }

                    }
                }
            }
            System.out.println(result.size());
        }
    }
}

// 解法二

import java.util.*;
public class Main3 {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        String nStr = in.nextLine();
        String[] nums = in.nextLine().split(" ");
        in.close();

        TreeSet<Integer> ints = new TreeSet<>();
        for (String num : nums) {
            ints.add(Integer.parseInt(num));
        }

        if (ints.contains(1)) {
            System.out.println(1);
            ints.remove(1);
            return;
        }

        ArrayList<Integer> intList = new ArrayList<>(ints);
        for (int i = 0; i < intList.size(); i++) {
            Integer cur = intList.get(i);
            for (int j = i + 1; j < intList.size(); ) {
                if (intList.get(j) % cur == 0) {
                    intList.remove(j);
                } else j++;
            }
        }
        System.out.println(intList.size());
    }
}

 */
