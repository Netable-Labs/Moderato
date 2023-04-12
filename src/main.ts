import yaml from "js-yaml";
import { readFileSync } from "node:fs";
import {
  ConfigSchema,
  ModuleSchema,
  type ConfigType,
  type ModuleType,
} from "./types";
import { pino } from "pino";
import { DiscordClient } from "./discord";

// Setup the logger for Moderato
const logger = pino();
logger.info("Starting Service...");
// Load the Moderato config
let config: ConfigType = loadConfig();
function loadConfig() {
  try {
    let loadedConfig = ConfigSchema.parse(
      yaml.load(readFileSync("config.yaml", "utf-8"))
    );
    logger.info("Configuration loaded successfully.");
    return loadedConfig;
  } catch (e) {
    logger.fatal("Failed to load config.yaml!");
    process.exit(1);
  }
}

// Discord initializing
async function initializeDiscordClient() {
  let discordClientConnection = await DiscordClient.login(
    config.discord.token
  ).catch((e) => {
    // TODO: better error handling
    return false;
  });
  if (!discordClientConnection) {
    logger.fatal("Failed to connect to the Discord-API!");
    process.exit(1);
  } else {
    logger.info("Successfully connected to the Discord-API.");
  }
}

// Modulesystem
let loadedModules: ModuleType[] = [];
// load modules based on the config
async function loadModules() {
  if (!config.modules || config.modules.length < 1) {
    logger.fatal("No modules defined in config!");
    process.exit(1);
  }
  for (let i = 0; i < config.modules.length; i++) {
    await loadModule(config.modules[i]);
  }
  logger.info(
    `Successfully loaded module${
      loadedModules.length > 1 ? "s" : ""
    }: ${loadedModules.map((module) => module.name)}`
  );
}

// can be used to load a module at runtime
async function loadModule(name: string) {
  try {
    loadedModules.push(ModuleSchema.parse(await import(`./modules/${name}`)));
  } catch (e) {
    logger.fatal(`Failed to load module: ${name}`);
    process.exit(1);
  }
}

// can be used to unload a module at runtime
function unloadModule(name: string) {
  let moduleIndex = loadedModules.findIndex((module) => module.name === name);
  if (moduleIndex < 1) return;
  loadedModules.splice(moduleIndex, 1);
}

// initialize the service
initializeDiscordClient();
loadModules();

// handle Discord events
DiscordClient.on("messageCreate", (message) => {
  loadedModules.forEach((module) => {
    if (!module.implementation.messageCreate) return;
    module.implementation.messageCreate(message);
  });
});
