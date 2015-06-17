# Jotz
#### The definitive notebook for coders. 

Jotz is the first cross-platform and open-source notebook application. The built in code-editor supports 140+ programing languages, designed for taking notes in rich text and formatted code within the a single document. No more force-formatting code! You can organize your notes into Notebooks, and full-text search makes note retrieval quick and painless. The app is also integrated with Github for backing up your notes and publishing gists. 

JotZ is written in Javascript, HTML, and SASS, using [Electron](https://github.com/atom/electron) (formerly Atom-Shell),  [ReactJS](http://facebook.github.io/react/), [BackboneJS](https://backbonejs.org), and [Flux](https://facebook.github.io/flux/).

[![Code Climate](https://codeclimate.com/github/jotzio/jotz/badges/gpa.svg)](https://codeclimate.com/github/jotzio/jotz)

## Download

Get the application for Mac and Windows [here](jotzio.github.io/jotz)

---

## Development Setup

**Note: Node version 0.10.36 is required for development. Node 0.11.x and above are NOT supported at this stage**

1. make sure to delete old `node_modules` and `atom_shell` directories
1. make an `atom_shell` directory at project root (`jotz/atom_shell/`)
1. if you don't have the Atom editor:
    - open the Atom.app
    - open the app dropdown menu
    - select install shell commands
1. run `npm install -g node-gyp`
1. `echo "export ATOM_NODE_VERSION=0.16.0" >> ~/.SHELL_CONFIG_FILE`
2. `source ~/.SHELL_CONFIG_FILE`
1. `cd` into the `src` directory
1. run `apm install .`
1. run `grunt build --scratch`
1. run `grunt watch` and in a separate Terminal window run `grunt boot`

#### Run the application (MacOSX)
From within the `src` directory run:

1. If it's the first time you're building, or if you have added new dependencies to `package.json`, please see the setup instructions above. Otherwise `grunt build`
2. run `grunt watch` and in a separate Terminal window run `grunt boot`

**Run tests with**: `npm test` (make sure you're inside the `src` directory)

---

2015 &copy; Omar Alvarez, Raghuvir Kasturi, Clark Feusier, Ryan Leung. All Rights Reserved.
