---
title: "Troubleshoot Issues of Installing Tiny Mode on Unity 2019.1"
date: 2019-06-01T17:31:08+0800
excerpt: "According to documentation, Tiny Mode package was implemented on Unity 2018.3 initially, maybe that's why I encountered some issues while installing the package on Unity 2019.1. The following are the issues and the fixes."
categories:
  - Unity
tags:
  - Unity
  - Tiny Mode
  - ECS
---

## Introduction

According to documentation, Tiny Mode package was implemented on Unity 2018.3 initially, maybe that's why I encountered some issues while installing the package on Unity 2019.1. The following are the issues and the fixes.

## Version

- Unity 2019.1.4f1
- Tiny Mode 0.14.5-preview

## Troubleshooting

- ### Error occurs right after installing the Tiny Mode package

```
Library\PackageCache\com.unity.tiny@0.14.5-preview\Editor\Export\TinyAssetExporter.cs(712,38): error CS1061: 'TMP_FontAsset' does not contain a definition for 'characterDictionary' and no accessible extension method 'characterDictionary' accepting a first argument of type 'TMP_FontAsset' could be found (are you missing a using directive or an assembly reference?)
```

Current version of Tiny Mode doesn't support the latest TextMeshPro. We need to downgrade the TextMeshPro to 1.3.0 like the image below.

![](/assets/images/2019-06-01-tinymode-1.png)

- ### Failed to execute `Import Samples` in the menu of Tiny Mode

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

Make sure the project path doesn't contain any space.

- ### Can't find the `Workshop` folder mentioned in the workshop video

The `Workshop` folder mentioned in the video was for demonstration. The full version of the project can be found at `/Assets/TinySamples/BasicWorkshop`.

- ### There is no `MainGroup` in the scene of `BasicWorkshop` project

`MainGroup` and other `EntityGroup` were placed in the `/Assets/TinySamples/BasicWorkshop/Entities`.

## Reference

- [Project Tiny Workshop - Youtube](https://www.youtube.com/watch?v=-yubuk7jAb4&list=PLX2vGYjWbI0TPRStIWx3UyNB8QqjNUj98&index=1)
- [Tiny Mode Documentation](https://docs.unity3d.com/Packages/com.unity.tiny@0.13/manual/index.html)

