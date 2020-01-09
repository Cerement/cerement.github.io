---
title: "Share Source Code between Projects with git submodules in Unity"
date: 2019-07-09T23:32:32+08:00
excerpt: "Git submodule is a common way to share source code between projects, but it would cause some problems when it comes to meta files in Unity projects. To solve the problem, we can do some tricks with symbolic link to share the source code, while the shared project can still have its own independent project."
categories:
  - Unity
tags:
  - Unity
  - Version Control
  - Submodule
  - Git
---

## Overview

> 2020-01-08 Update: It's recommended to create [custom packages](/tutorial-working-with-custom-package-in-unity-2019-2) instead of this.

Git submodule is a common way to share source code between projects, so we can continuously maintain a toolkit for ourselves. However, in Unity projects, meta files must be version controlled since they are required for tracking the assets. When we let project A submodules project B, no matter whose meta files we choose to be version controlled, it will definitely break the other project.

To solve this problem, we can let out main project submodule library project outside the `Assets/` folder, then create a symbolic link for `Scripts/` folder of library project in `Assets/Plugins/` folder of main project.

Which can achieve these goals:

- Share source code between projects
- Shared project can still have its own independent project

## Version

- Unity 2019.1.4f1
- git 2.22.0.windows.1

## Steps

### 1. Add git submodule of shared project outside `Assets/`

![](../assets\images\2019-07-08-git-submodule-in-unity-1.png)

Create a folder called `Submodules/` to store shared projects in, because Unity won't generate meta files for files outside `Assets/`. Under `Submodules/` folder, execute the following command to add git submodule:

```
git submodule add https://github.com/NagaChiang/lib-project lib-project
```

### 2. Create symbolic link in `Assets/Plugins/`

Create a folder called `Plugins/` under `Assets/`. Create symbolic link in `Assets/Plugins` to `Scripts/` folder of shared project. Run these commands depending on the tool you're using:

#### Windows cmd (administrator)
```
mklink /d /j lib-project ../../Submodules/lib-project/Assets/Scripts
```

#### bash
```
ln -s ../../Submodules/lib-project/Assets/Scripts lib-project
```

I didn't do much research about the difference between these two commands. I choose `mklink` personally since the link it creates looks like a shortcut folder, while the one generated from `ln` looks just like an ordinary folder, which makes me worried about the confusion in the future.

### 3. Ignore `Plugins/` folder by configuring `.gitignore`

Now git would think you do have a project under `Plugins/` and add them all to the version control. To avoid this, we need to ignore these files by adding a few lines in `.gitignore`:

```
# Submodules (symlinks)
Plugins/
Plugins.meta
```

## References

- [A Method for Working with Shared Code with Unity and Git - prime31 blog](http://prime31.github.io/A-Method-for-Working-with-Shared-Code-with-Unity-and-Git/)
- [Git-submodules in Unity (my notes) - cschnack.de](https://www.cschnack.de/blog/2019/gitsubm/)
