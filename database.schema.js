"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schemas = {
    chatsyncSessionSchema: {
        title: 'Chatsync Session Schema',
        description: 'describes a chatsync session',
        version: 0,
        type: 'object',
        properties: {
            name: {
                type: 'string',
                primary: true,
            },
            streamers: {
                type: 'array',
            },
            bots: {
                type: 'array',
            },
        },
        required: ['name', 'streamers'],
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
                type: 'any',
            },
        }
    }
};
//# sourceMappingURL=database.schema.js.map