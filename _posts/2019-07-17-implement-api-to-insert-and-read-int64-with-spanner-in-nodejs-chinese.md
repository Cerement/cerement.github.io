---
title: "使用Node.js實作從Spanner讀寫int64的API"
date: 2019-07-17T01:15:32+08:00
excerpt: "在JavaScript中，對整數的精度只有53 bits，無法真正支援到int64。因此，在使用Node.js實作一個與Cloud Spanner溝通的API時，如果其中有欄位的型別為int64，例如玩家的UID，很容易就會碰到數值失真的狀況。"
categories:
  - Node.js
tags:
  - Node.js
  - JavaScript
  - GCP
  - Spanner
  - JSON
  - 中文
---

## 概述

在JavaScript中沒有int和float的分別，只有number，格式一律使用[IEEE 754](https://www.ecma-international.org/ecma-262/5.1/#sec-8.5)，大小為64 bits，因此對於整數來說，精度只能使用到53 bits，無法真正支援到int64。

在使用Node.js實作一個與Cloud Spanner溝通的API時，如果其中有欄位的型別為int64，例如玩家的UID，很容易就會碰到數值失真的狀況。

## 版本

- Node.js 10.10.0
- Spanner API 3.1.0

## 解決方式

### 1. 將int64視為string包在JSON格式中，發送HTTP request

如果把int64在JSON中當作數字傳送，在通過`express.json()`的時候，int64就會被作為數字轉成JavaScript的number型別，這時從request裡面拿出來的數值就會已經是失真的。

所以，在一開始的時候，就該先將int64轉為string再發送request，並且在Node.js裡始終當作string處理。如果真的有處理大數的需求，可以考慮[big.js](https://github.com/MikeMcl/big.js/)。

### 2. 對含int64的Spanner query結果做`row.toJSON({wrapNumbers: true})`

如果不加上參數`{wrapNumbers: true}`，會輸出以下警告訊息：

```
Error: Serializing column "uid" encountered an error: Integer 1379763201381616641 is out of bounds. Call row.toJSON({ wrapNumbers: true }) to receive a custom type.
```

加上參數後，轉出來的JSON物件中，所有的數字型別都會被當作string存到一個object裡面去，例如原本應該是長這樣的JSON：

```
{
  "UID": 1234567890123456
}
```

會被轉成這樣：

```
{
  "UID": {
    "value": "1234567890123456"
  } 
}
```

接著就視需求來決定，可以的話就繼續當作string傳遞就好，有需要再使用別的module來處理大數。

## 參考資料

- [ECMAScript Language Specification - ECMA-262 Edition 5.1](https://www.ecma-international.org/ecma-262/5.1/#sec-8.5)
- [JSON integers: limit on size - Stack Overflow](https://stackoverflow.com/questions/13502398/json-integers-limit-on-size)
- [@google-cloud/spanner 3.1.0 » Globals - Node.js - Google Cloud](https://cloud.google.com/nodejs/docs/reference/spanner/3.1.x/global#TransactionReadResponse)