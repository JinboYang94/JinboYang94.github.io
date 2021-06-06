---
title: Java Fundamentals
author: Jinbo Yang
date: 2020-11-12 14:00:00 +0800
last_modified_at: 2020-12-14 17:52:00 +0800
categories: [Basic, Java]
tags: [Java, Fundamental]
math: true
# image: /assets/img/sample/avatar.png
---
# Java知识点总结+复习(长期更新)

## JavaSE部分

### **A. 基础知识**

#### 1. 面向过程和面向对象的区别

**面向过程(Progress oriented)**

优点：性能更高，因为调用类需要实例化，更消耗资源。单片机、嵌入式、Linux/Unix开发常用，因为性能是最重要的

缺点：没有面向对象易维护、易复用、易扩展

**面向对象(Object oriented)**

优点：易维护、易复用、易扩展，有封装、继承、多态的特性，可以设计出低耦合系统，使系统更加灵活和易于维护

缺点：性能较低

#### 2. Java面向对象三大特点：封装、继承、多态

**封装(Encapsulation)**

封装把一个对象的属性私有化，同时提供一些可以被外界访问的属性的方法(就是接口)

**继承(Inheritance)**

继承是使用已存在的类的定义作为基础来建立新的类，新类的定义可以增加新的属性或方法，可以使用父类的方法，但不能泵选择性的继承父类。继承可以方便的复用已有代码。

注意点：子类有父类所有非private的属性和方法；子类可以对父类进行扩展，增加新的属性/方法；子类可以用自己的方式去实现父类的方法(如实现父类中的抽象方法)

**多态(Polymorphism)**

多态是指程序中定义的引用变量所指向的具体类型和通过该引用变量发出的方法调用在编程时并不确定，而是在程序运行期间才确定，即一个引用变量到底会指向哪个类的实例对象，该引用变量发出的方法调用的到底是哪个类中实现的方法，必须在程序运行期间才能决定。

通俗的说，在Java中有两种形式可以实现多态：继承(多个子类对同一方法的重写)和接口(实现接口并覆盖接口中同一方法)

#### 3. Java Primitive Type

**Java Primitive Data Types**

| Data Type | Size | Description |
|:-----------|:------|:-------------|
| byte | 1 byte	| Stores whole numbers from -128 to 127 |
| short	| 2 bytes | Stores whole numbers from -32,768 to 32,767 |
| int | 4 bytes | Stores whole numbers from -2,147,483,648 to 2,147,483,647 |
| long | 8 bytes | Stores whole numbers from -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807 |
| float | 4 bytes | Stores fractional numbers. Sufficient for storing 6 to 7 decimal digits | 
| double | 8 bytes | Stores fractional numbers. Sufficient for storing 15 decimal digits | 
| boolean | 1 bit | Stores true or false values |
| char | 2 bytes | Stores a single character/letter or ASCII values |

**Java Type Conversion**

- 自动类型转换：
> 数字表示范围小的数据类型可以自动转换成范围大的数据类型  
>注意可能会发生数据溢出(在int/long转float/double时，具体涉及浮点数在计算机中的表示方式问题)，其他情况如乘法操作int后超出int范围赋给float也会溢出

![TypeConversion](/assets/img/sample/type_conversion.png "Java Type Conversion")

- 强制类型转换：
> 强制的把一个数据类型转换成另一种，也可能有丢失精度问题

**Java Bit Manipulation**

- Unary bitwise complement operator: ~
>a = 5 = 0101  
>~a = 1010 = 10  
>so its a flipped value of binary representation of variable

- Bitwise AND: &
>a = 5 = 0101  
>b = 7 = 0111  
>a & b = 0101 = 5  
>so its intuitive and operation

- Bitwise OR: |
>a = 5 = 0101  
>b = 7 = 0111  
>a | b = 0111 = 7  
>so its intuitive or operation

- Bitwise XOR: ^
>a = 5 = 0101  
>b = 7 = 0111  
>a ^ b = 0010 = 2  
>so if different -> 1, if same -> 0

- Signed left shift: <<
>a = 5 = 0000 0101  
>a << 1 = 0000 1010 = 10  
>a << 2 = 0001 0100 = 20  
>a << 3 = 0010 1000 = 40  
>so << means a * 2<sup>n</sup>, n is 1,2,3...here

- Signed right shift: >>
>a = 10 = 0000 1010  
>a >> 1 = 0000 0101 = 5   
>a >> 2 = 0000 0010 = 2  
>so >> means a / 2<sup>n</sup>, n is 1,2...here

- Unsigned right shift: >>>
>a = 10 = 0000 1010
>a >>> 1 = 0000 0101 = 5  
>a >>> 2 = 0000 0010 = 2  
>a >>> 3 = 0000 0001 = 1  
>b = - 10 = reverse(0000 1010) + 1 = (1111 0110)32 bit = 1111 1111 1111 1111 1111 1111 1111 0110  
>b >>> 1 = 0111 1111 1111 1111 1111 1111 1111 1011 = 2147483643  
>so >>> means a / 2<sup>n</sup>, insert to void left with 0, and set leftmost digit to 0

#### 4. Java常见数据结构/类及其方法

**数据结构**

- Stack: 标准LIFO
  >(1) **boolean isEmpty()**  
  >(2) **E push(E item)**：返回值并没有什么用  
  >(3) **E pop()**  
  >(4) **E peek()**  
  >(5) **int search(Object o)**：在栈中查找o，返回1-based index，当无此Object时返回-1

- Queue：标准FIFO，无论何种实现都有以下方法
  >(1) **boolean add(E e)**  
  >(2) **boolean offer(E e)**  
  >(3) **E remove()**  
  >(4) **E poll()**  
  >(5) **E element()**  
  >(6) **E peek()**

- PriorityQueue：Queue接口的一种实现方式，还有一些Queue没有的方法：
  >(1) **void clear()**  
  >(2) **Comparator<? super E> comparator()**: 返回comparator，如果nature ordering返回null。另：带comparator的构造方法例如new PriorityQueue<>((TreeNode t1, TreeNode t2) -> (t1.val - t2.val))，意为按val从小到大排列，小的FIFO  
  >(3) **boolean contains(Object o)**  
  >(4) **Iterator<E> iterator()**  
  >(5) **int size()**  
  >(6) **Object[] toArray()**  

- LinkedList: 也是Queue的一种实现方式(常用)
  >(1) **void add(int index, E e)**  
  >(2) **void addFirst(E e)**  
  >(3) **void addLast(E e)**  
  >(4) **void clear()**  
  >(5) **Object clone()**: return shallow copy of LinkedList  
  >(6) **boolean contains(Object o)**  
  >(7) **E get(int index)**  
  >(8) **E getFirst()**  
  >(9) **E getLast()**  
  >(10) **int indexOf(Object o)**: first occurance of o  
  >(11) **int lastIndexOf(Object o)**: last occurance of o  
  >(12) **int size()**  
  >(13) **Object[] toArray()**  
  >(14) **E set(int index, E element)**: replace index处的element

- HashMap: 经典key-value pair
  >(1) **void clear()**  
  >(2) **Object clone()**: shallow copy  
  >(3) **boolean containsKey(Object key)**  
  >(4) **boolean containsValue(Object value)**  
  >(5) **V get(Object key)**  
  >(6) **boolean isEmpty()**  
  >(7) **Set\<K> keySet()**  
  >(8) **V put(K key, V value)**  
  >(9) **int size()**  
  >(10) **Collection\<V> values()**

- ArrayList:

- Tree

- BST

**类**

- String：

- Integer

#### 5. access修饰符

- protected:

#### 6. 数据类型互转

- String <-> Char

### **B. 常见Q&A**

#### 1. Integer.MAX_VALUE and Integer.MIN_VALUE

- Integer.MAX_VALUE: $$ 2^{31}-1 $$, 2147483647
- Integer.MIN_VALUE: $$ -2^{31} $$, -2147483648

#### 2. StringBuilder vs StringBuffer

- 线程安全：StringBuilder非线程安全，StringBuffer线程安全，有synchronized修饰
- 性能：StringBuilder没锁，性能远高于StringBuffer
- 总结：单线程选StringBuilder，多线程选StringBuffer

#### 3. shallow copy vs deep copy

- shallow copy对基本数据类型进行值传递，对引用数据类型进行引用传递般的拷贝。即只复制值，但修改任一对象都会改变两者

- deep copy对基本数据类型进行值传递，对引用数据类型，创建一个新的对象，并复制其内容。这种修改其中一个对象不会影响另一个

- 判断方法：B是A的copy，如果A == B则是deep copy

- deep copy方法：序列化后反序列化，会开辟新的空间存储，所以是deep copy

#### 4. == vs equals()

- **Primitive type**(int,float,double,byte,short,long,boolean,char)，只能用==

- **Wrapper class**(Boolean,Integer,Long,Float,Double)，==比较的是指向对象的地址，比较的是栈内存中存放的对象的引用（地址），equals比较的是值

- **Class object**，那么在对象的类没有重写equals()方法时，==和equals都是比较地址

- **String, Data等Class**都重写了equals方法，所以==比较地址，equals比较值

#### 5. 什么是序列化(serializable)

- 序列化是将对象状态转换为可保持或传输的格式的过程。与序列化相对的是反序列化，它将流转换为对象。这两个过程结合起来，可以轻松地存储和传输数据。序列化必须实现Serializable接口(java.io.Serializable)

- 注意在实现Serializable的类中定义一个**serialVersionUID**，具体生成可以靠插件(1L只是例子)
  ```java
  ANY-ACCESS-MODIFIER static final long serialVersionUID = 1L;
  ```

- 为什么要这个serialVersionUID： 
  >它是Java为每个序列化类产生的版本标识，可用来保证在反序列时，发送方发送的和接受方接收的是可兼容的对象。大意是保证序列化和反序列化时版本兼容不会报错。如果不一致会有InvalidClassException，比如本地修改后不想共享给另一端了，就修改serialVersionUID，在另一端反序列化时就会出错

  #### 6. 一些常见异常
  
  - NullPointerException

  - IOException

  - IndexOutOfBoundsException
  
  - ClassNotFoundException

  - OutOfMemoryError

  - FileNotFoundException