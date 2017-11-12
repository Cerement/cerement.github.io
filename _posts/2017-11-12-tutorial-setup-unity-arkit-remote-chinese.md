---
title: "教學：設置Unity ARKit Remote"
date: 2017-11-12T11:40:33+08:00
excerpt: "Unity ARKit Remote是Unity ARKit Plugin中一個很方便的工具，讓開發者即使沒有實際將程式build到iOS裝置上，也能在Unity Editor中做測試。"
categories:
- Unity
tags:
- Tutorial
- Unity
- ARKit
- AR
- iOS
- Unity ARKit Plugin
- 中文
---

## 概述

Unity ARKit Remote是Unity ARKit Plugin中一個很方便的工具，讓開發者即使沒有實際將程式build到iOS裝置上，也能在Unity Editor中做測試。

目前的版本支援：

- 來自裝置相機的影像
- 隨著裝置移動，得到相機的位置和旋轉
- `ARPlaneAnchor`的新增、移除及各個觸發事件
- Point cloud data

然而，目前的版本還不支援AR hit test，因此開發者還是需要實作在Unity Editor下測試時，所要用到的相關功能，來模擬AR hit test，例如`Physics.Raycast()`。

## 版本

- Unity 2017.1.1p3 (64-bit)
- Unity ARKit Plugin 1.0

## 步驟

### 1. 將UnityARKitRemote Scene建置到iOS裝置上

- 從[Asset Store](https://www.assetstore.unity3d.com/en/#!/content/92515)下載最新版的Unity ARKit Plugin

- 在資料夾中找到一個叫做UnityARKitRemote的scene，將其build到相容的iOS裝置上
	- 確定在build settings中有把"Development Build"選項打勾
	- 建議將product name和bundle identifier改掉，方便和實際在開發的app做個區分

### 2. 設置正在開發中的Scene

- 從ARKitRemote資料夾中，找到一個名為ARKitRemoteConnection的prefab，將它加進你的scene中最外層

### 3. 連接Unity Editor與iOS裝置

- 打開iOS裝置上的UnityARKitRemote。它應該會顯示黑畫面，上面寫著“Waiting for editor connection..”

- 在Unity Editor中執行開發中的scene。應該會看到綠畫面，畫面下方寫著“Please connect to player in the console menu”

- 在console視窗中，會有叫做"Connected player"的選單，點開後選擇你的iOS裝置
	- 如果連接失敗的話，可以先將iOS裝置上的UnityARKitRemote完全關閉，再試一次

- 在game視窗中，如果連接成功，會顯示一個“Start Remote ARKit Session”的按鈕，按下去之後就可以debug啦！

## 結果

### 官方Demo影片

<iframe width="560" height="315" src="https://www.youtube.com/embed/kxPOCYb_1Y8?rel=0" frameborder="0" allowfullscreen></iframe>

## 參考資料

- [Introducing the Unity ARKit Remote - Unity Blog](https://blogs.unity3d.com/2017/08/03/introducing-the-unity-arkit-remote/)
- [ARKit support for iOS via Unity-ARKit-Plugin (post#605)](https://forum.unity.com/threads/arkit-support-for-ios-via-unity-arkit-plugin.474385/page-13#post-3153415)