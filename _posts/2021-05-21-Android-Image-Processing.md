---
published: false
title: Android Image Processing
author: Jinbo Yang
date: 2021-05-21 10:13 +0800
last_modified_at: 2021-06-03 14:00 +0800
categories: [Android, Java, Basic, Image Processing]
tags: [Android, Java, Fundamental, CV]
math: true
---

## **Android Image Processing使用与学习**

### **A. OpenCV的图像拼接(Stitching)分割(Segementation)边缘检测(Edge Detection)等处理**

#### 1. OpenCV介绍

> 全名Open Source Computer Vision Library，主要分为 C++和Python实现两种，其他Java和Matlab包都是底层基于C/C++封装的。Android(Java)中想调用可以用opencv-android-sdk封装的java方法，但是会有部分功能不全和效率相对较低的问题，更好地办法是用JNI(Java Native Interface)调用C++

#### 2. OpenCV基础数据结构

- Point, Point2f: 2D point
  > Point类表示二维坐标系下的点, #include &lt;opencv2/core/types.hpp&gt; 
  > 初始化：Point p = Point(a, b); / Point p; p.x = a; p.y = b; 

- Size: 2D size structure

- Rect: 2D rectangle object

- RotatedRect: Rect object with angle

- Mat: Image object

### **B. Tensorflow的目标检测(Object Detection)**
