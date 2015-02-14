# Jotz

[![Code Climate](https://codeclimate.com/github/jotzio/jotz/badges/gpa.svg)](https://codeclimate.com/github/jotzio/jotz)
[![Circle CI](https://circleci.com/gh/jotzio/jotz/tree/master.svg?style=svg)](https://circleci.com/gh/jotzio/jotz/tree/master)

The definitive notebook for coders

---

## Development Setup

1. make sure to delete old `node_modules` and `atom_shell` directories
1. make an `atom_shell` directory at project root (`jotz/atom_shell/`)
1. if you don't have the Atom editor:
    - open the Atom.app
    - open the app dropdown menu
    - select install shell commands
1. `cd` into the `src` directory
1. run `npm install -g jasmine node-gyp`
1. `echo "export ATOM_NODE_VERSION=0.16.0" >> ~/.SHELL_CONFIG_FILE`
2. `source ~/.SHELL_CONFIG_FILE`
1. run `apm install .`
1. run `grunt build --scratch`
1. run `grunt watch` and in a separate Terminal window run `grunt boot`

#### Run the application (MacOSX)
From within the `src` directory run:

1. If it's the first time you're building, or if you have added new dependencies to `package.json`, please see the setup instructions above. Otherwise `grunt build`
2. run `grunt watch` and in a separate Terminal window run `grunt boot`

**Run tests with**: `jasmine` or `npm test` (make sure you're inside the `src` directory)

---

2015 &copy; Omar Alvarez, Raghuvir Kasturi, Clark Feusier, Ryan Leung. All Rights Reserved.
