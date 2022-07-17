/**
 
【热点网站统计】

企业路由器的统计页面，有一个功能需要动态统计公司访问最多的网页URL top N。请设计一个算法，可以高效动态统计Top N的页面。

输入描述

每一行都是一个URL或一个数字，如果是URL，代表一段时间内的网页访问；
如果是一个数字N，代表本次需要输出的Top N个URL。

输入约束

1、总访问网页数量小于5000个，单网页访问次数小于65535次；
2、网页URL仅由字母，数字和点分隔符组成，且长度小于等于127字节；
3、数字是正整数，小于等于10且小于当前总访问网页数；

输出描述

每行输入要对应一行输出，输出按访问次数排序的前N个URL，用逗号分隔。

输出要求

1、每次输出要统计之前所有输入，不仅是本次输入；
2、如果有访问次数相等的URL，按URL的字符串字典序升序排列，输出排序靠前的URL；

示例1   输入输出示例仅供调试，后台判题数据一般不包含示例

输入

news.qq.com
news.sina.com.cn
news.qq.com
news.qq.com
game.163.com
game.163.com
www.huawei.com
www.cctv.com
3
www.huawei.com
www.cctv.com
www.huawei.com
www.cctv.com
www.huawei.com
www.cctv.com
www.huawei.com
www.cctv.com
www.huawei.com
3

输出

news.qq.com,game.163.com,news.sina.com.cn
www.huawei.com,www.cctv.com,news.qq.com

示例2   输入输出示例仅供调试，后台判题数据一般不包含示例

输入

news.qq.com
www.cctv.com
1
www.huawei.com
www.huawei.com
2
3

输出

news.qq.com
www.huawei.com,news.qq.com
www.huawei.com,news.qq.com,www.cctv.com

 */

var websiteStatic = function () {
  let map = new Map();
  while ((line = readline())) {
    if (!/^\d+$/.test(line)) {
      let host = line.trim();
      map.set(host, (map.get(host) || 0) + 1);
    } else {
      let num = parseInt(line);
      let res = Array.from(map).sort((a, b) => {
        // a[1]是次数 a[0]是字符串
        if (a[1] !== b[1]) {
          return b[1] - a[1]; // 当次数不相等时，按从大到小排序
        } else {
          if (b[0] > a[0]) {
            return -1;
          } else {
            return 1; // 当次数相等时，按从小到大排序
          }
        }
      });
      res = res.splice(0, num); // 截取结果数组中前n个
      let result = [];
      // res是一个二维数组，需要遍历取出每个元素的第一个元素
      for (const value of res) {
        result.push(value[0]);
      }
      console.log(result.join());
    }
  }
};
websiteStatic();

/**
 java

 import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class TopNWebsite {

    public static void main(String[] args) {

        List<String> urls = new ArrayList<>();

        List<Integer> counts = new ArrayList<>();

        Scanner in = new Scanner(System.in);
        while (in.hasNextLine()) {
            String inputOneLine = in.nextLine();
            if (inputOneLine.matches("\\d")) {
                System.out.println(countForUrl(urls, Integer.parseInt(inputOneLine)));
            } else {
                if (!urls.contains(inputOneLine)) {
                    urls.add(inputOneLine);
                    counts.add(0);
                }
                int index = urls.indexOf(inputOneLine);
                int currCount = counts.get(index) + 1;

                int newIndex = getMaxIndex(index, currCount, counts, urls);
                urls.add(newIndex, urls.remove(index));
                counts.add(newIndex, counts.remove(index) + 1);
            }
        }
    }

    private static String countForUrl(List<String> urls, int topN) {
        StringBuilder rst = new StringBuilder();
        for (int index = 0; index < topN; index++) {
            rst.append(urls.get(index)).append(",");
        }
        return rst.deleteCharAt(rst.length() - 1).toString();
    }

    private static int getMaxIndex(int currIndex, int currCount, List<Integer> counts, List<String> urls) {
        if (currIndex > 0 && (currCount > counts.get(currIndex - 1) || currCount == counts.get(currIndex - 1) && !isAsciTop(urls.get(currIndex), urls.get(currIndex - 1)))) {
            return getMaxIndex(currIndex - 1, currCount, counts, urls);
        }
        return currIndex;
    }

    private static boolean isAsciTop(String currUrl, String oldUrl) {
        char[] currUrlChrs = currUrl.toCharArray();
        char[] oldUrlChrs = oldUrl.toCharArray();
        for (int index = 0; index < currUrlChrs.length && index < oldUrlChrs.length; index++) {
            if (currUrlChrs[index] == oldUrlChrs[index]) {
                continue;
            }
            return currUrlChrs[index] > oldUrlChrs[index];
        }
        return false;
    }
}
 */

/**
 other  js


var websiteStatic = function (arr) {
  // 声明一个map，用于记录数组中相同元素的个数
  let map = new Map();

  // 当传递进来的数组长度大于1时
  while (arr.length && arr.length > 1) {
    // 遍历数组
    for (let i = 0; i < arr.length; i++) {
      // 因为数组中有字符串类型元素，还有整数类型元素
      if (typeof arr[i] === "string") {
        if (map.has(arr[i])) {
          // 把数组中的值存进去
          map.set(arr[i], map.get(arr[i]) + 1);
        } else {
          map.set(arr[i], 1);
        }
      } else {
        let n = arr[i];
        // 将map转换成二维数组，并按元素出现的次数排序
        let res = Array.from(map).sort((a, b) => {
          // a[1]是次数 a[0]是字符串
          // 当次数不相等时，按从大到小排序
          if (a[1] !== b[1]) {
            return b[1] - a[1];
          } else {
            // 当次数相等时，按从小到大排序
            if (b[0] > a[0]) {
              return -1;
            } else {
              return 1;
            }
          }
        });

        // 截取结果数组中前n个
        res = res.splice(0, n);
        // 删除原数组中的前i个元素
        arr.splice(0, i + 1);

        let result = [];

        // res是一个二维数组，需要遍历取出每个元素的第一个元素
        for (const value of res) {
          result.push(value[0]);
        }
        console.log(result.join());
      }
    }
  }
};

let arr = [
  "news.qq.com",
  "news.sina.com.cn",
  "news.qq.com",
  "news.qq.com",
  "game.163.com",
  "game.163.com",
  "www.huawei.com",
  "www.cctv.com",
  3,
  "www.huawei.com",
  "www.cctv.com",
  "www.huawei.com",
  "www.cctv.com",
  "www.huawei.com",
  "www.cctv.com",
  "www.huawei.com",
  "www.cctv.com",
  "www.huawei.com",
  3,
];
websiteStatic(arr);
 */
