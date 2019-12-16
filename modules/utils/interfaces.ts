export interface Account {
  username: string;
  token: string;
  platform: 'twitch' | 'mixer' | 'discord' | 'twitter';
}
