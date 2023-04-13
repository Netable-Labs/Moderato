let activeWarnings: Map<string, UserWarning> = new Map();

export type UserWarning = {
  Warnings: Warning[];
  LastWarning: Number;
};

export type Warning = {
  content: string;
  severity: number;
};

// Adds a new Warning to a User
export function applyWarning(userId: string, warning: Warning): number {
  let activeWarning = activeWarnings.get(userId);
  let currentTime = Math.floor(Date.now() / 1000);
  let newWarning = {
    LastWarning: currentTime,
    Warnings: activeWarning ? [...activeWarning.Warnings, warning] : [warning],
  };
  activeWarnings.set(userId, newWarning);
  return newWarning.Warnings.length;
}
