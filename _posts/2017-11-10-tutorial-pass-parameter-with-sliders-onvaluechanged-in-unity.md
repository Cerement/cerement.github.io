---
title: "Tutorial: Pass Parameter with Slider's OnValueChanged() in Unity"
date: 2017-11-10T11:13:29+08:00
excerpt: "This article would show how to pass parameters with UI events. Here we would make a UI text listening to a UI slider's OnValueChanged() event to display its current value."
categories:
- Unity
tags:
- Tutorial
- Unity
- UI
header:
 teaser: /assets/images/2017-11-10-onvaluechanged_01.gif
 og_image: /assets/images/2017-11-10-onvaluechanged_01.gif
---

![](/assets/images/2017-11-10-onvaluechanged_01.gif)

## Overview

This article would show how to pass parameters with UI events. Here we would make a UI text listening to a UI slider's `OnValueChanged()` event to display its current value.

## Version

- Unity 2017.1.1p3 (64-bit)

## Step by Step

### 1. Create Callback Function in UI Text

We need to create a callback function for slider's `OnValueChanged()`. Note that it must have a `float` parameter. Then add this script to your UI text.

```cs
[RequireComponent(typeof(Text))]
public class OnValueChangedText : MonoBehaviour
{
    private Text ValueText;

    private void Start()
    {
        ValueText = GetComponent<Text>();
    }

    public void OnSliderValueChanged(float value)
    {
        ValueText.text = value.ToString("0.00");
    }
}
```

### 2. Add Callback Function to Slider's `OnValueChanged()`

- Drag the UI Text object into the slider's `OnValueChanged()` panel in the inspector.

- Select `OnSliderValueChanged()` function below `Dynamic float` label. Only functions matched the event's parameters would show below this label.

![](/assets/images/2017-11-10-onvaluechanged_02.gif)

## Result

The UI Text would receive every `OnValueChanged()` event with a `float` parameter now.

![](/assets/images/2017-11-10-onvaluechanged_01.gif)
