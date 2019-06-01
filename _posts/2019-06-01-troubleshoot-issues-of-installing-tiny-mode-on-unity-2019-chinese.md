---
title: "在Unity 2019.1上安裝Tiny Mode"
date: 2019-06-01T17:31:08+0800
excerpt: "根據官方文件，Tiny Mode套件最初支援的是Unity 2018.3，所以如果想使用最新版的Unity安裝Tiny Mode，就會遇到一些問題。"
categories:
  - Unity
tags:
  - Unity
  - Tiny Mode
  - ECS
  - 中文
---

## 概述

根據官方文件，Tiny Mode套件最初支援的是Unity 2018.3，所以如果想使用最新版的Unity 2019安裝Tiny Mode，就會遇到一些問題。以下列舉我碰到的問題與解決方式。

## 版本

- Unity 2019.1.4f1
- Tiny Mode 0.14.5-preview

## 問題排除

- ### 使用Package Manager安裝完Tiny Mode就跳error

```
Library\PackageCache\com.unity.tiny@0.14.5-preview\Editor\Export\TinyAssetExporter.cs(712,38): error CS1061: 'TMP_FontAsset' does not contain a definition for 'characterDictionary' and no accessible extension method 'characterDictionary' accepting a first argument of type 'TMP_FontAsset' could be found (are you missing a using directive or an assembly reference?)
```

這版的Tiny Mode不支援這麼新的TextMeshPro，所以要透過Package Manager將TextMeshPro降版為1.3.0。如下圖展開可以找到舊版本。

![](/assets/images/2019-06-01-tinymode-1.png)

- ### 執行Tiny選單中的Import Samples失敗

```
Exception: Failed to update dependencies:
TINY SHELL> D:\Temp\TinyMode Test\Tiny\Dist
SET PATH=C:\Program Files\Unity\Hub\Editor\2019.1.4f1\Editor\Data\MonoBleedingEdge\bin;%PATH%
bee.exe
[32m[     0s] [0mBuild frontend of artifacts/buildprogram/tundra_buildprogram.dag ran (no suitable previous build dag file)
[32m[1/8  0s] [0mCSProject build.gen.csproj
[32m[2/8  0s] [0mVisualStudioSolution build.gen.sln
[32m[3/8  0s] [0mWriteResponseFile artifacts/rsp/22013569038166155
```

確保專案路徑中不要有任何空白即可。

- ### 找不到教學影片中提到的Workshop資料夾

影片中說的那個Workshop資料夾，是他刻意了另外做一個空的版本，為了邊實做邊講解，事實上完整版就在`/Assets/TinySamples/BasicWorkshop`。

- ### BasicWorkshop專案場景裡是EnemyGroup，而不是MainGroup

MainGroup以及其他的EntityGroup都放在`/Assets/TinySamples/BasicWorkshop/Entities`。

## 參考資料

- [Project Tiny Workshop - Youtube](https://www.youtube.com/watch?v=-yubuk7jAb4&list=PLX2vGYjWbI0TPRStIWx3UyNB8QqjNUj98&index=1)
- [Tiny Mode Documentation](https://docs.unity3d.com/Packages/com.unity.tiny@0.13/manual/index.html)

