---
title: "Unity: Generating Visual Studio Projects for Packages"
date: 2020-06-04T16:29:00+08:00
excerpt: "Generating Visual Studio Projects for Packages with Unity editor preferences."
categories:
- Unity
tags:
- Unity
- Package
- Visual Studio
---

## Symptoms

By default, Unity only generates Visual Studio projects (`.csproj`) for assemblies in `Assets/` folder, including predifined assemblies (`Assembly-CSharp`, `Assembly-CSharp-Editor`) and those formed with [assembly definitions (`*.asmdef`)](https://docs.unity3d.com/Manual/ScriptCompilationAssemblyDefinitionFiles.html), but not for assemblies in imported packages. This causes some inconvenience when we want to trace code with Visual Studio.

![](../assets/images/2020-06-04-unity-generating-visual-studio-projects-for-packages-1.png)

## Environment

- Unity 2019.3.0f6 (with less options)
- Unity 2019.3.12f1 (with more options)

## Solution

### 1. Open editor preferences (`Edit` / `Preferences...`)

![](../assets/images/2020-06-04-unity-generating-visual-studio-projects-for-packages-2.png)

### 2. Select tab `External Tools` and enable `.csproj` files for packages

In Unity 2019.3.0f6, there is only one option to generate all project files.

![](../assets/images/2020-06-04-unity-generating-visual-studio-projects-for-packages-3.png)

While in Unity 2019.3.12f1, we can choose which kinds of packages we want Unity generate for.

![](../assets/images/2020-06-04-unity-generating-visual-studio-projects-for-packages-4.png)

I can't tell which version improved the options from changelog though.

If I check `Registry packages` and click `Regenerate project files`:

![](../assets/images/2020-06-04-unity-generating-visual-studio-projects-for-packages-5.png)

Then I can see the projects from registry packages are generated.

![](../assets/images/2020-06-04-unity-generating-visual-studio-projects-for-packages-6.png)

Personally I recommend generating project files for local packages only, which makes it easier to develop my own packages.

## Reference

- [Unity - Manual: Preferences](https://docs.unity3d.com/Manual/Preferences.html#External-Tools)