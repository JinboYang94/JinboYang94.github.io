---
title: Computer Networks Fundamentals
author: Jinbo Yang
date: 2020-11-28 11:00:00 +0800
last_modified_at: 2020-11-29 14:00:00 +0800
categories: [Basic, Computer Networks]
tags: [Networks, Fundamental]
math: true
---

# Computer Networks知识点总结(长期更新)

## **A. 基本内容**

### 1. 体系结构

![Models](/assets/img/resources/model.jpg "Network Models")

**TCP/IP 五层结构**

- 应用层(Application Layer)
>-is where network applications and their application-layer protocols reside  
>-主要通过应用进程间的通信交互来完成网络应用功能  
>-其交互的数据单元(packet)称为报文(message)  
>-Protocols: HTTP, FTP, SMTP, DNS

- 传输层(Transport Layer)
>-transports application-layer messages between application endpoints  
>-提供面向连接的数据流支持、可靠性、流量控制、多路复用等服务  
>-其交互的数据单元(packet)称为报文段(segment)  
>-Protocols: TCP, UDP

- 网络层(Network Layer)
>-is responsible for moving network-layer packets from one host to another.  
>-提供路由和寻址的功能，使两终端系统能够互连且决定最佳路径，并具有一定的拥塞控制和流量控制的能力  
>-其交互的数据单元(packet)称为数据表(datagram)  
>-Protocols: IP, ICMP(IP的子协议之一)

- 链路层(Link Layer)
>-routes a datagram through a series of routers between the source and destination  
>-传输过程中的网络流量控制、差错检测和差错控制等方面(用checksum等)   
>-其交互的数据单元(packet)称为帧(frame)  
>-Protocols: link dependent, 如VLAN

- 物理层(Physical Layer)
>-is to move the individual bits within the frame from one node to the next  
>-在网络的物理层面确保原始的数据可在各种物理媒体上传输  
>-Protocols: again link dependent and further depend on the actual transmission medium of the link (for example, twisted-pair copper wire, single-mode fiber optics)

**OSI七层结构**

- 表示层(Presentation Layer)
>-数据的表示、压缩和加密  
>-Protocols: ASCII, JPEG, MPEG

- 会话层(Session Layer)
>-会话的建立、管理和结束  
>-Protocols: RPC, RTCP

### 2. TCP三次握手

![handshake](/assets/img/resources/handshake.png "3-way Handshake")

- 三次握手目的：
>为了建立稳定的连接，确保双方能正常收发，保证TCP的稳定性
- 步骤：
>**Step1(SYN)**: client要与server建立连接，发送一个SYN=1的segment告诉server自己想从什么sequence number(client_isn=42 here)的segment开始通信  
>**Step2(SYN+ACK)**: 假设这个segment到达了server, server获取它的client_isn，为此次连接分配TCP buffer和variables，再向client发送一个SYN=1/ACK=client_isn+1/random sequence number(server_isn)的connection-granted segment(SYN-ACK)，告诉client同意建立连接  
>**Step3(ACK)**: 当client收到SYN-ACK segment后，同样为此次连接分配bufffer和variables，并向server发送一个SYN=0/ACK=server_isn+1的segment(这次可能会含有应用层的data，因为连接已建立)

### 3. TCP“四次握手”

![handshake](/assets/img/resources/closeTCP.png "4-way Handshake")

- 四次握手目的：
>为了安全的关闭连接，不丢失数据
- 步骤：
>**Step1**: 当client(或server同理)想关闭连接时，向server发送FIN=1的segment，进入FIN_WAIT_1状态，等server的ACK  
>**Step2**: 当server收到这个FIN后，可以先把未完成的data发过去，然后发一个ACK告诉client收到，当client收到这个ACK后，进入FIN_WAIT_2状态，再等一个来自server的FIN  
>**Step3**: server再发一个FIN=1的segment，告诉client可以关了，当client收到后进入TIME_WAIT状态  
>**Step4**: client向server发一个ACK表示收到，这时候的TIME_WAIT是为了避免这个ACK丢失留出的重发时间，然后关闭连接

### 4. DNS解析过程



## **B. 常见Q&A**

### 1. RPC

### 2. Http vs Https

### 3. GET和POST区别

