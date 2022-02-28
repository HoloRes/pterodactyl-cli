oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g ptero-add-subuser
$ ptero-add-subuser COMMAND
running command...
$ ptero-add-subuser (--version)
ptero-add-subuser/0.0.0 linux-x64 node-v16.14.0
$ ptero-add-subuser --help [COMMAND]
USAGE
  $ ptero-add-subuser COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`ptero-add-subuser hello PERSON`](#ptero-add-subuser-hello-person)
* [`ptero-add-subuser hello world`](#ptero-add-subuser-hello-world)
* [`ptero-add-subuser help [COMMAND]`](#ptero-add-subuser-help-command)
* [`ptero-add-subuser plugins`](#ptero-add-subuser-plugins)
* [`ptero-add-subuser plugins:inspect PLUGIN...`](#ptero-add-subuser-pluginsinspect-plugin)
* [`ptero-add-subuser plugins:install PLUGIN...`](#ptero-add-subuser-pluginsinstall-plugin)
* [`ptero-add-subuser plugins:link PLUGIN`](#ptero-add-subuser-pluginslink-plugin)
* [`ptero-add-subuser plugins:uninstall PLUGIN...`](#ptero-add-subuser-pluginsuninstall-plugin)
* [`ptero-add-subuser plugins update`](#ptero-add-subuser-plugins-update)

## `ptero-add-subuser hello PERSON`

Say hello

```
USAGE
  $ ptero-add-subuser hello [PERSON] -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Whom is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/HoloRes/pterodactyl-subuser-add-cli/blob/v0.0.0/dist/commands/hello/index.ts)_

## `ptero-add-subuser hello world`

Say hello world

```
USAGE
  $ ptero-add-subuser hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ oex hello world
  hello world! (./src/commands/hello/add.ts)
```

## `ptero-add-subuser help [COMMAND]`

Display help for ptero-add-subuser.

```
USAGE
  $ ptero-add-subuser help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for ptero-add-subuser.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.11/src/commands/help.ts)_

## `ptero-add-subuser plugins`

List installed plugins.

```
USAGE
  $ ptero-add-subuser plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ ptero-add-subuser plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/index.ts)_

## `ptero-add-subuser plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ ptero-add-subuser plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ ptero-add-subuser plugins:inspect myplugin
```

## `ptero-add-subuser plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ ptero-add-subuser plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ ptero-add-subuser plugins add

EXAMPLES
  $ ptero-add-subuser plugins:install myplugin 

  $ ptero-add-subuser plugins:install https://github.com/someuser/someplugin

  $ ptero-add-subuser plugins:install someuser/someplugin
```

## `ptero-add-subuser plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ ptero-add-subuser plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLES
  $ ptero-add-subuser plugins:link myplugin
```

## `ptero-add-subuser plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ ptero-add-subuser plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ ptero-add-subuser plugins unlink
  $ ptero-add-subuser plugins remove
```

## `ptero-add-subuser plugins update`

Update installed plugins.

```
USAGE
  $ ptero-add-subuser plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
