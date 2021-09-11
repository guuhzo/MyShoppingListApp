import { Model, Q } from '@nozbe/watermelondb'
import { field, lazy } from '@nozbe/watermelondb/decorators'

class Product extends Model {
  static table = 'products'
  static associations = {
    product_lists: { type: 'has_many', foreignKey: 'product_id' },
  } 
  
  
  @field('name')
  name!: string;
  
  @lazy
  lists = this.collections
    .get('lists')
    .query(Q.on('product_lists', 'product_id', this.id))
}

export default Product