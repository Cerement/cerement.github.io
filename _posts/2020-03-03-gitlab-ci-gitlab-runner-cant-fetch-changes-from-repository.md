---
title: "Gitlab CI: Gitlab Runner Can't Fetch Changes from Repository"
date: 2020-03-03T16:29:00+08:00
excerpt: "Resolve Gitlab Runner fetching changes problem by setting clone_url in config.toml."
categories:
- Gitlab CI
tags:
- Gitlab CI
- Gitlab
- Gitlab Runner
- DevOps
- CI
- CD
- Git
---

## Symptoms

Gitlab Runner can't fetch changes from repository while running jobs:

```
Fetching changes with git depth set to 50...
Reinitialized existing Git repository in /builds/root/unity-ci-test/.git/
fatal: unable to access 'http://gitlab.example.com/root/unity-ci-test.git/': Could not resolve host: gitlab.example.com
ERROR: Job failed: exit code 1
```

## Environment

- Gitlab CE 12.7.6
- Gitlab Runner 12.7.1

## Solution

For some reason, such as firewall setup, the runner can't reach the Gitlab's exposed URL. You need to set a reachable `clone_url` in Gitlab Runner's `config.toml`.

For example:

```
[[runners]]
  name = "test-runner"
  url = "https://gitlab.example.com"
  token = "PzgMxRCqfHiNiPJyLQRC"
  executor = "docker"
  clone_url = "http://192.168.1.23"
```

## Reference

- [Advanced configuration | GitLab](https://docs.gitlab.com/runner/configuration/advanced-configuration.html#how-clone_url-works)

