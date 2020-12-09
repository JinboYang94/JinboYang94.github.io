---
title: Threads and Concurrent
author: Jinbo Yang
date: 2020-12-02 14:00:00 +0800
last_modified_at: 2020-12-09 14:00:00 +0800
categories: [Basic, Java]
tags: [Java, Fundamental]
math: true
# image: /assets/img/sample/avatar.png
---

# 并发和线程(看心情更新)

## **A. 基础知识**

### 1. 线程(thread)和进程(process)

- 线程是操作系统能够进行运算调度的最小单位，大部分情况下，它被包含在进程之中，是进程中的实际运作单位  
- 进程是指计算机中已运行的程序
- **多进程vs多线程**：本质区别在多线程共享数据，多进程每个进程拥有自己的一整套变量

### 2. 创建新线程常见方法

- **Method1**: 定义Thread的子类(extends Thread)，并override其run()方法，然后new一个实例，并用start()启动

```java
class Thread extends Thread {
    .....
    @Override
    public void run() {

    }

}

Thread t1=new Thread();
t1.start();
```

- **Method2**：定义实现Runnable接口的类(implements Runnable)，同样重写run()，然后new一个实例，并用start()启动

```java
class Thread2 implements Runnable {
    ....
    @Override
    public void run() {

    }
}
// imp is the implementation of Runnable
Thread2 imp=new Thread2();
// t2 is new thread
Thread t2=new Thread(imp);
t2.start();
```

- **对比**: Runnable只实现了接口，还可以继承其他类，而且imp可以重复利用来创建其他新线程，Thread不能继承其他类了
- **补充**：其他方法还有实现Callable接口和用线程池

### 3. 线程安全

- 一个类在多线程环境中被调用时，能够正确地处理多个线程之间的共享变量，使程序功能正确完成  
- 主要可能是多个线程调用同一个code block的代码时，线程A的操作改变了某个变量，使线程B本应得到的结果受到了影响  
- 不仅仅是在对象创建后的业务逻辑中要考虑线程的安全性，在对象创建的过程中，也要考虑线程安全

### 4. 线程状态(Life Cycle)

- **New(新创建)**，此时还没开始运行
- **Runnable(可运行)**，调用start()进入Runnable，此时不一定在运行
- **Blocked(被阻塞)**，当线程A试图获取一个内部对象锁，而该锁被其他线程持有，则A进入阻塞，暂时不活动，等待被激活
- **Waiting(等待)**，当线程A等待另一个线程B通知调度器一个条件时，A进入等待状态，常见于Object.wait/Thread.join调用中  
- **Timed waiting(计时等待)**，Thread.sleep/Object.wait/Thread.join/Lock.tryLock/Condition.await的计时版有个超时参数，调用时会进入此状态，并保持到超时期满或其他适当的通知  
- **Terminated(被终止)**，有两种可能，一是run()正常退出而自然死亡，二是因一个未被捕获的异常终止了run()而意外死亡

### 5. 线程中断

- 没有可以强制线程终止的方法，然而interrupt()可以用来请求终止线程，线程的中断状态将被设为true，若此线程被sleep()阻塞，将抛出InterruptedException  
- 每个线程都会时不时检查中断状态，用isInterrupted()，但如果线程被阻塞，会抛出InterruptedException  
- static boolean interrupted() vs boolean isInterrupted()，前者有副作用，会把中断状态重置为false，后者不会改变状态

### 6. 线程属性

#### a. 线程优先级(Priority)
>默认继承父类优先级，可以用setPriority()改变，在\[MIN_PRIORITY, MAX_PRIORITY\](即[1, 10])之间，NORM_PRIORITY为5  

#### b. 守护线程(Daemon)
- 守护线程唯一作用是为其他线程提供服务，不应该访问任何固有资源  
- setDaemon(boolean isDaemon)来设置守护线程或用户线程

### 7. 竞争条件(race condition)
>两个线程存取相同的对象，且每个线程都调用了修改该对象状态的方法，可能会造成错误的结果，解决办法：加锁

### 8. 锁对象(Lock)

> synchronize关键字提供锁，后面再仔细介绍，还有Java SE 5.0后引入了ReenTrantLock类，使用方法如下：

```java
class myLockTest {
    private Lock myLock = new ReentrantLock();

    public void doThings() {
        myLock.lock();
        try {
            // functional codes
        } finally {
            myLock.unlock();
        }
    }
}
```
> 要注意unlock()一定要在finally block中，否则出现Exception会让其他线程永远阻塞

### 9. 条件对象(Condition)

> 当线程得到锁，进入function部分准备执行时发现需要满足条件后才能执行，这时候就需要条件对象来处理，一个 锁对象可以对应多个条件对象  
```java
class testCondition {
    private Lock myLock = new ReentrantLock();
    private Condition cond = myLock.newCondition();
    // myLock is Lock object here
    public testCondition(int a, int b) {
        myLock.lock();
        try {
            if (a > b) {    // this now not satisfied
                cond.await();
                // functional codes here:
                // code: some operations to change value of a and b
                // after operation, use this to reactive other thread which might be blocked
                cond.signalAll();
            }
        } finally {
            myLock.unlock();
        }
    }
}
```

> 一旦一个线程调用await()，那它本身无法再激活自己，只能期待其他线程调用signalAll()来释放它，如果没有那就dead lock了。注意signalAll()并不会立即激活等待线程，只是解除阻塞，还是要竞争资源  

### 10. 两个关键字synchronized和volatile

- **synchronized**: Java的每个对象都有一个内部锁，如果一个方法用了synchronized声明，那么对象锁会保护整个方法，能够保证在同一时刻最多只有一个线程执行该段代码，即锁对象(Lock)的用法等效于：

```java
class myLockTest {

    public synchronized void doThings() {
        // functional codes
    }
}
```

> 不同于锁对象的是，内部对象锁只有一个条件对象，用法如下：

```java
class testCondition {

    public synchronized testCondition(int a, int b) {
        if (a > b) {    // this now not satisfied
            wait();
            // functional codes here:
            // code: some operations to change value of a and b
            // after operation, use this to reactive other thread which might be blocked
            notifyAll();
        }
    }
}
```

> 显然通常情况下用synchronized简便很多，它还可以用于静态方法，但这种情况下锁不再是对象的内部锁，而是类的内部锁(所谓的对象锁vs类锁?)，更常用的方法是synchronized代码块，效果一样：

```java
class myLockTest {

    // non-static
    public void doThings() {
        synchronized(this) {
            // functional codes
        }
    }

    // static
    public static void something() {
        synchronized(myLockTest.class) {
            // functional codes
        }
    }
}
```

- **volatile**: 在较低数量的实例上使用同步方法开销过大，这时候就需要vloatile这种关键字，这是一种免锁机制：

```java
private boolean sign;
public synchronized boolean isTrue() {}
public synchronized void setSign() {}

// equals to this:
private volatile boolean sigh;
public boolean isTrue() {}
public void setSign() {}
```

> volatile很少用到，大概了解就行，具体实现原理涉及JVM，还有就是volatile**不保证原子性**

### 11. 线程相关方法
> Thread类下

- **void setPriority(int new Priority)**: 设置此线程优先级
- **static void yield()**: 当前进程让步，如果有其他大于等于此优先级的可运行线程则调度这些
- **void setDaemon(boolean isDaemon)**: 标记守护/用户线程，必须在线程启动前调用
- **void join()**: 当前线程A等待子线程b终止(用法A中call b.join())，在调用此方法时当前线程A阻塞，等子线程b死亡才继续执行A后续代码
- **void join(long millis)**: 同上，加了个超时判断
- **void interrupt()**: 向线程发送中断请求，线程的中断状态被设置为true
- **static boolean interrupted()**: 检查当前线程是否被中断，副作用是中断状态会被重置为false
- **boolean isInterrupted()**: 同上，但不改变中断状态
- **static Thread currentThread()**: 返回代表当前正在执行线程的对象
- **Thread(Runnable target)**: 构造新线程
- **void start()**: 启动线程(只允许启动一次)，处于Runnable状态，一旦得到cpu资源就将调用run()开始真正运行，所有线程异步执行，这叫并发
- **void run()**: 其中的内容就是这个线程需要做的事，可多次调用，但是是同步执行
- **static void sleep(long millis)**: 休眠millis毫秒

> Java.util.concurrent下

- **void lock()**: 获取这个锁，如果该锁同时被另一个线程持有则阻塞
- **void unlock()**: 释放这个锁
- **ReentrantLock()**: 构造保护共享变量的锁
- **Condition newCondition()**: 构造锁的条件对象
- **void await()**: 条件不满足时调用，该线程阻塞并放入等待集，并等待其他线程的操作满足条件后用signalAll()释放阻塞
- **void signalAll()**: 解除该条件等待集中所有线程的阻塞
- **void signal()**: 随机从等待集中选择一个线程解除阻塞

> Object类下

- **void wait()**: 线程进入等待集，用法效果基本等同await()
- **void wait(long millis)**: 同上，多个超时时间
- **void notifyAll()**: 解除等待集中所有线程阻塞，基本同理signalAll()
- **void notify()**: 随机解除一个，基本同理signal()