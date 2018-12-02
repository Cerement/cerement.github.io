---
title: "Problem: How to Use Plain Enum as UPROPERTY in UE4"
date: 2018-01-10T20:27:01+08:00
excerpt: "UBT would complain when we mark plain enum as UPROPERTY; therefore, we need to enclose plain enum type with TEnumAsByte."
categories:
- UE4
tags:
- Problem
- UE4
---

## Problem

UBT would complain when we mark plain enum as UPROPERTY.

## Version

Unreal Engine 4.20.3

## Solution

 Enclose plain enum type with `TEnumAsByte`. For example:

```c++
UPROPERTY(EditDefaultsOnly)
TEnumAsByte<EMyPlainEnum> PlainEnum;
```
