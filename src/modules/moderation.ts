import { type Message } from "discord.js";

// Module Name (required for the Modulesystem)
export const name = "moderation";

// Implementation of Discord Events
function messageCreate(message: Message<boolean>) {
  console.log(message.content + " - Recived by module (moderation)");
}

// exports all implementations (required to be exported like this to work with the modulesystem)
export const implementation = {
  messageCreate,
};
