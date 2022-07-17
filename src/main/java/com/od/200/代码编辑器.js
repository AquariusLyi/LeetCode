/**
 代码编辑器
 
————————————————
版权声明：本文为CSDN博主「今晚想吃雪糕」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/m0_71303609/article/details/125181145
 */

let doNum = Number(readline());
let str = readline();
let index = 0; // 光标位置
for (let i = 0; i < doNum; i++) {
  let item = readline().split(" ");
  let doName = item[0];
  let val = item[1];
  let word = "";
  doSomeThing(doName, val);
}
console.log(str);
function doSomeThing(name, value) {
  switch (name) {
    case "BACKWARD":
      index = index - Number(value) >= 0 ? index - Number(value) : 0;
      break;
    case "SEARCH-FORWARD":
      word = value;
      let wordIndex = str.indexOf(value);
      index = wordIndex > -1 ? wordIndex : index;
      break;
    case "SEARCH-BACKWARD":
      word = value;
      let wordIndex2 = str.lastIndexOf(value);
      index = wordIndex2 > -1 ? wordIndex2 : index;
      break;

    case "INSERT":
      if (index === 0) {
        str = value + str;
      } else {
        str = str.slice(0, index) + value + str.slice(index);
      }
      break;
    case "REPLACE":
      if (index === 0) {
        str = value + str.replace(value, value2);
      } else {
        str = str.slice(0, index) + str.slice(index).replace(word, value);
      }
      break;
    case "DELETE":
      if (index + 1 - Number(value) > 0) {
        str = str.slice(0, index - Number(value)) + str.slice(index);
      } else {
        str = str.slice(index);
      }
      break;
  }
}
