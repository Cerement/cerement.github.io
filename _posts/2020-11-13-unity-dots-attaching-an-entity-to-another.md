---
title: "Unity DOTS: Attaching an Entity to Another"
date: 2020-11-13T16:44:00+08:00
excerpt: "To attach an entity to another, it requires that the parent entity has a LocalToWorld component, and the child entity has LocalToWorld, LocalToParent and Parent, then the ParentSystem will add a Child buffer element to the parent entity, also add a PreviousParent to the child entity. On the other hand, add a DynamicBuffer<LinkedEntityGroup> on the parent entity containing both parent entity and child entity, to ensure the children will be also destroyed once we destroy the parent entity."
categories:
- Unity
tags:
- Unity
- DOTS
- ECS
- Transform
- LinkedEntityGroup
---

## Summary

To attach the transform of an entity to another, it requires:

- Parent Entity
    - `LocalToWorld`

- Child Entity
    - `LocalToWorld`
    - `LocalToParent`
    - `Parent`

Then `ParentSystem` will do the rest of the work for you:

- Parent Entity
    - `LocalToWorld`
    - \+ `Child`

- Child Entity
    - `LocalToWorld`
    - `LocalToParent`
    - `Parent`
    - \+ `PreviousParent`

The transform components on the child entity, including `Translation`, `Rotation` and `Scale`, will be treated as local transform from now on.

On the other hand, assuming we want to treat these entities as a whole, for example, the children should also be destroyed once we destroy the parent, we need to add a `DynamicBuffer<LinkedEntityGroup>` on the parent entity containing elements like `[ParentEntity, ChildEntity]`.

## Environment

- Unity 2020.1.5f1
- Entities 0.14.0-preview.18

## Explanation

The attachment relationship can be split into two aspects:

- Transform (`ParentSystem`)
- Instantiate, enable and destroy (`LinkedEntityGroup`)

### ParentSystem

The whole attaching process of the transform is handled by `ParentSystem`.

#### 1. Updating New Entities with `Parent`

To trigger the process, the child entity should have `LocalToWorld`, `LocalToParent` and `Parent`, as the query is:

```cs
m_NewParentsGroup = GetEntityQuery(new EntityQueryDesc
{
    All = new ComponentType[]
    {
        ComponentType.ReadOnly<Parent>(),
        ComponentType.ReadOnly<LocalToWorld>(),
        ComponentType.ReadOnly<LocalToParent>()
    },
    None = new ComponentType[]
    {
        typeof(PreviousParent)
    },
    Options = EntityQueryOptions.FilterWriteGroup
});
```

For these entities, `ParentSystem` adds a `PreviousParent` component to them.

```cs
void UpdateNewParents()
{
    if (m_NewParentsGroup.IsEmptyIgnoreFilter)
        return;

    EntityManager.AddComponent(m_NewParentsGroup, typeof(PreviousParent));
}
```

#### 2. Gathering Changed Entities with `Parent`

Later, in the same frame, it queries for entities with an extra `PreviousParent`.

```cs
m_ExistingParentsGroup = GetEntityQuery(new EntityQueryDesc
{
    All = new ComponentType[]
    {
        ComponentType.ReadOnly<Parent>(),
        ComponentType.ReadOnly<LocalToWorld>(),
        ComponentType.ReadOnly<LocalToParent>(),
        typeof(PreviousParent)
    },
    Options = EntityQueryOptions.FilterWriteGroup
});
m_ExistingParentsGroup.SetChangedVersionFilter(typeof(Parent));
```

And gather the parent entities with their child entities into a `NativeMultiHashMap<Entity, Entity>` in `GatherChangedParents` job.

#### 3. Updating Child Entities to Their Parent Entities

In `FixupChangedChildren` job, it takes the previously gathered information in the hash map and updating the `DynamicBuffer<Child>` on the parent entities.

```cs
public void Execute()
{
    var parents = UniqueParents.GetKeyArray(Allocator.Temp);
    for (int i = 0; i < parents.Length; i++)
    {
        var parent = parents[i];
        var children = ChildFromEntity[parent];

        RemoveChildrenFromParent(parent, children);
        AddChildrenToParent(parent, children);
    }
}
```

```cs
void AddChildrenToParent(Entity parent, DynamicBuffer<Child> children)
{
    if (ParentChildrenToAdd.TryGetFirstValue(parent, out var child, out var it))
    {
        do
        {
            children.Add(new Child() { Value = child });
        }
        while (ParentChildrenToAdd.TryGetNextValue(out child, ref it));
    }
}
```

### LinkedEntityGroup

Even after setting up the transform attachment, when we destroy the parent entity, the child entity will still remain. Therefore, we need `LinkedEntityGroup`. The entities in the same `LinkedEntityGroup` will be instantiated, enabled and destroyed together when we operate on the root entity, which has a `DynamicBuffer<LinkedEntityGroup>` containing all entities in the hierarchy.

For example, aside from the transform attachment we've set up:

```cs
DynamicBuffer<LinkedEntityGroup> linkedEntities = EntityManager.AddBuffer<LinkedEntityGroup>(Parent);
linkedEntities.Add(new LinkedEntityGroup {Value = Parent});
linkedEntities.Add(new LinkedEntityGroup {Value = Child});
```

Note that the root entity must be placed at the first element.

According to the `EntityComponentStore` in the `EntityComponentStoreCreateDestroyEntities.cs`, it seems that it will ignore the buffer with only one element, also skip the first element.

```cs
void AddToDestroyList(Chunk* chunk, int indexInChunk, int batchCount, int inputDestroyCount,
    ref UnsafeList entitiesList, ref int minBufferLength, ref int maxBufferLength)
{
    int indexInArchetype = ChunkDataUtility.GetIndexInTypeArray(chunk->Archetype, m_LinkedGroupType);
    if (indexInArchetype != -1)
    {
        var baseHeader = ChunkDataUtility.GetComponentDataWithTypeRO(chunk, indexInChunk, m_LinkedGroupType);
        var stride = chunk->Archetype->SizeOfs[indexInArchetype];
        for (int i = 0; i != batchCount; i++)
        {
            var header = (BufferHeader*)(baseHeader + stride * i);

            var entityGroupCount = header->Length - 1;
            if (entityGroupCount <= 0)
                continue;

            var entityGroupArray = (Entity*)BufferHeader.GetElementPointer(header) + 1;

            if (entitiesList.Capacity == 0)
                entitiesList.SetCapacity<Entity>(inputDestroyCount * entityGroupCount /*, Allocator.TempJob*/);
            entitiesList.AddRange<Entity>(entityGroupArray, entityGroupCount /*, Allocator.TempJob*/);

            minBufferLength = math.min(minBufferLength, entityGroupCount);
            maxBufferLength = math.max(maxBufferLength, entityGroupCount);
        }
    }
}
```

## Reference

- [TransformSystem | Entities | 0.16.0-preview.21](https://docs.unity3d.com/Packages/com.unity.entities@0.16/manual/transform_system.html)
- [Struct LinkedEntityGroup | Entities | 0.16.0-preview.21](https://docs.unity3d.com/Packages/com.unity.entities@0.16/api/Unity.Entities.LinkedEntityGroup.html)