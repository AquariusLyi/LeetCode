/**
敏感字段加密

 标题：敏感字段加密 | 时间限制：1秒 | 内存限制：262144K | 语言限制：不限
 
【敏感字段加密】给定一个由多个命令字组成的命令字符串：
1、字符串长度小于等于127字节，只包含大小写字母，数字，下划线和偶数个双引号；
2、命令字之间以一个或多个下划线_进行分割；
3、可以通过两个双引号""来标识包含下划线_的命令字或空命令字（仅包含两个双引号的命令字），双引号不会在命令字内部出现；
请对指定索引的敏感字段进行加密，替换为******（6个*），并删除命令字前后多余的下划线_。如果无法找到指定索引的命令字，输出字符串ERROR。
输入描述:
输入为两行，第一行为命令字索引K（从0开始），第二行为命令字符串S。
 
输出描述:
输出处理后的命令字符串，如果无法找到指定索引的命令字，输出字符串ERROR


示例1
输入
1
password__a12345678_timeout_100
 
输出
password_******_timeout_100
示例2
输入
2
aaa_password_"a12_45678"_timeout__100_""_
 
输出
aaa_password_******_timeout_100_""

 */

// 不知道 测试用例通过率多少
function jiami() {
  let num = readline().trim();
  let input = readline().trim().split(/_+/g);
  if (!input[0]) {
    input.shift();
  }
  if (!input[input.length - 1]) {
    input.pop();
  }
  let out = [];
  for (let i = 0; i < input.length; i++) {
    if (input[i].includes('"') && input[i + 1] && input[i + 1].includes('"')) {
      let curr = input[i] + input[i + 1];
      out.push(curr);
      i++;
    } else {
      out.push(input[i]);
    }
  }
  out[num] = "******";
  console.log(out.join("_"));
}

// public class Main{

//     public static void main(String[] args) {

//         Scanner sc = new Scanner(System.in);

//         int n = sc.nextInt();
//         sc.nextLine();
//         String s = sc.nextLine();
//         int len = s.length();
//         List<String> list = new ArrayList<>();

//         String temp = "";
//         Boolean yh = false; //是否有引号
//         for(int i=0;i<len;i++){
//             if(s.charAt(i)!='_'){
//                 if(s.charAt(i)=='\"'){
//                     yh = !yh;
//                 }
//                 temp+=s.charAt(i);  //非下划线直接拼接字符
//                 if(i==len-1){
//                     list.add(temp); //最后一位直接push
//                 }
//             }else {
//                 if(temp==""){
//                     continue;   //字符串为空则进入下个循环
//                 }
//                 if(yh){
//                     temp+=s.charAt(i);  //引号内的下划线直接拼接字符串
//                 }else {
//                     list.add(temp); //push字符串
//                     temp = "";  //置空为下次使用
//                 }
//             }
//         }
//         int count = list.size();
//         if(n>=count){
//             System.out.println("ERROR");
//         }else {
//             String res = "";
//             for(int i=0;i<count;i++){
//                 if(i==n){
//                     res+="******";  //对应下标的字符串进行加密
//                 }else {
//                     res+=list.get(i);   //拼接字符串
//                 }
//                 if(i!=list.size()-1){
//                     res+="_";   //非最后一个后面需要加下划线
//                 }
//             }
//             System.out.println(res);
//         }
//     }
// }

/**
 java

https://blog.csdn.net/weixin_44219664/article/details/125175543

 public class Main{
    public static void main(String[] args){
        Scanner scanner=new Scanner(System.in);
        int k=Integer.parseInt(scanner.nextLine());
        String s= scanner.nextLine();
        ArrayList<String> coms=new ArrayList<>();
        for(int i=0;i<s.length();){
            if(s.charAt(i)=='"'){
                int j=i+1;
                for(;j<s.length();j++){
                    if(s.charAt(j)=='"'){
                        break;
                    }
                }
                coms.add(s.substring(i,j+1));
                i=j+1;
                continue;
            }
            if(s.charAt(i)!='_'&&s.charAt(i)!='"'){
                int j=i+1;
                for(;j<s.length();j++){
                    if(s.charAt(j)=='_'){
                        break;
                    }
                }
                coms.add(s.substring(i,j));
                i=j;
                continue;
            }
            if(s.charAt(i)=='_'){
                i++;
                continue;
            }
 
        }
        String out="";
        if(k>=coms.size()){
            System.out.println("ERROR");
            return;
        }
        for(int i=0;i<coms.size()-1;i++){
            if(i!=k){
                out=out+coms.get(i)+"_";
            }else {
                out=out+"******"+"_";
            }
        }
        if(k==coms.size()-1){
            out=out+"******";
        }else {
            out=out+coms.get(coms.size()-1);
        }
        System.out.println(out);
        return;
    }
}


 */
