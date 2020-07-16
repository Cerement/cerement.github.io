---
title: "Unity DOTS: How to Reference Types with Burst"
date: 2020-07-14T11:24:00+08:00
excerpt: "Because `Type` and `typeof()` are managed code, which can't be compiled with Burst, we need to use static function `ComponentType.ReadWrite<T>()` instead."
categories:
- Unity
tags:
- Unity
- DOTS
- ECS
- Burst
---

## Summary

Because `Type` and `typeof()` are managed code, which can't be compiled with Burst, we need to use static function `ComponentType.ReadWrite<T>()` instead.

## Environment

- Unity 2019.4.0f1
- Entities 0.11.1-preview.4
- Burst 1.3.0-preview.12

## Solution

Assuming we need to check if the entity has a particular component through the array from `EntityManager.GetComponentTypes()`. By looking at the constructor of `ComponentType`, there is only one version with a `Type` parameter, so just give it a try:

```cs
public struct SampleComponent : IComponentData { }
```

```cs
[AlwaysSynchronizeSystem]
public class SampleSystem : JobComponentSystem
{
    protected override JobHandle OnUpdate(JobHandle inputDeps)
    {
        EntityManager entityManager = EntityManager;
        Entities.ForEach((Entity entity) =>
        {
            NativeArray<ComponentType> types = entityManager.GetComponentTypes(entity, Allocator.TempJob);
            if (types.Contains(new ComponentType(typeof(SampleComponent))))
            {
                Debug.Log("Found SampleComponent!");
            }

            types.Dispose();
        }).Run();

        return default;
    }
}
```

However, the Burst compiler complains when compiling after hitting play:

```
D:\Workspace\ecs\Assets\Scripts\SampleSystem.cs(15,13): Burst error BC1025: Accessing the type `SampleComponent` (e.g. using `typeof`) is not supported
```

Because both `Type` and `typeof()` are managed code, it's not allowed by the Burst compiler.

Fortunately, there is a static function `ComponentType.ReadWrite<T>()`. Let's replace `new ComponentType(typeof(SampleComponent))` with it:

```cs
[AlwaysSynchronizeSystem]
public class SampleSystem : JobComponentSystem
{
    protected override JobHandle OnUpdate(JobHandle inputDeps)
    {
        EntityManager entityManager = EntityManager;
        Entities.ForEach((Entity entity) =>
        {
            NativeArray<ComponentType> types = entityManager.GetComponentTypes(entity, Allocator.TempJob);
            if (types.Contains(ComponentType.ReadWrite<SampleComponent>()))
            {
                Debug.Log("Found SampleComponent!");
            }

            types.Dispose();
        }).Run();

        return default;
    }
}
```

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