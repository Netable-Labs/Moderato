import { z } from "zod";

// Config Schema
export const ConfigSchema = z.object({
  discord: z.object({
    token: z.string(),
  }),
  modules: z.array(z.string()).optional(),
  db: z.object({
    driver: z.string(),
  }),
});
// Config Schema as Typescript Type
export type ConfigType = z.infer<typeof ConfigSchema>;

// Module Schema
export const ModuleSchema = z.object({
  name: z.string(),
  implementation: z.object({
    messageCreate: z.function().optional(),
  }),
});
// Module Schema as Typescript Tyoe
export type ModuleType = z.infer<typeof ModuleSchema>;
