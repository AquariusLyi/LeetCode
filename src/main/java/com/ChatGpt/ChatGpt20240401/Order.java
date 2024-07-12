package com.ChatGpt.ChatGpt20240401;

class Order {
    private int number;
    private double amount;

    public Order(int number, double amount) {
        this.number = number;
        this.amount = amount;
    }

    public int getNumber() {
        return number;
    }

    public double getAmount() {
        return amount;
    }

    @Override
    public String toString() {
        return "Order{" +
                "number=" + number +
                ", amount=" + amount +
                '}';
    }
}