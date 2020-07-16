---
title: "Unity DOTS: Using EntityManager with Run() and Burst"
date: 2020-07-16T11:58:00+08:00
excerpt: "EntityManager is a property of class ComponentSystemBase, which is not allowed with Burst. Assigning the EntityManager to a local variable can solve this problem."
categories:
- Unity
tags:
- Unity
- DOTS
- ECS
- Burst
---

## Summary

`EntityManager` is a property of class `ComponentSystemBase`, which is not allowed with Burst. Assigning the `EntityManager` to a local variable can solve this problem.

## Environment

- Unity 2019.4.0f1
- Entities 0.11.1-preview.4
- Burst 1.3.0-preview.12

## Explanation

Assuming we need to use `EntityManager` in the `ForEach` lambda with `Run()`:

```cs
public struct SampleComponent : IComponentData { }
```

```cs
[AlwaysSynchronizeSystem]
public class SampleSystem : JobComponentSystem
{
    protected override JobHandle OnUpdate(JobHandle inputDeps)
    {
        Entities.ForEach((Entity entity) =>
        {
            if (EntityManager.HasComponent<SampleComponent>(entity))
            {
                Debug.Log($"{entity} has SampleComponent!");
            }
        }).Run();

        return default;
    }
}
```

However, there is an error in the editor:

```
D:\Workspace\ecs\Assets\Scripts\SampleSystem.cs(10,9): error DC0002: Entities.ForEach Lambda expression invokes 'get_EntityManager' on a SampleSystem which is a reference type. This is only allowed with .WithoutBurst() and .Run().
```

That's because `EntityManager` is a property of class `ComponentSystemBase`, which is not allowed with Burst. We can assign `EntityManager` to a local variable before using it in the lambda:

```cs
[AlwaysSynchronizeSystem]
public class SampleSystem : JobComponentSystem
{
    protected override JobHandle OnUpdate(JobHandle inputDeps)
    {
        EntityManager entityManager = EntityManager;
        Entities.ForEach((Entity entity) =>
        {
            if (entityManager.HasComponent<SampleComponent>(entity))
            {
                Debug.Log($"{entity} has SampleComponent!");
            }
        }).Run();

        return default;
    }
}
```