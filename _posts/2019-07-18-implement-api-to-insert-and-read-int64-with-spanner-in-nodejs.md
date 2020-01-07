---
title: "Implement an API to Insert and Read int64 with Spanner in Node.js"
date: 2019-07-17T23:20:32+08:00
excerpt: "The precision of integers in JavaScript is only 53 bits, which can't support int64; therefore, when implementing an API to interact with Spanner, if there is any field is int64, such as UID of players, it's very likely to encounter the loss of precision."
categories:
  - Node.js
tags:
  - Node.js
  - JavaScript
  - GCP
  - Spanner
  - JSON
---

## Introduction

There is no int and float in JavaScript, only number. Numbers in JavaScript are stored in the format of [IEEE 754](https://www.ecma-international.org/ecma-262/5.1/#sec-8.5) using 64 bits. For integers, the precision is only 53 bits, no full support for int64.

Therefore, when implementing an API to interact with Spanner, if there is any field is int64, such as UID of players, it's very likely to encounter the loss of precision.

## Version

- Node.js 10.10.0
- Spanner API 3.1.0

## Solution

### 1. Treat int64 as string in JSON when sending HTTP requests

If treat int64 as number in JSON, it would be cast to JavaScript number after parsed by `express.json()`, losing the precision of int64.

So it's better to convert int64 to string in the first place before sending HTTP requests, and always treat it as string in JavaScript all the time. If it really needs to handle big numbers, give [big.js](https://github.com/MikeMcl/big.js/) a try.

### 2. Call `row.toJSON({wrapNumbers: true})` for the results of Spanner query

If not adding the parameter `{wrapNumbers: true}`, it would warn you:

```
Error: Serializing column "uid" encountered an error: Integer 1379763201381616641 is out of bounds. Call row.toJSON({ wrapNumbers: true }) to receive a custom type.
```

After adding the parameter, all the number in the JSON would be parsed as string stored into objects. For example, given a JSON like this:

```
{
  "UID": 1234567890123456
}
```

Would be parsed this way with the parameter:

```
{
  "UID": {
    "value": "1234567890123456"
  } 
}
```

Then, depending on needs, to decide whether just pass it as a string or include other modules to deal with it.

## Reference

- [ECMAScript Language Specification - ECMA-262 Edition 5.1](https://www.ecma-international.org/ecma-262/5.1/#sec-8.5)
- [JSON integers: limit on size - Stack Overflow](https://stackoverflow.com/questions/13502398/json-integers-limit-on-size)
- [@google-cloud/spanner 3.1.0 » Globals - Node.js - Google Cloud](https://cloud.google.com/nodejs/docs/reference/spanner/3.1.x/global#TransactionReadResponse)