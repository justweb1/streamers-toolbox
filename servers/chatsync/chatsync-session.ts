
interface Streamer {
  username: string;
  platform: 'twitch' | 'mixer' | 'twitter' | 'discord';
}

interface Session {
  name: string;
  streamers: Array<Streamer>;
}

export class ChatsyncSession {
  sessions = [
    {
      name: 'piratini',
      streamers: [
        {username: 'a_lazypirate', platform: 'twitch'},
        {username: 'martinirita', platform: 'twitch'},
      ]
    },
    {
      name: 'tiniweb',
      streamers: [
        {username: 'martinirita', platform: 'twitch'},
        {username: 'justweb', platform: 'twitch'},
      ]
    },
  ];

  constructor(public name: string, streamers: Array<Streamer>) {
    let result;

    if (this.sessions.map((value) => {
      console.log('value', value.name); // PROD: Remove for production.
      return value.name = name;
    })) {
      const error = `This session name \'${name}\' already exists.`;
      console.log('ERROR', error);
      result = error;
    } else {
      this.sessions.push({name: name, streamers: streamers});
      result = `${name} session includes ${streamers}`;
    }
    return result;
  }

}


