interface CommandsData {
	aliases: string[],
	name: string,
	description: string,
	cooldown: number,
	args: boolean,
	execute: (message: any, args: any, client: any) => void,
	usage: string,
}

export type { CommandsData };