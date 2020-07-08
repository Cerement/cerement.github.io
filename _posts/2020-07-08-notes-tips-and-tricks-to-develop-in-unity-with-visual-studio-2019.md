---
title: "Notes: Tips and Tricks to Develop in Unity with Visual Studio 2019"
date: 2020-07-08T17:23:00+08:00
excerpt: "This is the summary of the talk \"Tips and Tricks to Develop in Unity with Visual Studio 2019\" on Unite Now 2020."
categories:
- Unity
tags:
- Unity
- Tips
- Visual Studio
- Notes
---

## Overview

This is the summary of the talk on Unite Now 2020:

<iframe width="560" height="315" src="https://www.youtube.com/embed/KH0nqTpOVuM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Tips

Most of the features mentioned in the following come with Visual Studio 2019 Tools for Unity.

### Roslyn Analyzers

[Roslyn analyzers](https://docs.microsoft.com/en-us/visualstudio/code-quality/roslyn-analyzers-overview?view=vs-2019) are code analyzers in Visual Studio which inspect your C# code for style, quality and potential issues. Unity made an implementation for itself.

For example, it will hint that you left an empty Unity message:

![](../assets/images/2020-07-07-17-08-21.png)

Here is the [full list](https://github.com/microsoft/Microsoft.Unity.Analyzers/blob/master/doc/index.md) of the analyzers.

### Implement Unity Messages

- Ctrl+Shift+M

This shortcut will open a window listing all the Unity message for you to pick.

![](../assets/images/2020-07-07-17-13-56.png)

### Unity Project Explorer

In the menu `View/Unity Project Explorer`. It's an explorer allowing you to browse the scripts with the same structure as your Unity project.

![](../assets/images/2020-07-07-17-21-35.png)

### Attach to Unity and Play

In the dropdown of `Attach to Unity`, there is an alternative option that it will hit play for you after attaching.

![](../assets/images/2020-07-07-17-27-41.png)

### Comment Code Block

- **Ctrl+K, Ctrl+C**: Comment
- **Ctrl+K, Ctrl+U**: Uncomment

![](../assets/images/2020-07-08-17-42-27.png)

### Clipboard History

- Ctrl+Shift+V

![](../assets/images/2020-07-07-18-04-42.png)

### Task List

- Ctrl+\\, T
- or, in the menu `View/Task List`

![](../assets/images/2020-07-07-18-12-22.png)

You can also edit the tokens treated as todos in the option:

![](../assets/images/2020-07-07-18-15-26.png)

### Snippets

- Ctrl+K+S

This can quickly make your selection block surrounded with some common syntax.

![](../assets/images/2020-07-08-16-23-43.png)

### Multi Caret

- Ctrl+Alt+Click

Allow you to select multiple places and edit them at the same time.

![](../assets/images/2020-07-08-16-42-07.png)

### Unity Messages Custom Color

In the menu `Tools/Options/General/Fonts and Colors`:

![](../assets/images/2020-07-08-16-48-52.png)

So the Unity messages will be:

![](../assets/images/2020-07-08-16-50-22.png)

### Renaming

- Ctrl+R, Ctrl+R

This will rename the target and all the references as well. It can be used at almost everything, including variables, methods and classes. It even renames the file name when you rename a class.

![](../assets/images/2020-07-08-17-03-30.png)

## Uncovered Parts

Some parts of the talk I personally felt not so valuable. Check them out in the video started at 37:11 if you're interested:

- Visual Studio Live Share
- Github for Unity (plugin)