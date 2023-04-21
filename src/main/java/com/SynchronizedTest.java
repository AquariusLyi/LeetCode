package com;

public class SynchronizedTest {
    public static void main(String[] args) throws InterruptedException {
        testWait();
    }
    private static final Object lock = new Object();
     public static void testWait() throws InterruptedException {
        synchronized (lock) {
            // 阻塞住，被唤醒之前不会输出aa，也就是还没离开synchronized
            lock.wait();
            System.out.println("aa");}}
     public static void testNotify() throws InterruptedException {
        synchronized (lock) {
            lock.notify();
            System.out.println("bb");}}}