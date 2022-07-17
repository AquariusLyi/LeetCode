/**
 标题：找单词 | 时间限制：1秒 | 内存限制：32768K | 语言限制：不限
 
给一个字符串和一个二维字符数组，如果该字符串存在于该数组中，则按字符串的字符顺序输出字符串每个字符所在单元格的位置下标字符串，如果找不到返回字符串"N"。
1.需要按照字符串的字符组成顺序搜索，且搜索到的位置必须是相邻单元格，其中“相邻单元格”是指那些水平相邻或垂直相邻的单元格。
2.同一个单元格内的字母不允许被重复使用。
3.假定在数组中最多只存在一个可能的匹配。


输入描述:
1.第1行为一个数字（N）指示二维数组在后续输入所占的行数。
2.第2行到第N+1行输入为一个二维大写字符数组，每行字符用半角,分割。
3.第N+2行为待查找的字符串，由大写字符组成。
4.二维数组的大小为N*N，0<N<=100。
5.单词长度K，0<K<1000。
 
输出描述:
输出一个位置下标字符串，拼接格式为：第1个字符行下标+","+第1个字符列下标+","+第2个字符行下标+","+第2个字符列下标...+","+第N个字符行下标+","+第N个字符列下标
示例1
输入
4
A,C,C,F
C,D,E,D
B,E,S,S
F,E,C,A
ACCESS
 
输出
0,0,0,1,0,2,1,2,2,2,2,3
 
ACCESS分别对应二维数组的[0,0]  [0,1] [0,2] [1,2] [2,2] [2,3]下标位置

 */

public class Main{
 
    public static int n;
    public static int slen;
    public static String res;
    public static String inputS;
 
    public static void main(String[] args) {
 
        Scanner sc = new Scanner(System.in);
 
        n = sc.nextInt();
        sc.nextLine();
        String[][] strings = new String[n][n];
 
        for(int i=0;i<n;i++){
            String[] inputStrings = sc.nextLine().split(",");
            for(int j=0;j<n;j++){
                strings[i][j] = inputStrings[j];
            }
        }
 
        inputS = sc.nextLine();
        slen = inputS.length();
        String first = String.valueOf(inputS.charAt(0));//从第一个值开始
        boolean isSuccess = false;
        for(int i=0;i<n;i++){
            for(int j=0;j<n;j++){
                if(strings[i][j].equals(first)){
                    String[][] temp = copy(strings);    //对数组进行复制，否则影响第二次计算
                    res = i + "," + j;
                    temp[i][j] = ""; //已取出的值置空
                    if(nextNum(0,i,j,temp)==1){ //表示已经成功取出数据
                        isSuccess = true;
                        System.out.println(res);
                        break;
                    }
                }
            }
            if(isSuccess){
                break;
            }
        }
        if(!isSuccess){
            System.out.println("N");
        }
    }
 
    public static String[][] copy(String[][] strings){
        int x = strings.length;
        String[][] copyS = new String[x][x];
 
        for ( int i=0; i<x; i++) {
            for ( int j=0; j<x; j++) {
                copyS[i][j] = strings[i][j];
            }
        }
        return copyS;
    }
 
    public static int nextNum(int index, int row, int col, String[][] temp){
 
        if(index==slen-1){  //递归到最后一位表示已经成功
            return 1;
        }
        index++;    //字符串下标
        String s= String.valueOf(inputS.charAt(index));
 
        if(row>0 && temp[row-1][col].equals(s)){    //对上边的字符串进行比较
            temp[row-1][col] = "";  //将已经取出的字符串进行置空，防止多次取值
            res += ","+ (row-1)+","+col;    //添加坐标
            if(nextNum(index,row-1,col,temp) == 1){ //值为1表示成功取出
                return 1;
            }else {
                res = res.substring(0,res.length()-4);  //如果失败则进行还原
                temp[row-1][col] = s;
            }
        }
        if(col>0 && temp[row][col-1].equals(s)){  // 左边
            temp[row][col-1] = "";
            res += ","+row+","+(col-1);
            if(nextNum(index,row,col-1,temp) == 1){
                return 1;
            }else {
                res = res.substring(0,res.length()-4);
                temp[row][col-1] = s;
            }
        }
        if(row<n-1 && temp[row+1][col].equals(s)){    //下边
            temp[row+1][col] = "";
            res += ","+(row+1)+","+col;
            if(nextNum(index,row+1,col,temp) == 1){
                return 1;
            }else {
                res = res.substring(0,res.length()-4);
                temp[row+1][col] = s;
            }
        }
        if(col<n-1 && temp[row][col+1].equals(s)){    //右边
            temp[row][col+1] = "";
            res += ","+row+","+(col+1);
            if(nextNum(index,row,col+1,temp) == 1){
                return 1;
            }else {
                res = res.substring(0,res.length()-4);
                temp[row][col+1] = s;
            }
        }
 
        return 0;
    }
 
}

/**
 java

 public class Main{
 
    public static int n;
    public static int slen;
    public static String res;
    public static String inputS;
 
    public static void main(String[] args) {
 
        Scanner sc = new Scanner(System.in);
 
        n = sc.nextInt();
        sc.nextLine();
        String[][] strings = new String[n][n];
 
        for(int i=0;i<n;i++){
            String[] inputStrings = sc.nextLine().split(",");
            for(int j=0;j<n;j++){
                strings[i][j] = inputStrings[j];
            }
        }
 
        inputS = sc.nextLine();
        slen = inputS.length();
        String first = String.valueOf(inputS.charAt(0));//从第一个值开始
        boolean isSuccess = false;
        for(int i=0;i<n;i++){
            for(int j=0;j<n;j++){
                if(strings[i][j].equals(first)){
                    String[][] temp = copy(strings);    //对数组进行复制，否则影响第二次计算
                    res = i + "," + j;
                    temp[i][j] = ""; //已取出的值置空
                    if(nextNum(0,i,j,temp)==1){ //表示已经成功取出数据
                        isSuccess = true;
                        System.out.println(res);
                        break;
                    }
                }
            }
            if(isSuccess){
                break;
            }
        }
        if(!isSuccess){
            System.out.println("N");
        }
    }
 
    public static String[][] copy(String[][] strings){
        int x = strings.length;
        String[][] copyS = new String[x][x];
 
        for ( int i=0; i<x; i++) {
            for ( int j=0; j<x; j++) {
                copyS[i][j] = strings[i][j];
            }
        }
        return copyS;
    }
 
    public static int nextNum(int index, int row, int col, String[][] temp){
 
        if(index==slen-1){  //递归到最后一位表示已经成功
            return 1;
        }
        index++;    //字符串下标
        String s= String.valueOf(inputS.charAt(index));
 
        if(row>0 && temp[row-1][col].equals(s)){    //对上边的字符串进行比较
            temp[row-1][col] = "";  //将已经取出的字符串进行置空，防止多次取值
            res += ","+ (row-1)+","+col;    //添加坐标
            if(nextNum(index,row-1,col,temp) == 1){ //值为1表示成功取出
                return 1;
            }else {
                res = res.substring(0,res.length()-4);  //如果失败则进行还原
                temp[row-1][col] = s;
            }
        }
        if(col>0 && temp[row][col-1].equals(s)){  // 左边
            temp[row][col-1] = "";
            res += ","+row+","+(col-1);
            if(nextNum(index,row,col-1,temp) == 1){
                return 1;
            }else {
                res = res.substring(0,res.length()-4);
                temp[row][col-1] = s;
            }
        }
        if(row<n-1 && temp[row+1][col].equals(s)){    //下边
            temp[row+1][col] = "";
            res += ","+(row+1)+","+col;
            if(nextNum(index,row+1,col,temp) == 1){
                return 1;
            }else {
                res = res.substring(0,res.length()-4);
                temp[row+1][col] = s;
            }
        }
        if(col<n-1 && temp[row][col+1].equals(s)){    //右边
            temp[row][col+1] = "";
            res += ","+row+","+(col+1);
            if(nextNum(index,row,col+1,temp) == 1){
                return 1;
            }else {
                res = res.substring(0,res.length()-4);
                temp[row][col+1] = s;
            }
        }
 
        return 0;
    }
 
}
 */
