package com.ChatGpt.ChatGpt20240401;



import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class OrderComparison {
    public static void main(String[] args) {
        List<Order> list1 = new ArrayList<>();
        list1.add(new Order(1, 100.0));
        list1.add(new Order(2, 200.0));
        list1.add(new Order(3, 300.0));

        List<Order> list2 = new ArrayList<>();
        list2.add(new Order(1, 100.0));
        list2.add(new Order(2, 250.0));
        list2.add(new Order(4, 400.0));

        // 找出相同number，amount不一样的对象
        List<Order> differentAmountOrders = new ArrayList<>();
        Map<Integer, Double> numberToAmountMap = new HashMap<>();

        for (Order order : list1) {
            numberToAmountMap.put(order.getNumber(), order.getAmount());
        }

        for (Order order : list2) {
            if (numberToAmountMap.containsKey(order.getNumber())) {
                double amount1 = numberToAmountMap.get(order.getNumber());
                if (amount1 != order.getAmount()) {
                    differentAmountOrders.add(order);
                }
                numberToAmountMap.remove(order.getNumber());
            } else {
                numberToAmountMap.put(order.getNumber(), order.getAmount());
            }
        }

        System.out.println("Orders with same number but different amounts: " + differentAmountOrders);

        // 找出两个集合互相多出来的number的对象
        List<Order> extraNumberOrders = new ArrayList<>(list1);
        extraNumberOrders.retainAll(list2);

        System.out.println("Orders with extra number in both lists: " + extraNumberOrders);
    }
}