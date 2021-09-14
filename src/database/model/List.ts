import { Model, Q, Relation, Query } from '@nozbe/watermelondb'
import { field, lazy } from '@nozbe/watermelondb/decorators'
import children from '@nozbe/watermelondb/decorators/children';
import { Associations } from '@nozbe/watermelondb/Model';
import ListItem from './ListItem';

enum TableName {
  LISTS = 'lists',
  LIST_ITEMS = 'list_items',
}

class List extends Model {
  static table = TableName.LISTS
  static associations: Associations = {
    [TableName.LIST_ITEMS]: { type: 'has_many', foreignKey: 'list_id' },
  } 

  @field('name')
  name!: string;

  @field('cash')
  cash!: number;
  
  @field('card')
  card!: number;
  
  @field('quantity')
  quantity!: number;

  @field('done')
  done!: boolean;

  @lazy
  products = this.collections
    .get('products')
    .query(Q.on('list_items', 'list_id', this.id))

  @children(TableName.LIST_ITEMS) items!: Query<ListItem>
  
  // @lazy
  // items = this.collections
  //   .get('list_items')
  //   .query(Q.where('list_id', this.id)) 
}

export default List