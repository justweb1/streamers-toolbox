"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schemas = {
    chatsyncSessionSchema: {
        title: 'Chatsync Session Schema',
        description: 'describes a chatsync session',
        version: 0,
        type: 'object',
        properties: {
            id: {
                type: 'string',
                primary: true,
            },
            name: {
                type: 'string',
            },
            streamers: {
                type: 'array',
                items: {
                    streamer: {
                        type: 'object',
                        properties: {
                            username: {
                                type: 'string',
                            },
                            platform: {
                                type: 'string',
                                enum: ['twitch', 'mixer', 'discord', 'twitter'],
                            },
                        },
                    },
                },
            },
            bots: {
                type: 'array',
                items: {
                    bot: {
                        type: 'string',
                    },
                },
            },
        },
    },
    settingSchema: {
        title: 'Setting Schema',
        description: 'describes a setting',
        version: 0,
        type: 'object',
        properties: {
            id: {
                type: 'string',
                primary: true,
            },
            name: {
                type: 'string',
            },
            description: {
                type: 'string',
            },
            value: {
                type: ['number', 'string', 'array', 'object', 'boolean'],
            },
        }
    }
};
//# sourceMappingURL=database.schema.js.map