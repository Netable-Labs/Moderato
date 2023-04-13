import { type GuildMember } from "discord.js";

// Module Name (required for the Modulesystem)
export const name = "userManager";

function guildMemberAdd(member: GuildMember) {}

// exports all implementations (required to be exported like this to work with the modulesystem)
export const implementation = {
  guildMemberAdd,
};
