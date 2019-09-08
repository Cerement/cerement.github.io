---
title: "Forward Kinematics"
date: 2017-11-03T16:05:40+08:00
categories:
- Animation
tags:
- Animation
- Forward Kinematics
- FK
header:
 teaser: /assets/images/FK.gif
 og_image: /assets/images/FK.gif
---

<p style="text-align: center;"><img src="/assets/images/FK.gif" /></p>

## Overview

[Forward kinematics](https://en.wikipedia.org/wiki/Forward_kinematics) is the use of kinematic equations of a skeleton to derive the end-effector from the values of joints. This technique is often used in robotics and animation.

The project used a framework developed with C++ and OpenGL by [GPLab](http://gpl.cs.nctu.edu.tw/), NCTU. In this project, it would read in the data of skeleton from ASF format and the motion data from AMC format first. Then, it could show motion A and motion B respectively. Here I implemented a simple method to interpolate these motions to generate a new sequence of motion between them.

## Acclaim ASF/AMC

The [Acclaim format](http://research.cs.wisc.edu/graphics/Courses/cs-838-1999/Jeff/ASF-AMC.html) is made up of two files, a skeleton file (ASF, Acclaim Skeleton File) and a motion file (AMC, Acclaim Motion Capture). Acclaim is a game company which has been researching motion capture for years. This is the format they defined for their software and also for anyone to use.

ASF file defines the pose of skeleton at the starting point for the motion data. It seperates the whole skeleton into segments. Every segment has its own directions, length and dof (degrees of freedom). This format has some limitations, such that there is no gaps in the skeleton, and the file can only have one root.

AMC file contains the motion data a sample at a time. Each sample indicates each segment's data, a segment per line.

## Forward Kinematics

[Forward kinematics](https://en.wikipedia.org/wiki/Forward_kinematics) is the use of kinematic equations of a skeleton to derive the end-effector from the values of joints. This technique is often used in robotics and animation.

After parsing the ASF/AMC files, it would compute the positions of each segment of the skeleton for every motion frame. As the data were parsed to the tree structure, it's easy to traverse from the root to every segments until reaching the end-effectors. As the last section mentioned, with the directions and lengths of each segements (and some other properties), it could compute their global positions for rendering on the screen.

## Motion Slerp

There were two motions in this project, motion A and motion B, which are walking animations with the perpendicular walking directions to each other. I wanted to generate new motion data samples between these walking animations, making them into one continuous and spontaneous animation.

Here it can't be simply applied with [linear interpolation](https://en.wikipedia.org/wiki/Linear_interpolation). For the orientions (rotations) of segements, it needs to use [slerp (spherical linear interpolation)](https://en.wikipedia.org/wiki/Slerp), which computes [quaternion](https://en.wikipedia.org/wiki/Quaternion) interpolation instead.

To generate the motion in between, it takes the last sample of motion A and the first sample of motion B to slerp 49 new samples. After concatenating these motions, the final animation would display by the order - motion A, generated motion, motion B.

## Results

- Motion A

<iframe width="640" height="480" src="https://www.youtube.com/embed/hfiMgvOCtqc?rel=0" frameborder="0" allowfullscreen></iframe>

- Motion B

<iframe width="640" height="480" src="https://www.youtube.com/embed/G5fqcsrlvzs?rel=0" frameborder="0" allowfullscreen></iframe>

- Motion A+B (Slerped)

<iframe width="640" height="480" src="https://www.youtube.com/embed/ZUpzu59V6M4?rel=0" frameborder="0" allowfullscreen></iframe>

