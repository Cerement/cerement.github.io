---
title: "Unity DOTS: Creating Generic Systems with Generic Jobs"
date: 2020-08-14T14:47:00+08:00
excerpt: "Generic systems can update multiple types of components with the same logic. Since generic parameters are not supported in Entities.ForEach(), we must use IJobChunk to implement generic systems."
categories:
- Unity
tags:
- Unity
- DOTS
- ECS
- Burst
- Jobs
---

## Summary

Generic systems can update multiple types of components with the same logic.

Since generic parameters are not currently supported in `Entities.ForEach()`, we must use `IJobChunk` to implement generic systems. Also, the generic parameters have to be declared with `unmanaged` and `IComponentData` type constraints.

To access the data in the components, one way is making the components implementing the same interface, and adding the interface as a type constraint to the generic system.

## Environment

- Unity 2020.1.0f1
- Entities 0.13.0-preview.24
- Burst 1.3.2
- Jobs 0.4.0-preview.18

## Tutorial

Assuming we want to create a generic system which can print value of multiple types of components, the first step is to create a system with a generic parameter.

### Creating Generic System

```cs
public class GenericPrintSystem<T> : JobComponentSystem
{
    protected override JobHandle OnUpdate(JobHandle inputDeps)
    {
        
    }
}
```

Then, when we add `Entities.ForEach()` as usual:

```cs
    protected override JobHandle OnUpdate(JobHandle inputDeps)
    {
        JobHandle handle = Entities.ForEach((in T comp) =>
        {

        }).Schedule(inputDeps);

        return handle;
    }
```

An error message says that `Entities.ForEach()` is currently not supporting generic parameters:

```
Assets\Scripts\GenericPrintSystem.cs(16,9): error DC0053: Entities.ForEach cannot be used in system GenericPrintSystem`1 as Entities.ForEach in generic system types are not supported.
```

Instead, we have to create a generic job implementing `IJobChunk`.

### Creating Generic Job

```cs
public class GenericPrintSystem<T> : JobComponentSystem
{
    private struct GenericPrintJob : IJobChunk
    {
        [ReadOnly] public ComponentTypeHandle<T> GenericType;

        public void Execute(ArchetypeChunk chunk, int chunkIndex, int firstEntityIndex)
        {
            NativeArray<T> generics = chunk.GetNativeArray(GenericType);
            for (int i = 0; i < generics.Length; i++)
            {
                
            }
        }
    }
```

And the console will complain:

```
error CS0453: The type 'T' must be a non-nullable value type in order to use it as parameter 'T' in the generic type or method 'NativeArray<T>'
```

In this case, we need `struct` and `IComponentData` type constraints to call `GetNativeArray()`.

```cs
private struct GenericPrintJob<T> : IJobChunk
    where T : struct, IComponentData
{
```

However, we don't know what fields `T` contains in at compile time, so it's not possible to read data from component `T`.

### Accessing Data with Interface

Fortunately, apart from knowing exactly what fields the type contains, declaring an interface for the data we need is also a solution.

```cs
public interface IData
{
    int GetValue();
}
```

And add this interface to the type constraints:

```cs
public class GenericPrintSystem<T> : JobComponentSystem
    where T : struct, IComponentData, IData
{
```

Then we can get the value and print it:

```cs
    public void Execute(ArchetypeChunk chunk, int chunkIndex, int firstEntityIndex)
    {
        NativeArray<T> generics = chunk.GetNativeArray(GenericType);
        for (int i = 0; i < generics.Length; i++)
        {
            Debug.Log(generics[i].GetValue());
        }
    }
```

### Creating Component

To create a component which is compatible to our formerly created job, it must implement interface `IData`.

```cs
[GenerateAuthoringComponent]
public struct ValueComponent : IComponentData, IData
{
    public int Value;

    public int GetValue()
    {
        return Value;
    }
}
```

### Finishing Generic System

With the generic job, we can schedule this job in the generic system.

```cs
    private EntityQuery GenericQuery;

    protected override void OnCreate()
    {
        GenericQuery = GetEntityQuery(ComponentType.ReadOnly<T>());
    }

    protected override JobHandle OnUpdate(JobHandle inputDeps)
    {
        GenericPrintJob job = new GenericPrintJob
        {
            GenericType = GetComponentTypeHandle<T>(true),
        };
        
        return job.Schedule(GenericQuery, inputDeps);
    }
```

### Inheriting Generic System

The generic system won't run by itself since it doesn't know what component it should process. We need to inherit the system with `ValueComponent` assigned.

```cs
public class ValuePrintSystem : GenericPrintSystem<ValueComponent> { }
```

There is nothing more to implement so it's all good with this.

## Complete Example

This example demonstrates a generic system, `GenericPrintSystem`, which is capable of printing any component implementing `IData` interface.

### Generic Print System

```cs
public class GenericPrintSystem<T> : JobComponentSystem
    where T : struct, IComponentData, IData
{
    private struct GenericPrintJob : IJobChunk
    {
        [ReadOnly] public ComponentTypeHandle<T> GenericType;

        public void Execute(ArchetypeChunk chunk, int chunkIndex, int firstEntityIndex)
        {
            NativeArray<T> generics = chunk.GetNativeArray(GenericType);
            for (int i = 0; i < generics.Length; i++)
            {
                Debug.Log(generics[i].GetValue());
            }
        }
    }

    private EntityQuery GenericQuery;

    protected override void OnCreate()
    {
        GenericQuery = GetEntityQuery(ComponentType.ReadOnly<T>());
    }

    protected override JobHandle OnUpdate(JobHandle inputDeps)
    {
        GenericPrintJob job = new GenericPrintJob
        {
            GenericType = GetComponentTypeHandle<T>(true),
        };

        return job.Schedule(GenericQuery, inputDeps);
    }
}
```

### Value Print System

```cs
public class ValuePrintSystem : GenericPrintSystem<ValueComponent> { }
```

### IData

```cs
public interface IData
{
    int GetValue();
}
```

### ValueComponent

```cs
[GenerateAuthoringComponent]
public struct ValueComponent : IComponentData, IData
{
    public int Value;

    public int GetValue()
    {
        return Value;
    }
}
```

## Restriction

According to the [Burst documentation](https://docs.unity3d.com/Packages/com.unity.burst@1.4/manual/docs/OptimizationGuidelines.html#generic-jobs), Burst has limited support for generics. The Burst compiler can only detect generic jobs with fully resolved generic arguments, such as `MyJob<int>` and `MySystem<float>.MyJob`, while `MySystem<T>.MyJob<U>` won't be detected.

(Thanks to [@BennetJeutter](https://twitter.com/BennetJeutter) for pointing out this restriction.)