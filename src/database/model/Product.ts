import { Model, Q } from '@nozbe/watermelondb';
import { field, lazy } from '@nozbe/watermelondb/decorators';
import { Associations } from '@nozbe/watermelondb/Model';

enum TableName {
  PRODUCTS = 'products',
  LIST_ITEMS = 'list_items',
}

class Product extends Model {
  static table = TableName.PRODUCTS;

  static associations: Associations = {
    [TableName.LIST_ITEMS]: { type: 'has_many', foreignKey: 'product_id' },
  };

  @field('name')
  name!: string;

  @field('last_price')
  lastPrice!: number;

  @field('available')
  available!: boolean;

  @lazy
  lists = this.collections
    .get('lists')
    .query(Q.on('list_items', 'product_id', this.id));
}

export default Product;
