export interface Streamer {
  username: string;
  platform: 'twitch' | 'mixer' | 'twitter' | 'discord';
}

export interface Session {
  name: string;
  streamers: Array<Streamer>;
}
