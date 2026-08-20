# Renovate configuration for automated Drupal dependency updates.

![GitHub release (latest by date)](https://img.shields.io/github/v/release/drevops/renovate-drupal)
![LICENSE](https://img.shields.io/github/license/drevops/renovate-drupal)
[![CircleCI](https://dl.circleci.com/status-badge/img/gh/drevops/renovate-circleci-drupal-example/tree/main.svg?style=shield)](https://dl.circleci.com/status-badge/redirect/gh/drevops/renovate-circleci-drupal-example/tree/main)
![GitHub Actions](https://github.com/drevops/renovate-drupal/actions/workflows/renovate.yml/badge.svg)

## Features

1. Grouped pull requests for package updates:
   - Daily update schedule for critical Drupal core and related packages created in the `deps/minor-patch-core` branch.
   - Updates for all other packages created in the `deps/minor-patch-contrib` branch on every run.
2. Major updates are skipped so that they can be applied manually.
3. Automatically adds a `dependencies` label to a pull request.
4. Automatically adds assignees to a pull request.
5. Optional configuration for running Renovate self-hosted instance using GitHub Actions.
6. Optional configuration for running Renovate self-hosted instance using CircleCI.

## Installation

Renovate can run as hosted GitHub app or as a standalone self-hosted service in your CI provider (GitHub or CircleCI).

A self-hosted service can be beneficial when your project is restricted in terms of third-party access.

### Hosted GitHub app

1. Copy `renovate.json` to your repository.
2. Follow steps in [the official Renovate docs](https://docs.renovatebot.com/getting-started/installing-onboarding/).

### Self-hosted on GitHub actions

1. Copy `renovate.json` to your repository.
2. Copy `.github/workflows/renovate.yml` to your repository.
3. Create GitHub read/write access token and add it as a value for `RENOVATE_TOKEN` environment variable in GitHub Secrets.

### Self-hosted on CircleCI

1. Copy `renovate.json` to your repository.
2. Copy jobs from `.circleci/config.yml` to your CI config.
   a. Update `RENOVATE_REPOSITORIES` with the name of your repository.
   b. Update cron schedule to run as often as you like (once or twice a day).
3. Create GitHub read/write access token and add it as a value for `RENOVATE_TOKEN` environment variable in CircleCI UI. This is used to submit PRs and update Renovate dashboard issues.
4. Create GitHub read-only access token and add it as a value for `GITHUB_COM_TOKEN` environment variable in CircleCI UI. This is used to overcome GitHub API rate limit when Renovate downloads information about your packages.

Read more about environment variables [Renovate Authentication](https://docs.renovatebot.com/examples/self-hosting/#circleci).

## Testing

Provided `composer.json` and `composer.lock` are used to test Renovate configuration.

Note that in addition to Drupal and Composer packages, we are using 3 custom (empty) packages with specific versions:
- https://github.com/drevops/renovate-example-source
- https://github.com/drevops/renovate-example-source2
- https://github.com/drevops/renovate-example-source3

**Expected minor and patch updates for core**

```
  - drupal/core-composer-scaffold (11.3.2 -> 11.4.5)
  - drupal/core-project-message (11.3.2 -> 11.4.5)
  - drupal/core-recommended (11.3.2 -> 11.4.5)
```

**Expected minor and patch updates for contribs**

```
  - cweagans/composer-patches (1.7.2 -> 1.7.3)
  - drevops/renovate-example-source (1.0.0 -> 1.0.4)
  - drevops/renovate-example-source2 (1.0.0 -> 1.2.0)
  - drupal/coffee (2.0.0 -> 2.0.1)
  - drupal/core-dev (11.3.2 -> 11.4.5)
  - vlucas/phpdotenv (v5.4.1 -> v5.6.4)
```

The target versions above are the latest at the time of writing. Renovate always updates to the latest versions allowed by the constraints.

**Should not update**

```
  - php - updates of the PHP platform requirement are disabled
  - cweagans/composer-patches (1.7.* -> 2.*) - major versions are updated manually
  - drevops/renovate-example-source3 (1.* -> 3.*) - major versions are updated manually
```

## About platform version constraints

RenovateBot assesses 3 places to determine the PHP platform requirements:
1. The `require.php` version value in `composer.json`.
2. The `config.platform` version value in `composer.json`.
3. The `constraints.php` version value in `renovate.json`.

The purpose of `require.php` is to set the minimum PHP language requirements for a package. For example, the minimum version required for Drupal 11 is 8.3, which can be specified as `>=8.3`.

The purpose of `config.platform` is to set the PHP language requirements for the specific instance of the package running in the current environment. For example, while the minimum version required for Drupal 11 is 8.3, the actual PHP version on the hosting provider could be `8.3.19`. The value of this field should provide your exact version of PHP with all 3 parts of the version.

The purpose of `constraints.php` is to set the PHP language requirements for the RenovateBot run, in case the above two values are not set or need to be overridden.

### Which versions to specify in a Drupal site?

It is recommended to specify `require.php` as a _range_ constraint (e.g. `>=8.3`) to ensure it is used as the minimum requirement for project dependencies.

It is also recommended to specify `config.platform` as a _specific version_ (e.g. `8.3.19`) constraint to ensure that only the package versions supported by your current environment are used.

Once the PHP version of your environment is updated, the `config.platform` value should also be updated to the specific version.

It is not recommended to use `constraints.php` in `renovate.json`, as every project may use a different version of PHP. This value should only be used if your Drupal project does not have `require.php` or `config.platform` provided (in which case those values should be provided instead).

## About security advisories

Composer 2.10 and later refuses to resolve package versions affected by known security advisories. A project with an outdated lock file would fail partial `composer update` operations, including the ones Renovate runs to create update pull requests, because the already-locked vulnerable versions are excluded from dependency resolution.

The provided `composer.json` disables this behaviour with the `policy.advisories.block` setting, as this repository deliberately locks outdated versions. On a real project, keep the blocking enabled and update the affected packages instead; disable it only if Renovate pull requests fail to resolve dependencies due to advisories on packages outside of the update.
