export interface Account {
  username: string;
  token: string;
  platform: 'twitch' | 'mixer' | 'discord' | 'twitter';
}

interface Setting {
  name: string;
  help?: string;
  type: 'input' | 'textbox' | 'toggle';
  options?: Array<string>;
  value?;
}

export interface Module {
  name: string;
  uuid: string;
  description: string;
  settings: Array<Setting>;
}
