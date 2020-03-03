---
title: "Docker: Bind to Docker Socket on Windows Host from Linux Containers"
date: 2020-03-03T15:23:00+08:00
excerpt: "Method to bind to docker socket on Windows host."
categories:
- Docker
tags:
- Docker
- Container
---

## Symptoms

When trying to bind docker socket on Windows host from Linux containers with the following command:

```
$ docker run -v /var/run/docker.sock:/var/run/docker.sock ...
```

It won't work.

## Environment

- Docker v19.03.5

## Solution

Use double slashes instead for docker path on Windows:

```
$ docker run -v //var/run/docker.sock:/var/run/docker.sock ...
```

From Wikipedia, it says the double slash syntax is from Universal Naming Convention:

> The Microsoft Windows UNC, short for Universal Naming Convention or Uniform Naming Convention, specifies a common syntax to describe the location of a network resource, such as a shared file, directory, or printer.

## Reference

- [Bind to docker socket on Windows - Stack Overflow](https://stackoverflow.com/questions/36765138/bind-to-docker-socket-on-windows)
- [Path (computing) - Wikipedia](https://en.wikipedia.org/wiki/Path_(computing)#Universal_Naming_Convention)

