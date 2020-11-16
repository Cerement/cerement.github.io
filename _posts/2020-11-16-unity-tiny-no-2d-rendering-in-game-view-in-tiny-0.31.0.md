---
title: "Unity Tiny: No 2D Rendering in Game View in Tiny 0.31.0"
date: 2020-11-16T11:33:00+08:00
excerpt: "Install the 2D Entities package to have 2D rendering support in game view with Tiny 0.31.0."
categories:
- Unity
tags:
- Unity
- Tiny
- DOTS
- Rendering
- 2D
---

## Symptom

Open the Tiny2D scene in the [ProjectTinySamples](https://github.com/Unity-Technologies/ProjectTinySamples). The hexagon sprite is correctly rendered in the scene view, but it won't be rendered in game view after hitting play.

## Solution

Install 2D Entities package (`com.unity.2d.entities`) by following these [instructions](https://docs.unity3d.com/Packages/com.unity.2d.entities@0.31/manual/GetStarted.html).

## Explanation

In Tiny 0.31.0,

- Some 2D features provided in 2D Entities package are now included in Tiny All package
- Drop the dependency on 2D Entities
- The namespace for 2D components is now `Unity.Tiny.*` instead of `Unity.U2D.Entities.*`

As the [post](https://forum.unity.com/threads/project-tiny-0-31-preview-is-available.998752) on the forum said:

> Tiny All contains all the 2D features that were previously included in the 2D Entities package. If your project previously included the 2D Entities package, make sure to first uninstall the 2D Entities package from your project, and then install the latest Tiny.All package. Also note that the namespace for 2D components is now Unity.Tiny.x instead of Unity.U2D.Entities.x, i.e. Unity.U2D.Entities.SpriteRenderer is now Unity.Tiny.SpriteRenderer.

And in another [post](https://forum.unity.com/threads/project-tiny-0-31-preview-is-available.998752/#post-6510693) it mentioned that Tiny All doesn't have DOTS editor 2D rendering support. Install 2D Entities package to get the support.

> Tiny.All does not come with a DOTS editor rendering pipeline for 2D. If you would like to enable this, please install the 2D Entities package, which is now purely a DOTS editor rendering pipeline.

There will be an embedded DOTS Runtime player in the future, according to the [post](https://forum.unity.com/threads/project-tiny-0-31-preview-is-available.998752/page-2#post-6522390):

> Starting with preview 0.28, the Play-in-Editor (in Game view via DOTS Hybrid mode) is no longer supported and will be replaced in the future with an embedded DOTS Runtime player taking over and replacing the Game view.

## Reference

- [Unity - Project Tiny 0.31 preview is available - Unity Forum](https://forum.unity.com/threads/project-tiny-0-31-preview-is-available.998752)