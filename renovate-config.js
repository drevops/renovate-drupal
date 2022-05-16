Object.assign(process.env, {
    GIT_AUTHOR_NAME: 'RenovateBot Self Hosted',
    GIT_AUTHOR_EMAIL: 'renovatebot@drevops.com',
    GIT_COMMITTER_NAME: 'RenovateBot Self Hosted',
    GIT_COMMITTER_EMAIL: 'renovatebot@drevops.com',
});

module.exports = {
    dependencyDashboardTitle: 'Dependency Dashboard self-hosted',
    platform: 'github',
    repositories: [
        "drevops/renovate-circleci-drupal-example"
    ]
};
