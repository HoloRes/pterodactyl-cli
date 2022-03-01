import { Command } from '@oclif/core';
import * as inquirer from 'inquirer';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as Rx from 'rxjs';
import { Question } from 'inquirer';

// eslint-disable-next-line max-len
function getConfig(configPath: string, configDir: string): Promise<{ API_KEY: string, URL: string }> {
	return new Promise((resolve) => {
		try {
			if (fs.existsSync(configPath)) {
				resolve(JSON.parse(fs.readFileSync(configPath).toString()));
			} else {
				fs.mkdir(configDir, () => {
					fs.writeFileSync(configPath, JSON.stringify({
						API_KEY: '',
						URL: '',
					}, null, 4));

					resolve(JSON.parse(fs.readFileSync(configPath).toString()));
				});
			}
		} catch {
			fs.mkdir(configDir, () => {
				fs.writeFileSync(configPath, JSON.stringify({
					API_KEY: '',
					URL: '',
				}, null, 4));

				resolve(JSON.parse(fs.readFileSync(configPath).toString()));
			});
		}
	});
}

export default class Config extends Command {
	static description = 'Edit the config';

	static examples = [
		'$ ptero-cli config',
	];

	static flags = {};

	static args = [];

	async run(): Promise<void> {
		const configPath = path.join(this.config.configDir, 'config.json');
		const config = await getConfig(configPath, this.config.configDir);
		if (!config) {
			this.error('Failed to get config, try again');
			this.exit(1);
		}
		const prompts = new Rx.Subject();

		const menu = {
			type: 'list',
			name: 'menu',
			message: 'What do you want to do?',
			choices: [
				{
					name: 'Url',
					value: 'url',
					short: 'Url',
				},
				{
					name: 'API key',
					value: 'apiKey',
					short: 'API key',
				},
				{
					name: 'Quit',
					value: 'quit',
					short: 'Quit',
				},
			],
			loop: false,
		} as Question;
		let menuIndex = 0;

		const prompt = inquirer.prompt(prompts as any);

		prompts.next(menu);

		prompt.ui.process.subscribe(async ({ name, answer }) => {
			if (name.startsWith('menu')) {
				if (answer as string === 'quit') {
					prompts.complete();
				} else if (answer as string === 'url') {
					prompts.next({
						type: 'input',
						name: 'url',
						message: 'What is the endpoint? (Pterodactyl url, without /api)',
					} as Question);
					// eslint-disable-next-line no-plusplus
					prompts.next({ ...menu, name: `menu-${menuIndex++}` });
				} else if (answer as string === 'apiKey') {
					prompts.next({
						type: 'input',
						name: 'apiKey',
						message: 'What is the API key?',
					} as Question);
					// eslint-disable-next-line no-plusplus
					prompts.next({ ...menu, name: `menu-${menuIndex++}` });
				}
			} else if (name === 'url') {
				config.URL = answer as string;
				await fs.writeFileSync(configPath, JSON.stringify(config, null, 4));
			} else if (name === 'apiKey') {
				config.API_KEY = answer as string;
				await fs.writeFileSync(configPath, JSON.stringify(config, null, 4));
			}
		});
	}
}
