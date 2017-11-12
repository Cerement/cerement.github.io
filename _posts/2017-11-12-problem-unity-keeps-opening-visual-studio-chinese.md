---
title: "問題：Unity一直重開Visual Studio"
date: 2017-11-12T11:40:33+08:00
except: "每次在Unity中打開一個script，都會重開一個新的Visual Studio，而不是像原本一樣，會自動開到已經存在的Visual Studio。"
categories:
- Unity
tags:
- Unity
- Visual Studio
- Problem
- 中文
---

## 問題

每次在Unity中打開一個script，都會重開一個新的Visual Studio，而不是像原本一樣，會自動開到已經存在的Visual Studio。

## 版本

- Unity 2017.1.1p3 (64-bit)

## 解決方式

刪除Visual Studio的方案檔（\*.sln）和專案檔（\*.csproj），讓Unity在需要的時候自動重新產生。

這個問題似乎容易發生在升級project版本的時候。

## 參考資料

- [Unity keeps opening new instances of Microsoft Visual Studio - Unity Answers](https://answers.unity.com/questions/1078859/unity-keeps-opening-new-instances-of-microsoft-vis.html)