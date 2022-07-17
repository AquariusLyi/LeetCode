/**
统计文本数量

【统计文本数量】

题目描述

有一个文件，包含以一定规则写作的文本，请统计文件中包含的文本数量。

规则如下：

1. 文本以”;”分隔，最后一条可以没有”;”，但空文本不能算语句，比如”COMMAND A; ;”只能算一条语句

注意，无字符/空白字符/制表符都算作”空”文本；

2. 文本可以跨行，比如下面，是一条文本，而不是三条；

COMMAND A

AND

COMMAND B;

3. 文本支持字符串，字符串为成对的单引号(‘)或者成对的双引号(“)，字符串可能出现用转义字符(\)处理的单双引号(“your input is\””)和转义字符本身，比如

COMMAND A “Say \”hello\””;

4. 支持注释，可以出现在字符串之外的任意位置注释以”–“开头，到换行结束，比如

 隐藏内容
COMMAND A; –this is comment

COMMAND –comment

A AND COMMAND B;

注意字符串内的”–“，不是注释。

输入描述：

文本文件

输出描述：

包含的文本数量

示例1   输入输出示例仅供调试，后台判题数据一般不包含示例

输入

COMMAND TABLE IF EXISTS "UNITED STATE";
COMMAND A GREAT (
ID ADSAB,
download_length INTE-GER, -- test
file_name TEXT,
guid TEXT,
mime_type TEXT,
notifica-tionid INTEGER,
original_file_name TEXT,
pause_reason_type INTERGER,
resumable_flag INTERGER,
start_time INTERGER,
state INTERGER,
folder TEXT,
path TEXT,
total_length INTE-GER,
url TEXT
);
输出

2

 */

/**
 c++

 #include<bits/stdc++.h>

using namespace std;

class Solution {
public:
    int solve(string file) {
        bool isStringing = false;
        bool isContend = false;
        int ins = 0;
        int i = 0;
        int count = 0;
        char sign ;
        while( i < file.length()) {
            if(isContend) {
                if(isStringing == false && ( file[i] == '\'' || file[i] == '\"')) { 
                    char c = file[i];
                    ++i;
                    while(i < file.length()) {
                        if(file[i] == c && file[i-1] != '\\') {
                            break;
                        }
                        ++i;
                    }
                    ++i;
                } else if(isStringing == false && (file[i] == '-' && i+1 < file.length() && file[i+1] == '-') ) { 
                    i += 2;
                    while(i < file.length() && file[i] != '\n') {
                        ++i;
                    }
                    ++i;
                } else if(file[i] == ';') { 
                    ++count;
                    cout << count <<" : " << file[i-1]  << endl;
                    isContend = false;
                    ++i;
                } else { 
                    ++i;
                }
            } else {
                while(file[i] == ' ' ||file[i] == '\t' || file[i] == ';' || file[i] == 0x09 || file[i] == 0x0B || file[i] == '\n') { 
                    ++i;
                }
                isContend = true; 
            }
        }
        return count;
    }
};

int main()
{
    string file;
    string line;
    while(getline(cin, line) && line.compare("") != 0) {
        line += '\n';
        file += line;
        line.clear();
    }
    //cout <<file << endl;
    Solution obj;
    int ret = obj.solve(file) ;
    cout << ret <<endl;

}
 */
