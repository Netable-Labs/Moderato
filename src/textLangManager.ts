type language = {
  warning_message_deleted: string;
};

export const english: language = {
  warning_message_deleted:
    "Your last message contained words, that are considered harmful by our code of conduct. The message has been deleted!",
};

export const german: language = {
  warning_message_deleted:
    "Deine letzte Nachricht enthielt Wörter, die von unserem Verhaltenskodex als schädlich angesehen werden. Die Nachricht wurde gelöscht!",
};

const guilds: Map<string, language> = new Map();

export function getGuildLanguageMessage(guildId: string): language {
  return guilds.get(guildId) || english;
}

export function setGuildLanguage(guildId: string, language: string) {
  switch (language) {
    case "english":
      return guilds.set(guildId, english);
    case "german":
      return guilds.set(guildId, german);
    default:
      return guilds.set(guildId, english);
  }
}
