---
title: "Soft Body Simulation"
date: 2017-11-03T15:09:37+08:00
categories:
- Physics
tags:
- Physics
- Euler Method
- Runge-Kutta 4th-Order Method
- RK4
header:
 teaser: /assets/images/SoftBodySimulation.gif
 og_image: /assets/images/SoftBodySimulation.gif
---

<p style="text-align: center;"><iframe width="640" height="480" src="https://www.youtube.com/embed/xZAxX9luY2E?rel=0" frameborder="0" allowfullscreen></iframe></p>
<p style="text-align: center;">RK4, spring coef. 8000, damper coef. 20</p>

## Overview

This project simulates a flexible cube falling on the floor, using a framework developed with C++ and OpenGL by [GPLab](http://gpl.cs.nctu.edu.tw/), NCTU. For all the videos of result, please check out the last section.

The cube is constructed by a set of particles, which are connected with 3 kinds of springs. With these particles and springs, we can integrate the spring forces and damper forces to estimate the next positions for each particle. In this case, I implemented [Explicit Euler Method](https://en.wikipedia.org/wiki/Euler_method) and [Runge-Kutta 4th-Order Method](https://en.wikipedia.org/wiki/Runge%E2%80%93Kutta_methods) to solve the differential equations. This is a simple approach to simulate solid deformable objects.

Finally, because it's a plane there, I also used a simple method to resolve the point-plane collision detection, which can bounce back the cube to the air.

## Mass-Spring System

<p style="text-align: center;"><img src="/assets/images/softbody_1.jpg"/></p>
<p style="text-align: center;">Cube of Particles</p>

As the image above, these particles constructs the cube. In this simulation, it took 1000 particles to form a 10x10x10 cube. Then, the images below shows each kind of the springs connected between particles.

### Structural Springs

<p style="text-align: center;"><img src="/assets/images/softbody_2.jpg"/></p>

Structural Springs connect from each particle to its 6 adjacent neighbors, including up, down, left, right, forward, backward. These springs establish the basic structure of the cube.

### Shearing Springs

<p style="text-align: center;"><img src="/assets/images/softbody_3.jpg"/></p>

Shearing Springs connect from each particle to its 20 diagonal neighbors. These springs can prevent the cube from excessive shearing.

### Bending Springs

<p style="text-align: center;"><img src="/assets/images/softbody_4.jpg"/></p>

Bending Springs connect from each particle to its 6 second adjacent neighbors, kind of like the structural springs but these springs skip the first neighbor instead. They can prevent the cube from folding all over.

## Integration

### Euler Method

<p style="text-align: center;"><img src="/assets/images/EulerMethod.png"/></p>
<p style="text-align: center;">Illustration of the Euler Method (from <a href="https://en.wikipedia.org/wiki/Euler_method" target="_blank">Wikipedia</a>)</p>

The blue curve in this graph is the unknown real values, while the red one is the approximation by Euler Method. From A0 to A1, this method only takes the status at position A0 to estimate the position after a small time step. In this case, physically, the Euler Method takes the net force at A0 and derive the acceleration to approximate the position at A1 with a small time step.

Because the Euler Method is a first-order method, which means it needs a rather small time step, otherwise the local error (error per step) and the global error (error at a given time) would be very big resulting in unstable system. However, the Euler Method is rather low-cost and also a basic method which is easy to implement.

### Runge–Kutta 4th-Order Method

<p style="text-align: center;"><img src="/assets/images/RK4.gif"/></p>
<p style="text-align: center;">Illustration of the RK4 (from <a href="http://www.physics.drexel.edu/students/courses/Comp_Phys/Integrators/rk4.html" target="_blank">Department of Physics, Drexel University</a>)</p>

First, we define the following equations (h is the step size, h > 0).

- y<sub>n+1</sub> = y<sub>n</sub> + (h/6)(k<sub>1</sub> + 2k<sub>2</sub> + 2k<sub>3</sub> + k<sub>4</sub>)
- t<sub>n+1</sub> = t<sub>n</sub> + h

For k<sub>1</sub>, k<sub>2</sub>, k<sub>3</sub> and k<sub>4</sub>:

- k<sub>1</sub> = f(t<sub>n</sub>, y<sub>n</sub>)
- k<sub>2</sub> = f(t<sub>n</sub> + (h/2), y<sub>n</sub> + (h/2)k<sub>1</sub>)
- k<sub>3</sub> = f(t<sub>n</sub> + (h/2), y<sub>n</sub> + (h/2)k<sub>2</sub>)
- k<sub>4</sub> = f(t<sub>n</sub> + h, y<sub>n</sub> + hk<sub>3</sub>)

Which means:

- k<sub>1</sub> is the increment based on the slope at the <b>beginning</b> of the interval, using <b>y<sub>n</sub></b>.
- k<sub>2</sub> is the increment based on the slope at the <b>midpoint</b> of the interval, using <b>y<sub>n</sub> + (h/2)k<sub>1</sub></b>.
- k<sub>3</sub> is the increment based on the slope at the <b>midpoint</b> of the interval, using <b>y<sub>n</sub> + (h/2)k<sub>2</sub></b>.
- k<sub>4</sub> is the increment based on the slope at the <b>end</b> of the interval, using <b>y<sub>n</sub> + hk<sub>3</sub></b>.

The RK4 method is a fourth-order method, meaning that it's rather high-cost and more precise than the Euler Method. It's local error is on the order of O(h<sup>5</sup>), while the global error is order O(h<sup>4</sup>).

## Collision Detection

There is one thing left to handle is the point-plane collision when the cube is falling right on the plane. For every particle, once it satisfies the following conditions, it would be considered that the collision is happening.

- The particle's position is close enough to the plane.
- The particle is moving toward the plane.

When the particle and the plane are collided, the system would revert the normal component of the velocity. A coefficient smaller than 1 to represent the energy loss could be applied to the reverted velocity. So this is an simple way to handle the point-plane collision.

## Results

<p style="text-align: center;"><iframe width="640" height="480" src="https://www.youtube.com/embed/Tdm5FKujJL0?rel=0" frameborder="0" allowfullscreen></iframe></p>
<p style="text-align: center;">Euler Method, spring coef. 8000, damper coef. 20</p>

<p style="text-align: center;"><iframe width="640" height="480" src="https://www.youtube.com/embed/5kBOrZvvIdk?rel=0" frameborder="0" allowfullscreen></iframe></p>
<p style="text-align: center;">Euler Method, spring coef. 800, damper coef. 60</p>

<p style="text-align: center;"><iframe width="640" height="480" src="https://www.youtube.com/embed/xZAxX9luY2E?rel=0" frameborder="0" allowfullscreen></iframe></p>
<p style="text-align: center;">RK4, spring coef. 8000, damper coef. 20</p>
