---
title: "Tutorial: Setup Smart Merge for Unity Assets with Git"
date: 2018-01-10T20:27:01+08:00
excerpt: "Since Unity's assets, such as scenes, can't be version controlled, it's always a pain when it comes to more than one developer need to edit a scene in the same time. Fortunately, with some setup, we can include those assets into version control."
categories:
- Unity
tags:
- Tutorial
- Unity
- Git
- Smart Merge
---

## Overview

Since some of the Unity's assets, such as scenes, can't be version controlled, it's always a pain when it comes to more than one developer need to edit a scene in the same time. Fortunately, with some setup, we can include those assets into version control.

## Version

- Unity 2017.2.0f3 (64-bit)

## Step by Step

### 1. Set `Asset Serialization` to `Force Text`

Because Unity would save scenes and prefabs as binary files by default, which can't be version controlled, we need to force Unity to save files as YAML text-based files. In `Edit > Project Settings > Editor` menu, choose `Force Text` under `Asset Serialization Mode`.

![](/assets/images/2018-01-10-tutorial-unity-smart-merge_01.gif)

### 2. Treat the Files as Binary to Avoid Git Merging Them Automatically

Now that those assets files are saved in text format, git would merge them automatically by default, which may not be semantically right. To avoid this, we need to add some settings into `.gitattributes`. Create one in your project root if you don't have it yet.

```
*.unity binary
*.prefab binary
*.asset binary
```

### 3. Set up UnityYAMLMerge with Git

Copy and paste the following lines into your `.git/config` or global `.gitconfig` file to hook up the merge tool, UnityYAMLMerge,  with Git.

```
[merge]
tool = unityyamlmerge

[mergetool "unityyamlmerge"]
trustExitCode = false
cmd = '<path to UnityYAMLMerge>' merge -p "$BASE" "$REMOTE" "$LOCAL" "$MERGED"
```

## Result

Now your git can include `*.unity`, `*.prefab` and `*.asset` files in version control in this Unity project.

## Reference

- [Unity - Manual: Smart Merge](https://docs.unity3d.com/Manual/SmartMerge.html)
- [Merging Unity scenes, prefabs and assets with git](http://www.deadlyfingers.net/gamedev/unity3d/unity-git/)
