# Jotz

[![Code Climate](https://codeclimate.com/github/jotzio/jotz/badges/gpa.svg)](https://codeclimate.com/github/jotzio/jotz)
[![Circle CI](https://circleci.com/gh/jotzio/jotz/tree/master.svg?style=svg)](https://circleci.com/gh/jotzio/jotz/tree/master)

The definitive notebook for coders

---

## Development Setup

1. make an `atom_shell` directory at project root (`jotz/atom_shell/`)
1. if you don't have the Atom editor:
    - open the Atom.app
    - open the app dropdown menu
    - select install shell commands
1. run `npm install -g jasmine react-tools`
1. `cd` into the `src` directory
1. run `grunt build --scratch`
1. run `grunt watch` and in a separate Terminal window run `grunt boot`

#### Run the application (MacOSX)
From within the `src` directory run:

1. If it's the first time you're building `grunt build --scratch`. Otherwise `grunt build`
2. `grunt boot`

**Run tests with**: `jasmine` or `npm test`


2015 &copy; Omar Alvarez, Raghuvir Kasturi, Clark Feusier, Ryan Leung. All Rights Reserved.
