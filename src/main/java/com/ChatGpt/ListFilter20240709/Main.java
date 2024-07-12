package com.ChatGpt.ListFilter20240709;

import java.util.Arrays;
import java.util.IntSummaryStatistics;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {


// 构建一个 Person 集合
        List<Person> persons =
                Arrays.asList(
                        new Person("Max", 18),
                        new Person("Peter", 23),
                        new Person("Pamela", 23),
                        new Person("David", 12));


        // 使用流对人员列表进行过滤，只保留名字以"P"开头的人员
        List<Person> filtered =
                persons
                        .stream() // 构建流
                        .filter(p -> p.name.startsWith("P")) // 过滤出名字以 P 开头的
                        .collect(Collectors.toList()); // 生成一个新的 List
        System.out.println(filtered);    // [Peter, Pamela]


        // 根据人员的年龄进行分组，将相同年龄的人员归为一组
        Map<Integer, List<Person>> personsByAge = persons
                .stream()
                .collect(Collectors.groupingBy(p -> p.age)); // 以年龄为 key,进行分组

        // 遍历年龄分组，打印每个年龄段的人员信息
        personsByAge
                .forEach((age, p) -> System.out.format("age %s: %s\n", age, p));
        System.out.println(filtered);    // [Peter, Pamela]


        // 计算出最小年龄、最大年龄、平均年龄、总和以及总数量
        IntSummaryStatistics ageSummary =
                persons
                        .stream()
                        .collect(Collectors.summarizingInt(p -> p.age)); // 生成摘要统计

        System.out.println(ageSummary);

    }
}


