import { Client, EmbedBuilder } from "discord.js";
import { basic } from "./intents";

// Creates a new Discord Client and exports it. (to be sure it is only invoked once)
export const DiscordClient = new Client({ intents: basic });

export function createWarningEmbed(messageContent: string) {
  return new EmbedBuilder()
    .setColor("Yellow")
    .setTitle("Warning")
    .setDescription(messageContent);
}
