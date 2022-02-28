import { Command } from '@oclif/core';
import axios from 'axios';
import * as inquirer from 'inquirer';
import * as Rx from 'rxjs';
import { Question } from 'inquirer';
import { PterodactylServerResponse } from '../../types/types';

// Default permissions list
const permissionsChoices = [
	{
		name: 'Console',
		value: 'console.console',
		checked: true,
	},
];

export default class AddSubuser extends Command {
	static description = 'Add an subuser to servers in Pterodactyl';

	static examples = [
		'$ ptero-cli subuser add',
	];

	static flags = {};

	static args = [];

	async run(): Promise<void> {
		if (!process.env.URL || process.env.URL === '') {
			this.error('No valid url found in environment, please specify using URL');
			this.exit(1);
		}
		if (!process.env.API_KEY || process.env.API_KEY === '') {
			this.error('No valid token found in environment, please specify using API_KEY');
			this.exit(1);
		}

		const res = await axios.get<PterodactylServerResponse>(`${process.env.URL}/api/client`, {
			headers: {
				Authorization: `Bearer ${process.env.API_KEY}`,
			},
		}).catch(() => {
			this.error('Failed to fetch servers.');
			this.exit(1);
		});

		const servers = res.data.data.map((server) => ({
			id: server.attributes.identifier,
			name: server.attributes.name,
		}));

		const prompts = new Rx.Subject();
		const prompt = inquirer.prompt(prompts as any);

		const emails: string[] = [];
		let selectedServers: string[] = [];
		let permissions: string[] = [];

		prompts.next({
			type: 'checkbox',
			name: 'servers',
			message: 'Select servers to add the user to',
			choices: servers.map((server) => ({
				name: `${server.name} (${server.id})`,
				value: server.id,
				short: server.name,
				checked: true,
			})),
			loop: false,
		} as Question);

		prompts.next({
			type: 'input',
			name: 'email-0',
			message: 'Provide an email address',
			validate: (str: string) => /^(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([\dA-Za-z-]+\.)+[A-Za-z]{2,}))$/.test(str),
		});

		prompts.next({
			type: 'confirm',
			name: 'add-email-0',
			message: 'Do you want to add another email?',
		});

		prompt.ui.process.subscribe({
			next({ name, answer }) {
				if (name.startsWith('email')) {
					emails.push(answer as string);
				} else if (name.startsWith('add-email')) {
					if (answer as boolean) {
						const index = Number.parseInt(name.slice('add-email-'.length), 10) + 1;
						prompts.next({
							type: 'input',
							name: `email-${index}`,
							message: 'Provide an email address',
							validate: (str: string) => /^(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([\dA-Za-z-]+\.)+[A-Za-z]{2,}))$/.test(str),
						});

						prompts.next({
							type: 'confirm',
							name: `add-email-${index}`,
							message: 'Do you want to add another email?',
						});
					} else {
						prompts.next({
							type: 'checkbox',
							name: 'permissions',
							message: 'Select the permissions',
							choices: permissionsChoices,
							loop: false,
						});
						prompts.next({
							type: 'confirm',
							name: 'confirm',
							message: 'Is everything correct?',
						});
						prompts.complete();
					}
				} else if (name === 'servers') {
					selectedServers = answer as string[];
				} else if (name === 'permissions') {
					permissions = answer as string[];
				}
			},
			complete() {
				console.log(selectedServers);
				console.log(emails);
				console.log(permissions);
			},
		});
	}
}
