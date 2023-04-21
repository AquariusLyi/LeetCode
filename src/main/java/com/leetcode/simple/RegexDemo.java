package com.leetcode.simple;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegexDemo {
    public static void main(String[] args) {
//        String regex = "^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2},\\d{3}\\+0800#@#\\[\\S+/\\S+\\]#@#\\S+#@#\\S+#@#X\\{[\\w.]+\\}\\S*\\n$";
//        String input = "2022-12-31T23:59:59,999+0800#@#[traceId/spanId]#@#INFO#@#main#@#X{com.example.MyClass#myMethod}This is a log message\n";
//        String regex = "^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2},\\d{3}\\+0800#@#$";
//        String input = "2022-12-31T23:59:59,999+0800#@#";

        String regex = "^\\[\\S+/\\S+\\]$";
        String input = "[/]";
        System.out.println("Regex: " + regex);
        System.out.println("Input: " + input);

        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);

        boolean matches = matcher.matches();
        if (matcher.find()) {
            System.out.println("Match found:");
            System.out.println("Start index: " + matcher.start());
            System.out.println("End index: " + matcher.end());
            System.out.println("Matched string: " + matcher.group());
        } else {
            System.out.println("No match found.");
        }
    }
}
