# Contributing

## General Workflow

1. Fork the repo
1. Cut namespaced feature branch with initials from master
  - FL_bug/...
  - FL_feat/...
  - FL_test/...
  - FL_doc/...
  - FL_refactor/...
1. Make commits to your feature branch (only make changes that are relevant to this branch)
  - commit messages should start with a capital letter
  - commit messages should be in the present tense
  - commit messages should not end with a '.'
1. When you've finished with your fix or feature:
  - `git fetch upstream master`
  - `git rebase upstream/master`
  - submit a [pull request] directly to master. Include a description of your changes.
1. Your pull request will be reviewed by another maintainer. The point of code
   reviews is to help keep the codebase clean and of high quality.
1. Fix any issues raised by your code reviewer, and push your fixes as a single
   new commit.
1. Once the pull request has been reviewed, it will be merged by another member of the team. Do not merge your own pull requests.

Thanks for contributing!

### Guidelines

1. Uphold the current code standard:
    - Keep your code DRY.
    - Apply the boy scout rule.
    - Follow [STYLEGUIDE.md](STYLEGUIDE.md)
1. Run the tests before submitting a pull request.
1. Tests are very, very important. Submit tests if your pull request contains
   new, testable behavior.
1. Your pull request is comprised of a single (squashed) commit.

## Checklist:

This is just to help you organize your process

- Did I cut my work branch off of master (don't cut new branches from existing feature branches)?
- Did I follow the correct naming convention for my branch?
- Is my branch focused on a single main change?
  - Do all of my changes directly relate to this change?
- Did I rebase the upstream master branch after I finished all my
  work?
- Did I write a clear pull request message detailing what changes I made?
- Did I get a code review?
  - Did I make any requested changes from that code review?

If you follow all of these guidelines and make good changes, you should have
no problem getting your changes merged in.