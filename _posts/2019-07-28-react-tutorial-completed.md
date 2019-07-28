---
title: "React.js完成教學心得"
date: 2019-07-28T22:45:00+08:00
excerpt: "上回提到要試著做做JavaScript相關framework的教學，我先挑了React的來做，分享一點心得。"
categories:
  - React.js
tags:
  - JavaScript
  - React.js
  - 中文
---

## 前言

上回提到要試著做JavaScript相關framework的教學，我先挑了React的來做。我可以想像，用這種方式來寫網頁會非常彈性而快速，但對於寫習慣靜態型別的我，用JavaScript會讓我覺得很不踏實，看起來程式裡充滿了很多容易出問題的地方。

- [Demo](https://nagachiang.github.io/react-tutorial/)
- [完整專案](https://github.com/NagaChiang/react-tutorial)

## 心得

### 1. 對HTML、CSS和JavaScript有基本認識就很好上手

我並不算是很熟這幾樣技術的人，但只要知道HTML的語法，就可以懂React的JSX在做什麼；JavaScript我也沒有很熟，最近才在鑽研，但只要邊看文件邊寫，一樣可以理解範例中的原理。

### 2. 動態型別讓unit test格外重要

當函式接了一個參數進來，你完全無法認定它是什麼。它可能是`null`或`undefined`，也可能是`number`或`object`，更不會知道它是不是陣列，搞不好還會是個函式。這讓我寫到很怕。然而我目前看到別人的範例，幾乎都是直接認定傳進來的參數，就是這個函式需要的型別，沒有做任何額外處理。

這讓我聯想到，為什麼普遍JavaScript社群中，都很強調unit test coverage。我光是想到，不小心傳錯參數型別，都會讓函式爆開，就覺得一定要跑自動測試，不然超容易不小心把東西改壞。用C++和C#寫遊戲，我都覺得應該要盡可能寫unit test了，JavaScript更讓我覺得這樣做是必要的。

### 3. 需要coding style增加可讀性、避免bug

這個語言太自由了。同樣一個動作，一個宣告，一個函式，可能就有好幾種寫法。

例如函式宣告：

```javascript
// bad
function foo() {

}

// bad
const foo = function() {

}

// good
function foo() {

}

// good
const bar = function foo() {

}
```

雖然說上面幾種宣告方式的意義不盡相同（這裡就省略解釋），但這些都是有效寫法，只是會大大降低可讀性，某些寫法甚至容易出bug。JavaScript是個強大的語言，但看起來寫的人也要有足夠的紀律，不然無法和團隊一同寫出穩健的程式架構。

### 4. 非常強調functional programming

我同意理想中的functional programming寫出的架構，會很容易trace和debug，但同樣的設計概念，放到遊戲程式中就有點難實現。遊戲中需要太多共享的狀態了。

例如，immutable object對遊戲來說，很可能會產生可怕的效能瓶頸，也就是每次想要改變物件中的任何一個值，就要先複製一份新的出來，再把新的值設定進去。這在網頁上或許適合，值得這樣做，但在遊戲中，如果是每次監聽玩家input就要改變一次，那幾乎是每個frame都在做大量的複製。

## 後話

這些都是來自一個JavaScript初學者的心得，很可能是我有什麼誤解才會這樣想，或許某些問題是有方法可以避免的。但最近的經驗，不管是來自自己的練習還是工作上的專案，都讓我很想試試看TypeScript，看能不能改善動態型別產生的問題，又或者是像某些人說的，它帶來的問題比它解決的多。

## 延伸閱讀

- [airbnb/javascript: JavaScript Style Guide](https://github.com/airbnb/javascript)