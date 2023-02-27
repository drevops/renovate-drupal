# Self-hosted RenovateBot for Drupal

[![CircleCI](https://dl.circleci.com/status-badge/img/gh/drevops/renovate-circleci-drupal-example/tree/main.svg?style=shield)](https://dl.circleci.com/status-badge/redirect/gh/drevops/renovate-circleci-drupal-example/tree/main)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/drevops/renovate-circleci-drupal-example)
![LICENSE](https://img.shields.io/github/license/drevops/renovate-circleci-drupal-example)

## Features
1. CircleCI configuration to run a RenovateBot self-hosted instance (optionally).
2. 2 schedules:
   1. Minor and patch versions for critical Drupal core and related packages to
      run daily raised in `deps/minor-patch-core` branch.
   2. Minor and patch for all other packages to run weekly raised in
      `deps/all-contrib` branch.
2. Add a custom label `dependencies` on PR creation.
3. Add assignees on PR creation.

## Installation

1. Copy jobs from `.circleci/config.yml` to your CI config
2. Create GitHub access token and add it as a value for `RENOVATE_TOKEN` environment variable in CircleCI UI.

## Expected minor and patch updates for core

```
  - drupal/core-composer-scaffold (9.2.0 -> 9.3.13)
  - drupal/core-project-message (9.3.12 -> 9.3.13)
  - drupal/core-recommended	(9.3.12 -> 9.3.13)
```

## Expected minor and patch updates for contribs

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

Should not update

```
  - drush/drush (10.* => 11.*) - Drush updates are excluded
  - drevops/renovate-example-source3 (1.* => 3.*) - Major versions are updated manually
```
