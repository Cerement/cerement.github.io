---
title: "Problem: Unity Keeps Opening Visual Studio"
date: 2017-11-08T17:35:52+08:00
categories:
- Unity
tags:
- Unity
- Visual Studio
- Problem
---

## Problem

Every time I open C# script in Unity, it keeps opening new instances of Visual Studio rather than in existing one.

## Version

Unity 2017.1.1p3 (64-bit)

## Solution

Delete Visual Studio's solution file (\*.sln) and project file (\*.csproj). Let Unity generate these files again.

This problem seems more likely to happen after upgrading the project to the new version of Unity.

## Reference

- [Unity keeps opening new instances of Microsoft Visual Studio - Unity Answers](https://answers.unity.com/questions/1078859/unity-keeps-opening-new-instances-of-microsoft-vis.html)


