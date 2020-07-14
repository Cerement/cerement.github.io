---
title: "Unity DOTS: How to Reference Types with Unmanaged Code"
date: 2020-07-14T11:24:00+08:00
excerpt: "Because `Type` and `typeof()` are managed code, which can't be compiled with Burst, we need to use static function `ComponentType.ReadWrite<T>()` instead."
categories:
- Unity
tags:
- Unity
- DOTS
- ECS
---

## Summary

Because `Type` and `typeof()` are managed code, which can't be compiled with Burst, we need to use static function `ComponentType.ReadWrite<T>()` instead.

## Environment

- Unity 2019.4.0f1
- Entities 0.11.1-preview.4
- Burst 1.3.0-preview.12

## Solution

Assuming we need to check if the entity has a particular component through the array from `EntityManager.GetComponentTypes()`. By looking at the constructor of `ComponentType`, there is only one version with a `Type` parameter, so just give it a try:

<script src="https://gist.github.com/NagaChiang/8ce54f96531b69d137849449db3baad4.js"></script>

However, the Burst compiler complains when compiling after hitting play:

```
D:\Workspace\ecs\Assets\Scripts\SampleSystem.cs(15,13): Burst error BC1025: Accessing the type `SampleComponent` (e.g. using `typeof`) is not supported
```

Because both `Type` and `typeof()` are managed code, it's not allowed by the Burst compiler.

Fortunately, there is a static function `ComponentType.ReadWrite<T>()`. Let's replace the `new ComponentType(typeof(SampleComponent))` with it:

<script src="https://gist.github.com/NagaChiang/b11b339e63f1060610eb4742408f352f.js"></script>

Actually, you can use `ComponentType.ReadOnly<T>()` if you like, and there is no difference between them, since the implementation of `IEquatable<T>.Equals()` in `ComponentType` only compares `TypeIndex`:

```cs
public bool Equals(ComponentType other)
{
    return TypeIndex == other.TypeIndex;
}
```

Taking a look at the implementation of `ComponentType.ReadWrite<T>()`, we can see that it's done through `TypeManager`, which registers all the component types during the initialization:

```cs
public static ComponentType ReadWrite<T>()
{
    return FromTypeIndex(TypeManager.GetTypeIndex<T>());
}
```

So it seems a good practice to reference component types by cache the type index by `TypeManager.GetTypeIndex<T>()`.