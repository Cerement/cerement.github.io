---
title: "Robot Escaper"
date: 2017-11-02T10:44:01+08:00
categories:
- Game
tags:
- Game
- Unity
- Unity Web Player
- Horizontal Scrolling
- Platformer
header:
 teaser: /assets/images/RobotEscaper_0.jpg
 og_image: /assets/images/RobotEscaper_0.jpg
---

![](/assets/images/RobotEscaper_0.jpg)

<p style="text-align: center;"><a href="https://nagachiang.github.io/RobotEscaper" target="_blank">Click here to play</a></p>

## Overview

Robot Escaper is an endless running game developed with Unity.

This game features in simple control. All the player needs to do is jumping and dashing. As an endless running game, there is no ending in this game. It would be harder and harder, and all the levels are procedurally generated.

It's my first game using Unity. I followed the tutorials on the Unity official site and polished it in my spare time, which took me a month to get familiar to Unity.

## Features

### Simple control

| ![](/assets/images/RobotEscaper_1.jpg) | ![](/assets/images/RobotEscaper_2.jpg) |
|:---:|:---:|
| Press Z to jump | Press X to dash |

It's extremely easy to control the robot - press Z to jump and X to dash. The robot can jump twice until it touches the platform to reset. There are two green orbs to indicate the jump times left.

### Special platforms

| ![](/assets/images/RobotEscaper_3.jpg) | ![](/assets/images/RobotEscaper_4.jpg) | ![](/assets/images/RobotEscaper_5.jpg) |
|:---:|:---:|:---:|
| Normal Platform | Moving Platform | Dropping Platform |

The Normal Platform is just a platform to run on, while the Moving Platform would randomly generated to move horizontally or vertically repeatedly, and the Dropping Platform would drop down once the robot touches it no matter from which direction.

### Endless levels, harder and harder

![](/assets/images/RobotEscaper_6.jpg)

The platform spawners would generate different sizes and kinds of platform randomly depending on current distance from the start. For every 50m, the combination of platforms would become harder and harder. The difficulty is capped at 300m, where most of the platforms would be replaced with small Dropping Platforms.

### Highscores

![](/assets/images/RobotEscaper_7.jpg)

![](/assets/images/RobotEscaper_8.jpg)

This game also has a highscore system. Once your score is within top 100, it would prompt you to submit your score. There is a server handling the MySQL database for these top 100 highscores.

## Credits

- Design/Program
    - Cheng-Han "Naga" Chiang
- Arts
    - 2D Character: Sample Assets (Unity) 
    - Sprites: Sample Assets (Unity)
    - Skybox: [SkyBox Volume 2 (Hedgehog Team)](https://www.assetstore.unity3d.com/en/#!/content/3392)
    - Particle Systems: [Elementals (G.E.TeamDev), SimpleParticlePack](https://www.assetstore.unity3d.com/en/#!/content/11158)
    - Fonts: Audiowide (Brian J. Bonislawsky)
- Audio
    - SFX: [小森 平](http://taira-komori.jpn.org/freesoundtw.html), [blastwavefx](http://www.freesfx.co.uk/)
- Special Thanks
    - Tutorials: Mike Geig
