/**
内存资源分配

有一个简易内存池，内存按照大小粒度分类，每个粒度有若干个可用内存资源，用户会进行一系列内存申请
需要按需分配内存池中的资源，返回申请结果成功失败列表。


分配规则如下
1.分配的内存要大于等于内存的申请量，存在满足需求的内存就必须分配，优先分配粒度小的，但内存不能拆分使用
2.需要按申请顺序分配，先申请的先分配，有可用内存分配则申请结果为true，没有可用则返回false
注释：不考虑内存释放

输入描述
输入为两行字符串，第一行为内存池资源列表，包含内存粒度数据信息，粒度数据间用逗号分割
一个粒度信息内用冒号分割，冒号前为内存粒度大小，冒号后为数量
资源列表不大于1024，每个粒度的数量不大于4096

第二行为申请列表
申请的内存大小间用逗号分割，申请列表不大于100000

如
64:2,128:1,32:4,1:128
50,36,64,128,127

输出描述
输出为内存池分配结果
如true,true,true,false,false

示例一：
输入：
64:2,128:1,32:4,1:128
50,36,64,128,127
输出：
true,true,true,false,false

说明:
内存池资源包含：64k共2个、128k共1个、32k共4个、1k共128个的内存资源
针对50,36,64,128,127的内存申请序列，分配的内存依次是，64,64,128,null,null
第三次申请内存时已经将128分配出去，因此输出的结果是true,true,true,false,false 
 */

function memoryResource() {
  const input = readline().trim().split(",");
  const output = readline().trim().split(",");
  let arr = [];
  input.forEach((item) => {
    arr.push({
      val: +item.split(":")[0],
      num: +item.split(":")[1],
    });
  });
  arr.sort((a, b) => a.val - b.val);
  let result = [];
  for (let i = 0; i < output.length; i++) {
    const ele = output[i];
    let temp = false;
    let len = arr.length;
    for (let j = 0; j < len; j++) {
      const cur = arr[j];
      if (ele < cur.val && cur.num) {
        cur.num--;
        temp = true;
        break;
      }
      //   if (ele < cur.val) {
      //     if (cur.num-- == 0) {
      //       arr.splice(j, 1);
      //       break;
      //     }
      //     temp = true;
      //     break;
      //   }
    }
    result.push(temp);
  }
  console.log(result.join(","));
}
memoryResource();

/**
 java

 
import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String mem = scanner.nextLine();
        String app = scanner.nextLine();
        String[] mems = mem.split(",");
        String[] apps = app.split(",");
        if (mems.length > 1024 || apps.length >100000)
            return;
        Map<Integer,Integer> map = new LinkedHashMap<>();
        for (int i = 0;i<mems.length;i++){
            String[] tmp = mems[i].split(":");
            if (Integer.parseInt(tmp[1]) > 4096)
                return;
            map.put(Integer.parseInt(tmp[0]),Integer.parseInt(tmp[1]));
        }
        for (int i = 0;i<apps.length;i++){
            if (i > 0){
                System.out.print(",");
            }
            List<Integer> list = new ArrayList<>();
            for (Integer integer : map.keySet()){
                if (integer >= Integer.parseInt(apps[i])){
                    list.add(integer);
                }
            }
            if (list.size() > 0){
                Integer a = map.get(Collections.min(list));
                a = a - 1;
                if (a == 0){
                    map.remove(Collections.min(list));
                }else{
                    map.put(Collections.min(list),a);
                }
                System.out.print("true");
            }else{
                System.out.print("false");
            }
        }
    }
}
 */
