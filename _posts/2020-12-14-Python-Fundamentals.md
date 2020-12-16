---
title: Python Fundamentals
author: Jinbo Yang
date: 2020-12-14 14:00:00 +0800
last_modified_at: 2020-12-09 14:00:00 +0800
categories: [Basic, Python]
tags: [Python, Fundamental]
math: true
---

# Python知识点总结+复习(长期更新)

### **A. 基础知识**

#### 1. Python Built-in Type

> Python中定义变量无需声明类型

- **int**: 无取值范围，有正负

- **float**：基本和java中float一样

- **complex**：复数，(real part) + (imaginary part)j，很少用

- **str**：基本和java中string一样，但是定义时用' / " / '''均可

- **list**：有序，基本和java中array一样，区别在list中的item不限制是否同一类型

- **truple**：基本和list一样，区别在truple时immutable的

- **bool**: True, False

- **Set**: 无序，类似于java中hashset，无重复元素

- **Dictionary**: 无序，python的key-value结构，也不限制其中的数据类型

#### 2. 常见方法