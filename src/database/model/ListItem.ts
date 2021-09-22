import { Model, Relation } from '@nozbe/watermelondb';
import { field, immutableRelation } from '@nozbe/watermelondb/decorators';
import { Associations } from '@nozbe/watermelondb/Model';
import List from './List';
import Product from './Product';

enum TableName {
  LIST_ITEMS = 'list_items',
  LISTS = 'lists',
  PRODUCTS = 'products',
}

class ListItem extends Model {
  static table = TableName.LIST_ITEMS;

  static associations: Associations = {
    [TableName.LISTS]: { type: 'belongs_to', key: 'list_id' },
    [TableName.PRODUCTS]: { type: 'belongs_to', key: 'product_id' },
  };

  @field('price')
  price!: number;

  @field('quantity')
  quantity!: number;

  @immutableRelation('lists', 'list_id') list!: Relation<List>;

  @immutableRelation('products', 'product_id') product!: Relation<Product>;
}

export default ListItem;
