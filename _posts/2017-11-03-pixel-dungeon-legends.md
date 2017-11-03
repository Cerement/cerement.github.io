--- title: "Pixel Dungeon: Legends"
date: 2017-11-03T17:32:06+08:00
categories:
- Game Mod
tags:
- Game Mod
- Pixel Dungeon
- Roguelike
- Android
header:
 teaser: /assets/images/PixelDungeonLegends.png
 og_image: /assets/images/PixelDungeonLegends.png
---

<p style="text-align: center;"><img src="/assets/images/PixelDungeonLegends_0.png" /></p>
<p style="text-align: center;"><a href="https://github.com/Nagachiang/pixel-dungeon-legends/releases/" target="_blank">Download the Apk (Android)</a></p>

## Overview

Pixel Dungeon: Legends is a roguelike game mod based on [Pixel Dungeon 1.7.5a](http://pixeldungeon.watabou.ru/), which is open-sourced with GPLv3 by Watabou. It's developed with Java and Android SDK.

Players who play games of this genre for the first time may die often and feel frustrating. However, even it feels like everything is based on luck, there are some tricks to help you beat the game, once you play more and get used to it. If you get stuck on something, you can check out [the Wiki of the original Pixel Dungeon](http://pixeldungeon.wikia.com/wiki/Main_Page).

This mod is aimed at the diversity of items' usages - there shouldn't be a only one reasonable usage of a certain item. For example, the seeds are not just for planting or brewing in this mod, they can also be eaten to gain some special buffs/debuffs. This feature would make players to consider more for every possible situations.

There are some promotions and discussions of this mod on [Reddit](https://www.reddit.com/r/PixelDungeon/comments/3dy8wj/pixel_dungeon_legends_v02a_no_degradation_seeds/) and [Wiki](http://pixeldungeon.wikia.com/wiki/Thread:29199).

The mod is currently unavalible on Google Play. It was suspended. For more information, please check out the last section.

## Features

### Removing the Degradation of Items

In the original version, if the durability of a upgradable item is reduced to zero, it would degrade. To avoid this, player could upgrade an item once in a while instead of stacking tons of scrolls of upgrade to apply at once, because upgrading an item would also recover its durability to the fullest. However, this process is extremely dread without any interesting strategy. After reading the comments from community, I thought remove it would be better.

### Chance of Failed Upgrading

The reason why the author added degradation is, he/she wanted to resolve the problem that there was only one simple strategy to use the scrolls of upgrade - stacking them and apply them all at once. While removing the degradation, I added the chance of fail upgrading. The chance of fail was set as `(ItemLevel + 1)/(ItemLevel + 6)`. The curve of failing chance is showed at the chart below. As a result, player must take a risk to upgrade a item with very high level.

<p style="text-align: center;"><img src="/assets/images/PixelDungeonLegends_Chart.jpg" /></p>

### 7 Edible Seeds

Now all the seeds could be eaten to gain some special buffs/debuffs.

|Seed|Effects|
|:-|:-|
|Dreamweed|Movement Speed x2 (5 turns)|
|Earthroot|Hunger +25%, Paralysis (5 turns)|
|Fadeleaf|Invisible (5 turns)|
|Firebloom|HP -20%, Damage of Next Hit x2 (stackable)|
|Icecap|Gases Immunity (3 turns)|
|Sorrowmoss|Weakness (5 turns), MindVision (5 turns)|
|Sungrass|Remove All Debuff, Light (50 turns)|

## Changelog

v0.2c

- Fix a bug about enchantment "unstable" would cause crash

v0.2b

- Fix several bugs
- Add new icon for Speed buff

v0.2a

- Change to red title to fit [the modding guideline from Reddit](https://www.reddit.com/r/PixelDungeon/wiki/rules)

v0.2

- Remove degradation of items
- Add edible seeds with various effects
- Add chance of failed upgrading - higher-level items are more likely to fail
- Change the tone of colors of icons and banners

## Suspended by Google Play

One day, I got an email from Google Play. It said my mod was suspended.

> REASON FOR SUSPENSION: Your app is in violation of the intellectual property and impersonation or deceptive behavior provisions of the Content Policy.

I thought it should be wrong. Then, I tried to appeal for reinstatement. I explained that this is a mod, not a piracy or something to make profit. [The link to original source code on Github](https://github.com/watabou/pixel-dungeon) was also included. And I described the new features of this mod in the email. After a few hours, I received the reply which said my appealment was not accepted.

> After further review, we’re unable to reinstate your app as it looks to be the same as an app that’s live on Google Play.

And I appealed again because my mod was not the same as the original. The content of this appealment was almost like something I had said last time, excepting I strongly claimed this mod had some new features just like other existing mods on Google Play. But the reply for this time still didn't make any further.

> We have reviewed your appeal and will not be reinstating your app. This decision is final and we will not be responding to any additional emails regarding this removal.
> 
> [...]
> 
> Be advised that any perceived compliance or non-compliance of other developers’ apps has no bearing on the compliance of your own apps.
> 
> [...]
> 
> Please note that additional violations may result in a suspension of your Google Play Developer account.

Afterward, I asked for some helps on Reddit. I just realized that there were many modders who had encountered this situation. Some of them made their mod reinstated, while some were not. Concluding all the experiences from other modders, I thought I could do something more next time to avoid suspension:

- Name your mod as something like **Legendary Pixel Dungeon** instead of **Pixel Dungeon: Legends**
- Change some colors and sprites of UI, because Google Play won't review your mod by playing
- Make more features and describe them clearly

