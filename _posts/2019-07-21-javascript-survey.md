---
title: "JavaScript探坑心得整理"
date: 2019-07-21T17:21:00+08:00
excerpt: "為了跟上軟體開發的趨勢，覺得自己該來學個JavaScript。在考慮該用什麼姿勢入坑，於是爬了很多文章看別人都怎麼說。"
categories:
  - JavaScript
tags:
  - JavaScript
  - React.js
  - Angular.js
  - Vue.js
  - TypeScript
  - 中文
---

## 前言

為了跟上軟體開發的趨勢，覺得自己該來學個JavaScript。在考慮該用什麼姿勢入坑，於是爬了很多文章看別人都怎麼說。以下大多都不是出自於我的親身心得，只是資訊整理而已。

根據各個framework的流行程度，我比較專注於比較React、Angular和Vue的差異。

## 比較

### React

React是由Facebook開發，擁有完整的開發生態系，可以寫app在Android或iOS上跑，也可以方便的跟後端溝通，也有開發時使用的瀏覽器plugin。由於它的架構非常彈性，有個小問題是，有時候實在不知道要引用哪些React提供的library才適合。但也因為它的良好架構，很適合大專案使用。

### Angular

Angular背後是Google在維護的，React該有的優點它都有，例如寫app、後端溝通和瀏覽器plugin，也適合大專案使用。不同的地方是，Angular在提供功能上比較單純，幾乎都含在裡面了，不需要再去考慮太多引用library的問題。另外，Angular是用TypeScript寫的，雖然也同時支援JavaScript和Dart，但文件上的範例幾乎都只有TypeScript；而且，TypeScript目前的評價算是滿兩極的，這對一些人來說會是很大的痛點。

（這邊講的Angular都是指Angular 2，Angular 1已經不建議使用，跟React沒辦法比了。目前還有在用的，應該都是歷史因素。）

### Vue

Vue其實不能算是一個framework，它只專注在MVC中的view（這也是它命名的由來），是一個library。它一樣可以寫app、跟後端溝通，也有瀏覽器plugin。它很輕量，很容易上手，也可以很快的做出東西。但缺點是架構和功能比較簡略，不適合用在太大的專案上，背後也沒有大公司支持。

### TypeScript

再來多談一下TypeScript。前面提到，目前開發者的觀感是兩極化，稍微整理一下理由如下。

優點：

- 靜態型別有助於大型專案開發，提早發現問題
- 靜態型別增加程式碼的易讀性，不需要去猜測參數型別
- 靜態型別讓一些IDE工具得以運作，例如自動完成

缺點：

- TypeScript還要再過一層transpiler做轉譯，拖慢效能
- 靜態型別無助於API的使用，最後都還是要看文件跟原始碼
- 靜態型別拖慢程式撰寫的速度
- JavaScript本身就是動態型別，硬是要用靜態型別，會讓一些強大的寫法不能使用（聽起來像黑魔法）

## 結語

看下來我應該是會在React和Angular之間選邊站。由於我先前對JavaScript的經驗很零碎，所以我兩個應該都會寫小東西試試看，再來決定要跳哪邊。TypeScript對於我這個之前都寫靜態型別的人來說，超有吸引力，但看了不少人勸退，也是會讓我猶豫，所以試了再說吧。

至於對就業的幫助，國際上的需求統計應該是React贏Angular，而且還在持續成長。至於台灣，我就在104上搜尋台北新北的工作試試看：

- React: 706
- Angular: 452
- Vue: 606
- TypeScript: 118

Vue意外的好多職缺，Angular則是被拋在後面。所以在台灣，學React應該是大勝。但在framework之間的轉換，我想應該不會太困難，不少職缺其實是把React跟Angular並列出來，無從得知進行中的專案使用哪個，看起來團隊也不是很在意，只要有用過任一種就好。

不過說好的做遊戲呢？其實我已經在期待，之後要用Phaser來做HTML5的2D遊戲了，但一步步來吧XD

## 延伸閱讀

- [A Comparison of the Best JavaScript Frameworks for Frontend in 2019](https://hackernoon.com/game-of-frameworks-javascript-trends-of-2019-1a303fa3aaa7)
- [Game of Frameworks: JavaScript trends of 2019](https://rubygarage.org/blog/best-javascript-frameworks-for-front-end)