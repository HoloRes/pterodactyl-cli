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
$ npm install -g ptero-cli
$ ptero-cli COMMAND
running command...
$ ptero-cli (--version)
ptero-cli/0.0.0 linux-x64 node-v16.6.1
$ ptero-cli --help [COMMAND]
USAGE
  $ ptero-cli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`ptero-cli help [COMMAND]`](#ptero-cli-help-command)
* [`ptero-cli plugins`](#ptero-cli-plugins)
* [`ptero-cli plugins:inspect PLUGIN...`](#ptero-cli-pluginsinspect-plugin)
* [`ptero-cli plugins:install PLUGIN...`](#ptero-cli-pluginsinstall-plugin)
* [`ptero-cli plugins:link PLUGIN`](#ptero-cli-pluginslink-plugin)
* [`ptero-cli plugins:uninstall PLUGIN...`](#ptero-cli-pluginsuninstall-plugin)
* [`ptero-cli plugins update`](#ptero-cli-plugins-update)

## `ptero-cli help [COMMAND]`

Display help for ptero-cli.

```
USAGE
  $ ptero-cli help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for ptero-cli.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.11/src/commands/help.ts)_

## `ptero-cli plugins`

List installed plugins.

```
USAGE
  $ ptero-cli plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ ptero-cli plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.1.0/src/commands/plugins/index.ts)_

## `ptero-cli plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ ptero-cli plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ ptero-cli plugins:inspect myplugin
```

## `ptero-cli plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ ptero-cli plugins:install PLUGIN...

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
  $ ptero-cli plugins add

EXAMPLES
  $ ptero-cli plugins:install myplugin 

  $ ptero-cli plugins:install https://github.com/someuser/someplugin

  $ ptero-cli plugins:install someuser/someplugin
```

## `ptero-cli plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ ptero-cli plugins:link PLUGIN

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
  $ ptero-cli plugins:link myplugin
```

## `ptero-cli plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ ptero-cli plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ ptero-cli plugins unlink
  $ ptero-cli plugins remove
```

## `ptero-cli plugins update`

Update installed plugins.

```
USAGE
  $ ptero-cli plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
