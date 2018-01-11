---
title: "教學：為Unity的檔案在git上設定Smart Merge"
date: 2018-01-11T16:16:49+08:00
excerpt: "因為有些Unity的檔案無法被版控，例如scene，所以當很多人要編輯同一個scene的時候，merge總是會出問題。還好，利用Unity提供的一些功能，我們還是有方法可以將這些檔案納入版控。"
categories:
- Unity
tags:
- Tutorial
- Unity
- Git
- Smart Merge
- 中文
---

## 概述

因為有些Unity的檔案無法被版控，例如scene，所以當很多人要編輯同一個scene的時候，merge總是會出問題。還好，利用Unity提供的一些功能，我們還是有方法可以將這些檔案納入版控。

## 版本

- Unity 2017.2.0f3 (64-bit)

## 步驟

### 1. 將`Asset Serialization`設為`Force Text`

因為Unity預設會將諸如scene這些檔案以binary的方式儲存，所以沒辦法被版控。這裡我們必須先強迫Unity，將這類檔案存成純文字的YAML格式。在選單中找到`Edit > Project Settings > Editor`，在`Asset Serialization Mode`項目下選擇`Force Text`。

![](/assets/images/2018-01-10-tutorial-unity-smart-merge_01.gif)

### 2. 要求git以binary的方式處理檔案，避免被自動merge

既然我們已經將那些檔案以純文字儲存了，git預設將會自動merge這些檔案，但格式和語意上不一定會是對的。為了避免這種事發生，我們需要增加以下設定到`.gitattributes`中。如果project中還沒有這個檔案，可以自己新增一個在project根目錄。

```
*.unity binary
*.prefab binary
*.asset binary
```

### 3. 在git中設定UnityYAMLMerge

將以下設定複製到你的`.git/config`或者是全域的`.gitconfig`，讓Git去使用UnityYAMLMerge。

```
[merge]
tool = unityyamlmerge

[mergetool "unityyamlmerge"]
trustExitCode = false
cmd = '<path to UnityYAMLMerge>' merge -p "$BASE" "$REMOTE" "$LOCAL" "$MERGED"
```

## 結果

現在你的git已經能夠將這個project中的`*.unity`、`*.prefab`和`*.asset`納入版控了。

## 參考資料

- [Unity - Manual: Smart Merge](https://docs.unity3d.com/Manual/SmartMerge.html)
- [Merging Unity scenes, prefabs and assets with git](http://www.deadlyfingers.net/gamedev/unity3d/unity-git/)
