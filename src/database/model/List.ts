import { Model, Q } from '@nozbe/watermelondb'
import { field, lazy } from '@nozbe/watermelondb/decorators'

class List extends Model {
  static table = 'lists'
  static associations = {
    product_lists: { type: 'has_many', foreignKey: 'list_id' },
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
    .query(Q.on('product_lists', 'list_id', this.id))
}

export default List