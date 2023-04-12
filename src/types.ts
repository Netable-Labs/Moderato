import { z } from "zod";

export const ConfigSchema = z.object({
  discord: z.object({
    token: z.string(),
  }),
  db: z.object({
    driver: z.string(),
  }),
});
export type ConfigType = z.infer<typeof ConfigSchema>;
