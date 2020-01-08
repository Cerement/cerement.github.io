---
title: "Tutorial: Working with Custom Packages in Unity 2019.2"
date: 2020-01-07T23:15:00+08:00
excerpt: "Sharing common functionality and library between projects is always a problem when it comes to Unity projects. Now Unity provides the package manager like npm or those in other fields. This tutorial will guide you creating, developing and sharing custom packages in Unity."
categories:
  - Unity
tags:
  - Unity
  - Package Manager
  - Custom Packages
  - UPM
  - Git
---

## Overview

Sharing common functionality and library between projects is always a problem when it comes to Unity projects. Some may try to use [git submodule combined with symbolic links](https://nagachiang.github.io/share-source-code-between-projects-with-git-submodule-in-unity/), but somehow it seems not a decent solution. Now Unity provides the package manager like [npm](https://www.npmjs.com/) or those in other fields. I believe it's a better way to solve the problem.

This tutorial will guide you creating, developing and sharing custom packages in Unity.

## Version

- Unity 2019.2.0f1
- Package Manager UI 2.2.0

## Creating Custom Packages

The following is the [layout convention](https://docs.unity3d.com/Manual/cus-layout.html) followed by official Unity packages. Note that packages aren't Unity projects on their own. They have to be imported to a project during development, which will be mentioned later in the tutorial.

```
<root>
  ├── package.json
  ├── README.md
  ├── CHANGELOG.md
  ├── LICENSE.md
  ├── Editor
  │   ├── [YourCompanyName].[YourPackageName].Editor.asmdef
  │   └── EditorExample.cs
  ├── Runtime
  │   ├── [YourCompanyName].[YourPackageName].asmdef
  │   └── RuntimeExample.cs
  ├── Tests
  │   ├── Editor
  │   │   ├── [YourCompanyName].[YourPackageName].Editor.Tests.asmdef
  │   │   └── EditorExampleTest.cs
  │   └── Runtime
  │        ├── [YourCompanyName].[YourPackageName].Tests.asmdef
  │        └── RuntimeExampleTest.cs
  └── Documentation~
       └── [YourPackageName].md
```

For example, if the company name is "CoolCompany", package name is "GreatPackage", so the runtime assembly definition (`*.asmdef`) will be named `CoolCompany.GreatPackage.asmdef`.

There are some files we need to create for the custom package later, including `package.json` and `*.asmdef`.

### `package.json`

`package.json` is the package manifest file similar to [npm](https://www.npmjs.com/)'s.

Here is an example. Fill out the fields to suit your package:

```json
{
  "name": "com.unity.example",
  "version": "1.2.3",
  "displayName": "Package Example",
  "description": "This is an example package",
  "unity": "2019.1",
  "unityRelease": "0b5",
  "dependencies": {
    "com.unity.some-package": "1.0.0",
    "com.unity.other-package": "2.0.0"
 },
 "keywords": [
    "keyword1",
    "keyword2",
    "keyword3"
  ],
  "author": {
    "name": "Unity",
    "email": "unity@example.com",
    "url": "https://www.unity3d.com"
  }
}
```

The format of the package `name` is `com.companyname.packagename`.

The value in `version` field must follow [semantic versioning](https://semver.org/) with format `major.minor.patch`; otherwise, it will break the strategy that automation tools use to check the compatibility. `major` is for breaking changes, `minor` is for backward-compatible API changes, and `patch` is about fixes with no API changes. When `major` is 0, it indicates this package isn't stable for production, may includes many breaking changes frequently. The initial version of packages should be `0.1.0`.

Check out the [official documentation](https://docs.unity3d.com/Manual/upm-manifestPkg.html) of `package.json` for more details.

### Assembly Definitions

[Assembly definitions in Unity](https://docs.unity3d.com/Manual/ScriptCompilationAssemblyDefinitionFiles.html) provide a way to seperate your scripts into different assemblies. Each of them acts as a library within the Unity project and has its own dependencies on other assemblies. Unity reduces compilation time by only rebuilding the affected assemblies instead of whole project when you make a change. Unity's package manager fully relies on these assembly definitions. [Here](https://disp.cc/b/253-bY79) is an in-depth guide for assembly definitions in Unity.

The format of assembly definitions is JSON, so you can either edit them in your favorite text editor or in Unity editor's GUI. For now we just create them in text editor. Here are the samples. Replace the company name and package name for your package.

#### CompanyName.PackageName.asmdef

```json
{
    "name": "CompanyName.PackageName"
}
```

#### CompanyName.PackageName.Editor.asmdef

```json
{
    "name": "CompanyName.PackageName.Editor"
}
```

#### CompanyName.PackageName.Tests.asmdef

```json
{
    "name": "CompanyName.PackageName.Tests",
    "references": [
        "CompanyName.PackageName"
    ],
    "includePlatforms": [],
    "excludePlatforms": []
}
```

#### CompanyName.PackageName.Editor.Tests.asmdef

```json
{
    "name": "CompanyName.PackageName.Tests.Editor",
    "references": [
        "CompanyName.PackageName",
        "CompanyName.PackageName.Editor"
    ],
    "includePlatforms": [
        "Editor"
    ],
    "excludePlatforms": []
}
```

## Developing Custom Packages

So far my personally recommended workflow is working on my game project with my custom package imported locally from disk. While I'm making my game, I can continuously add new features to my custom package and push the changes to the git repository. Note that if you imported the package from other than local disk, the package will be a copy of certain version storing in `/Library/PackageCache` in the project.

To import package from disk, open the package manager first, then click the plus icon at top-left corner to select your package.

![](/assets/images/2020-01-07-tutorial-working-with-custom-package-in-unity-2019-2_01.png)

![](/assets/images/2020-01-07-tutorial-working-with-custom-package-in-unity-2019-2_02.png)

## Importing Custom Packages from Git

Currently there is no native support in Unity Editor for importing packages from git. However, you may consider trying out [UPM Git Extension](https://github.com/mob-sakai/UpmGitExtension), a custom package providing several convenient features, like importing certain branch or tag of package. (But the package isn't working properly by the time I'm writing this.)

### Installing Git

First, make sure you have [Git](https://git-scm.com/) installed and the `PATH` system environment variable has included its executable. You can type `git` in the command line to see if it recognizes the command.

### Adding Git URL to Dependencies

Open `/Packages/manifest.json` in your project and add the git URL to the dependencies array.

``` json
{
  "dependencies": {
    "com.mycompany.mypackage": "https://github.com/account/my-package-project.git",
    // Other packages below...
}
```

It will get the `HEAD` of the repository by default. You can specify the branch or tag after the URL.

``` json
{
  "dependencies": {
    "com.mycompany.mypackage": "https://github.com/account/my-package-project.git#develop",
    // Other packages below...
}
```

``` json
{
  "dependencies": {
    "com.mycompany.mypackage": "https://github.com/account/my-package-project.git#v1.2.3",
    // Other packages below...
}
```

Then get back to the Unity editor, you will see the editor is resolving the packages you just add.

### Updating Packages

Once you import the pacakge from git, Unity will add a `lock` field after `dependencies` in `manifest.json` to prevent any unexpected changes to the packages. Either you want to update the package or switch the tag, you have to remove corresponding entry in the `lock` array after editing the URL.

## Custom Package Registries

Unity supports [scoped package registries](https://docs.unity3d.com/Manual/upm-scoped.html) for you to add custom registries other than Unity default ones. I didn't try it myself, just mention it here for anyone interested in.

## References

- [Unity - Manual: Creating custom packages](https://docs.unity3d.com/Manual/CustomPackages.html)
- [UPM: How to make a custom package](https://gist.github.com/LotteMakesStuff/6e02e0ea303030517a071a1c81eb016e)
- [Creating Custom Packages for Unity 2018.3 - neogeek.dev](https://neogeek.dev/creating-custom-packages-for-unity-2018.3/)