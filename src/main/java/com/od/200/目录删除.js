/**
 目录删除

【Directory 删除】

 某文件系统中有N个目录，每个目录都一个独一无二的ID。每个目录只有一个父目录，但每个父目录下可以有零个或者多个子目录，目录结构呈树状结构。

假设，根目录的ID为0，且根目录没有父目录，其他所有目录的ID用唯一的正整数表示，并统一编号。

现给定目录ID和其父目录ID的对应父子关系表[子目录ID，父目录ID]，以及一个待删除的目录ID，请计算并返回一个ID序列，表示因为删除指定目录后剩下的所有目录，返回的ID序列以递增序输出。

注意：

1、被删除的目录或文件编号一定在输入的ID序列中；

2、当一个目录删除时，它所有的子目录都会被删除。

输入描述:

输入的第一行为父子关系表的长度m；接下来的m行为m个父子关系对；最后一行为待删除的ID。序列中的元素以空格分割，参见样例。

输出描述:

输出一个序列，表示因为删除指定目录后，剩余的目录ID。

示例1

输入
5
8 6
10 8
6 0
20 8
2 6
8

输出
2 6

目录结构如下所示：

6

/ |

2 8

删除目录8，同时它的子目录10也被删除，剩余2和6两个目录。

————————————————
版权声明：本文为CSDN博主「傻X」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/tiger9991/article/details/107037724

https://img-blog.csdnimg.cn/20200630143312479.png

 */

function deleteDirectory() {
  let n = Number(readline());
  let list = [];
  var res = "";
  var arr = []; //let test = ["8 6","10 8","6 0","20 8","2 6"]

  for (let i = 0; i < n; i++) {
    let ints = readline().split(/\s+/).map(Number);
    if (arr.indexOf(ints[0]) == -1) {
      arr.push(ints[0]);
    }
    if (arr.indexOf(ints[1]) == -1) {
      arr.push(ints[1]);
    }
    list.push(ints); //将目录关系表以数组的方式存储在集合中
  }

  let id = Number(readline());
  //let id = Number("8");
  let index = arr.indexOf(id);
  arr.splice(index, 1);

  deleteDirec(list, id);

  arr.sort();

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == 0) {
      continue;
    }
    res += arr[i];
    if (i != arr.length - 1) {
      res += " ";
    }
  }

  console.log(res);

  /**
   *
   * @param list  目录关系表集合
   * @param n     需要剔除的目录
   */
  function deleteDirec(list, n) {
    for (let i = 0; i < list.length; i++) {
      if (list[i][1] == n) {
        //找到需要剔除的目录的关系数组
        let index = arr.indexOf(list[i][0]);
        arr.splice(index, 1);
        delete (list, list[i][0]);
      }
    }
  }
}
deleteDirectory();

/**
 c++
 #include<bits/stdc++.h>

using namespace std;

int main(int argc, const char **argv) 
{
    int n;
    int temp;
    int delete_value = 0;
    int delete_index = 0;
    vector<vector<int> > count; 
    cin >> n;
    for (int i = 0; i < n; i++) {
        vector<int> MiddleUse;
        cin >> temp;
        MiddleUse.push_back(temp);
        cin >> temp;
        MiddleUse.push_back(temp);
        count.push_back(MiddleUse); 
    }
    cin >> delete_value;
    sort(count.begin(), count.end()); 

    for (int i = 0; i < n - 1; i++) {
        if (count[i][0] == delete_value) {
            delete_index = i;
        }
    }

    for (int k = 0; k < delete_index; k++) {
        if (count[k][1] == 0) {
            continue;
        }
        cout << count[k][0] << " " << count[k][1] << endl;
    }
    return 0;
}
 
 */
