---
title: "Tutorial: Setup Unity ARKit Remote"
date: 2017-11-10T15:21:58+08:00
categories:
- Unity
tags:
- Tutorial
- Unity
- ARKit
- AR
- iOS
- Unity ARKit Plugin
---

## Overview

Unity ARKit Remote is a convenient tool for faster iteration on Unity ARKit Plugin, which allows developers debug their code without going through full deploying process.

Currently it supports:

- Video feed from device camera
- Camera translation and rotation based on device movement
- `ARPlaneAnchor` addition, removal and update events
- Point cloud data

However, it doesn't support AR hit test yet. Developers still need to find other workaround to test in Unity editor, such as `Physics.Raycast()`.

## Version

Unity 2017.1.1p3 (64-bit)

## Step by Step

### 1. Build UnityARKitRemote Scene onto iOS Device

- Download latest Unity ARKit Plugin from [Asset Store](https://www.assetstore.unity3d.com/en/#!/content/92515)

- Build the scene called UnityARKitRemote onto your compatible iOS device
	- Make sure to use "Development Build" in build settings
	- It's recommended to change product name and bundle identifier to make it distinguishable 

### 2. Setup Developing Scene

- From the ARKitRemote folder, add ARKitRemoteConnection prefab into your developing scene

### 3. Connect Unity Editor with iOS Device

- Open UnityARKitRemote app on your iOS device. It should display a black screen with “Waiting for editor connection..”

- Run your developing scene in Unity Editor. There should have a green screen with “Please connect to player in the console menu” near the bottom.

- In console window, there is a menu called “Connected player”. Select corresponding iOS device from the dropdown
	- If it fails, try closing the UnityARKitRemote app completely on your iOS device first

- In game window, there would be a button labeled with “Start Remote ARKit Session” if they are successfully connected. Press the button and happy debugging!

## Result

### Official demo video

<iframe width="560" height="315" src="https://www.youtube.com/embed/kxPOCYb_1Y8?rel=0" frameborder="0" allowfullscreen></iframe>

## Reference

- [Introducing the Unity ARKit Remote - Unity Blog](https://blogs.unity3d.com/2017/08/03/introducing-the-unity-arkit-remote/)
- [ARKit support for iOS via Unity-ARKit-Plugin post#605](https://forum.unity.com/threads/arkit-support-for-ios-via-unity-arkit-plugin.474385/page-13#post-3153415)


