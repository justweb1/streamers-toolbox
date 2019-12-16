import RxDB, {
  RxDatabase,
  RxCollection,
  RxJsonSchema,
  RxDocument,
  dbCount
} from 'rxdb';
RxDB.plugin(require('pouchdb-adapter-http'));

import { Schemas } from './database.schema';

let _getDatabase; // cached
export const getDatabase = (name, adapter) => {
    if (!_getDatabase) {
      _getDatabase = createDatabase(name, adapter);
    }
    return _getDatabase;
};

const createDatabase = async (name: string, adapter: string) => {
    const db = await RxDB.create({
        name,
        adapter,
        multiInstance: true,
    });

    console.log(`[DATABASE] Creating \'Settings\'collection...`);

    await db.collection({
      name: 'settings',
      schema: Schemas.settingSchema,
    }).then(() => console.log(`[DATABASE] \'Settings\' collection created.`));

    return db;
};
