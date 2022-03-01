// Internal types
export interface Server {
	name: string;
	id: string;
}

// Pterodactyl types, only lists required properties
interface PterodactylServer {
	attributes: {
		identifier: string;
		name: string;
	}
}

export interface PterodactylServerResponse {
	data: PterodactylServer[];
}

interface PterodactylSubuser {
	attributes: {
		uuid: string;
		email: string;
	}
}

export interface PterodactylSubuserResponse {
	data: PterodactylSubuser[]
}
