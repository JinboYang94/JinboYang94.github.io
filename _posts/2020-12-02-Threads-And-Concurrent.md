---
title: Threads and Concurrent
author: Jinbo Yang
date: 2020-12-02 14:00:00 +0800
categories: [Basic, Java]
tags: [Java, Fundamental]
math: true
# image: /assets/img/sample/avatar.png
---

# 并发和线程(看心情更新)

## **A. 基础知识**

### 1. 线程(thread)和进程(process)

>-线程是操作系统能够进行运算调度的最小单位，大部分情况下，它被包含在进程之中，是进程中的实际运作单位  
>-进程是指计算机中已运行的程序

### 2. 线程安全

>-一个类在多线程环境中被调用时，能够正确地处理多个线程之间的共享变量，使程序功能正确完成  
>-主要可能是多个线程调用同一个code block的代码时，线程A的操作改变了某个变量，使线程B本应得到的结果收到了影响  
>-不仅仅是在对象创建后的业务逻辑中要考虑线程的安全性，在对象创建的过程中，也要考虑线程安全

### 3. 线程状态

- New(新创建)，此时还没开始运行
- Runnable(可运行)，调用start()进入Runnable，此时不一定在运行
- Blocked(被阻塞)，当线程A试图获取一个内部对象锁，而该锁被其他线程持有，则A进入阻塞，暂时不活动，等待被激活
- Waiting(等待)，
- Timed waiting(计时等待)
- Terminated(被终止)

### 4. 线程中断