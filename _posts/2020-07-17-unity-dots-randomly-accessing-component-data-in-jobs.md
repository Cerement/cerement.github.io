---
title: "Unity DOTS: Randomly Accessing Component Data in Jobs"
date: 2020-07-17T15:24:00+08:00
excerpt: "Use ComponentDataFromEntity and BufferFromEntity to randomly access component data in jobs. However, random access results in more cache misses."
categories:
- Unity
tags:
- Unity
- DOTS
- ECS
- Job
---

## Summary

Use `ComponentDataFromEntity` and `BufferFromEntity` to randomly access component data in jobs. However, random access results in more cache misses.

## Environment

- Unity 2019.4.0f1
- Entities 0.11.1-preview.4
- Burst 1.3.0-preview.12

## Explanation

If you try to access component data from other entities in a scheduled job, even with `WithReadOnly()` capturing `entityManager`:

```cs
public struct SampleComponent : IComponentData
{
    public int Value;
}
```

```cs
public class SampleSystem : JobComponentSystem
{
    protected override JobHandle OnUpdate(JobHandle inputDeps)
    {
        EntityManager entityManager = EntityManager;
        JobHandle job = Entities
            .WithReadOnly(entityManager)
            .ForEach((Entity entity) =>
        {
            if (entityManager.HasComponent<SampleComponent>(entity))
            {
                SampleComponent sampleComp = entityManager.GetComponentData<SampleComponent>(entity);
                Debug.Log($"{entity} has SampleComponent with value = {sampleComp.Value}");
            }
        }).Schedule(inputDeps);

        return job;
    }
}
```

After hitting play, lots of error logs will show up:

```
InvalidOperationException: The previously scheduled job SampleSystem:<>c__DisplayClass_OnUpdate_LambdaJob0 reads from the NativeArray <>c__DisplayClass_OnUpdate_LambdaJob0.JobData.entityManager. You must call JobHandle.Complete() on the job SampleSystem:<>c__DisplayClass_OnUpdate_LambdaJob0, before you can write to the NativeArray safely.
```

The cause of the error is that both `HasComponent()` and `GetComponentData()` somehow invoke `GetCheckedEntityDataAccess()`, which checks write access, but I'm not sure why, since I consider `HasComponent()` and `GetComponentData()` not having the intention to write.

```cs
public bool HasComponent<T>(Entity entity)
{
    return GetCheckedEntityDataAccess()->HasComponent(entity, ComponentType.ReadWrite<T>());
}
```

```cs
public T GetComponentData<T>(Entity entity) where T : struct, IComponentData
{
    var ecs = GetCheckedEntityDataAccess();
    return ecs->GetComponentData<T>(entity);
}
```

And they both invoke `GetCheckedEntityDataAccess()`:

```cs
internal EntityDataAccess* GetCheckedEntityDataAccess()
{
#if ENABLE_UNITY_COLLECTIONS_CHECKS
    AtomicSafetyHandle.CheckWriteAndThrow(m_Safety);
    if (m_JobMode != m_EntityDataAccess->m_JobMode)
    {
        throw new InvalidOperationException($"EntityManager cannot be used from this context job mode {m_JobMode} != current mode {m_EntityDataAccess->m_JobMode}");
    }
#endif
    return m_EntityDataAccess;
}
```

Instead, we need to use `ComponentDataFromEntity` to random access components from other entities:

```cs
public class SampleSystem : JobComponentSystem
{
    protected override JobHandle OnUpdate(JobHandle inputDeps)
    {
        ComponentDataFromEntity<SampleComponent> allSampleComps = GetComponentDataFromEntity<SampleComponent>(true);
        JobHandle job = Entities
            .WithReadOnly(allSampleComps)
            .ForEach((Entity entity) =>
        {
            if (allSampleComps.Exists(entity))
            {
                SampleComponent sampleComp = allSampleComps[entity];
                Debug.Log($"{entity} has SampleComponent with value = {sampleComp.Value}");
            }
        }).Schedule(inputDeps);

        return job;
    }
}
```

An overhead should be noted is that random access results in more cache misses. It may be acceptable if total amount of the components is rather few.

Besides, there is `BufferFromEntity`, too, which is for `DynamicBuffer`.
