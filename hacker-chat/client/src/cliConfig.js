const PRODUCTION_URL = 'https://hacker-chat-sje3-fab.herokuapp.com/';

export class CliConfig {
  constructor({ username, hostUri = PRODUCTION_URL, room }) {
    const { hostname, port, protocol } = new URL(hostUri);
    
    this.userName = username;
    this.room = room;
    this.host = hostname;
    this.port = port;
    this.protocol = protocol.replace(/\W/, '');
  }

  static parseArguments(commands) {
    const cmd = new Map();

    for (const key in commands) {
      const COMMAND_PREFIX = '--';
      const index = parseInt(key);
      const command = commands[key];

      if (!command.includes(COMMAND_PREFIX)) continue;

      const keyMap = command.replace(COMMAND_PREFIX, '');
      const valueMap = commands[index + 1];
      cmd.set(keyMap, valueMap);
    }

    return new CliConfig(Object.fromEntries(cmd));
  }
}