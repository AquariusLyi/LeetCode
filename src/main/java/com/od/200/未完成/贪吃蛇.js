/**
 SnakeGame【贪吃蛇】

■ 题目描述

贪吃蛇是一个经典游戏，蛇的身体由若干方格连接而成，身体随蛇头移动。蛇头触碰到食物时，蛇的长度会增加一格。

蛇头和身体的任一方格或者游戏版图边界碰撞时，游戏结束。

下面让我们来完成贪吃蛇游戏的模拟。

给定一个N*M的数组arr，代表N*M个方格组成的版图，贪吃蛇每次移动一个方格。

若arr[i][j] == ‘H’，表示该方格为贪吃蛇的起始位置；

若arr[i][j] == ‘F’，表示该方格为食物，

若arr[i][j] == ‘E’，表示该方格为空格。

贪吃蛇初始长度为1，初始移动方向为向左。

为给定一系列贪吃蛇的移动操作，返回操作后蛇的长度，如果在操作执行完之前已经游戏结束，返回游戏结束时蛇的长度。

贪吃蛇移动、吃食物和碰撞处理的细节见下面图示：

图1：截取了贪吃蛇移动的一个中间状态，H表示蛇头，F表示食物，数字为蛇身体各节的编号，蛇为向左移动，此时蛇头和食物已经相邻

图2：蛇头向左移动一格，蛇头和食物重叠，注意此时食物的格子成为了新的蛇头，第1节身体移动到蛇头位置，第2节身体移动到第1节身体位置，以此类推，

最后添加第4节身体到原来第3节身体的位置。

图3：蛇头继续向左移动一格，身体的各节按上述规则移动，此时蛇头已经和边界相邻，但还未碰撞。

图4：蛇头继续向左移动一格，此时蛇头已经超过边界，发生碰撞，游戏结束。

图5和图6给出一个蛇头和身体碰撞的例子，蛇为向上移动。

图5时蛇头和第7节身体相邻，但还未碰撞；

图6蛇头向上移动一格，此时蛇头和第8节身体都移动到了原来第7节身体的位置，发生碰撞，游戏结束。



输入描述

输入第一行为空格分隔的字母，代表贪吃蛇的移动操作。
字母取值为U、D、L、R和G，
U、D、L、R分别表示贪吃蛇往上、下、左、右和转向，转向时贪吃蛇不移动 ，G表示贪吃蛇按当前的方向移动一格。
用例保证输入的操作正确。
第二行为空格分隔的两个数，指定N和M，为数组的行和列数。
余下N行每行是空格分隔的M个字母。字母取值为H、F和E，H表示贪吃蛇的起始位置，F表示食物，E表示该方格为空。
用例保证有且只有一个H，而F和E会有多个。
输出描述

输出一个数字，为蛇的长度。
示例 1 输入输出示例仅供调试，后台判题数据一般不包含示例

输入

D G G
3 3
F F F
F F H
E F E
 

输出

1
 

地图表示为：

蛇头 H(Head)

食物 F(Food)

E表示该方格为空

四个方向分别表示为：

向上 U(up)

向下 D(down)

向左 L(Left)

向右 R(Right)


 */

/**
 python

 steps = input().split(" ")
MN = input().split(" ")
M = int(MN[0])
N = int(MN[1])
import sys

arr = []  
first = []  
for i in range(M):
    line = sys.stdin.readline().strip().split()
    arr.append(line)
print(arr)
for i in range(N):
    for j in range(N):
        if arr[i][j] == "H":
            first.append(i)
            first.append(j)
print(first)
direction = {
    'U': [-1, 0],
    'D': [1, 0],
    'L': [0, -1],
    'R': [0, 1],
}
goStep = [0, -1]
snake = []
for s in range(len(steps)):
    item = steps[s]
    if item == 'G':  
        step = [first[0] + goStep[0], first[1] + goStep[1]]  
        if step[0] < 0 or step[1] < 0 or step[0] >= N or step[1] >= M:  
            break
        stepStr = arr[step[0]][step[1]]  
        if stepStr == "F":  
            arr[first[0]][first[1]] = "S"  
            arr[step[0]][step[1]] = "H" 
            snake.insert(0, first) 
            first = step
        else: 
            length = len(snake)
            if length > 0:  
                tail = snake[length - 1]  
                arr[tail[0]][tail[1]] = "E"  
                snake.pop()
                arr[first[0]][first[1]] = "H"  
                snake.insert(0, first)
            else:
                arr[first[0]][first[1]] = "E"
            if stepStr == "S":
                break
            arr[step[0]][step[1]] = "H"  
            first = step
        print(arr)
    else:
        goStep = direction[item]  
print(len(snake) + 1)
 */

/**
 c++

 #include <bits/stdc++.h>

using namespace std;

int main(int argc, const char *argv[])
{
    string sOperation;
    getline(cin, sOperation);
    istringstream input;
    input.str(sOperation);
    vector<string> vsOperation;
    for (string p; getline(input, p, ' ');)
        vsOperation.emplace_back(p.c_str());
    int n = 0, m = 0;
    cin >> n >> m;
    getchar();
    string sdata;
    vector<vector<string> > dp(n, vector<string>(m, ""));
    list<pair<int, int> > pList;
    for (int i = 0; i < n; i++) {
        getline(cin, sdata);
        input.clear();
        input.str();
        input.str(sdata);
        int temp = 0;
        for (string p1; getline(input, p1, ' ');) {
            if (p1 == "H") pList.push_front(make_pair(i, temp)); // 获取 H的位置
            dp[i][temp++] = p1;
        }
    }

    string operation;
    for (auto &i: vsOperation) {
        if (i == "G") { // G表示贪吃蛇按照当前的方向移动一格
            pair<int, int> tempCoord = pList.front();
            int x = tempCoord.first;
            int y = tempCoord.second;
            if (operation == "U") { // 向上
                if (x - 1 < 0) break;
                list<pair<int, int> >::iterator it;
                it = find(pList.begin(), pList.end(), make_pair(x - 1, y));
                if (it != pList.end()) break;
                if (dp[x - 1][y] == "F") pList.push_front(make_pair(x - 1, y));
                else if (dp[x - 1][y] == "E") { // E表示该方格为空
                    pList.pop_back(); // 删除最后一个
                    pList.push_front(make_pair(x - 1, y));
                }
            } else if (operation == "D") { // 向下
                if (x + 1 >= n) break;
                list<pair<int, int> >::iterator it;
                it = find(pList.begin(), pList.end(), make_pair(x + 1, y));
                if (it != pList.end()) break;
                if (dp[x + 1][y] == "F") pList.push_front(make_pair(x + 1, y));
                else if (dp[x + 1][y] == "E") {
                    pList.pop_back(); // 删除最后一个
                    pList.push_front(make_pair(x + 1, y));
                }
            } else if (operation == "L") { // 向左
                if (y - 1 < 0) break;
                list<pair<int, int> >::iterator it;
                it = find(pList.begin(), pList.end(), make_pair(x, y - 1));
                if (it != pList.end()) break;
                if (dp[x][y - 1] == "F") pList.push_front(make_pair(x, y - 1));
                else if (dp[x][y - 1] == "E") { // E表示该方格为空
                    pList.pop_back(); // 删除最后一个
                    pList.push_front(make_pair(x, y - 1));
                }
            } else if (operation == "R") { // 向右
                if (y + 1 >= m) break;
                list<pair<int, int> >::iterator it;
                it = find(pList.begin(), pList.end(), make_pair(x, y + 1));
                if (it != pList.end()) break;
                if (dp[x][y + 1] == "F") pList.push_front(make_pair(x, y + 1));
                else if (dp[x][y + 1] == "E") { // E表示该方格为空
                    pList.pop_back(); // 删除最后一个
                    pList.push_front(make_pair(x, y + 1));
                }
            }
        } else operation = i;
    }
    cout << pList.size() << endl;
    return 0;
}
// 解法二

#include<bits/stdc++.h>

using namespace std;
class Solution {
public:
    list<vector<int>> snake;  
    bool isEnd(int x, int y, vector<vector<char>> &matrix)
    {
        if (x >= matrix.size() || x < 0 || y >= matrix[0].size() || y < 0) {  
            return true;
        }
        for (auto a : snake) {
            if (x == a[0] && y == a[1]) {  
                return true;
            }
        }
        return false;
    }
    int solve(vector<vector<char>> &matrix, vector<char> &op)
    {
        int startx = 0, starty = 0;
        int xlen = matrix.size();
        int ylen = matrix[0].size();
        for (int i = 0; i < xlen; ++i) {
            for (int j = 0; j < ylen; ++j) {
                if (matrix[i][j] == 'H') {
                    startx = i;
                    starty = j;  
                    break;
                }
            }
        }
        matrix[startx][starty] = 'E';
        snake.push_back(initializer_list<int>{startx, starty});
        int flag = 0;
        for (int i = 0; i < op.size(); ++i) {
            switch (op[i]) {
                case 'U':
                    flag = -1;
                    break;
                case 'D':
                    flag = 1;
                    break;
                case 'L':
                    flag = -2;
                    break;
                case 'R':
                    flag = 2;
                    break;
                case 'G':
                    switch (flag) {
                        case -1:
                            starty += 1;
                            break;
                        case 1:
                            starty -= 1;
                            break;
                        case -2:
                            startx -= 1;
                            break;
                        case 2:
                            startx += 1;
                            break;
                    }
                    if (isEnd(startx, starty, matrix)) {
                        return snake.size();
                    }
                    if (matrix[startx][starty] == 'F') {
                        snake.push_front(initializer_list<int>{startx, starty});
                        matrix[startx][starty] = 'E';
                    } else if (matrix[startx][starty] == 'E') {
                        snake.push_front(initializer_list<int>{startx, starty});
                        snake.pop_back();
                    }
                    break;
            }
        }
        return snake.size();
    }
};

int main()
{
    vector<vector<char>> matrix(5, vector<char>(5, 'F'));
    matrix[2][2] = 'H';

    vector<char> op(initializer_list<char>{'L', 'G', 'G', 'U', 'G','G','R', 'G', 'G', 'G', 'G', 'G', 'G'});
    Solution obj;
    cout << obj.solve(matrix, op) << endl;
}
 */
