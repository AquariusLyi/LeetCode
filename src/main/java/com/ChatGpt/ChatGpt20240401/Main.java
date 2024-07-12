package com.ChatGpt.ChatGpt20240401;

import java.util.*;

public class Main {
    public static void main(String[] args) {
        // 创建并初始化Map
        Map<String, String> map = new HashMap<>();
        map.put("1", "A");
        map.put("2", "B");
        map.put("3", "C");

        // 定义测试字符串
        String test = "2-B";

        // 对比并删除
        Iterator<Map.Entry<String, String>> iterator = map.entrySet().iterator();
        while (iterator.hasNext()) {
            Map.Entry<String, String> entry = iterator.next();
            if (test.equals(entry.getKey() + "-" + entry.getValue())) {
                iterator.remove(); // 删除匹配的键值对
                System.out.println("已删除：" + entry.getKey() + "-" + entry.getValue());
            }
        }

        // 输出剩余的键值对
        System.out.println("剩余的键值对：" + map);
    }
}
