---
title: "Unity: Showing Tests from Packages in Test Runner"
date: 2021-08-22T17:19:00+08:00
excerpt: "Unless it's an embedded package located in the Packages folder, the tests in packages are not included in the Test Runner by default. To let Test Runner include those tests, we need to add the package in \"testables\" in \"Packages/manifest.json\"."
categories:
- Unity
tags:
- Unity
- Test
- Unit Test
- Test Runner
- Package
---

## Symptoms

Assuming the tests and their assembly definition have been correctly configured, Test Runner still shows no test from my package.

## Solution

Unless it's an [embedded package](https://docs.unity3d.com/Manual/upm-embed.html) located in the `Packages` folder, the tests in packages are not included in the Test Runner by default.

To let Test Runner include those tests, we need to add the package in `testables` in `Packages/manifest.json`.

```
{
  "dependencies": {
    "com.unity.some-package": "1.0.0",
    "com.unity.other-package": "2.0.0",
    "com.unity.yet-another-package": "3.0.0",
  },
  "testables": [
    "com.mycompany.mypackage"
  ]
}
```

In this case, tests in package `com.mycompany.mypackage` will be showed in the Test Runner after the editor refreshes.

## Reference

- [Unity - Manual: Adding tests to a package](https://docs.unity3d.com/2021.2/Documentation/Manual/cus-tests.html)
- [Test Runner not showing any of my tests - Unity Forum](https://forum.unity.com/threads/test-runner-not-showing-any-of-my-tests.619078/#post-5374899)

