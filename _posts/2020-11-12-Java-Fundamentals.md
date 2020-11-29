---
title: Java Fundamentals
author: Jinbo Yang
date: 2020-11-12 14:00:00 +0800
categories: [Basic, Java]
tags: [Java, Fundamental]
math: true
# image: /assets/img/sample/avatar.png
---
# Java知识点总结(长期更新)

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

![TypeConversion](/assets/img/sample/type_conversion.png "Java Type Conversion")

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

### **B. 常见Q&A**

