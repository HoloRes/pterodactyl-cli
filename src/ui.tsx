import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Text } from 'ink';
import { Tabs, Tab } from 'ink-tab';
import MultiSelect, { ListedItem, SelectedItem } from 'ink-multi-select';
import { PterodactylServerResponse, Server } from './types';

export default function App() {
	const [servers, setServers] = useState<Server[]>([]);
	const [selectedServers, setSelectedServers] = useState<SelectedItem[]>([]);
	// const [emails, setEmails] = useState<string[]>([]);
	const [error, setError] = useState<null | string>(null);
	const [activeTabName, setActiveTabName] = useState<null | string>(null);

	useEffect(() => {
		if (!process.env['URL'] || process.env['URL'] === '') {
			setError('No valid url found in environment, please specify using URL');
			return;
		}
		if (!process.env['API_KEY'] || process.env['API_KEY'] === '') {
			setError('No valid token found in environment, please specify using API_KEY');
			return;
		}
		axios.get<PterodactylServerResponse>(`${process.env['URL']}/api/client`, {
			headers: {
				Authorization: `Bearer ${process.env['API_KEY']}`,
			},
		}).then((res) => {
			const newServers = res.data.data.map((server) => ({
				id: server.attributes.identifier,
				name: server.attributes.name,
			}));
			setServers(newServers);
			setSelectedServers(servers.map((server) => ({ label: `${server.name} (${server.id})`, value: server.id } as SelectedItem)));
		}).catch(() => {
			setError('Failed to fetch servers');
		});
	}, []);

	if (error) {
		return <Text color="red">{error}</Text>;
	}

	return (
		<Box flexDirection="column">
			<Tabs onChange={(name) => setActiveTabName(name)}>
				<Tab name="servers">Servers</Tab>
				<Tab name="emails">Emails</Tab>
				<Tab name="permissions">Permissions</Tab>
			</Tabs>

			{activeTabName === 'servers' && (
				<Box>
					<MultiSelect
						items={servers.map((server) => ({ label: `${server.name} (${server.id})`, value: server.id } as ListedItem))}
						selected={selectedServers}
						onSelect={(item) => setSelectedServers([...selectedServers, item])}
						onUnselect={(item) => {
							const newSelected = [...selectedServers];
							newSelected.splice(newSelected.findIndex((server) => server.value === item.value), 1);
							setSelectedServers(newSelected);
						}}
					/>
				</Box>
			)}
		</Box>
	);
}
