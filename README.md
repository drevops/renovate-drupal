# Example to run RenovateBot for Drupal project as a self-hosted instance in CircleCI.

## Features
1. CircleCI configuration to run a RenovateBot self-hosted instance (optionally).
2. 2 schedules: 
   1. Minor and patch versions for critical Drupal core and related packages to 
      run daily raised in `deps/minor-patch-core` branch.
   2. All versions for all other packages to run weekly raised in 
      `deps/all-contrib` branch.
2. Add a custom label `dependencies` on PR creation.
3. Add assignees on PR creation.

## Expected minor and patch updates for core

```
  - drupal/core-composer-scaffold (9.2.0 -> 9.3.13)
  - drupal/core-project-message (9.3.12 -> 9.3.13)
  - drupal/core-recommended	(9.3.12 -> 9.3.13)
```

## Expected major, minor and patch updates for contribs

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
  - drush/drush (10.* => 11.*)
  - drevops/renovate-example-source3 (1.* => 3.*)
```
