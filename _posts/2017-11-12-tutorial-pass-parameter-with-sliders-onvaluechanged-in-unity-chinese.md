---
title: "教學：在Unity UI Slider的OnValueChanged()中傳遞參數"
date: 2017-11-12T11:40:33+08:00
excerpt: "藉由實作一個會隨著Slider改變而更新文字的UI Text，示範如何在Unity的UI事件中傳遞參數。"
categories:
- Unity
tags:
- Tutorial
- Unity
- UI
- 中文
header:
 teaser: /assets/images/2017-11-10-onvaluechanged_01.gif
 og_image: /assets/images/2017-11-10-onvaluechanged_01.gif
---

![](/assets/images/2017-11-10-onvaluechanged_01.gif)

## 概述

藉由實作一個會隨著Slider改變而更新文字的UI Text，示範如何在Unity的UI事件中傳遞參數。

## 版本

- Unity 2017.1.1p3 (64-bit)

## 步驟

### 1. 在UI Text上定義Callback函式

我們需要定義一個，之後要給Slider的`OnValueChanged()`呼叫的callback函式。需要注意的是，這個函式必須使用一個`float`參數。然後將這個script加到UI Text上。

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

### 2. 將Callback函式加到Slider的`OnValueChanged()`

- 將UI Text物件拖拉到Slider的`OnValueChanged()`底下欄位。

- 在函式選單中，選擇位在`Dynamic float`下方的`OnSliderValueChanged()`函式。只有符合這個UI事件需要參數的函式才會出現在這裡。

![](/assets/images/2017-11-10-onvaluechanged_02.gif)

## 結果

UI Text會收到每個帶有`float`參數的`OnValueChanged()`事件，並隨著改變顯示文字。

![](/assets/images/2017-11-10-onvaluechanged_01.gif)

