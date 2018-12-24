# Development Guide

## Environment Setup

- [VSCode Prettier plugin](https://github.com/prettier/prettier-vscode)
- [VSCode ESLint plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## GitHub

- Branch naming format
  - `<developer-name>/<feature|bugfix|hotfix|etc...>/<change-name>`
  - e.g. roman/feature/transactions.add-progress-scene
- Commit name
  - Format `:star: [Feature Name] Changes`
  - No period at the end
  - Add emoji following the [gitmoji guide](https://gitmoji.carloscuesta.me/)
- PR management
  - Do not merge until all feedback is addressed
  - Assign PRs to those who need to take a look at them. Not just add them as reviewers.
  - Use `has dependency` label
    - if some other PR needs to be merged before this one
    - put dependant PR link in description
  - Put R&D section in description
  - Use `wip` label
    - for work-in-progress

## Dev process

- Always start with a short mini-architecture for the feature you're working on
  - [Template](https://github.com/pumpupapp/code/blob/master/Architecture/Template.md)
  - Omit sections that are not relevant
  - Put the arch in PR description or under docs
