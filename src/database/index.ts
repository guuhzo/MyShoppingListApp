import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import schemas from './schemas';
import List from './model/List';
import Product from './model/Product';
import ListItem from './model/ListItem';

const adapter = new SQLiteAdapter({
  schema: schemas,
});

const database = new Database({
  adapter,
  modelClasses: [List, Product, ListItem],
  actionsEnabled: true,
});

export default database;
