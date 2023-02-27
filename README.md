# Self-hosted RenovateBot for Drupal

[![CircleCI](https://dl.circleci.com/status-badge/img/gh/drevops/renovate-circleci-drupal-example/tree/main.svg?style=shield)](https://dl.circleci.com/status-badge/redirect/gh/drevops/renovate-circleci-drupal-example/tree/main)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/drevops/renovate-drupal-example)
![LICENSE](https://img.shields.io/github/license/drevops/renovate-drupal-example)

## Features
1. 2 schedules:
   1. Minor and patch versions for critical Drupal core and related packages to
      run daily raised in `deps/minor-patch-core` branch.
   2. Minor and patch for all other packages to run weekly raised in
      `deps/all-contrib` branch.
2. Add a custom label `dependencies` on PR creation.
3. Add assignees on PR creation.
4. GitHub Action configuration to run a RenovateBot self-hosted instance (optionally).
5. CircleCI configuration to run a RenovateBot self-hosted instance (optionally).

## Installation

Renovate can run as hosted GitHub app or as a standalone service in your CI provider.

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
   b. Update cron schedule to run as often as you like (once or twise a day).
3. Create GitHub read/write access token and add it as a value for `RENOVATE_TOKEN` environment variable in CircleCI UI. This is used to submit PRs and update Renovate dashboard issues.
4. Create GitHub read-only access token and add it as a value for `GITHUB_COM_TOKEN` environment variable in CircleCI UI. This is used to overcome GitHub API rate limit when Renovate downloads information aboout your packages.

Read more about environment variables [Renovate Authentication](https://docs.renovatebot.com/examples/self-hosting/#circleci).

## Testing

Provided `composer.json` and `composer.lock` are used to test Renovates configuration.

Note that in addition to Drupal and Composer packages, we are using 3 custom (empty) packages with specific versions:
- https://github.com/drevops/renovate-example-source1
- https://github.com/drevops/renovate-example-source2
- https://github.com/drevops/renovate-example-source3

**Expected minor and patch updates for core**

```
  - drupal/core-composer-scaffold (9.2.0 -> 9.3.13)
  - drupal/core-project-message (9.3.12 -> 9.3.13)
  - drupal/core-recommended	(9.3.12 -> 9.3.13)
```

**Expected minor and patch updates for contribs**

```
  - drevops/renovate-example-source (1.0.0 => 1.0.4)
  - drevops/renovate-example-source2 (1.0.0 => 1.2.0)
  - drupal/coffee (1.0.0 => 1.2.0)
  - drupal/core-dev	(9.3.12 -> 9.3.13)
  - drupal/core-composer-scaffold (9.2.0 => 9.3.12)
  - vlucas/phpdotenv (v5.0.0 => v5.4.1)
  - drupal/core-composer-scaffold (9.2.0 => 9.3.12)
  - drevops/renovate-example-source (1.0.0 => 1.0.4)
  - drevops/renovate-example-source2 (1.0.0 => 1.2.0)
  - drupal/coffee (1.0.0 => 1.2.0)
  - vlucas/phpdotenv (v5.0.0 => v5.4.1)
```

**Should not update**

```
  - drush/drush (10.* => 11.*) - Drush updates are excluded
  - drevops/renovate-example-source3 (1.* => 3.*) - Major versions are updated manually
```
