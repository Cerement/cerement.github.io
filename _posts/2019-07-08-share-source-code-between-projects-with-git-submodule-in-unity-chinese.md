---
title: "使用git submodule在Unity專案間共用程式碼"
date: 2019-07-08T22:24:32+08:00
excerpt: "git submodule是常見的共用程式碼的方式，但在Unity中會因為meta檔而產生問題。為了解決這個問題，我們可以透過symbolic link的小技巧來共用程式碼，同時讓共用專案還能保有完整的Unity專案結構。"
categories:
  - Unity
tags:
  - Unity
  - Version Control
  - Submodule
  - Git
  - 中文
---

## 概述

git submodule是常見的共用程式碼的方式，讓一些通用的程式功能，能夠在不同專案間持續累積。但在Unity專案中，由於每個asset都會產生一個meta檔來追蹤，meta勢必得加入版控。而當C專案同時被A和B兩個專案同時引用進專案資料夾，同一個asset的meta就會有A、B和C三種版本，不管哪個專案上傳meta，都會讓其他專案壞掉。

為了解決這個問題，我們可以先將共用專案submodule在大專案的`Assets`資料夾外，再透過symbolic link的方式，將共用專案的`Scripts`資料夾連結進大專案的`Assets/Plugins`中。

這個方法可以達到以下目的：

- 共用專案中的程式碼
- 共用專案可以保有自己完整的Unity專案結構，能獨立以專案形式開啟

## 版本

- Unity 2019.1.4f1
- git 2.22.0.windows.1

## 步驟

#### 1. 使用git submodule加入共用專案到`Assets/`外

![](../assets\images\2019-07-08-git-submodule-in-unity-1.png)

在`Assets/`資料夾外建立一個`Submodules/`來專門存放我們的共用專案，因為在`Assets/`外的檔案不會產生meta檔。接著我們到`Submodules/`底下執行指令來加入共用專案：

```
git submodule add https://github.com/NagaChiang/lib-project lib-project
```

#### 2. 在`Assets/Plugins/`中建立symbolic link

在`Assets/`底下創建一個`Plugins/`資料夾，準備在裡面建立symbolic link，連結到剛剛放在`Submodules/`中的共用專案的`Scripts/`。根據環境不同，需要使用如下對應指令：

Windows cmd （需要系統管理員權限）
```
mklink /d /j lib-project ../../Submodules/lib-project/Assets/Scripts
```

bash
```
ln -s ../../Submodules/lib-project/Assets/Scripts lib-project
```

兩者之間的差別我就沒有特別去深究了。我自己最後是選擇了`mklink`的結果，因為它產生出來的資料夾，在檔案總管中會多一個捷徑圖示，不像`ln`產出來的，外表就跟一般的資料夾沒什麼分別，我擔心時間一長會讓自己混淆。

#### 3. 設定`.gitignore`忽略`Plugins/`

這時候git會以為`Plugins/`底下真的有個專案，把它們都全部加進版控。為了避免這個狀況，我要手動將這個資料夾從版控中排除，在`.gitignore`中加上：

```
# Submodules (symlinks)
Plugins/
Plugins.meta
```

## 參考資料

- [A Method for Working with Shared Code with Unity and Git - prime31 blog](http://prime31.github.io/A-Method-for-Working-with-Shared-Code-with-Unity-and-Git/)
- [Git-submodules in Unity (my notes) | cschnack.de](https://www.cschnack.de/blog/2019/gitsubm/)
