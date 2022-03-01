import { Command } from '@oclif/core';
import axios from 'axios';
import * as inquirer from 'inquirer';
import * as Rx from 'rxjs';
import * as path from 'node:path';
import * as fs from 'node:fs';
import { Question } from 'inquirer';
import { PterodactylServerResponse, PterodactylSubuserResponse } from '../../types/pterodactyl';

// Default permissions list
const permissionsChoices = [
	new inquirer.Separator('--- Control ---'),
	{
		name: 'Console',
		value: 'control.console',
		checked: true,
	},
	{
		name: 'Start server',
		value: 'control.start',
		checked: true,
	},
	{
		name: 'Stop server',
		value: 'control.stop',
		checked: true,
	},
	{
		name: 'Restart server',
		value: 'control.restart',
		checked: true,
	},
	new inquirer.Separator('--- Subusers ---'),
	{
		name: 'Create',
		value: 'user.create',
	},
	{
		name: 'Read',
		value: 'user.read',
	},
	{
		name: 'Update',
		value: 'user.update',
	},
	{
		name: 'Delete',
		value: 'user.delete',
	},
	new inquirer.Separator('--- Files ---'),
	{
		name: 'Create',
		value: 'file.create',
		checked: true,
	},
	{
		name: 'Read',
		value: 'file.read',
		checked: true,
	},
	{
		name: 'Read content',
		value: 'file.read-content',
		checked: true,
	},
	{
		name: 'Update',
		value: 'file.update',
		checked: true,
	},
	{
		name: 'Delete',
		value: 'file.delete',
		checked: true,
	},
	{
		name: 'Archive',
		value: 'file.archive',
		checked: true,
	},
	{
		name: 'SFTP',
		value: 'file.sftp',
	},
	new inquirer.Separator('--- Backup ---'),
	{
		name: 'Create',
		value: 'backup.create',
		checked: true,
	},
	{
		name: 'Read',
		value: 'backup.read',
		checked: true,
	},
	{
		name: 'Delete',
		value: 'backup.delete',
		checked: true,
	},
	{
		name: 'Download',
		value: 'backup.download',
		checked: true,
	},
	{
		name: 'Restore',
		value: 'backup.restore',
		checked: true,
	},
	new inquirer.Separator('--- Allocations ---'),
	{
		name: 'Read',
		value: 'allocation.read',
		checked: true,
	},
	{
		name: 'Create',
		value: 'allocation.create',
	},
	{
		name: 'Update',
		value: 'allocation.update',
	},
	{
		name: 'Delete',
		value: 'allocation.delete',
	},
	new inquirer.Separator('--- Startup ---'),
	{
		name: 'Read',
		value: 'startup.read',
		checked: true,
	},
	{
		name: 'Update',
		value: 'startup.update',
	},
	{
		name: 'Docker image',
		value: 'startup.docker-image',
	},
	new inquirer.Separator('--- Database ---'),
	{
		name: 'Create',
		value: 'database.create',
		checked: true,
	},
	{
		name: 'Read',
		value: 'database.read',
		checked: true,
	},
	{
		name: 'Update',
		value: 'database.update',
		checked: true,
	},
	{
		name: 'Delete',
		value: 'database.delete',
		checked: true,
	},
	{
		name: 'View password',
		value: 'database.view_password',
		checked: true,
	},
	new inquirer.Separator('--- Schedule ---'),
	{
		name: 'Create',
		value: 'schedule.create',
		checked: true,
	},
	{
		name: 'Read',
		value: 'schedule.read',
		checked: true,
	},
	{
		name: 'Update',
		value: 'schedule.update',
		checked: true,
	},
	{
		name: 'Delete',
		value: 'schedule.delete',
		checked: true,
	},
	new inquirer.Separator('--- Settings ---'),
	{
		name: 'Rename',
		value: 'settings.rename',
	},
	{
		name: 'Reinstall',
		value: 'settings.reinstall',
	},
];

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

export default class AddSubuser extends Command {
	static description = 'Add an subuser to servers in Pterodactyl';

	static examples = [
		'$ ptero-cli subuser add',
	];

	static flags = {};

	static args = [];

	async run(): Promise<void> {
		const configPath = path.join(this.config.configDir, 'config.json');
		const config = await getConfig(configPath, this.config.configDir);

		if (!config.URL || config.URL === '') {
			this.error('No valid url found in environment, please specify using URL');
			this.exit(1);
		}
		if (!config.API_KEY || config.API_KEY === '') {
			this.error('No valid token found in environment, please specify using API_KEY');
			this.exit(1);
		}

		const res = await axios.get<PterodactylServerResponse>(`${config.URL}/api/client`, {
			headers: {
				Authorization: `Bearer ${config.API_KEY}`,
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
			default: false,
		});

		// eslint-disable-next-line unicorn/consistent-function-scoping
		const postError = () => {
			this.error('Failed to create subuser');
			this.exit(1);
		};

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
							default: false,
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
							default: false,
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
				// eslint-disable-next-line no-restricted-syntax
				for (const server of selectedServers) {
					axios.get<PterodactylSubuserResponse>(`${config.URL}/api/client/servers/${server}/users`, {
						headers: {
							Authorization: `Bearer ${config.API_KEY}`,
						},
						// eslint-disable-next-line @typescript-eslint/no-loop-func
					}).then((subuserRes) => {
						// eslint-disable-next-line no-restricted-syntax
						for (const email of emails) {
							// eslint-disable-next-line max-len
							const index = subuserRes.data.data.findIndex((user) => user.attributes.email === email);
							if (index !== -1) {
								const { uuid } = subuserRes.data.data[index].attributes;

								axios.post(`${config.URL}/api/client/servers/${server}/users/${uuid}`, {
									permissions: [...permissions, 'websocket.connect'],
								}, {
									headers: {
										Authorization: `Bearer ${config.API_KEY}`,
									},
								}).catch(postError);
							} else {
								axios.post(`${config.URL}/api/client/servers/${server}/users`, {
									email,
									permissions: [...permissions, 'websocket.connect'],
								}, {
									headers: {
										Authorization: `Bearer ${config.API_KEY}`,
									},
								}).catch(postError);
							}
						}
					});
				}
			},
		});
	}
}
