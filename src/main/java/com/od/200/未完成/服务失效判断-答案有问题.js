/**
 服务失效判断
标题：服务失效判断 | 时间限制：1秒 | 内存限制：32768K | 语言限制：不限
 
某系统中有众多服务，每个服务用字符串（只包含字母和数字，长度<=10）唯一标识，服务间可能有依赖关系，如A依赖B，则当B故障时导致A也故障。
依赖具有传递性，如A依赖B，B依赖C，当C故障时导致B故障，也导致A故障。
给出所有依赖关系，以及当前已知故障服务，要求输出所有正常服务。
依赖关系：服务1-服务2  表示“服务1”依赖“服务2”
不必考虑输入异常，用例保证：依赖关系列表、故障列表非空，且依赖关系数，故障服务数都不会超过3000，服务标识格式正常。
输入描述:
半角逗号分隔的依赖关系列表（换行）
半角逗号分隔的故障服务列表
 
输出描述:
依赖关系列表中提及的所有服务中可以正常工作的服务列表，用半角逗号分隔，按依赖关系列表中出现的次序排序。
特别的，没有正常节点输出单独一个半角逗号。
示例1
输入
a1-a2,a5-a6,a2-a3
a5,a2
 
输出
a6,a3
 
说明
a1依赖a2，a2依赖a3，所以a2故障，导致a1不可用，但不影响a3；a5故障不影响a6。所以可用的是a3、a6，在依赖关系列表中a6先出现，所以输出:a6,a3
示例2
输入
a1-a2
a2
 
输出
,
说明
a1依赖a2，a2故障导致a1也故障，没有正常节点，输出一个逗号

 */

public class fuwushixiaopanduan {
 
    public static void main(String[] args) {
 
        Scanner sc = new Scanner(System.in);
 
        String[] strings = sc.nextLine().split(",");
        sc.nextLine();
        String[] guzhang = sc.nextLine().split(",");
 
        List<String[]> list = new ArrayList<>();    //依赖关系集合
        List<String> listS = new ArrayList<>();     //所有服务集合
        List<String> listGZ = Arrays.asList(guzhang);   //故障集合
        for(int i=0;i<strings.length;i++){
            list.add(strings[i].split("-"));
            String a = strings[i].split("-")[0];
            String b = strings[i].split("-")[1];
            if(!listS.contains(a)){
                listS.add(a);
            }
            if(!listS.contains(b)){
                listS.add(b);
            }
        }
 
        for(int i=0;i<listGZ.size();i++){
            listS.remove(listGZ.get(i));    //将故障服务从所有服务中剔除
        }
        List<String> listZC = new ArrayList<>();    //保持正常的服务
        for(int i=0;i<listS.size();i++){
            String x = listS.get(i);    //此时的服务
            if(!isGz(list,x,listGZ)){      //如果非故障则取出
                listZC.add(x);
            }
        }
 
        int len = listZC.size();
        if(len==0){
            System.out.println(",");
        }else {
            String res = "";
            for(int i=0;i<len;i++){
                res+=listZC.get(i);
                if(i!=len-1){
                    res+=",";
                }
            }
            System.out.println(res);
        }
    }
 
    public static boolean isGz(List<String[]> l,String s,List<String> gz){  //服务依赖关系集合，需要判断的服务，故障服务集合
        if(gz.contains(s)){ //此时服务故障则返回true
            return true;
        }
        for(int i=0;i<l.size();i++){
            if(l.get(i)[0].equals(s) && isGz(l,l.get(i)[1],gz)){    //如果此时服务依赖另外一个服务，则对依赖的服务进行一次故障判断，如为故障则返回true
                return true;
            }
        }
        return false;
    }
 
}

/**
 java

 public class fuwushixiaopanduan {
 
    public static void main(String[] args) {
 
        Scanner sc = new Scanner(System.in);
 
        String[] strings = sc.nextLine().split(",");
        sc.nextLine();
        String[] guzhang = sc.nextLine().split(",");
 
        List<String[]> list = new ArrayList<>();    //依赖关系集合
        List<String> listS = new ArrayList<>();     //所有服务集合
        List<String> listGZ = Arrays.asList(guzhang);   //故障集合
        for(int i=0;i<strings.length;i++){
            list.add(strings[i].split("-"));
            String a = strings[i].split("-")[0];
            String b = strings[i].split("-")[1];
            if(!listS.contains(a)){
                listS.add(a);
            }
            if(!listS.contains(b)){
                listS.add(b);
            }
        }
 
        for(int i=0;i<listGZ.size();i++){
            listS.remove(listGZ.get(i));    //将故障服务从所有服务中剔除
        }
        List<String> listZC = new ArrayList<>();    //保持正常的服务
        for(int i=0;i<listS.size();i++){
            String x = listS.get(i);    //此时的服务
            if(!isGz(list,x,listGZ)){      //如果非故障则取出
                listZC.add(x);
            }
        }
 
        int len = listZC.size();
        if(len==0){
            System.out.println(",");
        }else {
            String res = "";
            for(int i=0;i<len;i++){
                res+=listZC.get(i);
                if(i!=len-1){
                    res+=",";
                }
            }
            System.out.println(res);
        }
    }
 
    public static boolean isGz(List<String[]> l,String s,List<String> gz){  //服务依赖关系集合，需要判断的服务，故障服务集合
        if(gz.contains(s)){ //此时服务故障则返回true
            return true;
        }
        for(int i=0;i<l.size();i++){
            if(l.get(i)[0].equals(s) && isGz(l,l.get(i)[1],gz)){    //如果此时服务依赖另外一个服务，则对依赖的服务进行一次故障判断，如为故障则返回true
                return true;
            }
        }
        return false;
    }
 
}

// 解法二

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Scanner;

public class Service {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        String[] strings = sc.nextLine().split(",");
        sc.nextLine();
        String[] guzhang = sc.nextLine().split(",");

        List<String[]> list = new ArrayList<>(); 
        List<String> listS = new ArrayList<>(); 
        List<String> listGZ = Arrays.asList(guzhang);
        for (String string : strings) {
            list.add(string.split("-"));
            String a = string.split("-")[0];
            String b = string.split("-")[1];
            if (!listS.contains(a)) {
                listS.add(a);
            }
            if (!listS.contains(b)) {
                listS.add(b);
            }
        }

        for (String s : listGZ) {
            listS.remove(s); 
        }

        List<String> listZC = new ArrayList<>();
        for (String x : listS) {
            if (!isGz(list, x, listGZ)) { 
                listZC.add(x);
            }
        }

        int len = listZC.size();
        if (len == 0) {
            System.out.println(",");
        } else {
            StringBuilder res = new StringBuilder();
            for (int i = 0; i < len; i++) {
                res.append(listZC.get(i));
                if (i != len - 1) {
                    res.append(",");
                }
            }
            System.out.println(res);
        }
    }

    public static boolean isGz(List<String[]> l, String s, List<String> gz) { 
        if (gz.contains(s)) { 
            return true;
        }
        for (int i = 0; i < l.size(); i++) {
            if (l.get(i)[0].equals(s) && isGz(l, l.get(i)[1], gz)) { 
                return true;
            }
        }
        return false;
    }
}
 */
