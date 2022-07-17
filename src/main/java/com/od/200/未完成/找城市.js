/**
[OD]找城市

 */
import java.util.*;

public class Main {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int n = scanner.nextInt();
        int i, j;
        int[] xPos = new int[n];
        int[] yPos = new int[n];
        for (i=1; i<n; i++) {
            xPos[i] = scanner.nextInt();
            yPos[i] = scanner.nextInt();
        }
        if (n == 1) {
            System.out.println(1);
        } else if (n == 2) {
            System.out.println(1);
            System.out.println(2);
        } else {
            sortPos(xPos, yPos, n);
            int min = 1005;
            int max;
            int totalCity;
            List<Integer> minCityList = new ArrayList<>();
            for (i = 1; i <= n; i++) {
                CityNode[] cityNodes = new CityNode[n + 1];
                max = 0;
                // 初始化cityNodes
                for (j = 1; j <= n; j++) {
                    cityNodes[j] = new CityNode(j);
                }
                for (j = 1; j < n; j++) {
                    // 被剔除city关系不处理
                    if (xPos[j] == i || yPos[j] == i) {
                        continue;
                    }
                    CityNode yCity = cityNodes[yPos[j]];
                    CityNode xCity = cityNodes[xPos[j]];
                    // 如果xCity不是根，xCity找到根
                    if (xCity.parent != xCity.val) {
                        xCity = cityNodes[xCity.parent];
                    }
                    if (yCity.parent == yCity.val) {
                        mergeCity(xCity, yCity);
                    } else {
                        CityNode yCityParent = cityNodes[yCity.parent];
                        mergeCity(xCity, yCityParent);
                    }
                }
                for (j = 1; j <= n; j++) {
                    if (cityNodes[j].parent == cityNodes[j].val) {
                        totalCity = cityNodes[j].children.size() + 1;
                        max = max < totalCity ? totalCity : max;
                    }
                }
                if (min > max) {
                    min = max;
                    minCityList.clear();
                    minCityList.add(i);
                } else if (min == max) {
                    minCityList.add(i);
                }
            }
            minCityList.forEach(item -> System.out.println(item));
        }
    }

    private static void mergeCity(CityNode parentCity, CityNode childCity) {
        childCity.parent = parentCity.val;
        parentCity.children.add(childCity);
        for (CityNode city : childCity.children) {
            city.parent = parentCity.val;
            parentCity.children.add(city);
        }
        childCity.children.clear();
    }

    private static void sortPos(int[] xPos, int[] yPos, int n) {
        int i, j, temp;
        // 调整前小后大
        for (i=0; i<n; i++) {
            if (xPos[i] > yPos[i]) {
                temp = xPos[i];
                xPos[i] = yPos[i];
                yPos[i] = temp;
            }
        }
        // 调整整体顺序
        for (i=0; i<n; i++) {
            for (j=0; j<n-i-1; j++) {
                if ((xPos[i] > xPos[i+1]) || (xPos[i] == xPos[i+1] && yPos[i] > yPos[i+1])) {
                    temp = xPos[i];
                    xPos[i] = xPos[i+1];
                    xPos[i+1] = temp;
                    temp = yPos[i];
                    yPos[i] = yPos[i+1];
                    yPos[i+1] = temp;
                }
            }
        }
    }


}

class CityNode {
    int val;
    int parent;
    List<CityNode> children = new ArrayList<>();

    public CityNode(int val) {
        this.val = val;
        this.parent = val;
    }
}




/**
 java

 import java.util.*;

public class Main {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int n = scanner.nextInt();
        int i, j;
        int[] xPos = new int[n];
        int[] yPos = new int[n];
        for (i=1; i<n; i++) {
            xPos[i] = scanner.nextInt();
            yPos[i] = scanner.nextInt();
        }
        if (n == 1) {
            System.out.println(1);
        } else if (n == 2) {
            System.out.println(1);
            System.out.println(2);
        } else {
            sortPos(xPos, yPos, n);
            int min = 1005;
            int max;
            int totalCity;
            List<Integer> minCityList = new ArrayList<>();
            for (i = 1; i <= n; i++) {
                CityNode[] cityNodes = new CityNode[n + 1];
                max = 0;
                // 初始化cityNodes
                for (j = 1; j <= n; j++) {
                    cityNodes[j] = new CityNode(j);
                }
                for (j = 1; j < n; j++) {
                    // 被剔除city关系不处理
                    if (xPos[j] == i || yPos[j] == i) {
                        continue;
                    }
                    CityNode yCity = cityNodes[yPos[j]];
                    CityNode xCity = cityNodes[xPos[j]];
                    // 如果xCity不是根，xCity找到根
                    if (xCity.parent != xCity.val) {
                        xCity = cityNodes[xCity.parent];
                    }
                    if (yCity.parent == yCity.val) {
                        mergeCity(xCity, yCity);
                    } else {
                        CityNode yCityParent = cityNodes[yCity.parent];
                        mergeCity(xCity, yCityParent);
                    }
                }
                for (j = 1; j <= n; j++) {
                    if (cityNodes[j].parent == cityNodes[j].val) {
                        totalCity = cityNodes[j].children.size() + 1;
                        max = max < totalCity ? totalCity : max;
                    }
                }
                if (min > max) {
                    min = max;
                    minCityList.clear();
                    minCityList.add(i);
                } else if (min == max) {
                    minCityList.add(i);
                }
            }
            minCityList.forEach(item -> System.out.println(item));
        }
    }

    private static void mergeCity(CityNode parentCity, CityNode childCity) {
        childCity.parent = parentCity.val;
        parentCity.children.add(childCity);
        for (CityNode city : childCity.children) {
            city.parent = parentCity.val;
            parentCity.children.add(city);
        }
        childCity.children.clear();
    }

    private static void sortPos(int[] xPos, int[] yPos, int n) {
        int i, j, temp;
        // 调整前小后大
        for (i=0; i<n; i++) {
            if (xPos[i] > yPos[i]) {
                temp = xPos[i];
                xPos[i] = yPos[i];
                yPos[i] = temp;
            }
        }
        // 调整整体顺序
        for (i=0; i<n; i++) {
            for (j=0; j<n-i-1; j++) {
                if ((xPos[i] > xPos[i+1]) || (xPos[i] == xPos[i+1] && yPos[i] > yPos[i+1])) {
                    temp = xPos[i];
                    xPos[i] = xPos[i+1];
                    xPos[i+1] = temp;
                    temp = yPos[i];
                    yPos[i] = yPos[i+1];
                    yPos[i+1] = temp;
                }
            }
        }
    }


}

class CityNode {
    int val;
    int parent;
    List<CityNode> children = new ArrayList<>();

    public CityNode(int val) {
        this.val = val;
        this.parent = val;
    }
}


————————————————
版权声明：本文为CSDN博主「今晚想吃雪糕」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/m0_71303609/article/details/125187139
 */