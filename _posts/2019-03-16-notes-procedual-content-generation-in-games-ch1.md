---
title: "Notes: Procedural Content Generation in Games - Ch1 Introduction"
date: 2019-03-16T16:45:59+08:00
excerpt: "Notes of the chapter 1 of the book Procedural Content Generation in Games by Noor Shaker, Julian Togelius, and Mark J. Nelson."
layout: single
classes: wide
categories:
- PCG
tags:
- PCG
- Notes

---

Notes of chapter 1 of the book [Procedural Content Generation in Games](http://pcgbook.com/) by Noor Shaker, Julian Togelius, and Mark J. Nelson.


## 1.1 What is procedual content generation?

- **PCG** is the algorithmic creation of game **content** with limited or indirect user input.
  - **Content** doesn't include game engine and AI behaviors.

  - **PCG** takes the design, affordances and constraints of the game that it is being generated for into account. It must be playable; therefore, generative art is excluded.

## 1.2 Why use procedural content generation?

- A game development company that could replace some of the artists and designers with algorithms would have a competitive advantage, as games could be produced faster and cheaper while preserving quality.

- If we have software that can generate game content at the speed it is being consumed (played), there is in principle no reason why games need to end.

- The newly generated content can be tailored to the tastes and needs of the player playing the game.

- Creating software that can competently generate game content could help us understand the process by which we "manually" generate the content, and clarify the affordances and constraints of the design problem we are addressing.

## 1.4 Visions for PCG

- **Multi-level, multi-content PCG**: For example, generating coherent quests, characters, items for Skyrim.

- **PCG-based game design**: PCG is an absolutely central part of the gameplay, so that if you took the content generation part away there would not be anything recognisable left of the game. (e.g. Galactic Arms Race)

- **Generating complete games**: Generating rules for different kinds of games.

## 1.5 Desirable properties of a PCG solution

- **Speed**: Depending on whether the content generation is done during gameplay or development.

- **Reliability**: For example, a dungeon with no exit or entrance is a catastrophic failure.

- **Controllability**: A human user or an algorithm can specify some aspects of the content to be generated.

- **Expressivity** and **diversity**: Avoid the content looking like it’s all minor variations on a tired theme.

- **Creativity** and **believability**: We would like our content not to look like it has been designed by a procedural content generator.

## 1.6 A taxonomy of PCG

### 1.6.1 Online/offline

- **Online**: Generate content as the player is playing the game. (e.g. L4D, NERO)

- **Offline**: Generate content during the development of the game or before the start of a game session. (e.g. Forza Motorsport, LittleBigPlanet, Spore)

### 1.6.2 Necessary/optional

- **Necessary**: Content that is required for the completion of the level. (e.g. level structures)

- **Optional**: Content that can be discarded or changed. (e.g. types of weapons, rewards)

### 1.6.3 Degree and dimensions of control

- The use of a random seed is one way to gain control over the generation space; another way is to use a set of parameters that control the content generation along a number of dimensions.

### 1.6.4 Generic/adaptive

- **Generic**: Content is generated without taking player behaviour into account.

- **Adaptive**: Player interaction with the game is analysed and content is created based on a player’s previous behaviour.

### 1.6.5 Stochastic/deterministic

- **Deterministic**: Allows the regeneration of the same content given the same starting point and method parameters.

- **Stochastic**: Recreating the same content is usually not possible.

### 1.6.6 Constructive/generate-and-test

- **Constructive**: The content is generated in one pass.

- **Generate-and-test**: Alternate generating and testing in a loop, repeating until a satisfactory solution is generated.

### 1.6.7 Automatic generation/mixed authorship

- **Mixed authorship**: A human designer or player cooperates with the algorithm to generate the desired content.
