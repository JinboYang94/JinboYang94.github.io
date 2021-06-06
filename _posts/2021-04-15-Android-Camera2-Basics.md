---
title: Android Camera2 Fundamentals
author: Jinbo Yang
date: 2021-04-15 13:29 +0800
last_modified_at: 2021-04-15 13:29 +0800
categories: [Android, Java, Basic]
tags: [Android, Java, Fundamental]
math: true
---

## **Android Camera2使用过程中的总结:**

### **A. Camera2 常用类:**

#### 1. CameraManager

> **CameraManager是Camera2中新加入的类，用来管理摄像头相关的所有信息/内容，通过getSystemService(Context.CAMERA_SERVICE)实例化。**  
> **Docs: A system service manager for detecting, characterizing, and connecting to CameraDevices.**

- <font color=Blue>CameraCharacteristics getCameraCharacteristics(String cameraId)</font>
> <font color=Tan>得到camera的参数和属性</font>
> Source code: Query the capabilities of a camera device. These capabilities are immutable for a given camera.
- <font color=Blue>String[] getCameraIdList()</font>
> <font color=Tan>得到当前连接的camera id</font>  
> Source code: Return the list of currently connected camera devices by identifier, including cameras that may be in use by other camera API clients.
- <font color=Blue>void openCamera(String cameraId, CameraDevice.StateCallback callback, Handler handler)</font>
> <font color=Tan>打开camera</font>  
> Source code: Open a connection to a camera with the given ID.  
> More: Once the camera is successfully opened, {@link CameraDevice.StateCallback#onOpened} will be invoked with the newly opened {@link CameraDevice}. The camera device can then be set up for operation by calling {@link CameraDevice#createCaptureSession} and {@link CameraDevice#createCaptureRequest}
- <font color=Blue>void openCamera(String cameraId, Executor executor, CameraDevice.StateCallback callback)</font>
> <font color=Tan>打开camera</font>  
> Source code: Open a connection to a camera with the given ID.  
> More: The behavior of this method matches that of {@link #openCamera(String, StateCallback, Handler)}, except that it uses {@link java.util.concurrent.Executor} as an argument instead of {@link android.os.Handler}.
- <font color=Blue>void setTorchMode(String cameraId, boolean enable)</font>
> <font color=Tan>打开或关闭摄像头的闪光灯功能</font>  
> Source code: Set the flash unit's torch mode of the camera of the given ID without opening the camera device.

#### 2. CameraDevice
> **CameraDevice是代表连接到Android设备的某个camera，一般通过CameraDevice.StateCallback中的onOpen(CameraDevice camera)来初始化**  
> **Docs: The CameraDevice class is a representation of a single camera connected to an Android device, allowing for fine-grain control of image capture and post-processing at high frame rates.**  

- <font color=Blue>abstract void close()</font>  
> <font color=Tan>关闭camera</font>  
> **Source code:** Close the connection to this camera device as quickly as possible.
- <font color=Blue>CaptureRequest.Builder createCaptureRequest(int templateType, Set&lt;String&gt; physicalCameraIdSet)</font>
> <font color=Tan>创建一个CaptureRequest.Builder，用于选择一种capture的模式</font>  
> **Source code:** Create a CaptureRequest.Builder for new capture requests, initialized with template for a target use case.  
- <font color=Blue>abstract CaptureRequest.Builder createCaptureRequest(int templateType)</font>
> <font color=Tan>同上，通常更常用一些</font>
> **Source code:** Same as above.  
> **常用参数：**
  >- TEMPLATE_PREVIEW 预览请求
  >- TEMPLATE_RECORD 录像请求
  >- TEMPLATE_STILL_CAPTURE 静态图像捕获请求
  >- TEMPLATE_VIDEO_SNAPSHOT 视频截图请求
  >- TEMPLATE_MANUAL 禁止所有自动控制(AF/AE等)的一种basic template，很少用
  >- TEMPLATE_ZERO_SHUTTER_LAG 无快门延迟的静态图像捕获请求
- <font color=Blue>void createCaptureSession(SessionConfiguration config)</font>
> <font color=Tan>用SessionConfiguration创建一个CameraCaptureSession</font>
> **Source code:** Create a new CameraCaptureSession using a SessionConfiguration helper object that aggregates all supported parameters.
- <font color=Blue>abstract void createCaptureSession(List&lt;Surface&gt; outputs, CameraCaptureSession.StateCallback callback, Handler handler)</font>
> <font color=Tan>通过配置output surfaces, StateCallback和Handler来创建，但在API level 30+ deprecated, 改用上面的</font>  
> **Source code:** Create a new camera capture session by providing the target output set of Surfaces to the camera device.
- <font color=Blue>boolean isSessionConfigurationSupported(SessionConfiguration sessionConfig)</font>
> <font color=Tan>检查此camera是否支持某个特定的SessionConfiguration</font>  
> **Source code:** Checks whether a particular SessionConfiguration is supported by the camera device.
- <font color=Blue>abstract String getId()</font>
> <font color=Tan>得到此camera的id，即使关闭/fatal error后都可以使用</font>  
> **Source code:** Get the ID of this camera device. This method can be called even if the device has been closed or has encountered a serious error.

#### 3. CameraCaptureSession
> **CameraCaptureSession是一个配置好的拍照会话，主要用于拍照，也用于对同一个session拍到的照片做再处理，由CameraDevice.createCaptureSession(...)的SessionConfiguration定义/CameraCaptureSession.StateCallback定义**  
> **Doc: A configured capture session for a CameraDevice, used for capturing images from the camera or reprocessing images captured from the camera in the same session previously.**  

- <font color=Blue>abstract int capture(CaptureRequest request, CameraCaptureSession.CaptureCallback listener, Handler handler)</font>
> <font color=Tan>提交拍照请求</font>  
> **Source code:** Submit a request for an image to be captured by the camera device.  
> **More:** Requests submitted through this method have higher priority than those submitted through {@link #setRepeatingRequest} or {@link #setRepeatingBurst}, and will be processed as soon as the current repeat/repeatBurst processing completes.
- <font color=Blue>int captureBurst(List&lt;CaptureRequest&gt; requests, CameraCaptureSession.CaptureCallback listener, Handler handler)</font>
> <font color=Tan>提交多个拍照请求，即连拍</font>  
> **Source code:** Submit a list of requests to be captured in sequence as a burst. The burst will be captured in the minimum amount of time possible, and will not be interleaved with requests submitted by other capture or repeat calls.
- <font color=Blue>abstract void close()</font>
> <font color=Tan>异步关闭capture session</font>  
> **Source code:** Close this capture session asynchronously. Closing a session frees up the target output Surfaces of the session for reuse with either a new session, or to other APIs that can draw to Surfaces.
- <font color=Blue>abstract int setRepeatingBurst(List&lt;CaptureRequest&gt; requests, CameraCaptureSession.CaptureCallback listener, Handler handler)</font>
> <font color=Tan>请求无限重复照片连拍操作</font>
> **Source code:** Request endlessly repeating capture of a sequence of images by this capture session.  
> **More:** If a request is submitted through {@link #capture} or {@link #captureBurst}, the current repetition of the request list will be completed before the higher-priority request is handled. This guarantees that the application always receives a complete repeat burst captured in minimal time, instead of bursts interleaved with higher-priority captures, or incomplete captures.
- <font color=Blue>abstract int setRepeatingRequest(CaptureRequest request, CameraCaptureSession.CaptureCallback listener, Handler handler)</font>  
> <font color=Tan>请求无限重复拍照</font>  
> **Source code:** Request endlessly repeating capture of images by this capture session.  
> **More:** Repeat requests have lower priority than those submitted through {@link #capture} or {@link #captureBurst}, so if {@link #capture} is called when a repeating request is active, the capture request will be processed before any further repeating requests are processed.
- <font color=Blue>abstract void stopRepeating()</font>
> <font color=Tan>取消正在进行的重复拍照请求，正在进行的拍照或者连拍操作仍会完成</font>  
> **Source code:** Cancel any ongoing repeating capture set by either setRepeatingRequest or setRepeatingBurst(List, CameraCaptureSession.CaptureCallback, Handler).  
> **More:** Any currently in-flight captures will still complete, as will any burst that is mid-capture. To ensure that the device has finished processing all of its capture requests and is in ready state, wait for the {@link StateCallback#onReady} callback after calling this method.

#### 4. CameraCharacteristics
> **CameraCharacteristics是用来描述一个CameraDevice的各种属性，对于给定的camera是immutable的，由CameraManager.getCameraCharacteristics(String cameraId)实例化**  
> **Docs: The properties describing a CameraDevice.**

- <font color=Blue>T get(CameraCharacteristics.Key key)</font>
> <font color=Tan>获取相机属性中对应字段的值</font>  
> **Source code:** Get a camera characteristics field value.  
> **常用参数：**
  >- CONTROL_AE_AVAILABLE_MODES 支持的自动曝光模式列表  
  >- CONTROL_AE_AVAILABLE_TARGET_FPS_RANGES 支持的帧率范围 
  >- CONTROL_AE_COMPENSATION_RANGE 支持的曝光补偿范围 
  >- CONTROL_AF_AVAILABLE_MODES 支持的自动聚焦模式列表
  >- CONTROL_AVAILABLE_SCENE_MODES 支持的场景模式列表
  >- CONTROL_AWB_AVAILABLE_MODES 支持的自动白平衡模式列表
  >- FLASH_INFO_AVAILABLE 是否有闪光灯部件
  >- INFO_SUPPORTED_HARDWARE_LEVEL 支持的硬件等级
  >- INFO_VERSION 相机设备制造商版本信息
  >- LEN_FACING 相机设备相对于屏幕的方向，例如后置摄像头一般是LENS_FACING_FRONT
  >- SCALER_STREAM_CONFIGURATION_MAP 支持的可用流配置
- <font color=Blue>List&lt;Key&gt; getKeys()</font>
> <font color=Tan>得到支持的key list</font>
> **Source code:** Returns a list of the keys contained in this map.  

#### 5. CaptureRequest

> **CaptureRequest是一个包含了capture设置的拍照请求，由CameraDevice.createCaptureRequest(...)得到CaptureRequest.Builder对象，再用CaptureRequest.Builder.set()配置后，用CaptureRequest.Builder.build()实例化**  
> **Docs:An immutable package of settings and outputs needed to capture a single image from the camera device. Contains the configuration for the capture hardware (sensor, lens, flash), the processing pipeline, the control algorithms, and the output buffers. Also contains the list of target Surfaces to send image data to for this capture.**

- <font color=Blue>boolean isReprocess()</font>
> <font color=Tan>判断是否是一个再处理请求</font>  
> **Source code:** Determine if this is a reprocess capture request.  
> **常用参数：**  
  >- COLOR_CORRECTION_MODE 颜色校正(native -> sRGB)  
  >- CONTROL_AF_MODE 自动聚焦模式  
  >- CONTROL_AWB_MODE 自动白平衡模式  
  >- CONTROL_AE_MODE 自动曝光模式  
  >- FLASH_MODE 闪光灯模式  
  >- JPEG_ORIENTATION jpeg图像方向  
  >- NOISE_REDUCTION_MODE 降噪模式

### **B. Camera2 Manifest常用权限**

#### 1. &lt;uses-permission android:name="" android:maxSdkVersion=""&gt;

> **&lt;uses-permission&gt;是为了某项操作正常运行必须给予的权限，在Manifest.xml中定义**  
> **Docs:Requests a permission that the application must be granted in order for it to operate correctly.**

- <font color=Blue>android.permission.CAMERA</font>
> <font color=Tan>相机的使用权限</font>  

- <font color=Blue>android.permission.WRITE_EXTERNAL_STORAGE</font>  
> <font color=Tan>写入存储权限, API19后有变化如下</font>  
> **Docs: Starting in API level 19, this permission is not required to read/write files in your application-specific directories returned by Context.getExternalFilesDir(String) and Context.getExternalCacheDir().** 

- <font color=Blue>android.permission.READ_EXTERNAL_STORAGE</font>  
> <font color=Tan>读取存储权限, API19后有变化如下</font>  
> **Docs: Starting in API level 19, this permission is not required to read/write files in your application-specific directories returned by Context.getExternalFilesDir(String) and Context.getExternalCacheDir().** 

- <font color=Blue>android.permission.RECORD_AUDIO</font>  
> <font color=Tan>录音权限</font>  
> **Docs: Allows an application to record audio.**

- <font color=Blue>android.permission.BLUETOOTH</font>  
> <font color=Tan>蓝牙权限</font>  
> **Docs: Allows applications to connect to paired bluetooth devices.**

- <font color=Blue>android.permission.BROADCAST_SMS</font>  
> <font color=Tan>短信提醒权限</font>  
> **Docs: Allows an application to broadcast an SMS receipt notification.**

- <font color=Blue>android.permission.BROADCAST_STICKY</font>  
> <font color=Tan>快速发出第二个提醒权限</font>  
> **Docs: Allows an application to broadcast sticky intents.**

- <font color=Blue>android.permission.INTERNET</font>  
> <font color=Tan>联网权限</font>  
> **Docs: Allows applications to open network sockets.**

- <font color=Blue>android.permission.BLUETOOTH</font>  
> <font color=Tan>蓝牙权限</font>  
> **Docs: Allows applications to connect to paired bluetooth devices.**

#### 2. &lt;permission android:description="" android:icon="" android:label="" android:name="" android:permissionGroup="" android:protectionLevel=""&gt;

> **&lt;permission&gt;是声明某个权限，也在Manifest.xml中定义，其他同上。与uses-permission区别见Docs**  
> **Docs: Declares a security permission that can be used to limit access to specific components or features of this or other applications.**  
> **Diff(From StackOverflow):** &lt;permission&gt; is normally used when making a custom permission (e.g. when making an app that other apps can tie in to, limiting access is a must), and &lt;uses-permission&gt; is used when your app actually needs a permission it doesn't have normally.

### **C. Android Camera2中常用widget**