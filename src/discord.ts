import { Client } from "discord.js";
import { basic } from "./intents";

// Creates a new Discord Client and exports it. (to be sure it is only invoked once)
export const DiscordClient = new Client({ intents: basic });
