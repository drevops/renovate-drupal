Object.assign(process.env, {
    GIT_AUTHOR_NAME: 'RenovateBot Self Hosted',
    GIT_AUTHOR_EMAIL: 'renovatebot@drevops.com',
    GIT_COMMITTER_NAME: 'RenovateBot Self Hosted',
    GIT_COMMITTER_EMAIL: 'renovatebot@drevops.com',
});

module.exports = {
    platform: 'github',
    repositories: [
        "drevops/renovate-circleci-drupal-example"
    ],
    "branchPrefix": "deps/",
    "labels": ["dependencies", "Dependencies"],
    "assignees": [
        "AlexSkrypnyk"
    ],
    "ignorePresets": [":prHourlyLimit2"],
    "rangeStrategy": "update-lockfile",
    "packageRules": [
        {
            "groupName": "Minor and Patch Core",
            "groupSlug": "minor-patch-core",
            "schedule": ["before 2am"],
            "matchDatasources": ["packagist"],
            "matchUpdateTypes": ["patch", "minor"],
            "matchPackageNames": [
                "drupal/core-composer-scaffold",
                "drupal/core-project-message",
                "drupal/core-recommended"
            ]
        },
        {
            "groupName": "Major Core - skipped to update manually",
            "matchDatasources": ["packagist"],
            "matchUpdateTypes": ["major"],
            "matchPackageNames": [
                "drupal/core-composer-scaffold",
                "drupal/core-project-message",
                "drupal/core-recommended"
            ],
            "enabled": false
        },
        {
            "groupName": "All Contrib",
            "groupSlug": "all-contrib",
            "schedule": ["every weekend"],
            "matchDatasources": ["packagist"],
            "separateMajorMinor": false,
            "matchPackagePatterns": [".*"],
            "excludePackageNames": [
                "drupal/core-composer-scaffold",
                "drupal/core-project-message",
                "drupal/core-recommended"
            ]
        }
    ]
};
