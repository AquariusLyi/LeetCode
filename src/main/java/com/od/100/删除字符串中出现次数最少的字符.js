/**
 删除字符串中出现次数最少的字符

 删除字符串中出现次数最少的字符，如果多个字符出现次数一样则都删除，如果都被删除  则换为empty。

    例子：
    输入
      abcdd
      字符串中只
     输出
      dd

    输入
      aabbccdd

    输出
      empty


 */
//www.cnblogs.com/Jukim/p/16054224.html

function getDeleteWord(args) {
  let line = args.trim();
  let input = args.trim().split("");
  let map = new Map();
  for (let i = 0; i < input.length; i++) {
    const ele = input[i];
    map.set(ele, Number(map.get(ele) || 0) + 1);
  }
  const arr = Array.from(map.values()).sort((a, b) => a - b);
  let min = arr[0];
  for (const [key, val] of map.entries()) {
    if (val == min) {
      // 利用repalce 处理，但是是动态变量，需要通过 new RegExg 处理
      line = line.replace(new RegExp(key, "g"), "");
    }
  }
  if (line.length == 0) {
    console.log("Empty");
  } else {
    console.log(line);
  }
}
getDeleteWord("abcdd");
getDeleteWord("aabbccdd");

/**
解法一：
import java.util.*;

public class Main {

    public static void main (String[] args) {
        Scanner scanner = new Scanner(System.in);
        String text = scanner.nextLine();
        char[] chars = text.toCharArray();
        Map<Character, Integer> char2times = new HashMap<>(10);
        for(int i = 0; i < chars.length; i++){
            if(char2times.containsKey(chars[i])){
                char2times.replace(chars[i], char2times.get(chars[i]) + 1);
            }else{
                char2times.put(chars[i], 1);
            }
        }
        int minTimes = Integer.MAX_VALUE;
        List<Character> minTimesChars = new ArrayList<>(5);
        for(Character character : char2times.keySet()){
            if(char2times.get(character) < minTimes){
                minTimes = char2times.get(character);
                minTimesChars.clear();
                minTimesChars.add(character);
            }else if(char2times.get(character) == minTimes){
                minTimesChars.add(character);
            }
        }
        for (Character minTimesChar : minTimesChars) {
            text = text.replaceAll(minTimesChar.toString(),"");
        }
        System.out.println("".equals(text) ? "empty" : text);
    }

}

 java

     private static void delStr() {
        // 删除情况：字符出现最少的 和 字符次数出现一样的
        Scanner scanner = new Scanner(System.in);
        // 存储每个字符出现的次数
        HashMap<String, Integer> map = new HashMap<>();
        String s = scanner.nextLine();
        char[] chars = s.toCharArray();
        for (int i = 0; i < chars.length; i++) {
            String str = String.valueOf(chars[i]);
            int count;
            if (!map.containsKey(str)) {
                count = 1;
            } else {
                count = (map.get(str) + 1);
            }
            map.put(str, count);
        }
        int min = -1;
        ArrayList<String> del = new ArrayList<>();
        // sameWord key = map的values  vlaues = null 首次存储 第一次 false 多次 true
        HashMap<Integer, Boolean> sameWord = new HashMap<>();
        Integer[] nums = new Integer[map.size()];
        Integer[] n = map.values().toArray(nums);
        Arrays.sort(n);
        min = n[0];
        Iterator<Map.Entry<String, Integer>> iterator = map.entrySet().iterator();
        while (iterator.hasNext()) {
            Map.Entry<String, Integer> obj = iterator.next();
            String key = obj.getKey();
            Integer values = obj.getValue();
            // 1.将最小值对应的单词添加到集合中
            if (values == min) {
                del.add(key);
            }
            // 2.将map的values 做sameWord的key 用于查找哪些values 是有重复的
            if (!sameWord.containsKey(values)) {
                sameWord.put(values, false);
            } else {
                sameWord.put(values, true);
            }
        }
        for (Map.Entry<String, Integer> obj:map.entrySet()) {
            String key = obj.getKey();
            Integer value = obj.getValue();
            // 3.再次遍历用于查找重复次数的单词
            if (!del.contains(key) && sameWord.get(value) != null && sameWord.get(value)) {
                del.add(key);
            }
        }
        StringBuilder sb = new StringBuilder();
        for (char c:chars) {
            if (!del.contains(String.valueOf(c))){
                sb.append(c);
            }
        }
        if (sb.length()==0){
            System.out.print("empty");
        }else {
            System.out.print(sb.toString());
        }
    }

 */
