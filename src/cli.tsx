#!/usr/bin/env node
import 'dotenv/config';
import React from 'react';
import { render } from 'ink';
import meow from 'meow';
import App from './ui';

meow(`
	Usage
	  $ ptero-user-creator
`, {});

render(<App />);
